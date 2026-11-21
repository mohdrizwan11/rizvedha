import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VISUALS, VizDiagram, vizBySlug } from "../components/visuals";
import { Icon } from "../components/Icon";
import { useStore } from "../lib/store";

export default function VisualDetail() {
  const { slug = "" } = useParams();
  const viz = vizBySlug(slug);
  const { addXp } = useStore();
  const [active, setActive] = useState<string | undefined>(viz?.nodes[0]?.id);
  const [claimed, setClaimed] = useState(false);

  const index = useMemo(() => VISUALS.findIndex((v) => v.slug === slug), [slug]);
  const next = VISUALS[(index + 1) % VISUALS.length];
  const prev = VISUALS[(index - 1 + VISUALS.length) % VISUALS.length];

  if (!viz) {
    return (
      <div className="page empty">
        <h1>Diagram not found</h1>
        <Link className="btn btn--accent" to="/visuals">Back to the visual lab</Link>
      </div>
    );
  }

  const node = viz.nodes.find((n) => n.id === active);

  return (
    <div
      className="page page--narrow"
      style={{
        ["--accent" as string]: viz.accent,
        ["--accent-soft" as string]: `color-mix(in srgb, ${viz.accent} 12%, white)`,
        ["--accent-ink" as string]: `color-mix(in srgb, ${viz.accent} 74%, black)`,
      }}
    >
      <div className="row wrap" style={{ gap: 8, padding: "6px 0 14px", justifyContent: "space-between" }}>
        <Link to="/visuals" className="chip"><Icon name="ArrowLeft" /> Visual lab</Link>
        <span className="chip chip--accent"><Icon name={viz.icon} /> {viz.subject}</span>
      </div>

      <div className="hello" style={{ paddingBottom: 14 }}>
        <h1>{viz.title}</h1>
        <p className="sub">{viz.sub}</p>
      </div>

      <div className="viz-stage">
        <VizDiagram viz={viz} active={active} onPick={setActive} />
      </div>

      <div className="viz-read">
        <div className="viz-read__main">
          <div className="eyebrow eyebrow--accent">{node ? node.label : "Tap a part"}</div>
          <p className="viz-read__fact">
            {node ? node.fact : "Every labelled part of the picture is a tap target — start anywhere."}
          </p>
          <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
            {viz.nodes.map((n) => (
              <button
                key={n.id}
                className="chip"
                aria-pressed={active === n.id}
                onClick={() => setActive(n.id)}
                style={active === n.id ? { background: "var(--accent)", color: "#fff", borderColor: "transparent" } : undefined}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
        <div className="viz-read__side">
          <div className="viz-read__count"><b>{viz.nodes.length}</b><span>facts in this picture</span></div>
          <button
            className="btn btn--accent btn--sm"
            disabled={claimed}
            onClick={() => {
              addXp(10);
              setClaimed(true);
            }}
          >
            <Icon name={claimed ? "Check" : "Sparkles"} /> {claimed ? "Added to today" : "I can explain this · +10 XP"}
          </button>
          <p className="tiny muted">Say each fact out loud once. That is how a diagram becomes a memory.</p>
        </div>
      </div>

      <div className="viz-switch">
        <Link to={`/visuals/${prev.slug}`} className="viz-switch__link">
          <Icon name="ArrowLeft" />
          <span><small>Previous</small><b>{prev.title}</b></span>
        </Link>
        <Link to={`/visuals/${next.slug}`} className="viz-switch__link viz-switch__link--next">
          <span><small>Next</small><b>{next.title}</b></span>
          <Icon name="ArrowRight" />
        </Link>
      </div>
    </div>
  );
}
