# Riz Vedha — the visual GS library for SSC CGL

A picture-first General Studies library built from the **Parmar SSC Fatman
GK/GS** theory book (English, 2nd edition) plus the static-GK "GK games" set.
With respectful thanks to Parmar Sir: his book is the source of every chapter,
fact and page reference in this app.

**121 chapters · 15,900+ extracted facts · 33 Explore libraries · 741 quiz
questions · 12 hand-drawn diagrams · 4 games.**

Built and maintained by **Mohammad Rizwan** ·
[kotnurumohammadrizwan@gmail.com](mailto:kotnurumohammadrizwan@gmail.com) ·
[github.com/mohdrizwan11/rizvedha](https://github.com/mohdrizwan11/rizvedha)

---

## Just open it and study

There is nothing to install, no account to create and no setup screen. Anyone can
use the whole library immediately.

- **Progress saves itself.** Streaks, XP, read sections, bookmarks and game bests
  are written to the browser the moment you earn them.
- **An account is optional.** Sign in with Google only if you want that same
  record to follow you to another phone or laptop. The first sign-in merges the
  device record with the account record — nothing is overwritten.
- **Counts are anonymous.** The site counts one random device per day to show how
  many learners are using it. No names, emails or IP addresses are stored.

## What is inside

| Area | Route | What it does |
| --- | --- | --- |
| Home | `/` | streak, XP, subject progress, visual strip, quick play |
| Learn | `/learn` | full syllabus grouped by module, section progress |
| Chapter | `/learn/:id` | Read · Flashcards · Practice, reveal mode, prev/next |
| Visual lab | `/visuals` | 12 tap-to-learn SVG diagrams with one-line facts |
| Explore | `/explore` | 33 static-GK libraries with browse, map, notes and quiz |
| Games | `/games` | Rapid Fire, Fact or Bluff, Match, Sprint |
| Progress | `/progress` | 53-week contribution grid, counters, subject mastery |
| Account | `/account` | optional Google sign-in, what follows you, site usage |
| Search | `/search` | full-text search over every extracted fact |
| About | `/about` | the book behind the app, how it is made, support links |

### Shell

- **Light theme by default**, sun/moon toggle, choice remembered per device. The
  saved theme is applied before React mounts, so there is no white flash.
- **Collapsible sidebar** on laptops; a six-tab bottom bar on phones. The
  top-right circle holds Progress, Saved, Account and About on every screen.
- **Command palette** with `Ctrl/⌘ + K`, plus a visible search pill on desktop.
- **Accessible by default**: keyboard focus rings, reduced-motion support,
  labelled controls, and no horizontal overflow from 320 to 1440 px.

## Stack

Vite 8 · React 19 · TypeScript · React Router 7 · lucide-react · d3-geo +
topojson-client for the India map · `@supabase/supabase-js` for optional Google
sign-in and anonymous usage counts. Styling is a hand-written design system in
`src/index.css` (paper/ink palette, Fraunces + Plus Jakarta Sans + Caveat).

The Supabase SDK is lazy-loaded, so the app opens instantly and a local-only
build ships none of it.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview
```

## Deploy

The build is a static bundle, so any host works. On **Vercel**: import the repo,
framework **Vite**, build `npm run build`, output `dist`. `vercel.json` already
adds the SPA rewrite and asset caching.

The hosted site needs no visitor setup. Backend keys, Google sign-in and usage
counts are maintainer concerns and live entirely in
[`OWNER-SETUP.md`](./OWNER-SETUP.md). Without them the site still works — it just
skips sign-in and counts.

## Project layout

| Path | What lives there |
| --- | --- |
| `src/pages` | one file per screen (Home, Learn, Explore, Games, …) |
| `src/components` | shell, command palette, diagrams, quiz, account menu |
| `src/data` | curriculum, chapter JSON, datasets, search index |
| `src/lib` | store, theme, optional auth and anonymous counts |
| `supabase/schema.sql` | the database definition (owner setup) |
| `_work` | OCR pipeline, excluded from git |

## Content pipeline

The book is a scanned PDF, so content is produced by a deterministic OCR
pipeline — no generated text is inserted into chapters.

```
PDF ──► _work/ocr_tsv.py ──► _work/ocr2/page_NNN.txt
        (Tesseract 5, 300 DPI, TSV word boxes,
         reading order rebuilt: header → left column →
         right column → footer)
                              │
_work/curriculum.py ─────────►│ _work/extract.py ──► src/data/chapters/*.json
  chapter titles + printed    │                     src/data/search.json
  page ranges per module      │
                              └─► _work/gen_curriculum.py ──► src/data/curriculum.ts
```

Page mapping: printed book page → PDF page uses a per-module offset, measured
from the folios detected in the OCR (`geography +6 … static-gk +29`), because
each module opens with divider pages.

Re-running everything (Tesseract must be on `PATH`):

```bash
python _work/ocr_tsv.py      # ~8 min for all 538 pages (column-aware)
python _work/extract.py      # writes chapter JSON + search index
python _work/gen_curriculum.py
```

## Credits

**Honourable mention:** Parmar Sir, author of *Parmar SSC Fatman GK/GS*
(English, 2nd ed., 2026). Every chapter, fact and page reference in this app is
adapted from his work for personal study. Libraries and question sets follow
the SSC Focus GK-game taxonomy. Diagrams, UI and code are original to Riz
Vedha. Not affiliated with the Staff Selection Commission or the book's
publishers.
