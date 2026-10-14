// Shown on the Home page instantly, and kept if the API is unreachable, so the
// hero never waits on the network. The API (Django admin) overrides these.
export const HOME_DEFAULTS = {
  heading: "A fruit cup, taken apart.",
  description:
    "Scroll down and one glass of fruit and dark juice lifts, turns and scatters. Scroll back up and it comes together again.",
  cta_label: "Read the story",
  scroll_hint: "Scroll to take it apart",
  closing_line: "Scroll back up to run it in reverse.",
};
