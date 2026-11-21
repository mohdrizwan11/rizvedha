import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { explorerBySlug, loadExplorer, metricOf, visualOf, type Entry } from "../data/explorers";
import { Icon } from "../components/Icon";
import { EntryCourse, ExplorerVisual } from "../components/explore-visuals";
import { QuizDeck } from "../components/Quiz";
import { useStore } from "../lib/store";
import type { Question } from "../lib/content";

type Loaded = Awaited<ReturnType<typeof loadExplorer>>;

type TabKey = "browse" | "visual" | "notes" | "quiz";
const TABS: { k: TabKey; label: string; icon: string }[] = [
  { k: "browse", label: "Browse", icon: "Grid2x2" },
  { k: "visual", label: "Visual", icon: "Compass" },
  { k: "notes", label: "Notes", icon: "BookOpen" },
  { k: "quiz", label: "Quiz", icon: "ListChecks" },
];

export default function ExplorerDetail() {
  const { slug } = useParams();
  const meta = explorerBySlug(slug || "");
  const { state, toggleBookmark } = useStore();
  const [data, setData] = useState<Loaded | null>(null);
  const [params, setParams] = useSearchParams();
  const rawTab = params.get("tab") as TabKey | null;
  const tab: TabKey = rawTab && TABS.some((t) => t.k === rawTab) ? rawTab : "browse";
  const setTab = (k: TabKey) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (k === "browse") next.delete("tab");
        else next.set("tab", k);
        return next;
      },
      { replace: true },
    );
  const [q, setQ] = useState("");
  const [hindi, setHindi] = useState(false);
  const [limit, setLimit] = useState(60);
  const [filter, setFilter] = useState("All");
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [selected, setSelected] = useState<Entry | null>(null);

  /* position of the open entry in the full library, for prev / next in the sheet */
  const currentIndex = useMemo(
    () => (selected && data ? data.entries.findIndex((e) => e.name === selected.name) : -1),
    [selected, data],
  );
  const stepEntry = (dir: number) => {
    if (!data || currentIndex < 0) return;
    const next = currentIndex + dir;
    if (next >= 0 && next < data.entries.length) setSelected(data.entries[next]);
  };

  /* the sheet stays open while browsing entries: arrows move, Escape closes */
  useEffect(() => {
    if (!selected || !data) return;
    const i = data.entries.findIndex((e) => e.name === selected.name);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        return;
      }
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const next = i + (e.key === "ArrowLeft" ? -1 : 1);
      if (next >= 0 && next < data.entries.length) setSelected(data.entries[next]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, data]);

  useEffect(() => {
    if (!meta) return;
    setData(null);
    setQ("");
    setLimit(60);
    setFilter("All");
    setQuiz(null);
    loadExplorer(meta.slug).then(setData).catch(() => setData(null));
  }, [meta?.slug]);

  /* deep link straight to one entry: /explore/rivers?tab=visual&entry=Ganga */
  const focusName = params.get("entry");
  useEffect(() => {
    if (!data || !focusName) return;
    const hit = data.entries.find((e) => e.name.toLowerCase() === focusName.toLowerCase());
    if (hit) setSelected(hit);
  }, [data, focusName]);

  const filters = useMemo(() => {
    if (!data) return ["All"];
    const counts = new Map<string, number>();
    data.entries.forEach((e) => e.primary && counts.set(e.primary, (counts.get(e.primary) || 0) + 1));
    return ["All", ...[...counts.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 9).map(([k]) => k)];
  }, [data]);

  const list = useMemo(() => {
    if (!data) return [];
    const needle = q.trim().toLowerCase();
    return data.entries.filter(
      (e) =>
        (filter === "All" || e.primary === filter) &&
        (!needle || (e.name + " " + e.primary + " " + e.fact + " " + e.secondary.join(" ")).toLowerCase().includes(needle)),
    );
  }, [data, q, filter, hindi]);

  const startQuiz = () => {
    if (!data || !meta) return;
    const pool = data.entries.filter((e) => e.primary);
    const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    const answers = [...new Set(pool.map((e) => e.primary))];
    const qs: Question[] = picked
      .map((e) => {
        const wrong = answers.filter((a) => a !== e.primary).sort(() => Math.random() - 0.5).slice(0, 3);
        if (wrong.length < 3) return null;
        return {
          q: `${e.name} belongs to which of these?`,
          options: [...wrong, e.primary].sort(() => Math.random() - 0.5),
          answer: e.primary,
          source: e.fact || `${e.name} — ${e.primary}`,
          subject: meta.title,
        };
      })
      .filter((x): x is Question => !!x);
    setQuiz(qs);
    setTab("quiz");
  };

  if (!meta) return <div className="page empty">Library not found.</div>;

  const style = {
    ["--accent" as any]: meta.accent,
    ["--accent-soft" as any]: `color-mix(in srgb, ${meta.accent} 12%, white)`,
    ["--accent-ink" as any]: `color-mix(in srgb, ${meta.accent} 74%, black)`,
  };

  return (
    <div className="page" style={style}>
      <div className="reader-head">
        <div className="crumbs">
          <Link to="/explore">Explore</Link> <Icon name="ChevronRight" size={12} /> <span>{meta.subject}</span>
        </div>
        <div className="spread" style={{ alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div style={{ maxWidth: "60ch" }}>
            <h1 style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="subject-card__icon" style={{ width: 42, height: 42 }}><Icon name={meta.icon} /></span>
              {meta.title}
            </h1>
            <p className="lede">{meta.desc}</p>
            <div className="row wrap" style={{ gap: 8, marginTop: 10 }}>
              <span className="chip chip--accent"><Icon name="Layers" /> {meta.count} entries</span>
              <span className="chip">{meta.tag}</span>
              {data && <span className="chip"><Icon name="BookOpen" /> {data.notes.length} note tables</span>}
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn--soft btn--sm" onClick={() => toggleBookmark(`explore:${meta.slug}`)}>
              <Icon name="Bookmark" /> {state.bookmarks.includes(`explore:${meta.slug}`) ? "Saved" : "Save"}
            </button>
            <button className="btn btn--accent btn--sm" onClick={startQuiz} disabled={!data}>
              <Icon name="Target" /> Quick quiz
            </button>
          </div>
        </div>
      </div>

      {/* Stays pinned below the top bar, so sections and filters are always
          reachable even deep down a long list or while a detail sheet is open. */}
      <div className="explore-toolbar">
        <div className="explore-toolbar__row">
          <Link to="/explore" className="explore-toolbar__back" aria-label="All libraries" title="All libraries">
            <Icon name="ArrowLeft" size={16} />
          </Link>
          <div className="explore-toolbar__tabs" role="tablist" aria-label="Library sections">
            {TABS.map((t) => (
              <button
                key={t.k}
                className={`chip${tab === t.k ? " chip--accent" : ""}`}
                aria-pressed={tab === t.k}
                onClick={() => setTab(t.k)}
                style={{ padding: "7px 12px", fontSize: ".78rem", flex: "none" }}
              >
                <Icon name={t.icon} size={15} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab === "browse" && data && (
          <>
            <div className="explore-toolbar__row explore-toolbar__controls">
              <label className="searchbar explore-toolbar__search">
                <Icon name="Search" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${meta.title.toLowerCase()}…`} />
              </label>
              <button className="chip" aria-pressed={hindi} onClick={() => setHindi((h) => !h)} style={{ padding: "7px 11px", flex: "none" }}>
                <Icon name="Globe2" size={15} /> हिंदी
              </button>
              <span className="chip chip--outline" style={{ flex: "none" }}>{list.length} shown</span>
            </div>
            {filters.length > 1 && (
              <div className="explore-toolbar__chips">
                {filters.map((f) => (
                  <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)} style={{ fontSize: ".7rem", padding: "4px 10px", flex: "none" }}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {!data && (
        <div className="stack" style={{ gap: 10, marginTop: 20 }}>
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52 }} />)}
        </div>
      )}

      {data && tab === "browse" && (
        <div style={{ marginTop: 12 }}>
          <div className="entry-grid">
            {list.slice(0, limit).map((e, i) => (
              <button key={i} className="entry" onClick={() => setSelected(e)} style={{ textAlign: "left", cursor: "pointer" }}>
                <div className="entry__title">{hindi && e.hindi ? e.hindi : e.name}</div>
                {e.primary && <div className="entry__sub">{e.primary}</div>}
                {e.secondary.length > 0 && (
                  <div className="row wrap" style={{ gap: 5 }}>
                    {e.secondary.slice(0, 3).map((s, j) => (
                      <span key={j} className="chip" style={{ fontSize: ".62rem", padding: "2px 7px" }}>{s}</span>
                    ))}
                  </div>
                )}
                <div className="entry__fact">{hindi && e.factHi ? e.factHi : e.fact}</div>
              </button>
            ))}
          </div>

          {list.length > limit && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button className="btn btn--ghost" onClick={() => setLimit((l) => l + 80)}>
                Show more ({list.length - limit} left)
              </button>
            </div>
          )}
          {!list.length && <div className="empty">No entry matched. Clear the search and try again.</div>}
        </div>
      )}

      {data && tab === "visual" && (
        <div style={{ marginTop: 20 }}>
          <ExplorerVisual
            kind={visualOf(meta)}
            entries={data.entries}
            accent={meta.accent}
            selected={selected?.name}
            onPick={setSelected}
            metric={metricOf(meta)}
          />
        </div>
      )}

      {data && tab === "notes" && (
        <div className="stack" style={{ gap: 14, marginTop: 20 }}>
          {data.notes.length === 0 && <div className="empty">This library is a straight list — open Browse to read all entries.</div>}
          {data.notes.map((n) => (
            <div key={n.id} className="card card--pad">
              <h3 style={{ marginBottom: 4 }}>{n.t?.[hindi ? 1 : 0] || n.t?.[0]}</h3>
              {n.sub && <p className="tiny muted" style={{ marginBottom: 10 }}>{n.sub[hindi ? 1 : 0]}</p>}
              <div className="table-wrap">
                <table className="data">
                  <thead>
                    <tr>{n.cols?.map((c, i) => <th key={i}>{c[hindi ? 1 : 0] || c[0]}</th>)}</tr>
                  </thead>
                  <tbody>
                    {n.rows?.map((r, ri) => (
                      <tr key={ri}>{r.map((cell: any, ci: number) => <td key={ci}>{Array.isArray(cell) ? cell[hindi ? 1 : 0] || cell[0] : cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {data && tab === "quiz" && (
        <div style={{ marginTop: 20 }}>
          {quiz && quiz.length >= 4 ? (
            <QuizDeck questions={quiz} title={meta.title} onRestart={startQuiz} />
          ) : (
            <div className="empty card card--pad">
              <Icon name="Target" />
              <b>Generate a 10-question round</b>
              <span className="sub">Questions are built from the entries of this library — {meta.title.toLowerCase()}.</span>
              <button className="btn btn--accent btn--sm" onClick={startQuiz}>Start quiz</button>
            </div>
          )}
        </div>
      )}

      {selected && (
        <EntrySheet
          entry={selected}
          hindi={hindi}
          onClose={() => setSelected(null)}
          accent={meta.accent}
          index={currentIndex}
          total={data?.entries.length ?? 0}
          onPrev={() => stepEntry(-1)}
          onNext={() => stepEntry(1)}
        />
      )}
    </div>
  );
}

function EntrySheet({
  entry, hindi, onClose, accent, index, total, onPrev, onNext,
}: {
  entry: Entry;
  hindi: boolean;
  onClose: () => void;
  accent: string;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const raw = entry.raw || {};
  const pairs = Object.entries(raw).filter(([k, v]) =>
    typeof v === "string" && v.trim() && !["n", "h", "fact", "facth"].includes(k) && !/h$/.test(k),
  ) as [string, string][];
  return (
    <div className="sheet-veil" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} style={{ ["--accent" as string]: accent }}>
        <div className="sheet__bar">
          <div className="sheet__nav">
            <button className="iconbtn" onClick={onPrev} disabled={index <= 0} aria-label="Previous entry" title="Previous (←)">
              <Icon name="ChevronLeft" size={16} />
            </button>
            <span className="tiny muted">{index >= 0 ? `${index + 1} / ${total}` : "Entry"}</span>
            <button className="iconbtn" onClick={onNext} disabled={index < 0 || index >= total - 1} aria-label="Next entry" title="Next (→)">
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
          <button className="btn btn--ghost btn--sm" onClick={onClose} aria-label="Close" title="Close (Esc)"><Icon name="X" /></button>
        </div>
        <h2 className="sheet__title">{hindi && entry.hindi ? entry.hindi : entry.name}</h2>
        <div className="row wrap" style={{ gap: 6, marginBottom: 6 }}>
          <span className="chip chip--accent">{entry.primary || "Entry"}</span>
        </div>
        {entry.hindi && !hindi && <p className="tiny muted" style={{ marginBottom: 10 }}>{entry.hindi}</p>}
        <EntryCourse entry={entry} accent={accent} />
        <p className="sheet__fact">{hindi && entry.factHi ? entry.factHi : entry.fact}</p>
        <div className="stack" style={{ gap: 7 }}>
          {pairs.slice(0, 16).map(([k, v]) => (
            <div key={k} className="sheet__row">
              <span className="tiny muted" style={{ textTransform: "capitalize", fontWeight: 700 }}>{k.replace(/([A-Z])/g, " $1")}</span>
              <span style={{ fontSize: ".84rem" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
