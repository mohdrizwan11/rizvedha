/* ------------------------------------------------------------------
   Supabase client, created only when the project keys exist.
   The whole app works without this: the client is imported lazily, so
   an unconfigured build never ships the SDK. It exists only to record
   anonymous usage counts and (optionally) nothing else.
------------------------------------------------------------------- */

import type { SupabaseClient } from "@supabase/supabase-js";

const URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
/* Vite only exposes VITE_* variables. Supabase calls this the "publishable"
   key now; the older name is kept as a fallback. */
const KEY = (
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)
)?.trim();

/** true once both the project URL and a public key are present in .env */
export const backendEnabled = Boolean(URL && KEY);

let client: SupabaseClient | null = null;
let clientPromise: Promise<SupabaseClient> | null = null;

export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!URL || !KEY) return null;
  if (client) return client;
  /* share one promise so concurrent callers never create two clients */
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) => {
      client = createClient(URL, KEY, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });
      return client;
    });
  }
  return clientPromise;
}