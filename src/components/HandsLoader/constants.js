// HandsLoader — every tunable value lives here.

export const COLORS = {
  background: "#2BB3A3", // site accent teal (--accent in styles.css)
  hand: "#F5F3EE", // baked into the images
  thread: "#E8E4D6",
};

// Total length of the full animation (ms). Phases below are fractions of this.
export const DURATION = 2600;

export const PHASES = {
  enterStart: 0.12, // 0 → 0.12   hands wait just off-screen, thread hangs loose
  glideEnd: 0.62, //   0.12 → 0.62 hands glide to center, thread tightens
  touchAt: 0.66, //    0.62 → 0.66 last gap closes, fingertips touch
  revealAt: 0.69, //   0.66 → 0.69 short hold; reveal starts here (once `ready`)
};

export const EASING = {
  glide: [0.65, 0, 0.35, 1],
  reveal: [0.16, 1, 0.3, 1],
};

export const READY_TIMEOUT = 5000; // reveal anyway after this if window "load" never fires
export const REPEAT_FADE = 400; // later loads in the same session: plain fade (ms)
export const REDUCED_HOLD = 300; // prefers-reduced-motion: hold, then fade (ms each)
export const SESSION_KEY = "handsLoader:seen";

// Hand size = width of each hand image as a fraction of the viewport width.
// The forearm end is faded out with a mask, so hands can be any size.
export const HAND_SIZE = { desktop: 0.6, mobile: 0.7 }; // mobile = under 600px
export const MOBILE_BREAKPOINT = 600;

// Where the fingertips start, as a fraction of viewport width from their own edge.
// Negative = off-screen. Mobile starts closer in.
export const START_TIP_X = { desktop: -0.02, mobile: 0.08 };
export const NEAR_GAP = 0.012; // gap between fingertips at the end of the glide (× viewport width)
export const DRIFT_PX = 4; // vertical float of each hand during the glide

export const THREAD = {
  stroke: 1.5,
  sagLoose: 0.42, // dip of the thread's middle below the wrists (× viewport height)
  sagTaut: 0.15,
  loopRx: 0.16, // wrist loop size relative to wrist thickness
  loopRy: 0.62,
  loopTilt: 14, // degrees
};

export const REVEAL_SCALE = 1.15; // hands + thread zoom while the circle opens

// Anchor points measured from the artwork, as % of each image's width / height.
// fingertip: tip of the index finger. wrist: centre of the wrist, where the loop sits.
export const HANDS = {
  left: {
    src: "src/assets/loader/left-hand.webp",
    width: 1412,
    height: 650,
    fingertip: { x: 99.86, y: 56.31 },
    wrist: { x: 32.93, y: 34.15 },
    wristThickness: 50.46, // % of image height
  },
  right: {
    src: "src/assets/loader/right-hand.webp",
    width: 1353,
    height: 684,
    fingertip: { x: 0.07, y: 46.64 },
    wrist: { x: 65.93, y: 37.72 },
    wristThickness: 40.94,
  },
};
