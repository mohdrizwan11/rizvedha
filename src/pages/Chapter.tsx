import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ALL_CHAPTERS, chapterById } from "../data/curriculum";
import { highlightParts, keyFacts, quizFromChapter, useChapter, type Block } from "../lib/content";
import { useStore } from "../lib/store";
import { Icon } from "../components/Icon";
import { QuizDeck } from "../components/Quiz";
import { Ring } from "../components/ui";
import { CHAPTER_VISUALS, VizDiagram, vizBySlug } from "../components/visuals";

function FactText({ text }: { text: string }) {
  return (
    <>
      {highlightParts(text).map((p, i) => (p.mark ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>))}
    </>
  );
}

function toCloze(text: string) {
  const num = text.match(/[\d][\d.,]*/);
  if (num && num.index !== undefined) {
    return { q: text.slice(0, num.index) + "____" + text.slice(num.index + num[0].length), a: num[0] };
  }
  const words = [...text.matchAll(/\b[A-Z][a-zA-Z]{3,}\b/g)].filter((m) => !["The", "This", "These", "They", "India", "Which", "When", "There"].includes(m[0]));
  const last = words[words.length - 1];
  if (last && last.index !== undefined) {
    return { q: text.slice(0, last.index) + "____" + text.slice(last.index + last[0].length), a: last[0] };
  }
  return { q: text, a: text };
}

