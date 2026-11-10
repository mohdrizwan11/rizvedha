# Kosha — Version 2 learning starter

Kosha is an original, local-first SSC static-GK learning application, based on the supplied **GS Syllabus.pdf**. Current affairs is excluded. Version 2 extends the existing React/Vite app; it is **not** a completed full-syllabus or production release.

## Run, test, and deploy

Requires Node.js 20.19+ (or a version supported by Vite 8).

```sh
npm ci
npm run dev -- --port 5173
npm run validate
npm test
npm run build
npm run preview
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for a comprehensive system overview and [tests/README.md](tests/README.md) for the automated test suite.

Deploy `dist` to an HTTPS static host configured to serve `index.html` for SPA routes. Service workers require HTTPS or localhost; after an online visit and service-worker installation, the production app shell and bundled content can be opened offline. Browser installability varies by device/browser. External reference links require a connection. Fonts fall back to local system fonts offline.

## Version 2 changes

- The seven **published starter topics** now use exactly **Learn → Practice → Mistakes**. Learn combines explanatory units, examples, comparisons, recall, source links and interactive components. Harappan sites use a geographic map with approximate markers and an interactive phase timeline; polity has an article explorer and biology has a schematic cell diagram. Other lessons include a selectable concept explanation. These are deliberately limited in scope.
- A configurable topic test allows difficulty, count, timer (including custom), source, exam and optional year selection. Difficulty is set at authoring based on knowledge versus relationship reasoning. Exam and year apply to verified questions only, never to authored questions. Shortfalls are shown explicitly; if zero verified PYQs are available, a clearly labelled mixed-practice option is offered.
- Results include answer review and explanations. Incorrect **and unanswered** questions become persistent mistakes; retries hide the prior answer until an attempt, count attempts and track corrected/unresolved status. The original v1 mistake list is read when no v2 record exists. Test state, expiry deadlines and preferences are stored locally, so an in-progress topic test can be recovered after leaving or reloading. Legacy mixed exam results feed the same mistake records.
- The existing `kosha-progress-v1` key, XP, completions, settings, practice history and revision data are retained. The legacy top-level revision interface has been removed as requested; its stored scheduling records are not deleted but are not exposed in the new flow. Progress is browser-local and can be lost if browser data is cleared. Existing export remains available in settings.
- Seven introductory lessons now contain five or six independently written explanatory units and five authored MCQs each. All questions are **original practice**, not PYQs. There are no verified PYQs, years, shifts, repeated-concept frequencies, or high-difficulty questions in the current bank.

## Coverage and limitations

This build does **not** meet the complete-syllabus acceptance criterion. Most topics listed in the seven subject roadmaps are **not published lessons**; 31 of the 33 tool-directory items remain unbuilt, and the two starter tool entries open their related lessons rather than fully realised, topic-specific games. There is no route-level river map, fully labelled human-body diagram, complete polity explorer, verified PYQ importer/bank, PYQ trend analysis, cloud account/synchronisation, admin CMS, or comprehensive accessibility/security audit. The site markers are approximate; map borders are only for orientation and are not an authoritative political depiction. The cell image is schematic and not to scale.

Educational material is independently authored, linked to references, and **pending independent editorial review**, not represented as fully verified. Do not assume historical patterns guarantee future SSC questions. Do not mistake the syllabus list for covered teaching content. Expand incrementally using source-reviewed content records with stable IDs, traceable citations and verified paper metadata before publishing further coverage or statistical claims.

## Research and attribution

The publicly visible [EduRev course outline](https://edurev.in/courses/38952_General-Awareness-for-SSC-CGL) was used only as a coverage/organisation benchmark; no restricted material was accessed or copied. The seven-subject static scope follows the supplied syllabus, and references are shown in each lesson. Examples include [NCERT: Bricks, Beads and Bones](https://ncert.nic.in/textbook/pdf/lehs101.pdf), [UNESCO: Dholavira](https://whc.unesco.org/en/list/1645/), [ePathshala: The Fundamental Unit of Life](https://epathshala.nic.in/topicc.php?id=0964CH05), and the [Legislative Department's Constitution](https://legislative.gov.in/constitution-of-india/). Map geometry uses [Natural Earth](https://www.naturalearthdata.com/) via the `world-atlas` npm package (public domain); approximate site points are independently supplied. React and Vite are MIT, Lucide is ISC; see dependencies for their licences. Google Fonts are used when available, with fallback. No SSC Focus assets or proprietary lessons are included.

## Code and testing

- `src/data.js`: original v1 seed content and topic roadmaps.
- `src/v2/content.js`: expanded units and authored questions, reference-linked and review-pending.
- `src/v2/Topic.jsx`: consolidated topic flow, persisted sessions and mistakes.
- `src/v2/Visual.jsx`: interactive educational visualisations.
- `src/main.jsx`: existing application shell, navigation, local state and exam.
- `src/style.css`, `src/v2/style.css`: preserved visual system and v2 additions.
- `public/sw.js`, manifest and icons: PWA shell.
- `tests/`: Automated unit and browser test suites. See [tests/README.md](tests/README.md) for details.
- `docs/`: Specs, progress notes, and batch reports. See [docs/README.md](docs/README.md).
- `resources/`: Syllabus PDFs, clean datasets, and reference apps. See [resources/README.md](resources/README.md).

## V2.2 incremental architecture update

India Basics (36 principal-capital entries) and Rivers (six origin-state entries) are the first entry-based modules. The original V2 lessons and progress remain available; the river starter lesson is linked from the new Rivers tool. The new Learn cards, collapsible exam-note tables and original map-practice questions derive from each module's single `src/v22/datasets/*.json` entry collection. The map question asks for a river's **origin state**, not its full course, and no river-route geometry is claimed. English/Hindi entry names and notes are available. State and entry accuracy, weak outlines and a 24-hour → 3-day → 7-day review queue are saved under `v22` in the existing browser progress object. A V1/V2 mistakes list still exists separately; it is not automatically treated as an entry-based review.

`npm run validate` uses Zod to check every entry-based topic file; the production `npm run build` invokes it first, including required source URLs and ISO `last_verified` dates. This does **not** yet cover legacy V2 lessons or the remaining tool roadmaps. See [docs/reports/MAP-DATA.md](docs/reports/MAP-DATA.md) for map origin, licence and transformations; see [docs/reports/MANUAL-VERIFICATION.md](docs/reports/MANUAL-VERIFICATION.md) for every item awaiting manual review. Names and facts need independent review. The SOI-derived, simplified map requires verification against current SOI standards; it must not be represented as a certified official map.

The map is rendered with TopoJSON, d3-geo and React SVG, with d3-zoom controls, keyboard interaction and a dropdown alternative. The additional five-to-six-topic batches and a verified PYQ layer are **not yet built**. No exam years, shifts, frequencies or PYQs have been invented. See [tests/README.md](tests/README.md) for the browser smoke test suite.

## Batch 1 checkpoint (supersedes older V2.2 counts)

India Basics now contains 64 *unverified* entries: 28 state-capital associations, 8 UT-capital associations, 3 additional seasonal/second-capital entries and 25 High Courts. The capital association is not a distinct-city count. The complete one-source review queue and current limitations are recorded in [docs/reports/BATCH-1-REPORT.md](docs/reports/BATCH-1-REPORT.md); no claim is made that this is a complete syllabus or a publishable fact set. Source retrieval is not independent verification. In the India Basics records `last_verified` is null pending two-source review; `retrieved_on` records source retrieval.

The hub adds tool search and saved bookmarks, and India Basics adds state-centred categorical map markers, regional filters and original map/MCQ session controls. Map and each topic dataset are loaded separately on demand. An additive `mistakeIndex` normalizes old lesson and entry review records but is currently a compatibility mirror; the old stores are still in use, not a completed single-store migration. The coverage screen is only a partial group outline pending restoration of the user's exact pasted individual topics; Current Affairs is excluded. See the report for limitations, source failures, tests, build sizes, and manual checks.

## V3 session-start instructions

At the start of work, read `docs/PROJECT_SPEC.md` and `docs/V3_TEXTBOOK_SPEC.md` in full before changing the project. The user provided the project spec in chat; it is saved in `docs/PROJECT_SPEC.md` alongside the V3 prompt. Do not substitute the PDF. Preserve existing functionality and data, exclude Current Affairs, and stop at the requested batch checkpoints.
