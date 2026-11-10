# Progress — V3.1 / Batch 2

## Current checkpoint — Batch 2 incomplete

Read `PROJECT_SPEC.md`, `V3_TEXTBOOK_SPEC.md`, and `V3_1_PYQ_ENGINE.md` at the start of each session. The approved TOC is not another approval gate. Resume Batch 2; do not start Batch 3 or Batch 2.5 until the specified gate. See `reports/BATCH-2-INTERIM.md` for exact results and outstanding work; it is not the final Batch 2 report.

## Done

- Approved outline: 7 subjects, 84 chapters, 387 proposed topics; guidance-based weights; 33/33 reverse tool-to-outline navigation journeys browser-tested, including Dance. A full item-by-item syllabus audit is still needed.
- `src/v3/mistakes.js` introduces versioned canonical records, one-time legacy backup, projections and reconciliation in `src/main.jsx`. Representative migration tests pass, but mixed conflicting records still need tests.
- `src/v3/scheduler.js` has tested delayed 1/3/7/21-day logic. New draft flashcards use it, but legacy lesson and map-tool reviews/due counts still use their old logic. Do not call integration complete.
- v22 active practice sessions persist and restore selected item, feedback and deadline. Timed reload tested; tab switching, expiry and feedback restoration need explicit tests.
- Map rights/official boundary release blocker displayed in Coverage; private work may continue.
- `src/v3/pilots.js`, `Textbook.jsx` and `textbook.css` add two small data-driven drafts, not full-depth pilots. Open via Coverage; 12 fact cards total, 8 Gold and 4 unverified, 0 verified PYQs. Original practice, persisted chapter boss, label-recall cards and chapter-specific 2-HP retry interactions exist. The selector is not fog-of-war or image occlusion. Prior lessons and tool design remain.
- Build, previous regressions and `tests/e2e/batch2-pilot.test.cjs` / `tests/e2e/batch2-reverse.test.cjs` pass. SW cache bumped to `kosha-v9`. Preview previously started on port 5173; restart if needed.

## Next — in order

1. Finish canonical scheduler and 2-HP integration into old lessons/tools, due counts and daily interleaved recall without losing data. Test mixed-version conflicts and existing sessions; explicitly test tab changes, expiry, feedback and reconciliation.
2. Complete chapter engine, **real image occlusion** and fog-of-war, mastery rings, retrieval-only XP and other V3 requirements; existing completion still grants XP. Preserve prior progress and preferences.
3. Research and write full-depth Mauryan and Rivers pilots with individual evidence/grade, actual approximate sourced historical map and properly licensed visuals. Verify all pilot claims and responsive full-journey tests. Current prototypes are far too thin for approval.
4. Complete line-by-line syllabus audit. Run all regressions and produce the requested final Batch 2 report with honest counts, sources, failures, unverified items, image licences, PYQs, bundle size and breakage. Stop after that report, before Batch 3.

## Open problems

- Official Indian boundary depiction and map licence remain a release blocker; current map must remain private.
- Legacy review still uses old scheduling; older lesson completion awards non-retrieval XP. Daily interleaved recall is missing.
- Prototype boss/flashcard journey has basic tests but not exhaustive accessibility or expiry testing. Offline caching doesn't guarantee unvisited lazy chunks.
- Zero genuine verified PYQs. V3.1 supersedes older evidence rules; do not invent evidence, metadata or frequency. No Current Affairs. Respect public source terms and user progress.

## Sprint alpha override — 2026-11-09

The user's sprint explicitly overrides the previous Next list and freezes fog-of-war, image occlusion, mastery/XP refactors, full scheduler/2-HP migration, line-by-line syllabus audit, formal Batch 2 report and PYQ ingestion. No approval gate during the sprint. See `reports/SPRINT-ALPHA-STATUS.md` and `reports/ALPHA-DEPLOY.md` for current results.

Task 1 is blocked by the data-only constraint: existing ToolApp is hard-coded to the two state-map datasets and state answers. None of the 12 requested tools has been falsely marked complete or available. Fix requires permission to generalize the engine, or a different compatible data-only approach.

Two compact chapters are written (Fundamental Rights & DPSP; RBI, Banking & Monetary Policy), both 8 explanation cards and 8 original questions; eight requested chapters still absent. Gold/Silver/Bronze among chapter cards: 24/4/0, including the two older six-card pilots. Four old comparison rows marked Bronze; legacy map-tool verification wording has not been regraded. Zero verified PYQs. Coverage shows the two compact drafts as drafted. Existing Mauryan boss sessions without ID snapshots retain the old Gold-only question order; new sessions snapshot question IDs.

`latest` dependencies pinned, lock updated, clean npm ci/build passed, service worker `kosha-v10`; mobile menu includes Coverage. Complete regression suite and mobile simulated offline visited-chapter test passed; no physical phone or actual remote deployment tested. `reports/ALPHA-DEPLOY.md` documents Netlify steps, public exposure risk and map release blocker. Continue to treat the existing map as private-use only.
