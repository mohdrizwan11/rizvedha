import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";
import { AccountChip } from "../components/AccountChip";
import { useAuth } from "../lib/auth";
import { fetchStats, type SiteStats } from "../lib/analytics";
import { levelOf, streakOf, useStore } from "../lib/store";
import { BRAND } from "../config";

export default function Account() {
  const auth = useAuth();
  const { state } = useStore();
  const streak = streakOf(state.days);
  const lvl = levelOf(state.xp);
  const signedIn = auth.status === "in" && !!auth.user;
  const [stats, setStats] = useState<SiteStats | null>(null);

  useEffect(() => {
    let alive = true;
    void fetchStats().then((s) => {
      if (alive) setStats(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="page page--narrow">
      <PageHead
        eyebrow="Your account"
        title={signedIn ? `Namaste, ${auth.user!.name.split(" ")[0]}` : "Your account, your progress"}
        sub="Sign in with Google — no new password to remember. Your local record is merged, never replaced."
      />

      <section className="card card--pad account-panel">
        <div className="account-panel__head">
          <div className="account-panel__badge"><Icon name="UserRound" size={26} /></div>
          <div className="stack" style={{ gap: 4, minWidth: 0 }}>
            <h2>{signedIn ? auth.user!.name : "One account, every device"}</h2>
            <p className="tiny muted">{signedIn ? auth.user!.email : "Free, private, and ready when you are."}</p>
          </div>
        </div>

        {auth.enabled ? (
          <div className="account-panel__action">
            <AccountChip />
            {auth.error && <p className="tiny" style={{ color: "#b91c1c" }}>{auth.error}</p>}
          </div>
        ) : (
          <div className="account-panel__offline">
            <Icon name="Info" size={16} />
            <span>
              Sign-in isn&apos;t available on this build yet. Everything you do stays safely on this device.
            </span>
          </div>
        )}
      </section>

      {auth.enabled && (
        <>
          <div className="section-head"><h2>What follows you</h2></div>
          <div className="about-steps">
            <div className="card card--pad about-step">
              <div className="about-step__n">01</div>
              <h3>XP &amp; streak</h3>
              <p className="tiny muted">
                Every quiz, game and chapter you finish adds XP and keeps your streak alive.
              </p>
            </div>
            <div className="card card--pad about-step">
              <div className="about-step__n">02</div>
              <h3>Saved items</h3>
              <p className="tiny muted">
                Bookmarks from chapters and Explore libraries travel with your account.
              </p>
            </div>
            <div className="card card--pad about-step">
              <div className="about-step__n">03</div>
              <h3>Nothing overwritten</h3>
              <p className="tiny muted">
                On first sign-in your device history is merged with the cloud copy — the better record wins.
              </p>
            </div>
          </div>
        </>
      )}

      {stats && (
        <>
          <div className="section-head">
            <h2>Site usage</h2>
            <button className="btn btn--ghost btn--sm" onClick={() => void fetchStats().then(setStats)}>
              <Icon name="RotateCcw" size={14} /> Refresh
            </button>
          </div>
          <div className="stats">
            <div className="stat"><b>{stats.visitors.toLocaleString()}</b><span>Unique learners</span></div>
            <div className="stat"><b>{stats.today.toLocaleString()}</b><span>Today</span></div>
            <div className="stat"><b>{stats.views.toLocaleString()}</b><span>Page views</span></div>
            <div className="stat"><b>{stats.recent.toLocaleString()}</b><span>Views · 28 days</span></div>
          </div>
          <p className="tiny muted" style={{ marginTop: 8 }}>
            Counts are anonymous — one random device id per day, no names or emails.
          </p>
        </>
      )}

      <div className="section-head">
        <h2>On this device right now</h2>
        <Link to="/progress">Full progress <Icon name="ChevronRight" size={14} /></Link>
      </div>
      <div className="stats">
        <div className="stat"><b>{lvl.level}</b><span>Level</span></div>
        <div className="stat"><b>{state.xp}</b><span>XP</span></div>
        <div className="stat"><b>{streak}</b><span>Day streak</span></div>
        <div className="stat"><b>{state.bookmarks.length}</b><span>Saved</span></div>
      </div>

      <p className="tiny muted" style={{ marginTop: 20 }}>
        {BRAND.name} uses Google only to identify your account. Your study data lives in your own private database.
      </p>
    </div>
  );
}
