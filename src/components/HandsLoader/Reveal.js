/**
 * Circular reveal: cuts a growing hole in the loader with clip-path, so the site
 * underneath shows through. Uses an even-odd path (viewport rect minus a circle).
 */
export function setReveal(el, { cx, cy, r, w, h }) {
  if (r <= 0) {
    el.style.clipPath = "";
    el.style.webkitClipPath = "";
    return;
  }
  const d =
    `M0 0H${w}V${h}H0Z ` +
    `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
  const v = `path(evenodd, "${d}")`;
  el.style.clipPath = v;
  el.style.webkitClipPath = v;
}

/** Distance from (cx, cy) to the farthest viewport corner. */
export function farthestCorner(cx, cy, w, h) {
  return Math.max(Math.hypot(cx, cy), Math.hypot(w - cx, cy), Math.hypot(cx, h - cy), Math.hypot(w - cx, h - cy));
}
