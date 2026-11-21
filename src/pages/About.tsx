import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";
import { ABOUT, BRAND, FACTS, LINKS } from "../config";
import { useStore, levelOf } from "../lib/store";

export default function About() {
  const { state } = useStore();
  const lvl = levelOf(state.xp);

  return (
    <div className="page page--narrow">
      <PageHead
        eyebrow="About this project"
        title={BRAND.name}
        sub="Every line in this app traces back to one book — and to the teacher who wrote it."
      />

      <section className="card card--pad about-story">
        <div className="about-mark">{BRAND.mark}</div>
        <div>
          <div className="eyebrow eyebrow--accent">{ABOUT.badge}</div>
          <h2 style={{ fontSize: "1.25rem", marginTop: 6 }}>{ABOUT.heading}</h2>
          {ABOUT.body.map((p) => (
            <p key={p.slice(0, 24)} className="about-prose">{p}</p>
          ))}
        </div>
      </section>

      <div className="stats" style={{ marginTop: 16 }}>
        <div className="stat"><b>{FACTS.chapters}</b><span>Chapters</span></div>
        <div className="stat"><b>{FACTS.facts}</b><span>Book facts</span></div>
        <div className="stat"><b>{FACTS.libraries}</b><span>Explore libraries</span></div>
        <div className="stat"><b>{FACTS.diagrams}</b><span>Diagrams</span></div>
      </div>

      <div className="section-head"><h2>How it is made</h2></div>
      <div className="about-steps">
        <div className="card card--pad about-step">
          <div className="about-step__n">01</div>
          <h3>Scanned, not invented</h3>
          <p className="tiny muted">
            Every line comes from the Parmar SSC theory book. The pages were read with Tesseract OCR and
            sorted by column, then parsed by a fixed script — no model writes facts here.
          </p>
        </div>
        <div className="card card--pad about-step">
          <div className="about-step__n">02</div>
          <h3>Drawn by hand</h3>
          <p className="tiny muted">
            The {FACTS.diagrams} diagrams and every Explore map are hand-built SVG — no stock images, no
            screenshots. Each labelled part is tappable and matches a line in the book.
          </p>
        </div>
        <div className="card card--pad about-step">
          <div className="about-step__n">03</div>
          <h3>Yours to keep</h3>
          <p className="tiny muted">
            Progress, streaks and saves live in your browser. Sign in with Google and the same record
            follows you to another device.
          </p>
        </div>
      </div>

      <div className="section-head"><h2>Your record</h2><Link to="/progress">Open progress</Link></div>
      <div className="card card--pad row wrap" style={{ gap: 22 }}>
        <div className="stack" style={{ gap: 2 }}>
          <span className="eyebrow">Rank</span>
          <b style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{lvl.title}</b>
        </div>
        <div className="stack" style={{ gap: 2 }}>
          <span className="eyebrow">XP</span>
          <b style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{state.xp}</b>
        </div>
        <div className="stack" style={{ gap: 2 }}>
          <span className="eyebrow">Saved</span>
          <b style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{state.bookmarks.length}</b>
        </div>
      </div>

      <div className="section-head"><h2>Support the project</h2></div>
      <div className="about-links">
        <a className="card card--pad card--hover about-link" href={LINKS.github} target="_blank" rel="noreferrer">
          <Icon name="Github" size={20} />
          <div>
            <b>Star on GitHub</b>
            <span className="tiny muted">One star helps other aspirants find it.</span>
          </div>
          <Icon name="ArrowUpRight" size={16} />
        </a>
        <a className="card card--pad card--hover about-link" href={LINKS.feedback} target="_blank" rel="noreferrer">
          <Icon name="MessageCircle" size={20} />
          <div>
            <b>Send feedback</b>
            <span className="tiny muted">A wrong date or a missing chapter — tell me at {LINKS.email}.</span>
          </div>
          <Icon name="ArrowUpRight" size={16} />
        </a>
        <a className="card card--pad card--hover about-link" href={LINKS.support} target="_blank" rel="noreferrer">
          <Icon name="Mail" size={20} />
          <div>
            <b>Contact</b>
            <span className="tiny muted">For schools, coaching batches or corrections.</span>
          </div>
          <Icon name="ArrowUpRight" size={16} />
        </a>
      </div>

      <div className="about-sign">
        <span className="hand">— {BRAND.author}</span>
        <span className="tiny muted">
          {BRAND.name} v{BRAND.version} · study material compiled for personal revision, not affiliated with
          the Staff Selection Commission.
        </span>
      </div>
    </div>
  );
}
