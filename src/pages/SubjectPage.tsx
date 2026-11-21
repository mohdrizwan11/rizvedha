import { Link, useParams } from "react-router-dom";
import { subjectByKey, modulesOfSubject } from "../data/curriculum";
import { useStore } from "../lib/store";
import { VISUALS } from "../components/visuals";
import { Icon } from "../components/Icon";
import { Ring } from "../components/ui";

export default function SubjectPage() {
  const { subject } = useParams();
  const s = subjectByKey(subject || "");
  const { state } = useStore();
  if (!s) return <div className="page empty">Subject not found.</div>;

  const mods = modulesOfSubject(s.key);
  const chapters = mods.flatMap((m) => m.chapters);
  const done = chapters.filter((c) => state.chapters[c.id]?.done).length;
  const pct = chapters.length ? (done / chapters.length) * 100 : 0;

  const style = {
    ["--accent" as any]: s.accent,
    ["--accent-soft" as any]: `color-mix(in srgb, ${s.accent} 12%, white)`,
    ["--accent-ink" as any]: `color-mix(in srgb, ${s.accent} 72%, black)`,
  };

  return (
    <div className="page" style={style}>
      <div className="reader-head">
        <div className="crumbs">
          <Link to="/learn">Learn</Link> <Icon name="ChevronRight" size={12} /> <span>{s.title}</span>
        </div>
        <div className="spread" style={{ alignItems: "flex-start", flexWrap: "wrap", gap: 18 }}>
          <div>
            <h1>{s.title}</h1>
            <p className="lede">{s.blurb}</p>
            <div className="row wrap" style={{ gap: 8, marginTop: 12 }}>
              <span className="chip chip--accent"><Icon name="BookOpen" /> {chapters.length} chapters</span>
              <span className="chip"><Icon name="Check" /> {done} completed</span>
              {mods.length > 1 && <span className="chip"><Icon name="Layers" /> {mods.length} modules</span>}
            </div>
          </div>
          <div style={{ color: s.accent }}>
            <Ring pct={pct} size={92} stroke={9} />
          </div>
        </div>
      </div>

      {mods.map((m) => (
        <section key={m.key} className="module-block">
          <div className="module-block__head">
            <h2>{m.title}</h2>
            <span className="chip">{m.chapters.length} chapters</span>
          </div>
          <div className="chapter-grid">
            {m.chapters.map((c) => {
              const prog = state.chapters[c.id];
              const doneSections = prog?.sections.length || 0;
              return (
                <Link key={c.id} to={`/learn/${c.id}`} className={`chapter-card${prog?.done ? " chapter-card--done" : ""}`} style={{ ["--accent" as any]: s.accent }}>
                  <div className="chapter-card__top">
                    <div className="chapter-card__num">{String(c.num).padStart(2, "0")}</div>
                    {prog?.done && <Icon name="CircleCheck" size={17} color={s.accent} />}
                  </div>
                  <h3>{c.title}</h3>
                  <div className="chapter-card__meta">
                    <span>p. {c.pages[0]}–{c.pages[1]}</span>
                    <span className="chapter-card__dot" />
                    <span>{doneSections ? `${doneSections} sections read` : "Fresh"}</span>
                  </div>
                  <div className="chapter-card__progress"><i style={{ width: `${prog?.done ? 100 : Math.min(90, doneSections * 12)}%` }} /></div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="section-head"><h2>Revise visually</h2></div>
      <div className="quick-grid">
        {VISUALS.some((v) => v.subject === s.title) && (
          <Link to={`/visuals?subject=${encodeURIComponent(s.title)}`} className="quick">
            <div className="quick__icon" style={{ background: `color-mix(in srgb, ${s.accent} 12%, white)`, color: s.accent }}><Icon name="Eye" /></div>
            <div><b>Visual lab</b><span>One diagram for the whole idea</span></div>
          </Link>
        )}
        <Link to="/explore" className="quick">
          <div className="quick__icon" style={{ background: `color-mix(in srgb, ${s.accent} 12%, white)`, color: s.accent }}><Icon name="Compass" /></div>
          <div><b>Explore libraries</b><span>Maps, one-liners &amp; quick quizzes</span></div>
        </Link>
        <Link to="/games" className="quick">
          <div className="quick__icon" style={{ background: "#fff4e2", color: "#b45309" }}><Icon name="Timer" /></div>
          <div><b>Play a GS round</b><span>Mixed questions from this subject</span></div>
        </Link>
      </div>
    </div>
  );
}
