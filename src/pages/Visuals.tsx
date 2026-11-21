import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { VISUALS, VizDiagram } from "../components/visuals";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";

const SUBJECT_ORDER = ["All", "Geography", "History", "Polity", "Biology"];

export default function Visuals() {
  const [params] = useSearchParams();
  const initial = params.get("subject") || "All";
  const [subject, setSubject] = useState(SUBJECT_ORDER.includes(initial) ? initial : "All");
  const list = useMemo(() => (subject === "All" ? VISUALS : VISUALS.filter((v) => v.subject === subject)), [subject]);
  const facts = VISUALS.reduce((a, v) => a + v.nodes.length, 0);

  return (
    <div className="page">
      <PageHead
        eyebrow="Visual lab"
        title="One picture, one whole chapter"
        sub={`${VISUALS.length} hand-drawn diagrams · ${facts} tappable facts. Look first, then tap any part to read the line an examiner would ask.`}
      />

      <div className="row wrap" style={{ gap: 7, marginBottom: 18 }}>
        {SUBJECT_ORDER.map((s) => (
          <button key={s} className="chip" aria-pressed={subject === s} onClick={() => setSubject(s)} style={{ padding: "8px 14px" }}>
            {s === "All" ? `All ${VISUALS.length}` : s}
          </button>
        ))}
      </div>

      <div className="viz-grid">
        {list.map((v) => (
          <Link
            key={v.slug}
            to={`/visuals/${v.slug}`}
            className="viz-card"
            style={{
              ["--accent" as string]: v.accent,
              ["--accent-soft" as string]: `color-mix(in srgb, ${v.accent} 12%, white)`,
              ["--accent-ink" as string]: `color-mix(in srgb, ${v.accent} 74%, black)`,
            }}
          >
            <div className="viz-card__art">
              <VizDiagram viz={v} thumb />
            </div>
            <div className="viz-card__body">
              <div className="row" style={{ gap: 6 }}>
                <span className="chip chip--accent"><Icon name={v.icon} /> {v.subject}</span>
              </div>
              <h3>{v.title}</h3>
              <p>{v.sub}</p>
              <div className="viz-card__foot">
                <span>{v.tag}</span>
                <span className="viz-card__go"><Icon name="ArrowRight" size={14} /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="footer-note">
        <span>Diagrams are drawn from the Parmar SSC theory chapters, not stock images — every label matches a book line.</span>
        <span>Tap a part, read the fact, then close your eyes and repeat it.</span>
      </div>
    </div>
  );
}
