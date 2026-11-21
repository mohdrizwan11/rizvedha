import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ALL_CHAPTERS, chapterById } from "../data/curriculum";
import { EXPLORERS } from "../data/explorers";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";

type Hit = { chapter: string; fact: string };

export default function SearchPage() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(() => params.get("q") || "");
  const [index, setIndex] = useState<Hit[] | null>(null);

  /* keep the box in sync when the palette deep-links to ?q=… */
  useEffect(() => {
    const v = params.get("q");
    if (v !== null) setQ(v);
  }, [params]);

  useEffect(() => {
    import("../data/search.json")
      .then((m: any) => setIndex(m.default || m))
      .catch(() => setIndex([]));
  }, []);

  const chapterHits = useMemo(() => {
    if (q.trim().length < 2) return [];
    const n = q.toLowerCase();
    return ALL_CHAPTERS.filter((c) => c.title.toLowerCase().includes(n)).slice(0, 8);
  }, [q]);

  const explorerHits = useMemo(() => {
    if (q.trim().length < 2) return [];
    const n = q.toLowerCase();
    return EXPLORERS.filter((e) => (e.title + e.desc).toLowerCase().includes(n)).slice(0, 6);
  }, [q]);

  const factHits = useMemo(() => {
    if (!index || q.trim().length < 3) return [];
    const n = q.toLowerCase();
    const out: Hit[] = [];
    for (const h of index) {
      if (h.fact.toLowerCase().includes(n)) {
        out.push(h);
        if (out.length >= 40) break;
      }
    }
    return out;
  }, [q, index]);

  return (
    <div className="page page--narrow">
      <PageHead eyebrow="Search" title="Find any fact in the book" sub="Search chapter names, library names or any line of theory. Results link straight to the section." />

      <label className="searchbar" style={{ width: "100%", padding: "14px 18px", marginBottom: 20 }}>
        <Icon name="Search" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. Tropic of Cancer, Article 21, Black soil, Bharatanatyam…"
          style={{ fontSize: "1rem" }}
        />
        {q && <button className="btn btn--ghost btn--sm" onClick={() => setQ("")}><Icon name="X" /></button>}
      </label>

      {!q && (
        <div className="stack" style={{ gap: 10 }}>
          <div className="eyebrow">Try</div>
          <div className="row wrap" style={{ gap: 7 }}>
            {["Himalaya", "Fundamental Rights", "Monsoon", "National park", "Dance", "Article", "Currency", "SI unit"].map((s) => (
              <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {chapterHits.length > 0 && (
        <section className="block-section">
          <div className="block-section__head"><h2>Chapters</h2><span className="block-section__count">{chapterHits.length}</span></div>
          <div className="stack" style={{ gap: 7 }}>
            {chapterHits.map((c) => (
              <Link key={c.id} to={`/learn/${c.id}`} className="card card--pad card--hover spread" style={{ ["--accent" as any]: c.accent }}>
                <div>
                  <b style={{ fontFamily: "var(--font-display)" }}>{c.title}</b>
                  <div className="tiny muted">{c.moduleTitle} · page {c.pages[0]}</div>
                </div>
                <Icon name="ChevronRight" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {explorerHits.length > 0 && (
        <section className="block-section">
          <div className="block-section__head"><h2>Libraries</h2></div>
          <div className="stack" style={{ gap: 7 }}>
            {explorerHits.map((e) => (
              <Link key={e.slug} to={`/explore/${e.slug}`} className="card card--pad card--hover spread" style={{ ["--accent" as any]: e.accent }}>
                <div>
                  <b style={{ fontFamily: "var(--font-display)" }}>{e.title}</b>
                  <div className="tiny muted">{e.count} entries · {e.tag}</div>
                </div>
                <Icon name="ChevronRight" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {factHits.length > 0 && (
        <section className="block-section">
          <div className="block-section__head"><h2>Facts</h2><span className="block-section__count">{factHits.length}</span></div>
          <div className="factlist">
            {factHits.map((h, i) => {
              const ch = chapterById(h.chapter);
              return (
                <Link key={i} to={`/learn/${h.chapter}`} className="fact" style={{ display: "block" }}>
                  {h.fact}
                  <div className="tiny muted" style={{ marginTop: 4 }}>{ch ? `${ch.title} · ${ch.moduleTitle}` : h.chapter}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {q.length >= 3 && !chapterHits.length && !explorerHits.length && !factHits.length && (
        <div className="empty">
          <Icon name="Search" />
          <b>No match yet</b>
          <span className="sub">{index === null ? "Loading the fact index…" : "Try a shorter keyword — the index holds the highest-yield lines of every chapter."}</span>
        </div>
      )}
    </div>
  );
}
