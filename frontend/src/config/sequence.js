// Everything that describes the image sequence lives here.
// Frames come from fruit-cup-animation-v2-frames.zip and are served from
// /public/frames as frame-0001.jpg ... frame-0072.jpg (1-based, zero-padded).

export const SEQUENCE = {
  frameCount: 72,
  nativeWidth: 1920,
  nativeHeight: 1080,

  // How far the canvas stays pinned, in viewport heights of scrolling.
  pinVh: 350,

  // Scroll-progress thresholds (0..1) at which overlay copy swaps.
  introEnd: 0.08,
  outroStart: 0.92,

  // Time constant (seconds) of the exponential easing between the scroll
  // position and the displayed position. Smaller = snappier.
  smoothingSeconds: 0.1,

  // Parallel frame downloads.
  concurrency: 4,
};

export const frameUrl = (index) => {
  if (window.innerWidth >= 1000) {
    return `${import.meta.env.BASE_URL}frames/frame-${String(index + 1).padStart(4, "0")}.jpg`;
  }
  if (window.innerWidth < 1000) {
    return `${import.meta.env.BASE_URL}framess/frame-${String(index + 1).padStart(4, "0")}.png`;
  }
  
};

export const FRAME_ASPECT = SEQUENCE.nativeWidth / SEQUENCE.nativeHeight;
