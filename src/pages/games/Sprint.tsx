import { useState } from "react";
import { Link } from "react-router-dom";
import { SUBJECTS, MODULES } from "../../data/curriculum";
import { getChapter, quizFromChapter, shuffle, type Question } from "../../lib/content";
import { Icon } from "../../components/Icon";
import { QuizDeck } from "../../components/Quiz";

export default function Sprint() {
  const [subject, setSubject] = useState<string | null>(null);
  const [qs, setQs] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [round] = useState(0);

  const start = async (key: string) => {
    setLoading(true);
    setSubject(key);
    const meta = SUBJECTS.find((s) => s.key === key)!;
    const chapters = MODULES.filter((m) => m.subject === key).flatMap((m) => m.chapters);
    const picks = shuffle(chapters).slice(0, 6);
    const out: Question[] = [];
    for (const p of picks) {
      const c = await getChapter(p.id);
      if (c) out.push(...quizFromChapter(c, meta.title, 3));
    }
    setQs(shuffle(out).slice(0, 12));
    setLoading(false);
  };

  if (qs && qs.length >= 4) {
    return (
      <div className="page page--narrow">
        <div className="spread" style={{ marginBottom: 12 }}>
          <Link className="chip" to="/games"><Icon name="ChevronLeft" /> Games</Link>
          <span className="chip chip--accent">{SUBJECTS.find((s) => s.key === subject)?.title} sprint</span>
        </div>
        <QuizDeck key={round} questions={qs} title={subject || ""} onRestart={() => { setQs(null); setSubject(null); }} />
      </div>
    );
  }

  return (
    <div className="page page--narrow">
      <div className="spread" style={{ marginBottom: 16 }}>
        <Link className="chip" to="/games"><Icon name="ChevronLeft" /> Games</Link>
      </div>
      <h1 style={{ marginBottom: 6 }}>Chapter Sprint</h1>
      <p className="sub" style={{ marginBottom: 20 }}>
        Pick a subject. We pull lines straight from its chapters, blank the key value and give you four choices — 12 questions.
      </p>

      {loading && <div className="empty">Building your paper from the book…</div>}

      {!loading && (
        <div className="subject-grid">
          {SUBJECTS.map((s) => (
            <button
              key={s.key}
              className="subject-card"
              style={{
                ["--accent" as any]: s.accent,
                ["--accent-soft" as any]: `color-mix(in srgb, ${s.accent} 12%, white)`,
                ["--accent-ink" as any]: `color-mix(in srgb, ${s.accent} 72%, black)`,
                textAlign: "left",
              }}
              onClick={() => start(s.key)}
            >
              <div className="subject-card__icon"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.blurb}</p>
            </button>
          ))}
        </div>
      )}

      {qs && qs.length < 4 && (
        <div className="empty card card--pad" style={{ marginTop: 16 }}>
          <Icon name="Info" />
          <b>Not enough numeric lines in this subject</b>
          <span className="sub">Try Geography, Polity or Biology — they have the most exam-style values.</span>
        </div>
      )}
    </div>
  );
}
