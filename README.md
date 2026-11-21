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

## What is inside

| Area | Route | What it does |
| --- | --- | --- |
| Home | `/` | streak, XP, subject progress, visual strip, quick play |
| Learn | `/learn` | full syllabus grouped by module, section progress |
| Chapter | `/learn/:id` | Read · Flashcards · Practice, reveal mode, prev/next |
| Visual lab | `/visuals` | 12 tap-to-learn SVG diagrams with one-line facts |
| Explore | `/explore` | 33 static-GK libraries with browse, map, notes and quiz |
| Games | `/games` | Rapid Fire, Fact or Bluff, Match, Sprint |
| Progress | `/progress` | 53-week contribution grid, LeetCode-style counters, subject mastery |
| Account | `/account` | Google sign-in, what syncs, current local record |
| Search | `/search` | full-text search over every extracted fact |
| About | `/about` | the book behind the app, how it is made, support links |

### Shell

- **Light theme by default**, sun/moon toggle, choice remembered per device.
  The saved theme is applied before React mounts, so there is no white flash.
- **Collapsible sidebar**: desktop collapses to an icon rail (remembered);
  phones use the six-tab bottom bar, with the same pages in the profile menu.
- **Top-right account circle** on every screen: a "You" dropdown with Progress,
  Saved, Account and About, plus full-screen, theme and search buttons beside it.
  The sidebar holds only the Study links.
- **Google sign-in** (optional) with per-user progress that merges, never
  overwrites: XP, days, chapters, bookmarks and quiz counts are unioned.
- **Anonymous usage counts** — one random device id per day, aggregate totals
  on the Account page once a database is connected.
- **Footer** with the project story, GitHub star, feedback, contact and the
  build's real numbers.

Everything is responsive: a 6-tab bottom bar on phones, a sticky rail on
laptops, fluid type and no horizontal overflow at 320–1440 px. Diagrams keep a
560 px canvas on small screens and pan sideways instead of shrinking labels to
nothing.

## Stack

Vite 8 · React 19 · TypeScript · React Router 7 · lucide-react · d3-geo +
topojson-client for the India map · `@supabase/supabase-js` (lazy-loaded, auth
only). Styling is a hand-written design system in `src/index.css`
(paper/ink palette, Fraunces + Plus Jakarta Sans + Caveat).

The Supabase SDK is only imported when both env keys exist, so a local-only
build ships none of it.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview
```

## Supabase setup — establish these things (all optional)

> A slower, click-by-click version with what-you-should-see notes and a
> troubleshooting table is in **[`SUPABASE-SETUP.md`](./SUPABASE-SETUP.md)**.
> This section is the short version.

The app works perfectly with **no backend**: local progress, games, bookmarks
and visuals all run from your browser's storage. Supabase only adds (a) Google
sign-in with progress that follows a learner across devices, and (b) anonymous
site-usage counts so you can see how many people are using the site. Nothing
below is needed to study.

### 1. Create the project
1. Sign in at [supabase.com](https://supabase.com) and **New project**.
2. Pick a name, a database password, and a region close to your users.
3. Wait until the project status reads **Active**.

### 2. Get the two keys
**Project Settings → API**. Copy:
- **Project URL** → `https://<project-ref>.supabase.co`
- **anon public** key (the anon key, *not* the `service_role` key) — this one is
  safe to ship in the browser.

### 3. Create the tables and functions
**SQL Editor → New query**, paste the **entire** contents of `supabase/schema.sql`
and click **Run**. This creates, all in one go:
- `public.progress` — one private row per learner, with row-level security so a
  user can only read/write their own row.
- `public.site_daily` + `public.site_hits` — anonymous usage rows (no policies;
  reachable only through the two functions below).
- `rv_hit()` / `rv_stats()` — record a device-day/link-view and return aggregate
  totals. No name, email or IP is ever stored.

You should see "Success. No rows returned". It is safe to re-run — every
statement uses `if not exists` / `create or replace`. Until this step is done,
the app still works but the browser console shows harmless `404` errors for
`rv_hit` / `rv_stats` and the Site usage card stays hidden.

### 4. Enable Google sign-in
1. **Google Cloud Console → APIs & Services → OAuth consent screen**: choose
   **External**, fill the app name (e.g. "Riz Vedha"), add your support email and
   test users while testing, and save.
2. **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   application type **Web application**, name it anything.
3. Under **Authorised redirect URIs** add exactly:
   ```
   https://<project-ref>.supabase.co/auth/v1/callback
   ```
   Copy the **Client ID** and **Client secret**.
4. Back in Supabase: **Authentication → Providers → Google**, enable it, and
   paste that Client ID + secret. Save.

### 5. Tell Supabase where your site lives
**Authentication → URL Configuration**:
- **Site URL** = your real address, e.g. `https://rizvedha.vercel.app`
- **Redirect URLs** = add both
  `https://rizvedha.vercel.app/**` and `http://localhost:5173/**`
  (use `:5199/**` too if you use that dev port).

### 6. Put the keys in the app
Copy `.env.example` to `.env.local` in the project root and fill in:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxx
```

`VITE_SUPABASE_ANON_KEY` is also accepted for older projects. **This is a Vite
app — `NEXT_PUBLIC_*` variables and `utils/supabase/server.ts` / middleware are
for Next.js and do not apply here.** Only variables starting with `VITE_` are
exposed to the browser.

Then restart `npm run dev`. The top-right circle's **You** menu now offers
**Sign in with Google**, and sign-out once you're in.

On deployment add the same two variables in **Vercel → Project → Settings →
Environment Variables** and redeploy.

### 7. Where to see it
- **Account** page (`/account`, reachable from the top-right circle → You →
  Account): sign in/out, what follows you, and a **Site usage** card with unique
  learners, today, page views and 28-day views.
- **Progress** page: your own XP, streak and chapters.

Without keys, `/account` simply says sign-in isn't available on this build and
the app stays fully local — no dead sign-in button anywhere.

Merge rule: on sign-in the device's state and the account's state are combined
per field — max XP, max XP per day, union of read sections and bookmarks, max
game bests. Nothing earned on either side is dropped.

## Before you go live

`src/config.ts` is the single place for names and links, and it is already filled
in for this build:

| Field | Current value |
| --- | --- |
| `BRAND.author` | Mohammad Rizwan |
| `LINKS.github` | https://github.com/mohdrizwan11/rizvedha |
| `LINKS.feedback` | `mailto:kotnurumohammadrizwan@gmail.com` |
| `LINKS.support` | `mailto:kotnurumohammadrizwan@gmail.com` |
| `LINKS.site` | `https://rizvedha.vercel.app` (until a custom domain exists) |

Also check `BRAND` (name, mark, tagline) and `ABOUT.body` (the credit to Parmar
Sir) in the same file, and update the OG/meta copy in `index.html`.

## Deploy

`vercel.json` already adds the SPA rewrite, so any static host works. On
Vercel: framework **Vite**, build `npm run build`, output `dist`.

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
