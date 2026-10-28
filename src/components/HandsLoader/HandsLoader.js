import {
  DURATION, PHASES, EASING, READY_TIMEOUT, REPEAT_FADE, REDUCED_HOLD, SESSION_KEY,
  HAND_SIZE, MOBILE_BREAKPOINT, START_TIP_X, NEAR_GAP, DRIFT_PX, THREAD, REVEAL_SCALE, HANDS,
} from "./constants.js";
import { Hand, preloadHands } from "./Hand.js";
import { Thread } from "./Thread.js";
import { setReveal, farthestCorner } from "./Reveal.js";

// ── helpers ──────────────────────────────────────────────────────────────
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (p, a, b) => clamp01((p - a) / (b - a));

/** cubic-bezier(x1, y1, x2, y2) → easing function, same curve as CSS. */
function bezier([x1, y1, x2, y2]) {
  const ax = 3 * x1 - 3 * x2 + 1, bx = 3 * x2 - 6 * x1, cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1, by = 3 * y2 - 6 * y1, cy = 3 * y1;
  const sx = (t) => ((ax * t + bx) * t + cx) * t;
  const sy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sx(t) - x, d = dx(t);
      if (Math.abs(err) < 1e-5 || Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sy(clamp01(t));
  };
}
const easeGlide = bezier(EASING.glide);
const easeReveal = bezier(EASING.reveal);
const easeOut = (t) => 1 - (1 - t) * (1 - t);

const store = {
  get: () => { try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch { return false; } },
  set: () => { try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* storage blocked: play every time */ } },
};

/**
 * Mount the loader into `root` (an element already covering the page, see index.html).
 *
 *   HandsLoader(root, { onComplete, ready, duration })
 *
 * All options optional.
 *  - onComplete: called once the site is fully revealed (default: remove the loader).
 *  - ready: true | false | Promise. The reveal waits for it. Default: window "load",
 *           with a 5s safety timeout. If false, call the returned setReady() later.
 *  - duration: total animation length in ms (default 2600).
 * Returns { setReady, skip, destroy }.
 */
