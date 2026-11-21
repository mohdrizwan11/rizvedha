import type { ReactNode } from "react";

/* ------------------------------------------------------------------
   Visual Lab — hand-built diagrams that explain a whole chapter in one
   picture. Every labelled part is a hotspot: tap it to read the line.

   Rules of the house:
   · shapes get saturated flat colour + a white cut edge (readable print)
   · text gets a white halo via .viz-label so it survives any background
   · labels live outside the artwork with leader lines — never truncated
------------------------------------------------------------------- */

export type VizNode = { id: string; label: string; fact: string };

type Render = (p: { active?: string; onPick: (id: string) => void }) => ReactNode;

export type Viz = {
  slug: string;
  title: string;
  sub: string;
  subject: string;
  accent: string;
  icon: string;
  tag: string;
  nodes: VizNode[];
  render: Render;
};

function Hot({
  id,
  active,
  onPick,
  children,
  label,
}: {
  id: string;
  active?: string;
  onPick: (id: string) => void;
  children: ReactNode;
  label: string;
}) {
  return (
    <g
      className={`hot${active === id ? " is-on" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => onPick(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick(id);
        }
      }}
    >
      {children}
    </g>
  );
}

const MUTED = "#8b8172";

const T = (props: {
  x: number | string;
  y: number | string;
  children: ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  fill?: string;
  opacity?: number;
}) => (
  <text
    x={props.x}
    y={props.y}
    fontSize={props.size ?? 13}
    fontWeight={props.weight ?? 700}
    textAnchor={props.anchor ?? "middle"}
    fill={props.fill ?? "currentColor"}
    opacity={props.opacity}
    className="viz-label"
  >
    {props.children}
  </text>
);

const Sub = (props: {
  x: number | string;
  y: number | string;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
}) => (
  <text
    x={props.x}
    y={props.y}
    fontSize={props.size ?? 9.5}
    fontWeight={600}
    textAnchor={props.anchor ?? "middle"}
    fill={MUTED}
    className="viz-label viz-label--sub"
  >
    {props.children}
  </text>
);

/* ---------------------------------------------------------------- 1. solar */
const solar: Render = ({ active, onPick }) => {
  const SX = 58;
  const SY = 208;
  const K = 0.55;
  const planets = [
    { id: "mercury", n: "Mercury", r: 6.5, R: 96, a: 58, c: "#a98966", s: "88-day year" },
    { id: "venus", n: "Venus", r: 9.5, R: 132, a: 50, c: "#dfa24a", s: "465 °C" },
    { id: "earth", n: "Earth", r: 10.5, R: 170, a: 43, c: "#3f8fd0", s: "1 year" },
    { id: "mars", n: "Mars", r: 8, R: 208, a: 37, c: "#c05a41", s: "red planet" },
    { id: "jupiter", n: "Jupiter", r: 22, R: 282, a: 29, c: "#c08c5c", s: "biggest" },
    { id: "saturn", n: "Saturn", r: 17, R: 356, a: 23, c: "#d3ab63", s: "rings" },
    { id: "uranus", n: "Uranus", r: 12.5, R: 428, a: 17, c: "#6fb2bf", s: "tilted 98°" },
    { id: "neptune", n: "Neptune", r: 11.5, R: 496, a: 11, c: "#4767ab", s: "fiercest winds" },
  ].map((p, i) => {
    const rad = (p.a * Math.PI) / 180;
    return {
      ...p,
      x: SX + p.R * Math.cos(rad),
      y: SY - p.R * K * Math.sin(rad),
      up: i % 2 === 0,
    };
  });

  return (
    <>
      <defs>
        <radialGradient id="viz-sun">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="55%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <clipPath id="viz-orbit-clip">
          <rect x="14" y="14" width="614" height="232" rx="10" />
        </clipPath>
      </defs>

      <rect x="14" y="14" width="614" height="232" rx="10" fill="#0f172a" opacity="0.035" />

      <g clipPath="url(#viz-orbit-clip)">
        {planets.map((p) => (
          <ellipse
            key={p.id}
            cx={SX}
            cy={SY}
            rx={p.R}
            ry={p.R * K}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeDasharray="2 6"
          />
        ))}
        {/* asteroid belt between Mars and Jupiter */}
        {Array.from({ length: 26 }, (_, i) => {
          const rad = ((8 + i * 2.5) * Math.PI) / 180;
          const R = 238 + (i % 4) * 5;
          return (
            <circle
              key={`b${i}`}
              cx={SX + R * Math.cos(rad)}
              cy={SY - R * K * Math.sin(rad)}
              r={1.4}
              fill="currentColor"
              opacity="0.28"
            />
          );
        })}
      </g>

      <Hot id="sun" active={active} onPick={onPick} label="Sun">
        <circle cx={SX} cy={SY} r={44} fill="#fbbf24" opacity="0.13" />
        <circle cx={SX} cy={SY} r={30} fill="url(#viz-sun)" className="plate" stroke="#fff" strokeWidth="1.5" />
        <T x={SX} y={SY + 5} size={11.5} weight={800} fill="#7c3f04">Sun</T>
      </Hot>
      <Sub x={SX} y={SY + 52}>99.86% of all mass</Sub>

      {planets.map((p) => (
        <Hot key={p.id} id={p.id} active={active} onPick={onPick} label={p.n}>
          <circle cx={p.x} cy={p.y} r={p.r} fill={p.c} className="plate" stroke="#fff" strokeWidth="1.6" />
          {p.id === "saturn" && (
            <ellipse
              cx={p.x}
              cy={p.y}
              rx={p.r + 12}
              ry={p.r * 0.34}
              fill="none"
              stroke="#b58a45"
              strokeWidth="3"
              transform={`rotate(-16 ${p.x} ${p.y})`}
              opacity="0.85"
            />
          )}
          {p.id === "earth" && (
            <>
              <path
                d={`M ${p.x - 5} ${p.y - 3} q 3 -4 8 -2 q 3 4 -1 7 q -5 2 -7 -5 z`}
                fill="#5aa86a"
                opacity="0.95"
              />
              <circle cx={p.x + 13} cy={p.y - 9} r={2.2} fill="#cfd6de" stroke="#fff" strokeWidth="0.8" />
            </>
          )}
          {p.id === "jupiter" && <ellipse cx={p.x + 3} cy={p.y - 2} rx={7} ry={4} fill="#a95a44" opacity="0.7" />}
          <T x={p.x} y={p.up ? p.y - p.r - 26 : p.y + p.r + 18} size={p.id === "jupiter" ? 12.5 : 11.5}>
            {p.n}
          </T>
          <Sub x={p.x} y={p.up ? p.y - p.r - 13 : p.y + p.r + 31}>{p.s}</Sub>
        </Hot>
      ))}

      <path d="M 92 300 H 246" stroke="currentColor" strokeOpacity="0.22" />
      <path d="M 92 300 V 294 M 246 300 V 294" stroke="currentColor" strokeOpacity="0.3" />
      <T x={169} y={320} size={11}>Rocky · small · close</T>

      <path d="M 268 300 H 578" stroke="currentColor" strokeOpacity="0.22" />
      <path d="M 268 300 V 294 M 578 300 V 294" stroke="currentColor" strokeOpacity="0.3" />
      <T x={423} y={320} size={11}>Gas &amp; ice giants · huge · far</T>

      <T x={320} y={352} size={10.5} weight={600} fill={MUTED}>
        distance not to scale · the Sun sits at the left end of every orbit
      </T>
    </>
  );
};

/* --------------------------------------------------------- 2. earth layers */
const earth: Render = ({ active, onPick }) => {
  const CX = 258;
  const CY = 190;
  const layers = [
    { id: "crust", n: "Crust", r: 148, fill: "#c99a68", d: "5–70 km thick" },
    { id: "mantle", n: "Mantle", r: 112, fill: "#e0864f", d: "down to 2,900 km" },
    { id: "outer", n: "Outer core", r: 66, fill: "#f2a93b", d: "liquid iron & nickel" },
    { id: "inner", n: "Inner core", r: 30, fill: "#fbe08a", d: "solid · about 5,400 °C" },
  ];
  const rows = [
    { y: 92, chip: "#c99a68", label: "Crust", note: "thin shell · 5–70 km", id: "crust" },
    { y: 152, chip: "#e0864f", label: "Mantle", note: "thickest layer · to 2,900 km", id: "mantle" },
    { y: 212, chip: "#f2a93b", label: "Outer core", note: "liquid iron · makes the magnetic field", id: "outer" },
    { y: 272, chip: "#fbe08a", label: "Inner core", note: "solid ball · 5,400 °C", id: "inner" },
  ];

  return (
    <>
      <defs>
        <radialGradient id="viz-sphere" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#8fd3f4" />
          <stop offset="38%" stopColor="#4ba3c7" />
          <stop offset="70%" stopColor="#2f6f8f" />
          <stop offset="100%" stopColor="#1c4a63" />
        </radialGradient>
        <clipPath id="viz-left-half">
          <rect x={CX - 160} y="0" width="160" height="380" />
        </clipPath>
        <linearGradient id="viz-ring" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* right half: flat cut-through */}
      {layers.map((l) => (
        <Hot key={l.id} id={l.id} active={active} onPick={onPick} label={l.n}>
          <circle cx={CX} cy={CY} r={l.r} fill={l.fill} className="plate" stroke="#fffdf8" strokeWidth="2" />
          <circle cx={CX} cy={CY} r={l.r} fill="url(#viz-ring)" />
        </Hot>
      ))}
      <circle cx={CX} cy={CY} r={14} fill="#fff7d4" opacity="0.55" />

      {/* left half: the globe surface, painted over the rings */}
      <g clipPath="url(#viz-left-half)" pointerEvents="none">
        <circle cx={CX} cy={CY} r={148} fill="url(#viz-sphere)" />
        <path
          d="M 128 126 q 30 -22 56 -6 q 22 14 8 32 q -16 22 -44 14 q -26 -8 -20 -40 z"
          fill="#71b87d"
          opacity="0.92"
        />
        <path
          d="M 146 226 q 34 -16 52 4 q 14 18 -8 34 q -22 16 -44 -2 q -18 -16 0 -36 z"
          fill="#71b87d"
          opacity="0.92"
        />
        <path d="M 196 96 q 20 -14 34 -2 q 10 12 -6 20 q -18 8 -28 -18 z" fill="#71b87d" opacity="0.8" />
        <path d="M 118 178 q 16 -10 26 0 q 8 10 -4 16 q -14 6 -22 -16 z" fill="#71b87d" opacity="0.7" />
        <circle cx={CX} cy={CY} r={148} fill="none" stroke="#14384a" strokeWidth="2" opacity="0.35" />
        <ellipse cx={CX - 52} cy={CY - 62} rx="46" ry="30" fill="#fff" opacity="0.16" />
      </g>

      {/* convection arrows in the mantle */}
      <g stroke="#8a3d12" strokeWidth="1.6" fill="none" opacity="0.5" pointerEvents="none">
        <path d={`M ${CX - 34} ${CY + 78} q 16 14 0 28`} markerEnd="url(#viz-tiny-arrow)" />
        <path d={`M ${CX + 52} ${CY + 62} q -14 14 0 28`} markerEnd="url(#viz-tiny-arrow)" />
      </g>

      <line x1={CX} y1={CY - 150} x2={CX} y2={CY + 150} stroke="#16202e" strokeWidth="1.2" strokeDasharray="4 5" opacity="0.35" />

      <T x={CX} y={CY + 172} size={10.5} weight={600} fill={MUTED}>
        radius 6,371 km
      </T>

      {/* key on the right */}
      {rows.map((r) => (
        <Hot key={r.id} id={r.id} active={active} onPick={onPick} label={r.label}>
          <rect x="430" y={r.y - 22} width="196" height="46" rx="12" className="plate pill" />
          <rect x="444" y={r.y - 9} width="18" height="18" rx="5" fill={r.chip} stroke="#fff" strokeWidth="1.4" />
          <T x={472} y={r.y + 4} size={12} anchor="start">{r.label}</T>
          <Sub x={472} y={r.y + 17} anchor="start">{r.note}</Sub>
        </Hot>
      ))}

      <T x="528" y="330" size={10.5} weight={600} fill={MUTED}>
        left half = surface · right half = cut open
      </T>
      <defs>
        <marker id="viz-tiny-arrow" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0 1 L4 3.5 L0 6" fill="none" stroke="#8a3d12" strokeWidth="1.4" />
        </marker>
      </defs>
    </>
  );
};

/* ------------------------------------------------------- 3. atmosphere */
const atmosphere: Render = ({ active, onPick }) => {
  const X = 88;
  const W = 452;
  const IX = X + W - 46;
  const bands = [
    { id: "tropo", n: "Troposphere", note: "0–12 km · all weather happens here", y: 278, h: 62, fill: "#cfe4f7", ink: "#123a5c" },
    { id: "strato", n: "Stratosphere", note: "12–50 km · ozone layer, jets cruise", y: 206, h: 72, fill: "#a9cfe8", ink: "#0d3350" },
    { id: "meso", n: "Mesosphere", note: "50–85 km · meteors burn up", y: 150, h: 56, fill: "#8fb2d4", ink: "#0b2a44" },
    { id: "thermo", n: "Thermosphere", note: "85–600 km · auroras glow", y: 92, h: 58, fill: "#9d8fc4", ink: "#241a44" },
    { id: "exo", n: "Exosphere", note: "600 km + · fades into space", y: 34, h: 58, fill: "#cfc8e4", ink: "#2a2148" },
  ];

  return (
    <>
      <defs>
        <linearGradient id="viz-sky" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#9ec9e8" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#7d6bb0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1b1b3a" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="viz-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7cbf76" />
          <stop offset="100%" stopColor="#4d8f4f" />
        </linearGradient>
      </defs>

      <rect x={X - 14} y="24" width={W + 28} height="330" rx="16" fill="url(#viz-sky)" />

      {bands.map((b) => (
        <Hot key={b.id} id={b.id} active={active} onPick={onPick} label={b.n}>
          <rect x={X} y={b.y} width={W} height={b.h} rx="10" fill={b.fill} className="plate" stroke="#fff" strokeWidth="2" />
          <T x={X + 18} y={b.y + 25} size={13.5} anchor="start" weight={800} fill={b.ink}>{b.n}</T>
          <Sub x={X + 18} y={b.y + 41} anchor="start" size={10}>{b.note}</Sub>
        </Hot>
      ))}

      {/* exosphere stars */}
      {[[300, 46], [352, 58], [332, 74], [404, 50], [376, 70]].map(([sx, sy], i) => (
        <circle key={`s${i}`} cx={sx} cy={sy} r={i % 2 === 0 ? 1.7 : 1.2} fill="#2f2a55" opacity="0.4" pointerEvents="none" />
      ))}

      {/* ozone strip inside the stratosphere */}
      <rect x={X} y="212" width={W} height="10" rx="5" fill="#7b3fbf" opacity="0.72" pointerEvents="none" />
      <T x={X + W + 10} y="220" size={10} anchor="start" weight={800} fill="#5b2d8f">ozone</T>

      <g pointerEvents="none">
        {/* weather */}
        <ellipse cx={IX - 4} cy="296" rx="28" ry="11" fill="#fff" opacity="0.92" />
        <ellipse cx={IX - 24} cy="299" rx="18" ry="9" fill="#fff" opacity="0.92" />
        {[IX - 32, IX - 18, IX - 4, IX + 10].map((rx) => (
          <line key={rx} x1={rx} y1="310" x2={rx - 5} y2="326" stroke="#2f7fb5" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
        ))}
        {/* jet */}
        <g transform={`translate(${IX} 244)`} fill="#274b6b" opacity="0.85">
          <path d="M -20 0 L 18 0 L 24 3 L 18 6 L -20 6 Z" />
          <path d="M -6 0 L 4 -13 L 11 -13 L 6 0 Z" />
          <path d="M -6 6 L 4 19 L 11 19 L 6 6 Z" />
        </g>
        {/* meteor */}
        <line x1={IX - 26} y1="160" x2={IX + 10} y2="192" stroke="#c2410c" strokeWidth="2.6" strokeLinecap="round" opacity="0.8" />
        <circle cx={IX + 14} cy="195" r="3.4" fill="#f59e0b" />
        {/* aurora */}
        <path d={`M ${IX - 40} 118 q 16 -14 34 -4 q 18 10 34 -4`} fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        <path d={`M ${IX - 32} 130 q 14 -10 28 -2 q 14 8 28 -2`} fill="none" stroke="#a78bfa" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
        {/* satellite */}
        <g transform={`translate(${IX} 56)`}>
          <rect x="-9" y="-6" width="18" height="12" rx="2" fill="#5b5570" />
          <rect x="-25" y="-7" width="13" height="14" rx="2" fill="#8f88ab" />
          <rect x="12" y="-7" width="13" height="14" rx="2" fill="#8f88ab" />
        </g>
      </g>

      {/* ground */}
      <rect x={X - 14} y="340" width={W + 28} height="16" rx="6" fill="url(#viz-ground)" />

      {/* km ruler */}
      <line x1="50" y1="34" x2="50" y2="340" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      {[
        { y: 340, l: "0" },
        { y: 278, l: "12" },
        { y: 206, l: "50" },
        { y: 150, l: "85" },
        { y: 92, l: "600" },
        { y: 34, l: "10,000" },
      ].map((t) => (
        <g key={t.l} pointerEvents="none">
          <line x1="45" y1={t.y} x2="56" y2={t.y} stroke="currentColor" strokeOpacity="0.35" />
          <T x="39" y={t.y + 3.5} size={9.5} anchor="end" weight={700} fill={MUTED}>{t.l}</T>
        </g>
      ))}
      <T x="34" y="24" size={9.5} anchor="middle" weight={800} fill={MUTED}>km</T>
      <T x="34" y="356" size={9.5} anchor="middle" weight={600} fill={MUTED}>ground</T>
    </>
  );
};

/* ------------------------------------------------------ 4. water cycle */
const water: Render = ({ active, onPick }) => {
  return (
    <>
      <defs>
        <marker id="viz-flow" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path d="M0 1 L7 4.5 L0 8" fill="none" stroke="#1d7fb5" strokeWidth="2" strokeLinecap="round" />
        </marker>
        <marker id="viz-flow-warm" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
          <path d="M0 1 L7 4.5 L0 8" fill="none" stroke="#c2740f" strokeWidth="2" strokeLinecap="round" />
        </marker>
        <linearGradient id="viz-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6cc4e8" />
          <stop offset="100%" stopColor="#1b6e9c" />
        </linearGradient>
        <linearGradient id="viz-land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ec97d" />
          <stop offset="100%" stopColor="#5d9a58" />
        </linearGradient>
        <linearGradient id="viz-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dff1fb" />
          <stop offset="100%" stopColor="#f4fbff" />
        </linearGradient>
        <clipPath id="viz-scene">
          <rect x="8" y="8" width="624" height="364" rx="18" />
        </clipPath>
      </defs>

      <g clipPath="url(#viz-scene)">
        <rect x="8" y="8" width="624" height="364" fill="url(#viz-sky)" />
        {/* land mass on the left, sloping into the sea */}
        <path d="M 8 366 L 8 196 Q 96 176 150 210 Q 210 248 236 296 L 262 366 Z" fill="url(#viz-land)" />
        <path d="M 8 366 L 8 240 Q 60 232 96 258 Q 138 288 152 366 Z" fill="#6aa863" opacity="0.75" />
        {/* sea */}
        <path d="M 236 366 Q 300 306 400 316 Q 520 328 632 300 L 632 372 L 236 372 Z" fill="url(#viz-sea)" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${300 + i * 76} ${330 - i * 6} q 16 -7 32 0 q 16 7 32 0`}
            fill="none"
            stroke="#e3f6ff"
            strokeWidth="2"
            opacity={0.6 - i * 0.12}
          />
        ))}
        {/* mountain peak */}
        <path d="M 46 200 L 104 118 L 156 200 Z" fill="#a9a396" />
        <path d="M 104 118 L 122 142 L 112 150 L 98 140 L 88 148 Z" fill="#fff" />

        {/* sun */}
        <Hot id="sun" active={active} onPick={onPick} label="Sun">
          <circle cx="546" cy="70" r="46" fill="#fde68a" opacity="0.3" />
          <circle cx="546" cy="70" r="26" fill="#fbbf24" className="plate" stroke="#fff" strokeWidth="1.5" />
          <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" opacity="0.7">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1={546 + 34 * Math.cos((a * Math.PI) / 180)}
                y1={70 + 34 * Math.sin((a * Math.PI) / 180)}
                x2={546 + 44 * Math.cos((a * Math.PI) / 180)}
                y2={70 + 44 * Math.sin((a * Math.PI) / 180)}
              />
            ))}
          </g>
          <T x="546" y="126" size={12}>Sun · the engine</T>
        </Hot>

        {/* evaporation arrows off the sea */}
        <g pointerEvents="none" stroke="#1d7fb5" strokeWidth="2.4" fill="none" opacity="0.85">
          <path d="M 322 300 C 318 258 336 232 366 220" markerEnd="url(#viz-flow)" />
          <path d="M 424 306 C 424 266 442 240 468 228" markerEnd="url(#viz-flow)" />
          <path d="M 512 300 C 514 264 528 244 546 234" markerEnd="url(#viz-flow)" />
        </g>

        {/* transpiration from the tree */}
        <g pointerEvents="none">
          <rect x="150" y="236" width="9" height="34" rx="4" fill="#8a5a2b" />
          <circle cx="154" cy="230" r="22" fill="#4f9a53" />
          <circle cx="136" cy="242" r="16" fill="#60ab5f" />
          <circle cx="174" cy="244" r="15" fill="#60ab5f" />
          <g stroke="#1d7fb5" strokeWidth="1.8" fill="none" opacity="0.7">
            <path d="M 140 208 q -6 -14 2 -26" markerEnd="url(#viz-flow)" />
            <path d="M 166 206 q 8 -14 2 -26" markerEnd="url(#viz-flow)" />
          </g>
        </g>

        {/* clouds */}
        <Hot id="cloud" active={active} onPick={onPick} label="Condensation">
          <g className="plate">
            <ellipse cx="366" cy="164" rx="62" ry="30" fill="#f8fbff" stroke="#cfdde8" strokeWidth="1.5" />
            <ellipse cx="412" cy="152" rx="44" ry="34" fill="#ffffff" stroke="#cfdde8" strokeWidth="1.5" />
            <ellipse cx="326" cy="154" rx="36" ry="26" fill="#ffffff" stroke="#cfdde8" strokeWidth="1.5" />
          </g>
          <T x="372" y="96" size={12.5}>Condensation</T>
          <Sub x="372" y="110">vapour cools onto dust</Sub>
        </Hot>

        {/* rain */}
        <Hot id="rain" active={active} onPick={onPick} label="Precipitation">
          <g stroke="#2f8fc9" strokeWidth="2.6" strokeLinecap="round" opacity="0.9">
            {[300, 322, 344, 366, 388, 410, 432].map((rx, i) => (
              <line key={rx} x1={rx} y1={182 + (i % 2) * 6} x2={rx - 7} y2={218 + (i % 2) * 6} />
            ))}
          </g>
          <T x="452" y="196" size={12} anchor="start">Rain &amp; snow</T>
          <Sub x="452" y="210" anchor="start">falls on land and sea</Sub>
        </Hot>

        {/* river back to the sea */}
        <Hot id="river" active={active} onPick={onPick} label="Runoff">
          <path
            d="M 120 300 Q 164 314 200 322 Q 232 330 262 342"
            fill="none"
            stroke="#3aa6d6"
            strokeWidth="7"
            strokeLinecap="round"
            className="plate"
            opacity="0.95"
          />
          <T x="216" y="294" size={12}>Runoff</T>
          <Sub x="216" y="308">streams carry it back</Sub>
        </Hot>

        {/* groundwater */}
        <Hot id="ground" active={active} onPick={onPick} label="Groundwater">
          <path
            d="M 18 338 Q 90 326 160 334 Q 200 340 224 352"
            fill="none"
            stroke="#2f7fa8"
            strokeWidth="3"
            strokeDasharray="7 5"
            opacity="0.85"
          />
          {[40, 96].map((wx) => (
            <g key={wx}>
              <rect x={wx - 2} y="300" width="26" height="34" rx="4" fill="none" stroke="#5f5140" strokeWidth="2.5" opacity="0.7" />
              <rect x={wx + 2} y="314" width="18" height="20" fill="#4aa5cc" opacity="0.75" />
            </g>
          ))}
          <T x="24" y="292" size={11.5} anchor="start">Groundwater</T>
        </Hot>

        {/* sea label */}
        <Hot id="sea" active={active} onPick={onPick} label="Ocean">
          <rect x="452" y="336" width="168" height="34" rx="10" fill="#0e5b80" opacity="0.22" />
          <T x="536" y="358" size={12.5} fill="#083f58">Oceans hold 97%</T>
        </Hot>
      </g>

      {/* evaporation hotspot label that sits outside the crowd */}
      <Hot id="evap" active={active} onPick={onPick} label="Evaporation">
        <rect x="272" y="238" width="150" height="38" rx="12" className="plate pill" />
        <T x="347" y="254" size={12.5}>Evaporation</T>
        <Sub x="347" y="268">+ transpiration from plants</Sub>
      </Hot>

      <T x="320" y="386" size={10.5} weight={600} fill={MUTED}>
        the same water has been circulating for billions of years
      </T>
    </>
  );
};

