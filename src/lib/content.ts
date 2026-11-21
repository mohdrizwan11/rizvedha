import { useEffect, useState } from "react";

export type FactBlock = { type: "fact" | "tip" | "para"; text: string };
export type TableBlock = { type: "table"; rows: string[][]; caption?: string };
export type Block = FactBlock | TableBlock;
export type Section = { title: string; blocks: Block[] };
export type Chapter = {
  id: string;
  module: string;
  num: number;
  title: string;
  pages: [number, number];
  sections: Section[];
  factCount: number;
};

type Loader = () => Promise<{ default: Chapter }>;
const loaders = import.meta.glob("../data/chapters/*.json") as Record<string, Loader>;

const cache = new Map<string, Chapter>();

export function chapterLoader(id: string): Loader | undefined {
  return loaders[`../data/chapters/${id}.json`];
}

export async function getChapter(id: string): Promise<Chapter | null> {
  if (cache.has(id)) return cache.get(id)!;
  const loader = chapterLoader(id);
  if (!loader) return null;
  const mod = await loader();
  const ch = mod.default as Chapter;
  cache.set(id, ch);
  return ch;
}

export function useChapter(id: string | undefined) {
  const [chapter, setChapter] = useState<Chapter | null>(id ? cache.get(id) || null : null);
  const [loading, setLoading] = useState(!!id && !chapter);
  useEffect(() => {
    let alive = true;
    if (!id) return;
    if (cache.has(id)) {
      setChapter(cache.get(id)!);
      setLoading(false);
      return;
    }
    setLoading(true);
    getChapter(id).then((c) => {
      if (!alive) return;
      setChapter(c);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [id]);
  return { chapter, loading };
}

export function factsOf(chapter: Chapter): string[] {
  return chapter.sections.flatMap((s) => s.blocks.filter((b): b is FactBlock => b.type !== "table").map((b) => b.text));
}

const KEY_HINT = /\b(\d|first|second|largest|smallest|highest|longest|largest|only|oldest|newest|highest|deepest|capital|discovered|invented|founded|president|minister|largest|national)\b/i;

/** High-yield one-liners: numbers, superlatives and named facts. */
export function keyFacts(chapter: Chapter, limit = 24): string[] {
  const all = factsOf(chapter);
  const scored = all
    .map((t) => ({ t, score: (t.match(/\d/g) ? 2 : 0) + (KEY_HINT.test(t) ? 2 : 0) + Math.min(2, Math.floor(t.length / 120)) }))
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.t);
  const out: string[] = [];
  for (const f of scored) {
    if (out.length >= limit) break;
    if (out.some((o) => o.slice(0, 30) === f.slice(0, 30))) continue;
    out.push(f);
  }
  return out;
}

export const NUM_RE = /\b(\d{1,4}(?:[.,]\d+)?(?:\s?(?:km|kg|m|cm|mm|lakh|crore|million|billion|%|°C|K|years?|AD|BC))?)\b/;

export type Question = {
  q: string;
  options: string[];
  answer: string;
  source: string;
  subject: string;
};

/** Build numeric/workbook MCQs out of the book's own one-liners. */
export function quizFromChapter(chapter: Chapter, subject: string, limit = 10): Question[] {
  const facts = keyFacts(chapter, 60);
  const pool = new Set<string>();
  const numbered: { text: string; value: string; idx: number }[] = [];
  for (const f of facts) {
    const m = f.match(NUM_RE);
    if (!m || m.index === undefined) continue;
    if (m[1].length < 1) continue;
    numbered.push({ text: f, value: m[1], idx: m.index });
    pool.add(m[1]);
  }
  const values = [...pool];
  if (values.length < 4) return [];
  const out: Question[] = [];
  for (const item of numbered) {
    if (out.length >= limit) break;
    const blanked = item.text.slice(0, item.idx) + "____" + item.text.slice(item.idx + item.value.length);
    if (blanked.length > 240) continue;
    const wrong = values.filter((v) => v !== item.value).sort(() => Math.random() - 0.5).slice(0, 3);
    if (wrong.length < 3) continue;
    const options = [...wrong, item.value].sort(() => Math.random() - 0.5);
    out.push({
      q: `Fill in the blank — ${blanked}`,
      options,
      answer: item.value,
      source: item.text,
      subject,
    });
  }
  return out;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Split a fact into segments so numbers and proper nouns can be highlighted. */
export function highlightParts(text: string): { text: string; mark: boolean }[] {
  const re = /(\d[\d.,]*\s?(?:km|kg|cm|mm|m\b|lakh|crore|million|billion|%|°C|K\b|years?|BC|AD)?)/g;
  const out: { text: string; mark: boolean }[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: text.slice(last, i), mark: false });
    out.push({ text: m[0], mark: true });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), mark: false });
  return out;
}
