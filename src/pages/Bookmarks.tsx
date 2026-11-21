import { Link } from "react-router-dom";
import { chapterById } from "../data/curriculum";
import { explorerBySlug } from "../data/explorers";
import { useStore } from "../lib/store";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/Layout";

export default function Bookmarks() {
  const { state, toggleBookmark } = useStore();
  const chapters = state.bookmarks.map(chapterById).filter(Boolean) as NonNullable<ReturnType<typeof chapterById>>[];
  const libs = state.bookmarks.filter((b) => b.startsWith("explore:")).map((b) => explorerBySlug(b.replace("explore:", ""))).filter(Boolean);

  return (
    <div className="page page--narrow">
      <PageHead eyebrow="Saved" title="Your revision shelf" sub="Chapters and libraries you pinned. Perfect for the last week before the exam." />

      {!state.bookmarks.length && (
        <div className="empty card card--pad">
          <Icon name="Bookmark" />
          <b>Nothing saved yet</b>
          <span className="sub">Tap “Save” on any chapter or library to pin it here.</span>
          <Link className="btn btn--accent btn--sm" to="/learn">Browse the syllabus</Link>
        </div>
      )}

      {chapters.length > 0 && (
        <>
          <div className="section-head"><h2>Chapters</h2></div>
          <div className="chapter-grid">
            {chapters.map((c) => (
              <div key={c.id} className="chapter-card" style={{ ["--accent" as any]: c.accent }}>
                <div className="chapter-card__top">
                  <div className="chapter-card__num">{String(c.num).padStart(2, "0")}</div>
                  <button className="chip" onClick={() => toggleBookmark(c.id)} aria-label="Remove"><Icon name="X" /></button>
                </div>
                <Link to={`/learn/${c.id}`}><h3>{c.title}</h3></Link>
                <div className="chapter-card__meta"><span>{c.moduleTitle}</span></div>
              </div>
            ))}
          </div>
        </>
      )}

      {libs.length > 0 && (
        <>
          <div className="section-head"><h2>Libraries</h2></div>
          <div className="explore-grid">
            {libs.map((l) => (
              <div key={l!.slug} className="explore-card" style={{ ["--accent" as any]: l!.accent, ["--accent-soft" as any]: `color-mix(in srgb, ${l!.accent} 12%, white)`, ["--accent-ink" as any]: `color-mix(in srgb, ${l!.accent} 74%, black)` }}>
                <div className="explore-card__icon"><Icon name={l!.icon} /></div>
                <Link to={`/explore/${l!.slug}`}><h3>{l!.title}</h3></Link>
                <p>{l!.desc}</p>
                <div className="explore-card__foot">
                  <span className="explore-card__count">{l!.count} entries</span>
                  <button className="chip" onClick={() => toggleBookmark(`explore:${l!.slug}`)}><Icon name="X" /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
