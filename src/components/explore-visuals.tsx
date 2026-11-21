import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Entry } from "../data/explorers";

/* ------------------------------------------------------------------
   Visual engine for the Explore libraries. Every list gets the picture
   its subject deserves: river courses, road links, state maps,
   timelines, rankings or a colour-coded wall of facts.
------------------------------------------------------------------- */

export type VisualKind = "river" | "link" | "places" | "states" | "timeline" | "bars" | "mosaic";

const W = 520;
const H = 578;

type Geo = {
  states: { d: string; name: string }[];
  border: string;
  project: (c: [number, number]) => [number, number];
  line: (coords: [number, number][]) => string;
};

let geoPromise: Promise<Geo> | null = null;

function loadGeo(): Promise<Geo> {
  if (geoPromise) return geoPromise;
  geoPromise = (async () => {
    const topo: any = (await import("../data/india-states.topo.json")).default;
    const fc: any = feature(topo, topo.objects.states);
    const projection = geoMercator().fitExtent([[12, 12], [W - 12, H - 12]], fc);
    const path = geoPath(projection);
    const border: any = mesh(topo, topo.objects.states, (a: any, b: any) => a !== b);
    return {
      states: fc.features
        .filter((f: any) => !String(f.properties?.STATE_C || "").startsWith("DISPUTED"))
        .map((f: any) => ({ d: path(f) || "", name: String(f.properties?.STATE_C || "") })),
      border: path(border) || "",
      project: (c) => {
        const p = projection(c) as [number, number] | null;
        return (p || [0, 0]) as [number, number];
      },
      line: (coords) => {
        const d = path({ type: "LineString", coordinates: coords } as any);
        return d || "";
      },
    };
  })();
  return geoPromise;
}

function useGeo() {
  const [geo, setGeo] = useState<Geo | null>(null);
  useEffect(() => {
    let on = true;
    loadGeo().then((g) => on && setGeo(g));
    return () => {
      on = false;
    };
  }, []);
  return geo;
}

/* ------------------------------------------------------------ palette */

const POINT_COLORS = [
  "#0e7490", "#b45309", "#4d7c0f", "#7c3aed", "#be123c",
  "#0369a1", "#a16207", "#15803d", "#c2410c", "#4338ca",
];

/* Human labels for the short category codes stored in the datasets. */
const CAT_LABELS: Record<string, string> = {
  folk: "Folk", tribal: "Tribal", classical: "Classical", theatre: "Theatre",
  paint: "Painting", puppet: "Puppetry", textile: "Textiles", sculpt: "Sculpture",
  relig: "Religious", culture: "Cultural", harvest: "Harvest", fair: "Fair", arts: "Arts",
  classic: "Classics", world: "World books", auto: "Autobiography", novel: "Novel",
  lit: "Literature", nonfic: "Non-fiction",
  invent: "Inventions", branch: "Branches of science", unit: "Units", instr: "Instruments",
  day: "Days", hq: "Headquarters", first: "Firsts", nick: "Nicknames",
  found: "Foundations", cmte: "Committees",
  country: "Countries", org: "Organisations", geo: "Geography",
  intl: "International", gallant: "Gallantry", sport: "Sports", civil: "Civilian",
  martial: "Martial arts", cricket: "Cricket", venue: "Venues", trad: "Traditional",
  race: "Races", inst: "Institutions",
  central: "Central India", terai: "Terai", him: "Himalayan", ghats: "Ghats",
  ne: "North-East", sea: "Coastal & islands",
  hyd: "Hydro", coal: "Coal thermal", sol: "Solar", gas: "Gas", nuc: "Nuclear", wind: "Wind",
};

function catLabel(raw: any): string {
  const cat = String(raw?.cat || "").trim();
  if (cat) return cat;
  const code = String(raw?.c || "").trim().toLowerCase();
  return CAT_LABELS[code] || (code ? pretty(code) : "");
}

const pretty = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* --------------------------------------------------------------- shell */

function Shell({
  children,
  legend,
  caption,
  side,
}: {
  children: React.ReactNode;
  legend?: React.ReactNode;
  caption: string;
  side?: React.ReactNode;
}) {
  return (
    <div className={`exviz${side || legend ? " exviz--split" : ""}`}>
      <div className="exviz__stage">
        {children}
        <div className="exviz__caption">{caption}</div>
      </div>
      {(legend || side) && (
        <aside className="exviz__side">
          {legend}
          {side}
        </aside>
      )}
    </div>
  );
}

function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`exmap ${className || ""}`} role="img">
      <defs>
        <linearGradient id="ex-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbeef6" />
          <stop offset="1" stopColor="#c7e5ef" />
        </linearGradient>
        <radialGradient id="ex-glow">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#ex-sea)" rx="16" />
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------- tooltip */

function Tip({ x, y, title, sub }: { x: number; y: number; title: string; sub?: string }) {
  const tx = Math.min(W - 176, Math.max(8, x - 84));
  const ty = Math.max(10, y - 58);
  return (
    <g pointerEvents="none">
      <rect x={tx} y={ty} width={168} height={sub ? 44 : 30} rx={9} fill="#16202e" opacity={0.94} />
      <text x={tx + 10} y={ty + 19} fill="#fff" fontSize={13} fontWeight={700} fontFamily="Plus Jakarta Sans, sans-serif">
        {title.length > 23 ? title.slice(0, 22) + "…" : title}
      </text>
      {sub && (
        <text x={tx + 10} y={ty + 35} fill="#dbe4ef" fontSize={11} fontFamily="Plus Jakarta Sans, sans-serif">
          {sub.length > 27 ? sub.slice(0, 26) + "…" : sub}
        </text>
      )}
    </g>
  );
}

/* --------------------------------------------------------------- river */

/** One colour family per river system, so a basin reads as one colour. */
const BASIN_COLORS: Record<string, string> = {
  Ganga: "#1d6fb8",
  Indus: "#0f9b8e",
  Brahmaputra: "#7c3aed",
  Godavari: "#d97706",
  Krishna: "#15803d",
  Kaveri: "#be123c",
  Narmada: "#c2410c",
  Tapti: "#0891b2",
  Mahanadi: "#4d7c0f",
  Damodar: "#9333ea",
  Sabarmati: "#a16207",
  Mahi: "#b45309",
  Luni: "#78716c",
};
const BASIN_FALLBACK = "#64748b";

const basinColor = (root: string) => BASIN_COLORS[root] || BASIN_FALLBACK;

const SEA_LABEL: Record<string, string> = {
  "bay of bengal": "Bay of Bengal",
  "arabian sea": "Arabian Sea",
  "arabian sea (gulf of khambhat)": "Arabian Sea",
  "arabian sea (via pakistan)": "Arabian Sea",
  "rann of kutch": "Rann of Kutch",
};

