import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_CHAPTERS } from "../data/curriculum";
import { EXPLORERS } from "../data/explorers";
import { Icon } from "./Icon";

type Hit = { chapter: string; fact: string };
type Group = "Pages" | "Chapters" | "Libraries" | "Facts" | "Search";
type Item = { key: string; group: Group; title: string; sub?: string; to: string; icon: string };

const PAGES: Item[] = [
  { key: "p-home", group: "Pages", title: "Home", to: "/", icon: "Home" },
  { key: "p-learn", group: "Pages", title: "Learn — full syllabus", to: "/learn", icon: "BookOpen" },
  { key: "p-explore", group: "Pages", title: "Explore — visual libraries", to: "/explore", icon: "Compass" },
  { key: "p-visuals", group: "Pages", title: "Visuals — diagrams", to: "/visuals", icon: "Eye" },
  { key: "p-games", group: "Pages", title: "Games", to: "/games", icon: "Gamepad2" },
  { key: "p-progress", group: "Pages", title: "Progress", to: "/progress", icon: "Activity" },
  { key: "p-saved", group: "Pages", title: "Saved", to: "/bookmarks", icon: "Bookmark" },
  { key: "p-about", group: "Pages", title: "About", to: "/about", icon: "Info" },
];

const CHAPTER_ITEMS: Item[] = ALL_CHAPTERS.map((c) => ({
  key: `c-${c.id}`,
  group: "Chapters",
  title: c.title,
  sub: `${c.moduleTitle} · page ${c.pages[0]}`,
  to: `/learn/${c.id}`,
  icon: "BookOpen",
}));

const EXPLORER_ITEMS: Item[] = EXPLORERS.map((e) => ({
  key: `e-${e.slug}`,
  group: "Libraries",
  title: e.title,
  sub: `${e.count} entries · ${e.tag}`,
  to: `/explore/${e.slug}`,
  icon: "Compass",
}));

/**
 * Command palette — Ctrl/⌘+K anywhere.
 * Keyboard-first navigation over pages, all chapters, all libraries and the
 * lazy-loaded fact index. Nothing is fetched until the palette is opened.
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [facts, setFacts] = useState<Hit[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || facts) return;
    let alive = true;
    import("../data/search.json")
      .then((m) => {
        const raw = (m as { default?: Hit[] }).default ?? (m as unknown as Hit[]);
        if (alive) setFacts(Array.isArray(raw) ? raw : []);
      })
      .catch(() => {
        if (alive) setFacts([]);
      });
    return () => {
      alive = false;
    };
  }, [open, facts]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    document.body.classList.add("is-locked");
    return () => {
      clearTimeout(t);
      document.body.classList.remove("is-locked");
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const raw = q.trim().toLowerCase();
    if (!raw) {
      return [...PAGES, ...CHAPTER_ITEMS.slice(0, 3), ...EXPLORER_ITEMS.slice(0, 3)];
    }
    const match = (s?: string) => !!s && s.toLowerCase().includes(raw);
    const pages = PAGES.filter((i) => match(i.title));
    const chapters = CHAPTER_ITEMS.filter((i) => match(i.title) || match(i.sub)).slice(0, 12);
    const libraries = EXPLORER_ITEMS.filter((i) => match(i.title) || match(i.sub)).slice(0, 10);
    const factHits: Item[] = (facts ?? [])
      .filter((h) => h.fact.toLowerCase().includes(raw))
      .slice(0, 6)
      .map((h, i) => ({ key: `f-${i}`, group: "Facts", title: h.fact, to: `/learn/${h.chapter}`, icon: "Quote" }));
    const out: Item[] = [...pages, ...chapters, ...libraries, ...factHits];
    if (raw.length >= 2) {
      out.push({
        key: "all",
        group: "Search",
        title: `See all results for “${q.trim()}”`,
        to: `/search?q=${encodeURIComponent(q.trim())}`,
        icon: "Search",
      });
    }
    return out;
  }, [q, facts]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const go = (item: Item) => {
    onClose();
    nav(item.to);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(1, items.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + items.length) % Math.max(1, items.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = items[active];
      if (it) go(it);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  let lastGroup: Group | null = null;

  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label="Search and jump">
      <button className="cmdk__scrim" aria-label="Close search" onClick={onClose} />
      <div className="cmdk__panel" onKeyDown={onKeyDown}>
        <div className="cmdk__field">
          <Icon name="Search" size={18} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chapters, libraries, facts, pages…"
            aria-label="Search the whole library"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        <div className="cmdk__list" ref={listRef} role="listbox" aria-label="Results">
          {items.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <div key={item.key}>
                {header && <div className="cmdk__group">{header}</div>}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  data-active={i === active}
                  className={`cmdk__item${i === active ? " is-active" : ""}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(item)}
                >
                  <span className="cmdk__ico">
                    <Icon name={item.icon} size={16} />
                  </span>
                  <span className="cmdk__txt">
                    <b>{item.title}</b>
                    {item.sub && <small>{item.sub}</small>}
                  </span>
                  {i === active && <Icon name="CornerDownLeft" size={14} className="cmdk__enter" />}
                </button>
              </div>
            );
          })}
          {items.length === 0 && <div className="cmdk__empty">No match. Try a shorter word.</div>}
        </div>

        <div className="cmdk__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
          <span className="cmdk__brand">
            <Icon name="Command" size={12} /> K
          </span>
        </div>
      </div>
    </div>
  );
}
