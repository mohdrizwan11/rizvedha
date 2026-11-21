import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Icon } from "./Icon";

/**
 * Google sign-in chip. When Supabase is not configured yet it still points
 * to the Account page, so sign-in is always discoverable — never a dead button.
 */
export function AccountChip({ collapsed }: { collapsed?: boolean }) {
  const { enabled, status, user, syncing, lastSync, error, signIn, signOut } = useAuth();

  if (!enabled) {
    return (
      <Link
        to="/account"
        className={`account account--signin${collapsed ? " account--mini" : ""}`}
        title="Account & sign in"
      >
        <Icon name="UserCog" size={17} />
        {!collapsed && <span>Account & sign in</span>}
      </Link>
    );
  }

  if (status === "loading") {
    return (
      <div className="account account--quiet" aria-busy="true">
        <span className="account__dot" />
        {!collapsed && <span className="tiny muted">Checking account…</span>}
      </div>
    );
  }

  if (status !== "in" || !user) {
    return (
      <button
        className={`account account--signin${collapsed ? " account--mini" : ""}`}
        onClick={() => void signIn()}
        title={error || "Sign in with Google"}
      >
        <Icon name="LogIn" size={17} />
        {!collapsed && <span>Sign in with Google</span>}
      </button>
    );
  }

  const sim = syncing ? "Saving…" : lastSync ? "Synced" : "Ready";

  return (
    <div className={`account account--in${collapsed ? " account--mini" : ""}`} title={`${user.email} · ${sim}`}>
      {user.avatar ? (
        <img className="account__avatar" src={user.avatar} alt="" referrerPolicy="no-referrer" />
      ) : (
        <span className="account__avatar account__avatar--letter">{user.name.slice(0, 1).toUpperCase()}</span>
      )}
      {!collapsed && (
        <span className="account__meta">
          <b>{user.name}</b>
          <em>
            <i className={`account__sync${syncing ? " is-busy" : ""}`} /> {sim}
          </em>
        </span>
      )}
      {!collapsed && (
        <button className="iconbtn iconbtn--quiet account__out" onClick={() => void signOut()} title="Sign out" aria-label="Sign out">
          <Icon name="LogOut" size={15} />
        </button>
      )}
    </div>
  );
}
