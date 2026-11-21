import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EXPLORERS, loadExplorer } from "../../data/explorers";
import { Icon } from "../../components/Icon";
import { useStore } from "../../lib/store";

/** Libraries that make a clean name → category matching round. */
const POOL = ["national-parks", "temples", "dances", "festivals", "rivers", "monuments", "tribes", "gi-tags", "lakes", "soils", "crops", "india-basics"];

type Pair = { left: string; right: string };

export default function Match() {
  const { setGameBest } = useStore();
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  const [libName, setLibName] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [tries, setTries] = useState(0);
  const [t0, setT0] = useState(Date.now());
  const [done, setDone] = useState(false);

  const build = async () => {
    setPairs(null);
    setMatched(new Set());
    setSel(null);
    setWrong(null);
    setTries(0);
    setDone(false);
    const slug = POOL[Math.floor(Math.random() * POOL.length)];
    const meta = EXPLORERS.find((e) => e.slug === slug)!;
    const data = await loadExplorer(slug);
    const byCat = new Map<string, string[]>();
    data.entries.forEach((e) => {
      if (!e.primary) return;
      byCat.set(e.primary, [...(byCat.get(e.primary) || []), e.name]);
    });
    const cats = [...byCat.entries()].filter(([, names]) => names.length >= 2).sort(() => Math.random() - 0.5).slice(0, 6);
    const out: Pair[] = cats.map(([cat, names]) => ({ left: names[Math.floor(Math.random() * names.length)], right: cat }));
    setPairs(out);
    setLibName(meta.title);
    setT0(Date.now());
  };

  useEffect(() => { build(); }, []);

  useEffect(() => {
    if (pairs && matched.size === pairs.length && pairs.length > 0) {
      setDone(true);
      const secs = Math.round((Date.now() - t0) / 1000);
      setGameBest("match", Math.max(0, 60 - secs));
    }
  }, [matched, pairs]);

  const rights = useMemo(() => (pairs ? [...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5) : []), [pairs]);
  const lefts = useMemo(() => (pairs ? [...pairs].sort(() => Math.random() - 0.5) : []), [pairs]);

  const pickRight = (right: string) => {
    if (!sel || !pairs) return;
    const pair = pairs.find((p) => p.left === sel);
    if (pair && pair.right === right) {
      setMatched((m) => new Set(m).add(sel));
      setSel(null);
    } else {
      setWrong(right);
      setTries((t) => t + 1);
      setTimeout(() => setWrong(null), 500);
      setSel(null);
    }
  };

  if (!pairs) return <div className="page"><div className="empty">Dealing the cards…</div></div>;

  if (done) {
    const secs = Math.round((Date.now() - t0) / 1000);
    return (
      <div className="page page--narrow">
        <div className="card card--pad stack" style={{ gap: 12, textAlign: "center", alignItems: "center" }}>
          <div className="eyebrow">Match Up complete</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", fontWeight: 800 }}>{secs}s</div>
          <p className="sub">{tries === 0 ? "Flawless — every pair first try." : `${tries} misplaced tap${tries > 1 ? "s" : ""}. Try to beat it.`}</p>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn--accent" onClick={build}><Icon name="Shuffle" /> New set</button>
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
        <span className="chip chip--accent">{libName}</span>
      </div>
      <p className="sub" style={{ marginBottom: 14 }}>Tap a name, then its correct group. {matched.size}/{pairs.length} paired.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div className="stack" style={{ gap: 8 }}>
          {lefts.map((p) => {
            const isMatched = matched.has(p.left);
            return (
              <button
                key={p.left}
                className="opt"
                onClick={() => !isMatched && setSel(p.left)}
                style={{
                  borderColor: isMatched ? "#16a34a" : sel === p.left ? "var(--accent)" : undefined,
                  background: isMatched ? "#f0fdf4" : sel === p.left ? "var(--accent-soft)" : undefined,
                  opacity: isMatched ? 0.55 : 1,
                  fontSize: ".82rem",
                }}
                disabled={isMatched}
              >
                {p.left}
              </button>
            );
          })}
        </div>
        <div className="stack" style={{ gap: 8 }}>
          {rights.map((r) => {
            const used = pairs.some((p) => p.right === r && matched.has(p.left));
            return (
              <button
                key={r}
                className="opt"
                onClick={() => pickRight(r)}
                style={{
                  borderColor: wrong === r ? "#dc2626" : used ? "#16a34a" : undefined,
                  background: used ? "#f0fdf4" : wrong === r ? "#fef2f2" : undefined,
                  opacity: used ? 0.55 : 1,
                  fontSize: ".82rem",
                }}
                disabled={used}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
