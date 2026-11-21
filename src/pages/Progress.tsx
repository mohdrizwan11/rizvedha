import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ALL_CHAPTERS, SUBJECTS, MODULES, chapterById } from "../data/curriculum";
import { useStore, streakOf, levelOf, dayKey } from "../lib/store";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";
import { Ring, Bar } from "../components/ui";

const DAY = 86400000;
const WEEKS = 53;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WD = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function Progress() {
  const { state, reset } = useStore();
  const lvl = levelOf(state.xp);
  const streak = streakOf(state.days);
  const done = Object.values(state.chapters).filter((c) => c.done).length;
  const readSections = Object.values(state.chapters).reduce((a, c) => a + c.sections.length, 0);

  const { cols, monthLabels, activeDays, yearXp, longest } = useMemo(() => {
    const end = new Date();
    end.setHours(12, 0, 0, 0);
    const start = new Date(end.getTime() - (WEEKS * 7 - 1) * DAY);
    start.setDate(start.getDate() - start.getDay()); // Sunday on the first row

    const cols: { date: Date; k: string; xp: number; future: boolean }[][] = [];
    const labels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    let activeDays = 0;
    let yearXp = 0;

    for (let w = 0; w < WEEKS; w++) {
      const week: { date: Date; k: string; xp: number; future: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start.getTime() + (w * 7 + d) * DAY);
        const k = dayKey(date);
        const future = date.getTime() > end.getTime();
        const xp = future ? 0 : state.days[k] || 0;
        if (!future) {
          yearXp += xp;
          if (xp > 0) activeDays++;
        }
        week.push({ date, k, xp, future });
      }
      const first = week[0].date;
      if (first.getMonth() !== lastMonth && first.getDate() <= 7) {
        labels.push({ col: w, label: MONTHS[first.getMonth()] });
        lastMonth = first.getMonth();
      }
      cols.push(week);
    }

    /* longest run of active days in the same window */
    let longest = 0;
    let run = 0;
    cols.forEach((week) =>
      week.forEach((c) => {
        if (c.future) return;
        if (c.xp > 0) {
          run++;
          longest = Math.max(longest, run);
        } else run = 0;
      }),
    );

    return { cols, monthLabels: labels, activeDays, yearXp, longest };
  }, [state.days]);

  const solvedPct = ALL_CHAPTERS.length ? Math.round((done / ALL_CHAPTERS.length) * 100) : 0;
  const accuracy = state.quiz.total ? Math.round((state.quiz.correct / state.quiz.total) * 100) : 0;

  return (
    <div className="page">
      <PageHead
        eyebrow="Progress"
        title="Your record, in one screen"
        sub="A contribution grid for consistency, counters for output. Everything is kept on this device."
      />

      <div className="rank-row">
        <div className="card card--pad rank-card">
          <Ring pct={lvl.pct} size={92} stroke={9} label={`L${lvl.level}`} />
          <div className="stack" style={{ gap: 3 }}>
            <div className="eyebrow">Rank</div>
            <b className="rank-card__title">{lvl.title}</b>
            <span className="tiny muted">{lvl.into} / {lvl.need} XP to next level</span>
            <span className="tiny muted">Total {state.xp} XP</span>
          </div>
        </div>

        <div className="counters">
          <div className="counter">
            <b>{done}</b>
            <span>Chapters solved</span>
            <em>of {ALL_CHAPTERS.length}</em>
          </div>
          <div className="counter">
            <b>{readSections}</b>
            <span>Sections read</span>
            <em>{solvedPct}% of the book</em>
          </div>
          <div className="counter">
            <b>{state.quiz.correct}</b>
            <span>Quiz accepted</span>
            <em>of {state.quiz.total} tried</em>
          </div>
          <div className="counter">
            <b>{accuracy}%</b>
            <span>Accuracy</span>
            <em>{accuracy >= 80 ? "exam-ready" : accuracy >= 60 ? "steady" : "keep drilling"}</em>
          </div>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 22 }}>
        <h2>Consistency</h2>
        <div className="row wrap" style={{ gap: 6 }}>
          <span className="chip chip--accent"><Icon name="Flame" /> {streak} day streak</span>
          <span className="chip">Longest {longest}</span>
          <span className="chip">{yearXp} XP this year</span>
        </div>
      </div>

      <div className="card card--pad">
        <div className="heat-head">
          <b>{activeDays} active days in the last year</b>
          <div className="row" style={{ gap: 8 }}>
            <span className="tiny muted">less</span>
            <div className="heat-legend">
              {[0, 1, 2, 3, 4].map((l) => <i key={l} data-l={l} />)}
            </div>
            <span className="tiny muted">more</span>
          </div>
        </div>

        <div className="heat-scroll">
          <div className="heat-wrap">
            <div className="heat-months" aria-hidden>
              {cols.map((_, i) => {
                const hit = monthLabels.find((m) => m.col === i);
                return <span key={i}>{hit ? hit.label : ""}</span>;
              })}
            </div>
            <div className="heat-body">
              <div className="heat-days" aria-hidden>
                {WD.map((d, i) => <span key={i}>{d}</span>)}
              </div>
              <div className="heatmap" role="img" aria-label={`${activeDays} active days in the last year`}>
                {cols.map((week, w) => (
                  <div className="heat-col" key={w}>
                    {week.map((c) => {
                      const l = c.xp === 0 ? 0 : c.xp < 10 ? 1 : c.xp < 30 ? 2 : c.xp < 70 ? 3 : 4;
                      return (
                        <i
                          key={c.k}
                          data-l={c.future ? "x" : l}
                          title={c.future ? "" : `${c.k} · ${c.xp} XP`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-head"><h2>Subject mastery</h2><Link to="/learn">Open syllabus</Link></div>
      <div className="card card--pad bars">
        {SUBJECTS.map((s) => {
          const chs = MODULES.filter((m) => m.subject === s.key).flatMap((m) => m.chapters);
          const d = chs.filter((c) => state.chapters[c.id]?.done).length;
          const pct = chs.length ? Math.round((d / chs.length) * 100) : 0;
          return (
            <div key={s.key} className="bar-row" style={{ ["--accent" as any]: s.accent }}>
              <Link to={`/subject/${s.key}`} style={{ fontWeight: 700, fontSize: ".82rem" }}>{s.title}</Link>
              <Bar pct={pct} color={s.accent} />
              <span className="tiny" style={{ fontWeight: 700 }}>{d}/{chs.length}</span>
            </div>
          );
        })}
      </div>

      <div className="section-head"><h2>Recently opened</h2><Link to="/bookmarks">Saved items</Link></div>
      <div className="chapter-grid">
        {state.recent.map(chapterById).filter(Boolean).slice(0, 4).map((c: any) => (
          <Link key={c.id} to={`/learn/${c.id}`} className="chapter-card" style={{ ["--accent" as any]: c.accent }}>
            <div className="chapter-card__top"><div className="chapter-card__num">{String(c.num).padStart(2, "0")}</div></div>
            <h3>{c.title}</h3>
            <div className="chapter-card__meta"><span>{c.moduleTitle}</span></div>
          </Link>
        ))}
        {!state.recent.length && <div className="empty card card--pad" style={{ gridColumn: "1/-1" }}>Open a chapter to see it here.</div>}
      </div>

      <div className="footer-note">
        <span>{ALL_CHAPTERS.length} chapters · {state.bookmarks.length} saved</span>
        <button className="btn btn--ghost btn--sm" onClick={() => { if (confirm("Reset all progress on this device?")) reset(); }}>
          Reset progress
        </button>
      </div>
    </div>
  );
}
