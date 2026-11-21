import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "./Icon";
import { SiteFooter } from "./SiteFooter";
import { CommandPalette } from "./CommandPalette";
import { ScrollProgress, BackToTop } from "./Chrome";
import { BRAND } from "../config";
import { useStore, streakOf, levelOf } from "../lib/store";
import { useTheme } from "../lib/theme";

const NAV = [
  { to: "/", label: "Home", icon: "Home" },
  { to: "/learn", label: "Learn", icon: "BookOpen" },
  { to: "/visuals", label: "Visuals", icon: "Eye" },
  { to: "/explore", label: "Explore", icon: "Compass" },
  { to: "/games", label: "Games", icon: "Gamepad2" },
  { to: "/progress", label: "Progress", icon: "Activity" },
];

const RAIL_KEY = "rv:rail";

export function Layout({ children }: { children: React.ReactNode }) {
  const { state } = useStore();
  const { theme, toggle: toggleTheme } = useTheme();
  const loc = useLocation();
  const streak = streakOf(state.days);
  const lvl = levelOf(state.xp);

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(RAIL_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [full, setFull] = useState(false);
  const [cmdk, setCmdk] = useState(false);

  /* Ctrl/⌘+K opens the command palette from anywhere */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdk((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(RAIL_KEY, collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.().catch(() => {});
  };

  return (
    <div className={`app${collapsed ? " is-rail-collapsed" : ""}`}>
      <ScrollProgress />
      <aside className="rail" aria-label="Main">
        <RailBody
          collapsed={collapsed}
          streak={streak}
          level={lvl}
          xp={state.xp}
          full={full}
          theme={theme}
          onCollapse={() => setCollapsed((c) => !c)}
          onSearch={() => setCmdk(true)}
          onFull={toggleFull}
          onTheme={toggleTheme}
        />
      </aside>

      <main className="main">
        {children}

        <SiteFooter />

        <nav className="tabbar">
          {NAV.map((n) => {
            const active = n.to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`tab${active ? " active" : ""}`}>
                <Icon name={n.icon} />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </main>

      <BackToTop />
      <CommandPalette open={cmdk} onClose={() => setCmdk(false)} />
    </div>
  );
}

function RailBody({
  collapsed,
  streak,
  level,
  xp,
  full,
  theme,
  onCollapse,
  onSearch,
  onFull,
  onTheme,
}: {
  collapsed: boolean;
  streak: number;
  level: { level: number; title: string };
  xp: number;
  full: boolean;
  theme: "light" | "dark";
  onCollapse: () => void;
  onSearch: () => void;
  onFull: () => void;
  onTheme: () => void;
}) {
  return (
    <>
      <div className="rail__top">
        <Link to="/" className="brand">
          <div className="brand__mark">{BRAND.mark}</div>
          <div className="brand__text">
            <div className="brand__name">{BRAND.name}</div>
            <div className="brand__tag">{BRAND.tagline}</div>
          </div>
        </Link>
        <button
          className="iconbtn iconbtn--quiet rail__collapse"
          onClick={onCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon name={collapsed ? "PanelLeftOpen" : "PanelLeftClose"} />
        </button>
      </div>

      <button className="searchbar" onClick={onSearch} style={{ cursor: "pointer" }}>
        <Icon name="Search" />
        <span className="rail__only-text muted" style={{ fontSize: ".86rem" }}>Search anything…</span>
      </button>

      <div className="rail__nav">
        <div className="rail__label">Study</div>
        {NAV.slice(0, 5).map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === "/"}
            title={n.label}
            className={({ isActive }) => `navlink${isActive ? " active" : ""}`}
          >
            <Icon name={n.icon} />
            <span>{n.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="rail__foot">
        <div className="rail__controls">
          <button
            className="iconbtn iconbtn--quiet"
            onClick={onTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            <Icon name={theme === "dark" ? "Sun" : "Moon"} />
          </button>
          <button
            className="iconbtn iconbtn--quiet"
            onClick={onFull}
            aria-label="Toggle full screen"
            title={full ? "Exit full screen" : "Full screen"}
          >
            <Icon name={full ? "Minimize2" : "Maximize2"} />
          </button>
        </div>
        <div className="rail__streak" title={`${streak} day streak · level ${level.level}`}>
          <Icon name="Flame" size={20} color="#d97706" />
          <div className="rail__only-text">
            <b>{streak} day streak</b>
            <div><span>LEVEL {level.level} · {level.title.toUpperCase()}</span></div>
          </div>
        </div>
        <div className="tiny muted rail__only-text" style={{ padding: "0 6px" }}>
          {xp} XP earned
        </div>
      </div>
    </>
  );
}

export function PageHead({ eyebrow, title, sub, right }: { eyebrow: string; title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="spread" style={{ alignItems: "flex-end", padding: "8px 0 20px", flexWrap: "wrap" }}>
      <div className="stack" style={{ gap: 7 }}>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
      </div>
      {right}
    </div>
  );
}
