import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { BRAND, LINKS, FACTS } from "../config";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="foot__grid">
        <div className="foot__col foot__col--brand">
          <div className="row" style={{ gap: 10 }}>
            <div className="brand__mark brand__mark--sm">{BRAND.mark}</div>
            <div>
              <div className="foot__name">{BRAND.name}</div>
              <div className="tiny muted">{BRAND.tagline}</div>
            </div>
          </div>
          <p className="foot__line">{BRAND.promise}</p>
          <p className="foot__line foot__line--quiet">
            Built from the Parmar SSC Fatman GK/GS book, with respectful thanks to Parmar Sir.{" "}
            <Link to="/about" className="foot__link">Read the story</Link>
          </p>
        </div>

        <div className="foot__col">
          <div className="eyebrow">This build</div>
          <ul className="foot__list">
            <li><b>{FACTS.chapters}</b> chapters</li>
            <li><b>{FACTS.libraries}</b> Explore libraries</li>
            <li><b>{FACTS.diagrams}</b> hand-drawn diagrams</li>
            <li><b>{FACTS.games}</b> GK games</li>
          </ul>
        </div>

        <div className="foot__col">
          <div className="eyebrow">Support &amp; feedback</div>
          <ul className="foot__list foot__list--links">
            <li>
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                <Icon name="Github" size={15} /> Star on GitHub
              </a>
            </li>
            <li>
              <a href={LINKS.feedback} target="_blank" rel="noreferrer">
                <Icon name="MessageCircle" size={15} /> Send feedback
              </a>
            </li>
            <li>
              <a href={LINKS.support} target="_blank" rel="noreferrer">
                <Icon name="Mail" size={15} /> Contact
              </a>
            </li>
            <li>
              <Link to="/about">
                <Icon name="Info" size={15} /> About this project
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="foot__base">
        <span>© {BRAND.year} {BRAND.name} · v{BRAND.version} · Made by {BRAND.author}</span>
        <span className="tiny muted">
          Study material is compiled from the Parmar SSC theory book for personal revision. Not affiliated
          with the Staff Selection Commission.
        </span>
        <span className="tiny muted">
          Progress is saved on this device only.
        </span>
      </div>
    </footer>
  );
}