/* -------------------------------------------------------- 5. rock cycle */
const rock: Render = ({ active, onPick }) => {
  const cabinets = [
    { id: "igneous", n: "Igneous", note: "cooled magma", x: 148, y: 196, t: "speckled" },
    { id: "sedimentary", n: "Sedimentary", note: "layers pressed", x: 492, y: 196, t: "layered" },
    { id: "metamorphic", n: "Metamorphic", note: "squeezed + baked", x: 320, y: 86, t: "banded" },
  ];
  return (
    <>
      <defs>
        <marker id="viz-rock-arrow" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M1 1 L8 5 L1 9" fill="none" stroke="#7c7364" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <pattern id="viz-speckled" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#c9685a" />
          <circle cx="3" cy="3.5" r="1.7" fill="#8d3f34" />
          <circle cx="9" cy="8" r="1.9" fill="#e5a094" />
          <circle cx="7" cy="2" r="1.1" fill="#f0c3ba" />
        </pattern>
        <pattern id="viz-layered" width="12" height="9" patternUnits="userSpaceOnUse">
          <rect width="12" height="9" fill="#e6b457" />
          <rect width="12" height="3" fill="#c98f2c" />
          <rect y="6" width="12" height="1.6" fill="#a9741d" />
        </pattern>
        <pattern id="viz-banded" width="14" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <rect width="14" height="10" fill="#79b37a" />
          <rect width="14" height="4" fill="#4c8b52" />
          <rect y="7" width="14" height="2" fill="#a8d3a6" />
        </pattern>
        <radialGradient id="viz-magma">
          <stop offset="0%" stopColor="#ffe8a3" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>

      {/* process arrows */}
      <g fill="none" stroke="#7c7364" strokeWidth="2.2" strokeOpacity="0.45" strokeLinecap="round">
        <path d="M 206 164 C 218 142 234 134 256 134" markerEnd="url(#viz-rock-arrow)" />
        <path d="M 382 110 C 404 116 420 128 436 146" markerEnd="url(#viz-rock-arrow)" />
        <path d="M 470 252 C 448 278 412 296 376 306" markerEnd="url(#viz-rock-arrow)" />
        <path d="M 250 330 C 210 330 168 322 128 304" markerEnd="url(#viz-rock-arrow)" />
      </g>
      <T x="248" y="112" size={10} weight={700} fill={MUTED} anchor="end">weathering + burial</T>
      <T x="450" y="96" size={10} weight={700} fill={MUTED} anchor="start">heat + pressure</T>
      <T x="424" y="268" size={10} weight={700} fill={MUTED} anchor="end">melts</T>
      <T x="152" y="342" size={10} weight={700} fill={MUTED} anchor="middle">cools</T>

      {cabinets.map((c) => (
        <Hot key={c.id} id={c.id} active={active} onPick={onPick} label={c.n}>
          <rect x={c.x - 58} y={c.y - 52} width="116" height="104" rx="18" className="plate" fill="#fffdf8" stroke="#e2d9c7" strokeWidth="2" />
          <rect x={c.x - 46} y={c.y - 42} width="92" height="44" rx="10" fill={`url(#viz-${c.t})`} />
          <T x={c.x} y={c.y + 24} size={12}>{c.n}</T>
          <Sub x={c.x} y={c.y + 40}>{c.note}</Sub>
        </Hot>
      ))}

      <Hot id="magma" active={active} onPick={onPick} label="Magma">
        <ellipse cx="320" cy="326" rx="72" ry="25" fill="url(#viz-magma)" className="plate" stroke="#fff" strokeWidth="2" />
        <T x="320" y="331" size={12.5} fill="#5c1c02">Magma</T>
      </Hot>

      <T x="320" y="370" size={10.5} weight={600} fill={MUTED}>
        no rock is permanent — every type can become any other
      </T>
    </>
  );
};