export function RiverVisual({
  entries,
  accent,
  selected,
  onPick,
}: {
  entries: Entry[];
  accent: string;
  selected?: string;
  onPick: (e: Entry) => void;
}) {
  const geo = useGeo();
  const [hover, setHover] = useState<Entry | null>(null);
  const [basin, setBasin] = useState("All");
  const [level, setLevel] = useState<"all" | "main">("all");

  const rivers = useMemo(
    () => entries.filter((e) => Array.isArray(e.raw?.wp) && e.raw.wp.length > 1),
    [entries],
  );

  const byName = useMemo(() => new Map(rivers.map((r) => [r.name, r])), [rivers]);

  const meta = useMemo(() => {
    const walk = (e: Entry) => {
      let cur = e;
      let depth = 0;
      const chain: string[] = [e.name];
      while (cur.raw?.parent && byName.has(String(cur.raw.parent)) && depth < 9) {
        cur = byName.get(String(cur.raw.parent))!;
        chain.push(cur.name);
        depth++;
      }
      return { root: cur.name, depth, chain };
    };
    const map = new Map<string, { root: string; depth: number; chain: string[] }>();
    rivers.forEach((r) => map.set(r.name, walk(r)));
    return map;
  }, [rivers, byName]);

  const rootOf = (e: Entry) => meta.get(e.name)?.root || "Other";
  const depthOf = (e: Entry) => meta.get(e.name)?.depth ?? 0;

  const basins = useMemo(() => {
    const m = new Map<string, number>();
    rivers.forEach((r) => m.set(rootOf(r), (m.get(rootOf(r)) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [rivers]);

  const shown = rivers.filter(
    (r) => (basin === "All" || rootOf(r) === basin) && (level === "all" || depthOf(r) === 0),
  );
  const focus = hover || rivers.find((r) => r.name === selected) || null;

  const longest = Math.max(1, ...rivers.map((r) => Number(r.raw.L) || 0));

  const paths = useMemo(() => {
    if (!geo) return [];
    return shown
      .map((r) => {
        const wp = r.raw.wp as [number, number][];
        return {
          r,
          wp,
          d: geo.line(wp),
          org: geo.project(wp[0]),
          mouth: geo.project(wp[wp.length - 1]),
          main: depthOf(r) === 0,
          col: basinColor(rootOf(r)),
        };
      })
      .sort((a, b) => Number(a.main) - Number(b.main));
  }, [geo, shown, meta]);

  /* Adaptive labels: with all 27 rivers on screen only the big stems are
     named; pick a system and its tributaries get named too. */
  const labels = useMemo(() => {
    if (!geo) return [] as { x: number; y: number; text: string; col: string; name: string }[];
    const boxes: { x: number; y: number; w: number; h: number }[] = [];
    const out: { x: number; y: number; text: string; col: string; name: string }[] = [];

    const worth = (r: Entry) =>
      basin !== "All" || (depthOf(r) === 0 && Number(r.raw.L) >= 700) || r.name === "Yamuna";

    const pick = paths
      .filter((p) => worth(p.r))
      .sort((a, b) => Number(b.r.raw.L) - Number(a.r.raw.L));

    pick.forEach(({ r, wp, col }) => {
      const w = r.name.length * 7.2 + 12;
      const anchors = [0.3, 0.42, 0.54, 0.66, 0.78];
      const spots: [number, number][] = [
        [9, -8],
        [9, 16],
        [-w - 9, -8],
        [-w - 9, 16],
        [9, 33],
        [-w - 9, 33],
      ];
      for (const t of anchors) {
        const i = Math.min(wp.length - 1, Math.max(0, Math.round((wp.length - 1) * t)));
        const [px, py] = geo.project(wp[i]);
        for (const [dx, dy] of spots) {
          const x = px + dx;
          const y = py + dy;
          if (x < 8 || x + w > W - 8 || y < 20 || y > H - 14) continue;
          const hit = boxes.some(
            (b) => x < b.x + b.w + 4 && x + w + 4 > b.x && Math.abs(y - b.y) < 15,
          );
          if (!hit) {
            boxes.push({ x, y, w, h: 14 });
            out.push({ x, y, text: r.name, col, name: r.name });
            return;
          }
        }
      }
    });
    return out;
  }, [geo, paths, basin, meta]);

  const seaOf = (e: Entry) =>
    SEA_LABEL[String(e.raw.drain || "").toLowerCase()] || String(e.raw.drain || "");

  return (
    <Shell
      caption={
        geo
          ? `${shown.length} of ${rivers.length} courses · colour = river system · dot = source · ring = mouth`
          : "Drawing the rivers…"
      }
      legend={
        <>
          <div className="eyebrow">River systems</div>
          <div className="exlegend exlegend--grid">
            <button
              className={`exlegend__item${basin === "All" ? " is-on" : ""}`}
              onClick={() => setBasin("All")}
            >
              <span className="exlegend__dot" style={{ background: accent }} />
              All
              <b>{rivers.length}</b>
            </button>
            {basins.map(([b, n]) => (
              <button
                key={b}
                className={`exlegend__item${basin === b ? " is-on" : ""}`}
                onClick={() => setBasin(basin === b ? "All" : b)}
              >
                <span className="exlegend__dot" style={{ background: basinColor(b) }} />
                {b}
                <b>{n}</b>
              </button>
            ))}
          </div>
          <div className="exlegend__hint">
            <span className="exlegend__dot" /> source
            <span className="exlegend__dot exlegend__dot--ring" /> mouth
            <span className="exlegend__hint-text">thick line = main stem</span>
          </div>
        </>
      }
      side={
        <div className="exlist">
          <div className="spread" style={{ marginBottom: 4 }}>
            <span className="eyebrow">{basin === "All" ? "Longest first" : basin}</span>
            <div className="seg" role="group" aria-label="River detail level">
              <button className={`seg__btn${level === "main" ? " is-on" : ""}`} onClick={() => setLevel("main")}>
                Main
              </button>
              <button className={`seg__btn${level === "all" ? " is-on" : ""}`} onClick={() => setLevel("all")}>
                All
              </button>
            </div>
          </div>
          {[...shown]
            .sort((a, b) => (Number(b.raw.L) || 0) - (Number(a.raw.L) || 0))
            .map((r) => (
              <button
                key={r.name}
                className={`exlist__row${focus?.name === r.name ? " is-on" : ""}`}
                onMouseEnter={() => setHover(r)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onPick(r)}
              >
                <span
                  className="exlist__bar"
                  style={{
                    background: basinColor(rootOf(r)),
                    width: `${Math.max(6, (Number(r.raw.L) / longest) * 18)}px`,
                    opacity: depthOf(r) === 0 ? 1 : 0.5,
                  }}
                />
                <span className="exlist__name" style={{ paddingLeft: depthOf(r) * 5 }}>
                  {r.name}
                </span>
                <span className="exlist__meta">{r.raw.L} km</span>
              </button>
            ))}
        </div>
      }
    >
      <Svg>
        {!geo && (
          <text x={W / 2} y={H / 2} textAnchor="middle" fill="#5b6b7c" fontSize={14}>
            Loading map…
          </text>
        )}
        {geo && (
          <>
            <g opacity={0.92}>
              {geo.states.map((s) => (
                <path key={s.name} d={s.d} fill="#f8f4ea" stroke="#fff" strokeWidth={1} />
              ))}
            </g>
            <path d={geo.border} fill="none" stroke="#dfd6c6" strokeWidth={0.7} />

            {paths.map(({ r, d, org, mouth, main, col }) => {
              const on = focus?.name === r.name;
              const dim = focus && !on;
              const w = main ? 3 + (Number(r.raw.L) / longest) * 2.6 : 1.7;
              return (
                <g
                  key={r.name}
                  onMouseEnter={() => setHover(r)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onPick(r)}
                  style={{ cursor: "pointer" }}
                  opacity={dim ? 0.3 : 1}
                >
                  <path
                    d={d}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={w + (main ? 3.4 : 2.4)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.72}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={col}
                    strokeWidth={on ? w + 2.2 : w}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={main ? 1 : 0.72}
                  />
                  {on && (
                    <path
                      d={d}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={Math.max(1.4, w * 0.42)}
                      strokeLinecap="round"
                      strokeDasharray="4 16"
                      className="exflow"
                      opacity={0.95}
                    />
                  )}
                  <circle cx={org[0]} cy={org[1]} r={on ? 5.6 : main ? 3.8 : 3} fill={col} stroke="#fff" strokeWidth={1.6} />
                  <circle cx={mouth[0]} cy={mouth[1]} r={on ? 6.4 : main ? 4 : 3} fill="#fff" stroke={col} strokeWidth={on ? 2.6 : 1.8} />
                  {on && <circle cx={mouth[0]} cy={mouth[1]} r={13} fill="url(#ex-glow)" opacity={0.75} />}
                </g>
              );
            })}

            {/* names of the main stems, placed so they never collide */}
            {labels.map((l) => {
              const on = focus?.name === l.name;
              return (
                <text
                  key={l.name}
                  x={l.x}
                  y={l.y}
                  fontSize={on ? 14 : 12.5}
                  fontWeight={800}
                  fill={on ? "#111827" : l.col}
                  stroke="#f8f4ea"
                  strokeWidth={3.6}
                  paintOrder="stroke"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  pointerEvents="none"
                  opacity={focus && !on ? 0.5 : 1}
                >
                  {l.text}
                </text>
              );
            })}

            {/* origin → mouth callouts for the focused river */}
            {focus &&
              (() => {
                const p = paths.find((q) => q.r.name === focus.name);
                if (!p) return null;
                const origin = String(focus.raw.org || "").split("(")[0].trim();
                const mouthLabel =
                  focus.raw.parent && byName.has(String(focus.raw.parent))
                    ? `Joins ${focus.raw.parent}`
                    : seaOf(focus);
                const flip = p.org[0] > W * 0.62;
                return (
                  <g pointerEvents="none">
                    <line
                      x1={p.org[0]}
                      y1={p.org[1]}
                      x2={p.org[0] + (flip ? -14 : 14)}
                      y2={p.org[1] - 16}
                      stroke={p.col}
                      strokeWidth={1.2}
                      strokeDasharray="2 3"
                    />
                    <text
                      x={p.org[0] + (flip ? -18 : 18)}
                      y={p.org[1] - 19}
                      textAnchor={flip ? "end" : "start"}
                      fontSize={11}
                      fontWeight={700}
                      fill="#1f2937"
                      stroke="#f8f4ea"
                      strokeWidth={3}
                      paintOrder="stroke"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {origin.length > 24 ? origin.slice(0, 23) + "…" : origin}
                    </text>
                    <text
                      x={p.mouth[0] + (p.mouth[0] > W * 0.7 ? -10 : 10)}
                      y={p.mouth[1] + 17}
                      textAnchor={p.mouth[0] > W * 0.7 ? "end" : "start"}
                      fontSize={11}
                      fontWeight={700}
                      fill="#1f2937"
                      stroke="#f8f4ea"
                      strokeWidth={3}
                      paintOrder="stroke"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {mouthLabel}
                    </text>
                  </g>
                );
              })()}

            <text x={62} y={432} fontSize={11.5} fontWeight={700} fill="#6b93a6" fontFamily="Plus Jakarta Sans, sans-serif">
              Arabian Sea
            </text>
            <text x={W - 132} y={500} fontSize={11.5} fontWeight={700} fill="#6b93a6" fontFamily="Plus Jakarta Sans, sans-serif">
              Bay of Bengal
            </text>

            {focus && (
              <Tip
                x={paths.find((p) => p.r.name === focus.name)?.org[0] || 20}
                y={paths.find((p) => p.r.name === focus.name)?.org[1] || 20}
                title={focus.name}
                sub={`${focus.raw.L} km · ${rootOf(focus)} system`}
              />
            )}
          </>
        )}
      </Svg>
    </Shell>
  );
}

/* ---------------------------------------------------------------- link */

export function LinkVisual({
  entries,
  accent,
  selected,
  onPick,
}: {
  entries: Entry[];
  accent: string;
  selected?: string;
  onPick: (e: Entry) => void;
}) {
  const geo = useGeo();
  const [hover, setHover] = useState<Entry | null>(null);
  const links = entries.filter((e) => Array.isArray(e.raw?.eps) && e.raw.eps.length >= 2);
  const longest = Math.max(1, ...links.map((e) => Number(e.raw.L) || 0));
  const focus = hover || links.find((e) => e.name === selected) || null;

  const arcs = useMemo(() => {
    if (!geo) return [];
    return links.map((e, i) => {
      const [a, b] = e.raw.eps as { lng: number; lat: number; n: string }[];
      const p1 = geo.project([a.lng, a.lat]);
      const p2 = geo.project([b.lng, b.lat]);
      const mx = (p1[0] + p2[0]) / 2;
      const my = (p1[1] + p2[1]) / 2;
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const len = Math.hypot(dx, dy) || 1;
      const bend = Math.min(64, len * 0.2) * (i % 2 ? -1 : 1);
      const cx = mx - (dy / len) * bend;
      const cy = my + (dx / len) * bend;
      return { e, a: p1, b: p2, cx, cy, d: `M${p1[0]},${p1[1]} Q${cx},${cy} ${p2[0]},${p2[1]}`, names: [a.n, b.n] };
    });
  }, [geo, links]);

  /* count how many corridors touch each city, so only busy junctions get a
     permanent label */
  const cities = useMemo(() => {
    const m = new Map<string, { p: [number, number]; n: number }>();
    arcs.forEach(({ a, b, names }) => {
      m.set(names[0], { p: a, n: (m.get(names[0])?.n || 0) + 1 });
      m.set(names[1], { p: b, n: (m.get(names[1])?.n || 0) + 1 });
    });
    return m;
  }, [arcs]);

  return (
    <Shell
      caption="Corridor map · each line joins its two end cities · thicker line = longer route"
      side={
        <div className="exlist">
          <div className="eyebrow" style={{ marginBottom: 4 }}>Longest first</div>
          {[...links]
            .sort((a, b) => Number(b.raw.L) - Number(a.raw.L))
            .map((e) => {
              const eps = e.raw.eps as { n: string }[];
              return (
                <button
                  key={e.name}
                  className={`exlist__row exlist__row--tall${focus?.name === e.name ? " is-on" : ""}`}
                  onMouseEnter={() => setHover(e)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onPick(e)}
                >
                  <span
                    className="exlist__bar exlist__bar--v"
                    style={{ background: accent, height: `${Math.max(8, (Number(e.raw.L) / longest) * 26)}px` }}
                  />
                  <span className="exlist__col">
                    <span className="exlist__name">{e.name}</span>
                    <span className="exlist__sub">{eps.map((p) => p.n).join(" → ")}</span>
                  </span>
                  <span className="exlist__meta">{e.raw.L} km</span>
                </button>
              );
            })}
        </div>
      }
    >
      <Svg>
        {geo && (
          <>
            {geo.states.map((s) => (
              <path key={s.name} d={s.d} fill="#f8f4ea" stroke="#fff" strokeWidth={1} />
            ))}
            <path d={geo.border} fill="none" stroke="#dfd6c6" strokeWidth={0.7} />
            {arcs.map(({ e, a, b, d }) => {
              const on = focus?.name === e.name;
              const w = 2.2 + (Number(e.raw.L) / longest) * 3;
              return (
                <g
                  key={e.name}
                  onMouseEnter={() => setHover(e)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onPick(e)}
                  style={{ cursor: "pointer" }}
                  opacity={focus && !on ? 0.34 : 1}
                >
                  <path d={d} fill="none" stroke="#fff" strokeWidth={w + 3.5} strokeLinecap="round" opacity={0.85} />
                  <path d={d} fill="none" stroke={on ? "#16202e" : accent} strokeWidth={on ? w + 1.6 : w} strokeLinecap="round" />
                  <circle cx={a[0]} cy={a[1]} r={on ? 5.4 : 3.6} fill={accent} stroke="#fff" strokeWidth={1.6} />
                  <circle cx={b[0]} cy={b[1]} r={on ? 5.4 : 3.6} fill="#fff" stroke={accent} strokeWidth={2} />
                </g>
              );
            })}

            {[...cities.entries()].map(([name, c]) => {
              const isFocusEnd = focus
                ? (focus.raw.eps as { n: string }[]).some((p) => p.n === name)
                : false;
              if (c.n < 2 && !isFocusEnd) return null;
              const flip = c.p[0] > W * 0.66;
              return (
                <text
                  key={name}
                  x={c.p[0] + (flip ? -8 : 8)}
                  y={c.p[1] + (c.p[1] > 200 ? 13 : -7)}
                  textAnchor={flip ? "end" : "start"}
                  fontSize={isFocusEnd ? 12.5 : 11}
                  fontWeight={800}
                  fill={isFocusEnd ? "#16202e" : "#3f4c5a"}
                  stroke="#f8f4ea"
                  strokeWidth={3.4}
                  paintOrder="stroke"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  pointerEvents="none"
                >
                  {name}
                </text>
              );
            })}

            {focus && (() => {
              const arc = arcs.find((a) => a.e.name === focus.name);
              if (!arc) return null;
              return (
                <g pointerEvents="none">
                  <rect x={arc.cx - 34} y={arc.cy - 12} width={68} height={22} rx={11} fill="#16202e" opacity={0.9} />
                  <text x={arc.cx} y={arc.cy + 3} textAnchor="middle" fontSize={11} fontWeight={800} fill="#fff" fontFamily="Plus Jakarta Sans, sans-serif">
                    {Number(focus.raw.L).toLocaleString("en-IN")} km
                  </text>
                </g>
              );
            })()}
          </>
        )}
      </Svg>
    </Shell>
  );
}

/* -------------------------------------------------------------- places */

/** A meaningful category: state first, then the dataset category. */
function placeGroup(e: Entry): string {
  const s = String(e.raw?.s || "").trim();
  if (s) return s;
  const st = String(e.raw?.st || "").trim();
  if (st.includes(",")) {
    const tail = st.split(",").pop()!.trim();
    if (tail.length > 2) return tail;
  }
  return catLabel(e.raw) || e.primary || "Other";
}

export function PlacesVisual({
  entries,
  accent,
  selected,
  onPick,
}: {
  entries: Entry[];
  accent: string;
  selected?: string;
  onPick: (e: Entry) => void;
}) {
  const geo = useGeo();
  const [hover, setHover] = useState<Entry | null>(null);
  const [cat, setCat] = useState("All");

  const cats = useMemo(() => {
    const m = new Map<string, number>();
    entries.forEach((e) => {
      const g = placeGroup(e);
      m.set(g, (m.get(g) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [entries]);

  const colorMap = useMemo(() => {
    const m = new Map<string, string>();
    cats.forEach(([c], i) => m.set(c, POINT_COLORS[i % POINT_COLORS.length]));
    return m;
  }, [cats]);

  const colorOf = (e: Entry) => colorMap.get(placeGroup(e)) || accent;

  const shown = entries.filter((e) => cat === "All" || placeGroup(e) === cat);
  const focus = hover || entries.find((e) => e.name === selected) || null;

  const pts = useMemo(() => {
    if (!geo) return [];
    return shown
      .filter((e) => typeof e.lat === "number" && typeof e.lng === "number")
      .map((e) => ({ e, p: geo.project([e.lng!, e.lat!]) }));
  }, [geo, shown]);

  return (
    <Shell
      caption={`${pts.length} places plotted · colour = state · tap a dot for the full card`}
      legend={
        <>
          <div className="exlegend__hint" style={{ marginTop: 0 }}>
            <span className="exlegend__dot" style={{ background: accent }} /> {cats.length} states / groups
          </div>
          <div className="exlegend">
            <button className={`exlegend__item${cat === "All" ? " is-on" : ""}`} onClick={() => setCat("All")}>
              <span className="exlegend__dot" style={{ background: accent }} />
              All states
              <b>{entries.length}</b>
            </button>
            {cats.map(([c, n]) => (
              <button key={c} className={`exlegend__item${cat === c ? " is-on" : ""}`} onClick={() => setCat(cat === c ? "All" : c)}>
                <span className="exlegend__dot" style={{ background: colorMap.get(c) }} />
                {c}
                <b>{n}</b>
              </button>
            ))}
          </div>
        </>
      }
    >
      <Svg>
        {geo && (
          <>
            {geo.states.map((s) => (
              <path key={s.name} d={s.d} fill="#f8f4ea" stroke="#fff" strokeWidth={1} />
            ))}
            <path d={geo.border} fill="none" stroke="#dfd6c6" strokeWidth={0.7} />
            {pts.map(({ e, p }) => {
              const on = focus?.name === e.name;
              return (
                <g
                  key={e.name}
                  onMouseEnter={() => setHover(e)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onPick(e)}
                  style={{ cursor: "pointer" }}
                  opacity={focus && !on ? 0.42 : 1}
                >
                  <circle cx={p[0]} cy={p[1]} r={on ? 12 : 6.5} fill={colorOf(e)} opacity={on ? 0.22 : 0.16} />
                  <circle cx={p[0]} cy={p[1]} r={on ? 6 : 4.1} fill={colorOf(e)} stroke="#fff" strokeWidth={1.4} />
                </g>
              );
            })}
            {focus && typeof focus.lat === "number" && typeof focus.lng === "number" && (() => {
              const p = geo.project([focus.lng!, focus.lat!]);
              const flip = p[0] > W * 0.62;
              return (
                <text
                  x={p[0] + (flip ? -12 : 12)}
                  y={p[1] - 9}
                  textAnchor={flip ? "end" : "start"}
                  fontSize={12.5}
                  fontWeight={800}
                  fill="#16202e"
                  stroke="#f8f4ea"
                  strokeWidth={3.6}
                  paintOrder="stroke"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  pointerEvents="none"
                >
                  {focus.name}
                </text>
              );
            })()}
          </>
        )}
      </Svg>
    </Shell>
  );
}

/* -------------------------------------------------------------- states */

const ALIASES: Record<string, string[]> = {
  "JAMMU AND KASHMIR": ["jammu", "kashmir"],
  "ANDAMAN & NICOBAR": ["andaman", "nicobar"],
  "DADRA & NAGAR HAVELI & DAMAN & DIU": ["dadra", "daman", "diu"],
  ODISHA: ["odisha", "orissa"],
  PUDUCHERRY: ["puducherry", "pondicherry"],
  UTTARAKHAND: ["uttarakhand", "uttaranchal"],
  CHHATTISGARH: ["chhattisgarh", "chattisgarh"],
  LAKSHADWEEP: ["lakshadweep"],
  DELHI: ["delhi"],
  TELANGANA: ["telangana"],
};

const PLAIN_STATES = [
  "GOA", "BIHAR", "ASSAM", "PUNJAB", "HARYANA", "GUJARAT", "KARNATAKA", "KERALA",
  "MANIPUR", "MEGHALAYA", "MIZORAM", "NAGALAND", "RAJASTHAN", "SIKKIM", "TRIPURA",
  "MAHARASHTRA", "JHARKHAND", "TAMIL NADU", "ANDHRA PRADESH", "MADHYA PRADESH",
  "UTTAR PRADESH", "WEST BENGAL", "HIMACHAL PRADESH", "ARUNACHAL PRADESH",
  "CHANDIGARH",
];

export function StateVisual({
  entries,
  accent,
  selected,
  onPick,
}: {
  entries: Entry[];
  accent: string;
  selected?: string;
  onPick: (e: Entry) => void;
}) {
  const geo = useGeo();
  const [hover, setHover] = useState<{ name: string; list: Entry[] } | null>(null);
  const [activeState, setActiveState] = useState<string | null>(null);

  const byState = useMemo(() => {
    const map = new Map<string, Entry[]>();
    const keys = Object.keys(ALIASES);
    entries.forEach((e) => {
      const hay = [e.raw?.st, e.raw?.s, e.raw?.sh, e.name].filter(Boolean).join(" ").toLowerCase();
      if (!hay) return;
      const hit = new Set<string>();
      keys.forEach((k) => {
        if (ALIASES[k].some((a) => hay.includes(a))) hit.add(k);
      });
      if (!hit.size) {
        const upper = hay.toUpperCase();
        PLAIN_STATES.forEach((s) => {
          if (upper.includes(s)) hit.add(s);
        });
      }
      hit.forEach((k) => map.set(k, [...(map.get(k) || []), e]));
    });
    return map;
  }, [entries]);

  const max = Math.max(1, ...[...byState.values()].map((v) => v.length));
  const selectedEntry = entries.find((e) => e.name === selected) || null;
  const stateOfEntry = (e: Entry | null) => {
    if (!e) return null;
    for (const [k, list] of byState.entries()) if (list.includes(e)) return k;
    return null;
  };
  const focus = activeState || hover?.name || stateOfEntry(selectedEntry);
  const list = focus ? byState.get(focus) || [] : [];
  const ranked = [...byState.entries()].sort((a, b) => b[1].length - a[1].length);

  const shade = (n: number) => {
    if (n === 0) return "#f6f2e9";
    const t = Math.pow(n / max, 0.62);
    return `color-mix(in srgb, ${accent} ${Math.round(17 + t * 63)}%, #f6f2e9)`;
  };

  return (
    <Shell
      caption={
        focus
          ? `${pretty(focus)} · ${list.length} ${list.length === 1 ? "entry" : "entries"} · tap the state again to clear`
          : "Darker state = more entries · tap a state to list what is there"
      }
      side={
        <div className="exlist">
          <div className="spread" style={{ marginBottom: 4 }}>
            <span className="eyebrow">{focus ? pretty(focus) : "All states"}</span>
            {focus && (
              <button className="seg__btn" onClick={() => setActiveState(null)}>
                Clear
              </button>
            )}
          </div>
          {!focus &&
            ranked.map(([s, v]) => (
              <button
                key={s}
                className="exlist__row"
                onClick={() => setActiveState(s)}
                onMouseEnter={() => setHover({ name: s, list: v })}
                onMouseLeave={() => setHover(null)}
              >
                <span className="exlist__bar" style={{ background: accent, width: `${Math.max(5, (v.length / max) * 18)}px` }} />
                <span className="exlist__name">{pretty(s)}</span>
                <span className="exlist__meta">{v.length}</span>
              </button>
            ))}
          {focus &&
            list.map((e) => (
              <button key={e.name} className="exlist__row" onClick={() => onPick(e)}>
                <span className="exlist__name">{e.name}</span>
                <span className="exlist__meta">{e.primary || ""}</span>
              </button>
            ))}
        </div>
      }
    >
      <Svg>
        {geo && (
          <>
            {geo.states.map((s) => {
              const n = byState.get(s.name)?.length || 0;
              const on = focus === s.name;
              return (
                <path
                  key={s.name}
                  d={s.d}
                  fill={shade(n)}
                  stroke={on ? "#16202e" : "#fff"}
                  strokeWidth={on ? 2 : 1}
                  onMouseEnter={() => setHover({ name: s.name, list: byState.get(s.name) || [] })}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setActiveState(s.name === activeState ? null : s.name)}
                  style={{ cursor: "pointer", transition: "fill .2s" }}
                />
              );
            })}
            <path d={geo.border} fill="none" stroke="#dfd6c6" strokeWidth={0.7} pointerEvents="none" />
            {focus && (
              <g pointerEvents="none">
                <rect x={W / 2 - 92} y={14} width={184} height={38} rx={12} fill="#16202e" opacity={0.92} />
                <text x={W / 2} y={31} textAnchor="middle" fontSize={12.5} fontWeight={800} fill="#fff" fontFamily="Plus Jakarta Sans, sans-serif">
                  {pretty(focus)}
                </text>
                <text x={W / 2} y={45} textAnchor="middle" fontSize={10.5} fill="#c9d6e3" fontFamily="Plus Jakarta Sans, sans-serif">
                  {list.length} {list.length === 1 ? "entry" : "entries"}
                </text>
              </g>
            )}
            <g transform={`translate(18, ${H - 30})`}>
              <text fontSize={10.5} fill="#6b7a89" fontFamily="Plus Jakarta Sans, sans-serif">fewer</text>
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={42 + i * 19} y={-9} width={17} height={11} rx={2} fill={shade((i / 3) * max)} stroke="#fff" />
              ))}
              <text x={122} y={0} fontSize={10.5} fill="#6b7a89" fontFamily="Plus Jakarta Sans, sans-serif">more</text>
            </g>
          </>
        )}
      </Svg>
    </Shell>
  );
}

/* ------------------------------------------------------------ timeline */

function yearOf(raw: any): number | null {
  const tryNum = (v: any) => {
    if (typeof v === "number" && isFinite(v)) return v;
    if (typeof v === "string") {
      const s = v.replace(/,/g, "");
      const m = s.match(/(\d{1,4})\s*(BCE|BC|CE|AD)?/i);
      if (m) {
        const n = Number(m[1]);
        if (/BCE|BC/i.test(m[2] || "")) return -n;
        if (n > 0) return n;
      }
    }
    return null;
  };
  return tryNum(raw?.from) ?? tryNum(raw?.yr) ?? tryNum(raw?.est) ?? tryNum(raw?.fd) ?? null;
}

function niceTicks(min: number, max: number) {
  const span = Math.max(1, max - min);
  const raw = span / 7;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= raw) || raw;
  const start = Math.ceil(min / step) * step;
  const out: number[] = [];
  for (let v = start; v <= max + 1; v += step) out.push(Math.round(v));
  return out;
}

type Spot = { y: number; end: number; items: Entry[] };

export function TimelineVisual({
  entries,
  selected,
  onPick,
}: {
  entries: Entry[];
  selected?: string;
  onPick: (e: Entry) => void;
}) {
  const [hover, setHover] = useState<Spot | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [lane, setLane] = useState("All");

  const dated = useMemo(() => {
    return entries
      .map((e) => {
        const y = yearOf(e.raw);
        const endRaw = Number(e.raw?.to);
        const end = isFinite(endRaw) && endRaw ? endRaw : null;
        return { e, y, end };
      })
      .filter((d): d is { e: Entry; y: number; end: number | null } => d.y !== null);
  }, [entries]);

  const laneOf = (e: Entry) => catLabel(e.raw) || e.primary || "Other";

  const byLane = useMemo(() => {
    const m = new Map<string, typeof dated>();
    dated.forEach((d) => {
      const k = laneOf(d.e);
      m.set(k, [...(m.get(k) || []), d]);
    });
    return m;
  }, [dated]);

  const lanes = useMemo(
    () =>
      [...byLane.entries()]
        .sort((a, b) => Math.min(...a[1].map((d) => d.y)) - Math.min(...b[1].map((d) => d.y)))
        .map(([k]) => k),
    [byLane],
  );

  const bounds = dated.flatMap((d) => [d.y, Math.max(d.y, d.end ?? d.y)]);
  const min = bounds.length ? Math.min(...bounds) : 0;
  const max = bounds.length ? Math.max(...bounds) : 1;
  const wide = Math.max(4, max - min);
  const lo = min - wide * 0.05;
  const hi = max + wide * 0.05;

  /* BCE only when the data actually reaches back past year 1 */
  const mixed = min < 0;
  const label = (y: number) => (mixed ? (y < 0 ? `${-y} BCE` : `${y} CE`) : `${y}`);
  const span = Math.max(1, hi - lo);
  const X0 = 40;
  const X1 = W - 16;
  const x = (y: number) => X0 + ((y - lo) / span) * (X1 - X0);

  const ticks = useMemo(() => niceTicks(lo, hi), [lo, hi]);
  const active = lane === "All" ? lanes : [lane];

  /* identical date ranges (e.g. the 16 Mahajanapadas) collapse into one bar */
  const layout = useMemo(() => {
    let top = 46;
    return active.map((name) => {
      const items = [...(byLane.get(name) || [])].sort((a, b) => a.y - b.y);
      const buckets = new Map<string, Spot>();
      items.forEach((d) => {
        const end = Math.max(d.y, d.end ?? d.y);
        const key = `${d.y}:${end}`;
        const found = buckets.get(key);
        if (found) found.items.push(d.e);
        else buckets.set(key, { y: d.y, end, items: [d.e] });
      });
      const clusters = [...buckets.values()].sort((a, b) => a.y - b.y);
      /* keep bars apart in *pixels*, not years — a 26 px gap works on any range */
      const gap = (26 * span) / (X1 - X0);
      const rowEnds: number[] = [];
      const placed = clusters.map((c) => {
        let row = 0;
        while (rowEnds[row] !== undefined && c.y < rowEnds[row] + gap) row++;
        rowEnds[row] = c.end;
        return { ...c, row };
      });
      const rows = Math.max(1, rowEnds.length);
      const blockTop = top;
      const height = rows * 19 + 26;
      top += height + 6;
      return { name, blockTop, height, rows, placed };
    });
  }, [active, byLane, span]);

  const height = 46 + layout.reduce((s, l) => s + l.height + 6, 0) + 10;

  const selectedEntry = entries.find((e) => e.name === selected) || null;
  const pinnedSpot = useMemo(() => {
    if (!pinned) return null;
    for (const l of layout) {
      const hit = l.placed.find((p) => `${l.name}|${p.y}:${p.end}` === pinned);
      if (hit) return hit;
    }
    return null;
  }, [pinned, layout]);

  const spot: Spot | null =
    hover ||
    pinnedSpot ||
    (selectedEntry
      ? layout.flatMap((l) => l.placed).find((p) => p.items.some((e) => e.name === selectedEntry.name)) || null
      : null);

  const yrLabel = (y: number) => (y < 0 ? `${-y} BCE` : `${y} CE`);
  const rangeLabel = (s: Spot) => (s.end !== s.y ? `${yrLabel(s.y)} → ${yrLabel(s.end)}` : yrLabel(s.y));

  return (
    <Shell
      caption={`Time map · ${label(Math.round(min))}–${label(Math.round(max))} · bar length = how long it lasted · lanes = type of state or dynasty`}
      legend={
        <>
          <div className="eyebrow">Lanes</div>
          <div className="exlegend">
            <button className={`exlegend__item${lane === "All" ? " is-on" : ""}`} onClick={() => setLane("All")}>
              All lanes
              <b>{dated.length}</b>
            </button>
            {lanes.map((l, i) => (
              <button key={l} className={`exlegend__item${lane === l ? " is-on" : ""}`} onClick={() => setLane(lane === l ? "All" : l)}>
                <span className="exlegend__dot" style={{ background: POINT_COLORS[i % POINT_COLORS.length] }} />
                {l}
                <b>{(byLane.get(l) || []).length}</b>
              </button>
            ))}
          </div>
          <div className="exlegend__hint">
            <span className="exlegend__dot exlegend__dot--ring" /> tap a bar to read it
          </div>
        </>
      }
    >
      <div className="extimeline">
        <div className="extimeline__scroll">
          <svg viewBox={`0 0 ${W} ${height}`} className="exmap" role="img" aria-label="Timeline">
            <rect width={W} height={height} fill="#fdfbf6" rx={14} />
            {ticks.map((t) => (
              <g key={t}>
                <line x1={x(t)} y1={34} x2={x(t)} y2={height - 8} stroke="#e6dfd0" strokeWidth={1} />
                <text x={x(t)} y={25} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#8a8172" fontFamily="Plus Jakarta Sans, sans-serif">
                  {t === 0 ? "0" : label(t)}
                </text>
              </g>
            ))}
            {layout.map((l) => {
              const laneIndex = lanes.indexOf(l.name);
              const col = POINT_COLORS[laneIndex % POINT_COLORS.length];
              return (
                <g key={l.name}>
                  <text
                    x={12}
                    y={l.blockTop + 14}
                    fontSize={10.5}
                    fontWeight={800}
                    fill="#6b7a89"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {l.name.toUpperCase()}
                  </text>
                  <line x1={X0} y1={l.blockTop + 18} x2={X1} y2={l.blockTop + 18} stroke="#efe8d9" strokeWidth={1} />
                  {l.placed.map((c) => {
                    const key = `${l.name}|${c.y}:${c.end}`;
                    const on = spot === c;
                    const x1 = x(c.y);
                    const x2 = Math.max(x1 + 9, x(c.end));
                    const yy = l.blockTop + 24 + c.row * 20;
                    const wBar = x2 - x1;
                    return (
                      <g
                        key={key}
                        onMouseEnter={() => setHover(c)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => {
                          if (c.items.length === 1) onPick(c.items[0]);
                          else setPinned(pinned === key ? null : key);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <rect
                          x={x1 - 1}
                          y={yy - 2}
                          width={Math.max(wBar + 2, 11)}
                          height={17}
                          rx={8}
                          fill="transparent"
                        />
                        <rect
                          x={x1}
                          y={yy}
                          width={Math.max(wBar, 8)}
                          height={13}
                          rx={6.5}
                          fill={col}
                          opacity={on ? 1 : 0.68}
                          stroke={on ? "#16202e" : "transparent"}
                          strokeWidth={1.4}
                        />
                        {c.items.length > 1 && wBar > 14 && (
                          <text x={x1 + wBar / 2} y={yy + 10} textAnchor="middle" fontSize={9} fontWeight={800} fill="#fff" fontFamily="Plus Jakarta Sans, sans-serif">
                            {c.items.length}
                          </text>
                        )}
                        {on && c.items.length === 1 && (
                          <text
                            x={(x1 + x2) / 2}
                            y={yy - 6}
                            textAnchor="middle"
                            fontSize={10.5}
                            fontWeight={800}
                            fill="#16202e"
                            stroke="#fdfbf6"
                            strokeWidth={3}
                            paintOrder="stroke"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                            pointerEvents="none"
                          >
                            {c.items[0].name.length > 26 ? c.items[0].name.slice(0, 25) + "…" : c.items[0].name}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="extimeline__read">
          {spot ? (
            spot.items.length === 1 ? (
              <>
                <b>{spot.items[0].name}</b>
                <span>
                  {rangeLabel(spot)} · {spot.items[0].fact}
                </span>
              </>
            ) : (
              <>
                <b>
                  {spot.items.length} entries · {rangeLabel(spot)}
                </b>
                <div className="exchips">
                  {spot.items.map((e) => (
                    <button key={e.name} className="chip chip--accent" onClick={() => onPick(e)}>
                      {e.name.replace(/ Mahajanapada| Dynasty| Empire/g, "")}
                    </button>
                  ))}
                </div>
              </>
            )
          ) : (
            <span className="tiny muted">Hover a bar to read it. Bars showing a number hold several entries with the same dates — tap to list them.</span>
          )}
        </div>
      </div>
    </Shell>
  );
}

/* ---------------------------------------------------------------- bars */

const UNIT: Record<string, string> = { elev: "m", cap: "MW" };

export function BarsVisual({
  entries,
  accent,
  selected,
  onPick,
  metric,
  unit,
}: {
  entries: Entry[];
  accent: string;
  selected?: string;
  onPick: (e: Entry) => void;
  metric: string;
  unit?: string;
}) {
  const [hover, setHover] = useState<Entry | null>(null);
  const [cat, setCat] = useState("All");

  const valueOf = (e: Entry) => {
    const raw = e.raw || {};
    const direct = Number(raw[metric]);
    if (isFinite(direct) && direct) return direct;
    /* capacity strings look like "2,630 MW (state units A, B and D)" —
       take the first number, separators included, not every digit */
    const m = String(raw.cap ?? "").match(/\d[\d,]*(?:\.\d+)?/);
    return m ? Number(m[0].replace(/,/g, "")) || 0 : 0;
  };

  const cats = useMemo(() => {
    const m = new Map<string, number>();
    entries.forEach((e) => {
      const c = catLabel(e.raw);
      if (c) m.set(c, (m.get(c) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [entries]);

  const useCats = cats.length > 1 && cats.length <= 10;

  const colorMap = useMemo(() => {
    const m = new Map<string, string>();
    cats.forEach(([c], i) => m.set(c, POINT_COLORS[i % POINT_COLORS.length]));
    return m;
  }, [cats]);

  const rows = useMemo(
    () =>
      entries
        .map((e) => ({ e, v: valueOf(e), c: catLabel(e.raw) }))
        .filter((r) => r.v > 0 && (cat === "All" || r.c === cat))
        .sort((a, b) => b.v - a.v)
        .slice(0, 16),
    [entries, cat],
  );

  const max = Math.max(1, rows[0]?.v || 1);
  const focus = hover || rows.find((r) => r.e.name === selected)?.e || rows[0]?.e || null;
  const u = unit || UNIT[metric] || "";
  const color = (e: Entry) => (useCats ? colorMap.get(catLabel(e.raw)) || accent : accent);

  return (
    <Shell
      caption={`Top ${rows.length} by ${metric === "elev" ? "height" : metric === "cap" ? "installed capacity" : metric}${u ? ` (${u})` : ""} · tap a bar`}
      legend={
        useCats ? (
          <>
            <div className="eyebrow">Type</div>
            <div className="exlegend">
              <button className={`exlegend__item${cat === "All" ? " is-on" : ""}`} onClick={() => setCat("All")}>
                <span className="exlegend__dot" style={{ background: accent }} />
                All types
                <b>{entries.length}</b>
              </button>
              {cats.map(([c, n]) => (
                <button key={c} className={`exlegend__item${cat === c ? " is-on" : ""}`} onClick={() => setCat(cat === c ? "All" : c)}>
                  <span className="exlegend__dot" style={{ background: colorMap.get(c) }} />
                  {c}
                  <b>{n}</b>
                </button>
              ))}
            </div>
          </>
        ) : undefined
      }
      side={
        focus ? (
          <div className="exspot">
            <div className="eyebrow">Spotlight</div>
            <b className="exspot__name">{focus.name}</b>
            {catLabel(focus.raw) && <span className="chip chip--accent" style={{ alignSelf: "flex-start" }}>{catLabel(focus.raw)}</span>}
            <div className="exspot__num">
              {valueOf(focus).toLocaleString("en-IN")}
              <span>{u}</span>
            </div>
            {focus.raw?.st ? <div className="tiny muted">{String(focus.raw.st)}</div> : null}
            <p className="exspot__fact">{focus.fact}</p>
            <button className="btn btn--soft btn--sm" onClick={() => onPick(focus)}>
              Open full card
            </button>
          </div>
        ) : undefined
      }
    >
      <div className="exbars">
        {rows.map(({ e, v }, i) => {
          const on = focus?.name === e.name;
          return (
            <button
              key={e.name}
              className={`exbars__row${on ? " is-on" : ""}`}
              onMouseEnter={() => setHover(e)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onPick(e)}
            >
              <span className={`exbars__rank${i < 3 ? " is-top" : ""}`}>{i + 1}</span>
              <span className="exbars__col">
                <span className="exbars__name">{e.name}</span>
                <span className="exbars__sub">{String(e.raw?.st || e.secondary?.[0] || e.primary || "")}</span>
              </span>
              <span className="exbars__track">
                <span className="exbars__fill" style={{ width: `${Math.max(3, (v / max) * 100)}%`, background: color(e) }} />
              </span>
              <span className="exbars__value">
                {v.toLocaleString("en-IN")}
                {u ? ` ${u}` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}

/* --------------------------------------------------------------- mosaic */

export function MosaicVisual({
  entries,
  accent,
  onPick,
}: {
  entries: Entry[];
  accent: string;
  onPick: (e: Entry) => void;
}) {
  const [cat, setCat] = useState("All");

  const groups = useMemo(() => {
    const m = new Map<string, Entry[]>();
    entries.forEach((e) => {
      const k = catLabel(e.raw) || e.primary || "Other";
      m.set(k, [...(m.get(k) || []), e]);
    });
    return [...m.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [entries]);

  const colorMap = useMemo(() => {
    const m = new Map<string, string>();
    groups.forEach(([g], i) => m.set(g, POINT_COLORS[i % POINT_COLORS.length]));
    return m;
  }, [groups]);

  const shown = (cat === "All" ? groups : groups.filter(([g]) => g === cat)).flatMap(([g, v]) =>
    v.map((e) => ({ e, g })),
  );
  const [limit, setLimit] = useState(24);
  const visible = shown.slice(0, limit);

  return (
    <Shell
      caption={`${shown.length} cards · colour = type · tap one to open it`}
      legend={
        <>
          <div className="eyebrow">Types</div>
          <div className="exlegend">
            <button
              className={`exlegend__item${cat === "All" ? " is-on" : ""}`}
              onClick={() => {
                setCat("All");
                setLimit(24);
              }}
            >
              <span className="exlegend__dot" style={{ background: accent }} />
              All types
              <b>{entries.length}</b>
            </button>
            {groups.map(([g, v]) => (
              <button
                key={g}
                className={`exlegend__item${cat === g ? " is-on" : ""}`}
                onClick={() => {
                  setCat(cat === g ? "All" : g);
                  setLimit(24);
                }}
              >
                <span className="exlegend__dot" style={{ background: colorMap.get(g) }} />
                {g}
                <b>{v.length}</b>
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className="exmosaic exmosaic--scroll">
        {visible.map(({ e, g }, i) => (
          <button
            key={e.name + i}
            className="exmosaic__card"
            style={{ borderLeftColor: colorMap.get(g) }}
            onClick={() => onPick(e)}
          >
            <b>{e.name}</b>
            {e.primary && <span>{e.primary}</span>}
          </button>
        ))}
        {shown.length > limit && (
          <button className="exmosaic__more" onClick={() => setLimit((n) => n + 24)}>
            Show 24 more
            <span>{shown.length - limit} left</span>
          </button>
        )}
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------ mini card */

/** Small locator map used inside the entry sheet. */
export function EntryCourse({ entry, accent }: { entry: Entry; accent: string }) {
  const geo = useGeo();
  const wp = (entry.raw?.wp as [number, number][]) || null;
  const hasPoint = typeof entry.lat === "number" && typeof entry.lng === "number";
  if (!geo || (!wp && !hasPoint)) return null;
  const path = wp ? geo.line(wp) : "";
  const point = hasPoint ? geo.project([entry.lng!, entry.lat!]) : null;
  return (
    <div className="exmini">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${entry.name} locator`}>
        <rect width={W} height={H} fill="#eef6f9" rx={14} />
        {geo.states.map((s) => (
          <path key={s.name} d={s.d} fill="#f8f4ec" stroke="#fff" strokeWidth={1} />
        ))}
        <path d={geo.border} fill="none" stroke="#d8cfc0" strokeWidth={0.7} />
        {wp && <path d={path} fill="none" stroke={accent} strokeWidth={6} strokeLinecap="round" opacity={0.9} />}
        {wp && <circle cx={geo.project(wp[0])[0]} cy={geo.project(wp[0])[1]} r={8} fill={accent} stroke="#fff" strokeWidth={2.5} />}
        {wp && (
          <circle
            cx={geo.project(wp[wp.length - 1])[0]}
            cy={geo.project(wp[wp.length - 1])[1]}
            r={8}
            fill="#fff"
            stroke={accent}
            strokeWidth={3}
          />
        )}
        {point && (
          <>
            <circle cx={point[0]} cy={point[1]} r={22} fill={accent} opacity={0.16} />
            <circle cx={point[0]} cy={point[1]} r={9} fill={accent} stroke="#fff" strokeWidth={2.5} />
          </>
        )}
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------- router */

export function ExplorerVisual({
  kind,
  entries,
  accent,
  selected,
  onPick,
  metric,
}: {
  kind: VisualKind;
  entries: Entry[];
  accent: string;
  selected?: string;
  onPick: (e: Entry) => void;
  metric?: string;
}) {
  if (kind === "river") return <RiverVisual entries={entries} accent={accent} selected={selected} onPick={onPick} />;
  if (kind === "link") return <LinkVisual entries={entries} accent={accent} selected={selected} onPick={onPick} />;
  if (kind === "states") return <StateVisual entries={entries} accent={accent} selected={selected} onPick={onPick} />;
  if (kind === "timeline") return <TimelineVisual entries={entries} selected={selected} onPick={onPick} />;
  if (kind === "bars") return <BarsVisual entries={entries} accent={accent} selected={selected} onPick={onPick} metric={metric || "elev"} />;
  if (kind === "mosaic") return <MosaicVisual entries={entries} accent={accent} onPick={onPick} />;
  return <PlacesVisual entries={entries} accent={accent} selected={selected} onPick={onPick} />;
}
