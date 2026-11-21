import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Icon } from "./Icon";

const LINKS = [
  { to: "/progress", label: "Progress", icon: "Activity" },
  { to: "/bookmarks", label: "Saved", icon: "Bookmark" },
  { to: "/account", label: "Account", icon: "UserCog" },
  { to: "/about", label: "About", icon: "Info" },
];

/** Circular account button + "You" dropdown, shared by every screen size. */
export function ProfileMenu() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const signedIn = auth.status === "in" && !!auth.user;
  const name = signedIn ? auth.user!.name : "Welcome, guest";

  return (
    <div className="profile" ref={box}>
      <button
        className={`profile__trigger${signedIn ? " is-in" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Your account menu"
        title={signedIn ? auth.user!.email : "You"}
      >
        {signedIn && auth.user!.avatar ? (
          <img src={auth.user!.avatar} alt="" referrerPolicy="no-referrer" />
        ) : (
          <Icon name={signedIn ? "UserRound" : "UserCog"} size={18} />
        )}
      </button>

      {open && (
        <div className="profile__card" role="menu" aria-label="Your account">
          <div className="profile__head">
            <div className="profile__badge">
              {signedIn && auth.user!.avatar ? (
                <img src={auth.user!.avatar} alt="" referrerPolicy="no-referrer" />
              ) : (
                <Icon name="UserRound" size={20} />
              )}
            </div>
            <div className="stack" style={{ gap: 2, minWidth: 0 }}>
              <div className="eyebrow">You</div>
              <b className="profile__name">{name}</b>
              <span className="tiny muted">
                {signedIn ? auth.user!.email : "Sign in to carry your progress everywhere"}
              </span>
            </div>
          </div>

          <div className="profile__links">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} role="menuitem" onClick={() => setOpen(false)}>
                <Icon name={l.icon} size={16} /> {l.label}
                <Icon name="ChevronRight" size={13} className="profile__chev" />
              </Link>
            ))}
          </div>

          <div className="profile__foot">
            {auth.enabled && !signedIn && (
              <button className="btn btn--accent btn--sm" onClick={() => void auth.signIn()}>
                <Icon name="LogIn" size={15} /> Sign in with Google
              </button>
            )}
            {signedIn && (
              <button className="btn btn--soft btn--sm" onClick={() => void auth.signOut()}>
                <Icon name="LogOut" size={15} /> Sign out
              </button>
            )}
            {!auth.enabled && (
              <Link to="/account" className="profile__cta" onClick={() => setOpen(false)}>
                Account &amp; sign in <Icon name="ChevronRight" size={14} />
              </Link>
            )}
          </div>

          {auth.error && <p className="tiny profile__error">{auth.error}</p>}
        </div>
      )}
    </div>
  );
}