/* ---------------------------------------------------------- 6. monsoon */
const INDIA =
  "M228.1 277.7L221.0 265.4L214.7 236.7L216.2 234.0L214.9 232.3L214.0 233.3L212.4 223.1L215.1 214.7L212.2 208.9L212.9 204.9L211.8 205.3L215.8 202.4L211.4 202.5L213.5 199.0L211.2 199.1L211.8 196.4L214.6 195.5L207.9 199.1L208.9 202.9L206.8 207.8L193.1 213.5L186.3 209.6L173.1 195.1L174.5 193.1L175.4 196.4L181.6 193.1L182.3 194.3L185.7 193.1L190.1 188.2L189.0 187.6L194.6 184.9L187.6 184.6L186.8 187.7L178.8 189.8L169.8 184.8L170.8 183.5L168.3 180.9L170.6 177.4L167.3 180.3L165.1 180.0L166.1 176.5L171.2 176.0L171.8 172.0L184.7 173.6L190.5 170.7L191.5 173.1L196.3 170.9L195.1 168.2L198.3 168.1L195.7 167.3L191.5 159.3L191.4 155.7L187.3 155.6L185.5 153.0L186.3 145.7L179.2 143.5L180.0 138.2L188.4 128.3L190.7 128.3L193.7 132.0L204.5 128.9L209.8 119.2L215.6 116.1L220.4 104.9L226.5 102.7L226.1 98.2L234.2 91.0L232.2 90.3L233.2 80.9L241.3 76.7L238.5 73.6L234.1 73.4L234.3 68.9L230.6 69.9L222.9 65.8L220.8 47.5L223.1 47.0L228.5 40.2L223.7 38.5L224.5 34.6L220.4 34.1L217.1 30.0L211.1 29.6L211.4 25.7L216.0 22.3L216.9 19.1L225.4 19.1L223.3 16.3L227.3 17.7L234.1 14.0L236.5 16.2L241.0 14.4L245.9 20.9L254.9 25.8L256.6 30.3L262.5 32.1L262.7 35.2L269.0 35.6L268.7 33.5L270.6 34.4L273.9 31.2L281.5 30.5L283.6 28.5L287.7 31.0L290.5 30.6L293.7 33.7L291.1 45.3L288.0 46.4L288.2 48.2L285.3 48.3L286.1 51.2L284.4 54.1L278.9 54.7L280.8 59.1L278.8 59.0L279.3 62.1L284.5 63.7L283.2 66.8L286.3 70.3L279.5 75.3L277.1 70.8L273.1 73.2L277.5 79.6L276.7 82.2L278.2 84.4L276.9 85.5L279.0 89.2L280.5 86.2L284.3 91.5L288.9 92.2L292.9 94.9L293.1 97.4L301.3 101.2L294.3 107.3L291.2 118.5L303.2 124.1L304.3 126.9L310.4 130.2L319.1 131.8L319.4 134.4L325.5 136.5L326.3 134.7L331.3 136.4L331.1 135.1L334.4 134.2L339.4 136.4L339.6 139.9L345.6 143.3L350.0 141.9L352.4 145.5L357.5 144.9L361.7 147.3L365.3 145.3L368.2 148.1L374.0 146.5L375.5 147.9L377.1 143.1L375.1 139.1L376.7 128.9L381.6 126.9L384.0 128.3L383.2 133.7L384.9 136.5L382.1 138.5L387.2 142.7L389.8 142.0L395.0 144.6L400.1 141.6L403.9 143.2L418.1 142.2L419.6 141.7L417.8 139.1L418.9 137.0L417.7 134.7L413.9 134.6L412.8 130.2L416.8 131.8L419.9 130.0L423.4 130.6L424.8 126.9L430.4 124.5L431.7 120.8L438.0 120.4L445.4 112.3L447.3 114.4L453.7 116.0L460.6 110.7L464.0 113.3L461.0 115.4L461.6 117.6L465.4 115.5L466.4 119.1L462.6 123.6L466.7 123.0L474.8 126.1L474.5 129.9L469.4 133.1L472.0 139.3L467.4 136.0L462.3 137.1L450.9 145.0L451.3 151.4L448.3 157.4L445.4 158.6L444.8 161.5L446.6 163.5L440.4 177.3L431.1 175.1L432.8 179.3L432.2 185.6L429.5 186.7L430.3 195.7L427.1 199.3L425.0 196.9L423.9 198.9L420.8 177.0L419.9 179.7L417.0 178.8L417.2 181.7L415.0 183.7L415.8 186.1L413.5 187.9L411.3 183.9L410.6 186.0L408.7 180.3L410.9 174.4L413.1 174.8L414.8 172.8L416.5 174.0L416.7 171.7L419.3 170.8L420.0 165.2L422.7 165.5L422.5 163.5L418.3 161.8L401.0 162.3L394.6 160.5L395.1 152.9L392.9 149.4L391.9 152.6L389.4 152.1L386.8 147.6L384.7 147.4L386.3 149.4L382.2 149.1L383.1 148.1L379.5 144.7L378.7 146.6L380.7 148.0L377.0 150.5L376.3 154.4L380.9 158.0L383.7 157.9L385.8 160.9L379.9 161.7L379.4 164.6L376.6 164.7L375.2 167.9L382.9 172.4L383.3 175.8L381.1 179.7L383.6 181.4L382.8 184.2L385.7 184.7L384.1 187.1L386.5 199.4L383.6 199.5L384.1 203.0L383.4 200.7L383.7 202.5L382.5 201.6L383.1 198.6L381.2 198.6L378.1 201.1L377.8 203.7L377.4 196.9L374.7 195.6L377.2 197.3L373.1 202.0L363.4 206.4L365.2 213.3L358.1 221.9L347.4 225.8L340.2 231.3L334.1 240.3L315.0 254.2L314.9 259.8L304.2 262.6L300.3 269.1L297.6 267.2L293.4 269.4L290.9 276.0L294.0 295.7L292.0 304.6L287.3 311.0L289.1 327.9L282.9 328.4L278.7 336.7L284.4 340.3L279.6 339.0L273.6 340.7L271.2 342.8L269.9 348.7L264.4 351.8L258.4 348.6L253.8 343.0L245.2 316.6L237.1 304.2L236.0 301.4L237.3 301.0L235.5 300.4L233.3 289.3L228.1 277.7Z";

