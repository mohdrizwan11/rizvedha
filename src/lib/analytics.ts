/* ------------------------------------------------------------------
   Site usage. No cookies, no personal data — one random id kept in
   localStorage so a returning device counts once per day. Everything
   is a no-op until Supabase keys exist.
------------------------------------------------------------------- */

import { backendEnabled, getSupabase } from "./supabase";

const VID_KEY = "rv:vid";

export type SiteStats = {
  visitors: number;
  today: number;
  views: number;
  recent: number;
};

function visitorId(): string {
  try {
    let v = localStorage.getItem(VID_KEY);
    if (!v) {
      v = typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VID_KEY, v);
    }
    return v;
  } catch {
    return "local";
  }
}

/* If the schema has not been applied yet, stop retrying after the first miss
   so the console does not fill with 404s on every route change. */
let hitDisabled = false;

/** Count one visit per device per day, plus one page view per route change. */
export async function recordHit(path: string): Promise<void> {
  if (!backendEnabled || hitDisabled) return;
  const sb = await getSupabase();
  if (!sb) return;
  try {
    const { error } = await sb.rpc("rv_hit", { p_visitor: visitorId(), p_path: path.slice(0, 200) });
    if (error && /could not find|does not exist|schema cache/i.test(error.message)) hitDisabled = true;
  } catch {
    /* analytics must never break the app */
  }
}

/** Aggregate, non-identifying totals shown on the About page. */
export async function fetchStats(): Promise<SiteStats | null> {
  if (!backendEnabled) return null;
  const sb = await getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.rpc("rv_stats");
  if (error || !data?.length) return null;
  const r = data[0] as Record<string, number | string>;
  return {
    visitors: Number(r.unique_visitors) || 0,
    today: Number(r.today_visitors) || 0,
    views: Number(r.page_views) || 0,
    recent: Number(r.last_28_days) || 0,
  };
}
