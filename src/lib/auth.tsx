/* ------------------------------------------------------------------
   Google sign-in + cross-device progress.
   Nothing here runs until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   exist in .env — until then the app is purely local and the account
   chip hides itself.
------------------------------------------------------------------- */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { authEnabled, getSupabase } from "./supabase";
import { mergeStates, useStore } from "./store";
import type { State } from "./store";

export type AuthUser = { id: string; name: string; email: string; avatar: string | null };
export type AuthStatus = "off" | "loading" | "anon" | "in";

type Ctx = {
  enabled: boolean;
  status: AuthStatus;
  user: AuthUser | null;
  syncing: boolean;
  lastSync: number | null;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);

type Meta = { full_name?: string; name?: string; avatar_url?: string; picture?: string };

function toUser(u: { id: string; email?: string | null; user_metadata?: Meta }): AuthUser {
  const meta = u.user_metadata || {};
  const email = u.email || "";
  return {
    id: u.id,
    name: meta.full_name || meta.name || email.split("@")[0] || "You",
    email,
    avatar: meta.avatar_url || meta.picture || null,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { state, hydrate } = useStore();
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [status, setStatus] = useState<AuthStatus>(authEnabled ? "loading" : "off");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pulled = useRef(false);

  const push = useCallback(async (uid: string, snapshot: State) => {
    const sb = await getSupabase();
    if (!sb) return;
    setSyncing(true);
    const { error: err } = await sb
      .from("progress")
      .upsert({ user_id: uid, state: snapshot, updated_at: new Date().toISOString() });
    setSyncing(false);
    if (err) setError(err.message);
    else {
      setError(null);
      setLastSync(Date.now());
    }
  }, []);

  const accept = useCallback(
    async (raw: { id: string; email?: string | null; user_metadata?: Meta } | null) => {
      if (!raw) {
        setUser(null);
        setStatus("anon");
        pulled.current = false;
        return;
      }
      setUser(toUser(raw));
      setStatus("in");
      if (pulled.current) return;
      pulled.current = true;

      const sb = await getSupabase();
      if (!sb) return;

      const { data, error: err } = await sb.from("progress").select("state").eq("user_id", raw.id).maybeSingle();
      if (err) {
        setError(err.message);
        return;
      }

      const remote = (data?.state || null) as State | null;
      const merged = remote ? mergeStates(stateRef.current, remote) : stateRef.current;
      if (remote) hydrate(remote);
      await push(raw.id, merged);
    },
    [hydrate, push],
  );

  useEffect(() => {
    if (!authEnabled) return;
    let alive = true;
    let stop = () => {};

    void (async () => {
      const sb = await getSupabase();
      if (!sb || !alive) return;

      const { data } = await sb.auth.getSession();
      if (!alive) return;
      await accept(data.session?.user ?? null);

      const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
        void accept(session?.user ?? null);
      });
      stop = () => sub.subscription.unsubscribe();
    })();

    return () => {
      alive = false;
      stop();
    };
  }, [accept]);

  /* debounce writes so a burst of XP does not mean a burst of requests */
  useEffect(() => {
    if (status !== "in" || !user || !pulled.current) return;
    const t = setTimeout(() => {
      void push(user.id, stateRef.current);
    }, 900);
    return () => clearTimeout(t);
  }, [state, status, user, push]);

  const signIn = useCallback(async () => {
    const sb = await getSupabase();
    if (!sb) {
      setError("Sign-in is not configured yet. Add your Supabase keys to .env.");
      return;
    }
    setError(null);
    const { error: err } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (err) setError(err.message);
  }, []);

  const signOut = useCallback(async () => {
    const sb = await getSupabase();
    await sb?.auth.signOut();
    setUser(null);
    setStatus("anon");
    pulled.current = false;
    setLastSync(null);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ enabled: authEnabled, status, user, syncing, lastSync, error, signIn, signOut }),
    [status, user, syncing, lastSync, error, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