const monsoon: Render = ({ active, onPick }) => {
  return (
    <>
      <defs>
        <marker id="viz-sw" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" refX="8" refY="6.5" orient="auto">
          <path d="M0 1 L10 6.5 L0 12" fill="none" stroke="#1d7fb5" strokeWidth="2.4" strokeLinecap="round" />
        </marker>
        <marker id="viz-ne" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="7" refY="6" orient="auto">
          <path d="M0 1 L8 6 L0 11" fill="none" stroke="#c2740f" strokeWidth="2.2" strokeLinecap="round" />
        </marker>
        <linearGradient id="viz-sealand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f7ea" />
          <stop offset="100%" stopColor="#e0efd4" />
        </linearGradient>
        <linearGradient id="viz-ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2f2fd" />
          <stop offset="100%" stopColor="#c6e3f6" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="640" height="380" rx="16" fill="url(#viz-ocean)" />
      <path d={INDIA} fill="url(#viz-sealand)" stroke="#5d7a4e" strokeWidth="1.6" />

      {/* the Western Ghats ridge */}
      <g pointerEvents="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M ${215 + i * 2.4} ${294 - i * 17} l 5 -11 l 5 11 z`}
            fill="#cbb894"
            stroke="#a5905f"
            strokeWidth="1"
            opacity="0.9"
          />
        ))}
      </g>

      {/* rain shadow on the leeward side */}
      <ellipse cx="268" cy="234" rx="29" ry="21" fill="#e3d29b" opacity="0.5" />
      <T x="268" y="236" size={8} weight={700} fill="#8a6b1f">rain shadow</T>

      {/* Arabian Sea branch */}
      <Hot id="arabian" active={active} onPick={onPick} label="Arabian Sea branch">
        <path
          d="M 180 314 C 196 288 212 264 228 242 C 234 234 240 228 246 222"
          fill="none"
          stroke="#1d7fb5"
          strokeWidth="6.5"
          strokeLinecap="round"
          opacity="0.85"
          markerEnd="url(#viz-sw)"
        />
      </Hot>

      {/* Bay of Bengal branch */}
      <Hot id="bay" active={active} onPick={onPick} label="Bay of Bengal branch">
        <path
          d="M 486 296 C 458 262 432 234 406 208 C 376 178 336 158 302 142"
          fill="none"
          stroke="#1d7fb5"
          strokeWidth="6.5"
          strokeLinecap="round"
          opacity="0.85"
          markerEnd="url(#viz-sw)"
        />
      </Hot>

      {/* Cherrapunji / Mawsynram */}
      <circle cx="414" cy="160" r="14" fill="#1d7fb5" opacity="0.16" />
      <circle cx="414" cy="160" r="4.5" fill="#0e5b80" />
      <T x="436" y="148" size={9} anchor="start" weight={800} fill="#0e5b80">Mawsynram</T>
      <T x="436" y="159" size={8.5} anchor="start" weight={600} fill="#0e5b80">wettest place</T>

      {/* onset dot at Kerala */}
      <Hot id="onset" active={active} onPick={onPick} label="Onset">
        <circle cx="251" cy="326" r="16" fill="#1d7fb5" opacity="0.18" />
        <circle cx="251" cy="326" r="5.5" fill="#0e5b80" className="plate" stroke="#fff" strokeWidth="1.6" />
        <path d="M 168 306 L 246 322" stroke="#1d7fb5" strokeWidth="1.4" strokeDasharray="3 4" />
      </Hot>

      {/* retreat / north-east monsoon */}
      <Hot id="retreat" active={active} onPick={onPick} label="Retreat">
        <path
          d="M 292 152 C 358 178 400 214 400 252 C 400 292 352 314 300 330"
          fill="none"
          stroke="#c2740f"
          strokeWidth="2.6"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity="0.85"
          markerEnd="url(#viz-ne)"
        />
      </Hot>

      <T x="86" y="182" size={10.5} weight={800} fill="#5b8fae" opacity={0.95}>ARABIAN SEA</T>
      <T x="556" y="170" size={10.5} weight={800} fill="#5b8fae" opacity={0.95}>BAY OF BENGAL</T>

      {/* labels parked in the ocean margins */}
      <Hot id="arabian" active={active} onPick={onPick} label="Arabian Sea branch">
        <rect x="8" y="212" width="158" height="46" rx="12" className="plate" fill="#eaf6fd" stroke="#9dcbe4" strokeWidth="1.6" />
        <T x="87" y="230" size={11.5}>Arabian branch</T>
        <Sub x="87" y="245">hits the west coast head-on</Sub>
      </Hot>

      <Hot id="onset" active={active} onPick={onPick} label="Onset">
        <rect x="8" y="272" width="158" height="46" rx="12" className="plate" fill="#eaf6fd" stroke="#9dcbe4" strokeWidth="1.6" />
        <T x="87" y="290" size={11.5}>Onset · 1 June</T>
        <Sub x="87" y="305">Kerala gets it first</Sub>
      </Hot>

      <Hot id="bay" active={active} onPick={onPick} label="Bay of Bengal branch">
        <rect x="486" y="192" width="148" height="46" rx="12" className="plate" fill="#eaf6fd" stroke="#9dcbe4" strokeWidth="1.6" />
        <T x="560" y="210" size={11.5}>Bay branch</T>
        <Sub x="560" y="225">turns up the Ganga plain</Sub>
      </Hot>

      <Hot id="retreat" active={active} onPick={onPick} label="Retreat">
        <rect x="470" y="88" width="164" height="46" rx="12" className="plate" fill="#fdf1dc" stroke="#e6c48b" strokeWidth="1.6" />
        <T x="552" y="106" size={11.5}>Oct–Dec retreat</T>
        <Sub x="552" y="121">NE monsoon soaks Tamil Nadu</Sub>
      </Hot>

      {/* legend */}
      <g pointerEvents="none">
        <rect x="20" y="18" width="166" height="66" rx="12" fill="#fffdf8" opacity="0.94" stroke="#e2d9c7" />
        <line x1="32" y1="36" x2="62" y2="36" stroke="#1d7fb5" strokeWidth="4" strokeLinecap="round" />
        <T x="70" y="39" size={8.5} anchor="start" weight={700}>SW monsoon · Jun–Sep</T>
        <line x1="32" y1="54" x2="62" y2="54" stroke="#c2740f" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
        <T x="70" y="57" size={8.5} anchor="start" weight={700}>retreat · Oct–Dec</T>
        <T x="103" y="74" size={8} anchor="middle" weight={600} fill={MUTED}>tap a region for its fact</T>
      </g>
    </>
  );
};

