# Batch 2 — interim engineering checkpoint

**Status: incomplete.** This is not the requested Batch 2 completion report or a pilot-approval gate. The preview is for private testing only. The two available chapters are small prototypes, not the requested full-depth pilots. Do not start Batch 3 or Batch 2.5 ingestion on the strength of this checkpoint.

## What changed

- Added a versioned canonical mistake store, a one-time legacy migration backup, compatibility projections, and reconciliation for the existing lesson and map-tool data. Existing progress remains in `kosha-progress-v1`.
- Added and unit-tested a 1/3/7/21-day delayed-recall scheduler. New prototype chapter flashcards use it; old lesson reviews and map-tool reviews do **not** yet use it. Existing tool review tests still exercise the old 1/3/7-day logic.
- Persisted the v22 active practice session, including selected item, feedback and deadline. A timed question surviving a reload has been tested; expiry and feedback restoration need more explicit tests.
- Made the map's unresolved rights and Indian-boundary depiction a visible **release blocker**, while leaving the private preview usable. This warning is not legal clearance.
- Added related-chapter reverse links. Browser navigation has now been exercised for all 33 tool entries, including the Dance starter.
- Added a data-driven early chapter prototype, accessible from Coverage by expanding **Mauryan Empire** or **Rivers of India**. Each provides a concept selector, story cards, compare/cover control, original recall questions, self-rated label-recall flashcards, an original timed boss and chapter-specific 2-HP mistake retries. The boss's deadline and answers are locally persisted.

## Outline and counts

The approved outline currently lists **7 subjects, 84 chapters and 387 proposed lesson topics**: Polity 11/61; Economics 12/62; History 22/90; Geography 13/50; Static GK & Culture 9/41; Science 12/50; Environment 5/33. All 33 tool IDs occur in at least one chapter link, and 33/33 reverse journeys passed a browser test. Weight labels are guidance-based, not collected-paper frequency. The outline includes the specified freedom movement chronology, world and economic geography, selective world history, scheme groups, miscellaneous static GK, organisations/indices and static ISRO/DRDO topics. A line-by-line audit against every requested syllabus item remains outstanding. All outline status values remain `not started`: the two prototypes do not yet constitute drafted full chapters.

## Prototype content, evidence and unverified items

- **Mauryan:** 6 fact cards: 2 Gold, 4 unverified. The unverified claims are Chandragupta as founder around 321 BCE, Pataliputra as centre, Bindusara as successor, and Ashoka's conquest of Kalinga. They have one fetched reference here, not two independently confirmed references. The Arthashastra comparison and the table's rock/pillar comparison are also marked unverified. The prototype is missing a sourced historical extent map, a fuller chronology and the bulk of the syllabus.
- **Rivers:** 6 Gold fact cards, all confined to the Ganga system. The label is not a claim that the whole Rivers of India chapter is complete. Headstreams, Devprayag, Yamuna, Son, the Bay of Bengal outlet and the Gangotri source are supported by both India-WRIS and Britannica. Comparison rows are marked unverified pending a separate evidence audit. No route geometry or complete river systems have been added.
- There are **0 verified PYQs**. All new questions are original practice; bosses include only Gold fact cards. No exam year, shift or frequency is claimed.
- Sourced pages fetched on 9 November 2026: [NCERT State and Society up to 1000 CE](https://ncert.nic.in/textbook/pdf/iest105.pdf) (chunks 1–4 of 7, not a full-PDF audit); [Britannica Mauryan Empire](https://www.britannica.com/place/Mauryan-Empire); [India-WRIS Ganga](https://indiawris.gov.in/wiki/doku.php?id=ganga); [Britannica Ganges](https://www.britannica.com/place/Ganges-River). [UNESCO Sanchi](https://whc.unesco.org/en/list/524/) and [UNESCO Bodh Gaya](https://whc.unesco.org/en/list/1056/) were researched but are not sources for the fact cards.
- Failed fetches: NCERT `lehs102.pdf`, `gees105.pdf`, `kefa103.pdf`, `fess107.pdf`, `fess108.pdf` and `iess103.pdf`; no facts are presented as verified by those pages. Other source failures from prior work remain documented in `BATCH-1-REPORT.md` and `MAP-DATA.md`.

## Images and rights

The prototype uses a simple original in-project SVG illustration; no third-party image was imported for the chapters. The concept selector is **not** a historical map, river map, full fog-of-war engine or image-occlusion implementation. The existing map topology is SOI-derived via Bharatlas; its applicable licence, transformations, official boundary compliance and removed degenerate islands remain unresolved. It must not be released until verified.

## Tests and bundle

Passed: production build and dataset validation (64 India Basics, 6 Rivers entries); `v3-storage-test.mjs`; `batch2-infra-test.cjs`; `batch2-pilot-test.cjs`; `batch2-reverse-test.cjs`; `v3-toc-test.cjs`; `batch1-journey.cjs`; `v2-test.cjs`; `v2-more-tests.cjs`; `v22-test.cjs`; `v22-schedule-test.cjs`. The new pilot journey covers opening both drafts, boss restoration and submission, two retries, and initial flashcard scheduling. It is not an exhaustive full-journey, accessibility or expiry test.

Production JavaScript: **1,645,237 bytes** total across chunks; **572,687 bytes** summed gzip. The lazy map topology is approximately 1,048 kB / 391 kB gzip and triggers Vite's large-chunk warning. Offline caching still does not guarantee unvisited lazy chunks.

## Remaining work / known breakage and gaps

1. Integrate canonical 1/3/7/21 scheduling and 2-correct-retry monsters into **all** existing lesson/tool flows, due counts and daily interleaved recall. Test mixed-version conflicts and preservation. Currently legacy review logic and its due counts remain in use.
2. Extend session restoration tests to tab changes, expired sessions and feedback; verify reconciliation when old and new records conflict. The current migration is tested on representative fixtures, not proven lossless for every possible malformed or mixed dataset.
3. Implement actual image occlusion, fog-of-war, mastery rings, daily review, and remaining V3 gamification; ensure XP is retrieval-only throughout. Existing older lesson completion still awards XP for completion.
4. Research and author the full-depth Mauryan and Rivers pilots, corroborate every marked item, include licensed visuals and an approximate sourced historical map, and test complete responsive/accessibility journeys. The present selector and tiny fact sets are scaffolding only.
5. Perform the remaining full syllabus audit, rerun regressions and issue the requested **final Batch 2 report**, with all provenance, failures, licences, fact and PYQ counts, bundle and breakage. Stop there for pilot review. Do not begin later batches yet.
