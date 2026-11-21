import { Link } from "react-router-dom";
import { SUBJECTS, MODULES, ALL_CHAPTERS, chapterById } from "../data/curriculum";
import { EXPLORERS } from "../data/explorers";
import { useStore, streakOf, levelOf } from "../lib/store";
import { Icon } from "../components/Icon";
import { Ring, CountUp } from "../components/ui";
import { VISUALS, VizDiagram } from "../components/visuals";

const VISUALS_HOME = VISUALS.filter((v) => ["solar-system", "water-cycle", "constitution", "cell"].includes(v.slug));

export default function Home() {
  const { state } = useStore();
  const lvl = levelOf(state.xp);
  const streak = streakOf(state.days);

  const done = Object.values(state.chapters).filter((c) => c.done).length;
  const pct = Math.round((done / ALL_CHAPTERS.length) * 100);
  const last = state.recent.map(chapterById).filter(Boolean)[0] || ALL_CHAPTERS[0];
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const subjectProgress = SUBJECTS.map((s) => {
    const mods = MODULES.filter((m) => m.subject === s.key);
    const chs = mods.flatMap((m) => m.chapters);
    const d = chs.filter((c) => state.chapters[c.id]?.done).length;
    return { ...s, total: chs.length, done: d, pct: chs.length ? Math.round((d / chs.length) * 100) : 0 };
  });

  return (
    <div className="page">
      <div className="hello">
        <div className="eyebrow">{greet}{state.name ? `, ${state.name}` : ""}</div>
        <h1>Your <span>visual GS</span> library</h1>
        <p className="sub">Everything from the Parmar SSC theory book — rebuilt as maps, one-liners, flashcards and games.</p>
      </div>

      <section className="hero">
        <div className="hero__body">
          <div className="hero__kicker">Pick up where you left off</div>
          <h1>{last.title}</h1>
          <p>
            {last.moduleTitle} · pages {last.pages[0]}–{last.pages[1]} · {state.chapters[last.id]?.sections.length || 0} sections read
          </p>
          <div className="hero__actions">
            <Link className="btn btn--accent" to={`/learn/${last.id}`}>
              <Icon name="Play" /> Continue reading
            </Link>
            <Link className="btn btn--ghost" to="/learn" style={{ color: "#e2e8f0", borderColor: "rgba(255,255,255,.25)" }}>
              Open syllabus <Icon name="ArrowRight" />
            </Link>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__progress" style={{ color: "#7dd3fc" }}>
            <Ring pct={pct} size={104} stroke={9} />
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>
                <CountUp value={done} /><span style={{ opacity: 0.5, fontSize: "1rem" }}>/{ALL_CHAPTERS.length}</span>
              </div>
              <div style={{ fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#94a3b8", fontWeight: 800 }}>
                chapters done
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="stats" style={{ marginTop: 14 }}>
        <div className="stat"><b><CountUp value={streak} /></b><span>Day streak</span></div>
        <div className="stat"><b><CountUp value={state.xp} /></b><span>XP earned</span></div>
        <div className="stat"><b><CountUp value={state.quiz.total ? Math.round((state.quiz.correct / state.quiz.total) * 100) : 0} />%</b><span>Quiz accuracy</span></div>
        <div className="stat"><b><CountUp value={lvl.level} /></b><span>{lvl.title}</span></div>
      </div>

      <div className="section-head">
        <h2>Subjects</h2>
        <Link to="/learn">Full syllabus <Icon name="ChevronRight" size={14} /></Link>
      </div>
      <div className="subject-grid">
        {subjectProgress.map((s) => (
          <Link key={s.key} to={`/subject/${s.key}`} className="subject-card" style={{ ["--accent" as any]: s.accent, ["--accent-soft" as any]: `color-mix(in srgb, ${s.accent} 12%, white)`, ["--accent-ink" as any]: `color-mix(in srgb, ${s.accent} 72%, black)` }}>
            <div className="subject-card__icon"><Icon name={s.icon} /></div>
            <h3>{s.title}</h3>
            <p>{s.blurb}</p>
            <div className="subject-card__meta">
              <div className="subject-card__bar"><i style={{ width: `${s.pct}%` }} /></div>
              <span>{s.done}/{s.total}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-head">
        <h2>One picture, one chapter</h2>
        <Link to="/visuals">Visual lab <Icon name="ChevronRight" size={14} /></Link>
      </div>
      <div className="viz-strip">
        {VISUALS_HOME.map((v) => (
          <Link
            key={v.slug}
            to={`/visuals/${v.slug}`}
            className="viz-strip__card"
            style={{
              ["--accent" as string]: v.accent,
              ["--accent-soft" as string]: `color-mix(in srgb, ${v.accent} 12%, white)`,
              ["--accent-ink" as string]: `color-mix(in srgb, ${v.accent} 74%, black)`,
            }}
          >
            <VizDiagram viz={v} thumb />
            <div className="viz-strip__body">
              <b>{v.title}</b>
              <span>{v.subject}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-head">
        <h2>Quick play</h2>
        <Link to="/games">All games <Icon name="ChevronRight" size={14} /></Link>
      </div>
      <div className="quick-grid">
        <Link to="/games/rapid" className="quick">
          <div className="quick__icon" style={{ background: "#fff4e2", color: "#b45309" }}><Icon name="Timer" /></div>
          <div><b>Rapid Fire</b><span>20 mixed GS questions, 60 seconds</span></div>
        </Link>
        <Link to="/explore" className="quick">
          <div className="quick__icon" style={{ background: "#e6f4f7", color: "#0e7490" }}><Icon name="Compass" /></div>
          <div><b>Explore maps</b><span>{EXPLORERS.length} static-GK libraries</span></div>
        </Link>
        <Link to="/games/bluff" className="quick">
          <div className="quick__icon" style={{ background: "#eef2ff", color: "#4338ca" }}><Icon name="Brain" /></div>
          <div><b>Fact or Bluff</b><span>Spot the tampered statement</span></div>
        </Link>
        <Link to="/search" className="quick">
          <div className="quick__icon" style={{ background: "#eafaf1", color: "#15803d" }}><Icon name="Search" /></div>
          <div><b>Search 6,000+ facts</b><span>Find any topic in a second</span></div>
        </Link>
      </div>

      <div className="section-head">
        <h2>Popular right now</h2>
      </div>
      <div className="chapter-grid">
        {["geo-01", "polity-05", "modern-03", "biology-01"].map((id) => {
          const c = chapterById(id);
          if (!c) return null;
          return (
            <Link key={id} to={`/learn/${id}`} className="chapter-card" style={{ ["--accent" as any]: c.accent }}>
              <div className="chapter-card__top">
                <div className="chapter-card__num">{String(c.num).padStart(2, "0")}</div>
                <span className="chip chip--accent">{c.moduleTitle.split(" ")[0]}</span>
              </div>
              <h3>{c.title}</h3>
              <div className="chapter-card__meta">
                <span>{c.pages[1] - c.pages[0] + 1} pages</span>
                <span className="chapter-card__dot" />
                <span>Read &amp; revise</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="footer-note">
        <span>Content from <b>Parmar SSC Fatman GK/GS</b> (English, 2nd edition) — with respectful thanks to Parmar Sir.</span>
        <span>Riz Vedha · built for SSC CGL, CHSL, CPO, MTS</span>
      </div>
    </div>
  );
}
