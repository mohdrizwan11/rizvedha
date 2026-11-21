import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../lib/auth";
import { BRAND } from "../config";
import { Icon } from "./Icon";

/**
 * One-time sign-in reminder, shown ten seconds into a visit.
 * Only appears when Google sign-in actually works, only for signed-out
 * visitors, and never again once dismissed on this device.
 */
const NUDGE_KEY = "rv:nudge";

function alreadySeen(): boolean {
  try {
    return localStorage.getItem(NUDGE_KEY) === "1";
  } catch {
    return true;
  }
}

function markSeen(): void {
  try {
    localStorage.setItem(NUDGE_KEY, "1");
  } catch {
    /* private mode — the reminder simply behaves like a one-per-load dialog */
  }
}

export function SignInNudge() {
  const { enabled, status, signIn } = useAuth();
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    markSeen();
    setOpen(false);
  }, []);

  /* start the ten-second clock once auth has settled */
  useEffect(() => {
    if (!enabled || status !== "anon" || alreadySeen()) return;
    const t = window.setTimeout(() => {
      /* the account page already explains sign-in — do not interrupt it */
      if (window.location.pathname.startsWith("/account")) {
        markSeen();
        return;
      }
      setOpen(true);
    }, 10_000);
    return () => window.clearTimeout(t);
  }, [enabled, status]);

  /* focus, escape, tab trap, scroll lock */
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => firstBtnRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const card = cardRef.current;
      if (!card) return;
      const items = Array.from(
        card.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.classList.add("is-locked");
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
      lastFocus.current?.focus?.();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="nudge"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nudge-title"
      aria-describedby="nudge-body"
    >
      <button className="nudge__scrim" type="button" tabIndex={-1} aria-hidden="true" onClick={close} />
      <div className="nudge__card" ref={cardRef}>
        <button className="nudge__x" type="button" onClick={close} aria-label="Close">
          <Icon name="X" size={16} />
        </button>

        <div className="nudge__mark" aria-hidden="true">
          {BRAND.mark}
        </div>
        <div className="eyebrow eyebrow--accent">Optional · 5 seconds</div>
        <h2 className="nudge__title" id="nudge-title">
          Keep your progress safe
        </h2>
        <p className="nudge__body" id="nudge-body">
          Create a free account with Google and your streak, XP and saved cards follow you to
          every device — phone, laptop, anywhere.
        </p>

        <ul className="nudge__points">
          <li>
            <Icon name="ShieldCheck" size={15} /> No password to remember
          </li>
          <li>
            <Icon name="Layers" size={15} /> Your device record is merged, never replaced
          </li>
          <li>
            <Icon name="Flame" size={15} /> Keep the streak when you switch devices
          </li>
        </ul>

        <div className="nudge__actions">
          <button
            ref={firstBtnRef}
            type="button"
            className="btn btn--accent nudge__go"
            onClick={() => {
              markSeen();
              setOpen(false);
              void signIn();
            }}
          >
            <Icon name="LogIn" size={16} /> Continue with Google
          </button>
          <button type="button" className="btn btn--ghost" onClick={close}>
            Not now
          </button>
        </div>

        <p className="nudge__fine">
          Already saved on this device. An account only adds a backup.
        </p>
      </div>
    </div>
  );
}