/* ---------------------------------------------------- 7. constitution */
const constitution: Render = ({ active, onPick }) => {
  const rows = [
    { id: "preamble", n: "The Preamble", v: "We, the people…", c: "#b45309", w: 0 },
    { id: "parts", n: "Parts", v: "25", c: "#1d4ed8", w: 0 },
    { id: "articles", n: "Articles", v: "448", c: "#0e7490", w: 0 },
    { id: "schedules", n: "Schedules", v: "12", c: "#15803d", w: 0 },
    { id: "amendments", n: "Amendments", v: "106", c: "#b91c1c", w: 0 },
  ];
  const lists = [
    { n: "Union List", v: "97", w: 172 },
    { n: "State List", v: "66", w: 117 },
    { n: "Concurrent", v: "47", w: 83 },
  ];
  return (
    <>
      <defs>
        <linearGradient id="viz-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdf7" />
          <stop offset="100%" stopColor="#f8f1e2" />
        </linearGradient>
      </defs>

      {/* the document */}
      <rect x="34" y="26" width="360" height="326" rx="10" fill="#d9cfb8" opacity="0.4" transform="translate(3 5)" />
      <rect x="30" y="22" width="360" height="326" rx="10" fill="url(#viz-paper)" stroke="#e0d6c1" />
      <line x1="66" y1="22" x2="66" y2="348" stroke="#e8b4a8" strokeWidth="1.4" opacity="0.7" />

      <T x="210" y="52" size={9.5} weight={800} fill={MUTED} anchor="middle">THE CONSTITUTION OF INDIA</T>
      <line x1="112" y1="58" x2="308" y2="58" stroke="#c9bda3" />

      <Hot id="preamble" active={active} onPick={onPick} label="Preamble">
        <rect x="80" y="70" width="292" height="58" rx="10" fill="#fdf0d5" stroke="#e6c48b" strokeWidth="1.4" className="plate" />
        <T x="94" y="88" size={11} anchor="start" weight={800} fill="#8a4a06">THE PREAMBLE</T>
        <T x="94" y="106" size={10.5} anchor="start" weight={600} fill="#5c4520">justice · liberty · equality · fraternity</T>
        <T x="94" y="120" size={9} anchor="start" weight={600} fill={MUTED}>“We, the people of India…”</T>
      </Hot>

      {rows.slice(1).map((r, i) => {
        const y = 146 + i * 42;
        return (
          <Hot key={r.id} id={r.id} active={active} onPick={onPick} label={r.n}>
            <rect x="80" y={y} width="292" height="34" rx="9" className="plate" fill="#fff" stroke="#e8e0cf" />
            <rect x="90" y={y + 9} width="16" height="16" rx="5" fill={r.c} opacity="0.9" />
            <T x="116" y={y + 22} size={11.5} anchor="start">{r.n}</T>
            <T x="358" y={y + 22} size={13} anchor="end" weight={800} fill={r.c}>{r.v}</T>
          </Hot>
        );
      })}

      <Sub x="210" y="330" anchor="middle">one written rulebook · federal · single citizenship</Sub>

      {/* three lists card */}
      <rect x="412" y="26" width="208" height="326" rx="14" className="plate pill" />
      <T x="430" y="52" size={11.5} anchor="start" weight={800}>Who legislates what?</T>
      <Sub x="430" y="68" anchor="start">Subjects are split three ways</Sub>

      {lists.map((l, i) => {
        const y = 92 + i * 62;
        return (
          <g key={l.n}>
            <T x="430" y={y} size={10.5} anchor="start" weight={700}>{l.n}</T>
            <T x="602" y={y} size={10.5} anchor="end" weight={800} fill={["#1d4ed8", "#15803d", "#b45309"][i]}>{l.v}</T>
            <rect x="430" y={y + 8} width="172" height="12" rx="6" fill="#e9e2d2" />
            <rect x="430" y={y + 8} width={l.w} height="12" rx="6" fill={["#1d4ed8", "#15803d", "#b45309"][i]} opacity="0.85" />
          </g>
        );
      })}

      <rect x="430" y="288" width="172" height="46" rx="10" fill="#fff" opacity="0.75" stroke="#e2d9c7" />
      <T x="516" y="306" size={10} weight={800} fill="#4338ca">RESIDUAL POWERS</T>
      <Sub x="516" y="321">anything unlisted → Union</Sub>
    </>
  );
};

/* ------------------------------------------------------ 8. government */
const government: Render = ({ active, onPick }) => {
  const pillars = [
    { id: "legislature", n: "Legislature", who: "Parliament", does: "makes the laws", x: 132, c: "#c7dcf7", t: "#1d4ed8" },
    { id: "executive", n: "Executive", who: "President + Ministers", does: "carries them out", x: 320, c: "#fbe6b7", t: "#a16207" },
    { id: "judiciary", n: "Judiciary", who: "Supreme Court", does: "interprets them", x: 508, c: "#c9e8cd", t: "#15803d" },
  ];
  return (
    <>
      <defs>
        <linearGradient id="viz-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2ead9" />
          <stop offset="100%" stopColor="#ded2ba" />
        </linearGradient>
        <linearGradient id="viz-plinth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6d6353" />
          <stop offset="100%" stopColor="#4a4336" />
        </linearGradient>
      </defs>

      {/* pediment */}
      <path d="M 40 118 L 320 40 L 600 118 Z" fill="url(#viz-stone)" stroke="#c3b79e" strokeWidth="1.6" />
      <path d="M 40 118 L 320 40 L 600 118" fill="none" stroke="#fff" strokeOpacity="0.6" />
      <T x="320" y="88" size={14} weight={800} fill="#4a4336">THE CONSTITUTION</T>
      <Sub x="320" y="104">the rulebook every organ must obey</Sub>
      <rect x="30" y="118" width="580" height="12" rx="4" fill="#cdbfa3" />
      <rect x="30" y="118" width="580" height="4" rx="2" fill="#efe6d2" />

      {pillars.map((p) => (
        <g key={p.id}>
          <rect x={p.x - 52} y="140" width="104" height="150" rx="6" fill={p.c} opacity="0.9" />
          <rect x={p.x - 52} y="140" width="104" height="150" rx="6" fill="none" stroke="#fff" strokeWidth="2" />
          {[0, 1, 2, 3].map((f) => (
            <line key={f} x1={p.x - 36 + f * 24} y1="150" x2={p.x - 36 + f * 24} y2="280" stroke={p.t} strokeWidth="1.4" opacity="0.18" />
          ))}
          <rect x={p.x - 62} y="132" width="124" height="12" rx="4" fill={p.t} opacity="0.35" />
          <rect x={p.x - 62} y="286" width="124" height="12" rx="4" fill={p.t} opacity="0.35" />
          <Hot id={p.id} active={active} onPick={onPick} label={p.n}>
            <rect x={p.x - 74} y="296" width="148" height="52" rx="12" className="plate" fill="#fffdf8" stroke="#e2d9c7" strokeWidth="1.8" />
            <T x={p.x} y="315" size={12.5} weight={800} fill={p.t}>{p.n}</T>
            <Sub x={p.x} y="328">{p.who}</Sub>
            <Sub x={p.x} y="341">{p.does}</Sub>
          </Hot>
        </g>
      ))}

      {/* plinth: the people */}
      <rect x="24" y="354" width="592" height="22" rx="6" fill="url(#viz-plinth)" />
      <T x="320" y="369" size={10.5} weight={800} fill="#f6efdf">WE, THE PEOPLE OF INDIA</T>
    </>
  );
};

