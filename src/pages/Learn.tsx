import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SUBJECTS, MODULES, ALL_CHAPTERS } from "../data/curriculum";
import { useStore } from "../lib/store";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";
import { Bar } from "../components/ui";

export default function Learn() {
  const { state } = useStore();
  const [q, setQ] = useState("");

  const rows = SUBJECTS.map((s) => {
    const mods = MODULES.filter((m) => m.subject === s.key);
    const chs = mods.flatMap((m) => m.chapters);
    const d = chs.filter((c) => state.chapters[c.id]?.done).length;
    return { ...s, mods, total: chs.length, done: d, pct: chs.length ? (d / chs.length) * 100 : 0 };
  });

  const matches = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return ALL_CHAPTERS.filter((c) => c.title.toLowerCase().includes(needle) || c.moduleTitle.toLowerCase().includes(needle)).slice(0, 24);
  }, [q]);

  return (
    <div className="page">
      <PageHead
        eyebrow="Learn · Parmar SSC theory"
        title="The whole GS syllabus, mapped"
        sub={`${ALL_CHAPTERS.length} chapters across 9 subjects. Every chapter keeps the book's order, so nothing is missed — but every page is rebuilt as cards, tables and drills.`}
        right={
          <label className="searchbar">
            <Icon name="Search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a chapter…" />
          </label>
        }
      />

      {q.trim() ? (
        <div className="chapter-grid">
          {matches.map((c) => (
            <Link key={c.id} to={`/learn/${c.id}`} className="chapter-card" style={{ ["--accent" as any]: c.accent }}>
              <div className="chapter-card__top">
                <div className="chapter-card__num">{String(c.num).padStart(2, "0")}</div>
                <span className="chip chip--accent">{c.moduleTitle}</span>
              </div>
              <h3>{c.title}</h3>
              <div className="chapter-card__meta">
                <span>{c.pages[0]}–{c.pages[1]}</span>
                <span className="chapter-card__dot" />
                <span>{state.chapters[c.id]?.done ? "Completed" : "Not started"}</span>
              </div>
            </Link>
          ))}
          {!matches.length && <div className="empty">No chapter matched “{q}”.</div>}
        </div>
      ) : (
        <div className="stack" style={{ gap: 12 }}>
          {rows.map((s) => (
            <Link
              key={s.key}
              to={`/subject/${s.key}`}
              className="card card--pad card--hover"
              style={{
                ["--accent" as any]: s.accent,
                display: "grid",
                gridTemplateColumns: "auto minmax(0,1fr) auto",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div className="subject-card__icon" style={{ width: 48, height: 48 }}><Icon name={s.icon} /></div>
              <div className="stack" style={{ gap: 5 }}>
                <div className="row wrap" style={{ gap: 8 }}>
                  <h3 style={{ fontSize: "1.14rem" }}>{s.title}</h3>
                  <span className="chip chip--accent">{s.total} chapters</span>
                  {s.mods.length > 1 && <span className="chip">{s.mods.length} modules</span>}
                </div>
                <p className="tiny muted">{s.blurb}</p>
                <div className="row" style={{ gap: 10, marginTop: 3 }}>
                  <div style={{ flex: 1, maxWidth: 280 }}><Bar pct={s.pct} color={s.accent} /></div>
                  <span className="tiny" style={{ fontWeight: 700 }}>{s.done}/{s.total}</span>
                </div>
              </div>
              <div style={{ color: s.accent }}><Icon name="ChevronRight" /></div>
            </Link>
          ))}
        </div>
      )}

      <div className="card card--pad" style={{ marginTop: 22, background: "linear-gradient(120deg,#0f172a,#16324a)", color: "#e2e8f0", border: 0 }}>
        <div className="spread" style={{ flexWrap: "wrap", gap: 16 }}>
          <div className="stack" style={{ gap: 6 }}>
            <div className="eyebrow" style={{ color: "#7dd3fc" }}>SSC CGL GS pattern</div>
            <h2 style={{ color: "#fff" }}>25 questions · 50 marks</h2>
            <p style={{ color: "#cbd5e1", fontSize: ".88rem", maxWidth: "58ch" }}>
              Geography and Polity give the highest hit-rate, then History, Science and Static GK. This library keeps every
              chapter one tap away so revision never stalls on navigation.
            </p>
          </div>
          <Link className="btn btn--accent" to="/games"><Icon name="Gamepad2" /> Practice instead</Link>
        </div>
      </div>
    </div>
  );
}
