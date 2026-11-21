import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EXPLORERS, EXPLORER_SUBJECTS } from "../data/explorers";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";

export default function Explore() {
  const [subject, setSubject] = useState<string>("All");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      EXPLORERS.filter(
        (e) =>
          (subject === "All" || e.subject === subject) &&
          (!q.trim() || (e.title + " " + e.desc + " " + e.tag).toLowerCase().includes(q.toLowerCase())),
      ),
    [subject, q],
  );

  const totalEntries = EXPLORERS.reduce((a, e) => a + e.count, 0);

  return (
    <div className="page">
      <PageHead
        eyebrow="Explore · static GK libraries"
        title="Every list SSC asks from, mapped"
        sub={`${EXPLORERS.length} visual libraries · ${totalEntries.toLocaleString()} entries. Browse like a picture book, then flip into a quiz on the same screen.`}
        right={
          <label className="searchbar">
            <Icon name="Search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rivers, dances, awards…" />
          </label>
        }
      />

      <div className="row wrap" style={{ gap: 7, marginBottom: 18 }}>
        <button className="chip" aria-pressed={subject === "All"} onClick={() => setSubject("All")} style={{ padding: "8px 14px" }}>
          All libraries
        </button>
        {EXPLORER_SUBJECTS.map((s) => (
          <button key={s} className="chip" aria-pressed={subject === s} onClick={() => setSubject(s)} style={{ padding: "8px 14px" }}>
            {s}
          </button>
        ))}
      </div>

      <div className="explore-grid">
        {list.map((e) => (
          <Link
            key={e.slug}
            to={`/explore/${e.slug}`}
            className="explore-card"
            style={{ ["--accent" as any]: e.accent, ["--accent-soft" as any]: `color-mix(in srgb, ${e.accent} 12%, white)`, ["--accent-ink" as any]: `color-mix(in srgb, ${e.accent} 74%, black)` }}
          >
            <div className="explore-card__icon"><Icon name={e.icon} /></div>
            <h3>{e.title}</h3>
            <p>{e.desc}</p>
            <div className="explore-card__foot">
              <span className="explore-card__count">{e.count} entries</span>
              <span className="chip" style={{ fontSize: ".64rem", padding: "3px 8px" }}>{e.tag}</span>
            </div>
          </Link>
        ))}
      </div>

      {!list.length && <div className="empty">Nothing matched. Try “dance”, “lake” or “award”.</div>}

      <div className="footer-note">
        <span>Libraries cover the static-GK syllabus of the Parmar SSC book plus the SSC Focus GK-game set.</span>
        <span>Tap any library for maps, notes and a quick quiz.</span>
      </div>
    </div>
  );
}
