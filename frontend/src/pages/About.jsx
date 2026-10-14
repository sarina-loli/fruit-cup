import useApi from "../hooks/useApi";
import { getAbout } from "../api/client";
import { frameUrl } from "../config/sequence";
import LinkButton from "../components/LinkButton.jsx";

function Figure({ frame, caption, position, className }) {
  return (
    <figure className={`about__figure ${className}`}>
      <img
        src={frameUrl(frame)}
        alt=""
        width="1920"
        height="1080"
        loading="lazy"
        decoding="async"
        style={{ objectPosition: position }}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function About() {
  const { status, data, reload } = useApi(getAbout);

  if (status === "loading") {
    return (
      <div className="about about--state" aria-busy="true">
        <p>Loading</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="about about--state">
        <h1>This page could not load.</h1>
        <p>The content server did not respond. Make sure the Django API is running, then try again.</p>
        <button type="button" className="button" onClick={reload}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <article className="about">
      <header className="about__header">
        <h1 className="about__title">{data.title}</h1>
        <p className="about__lead">{data.lead}</p>
      </header>

      <div className="about__figures">
        <Figure
          frame={0}
          caption="The cup, whole."
          position="50% 62%"
          className="about__figure--first"
        />
        <Figure
          frame={35}
          caption="Partway through, mid-air."
          position="50% 40%"
          className="about__figure--second"
        />
      </div>

      <div className="about__sections">
        {data.sections.map((section) => (
          <section key={section.id} className="about__section">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>

      <div className="about__cta">
        <LinkButton to="/">Watch it come apart</LinkButton>
      </div>
    </article>
  );
}