export default function ChapterPage() {
  const { id } = useParams();
  const meta = chapterById(id || "");
  const { chapter, loading } = useChapter(id);
  const { state, markSection, completeChapter, toggleBookmark, pushRecent, addXp } = useStore();
  const [tab, setTab] = useState<"read" | "cards" | "practice">("read");
  const [reveal, setReveal] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [retry, setRetry] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (meta) pushRecent(meta.id);
    setTab("read");
    setSeen(new Set());
    setCardIndex(0);
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    if (!chapter) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActiveSection(idx);
            const key = e.target.getAttribute("data-section") || "";
            if (key && !seen.has(key)) {
              setSeen((prev) => new Set(prev).add(key));
              markSection(chapter.id, key);
            }
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [chapter, seen, markSection]);

  const quiz = useMemo(
    () => (chapter && meta ? quizFromChapter(chapter, meta.subject, 10) : []),
    [chapter, meta, retry],
  );
  const cards = useMemo(() => (chapter ? keyFacts(chapter, 16) : []), [chapter]);

  if (!meta) return <div className="page empty">Chapter not found.</div>;
  if (loading || !chapter) {
    return (
      <div className="page">
        <div className="skeleton" style={{ height: 190, marginBottom: 16 }} />
        {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, marginBottom: 8 }} />)}
      </div>
    );
  }

  const prog = state.chapters[meta.id];
  const style = {
    ["--accent" as any]: meta.accent,
    ["--accent-soft" as any]: `color-mix(in srgb, ${meta.accent} 12%, white)`,
    ["--accent-ink" as any]: `color-mix(in srgb, ${meta.accent} 72%, black)`,
  };
  const pos = ALL_CHAPTERS.findIndex((c) => c.id === meta.id);
  const prev = ALL_CHAPTERS[pos - 1];
  const next = ALL_CHAPTERS[pos + 1];
  const readPct = chapter.sections.length ? Math.round((prog?.sections.length || 0) / chapter.sections.length * 100) : 0;

  return (
    <div className="page" style={style}>
      <div className="reader-head">
        <div className="crumbs">
          <Link to="/learn">Learn</Link> <Icon name="ChevronRight" size={12} />
          <Link to={`/subject/${meta.subject}`}>{meta.moduleTitle}</Link> <Icon name="ChevronRight" size={12} />
          <span>Chapter {meta.num}</span>
        </div>
        <div className="spread" style={{ alignItems: "flex-start", gap: 18, flexWrap: "wrap" }}>
          <div style={{ maxWidth: "54ch" }}>
            <h1>{meta.title}</h1>
            <div className="row wrap" style={{ gap: 8 }}>
              <span className="chip chip--accent"><Icon name="BookOpen" /> {chapter.factCount} facts</span>
              <span className="chip"><Icon name="Layers" /> {chapter.sections.length} sections</span>
              <span className="chip"><Icon name="Clock" /> {Math.max(2, Math.round(chapter.factCount / 14))} min read</span>
              <span className="chip chip--outline">Book p. {meta.pages[0]}–{meta.pages[1]}</span>
            </div>
          </div>
          <div className="row" style={{ gap: 14 }}>
            <div style={{ color: meta.accent }}><Ring pct={readPct} size={76} stroke={8} /></div>
            <div className="reader-tools">
              <button className="btn btn--soft btn--sm" onClick={() => toggleBookmark(meta.id)}>
                <Icon name={state.bookmarks.includes(meta.id) ? "Bookmark" : "BookMarked"} />
                {state.bookmarks.includes(meta.id) ? "Saved" : "Save"}
              </button>
              <button
                className={`btn btn--sm ${reveal ? "btn--accent" : "btn--ghost"}`}
                onClick={() => setReveal((r) => !r)}
                title="Hide facts and reveal them one by one"
              >
                <Icon name={reveal ? "EyeOff" : "Eye"} /> {reveal ? "Reveal mode on" : "Reveal mode"}
              </button>
            </div>
          </div>
        </div>

        <div className="row wrap" style={{ gap: 6, marginTop: 16 }}>
          {[
            { k: "read", label: "Read", icon: "BookOpen" },
            { k: "cards", label: "Flashcards", icon: "Layers3" },
            { k: "practice", label: `Practice ${quiz.length ? `(${quiz.length})` : ""}`, icon: "Target" },
          ].map((t) => (
            <button
              key={t.k}
              className="chip"
              aria-pressed={tab === t.k}
              onClick={() => setTab(t.k as any)}
              style={{ padding: "8px 14px", fontSize: ".8rem" }}
            >
              <Icon name={t.icon} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "read" && (
        <div className="reader-shell" style={{ marginTop: 20 }}>
          <div>
            {(() => {
              const viz = CHAPTER_VISUALS[meta.id] ? vizBySlug(CHAPTER_VISUALS[meta.id]) : undefined;
              if (!viz) return null;
              return (
                <Link to={`/visuals/${viz.slug}`} className="chapter-viz" style={{ ["--accent" as string]: viz.accent }}>
                  <div className="chapter-viz__art"><VizDiagram viz={viz} thumb /></div>
                  <div className="chapter-viz__body">
                    <div className="eyebrow eyebrow--accent">See it as a picture</div>
                    <b>{viz.title}</b>
                    <span>{viz.tag} · tap any part to read the line</span>
                  </div>
                  <Icon name="ArrowRight" />
                </Link>
              );
            })()}
            {chapter.sections.map((s, si) => {
              const facts = s.blocks.filter((b: Block) => b.type !== "table").length;
              return (
                <section
                  key={s.title + si}
                  className="block-section"
                  data-idx={si}
                  data-section={s.title}
                  ref={(el) => { sectionRefs.current[si] = el; }}
                >
                  <div className="block-section__head">
                    <span className="chapter-card__num">{String(si + 1).padStart(2, "0")}</span>
                    <h2>{s.title}</h2>
                    <span className="block-section__count">{facts}</span>
                  </div>
                  <div className={`factlist${reveal ? " toggle-reveal" : ""}`}>
                    {s.blocks.map((b, bi) =>
                      b.type === "table" ? (
                        <div className="table-wrap" key={bi}>
                          <table className="data">
                            <tbody>
                              {b.rows.map((r, ri) => (
                                <tr key={ri}>
                                  {r.map((cell, ci) => (ri === 0 ? <th key={ci}>{cell}</th> : <td key={ci}>{cell}</td>))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div
                          key={bi}
                          className={`fact${b.type === "tip" ? " fact--tip" : ""}`}
                          onClick={(e) => (reveal ? e.currentTarget.classList.toggle("revealed") : null)}
                        >
                          <FactText text={b.text} />
                        </div>
                      ),
                    )}
                  </div>
                </section>
              );
            })}

            <div className="card card--pad" style={{ marginTop: 26, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
              <div>
                <div className="eyebrow">Finished this chapter?</div>
                <b style={{ fontSize: "1rem" }}>{prog?.done ? "Marked complete — nicely done." : "Mark it complete to bank 30 XP"}</b>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <button className="btn btn--sm btn--ghost" onClick={() => setTab("practice")}>
                  <Icon name="Target" /> Practice
                </button>
                <button
                  className={`btn btn--sm ${prog?.done ? "btn--soft" : ""}`}
                  onClick={() => {
                    completeChapter(meta.id, !prog?.done);
                    if (!prog?.done) addXp(0);
                  }}
                >
                  <Icon name={prog?.done ? "CircleCheck" : "Check"} /> {prog?.done ? "Completed" : "Mark complete"}
                </button>
              </div>
            </div>

            <div className="chapter-foot">
              {prev ? (
                <Link className="card card--pad card--hover" to={`/learn/${prev.id}`}>
                  <div className="eyebrow"><Icon name="ArrowLeft" size={12} /> Previous</div>
                  <b>{prev.title}</b>
                </Link>
              ) : <span />}
              {next ? (
                <Link className="card card--pad card--hover" to={`/learn/${next.id}`} style={{ textAlign: "right" }}>
                  <div className="eyebrow" style={{ justifyContent: "flex-end" }}>Next <Icon name="ArrowRight" size={12} /></div>
                  <b>{next.title}</b>
                </Link>
              ) : <span />}
            </div>
          </div>

          <aside className="reader-nav">
            <div className="eyebrow" style={{ padding: "0 10px 8px" }}>Sections</div>
            {chapter.sections.map((s, si) => (
              <a
                key={si}
                href={`#s-${si}`}
                className={activeSection === si ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`[data-idx="${si}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {s.title}
              </a>
            ))}
            <div style={{ marginTop: 14, padding: "0 6px" }}>
              <Link className="btn btn--sm btn--soft" to={`/subject/${meta.subject}`} style={{ width: "100%" }}>
                Back to {meta.moduleTitle}
              </Link>
            </div>
          </aside>
        </div>
      )}

      {tab === "cards" && (
        <div className="stack" style={{ marginTop: 22, gap: 14 }}>
          <div className="spread">
            <div>
              <div className="eyebrow">Active recall</div>
              <h2 style={{ fontSize: "1.2rem" }}>Tap the card to flip</h2>
            </div>
            <span className="chip">{cardIndex + 1} / {cards.length}</span>
          </div>
          {cards.length ? (
            <>
              <div className="flash-wrap">
                <div className={`flash${flipped ? " flipped" : ""}`} onClick={() => setFlipped((f) => !f)}>
                  <div className="flash__face">
                    <div className="flash__label">Fill the blank</div>
                    <p style={{ fontFamily: "var(--font-display)" }}>{toCloze(cards[cardIndex]).q}</p>
                    <div className="tiny muted" style={{ marginTop: "auto" }}><Icon name="Eye" size={13} /> tap to reveal</div>
                  </div>
                  <div className="flash__face flash__face--back">
                    <div className="flash__label">Answer</div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: meta.accent }}>
                      {toCloze(cards[cardIndex]).a}
                    </p>
                    <div className="tiny" style={{ opacity: 0.7 }}>{cards[cardIndex]}</div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ justifyContent: "center", gap: 8 }}>
                <button className="btn btn--ghost btn--sm" onClick={() => { setCardIndex((i) => Math.max(0, i - 1)); setFlipped(false); }}>
                  <Icon name="ChevronLeft" /> Prev
                </button>
                <button className="btn btn--sm" onClick={() => { setFlipped(false); setCardIndex((i) => (i + 1) % cards.length); }}>
                  Next <Icon name="ChevronRight" />
                </button>
              </div>
            </>
          ) : <div className="empty">No recall cards for this chapter yet.</div>}
        </div>
      )}

      {tab === "practice" && (
        <div style={{ marginTop: 22 }}>
          {quiz.length ? (
            <QuizDeck key={`${meta.id}-${retry}`} questions={quiz} title={meta.title} onRestart={() => setRetry((r) => r + 1)} />
          ) : (
            <div className="empty card card--pad">
              <Icon name="Info" />
              <b>This chapter is concept-heavy</b>
              <span className="sub">Its facts are best learnt with flashcards — practice questions need numeric lines which this chapter has few of.</span>
              <button className="btn btn--sm" onClick={() => setTab("cards")}>Open flashcards</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
