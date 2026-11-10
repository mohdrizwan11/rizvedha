# Sprint alpha — honest status

## Blocker: the requested data-only tool expansion

No new tool is marked completed. The existing `src/v22/ToolApp.jsx` is not a generic entry/question engine: it hard-codes India Basics or Rivers dataset loading, state/UT map codes and prompts asking for a capital's state or a river's origin. Freedom Movement, Battles & Treaties and the other requested subject tools cannot be made functional merely by supplying India Basics-shaped data; doing so would yield incorrect questions or meaningless map interactions. The user's sprint instruction forbids new engine code except to repair a bug, so that architecture change was not made. The hub continues to show unfinished tools as roadmap entries. This is the reason Task 1 is blocked, not a claim that the requested 12 datasets were completed.

## Content delivered

Two of the requested 10 compact chapter drafts were added to the existing chapter engine: **Fundamental Rights & DPSP** and **RBI, Banking & Monetary Policy**. Each has eight explanatory fact cards and eight original MCQs, explanations, a comparison, memory hook, often-confused note, sources and a related-tool link. Coverage displays these two as `drafted`; the other eight requested compact chapters remain unwritten. The linked Quick Facts tool is still a roadmap entry, not a finished tool. The old Mauryan and Rivers pilots remain available but are not counted as new sprint chapters.

The 28 chapter fact cards in the app comprise 24 Gold, 4 Silver and 0 Bronze. This count covers chapter cards only, not old map dataset entries or comparison rows. Four comparison rows in the earlier pilots are separately marked Bronze; the six new compact comparison rows cite the same official basis as their chapters and are labelled Gold. Older map-tool data remains unreviewed under the new grading instructions and still displays its legacy verification wording; do not interpret these chapter counts as an audit of all app content. Zero verified PYQs were added.

Evidence fetched on 2026-11-09: the official [Constitution of India](https://www.legislative.gov.in/static/uploads/2025/07/c9fe9c9b6840524844316f74bb1c556c.pdf), read in page chunks including PDF pages 37, 40, 42, 50, 52 and 53 for the rights/DPSP claims; the [RBI Monetary Policy Overview](https://www.rbi.org.in/scripts/FS_Overview.aspx?fn=2752), chunks 0–1 for monetary-policy terms. The four pre-existing one-source Mauryan cards were regraded Silver, using the previously fetched Britannica source. Constitution Education Amendment 86 was also fetched. The Know India Fundamental Rights page and its Directive Principles page failed; a Ministry of Culture intangible heritage page returned HTTP 500. NCERT physiography and medieval chapters, WHO anaemia, and the budget overview were retrieved for research, but no additional sprint chapters or datasets based on those sources were shipped.

## Engineering and testing

- `latest` dependency entries are pinned to the installed versions, and `npm ci && npm run build` passed. Other existing semver ranges were not changed; the lockfile fixes their installed versions.
- Service worker bumped to `kosha-v10`; successful network responses are cached before the response is returned, and a failed cache write does not prevent online use. Mobile menu now includes Coverage.
- Passed `v3-storage-test.mjs`, `batch1-journey.cjs`, `v2-test.cjs`, `v2-more-tests.cjs`, `v22-test.cjs`, `v22-schedule-test.cjs`, `v3-toc-test.cjs`, `batch2-infra-test.cjs`, `batch2-pilot-test.cjs`, `batch2-reverse-test.cjs`, and `sprint-alpha-test.cjs`. The last verifies both new eight-question chapters, mobile navigation and offline reopening of a previously visited chapter in simulated mobile Chromium. Actual phone installation and real hosting remain untested.
- The map licence and official-boundary issue remains a **private-use release blocker**. An unshared Netlify URL is publicly reachable, not private access control. See `ALPHA-DEPLOY.md` for exact steps and cautions.

## Still not done

All twelve requested data-only tool expansions; eight of ten requested compact chapters; comprehensive application-wide trust regrading; physical-phone PWA installation test. The user froze fog-of-war, image occlusion, mastery-ring/XP refactors, full 2-HP/scheduler migration, the line-by-line syllabus audit, the formal Batch 2 report and PYQ ingestion; those were not undertaken. Existing legacy review behaviour and existing non-retrieval completion XP remain as before.
