import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_CHAPTERS } from "../../data/curriculum";
import { getChapter, type Chapter } from "../../lib/content";
import { Icon } from "../../components/Icon";
import { useStore } from "../../lib/store";

type Card = { text: string; genuine: boolean; source: string };

function tamper(text: string) {
  const m = text.match(/\b(\d{1,4})\b/);
  if (m && m.index !== undefined) {
    const n = Number(m[1]);
    const changed = String(n <= 3 ? n + 2 : Math.max(2, Math.round(n * (Math.random() < 0.5 ? 1.5 : 0.6))));
    return text.slice(0, m.index) + changed + text.slice(m.index + m[1].length);
  }
  const words = [...text.matchAll(/\b[A-Z][a-z]{3,}\b/g)];
  const w = words[words.length - 1];
  if (w && w.index !== undefined) {
    const pool = ["Bihar", "Gujarat", "Assam", "Kerala", "Punjab", "Odisha", "Nepal", "Tibet"];
    return text.slice(0, w.index) + pool[Math.floor(Math.random() * pool.length)] + text.slice(w.index + w[0].length);
  }
  return text;
}

export default function Bluff() {
  const { setGameBest } = useStore();
  const [cards, setCards] = useState<Card[] | null>(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const build = async () => {
    setCards(null);
    setI(0);
    setScore(0);
    setDone(false);
    setPicked(null);
    const picks = [...ALL_CHAPTERS].sort(() => Math.random() - 0.5).slice(0, 4);
    const chapters: Chapter[] = [];
    for (const p of picks) {
      const c = await getChapter(p.id);
      if (c) chapters.push(c);
    }
    const facts = chapters
      .flatMap((c) => c.sections.flatMap((s) => s.blocks.filter((b) => b.type === "fact").map((b: any) => b.text as string)))
      .filter((t) => t.length > 60 && t.length < 200);
    const sample = [...facts].sort(() => Math.random() - 0.5).slice(0, 12);
    const out: Card[] = sample.map((t) => (Math.random() < 0.5 ? { text: t, genuine: true, source: t } : { text: tamper(t), genuine: false, source: t }));
    setCards(out);
  };

  useEffect(() => { build(); }, []);

  useEffect(() => {
    if (done && score > 0) setGameBest("bluff", score);
  }, [done]);

  const choose = (genuine: boolean) => {
    if (picked !== null || !cards) return;
    setPicked(genuine);
    const c = cards[i];
    if (genuine === c.genuine) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      if (i + 1 >= cards.length) setDone(true);
      else setI(i + 1);
    }, 1300);
  };

  if (!cards) return <div className="page"><div className="empty">Shuffling statements…</div></div>;

  if (done) {
    return (
      <div className="page page--narrow">
        <div className="card card--pad stack" style={{ gap: 14, textAlign: "center", alignItems: "center" }}>
          <div className="eyebrow">Fact or Bluff complete</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 800 }}>{score}/{cards.length}</div>
          <p className="sub">You correctly judged every statement you attempted.</p>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn--accent" onClick={build}><Icon name="RotateCcw" /> New round</button>
            <Link className="btn btn--ghost" to="/games">All games</Link>
          </div>
        </div>
      </div>
    );
  }

  const c = cards[i];
  return (
    <div className="page page--narrow">
      <div className="spread" style={{ marginBottom: 14 }}>
        <Link className="chip" to="/games"><Icon name="ChevronLeft" /> Games</Link>
        <div className="row" style={{ gap: 8 }}>
          <span className="chip chip--accent"><Icon name="Star" /> {score}</span>
          <span className="chip">{i + 1}/{cards.length}</span>
        </div>
      </div>

      <div className="card card--pad stack" style={{ gap: 16, minHeight: 240, justifyContent: "center" }}>
        <div className="eyebrow">Is this statement from the book?</div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem,2.4vw,1.45rem)", lineHeight: 1.4 }}>{c.text}</p>
        {picked !== null && (
          <div className={`fact ${c.genuine ? "" : "fact--tip"}`} style={{ fontSize: ".85rem" }}>
            {c.genuine ? "Genuine line — unchanged from the book." : `Bluff! The book actually says: ${c.source}`}
          </div>
        )}
      </div>

      <div className="row" style={{ gap: 10, marginTop: 14 }}>
        <button className="btn" style={{ flex: 1, background: "#15803d" }} onClick={() => choose(true)} disabled={picked !== null}>
          <Icon name="Check" /> Fact
        </button>
        <button className="btn" style={{ flex: 1, background: "#b91c1c" }} onClick={() => choose(false)} disabled={picked !== null}>
          <Icon name="X" /> Bluff
        </button>
      </div>
    </div>
  );
}
