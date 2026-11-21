import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon";
import { useStore } from "../../lib/store";
import { shuffle } from "../../lib/content";

type PQ = { id: string; topicName: string; question: string; options: string[]; correct: string; explanation: string };

export default function RapidFire() {
  const { setGameBest } = useStore();
  const [pool, setPool] = useState<PQ[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(60);
  const [over, setOver] = useState(false);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const tick = useRef<number | null>(null);

  const start = async () => {
    const mod: any = await import("../../data/datasets/play-questions.json");
    const all: PQ[] = mod.default?.questions || mod.questions;
    setPool(shuffle(all).slice(0, 30));
    setIdx(0);
    setScore(0);
    setLeft(60);
    setOver(false);
  };

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (over || !pool) return;
    tick.current = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          window.clearInterval(tick.current!);
          setOver(true);
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => window.clearInterval(tick.current!);
  }, [pool, over]);

  useEffect(() => {
    if (over && score > 0) setGameBest("rapid", score);
  }, [over]);

  const q = useMemo(() => pool?.[idx], [pool, idx]);

  const answer = (opt: string) => {
    if (!q || over) return;
    const ok = opt === q.correct;
    if (ok) setScore((s) => s + 1);
    setFlash(ok ? "ok" : "bad");
    setTimeout(() => setFlash(null), 260);
    setIdx((i) => i + 1);
  };

  if (!pool || !q) {
    return <div className="page"><div className="empty">Loading the question bank…</div></div>;
  }

  if (over) {
    return (
      <div className="page page--narrow">
        <div className="card card--pad stack" style={{ gap: 14, alignItems: "center", textAlign: "center" }}>
          <div className="eyebrow">Rapid Fire complete</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 800 }}>{score}</div>
          <p className="sub">questions answered correctly in 60 seconds.</p>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn--accent" onClick={start}><Icon name="RotateCcw" /> Play again</button>
            <Link className="btn btn--ghost" to="/games">All games</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--narrow">
      <div className="spread" style={{ marginBottom: 14 }}>
        <Link className="chip" to="/games"><Icon name="ChevronLeft" /> Games</Link>
        <div className="row" style={{ gap: 8 }}>
          <span className="chip chip--accent"><Icon name="Star" /> {score}</span>
          <span className="chip" style={{ minWidth: 64, justifyContent: "center", background: left < 15 ? "#fef2f2" : undefined, color: left < 15 ? "#b91c1c" : undefined }}>
            <Icon name="Timer" /> {left}s
          </span>
        </div>
      </div>
      <div className="quiz__bar" style={{ marginBottom: 16 }}><i style={{ width: `${(left / 60) * 100}%`, transition: "width 1s linear" }} /></div>

      <div className="card card--pad stack" style={{ gap: 14, boxShadow: flash === "ok" ? "0 0 0 3px #16a34a inset" : flash === "bad" ? "0 0 0 3px #dc2626 inset" : undefined }}>
        <div className="row spread">
          <span className="chip">{q.topicName}</span>
          <span className="tiny muted">Q{idx + 1}</span>
        </div>
        <p className="quiz__q">{q.question}</p>
        <div className="quiz__opts">
          {q.options.map((o, i) => (
            <button key={i} className="opt" onClick={() => answer(o)}>
              <span className="opt__key">{String.fromCharCode(65 + i)}</span>
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