export function HandsLoader(root, { onComplete, ready, duration = DURATION } = {}) {
  root.style.animation = "none"; // cancel the CSS no-JS failsafe; JS is in charge now
  root.classList.add("hl");

  const cleanups = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };
  let rafId = 0;
  let destroyed = false;
  let finished = false;
  const timers = [];
  const animations = [];

  // ── scroll lock ──
  const html = document.documentElement;
  const prevOverflow = html.style.overflow;
  html.style.overflow = "hidden";

  // ── a11y status ──
  const status = document.createElement("p");
  status.className = "hl__status";
  status.setAttribute("role", "status");
  status.textContent = "Loading";
  root.append(status);

  // ── readiness ──
  let isReady = ready === true;
  const markReady = () => { isReady = true; };
  if (ready && typeof ready.then === "function") ready.then(markReady, markReady);
  else if (ready === undefined) {
    if (document.readyState === "complete") markReady();
    else on(window, "load", markReady, { once: true });
    timers.push(setTimeout(markReady, READY_TIMEOUT));
  }

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    cancelAnimationFrame(rafId);
    timers.forEach(clearTimeout);
    animations.forEach((a) => a.cancel());
    cleanups.forEach((fn) => fn());
    html.style.overflow = prevOverflow;
    root.remove();
  };
  const complete = () => {
    if (finished || destroyed) return;
    finished = true;
    html.style.overflow = prevOverflow;
    (onComplete || destroy)();
    if (onComplete) destroy();
  };
  const fadeOut = (ms, delay = 0) => {
    const a = root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, delay, easing: "ease", fill: "forwards" });
    animations.push(a);
    a.onfinish = complete;
  };

  const api = { setReady: markReady, skip: () => {}, destroy };

  // ── later visits in this session: quick fade, no hands ──
  if (store.get()) {
    fadeOut(REPEAT_FADE);
    return api;
  }
  store.set();

  // ── build the scene ──
  const stage = document.createElement("div");
  stage.className = "hl__stage";
  stage.setAttribute("aria-hidden", "true");
  const left = Hand("left");
  const right = Hand("right");
  const thread = Thread();
  stage.append(thread.back, left.el, right.el, thread.front);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── layout (recomputed on resize) ──
  let L = {};
  const layout = () => {
    const W = innerWidth, H = innerHeight;
    const mobile = W < MOBILE_BREAKPOINT;
    const k = (W * HAND_SIZE[mobile ? "mobile" : "desktop"]) / HANDS.left.width; // px per source px
    left.size(HANDS.left.width * k);
    right.size(HANDS.right.width * k);
    const start = START_TIP_X[mobile ? "mobile" : "desktop"] * W;
    L = {
      W, H, cx: W / 2, cy: H / 2,
      startL: start, startR: W - start,
      nearL: W / 2 - (W * NEAR_GAP) / 2, nearR: W / 2 + (W * NEAR_GAP) / 2,
      sagLoose: H * THREAD.sagLoose, sagTaut: H * THREAD.sagTaut,
      R: farthestCorner(W / 2, H / 2, W, H),
    };
    stage.style.transformOrigin = `${L.cx}px ${L.cy}px`;
  };

  /** Draw the hands + thread for timeline progress p (0–1, capped at revealAt). */
  const drawScene = (p) => {
    const { enterStart, glideEnd, touchAt } = PHASES;
    const u = seg(p, enterStart, glideEnd); // glide progress
    const g = easeGlide(u);
    const c = easeOut(seg(p, glideEnd, touchAt)); // final approach
    let tipL = lerp(L.startL, L.nearL, g);
    let tipR = lerp(L.startR, L.nearR, g);
    tipL = lerp(tipL, L.cx, c);
    tipR = lerp(tipR, L.cx, c);
    // independent vertical drift, fading to 0 at both ends of the glide
    const env = Math.sin(Math.PI * u);
    const dyL = DRIFT_PX * env * Math.sin(2 * Math.PI * u * 1.3 + 0.4);
    const dyR = DRIFT_PX * env * Math.sin(2 * Math.PI * u * 1.1 + 2.1);
    const a = left.place(tipL, L.cy + dyL);
    const b = right.place(tipR, L.cy + dyR);
    thread.update(a, b, lerp(L.sagLoose, L.sagTaut, g));
  };

  const drawReveal = (q) => {
    const e = easeReveal(q);
    setReveal(root, { cx: L.cx, cy: L.cy, r: e * L.R, w: L.W, h: L.H });
    stage.style.opacity = String(1 - clamp01(q * 1.6));
    stage.style.transform = `scale(${1 + (REVEAL_SCALE - 1) * e})`;
  };

  // ── run ──
  let t0 = 0;
  let revealT0 = 0;
  let skipped = false;
  const revealMs = (1 - PHASES.revealAt) * duration;

  const tick = (now) => {
    if (destroyed) return;
    if (!t0) t0 = now;
    let p = (now - t0) / duration;
    if (skipped) p = Math.max(p, PHASES.revealAt);
    if (p < PHASES.revealAt || !isReady) {
      drawScene(Math.min(p, PHASES.revealAt)); // holds at the touch until ready
      rafId = requestAnimationFrame(tick);
      return;
    }
    if (!revealT0) {
      revealT0 = now;
      drawScene(PHASES.revealAt);
      root.style.pointerEvents = "none"; // let the revealed site take input
    }
    const q = clamp01((now - revealT0) / revealMs);
    drawReveal(q);
    if (q < 1) rafId = requestAnimationFrame(tick);
    else complete();
  };

  const skipToReveal = () => {
    if (skipped || finished) return;
    skipped = true;
    isReady = true;
  };
  api.skip = skipToReveal;

  preloadHands().then(() => {
    if (destroyed) return;
    layout();
    root.append(stage);
    on(window, "resize", () => { layout(); if (reduced || !revealT0) drawScene(reduced ? PHASES.revealAt : 0); });

    if (reduced) {
      // hands already touching: hold, fade, done — no movement, scale or circle
      drawScene(PHASES.revealAt);
      fadeOut(REDUCED_HOLD, REDUCED_HOLD);
      return;
    }
    drawScene(0);
    on(window, "pointerdown", skipToReveal);
    on(window, "keydown", skipToReveal);
    rafId = requestAnimationFrame(tick);
  });

  return api;
}
