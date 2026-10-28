import { COLORS, THREAD } from "./constants.js";

const NS = "http://www.w3.org/2000/svg";

function svgLayer(cls) {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", `hl__thread ${cls}`);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  return svg;
}

function shape(tag) {
  const s = document.createElementNS(NS, tag);
  s.setAttribute("fill", "none");
  s.setAttribute("stroke", COLORS.thread);
  s.setAttribute("stroke-width", THREAD.stroke);
  s.setAttribute("stroke-linecap", "round");
  s.setAttribute("vector-effect", "non-scaling-stroke");
  return s;
}

/**
 * The thread: one quadratic curve from left wrist to right wrist (drawn behind the hands)
 * plus a loose ellipse loop around each wrist (drawn in front of them).
 */
export function Thread() {
  const back = svgLayer("hl__thread--back");
  const front = svgLayer("hl__thread--front");
  const path = shape("path");
  const loopL = shape("ellipse");
  const loopR = shape("ellipse");
  back.append(path);
  front.append(loopL, loopR);

  const loop = (el, p, thick, tilt) => {
    el.setAttribute("cx", p.x);
    el.setAttribute("cy", p.y);
    el.setAttribute("rx", Math.max(2, thick * THREAD.loopRx));
    el.setAttribute("ry", Math.max(4, thick * THREAD.loopRy));
    el.setAttribute("transform", `rotate(${tilt} ${p.x} ${p.y})`);
  };

  return {
    back,
    front,
    /** sag = how far the middle of the thread dips below the wrists, in px. */
    update(l, r, sag) {
      const mx = (l.wrist.x + r.wrist.x) / 2;
      const my = (l.wrist.y + r.wrist.y) / 2;
      // a quadratic's midpoint sits halfway to its control point → control = 2 × sag
      path.setAttribute("d", `M${l.wrist.x} ${l.wrist.y} Q${mx} ${my + sag * 2} ${r.wrist.x} ${r.wrist.y}`);
      loop(loopL, l.wrist, l.wristThickness, -THREAD.loopTilt);
      loop(loopR, r.wrist, r.wristThickness, THREAD.loopTilt);
    },
  };
}