/* ----------------------------------------------------------- 9. cell */
const cell: Render = ({ active, onPick }) => {
  return (
    <>
      <defs>
        <radialGradient id="viz-cyto" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0%" stopColor="#f7f6ff" />
          <stop offset="100%" stopColor="#e4e6f8" />
        </radialGradient>
        <clipPath id="viz-cellclip">
          <ellipse cx="320" cy="196" rx="228" ry="152" />
        </clipPath>
      </defs>

      <Hot id="membrane" active={active} onPick={onPick} label="Cell membrane">
        <ellipse cx="320" cy="196" rx="232" ry="156" fill="none" stroke="#8794c4" strokeWidth="4" className="plate" />
        <ellipse cx="320" cy="196" rx="226" ry="150" fill="url(#viz-cyto)" stroke="#b9c0e0" strokeWidth="1.5" />
      </Hot>

      <g clipPath="url(#viz-cellclip)">
        {/* endoplasmic reticulum */}
        <g fill="none" stroke="#b8a6d9" strokeWidth="3" opacity="0.75" pointerEvents="none">
          <path d="M 292 146 q 46 -18 74 6 q 26 22 6 44 q -22 24 -58 12" />
          <path d="M 300 132 q 58 -22 94 8 q 34 30 4 58" />
          <path d="M 286 160 q -30 10 -34 36" />
        </g>

        {/* nucleus */}
        <Hot id="nucleus" active={active} onPick={onPick} label="Nucleus">
          <circle cx="268" cy="168" r="52" fill="#b9c2ea" className="plate" stroke="#fff" strokeWidth="2" />
          <circle cx="268" cy="168" r="52" fill="none" stroke="#7f8cc4" strokeWidth="2" strokeDasharray="2 4" />
          <circle cx="278" cy="158" r="15" fill="#8b96d4" opacity="0.9" />
          <path d="M 258 176 q 10 -18 22 -6 q 10 10 -2 18" fill="none" stroke="#6b76b4" strokeWidth="2" opacity="0.7" />
        </Hot>

        {/* mitochondria */}
        <Hot id="mito" active={active} onPick={onPick} label="Mitochondria">
          <g transform="translate(438 122) rotate(-22)">
            <ellipse cx="0" cy="0" rx="44" ry="24" fill="#e8a3a0" className="plate" stroke="#fff" strokeWidth="2" />
            <path d="M -30 -4 q 10 12 20 0 q 10 -12 20 0 q 10 12 20 0" fill="none" stroke="#b05a56" strokeWidth="2.4" />
            <path d="M -30 8 q 10 12 20 0 q 10 -12 20 0 q 10 12 20 0" fill="none" stroke="#b05a56" strokeWidth="2.4" opacity="0.7" />
          </g>
        </Hot>

        {/* golgi */}
        <Hot id="golgi" active={active} onPick={onPick} label="Golgi body">
          <g transform="translate(186 274)">
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M -44 ${i * 11 - 14} q 44 -22 88 0`}
                fill="none"
                stroke="#7fbf94"
                strokeWidth="6"
                strokeLinecap="round"
                opacity={0.9 - i * 0.1}
              />
            ))}
            <circle cx="50" cy="6" r="4" fill="#7fbf94" />
            <circle cx="58" cy="16" r="3" fill="#7fbf94" />
          </g>
        </Hot>

        {/* vacuole */}
        <Hot id="vacuole" active={active} onPick={onPick} label="Vacuole">
          <ellipse cx="418" cy="272" rx="54" ry="42" fill="#c8e7f7" opacity="0.9" className="plate" stroke="#8fc4dd" strokeWidth="2" />
          <ellipse cx="402" cy="256" rx="18" ry="12" fill="#fff" opacity="0.55" />
        </Hot>

        {/* ribosome dots */}
        <Hot id="ribo" active={active} onPick={onPick} label="Ribosomes">
          <g fill="#c98a2e">
            {[
              [340, 244], [352, 252], [330, 256], [360, 240], [344, 262], [368, 258],
              [196, 132], [210, 126], [222, 138], [204, 146],
              [286, 296], [300, 288], [312, 300],
            ].map(([rx, ry], i) => (
              <circle key={i} cx={rx} cy={ry} r="3.4" />
            ))}
          </g>
        </Hot>
      </g>

      {/* outer labels with leader lines */}
      <g pointerEvents="none" stroke="#b0a898" strokeWidth="1.2" strokeDasharray="3 4" fill="none">
        <path d="M 198 96 L 246 132" />
        <path d="M 512 80 L 470 108" />
        <path d="M 456 344 L 424 294" />
        <path d="M 116 320 L 150 290" />
        <path d="M 104 174 L 92 178" />
        <path d="M 502 198 L 356 258" />
      </g>
      <T x="190" y="92" size={11.5} anchor="end">Nucleus</T>
      <T x="516" y="74" size={11.5} anchor="start">Mitochondria</T>
      <T x="460" y="344" size={11.5} anchor="start">Vacuole</T>
      <T x="110" y="316" size={11.5} anchor="end">Golgi body</T>
      <T x="96" y="170" size={11.5} anchor="end">Cell membrane</T>
      <T x="508" y="196" size={11.5} anchor="start">Ribosomes</T>

      <T x="320" y="374" size={10.5} weight={600} fill={MUTED}>
        jelly-like cytoplasm fills the space · plant cells also add a stiff wall
      </T>
    </>
  );
};

/* ----------------------------------------------------- 10. food chain */
const chain: Render = ({ active, onPick }) => {
  const tiers = [
    { id: "carnivore", n: "Carnivores", ex: "frog · snake · tiger", y: 74, h: 46, wTop: 84, wBot: 150, c: "#e8a3a0", pct: "1% of energy" },
    { id: "herbivore", n: "Herbivores", ex: "grasshopper · deer", y: 126, h: 46, wTop: 150, wBot: 224, c: "#a9cfe8", pct: "10%" },
    { id: "producer", n: "Producers", ex: "grass · algae · trees", y: 178, h: 52, wTop: 224, wBot: 306, c: "#8fc98c", pct: "100% of sunlight" },
  ];
  const CX = 316;
  return (
    <>
      <defs>
        <marker id="viz-energy" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
          <path d="M0 1 L8 5 L0 9" fill="none" stroke="#c2740f" strokeWidth="2" strokeLinecap="round" />
        </marker>
      </defs>

      {/* sun feeding the base */}
      <Hot id="sun" active={active} onPick={onPick} label="Sun">
        <circle cx="70" cy="212" r="30" fill="#fbbf24" className="plate" stroke="#fff" strokeWidth="1.5" />
        <g stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" opacity="0.75">
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => (
            <line
              key={a}
              x1={70 + 36 * Math.cos((a * Math.PI) / 180)}
              y1={212 + 36 * Math.sin((a * Math.PI) / 180)}
              x2={70 + 44 * Math.cos((a * Math.PI) / 180)}
              y2={212 + 44 * Math.sin((a * Math.PI) / 180)}
            />
          ))}
        </g>
        <T x="70" y="266" size={12}>Sun</T>
        <Sub x="70" y="280">the only real income</Sub>
      </Hot>
      <path d="M 108 216 L 154 208" stroke="#c2740f" strokeWidth="2.6" markerEnd="url(#viz-energy)" />

      {/* the pyramid */}
      {tiers.map((t) => (
        <Hot key={t.id} id={t.id} active={active} onPick={onPick} label={t.n}>
          <path
            d={`M ${CX - t.wTop / 2} ${t.y} H ${CX + t.wTop / 2} L ${CX + t.wBot / 2} ${t.y + t.h} H ${CX - t.wBot / 2} Z`}
            fill={t.c}
            className="plate"
            stroke="#fffdf8"
            strokeWidth="2"
          />
          <T x={CX} y={t.y + 21} size={12.5} weight={800}>{t.n}</T>
          <Sub x={CX} y={t.y + 35}>{t.ex}</Sub>
          <T x={t.id === "producer" ? 500 : CX + t.wBot / 2 + 12} y={t.y + t.h / 2 + 4} size={10} anchor="start" weight={700} fill="#a16207">
            {t.pct}
          </T>
        </Hot>
      ))}

      {/* top predator cap */}
      <path d={`M ${CX - 42} 74 L ${CX} 46 L ${CX + 42} 74 H ${CX - 42} Z`} fill="#c2726c" stroke="#fffdf8" strokeWidth="2" />
      <T x={CX} y={70} size={9.5} weight={800} fill="#fff">TOP</T>

      {/* decomposers strip */}
      <Hot id="decomposer" active={active} onPick={onPick} label="Decomposers">
        <rect x="152" y="246" width="336" height="46" rx="14" className="plate" fill="#e3d5f3" stroke="#c3aee0" strokeWidth="2" />
        <g fill="#8b6bb0" opacity="0.85">
          {[178, 200, 466, 488].map((dx) => (
            <g key={dx}>
              <circle cx={dx} cy="264" r="5" />
              <circle cx={dx + 8} cy="272" r="4" />
            </g>
          ))}
        </g>
        <T x="316" y="266" size={12.5} weight={800}>Decomposers</T>
        <Sub x="316" y="281">fungi + bacteria return nutrients to the soil</Sub>
      </Hot>
      <path d="M 316 240 V 250" stroke="#8b6bb0" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M 490 268 C 556 268 582 206 516 196" fill="none" stroke="#8b6bb0" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#viz-energy)" opacity="0.85" />

      <T x="320" y="326" size={10.5} weight={700} fill={MUTED}>
        each step keeps only about 10% of the energy — that is why big predators need huge areas
      </T>
    </>
  );
};

/* -------------------------------------------------------- 11. timeline */
const timeline: Render = ({ active, onPick }) => {
  /* two segments: deep prehistory compressed, the last 1200 years opened up,
     with a visible break between them so both ends stay readable */
  const xa = (y: number) => 118 + ((y + 2600) / 3400) * 272;
  const xb = (y: number) => 420 + ((y - 800) / 1200) * 180;
  const x = (y: number) => (y <= 800 ? xa(y) : xb(y));

  const eras = [
    { id: "ancient", n: "Ancient", r: "2500 BCE – 700 CE", a: -2500, b: 700, c: "#e5b93f" },
    { id: "medieval", n: "Medieval", r: "1206 – 1757", a: 1206, b: 1757, c: "#e08b4f" },
    { id: "modern", n: "Modern", r: "1757 – 1947", a: 1757, b: 1947, c: "#cf5f5a" },
    { id: "freedom", n: "Freedom", r: "1885 – 1947", a: 1885, b: 1947, c: "#7d8fd0" },
  ];

  const ticks = [
    { y: -2500, l: "2500 BCE" },
    { y: -1000, l: "1000 BCE" },
    { y: 0, l: "0" },
    { y: 1000, l: "1000 CE" },
    { y: 2000, l: "2000 CE" },
  ];

  const marks = [
    { y: -2500, l: "Indus Valley", anchor: "middle" as const },
    { y: 1206, l: "Delhi Sultanate", anchor: "middle" as const },
    { y: 1947, l: "Independence", anchor: "end" as const },
  ];

  return (
    <>
      <rect x="14" y="18" width="612" height="336" rx="16" fill="#fdfbf6" />

      {ticks.map((t) => (
        <g key={t.l}>
          <line x1={x(t.y)} y1="64" x2={x(t.y)} y2="286" stroke="#e6dfd0" strokeWidth="1" />
          <T x={x(t.y)} y="50" size={9.5} weight={700} fill={MUTED}>{t.l}</T>
        </g>
      ))}

      {/* axis break */}
      <g stroke="#c9bda3" strokeWidth="1.3" fill="none" strokeDasharray="4 4">
        <line x1="406" y1="64" x2="406" y2="286" />
      </g>
      <g stroke="#fdfbf6" strokeWidth="7" fill="none">
        <line x1="399" y1="80" x2="413" y2="62" />
      </g>
      <g stroke="#b6a98f" strokeWidth="1.6" fill="none">
        <line x1="399" y1="80" x2="413" y2="62" />
      </g>

      {eras.map((e, i) => {
        const y = 90 + i * 52;
        const w = Math.max(18, x(e.b) - x(e.a));
        return (
          <Hot key={e.id} id={e.id} active={active} onPick={onPick} label={e.n}>
            <T x="22" y={y + 11} size={12} anchor="start" weight={800}>{e.n}</T>
            <Sub x="22" y={y + 25} anchor="start" size={9}>{e.r}</Sub>
            <rect
              x={x(e.a)}
              y={y}
              width={w}
              height="24"
              rx="12"
              fill={e.c}
              className="plate"
              stroke="#fffdf8"
              strokeWidth="1.6"
              opacity="0.95"
            />
          </Hot>
        );
      })}

      {/* the three dates worth memorising */}
      <line x1="118" y1="300" x2="600" y2="300" stroke="#c9bda3" strokeWidth="1.6" />
      {marks.map((m) => (
        <g key={m.l} pointerEvents="none">
          <line x1={x(m.y)} y1="300" x2={x(m.y)} y2="290" stroke="#c9bda3" strokeWidth="1" />
          <circle cx={x(m.y)} cy="300" r="3.6" fill="#6b6355" />
          <T x={x(m.y)} y="320" size={9.5} anchor={m.anchor} weight={700} fill="#5f5a4e">{m.l}</T>
        </g>
      ))}

      <T x="320" y="344" size={10} weight={600} fill={MUTED}>
        bar length = how long each era lasted · the axis is compressed before 800 CE
      </T>
    </>
  );
};

/* ------------------------------------------------------- 12. digestion */
const digestion: Render = ({ active, onPick }) => {
  const labels = [
    { id: "mouth", n: "Mouth", note: "saliva starts on starch", y: 70, tx: 298, ty: 58 },
    { id: "oesophagus", n: "Oesophagus", note: "peristalsis pushes down", y: 112, tx: 324, ty: 108 },
    { id: "liver", n: "Liver", note: "makes bile for fats", y: 154, tx: 250, ty: 124 },
    { id: "stomach", n: "Stomach", note: "HCl + pepsin digest protein", y: 196, tx: 262, ty: 164 },
    { id: "small", n: "Small intestine", note: "villi absorb nutrients", y: 238, tx: 314, ty: 246 },
    { id: "large", n: "Large intestine", note: "absorbs water + salts", y: 280, tx: 296, ty: 294 },
  ];
  const tube = [
    { n: "Oesophagus", v: "25 cm", c: "#c98a6a" },
    { n: "Small intestine", v: "6.5 m", c: "#c05a44" },
    { n: "Large intestine", v: "1.5 m", c: "#d99f8c" },
  ];
  return (
    <>
      <defs>
        <linearGradient id="viz-gut" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0917a" />
          <stop offset="100%" stopColor="#c05a44" />
        </linearGradient>
        <linearGradient id="viz-coil" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cc6650" />
          <stop offset="100%" stopColor="#b94e3b" />
        </linearGradient>
      </defs>

      {/* duodenum + coiled small intestine (drawn under the colon frame) */}
      <Hot id="small" active={active} onPick={onPick} label="Small intestine">
        <path
          d="M 328 180 C 346 184 358 194 358 206 C 358 216 356 226 348 232 C 340 238 328 238 322 240 C 314 243 314 252 322 255 C 338 259 366 253 374 257 C 382 261 382 270 374 273 C 360 277 330 271 320 275 C 312 278 312 287 320 291 C 314 294 306 296 302 298"
          fill="none"
          stroke="url(#viz-coil)"
          strokeWidth="11"
          strokeLinecap="round"
          className="plate"
        />
      </Hot>

      {/* large intestine: caecum → ascending → transverse → descending → sigmoid → rectum */}
      <Hot id="large" active={active} onPick={onPick} label="Large intestine">
        <path
          d="M 300 296 V 238 q 0 -12 12 -12 H 386 q 12 0 12 12 V 288 q 0 12 -12 12 H 366 q -14 0 -14 14 V 322"
          fill="none"
          stroke="#d99f8c"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="plate"
        />
      </Hot>

      {/* stomach — J-shaped sac, pylorus at the lower right */}
      <Hot id="stomach" active={active} onPick={onPick} label="Stomach">
        <path
          d="M 330 122 C 344 132 346 152 336 168 C 326 183 306 192 290 189 C 272 186 257 170 258 152 C 259 136 272 124 292 119 C 306 115 320 116 330 122 Z"
          fill="url(#viz-gut)"
          className="plate"
          stroke="#fffdf8"
          strokeWidth="1.8"
        />
        <path d="M 292 131 C 283 138 279 150 281 161" fill="none" stroke="#a4472f" strokeWidth="1.8" opacity="0.35" strokeLinecap="round" />
        <path d="M 306 127 C 297 137 293 155 295 170" fill="none" stroke="#a4472f" strokeWidth="1.8" opacity="0.35" strokeLinecap="round" />
      </Hot>

      {/* liver + gall bladder + bile duct */}
      <Hot id="liver" active={active} onPick={onPick} label="Liver">
        <path
          d="M 228 132 C 226 114 244 102 266 101 C 288 100 308 106 316 118 C 322 128 312 138 294 139 C 270 140 238 144 228 132 Z"
          fill="#9a5b48"
          className="plate"
          stroke="#fffdf8"
          strokeWidth="1.8"
        />
        <path d="M 306 150 C 324 172 340 190 352 200" fill="none" stroke="#6f9a54" strokeWidth="3.2" strokeLinecap="round" opacity="0.9" />
        <ellipse cx="308" cy="146" rx="7" ry="9" fill="#6f9a54" className="plate" stroke="#fffdf8" strokeWidth="1.6" />
      </Hot>

      {/* oesophagus */}
      <Hot id="oesophagus" active={active} onPick={onPick} label="Oesophagus">
        <path d="M 330 78 C 332 94 332 112 330 128" fill="none" stroke="#d98a6e" strokeWidth="12" strokeLinecap="round" className="plate" />
      </Hot>

      {/* mouth — open mouth, teeth above, tongue below */}
      <Hot id="mouth" active={active} onPick={onPick} label="Mouth">
        <ellipse cx="330" cy="62" rx="27" ry="21" fill="#f3cdbb" stroke="#c07a5e" strokeWidth="1.6" className="plate" />
        <ellipse cx="330" cy="64" rx="20" ry="14" fill="#9c3f2c" />
        <path d="M 312 57 Q 330 49 348 57 Q 330 63 312 57 Z" fill="#fffdf8" />
        <path d="M 314 73 Q 330 83 346 73 Q 330 77 314 73 Z" fill="#e2857a" />
      </Hot>

      {/* leaders + label cards */}
      {labels.map((l, i) => (
        <g key={l.id}>
          <path
            d={`M 204 ${l.y} L ${l.tx - 14} ${l.y} L ${l.tx} ${l.ty}`}
            fill="none"
            stroke="#c9bda3"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            pointerEvents="none"
          />
          <circle cx={l.tx} cy={l.ty} r="2.4" fill="#c9bda3" pointerEvents="none" />
          <Hot id={l.id} active={active} onPick={onPick} label={l.n}>
            <rect x="14" y={l.y - 18} width="190" height="38" rx="11" className="plate" fill="#fffdf8" stroke="#efe4d2" strokeWidth="1.5" />
            <T x="26" y={l.y - 2} size={11.5} anchor="start">{l.n}</T>
            <Sub x="26" y={l.y + 12} anchor="start">{l.note}</Sub>
            <circle cx="184" cy={l.y - 1} r="8.5" fill="#f4ecdd" />
            <T x="184" y={l.y + 2.6} size={9.5} weight={800} fill={MUTED}>{i + 1}</T>
          </Hot>
        </g>
      ))}

      {/* the tube, measured */}
      <g pointerEvents="none">
        <rect x="428" y="86" width="196" height="162" rx="14" fill="#fffdf8" opacity="0.92" stroke="#e2d9c7" />
        <T x="446" y="108" size={10} anchor="start" weight={800} fill={MUTED}>THE TUBE, END TO END</T>
        <line x1="446" y1="118" x2="606" y2="118" stroke="#e6dfd0" />
        {tube.map((t, i) => (
          <g key={t.n}>
            <circle cx="451" cy={139 + i * 30} r="3.6" fill={t.c} />
            <T x="462" y={142 + i * 30} size={10.5} anchor="start" weight={700}>{t.n}</T>
            <T x="606" y={142 + i * 30} size={10.5} anchor="end" weight={800} fill={t.c}>{t.v}</T>
          </g>
        ))}
        <line x1="446" y1="212" x2="606" y2="212" stroke="#e6dfd0" />
        <T x="446" y="231" size={10} anchor="start" weight={800} fill="#5f5a4e">TOTAL</T>
        <T x="606" y="231" size={11} anchor="end" weight={800} fill="#5f5a4e">about 9 m</T>
      </g>

      <T x="320" y="350" size={10} weight={600} fill={MUTED}>
        food spends 3–5 hours in the stomach · most absorption happens in the small intestine
      </T>
    </>
  );
};

export const VISUALS: Viz[] = [
  {
    slug: "solar-system",
    title: "The Solar System",
    sub: "Eight planets, one star, and the numbers examiners love.",
    subject: "Geography",
    accent: "#b45309",
    icon: "Globe2",
    tag: "1 picture · 9 facts",
    nodes: [
      { id: "sun", label: "Sun", fact: "The Sun holds 99.86% of the solar system's mass and is a middle-aged yellow dwarf star." },
      { id: "mercury", label: "Mercury", fact: "Smallest planet and closest to the Sun — one year lasts just 88 Earth days." },
      { id: "venus", label: "Venus", fact: "Hottest planet (about 465 °C) and the brightest planet in our night sky." },
      { id: "earth", label: "Earth", fact: "The only planet known to support life; 71% of its surface is water." },
      { id: "mars", label: "Mars", fact: "The Red Planet — home to Olympus Mons, the tallest volcano in the solar system." },
      { id: "jupiter", label: "Jupiter", fact: "Largest planet; its Great Red Spot is a storm wider than Earth." },
      { id: "saturn", label: "Saturn", fact: "Famous for its rings and the least dense planet — it would float on water." },
      { id: "uranus", label: "Uranus", fact: "An ice giant that rotates on its side, tilted about 98°." },
      { id: "neptune", label: "Neptune", fact: "Farthest planet from the Sun, with the fastest winds (over 2,000 km/h)." },
    ],
    render: solar,
  },
  {
    slug: "earth-inside",
    title: "Inside the Earth",
    sub: "Four layers from crust to core — and what each one does.",
    subject: "Geography",
    accent: "#c2410c",
    icon: "Layers",
    tag: "1 picture · 4 facts",
    nodes: [
      { id: "crust", label: "Crust", fact: "Thin outer shell, 5–70 km thick. Continental crust is mostly granite, oceanic crust mostly basalt." },
      { id: "mantle", label: "Mantle", fact: "Thickest layer (about 2,900 km) of hot rock that flows slowly and drives plate movement." },
      { id: "outer", label: "Outer core", fact: "Liquid iron and nickel — its swirling motion creates Earth's magnetic field." },
      { id: "inner", label: "Inner core", fact: "A solid iron-nickel ball at about 5,400 °C, kept solid by immense pressure." },
    ],
    render: earth,
  },
  {
    slug: "atmosphere",
    title: "Layers of the Atmosphere",
    sub: "Where weather happens, where ozone sits, where meteors burn.",
    subject: "Geography",
    accent: "#0e7490",
    icon: "Waves",
    tag: "1 picture · 5 facts",
    nodes: [
      { id: "tropo", label: "Troposphere", fact: "0–12 km. All weather happens here and temperature falls with height." },
      { id: "strato", label: "Stratosphere", fact: "12–50 km. Holds the ozone layer that blocks UV rays; jet aircraft cruise here." },
      { id: "meso", label: "Mesosphere", fact: "50–85 km. Meteors burn up here — it is the coldest layer." },
      { id: "thermo", label: "Thermosphere", fact: "85–600 km. Auroras glow here and temperature rises sharply." },
      { id: "exo", label: "Exosphere", fact: "Above 600 km. Air is extremely thin and slowly fades into space." },
    ],
    render: atmosphere,
  },
  {
    slug: "water-cycle",
    title: "The Water Cycle",
    sub: "Evaporation, condensation, rain — the loop that never stops.",
    subject: "Geography",
    accent: "#0369a1",
    icon: "Droplets",
    tag: "1 picture · 7 facts",
    nodes: [
      { id: "sun", label: "Sun", fact: "Solar energy drives the whole cycle by heating water everywhere on Earth." },
      { id: "evap", label: "Evaporation", fact: "Water turns into vapour from oceans, rivers and soil — plus transpiration from plants." },
      { id: "cloud", label: "Condensation", fact: "Vapour cools and condenses on dust particles to form clouds." },
      { id: "rain", label: "Precipitation", fact: "Water falls back as rain, snow, sleet or hail." },
      { id: "river", label: "Runoff", fact: "Runoff collects in streams and rivers that flow back to the sea." },
      { id: "ground", label: "Groundwater", fact: "Some water seeps down to refill groundwater, feeding wells and springs." },
      { id: "sea", label: "Ocean", fact: "Oceans hold about 97% of Earth's water and supply most of the vapour." },
    ],
    render: water,
  },
  {
    slug: "rock-cycle",
    title: "The Rock Cycle",
    sub: "Three rock families, one endless recycling loop.",
    subject: "Geography",
    accent: "#b45309",
    icon: "Mountain",
    tag: "1 picture · 4 facts",
    nodes: [
      { id: "magma", label: "Magma", fact: "Molten rock below the surface. When it cools and hardens it becomes igneous rock." },
      { id: "igneous", label: "Igneous", fact: "Formed by cooling magma or lava — granite (intrusive) and basalt (extrusive)." },
      { id: "sedimentary", label: "Sedimentary", fact: "Layers of sand and shells pressed together over ages — sandstone and limestone." },
      { id: "metamorphic", label: "Metamorphic", fact: "Existing rock changed by heat and pressure — limestone becomes marble, shale becomes slate." },
    ],
    render: rock,
  },
  {
    slug: "monsoon",
    title: "The Indian Monsoon",
    sub: "Two branches, one June onset, one October retreat.",
    subject: "Geography",
    accent: "#0e7490",
    icon: "Droplets",
    tag: "1 picture · 4 facts",
    nodes: [
      { id: "onset", label: "Onset", fact: "Around 1 June the southwest monsoon reaches Kerala, then covers most of India by mid-July." },
      { id: "arabian", label: "Arabian Sea branch", fact: "Strikes the Western Ghats — heavy rain on the windward side, a dry rain-shadow on the leeward side." },
      { id: "bay", label: "Bay of Bengal branch", fact: "Sweeps up the Ganga plain and gives Cherrapunji and Mawsynram their record rainfall." },
      { id: "retreat", label: "Retreat", fact: "From September the monsoon withdraws; the northeast monsoon then rains on Tamil Nadu in October–December." },
    ],
    render: monsoon,
  },
  {
    slug: "constitution",
    title: "The Constitution at a Glance",
    sub: "Preamble, Parts, Articles, Schedules and Amendments.",
    subject: "Polity",
    accent: "#4338ca",
    icon: "Scale",
    tag: "1 picture · 5 facts",
    nodes: [
      { id: "preamble", label: "Preamble", fact: "Opens with 'We, the people' and promises justice, liberty, equality and fraternity." },
      { id: "parts", label: "Parts", fact: "25 Parts group the Articles by theme — Union, States, Fundamental Rights and more." },
      { id: "articles", label: "Articles", fact: "Originally 395 Articles; today about 448, the working rules of the state." },
      { id: "schedules", label: "Schedules", fact: "12 Schedules cover the Union/State lists, languages, tribes and forms of oath." },
      { id: "amendments", label: "Amendments", fact: "106 amendments so far; Article 368 lays down the amending power." },
    ],
    render: constitution,
  },
  {
    slug: "government",
    title: "Three Organs of Government",
    sub: "Who makes, who runs, who judges — in one roof.",
    subject: "Polity",
    accent: "#1d4ed8",
    icon: "Landmark",
    tag: "1 picture · 3 facts",
    nodes: [
      { id: "legislature", label: "Legislature", fact: "Parliament — President, Lok Sabha and Rajya Sabha — makes the laws." },
      { id: "executive", label: "Executive", fact: "President, Council of Ministers and civil servants carry the laws out." },
      { id: "judiciary", label: "Judiciary", fact: "Supreme Court, High Courts and district courts interpret the laws and protect rights." },
    ],
    render: government,
  },
  {
    slug: "cell",
    title: "Inside a Cell",
    sub: "The smallest unit of life, organelle by organelle.",
    subject: "Biology",
    accent: "#15803d",
    icon: "Dna",
    tag: "1 picture · 6 facts",
    nodes: [
      { id: "membrane", label: "Cell membrane", fact: "A selective gatekeeper that decides what enters and leaves the cell." },
      { id: "nucleus", label: "Nucleus", fact: "Control centre — holds DNA and directs all the cell's activities." },
      { id: "mito", label: "Mitochondria", fact: "Powerhouse of the cell — releases energy as ATP through respiration." },
      { id: "ribo", label: "Ribosomes", fact: "Protein factories; some float free and some sit on the rough endoplasmic reticulum." },
      { id: "golgi", label: "Golgi body", fact: "Packs and dispatches proteins like a post office." },
      { id: "vacuole", label: "Vacuole", fact: "Storage sac for water and sap — much larger in plant cells." },
    ],
    render: cell,
  },
  {
    slug: "food-chain",
    title: "Food Chain & Energy",
    sub: "Sun to soil — and why the tiger needs a whole forest.",
    subject: "Biology",
    accent: "#047857",
    icon: "Sprout",
    tag: "1 picture · 5 facts",
    nodes: [
      { id: "sun", label: "Sun", fact: "All energy in a food chain starts as sunlight captured by green plants." },
      { id: "producer", label: "Producers", fact: "Producers such as grass and algae make their own food by photosynthesis." },
      { id: "herbivore", label: "Herbivores", fact: "Primary consumers eat plants — grasshopper, deer, rabbit." },
      { id: "carnivore", label: "Carnivores", fact: "Secondary consumers eat herbivores — frog, snake, tiger." },
      { id: "decomposer", label: "Decomposers", fact: "Fungi and bacteria break down dead matter and return nutrients to the soil." },
    ],
    render: chain,
  },
  {
    slug: "history-timeline",
    title: "One Timeline of India",
    sub: "Ancient to freedom — four eras, one story.",
    subject: "History",
    accent: "#b91c1c",
    icon: "Clock",
    tag: "1 picture · 4 facts",
    nodes: [
      { id: "ancient", label: "Ancient", fact: "Indus Valley (2500 BCE) → Vedic age → Mauryas → Guptas." },
      { id: "medieval", label: "Medieval", fact: "Delhi Sultanate (1206) → Vijayanagara → Mughals (1526) → Marathas." },
      { id: "modern", label: "Modern", fact: "1757 Plassey → 1857 Revolt → 1885 Congress → 1919 Jallianwala Bagh." },
      { id: "freedom", label: "Freedom", fact: "1930 Dandi March → 1942 Quit India → 1947 Independence and Partition." },
    ],
    render: timeline,
  },
  {
    slug: "digestion",
    title: "The Digestive Trail",
    sub: "Follow one meal from mouth to intestine.",
    subject: "Biology",
    accent: "#a16207",
    icon: "Route",
    tag: "1 picture · 6 facts",
    nodes: [
      { id: "mouth", label: "Mouth", fact: "Saliva's amylase starts breaking down starch as you chew." },
      { id: "oesophagus", label: "Oesophagus", fact: "Peristalsis — wave-like muscle movement — pushes food down to the stomach." },
      { id: "stomach", label: "Stomach", fact: "HCl and pepsin digest protein; food becomes a paste called chyme." },
      { id: "liver", label: "Liver", fact: "Produces bile, stored in the gall bladder, which breaks up fats." },
      { id: "small", label: "Small intestine", fact: "Main absorption site — villi soak up nutrients into the blood." },
      { id: "large", label: "Large intestine", fact: "Absorbs water and salts; waste is stored before excretion." },
    ],
    render: digestion,
  },
];

export const vizBySlug = (slug: string) => VISUALS.find((v) => v.slug === slug);

/** Chapters that already have a matching hand-drawn picture. */
export const CHAPTER_VISUALS: Record<string, string> = {
  "geo-01": "solar-system",
  "geo-03": "earth-inside",
  "geo-04": "rock-cycle",
  "geo-07": "atmosphere",
  "geo-16": "monsoon",
  "ancient-02": "history-timeline",
  "modern-06": "history-timeline",
  "polity-01": "constitution",
  "polity-03": "constitution",
  "polity-09": "government",
  "biology-01": "cell",
  "biology-07": "digestion",
  "environment-03": "food-chain",
  "environment-04": "water-cycle",
};

export function VizDiagram({ viz, active, onPick, thumb }: { viz: Viz; active?: string; onPick?: (id: string) => void; thumb?: boolean }) {
  return (
    <svg
      className={`viz${thumb ? " viz--thumb" : ""}`}
      viewBox="0 0 640 380"
      style={{ ["--viz" as string]: viz.accent }}
      role={thumb ? "img" : "group"}
      aria-label={viz.title}
    >
      {viz.render({ active, onPick: onPick || (() => {}) })}
    </svg>
  );
}
