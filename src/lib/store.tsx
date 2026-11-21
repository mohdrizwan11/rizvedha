import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ChapterProgress = { sections: string[]; done: boolean; lastAt: number };
export type QuizStats = { total: number; correct: number; bySubject: Record<string, { t: number; c: number }> };

export type State = {
  name: string;
  xp: number;
  days: Record<string, number>;
  chapters: Record<string, ChapterProgress>;
  bookmarks: string[];
  quiz: QuizStats;
  gameBest: Record<string, number>;
  recent: string[];
  onboarded: boolean;
};

const KEY = "vedha2:state:v1";

const initial: State = {
  name: "",
  xp: 0,
  days: {},
  chapters: {},
  bookmarks: [],
  quiz: { total: 0, correct: 0, bySubject: {} },
  gameBest: {},
  recent: [],
  onboarded: false,
};

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    return { ...initial, ...parsed, quiz: { ...initial.quiz, ...(parsed.quiz || {}) } };
  } catch {
    return initial;
  }
}

/** Local calendar day, not UTC — an 11 pm study session belongs to today. */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const todayKey = () => dayKey();

function save(s: State) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage full / private mode */
  }
}

export function streakOf(days: Record<string, number>): number {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 400; i++) {
    const k = dayKey(d);
    if (days[k]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else if (i === 0) {
      d.setDate(d.getDate() - 1); // today may be empty; count from yesterday
    } else {
      break;
    }
  }
  return streak;
}

type Ctx = {
  state: State;
  addXp: (n: number) => void;
  markSection: (chapterId: string, section: string) => void;
  completeChapter: (chapterId: string, on: boolean) => void;
  toggleBookmark: (id: string) => void;
  recordQuiz: (subject: string, correct: boolean) => void;
  setGameBest: (game: string, score: number) => void;
  pushRecent: (id: string) => void;
  setName: (name: string) => void;
  /** merge a copy from another device into this one (sign-in) */
  hydrate: (remote: State) => void;
  reset: () => void;
};

/** Union merge — nothing a device earned is ever thrown away. */
export function mergeStates(local: State, remote: State): State {
  const days: Record<string, number> = { ...remote.days };
  for (const [k, v] of Object.entries(local.days)) days[k] = Math.max(days[k] || 0, v);

  const chapters: Record<string, ChapterProgress> = { ...remote.chapters };
  for (const [id, c] of Object.entries(local.chapters)) {
    const o = chapters[id];
    chapters[id] = o
      ? {
          sections: Array.from(new Set([...o.sections, ...c.sections])),
          done: o.done || c.done,
          lastAt: Math.max(o.lastAt, c.lastAt),
        }
      : c;
  }

  const bySubject: QuizStats["bySubject"] = { ...remote.quiz.bySubject };
  for (const [s, v] of Object.entries(local.quiz.bySubject)) {
    const o = bySubject[s];
    bySubject[s] = o ? { t: Math.max(o.t, v.t), c: Math.max(o.c, v.c) } : v;
  }

  const gameBest: Record<string, number> = { ...remote.gameBest };
  for (const [g, v] of Object.entries(local.gameBest)) gameBest[g] = Math.max(gameBest[g] || 0, v);

  const quizTotal = Math.max(local.quiz.total, remote.quiz.total);
  const quizCorrect = Math.min(quizTotal, Math.max(local.quiz.correct, remote.quiz.correct));

  return {
    name: local.name || remote.name,
    xp: Math.max(local.xp, remote.xp),
    days,
    chapters,
    bookmarks: Array.from(new Set([...local.bookmarks, ...remote.bookmarks])),
    quiz: { total: quizTotal, correct: quizCorrect, bySubject },
    gameBest,
    recent: Array.from(new Set([...local.recent, ...remote.recent])).slice(0, 8),
    onboarded: local.onboarded || remote.onboarded,
  };
}

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    const t = setTimeout(() => save(state), 120);
    return () => clearTimeout(t);
  }, [state]);

  const bumpDay = (s: State, xp: number): State => {
    const k = todayKey();
    return { ...s, days: { ...s.days, [k]: (s.days[k] || 0) + xp } };
  };

  const addXp = useCallback((n: number) => {
    setState((s) => bumpDay({ ...s, xp: s.xp + n }, Math.max(1, n)));
  }, []);

  const markSection = useCallback((chapterId: string, section: string) => {
    setState((s) => {
      const cur = s.chapters[chapterId] || { sections: [], done: false, lastAt: 0 };
      if (cur.sections.includes(section)) return s;
      const next = {
        ...s,
        chapters: {
          ...s.chapters,
          [chapterId]: { ...cur, sections: [...cur.sections, section], lastAt: Date.now() },
        },
      };
      return bumpDay({ ...next, xp: next.xp + 4 }, 4);
    });
  }, []);

  const completeChapter = useCallback((chapterId: string, on: boolean) => {
    setState((s) => {
      const cur = s.chapters[chapterId] || { sections: [], done: false, lastAt: 0 };
      const next = {
        ...s,
        chapters: { ...s.chapters, [chapterId]: { ...cur, done: on, lastAt: Date.now() } },
      };
      return on && !cur.done ? bumpDay({ ...next, xp: next.xp + 30 }, 30) : next;
    });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      bookmarks: s.bookmarks.includes(id) ? s.bookmarks.filter((b) => b !== id) : [id, ...s.bookmarks],
    }));
  }, []);

  const recordQuiz = useCallback((subject: string, correct: boolean) => {
    setState((s) => {
      const prev = s.quiz.bySubject[subject] || { t: 0, c: 0 };
      const next: State = {
        ...s,
        quiz: {
          total: s.quiz.total + 1,
          correct: s.quiz.correct + (correct ? 1 : 0),
          bySubject: { ...s.quiz.bySubject, [subject]: { t: prev.t + 1, c: prev.c + (correct ? 1 : 0) } },
        },
      };
      return bumpDay({ ...next, xp: next.xp + (correct ? 6 : 2) }, correct ? 6 : 2);
    });
  }, []);

  const setGameBest = useCallback((game: string, score: number) => {
    setState((s) =>
      (s.gameBest[game] || 0) >= score
        ? s
        : bumpDay({ ...s, gameBest: { ...s.gameBest, [game]: score }, xp: s.xp + score }, score),
    );
  }, []);

  const pushRecent = useCallback((id: string) => {
    setState((s) => ({ ...s, recent: [id, ...s.recent.filter((r) => r !== id)].slice(0, 8) }));
  }, []);

  const setName = useCallback((name: string) => {
    setState((s) => ({ ...s, name, onboarded: true }));
  }, []);

  const reset = useCallback(() => setState(initial), []);
  const hydrate = useCallback((remote: State) => setState((s) => mergeStates(s, remote)), []);

  const value = useMemo(
    () => ({
      state,
      addXp,
      markSection,
      completeChapter,
      toggleBookmark,
      recordQuiz,
      setGameBest,
      pushRecent,
      setName,
      hydrate,
      reset,
    }),
    [state, addXp, markSection, completeChapter, toggleBookmark, recordQuiz, setGameBest, pushRecent, setName, hydrate, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function levelOf(xp: number) {
  const level = Math.floor(xp / 250) + 1;
  const into = xp % 250;
  const titles = ["Recruit", "Cadet", "Scholar", "Analyst", "Strategist", "Topper", "Ranker", "Grand Master"];
  const title = titles[Math.min(titles.length - 1, Math.floor((level - 1) / 2))];
  return { level, into, need: 250, pct: Math.round((into / 250) * 100), title };
}
