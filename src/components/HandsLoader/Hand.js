import { HANDS } from "./constants.js";

/**
 * One hand image. side = "left" | "right".
 * Position it with place({ tipX, tipY, scale }): the fingertip anchor lands on (tipX, tipY).
 * Returns the screen-space anchors so the thread can follow them.
 */
export function Hand(side) {
  const cfg = HANDS[side];
  const el = document.createElement("img");
  el.className = `hl__hand hl__hand--${side}`;
  el.src = cfg.src;
  el.alt = "";
  el.decoding = "async";
  el.draggable = false;
  el.setAttribute("aria-hidden", "true");

  let w = 0;
  let h = 0;

  return {
    el,
    side,
    /** Set the rendered size (call on mount and on resize — not every frame). */
    size(width) {
      w = width;
      h = (width * cfg.height) / cfg.width;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    },
    /** Move so the fingertip sits at (tipX, tipY). Transform only. */
    place(tipX, tipY) {
      const x = tipX - (cfg.fingertip.x / 100) * w;
      const y = tipY - (cfg.fingertip.y / 100) * h;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      return {
        wrist: { x: x + (cfg.wrist.x / 100) * w, y: y + (cfg.wrist.y / 100) * h },
        wristThickness: (cfg.wristThickness / 100) * h,
      };
    },
  };
}

/** Resolve once both images are decoded so nothing pops in mid-animation. */
export function preloadHands() {
  return Promise.all(
    Object.values(HANDS).map(
      ({ src }) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          (img.decode ? img.decode() : Promise.reject()).then(resolve, () => {
            if (img.complete) resolve();
            else img.onload = img.onerror = resolve;
          });
        })
    )
  );
}
