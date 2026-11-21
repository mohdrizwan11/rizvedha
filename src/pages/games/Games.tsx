import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon";
import { PageHead } from "../../components/Layout";
import { useStore } from "../../lib/store";

const GAMES = [
  {
    to: "/games/rapid",
    title: "Rapid Fire",
    desc: "20 mixed GS questions · 60 seconds. Speed builds recall.",
    icon: "Timer",
    bg: "linear-gradient(140deg,#b45309,#ea580c 75%)",
    best: "rapid",
  },
  {
    to: "/games/bluff",
    title: "Fact or Bluff",
    desc: "One statement from the book, one tampered number. Spot it.",
    icon: "Brain",
    bg: "linear-gradient(140deg,#4338ca,#7c3aed 75%)",
    best: "bluff",
  },
  {
    to: "/games/match",
    title: "Match Up",
    desc: "Pair states, capitals, parks and dances against the clock.",
    icon: "Shuffle",
    bg: "linear-gradient(140deg,#0e7490,#0891b2 75%)",
    best: "match",
  },
  {
    to: "/games/sprint",
    title: "Chapter Sprint",
    desc: "Pick a subject, take 10 questions straight from its chapters.",
    icon: "Target",
    bg: "linear-gradient(140deg,#15803d,#22c55e 75%)",
    best: "sprint",
  },
];

export default function Games() {
  const { state } = useStore();
  return (
    <div className="page">
      <PageHead
        eyebrow="Play · active recall"
        title="Learn GS by playing"
        sub="Every game runs on the same facts you read in the chapters — so a score is a real memory check, not a separate syllabus."
      />
      <div className="game-grid">
        {GAMES.map((g) => (
          <Link key={g.to} to={g.to} className="game-card" style={{ background: g.bg }}>
            <div className="game-card__icon"><Icon name={g.icon} /></div>
            <b>{g.title}</b>
            <span>{g.desc}</span>
            <div className="row" style={{ gap: 6, marginTop: 6 }}>
              <span className="chip" style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}>
                <Icon name="Trophy" /> Best {state.gameBest[g.best] || 0}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-head"><h2>How to use the games</h2></div>
      <div className="quick-grid">
        <div className="quick">
          <div className="quick__icon" style={{ background: "#eef2ff", color: "#4338ca" }}><Icon name="BookOpen" /></div>
          <div><b>Read first, then play</b><span>Play the chapter you just read — recall spikes right after reading.</span></div>
        </div>
        <div className="quick">
          <div className="quick__icon" style={{ background: "#fff4e2", color: "#b45309" }}><Icon name="Flame" /></div>
          <div><b>Keep the streak</b><span>XP and streak count across chapters, quizzes and games.</span></div>
        </div>
        <div className="quick">
          <div className="quick__icon" style={{ background: "#e6f7ee", color: "#15803d" }}><Icon name="ListChecks" /></div>
          <div><b>Review misses</b><span>Wrong answers come back with the source line from the book.</span></div>
        </div>
      </div>
    </div>
  );
}
