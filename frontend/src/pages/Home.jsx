import ScrollSequence from "../components/ScrollSequence.jsx";
import LinkButton from "../components/LinkButton.jsx";
import useApi from "../hooks/useApi";
import { getHome } from "../api/client";
import { HOME_DEFAULTS } from "../config/defaults";

export default function Home() {
  const { data } = useApi(getHome);
  const copy = { ...HOME_DEFAULTS, ...(data ?? {}) };

  return (
    <ScrollSequence label="A glass of fruit and dark juice that lifts apart into floating pieces as you scroll down, and reassembles as you scroll up.">
      <div className="hero-copy">
        <div className="hero-copy__part hero-copy__top">
          <h1 className="hero-copy__heading">{copy.heading}</h1>
        </div>

        <div className="hero-copy__part hero-copy__bottom">
          <p className="hero-copy__description">{copy.description}</p>
          <LinkButton to="/about">{copy.cta_label}</LinkButton>
          <p className="hero-copy__hint">{copy.scroll_hint}</p>
        </div>

        <div className="hero-copy__outro">
          <p className="hero-copy__closing">{copy.closing_line}</p>
          <LinkButton to="/about">{copy.cta_label}</LinkButton>
        </div>
      </div>
    </ScrollSequence>
  );
}
