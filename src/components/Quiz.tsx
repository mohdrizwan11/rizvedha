import { useMemo, useState } from "react";
import type { Question } from "../lib/content";
import { useStore } from "../lib/store";
import { Icon } from "./Icon";

export function QuizDeck({
  questions,
  title,
  onRestart,
  compact,
}: {
  questions: Question[];
  title?: string;
  onRestart?: () => void;
  compact?: boolean;
}) {
  const { recordQuiz } = useStore();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Question[]>([]);
  const q = questions[i];
  const finished = i >= questions.length;

  const finish = useMemo(
    () => (
      <div className="card card--pad stack" style={{ gap: 16, textAlign: "center", alignItems: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", fontWeight: 800 }}>
          {score}/{questions.length}
        </div>
        <div className="sub">
          {score === questions.length
            ? "Perfect round. This chapter is exam-ready."
            : score >= questions.length * 0.7
              ? "Strong. Skim the missed facts once more."
              : "Good start — read the section again, then retry."}
        </div>
        {missed.length > 0 && (
          <div className="stack" style={{ gap: 8, width: "100%", textAlign: "left", marginTop: 6 }}>
            <div className="eyebrow">Revisit these</div>
            {missed.map((m, idx) => (
              <div key={idx} className="fact" style={{ fontSize: ".84rem" }}>{m.source}</div>
            ))}
          </div>
        )}
        <div className="row" style={{ gap: 8, marginTop: 6 }}>
          {onRestart && (
            <button className="btn" onClick={onRestart}>
              <Icon name="RotateCcw" /> Play again
            </button>
          )}
        </div>
      </div>
    ),
    [score, questions.length, missed, onRestart],
  );

  if (finished) return finish;

  const choose = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    const correct = opt === q.answer;
    if (correct) setScore((s) => s + 1);
    else setMissed((m) => [...m, q]);
    recordQuiz(q.subject || title || "general", correct);
  };

  return (
    <div className="quiz" style={compact ? { maxWidth: 620 } : undefined}>
      <div className="row spread">
        <span className="chip"><Icon name="ListChecks" /> Question {i + 1} / {questions.length}</span>
        <span className="chip chip--accent"><Icon name="Star" /> {score} correct</span>
      </div>
      <div className="quiz__bar"><i style={{ width: `${(i / questions.length) * 100}%` }} /></div>

      <div className="card card--pad stack" style={{ gap: 14 }}>
        <p className="quiz__q">{q.q}</p>
        <div className="quiz__opts">
          {q.options.map((opt, idx) => {
            const state = picked ? (opt === q.answer ? "correct" : opt === picked ? "wrong" : "") : "";
            return (
              <button key={idx} className={`opt ${state}`} onClick={() => choose(opt)} disabled={!!picked}>
                <span className="opt__key">{String.fromCharCode(65 + idx)}</span>
                <span style={{ flex: 1 }}>{opt}</span>
                {state === "correct" && <Icon name="Check" size={16} />}
                {state === "wrong" && <Icon name="X" size={16} />}
              </button>
            );
          })}
        </div>
        {picked && (
          <div className="stack" style={{ gap: 10, animation: "fade-up .3s var(--ease)" }}>
            <div className="fact fact--tip" style={{ fontSize: ".84rem" }}>
              {picked === q.answer ? "Correct. " : `Answer: ${q.answer}. `}
              {q.source}
            </div>
            <button className="btn btn--accent" style={{ alignSelf: "flex-end" }} onClick={() => { setPicked(null); setI(i + 1); }}>
              {i + 1 === questions.length ? "Finish" : "Next question"} <Icon name="ArrowRight" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
