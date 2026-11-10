# Batch 1 checkpoint report — 9 November 2026

**Status: partial; not ready for publication. Stop before Batch 2.** The preview remains on port 5173. This report distinguishes working features from unmet acceptance criteria.

## Counts and provenance

| Kind | Entries | Count check |
|---|---:|---|
| State capital association | 28 | National Portal lists 28 states |
| UT capital association | 8 | National Portal lists 8 UTs |
| Summer capital | 1 | Uttarakhand government source; no official total established |
| Second / winter capital | 1 | Himachal Forensic Services source; no official total established |
| Winter capital | 1 | J&K; no official total established |
| High Court | 25 | SCI annexure and DOJ both list 25 courts |
| **Total** | **64** | Entries are not distinct cities; some associations and seasonal entries overlap |

The 36 capital records match the counts of administrative units, not a verified official count of unique capitals. J&K's existing entry combines Srinagar and Jammu and a separate Jammu entry was added. Chandigarh is shared by Punjab and Haryana. Additional seasonal/second capitals are **not exhaustive**: for example, claims about Ladakh's Kargil and Maharashtra's Nagpur need official primary-source review and precise terminology before inclusion. The High Court records enumerate courts, not every bench. The court seats and jurisdictions each need independent corroboration. **There are 0 fully verified India Basics entries and 0 verified PYQs.** Original practice is not PYQ data.

Fetched sources (retrieved 2026-11-09):
- [National Portal holiday directory](https://www.india.gov.in/calendar?date=) lists 28 states and 8 UTs; it does not establish their capitals.
- [Supreme Court jurisdiction annexure](https://www.sci.gov.in/jurisdiction/) lists 25 courts, seats and jurisdictions; some surrounding text may be outdated.
- [Department of Justice list, 1 August 2026](https://www.doj.gov.in/static/uploads/2026/08/02226222524937e24f7a8970f5660afa.pdf) independently lists 25 court names; it does not independently verify their seats.
- [Uttarakhand Chief Minister](https://cm.uk.gov.in/geography/) identifies Gairsain as summer capital.
- [Himachal Forensic Services](https://dfs.hp.gov.in/RFSL-NR-Dharamshala.html) describes Dharamshala as winter capital.
- [GK Time Hindi](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) is a retrieved **non-official** secondary reference for the 36 existing capital associations and J&K winter entry; conflicts and terminology must be checked against authoritative sources. It is not a substitute for two independent sources.
- [Bharatlas](https://bharatlas.com/view/soi_states) describes a Survey of India-derived dataset and lists CC0-1.0 / CC-BY-4.0; actual upstream licence and map compliance are unconfirmed. See `MAP-DATA.md`.

**Failed / unusable:** Know India Goa, Chandigarh and Maharashtra pages, archive.india.gov.in page and J&K Legal Services state page failed to fetch. Uttarakhand assembly page returned 401. The Himachal notification query and MHA police page redirected or returned unrelated home pages, not the requested evidence. These were not cited as successful sources for the facts. The retrieved [Oliveboard list](https://www.oliveboard.in/blog/states-and-capitals-of-india/) contains questionable unrelated date/person claims; it is not used to certify entries. Ganga's earlier India-WRIS fetch is only one source and does not verify all river claims.

## Implemented and tests

- Shared tools hub: search, category chips, local bookmarks, due strip, footer and existing 33 tool cards. Three top-level tabs remain Learn, Practice, Mistakes.
- India Basics: bilingual entry cards, search, kind/region filters, listed/studied count, state/UT SVG atlas, legend, weak-zone outline, keyboard and dropdown; entry-derived notes, map game and original MCQ drill, 10/20/30/50 count, timer and difficulty preferences. State-centred markers identify categories, **not city locations**.
- Legacy and V2.2 progress remain in place. An additive normalized `mistakeIndex` is created on load and updates, preserving prior records; it is a compatibility mirror, **not yet a single canonical store**. Existing lesson and tool review screens still use their original stores.
- Group-level coverage screen for seven subjects, excluding Current Affairs. **The exact detailed pasted syllabus was not available in the restored context**; only its group headings could be recovered. Individual topic rows are missing, so this is not the requested complete syllabus coverage dashboard. Please provide the detailed pasted syllabus again to finish the transcription; no PDF substitution was made.
- `npm run validate`, `npm run build`: **pass**. `batch1-journey.cjs`: **pass** for hub search/bookmark, Atlas state tap, Learn, timed map answer, wrong answer → Mistakes → retry, preservation/index, MCQ and mobile width. `v22-test.cjs`, `v22-schedule-test.cjs`, `v2-test.cjs`, `v2-more-tests.cjs`: **pass**. Older tests were updated for async lazy loading and the new 64-entry count; they are smoke tests, not exhaustive QA.

## Build size

Batch 0 single JS bundle: approximately **1.55 MB / 550 KB gzip**. Batch 1: all JS chunks total **1,600,279 bytes / 557,247 bytes gzip** (all chunks combined; total grew). Initial HTML loads the main and runtime chunks: **approximately 324 KB / 103 KB gzip**. Dataset and map load on demand; the topology chunk remains large at **1,048 KB / 391 KB gzip**, and Vite still warns about >500 KB chunks. Lazy-loaded chunks are only cached for offline use after they have been visited online; first-time offline access to an unvisited topic is not guaranteed. Re-test the production PWA before release.

## Broken, incomplete, or manual checks

1. **India boundary and licence remain unresolved**: simplified derivative removed two quantisation-degenerate island polygons, has disputed polygons and is not certified against the current official depiction. Manual legal/geospatial review is required before publication.
2. **All 64 entries are unverified**; schema prevents promoting any to verified until evidence handling is implemented. Region groupings, all translations, spellings, names, dates, seats, shared jurisdictions and special arrangements require review; some Hindi court notes retain English seat names.
3. Full pasted syllabus transcription, topic-level editorial workflow and its status audit are missing. Dashboard group labels are not complete coverage.
4. Mistake storage is not fully consolidated. Due strip counts only two entry-based tools, not legacy lesson mistakes. Separate old stores remain the source of truth; migration requires a safe backwards-compatible canonical-store design and tests.
5. Seasonal coverage is incomplete; an extra J&K winter entry overlaps its combined UT record. Shared-capital questions are excluded from map mode when marked ambiguous. Court markers are state-centred, not true court coordinates.
6. Tool practice session progress/timer is not restored after reload or switching tabs, though settings and completed attempts persist. Counts are capped to the eligible pool and no exhaustive timer-expiry/reload test has been performed. MCQ distractors are basic and need educational QA.
7. Only India Basics and Rivers share the new tool shell; Dances and V2 lesson topics retain older topic implementation, and the majority of the 33 tools remain roadmapped. No genuine PYQ layer exists.
8. Manual test mobile, keyboard navigation, screen reader labelling, zoom, colour contrast, review scheduling across timezones, offline after cache updates, all question configurations, sources, names and user data migration on real existing profiles. Browser smoke tests passed but cannot replace these checks.

## Complete India Basics verification queue (64 unverified entries)

Each row requires two independent, relevant sources covering the exact association and every displayed detail, plus translations and source currency. `retrieved_on` is not an editorial verification date.

| ID | Entry | Kind | State / UT | Retrieved reference |
|---|---|---|---|---|
| capital-28 | Amaravati | State capital | Andhra Pradesh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-12 | Itanagar | State capital | Arunachal Pradesh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-18 | Dispur | State capital | Assam | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-10 | Patna | State capital | Bihar | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-22 | Raipur | State capital | Chhattisgarh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-30 | Panaji | State capital | Goa | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-24 | Gandhinagar | State capital | Gujarat | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-6 | Chandigarh | State capital | Haryana | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-2 | Shimla | State capital | Himachal Pradesh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-20 | Ranchi | State capital | Jharkhand | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-29 | Bengaluru | State capital | Karnataka | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-32 | Thiruvananthapuram | State capital | Kerala | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-23 | Bhopal | State capital | Madhya Pradesh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-27 | Mumbai | State capital | Maharashtra | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-14 | Imphal | State capital | Manipur | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-17 | Shillong | State capital | Meghalaya | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-15 | Aizawl | State capital | Mizoram | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-13 | Kohima | State capital | Nagaland | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-21 | Bhubaneswar | State capital | Odisha | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-3 | Chandigarh | State capital | Punjab | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-8 | Jaipur | State capital | Rajasthan | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-11 | Gangtok | State capital | Sikkim | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-33 | Chennai | State capital | Tamil Nadu | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-36 | Hyderabad | State capital | Telangana | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-16 | Agartala | State capital | Tripura | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-9 | Lucknow | State capital | Uttar Pradesh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-5 | Dehradun | State capital | Uttarakhand | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-19 | Kolkata | State capital | West Bengal | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-35 | Sri Vijaya Puram | UT capital | Andaman and Nicobar Islands | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-4 | Chandigarh | UT capital | Chandigarh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-38 | Daman | UT capital | Dadra and Nagar Haveli and Daman and Diu | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-7 | New Delhi | UT capital | Delhi | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-1 | Srinagar / Jammu | UT capital | Jammu and Kashmir | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-37 | Leh | UT capital | Ladakh | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-31 | Kavaratti | UT capital | Lakshadweep | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| capital-34 | Puducherry | UT capital | Puducherry | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| additional-5 | Gairsain | Summer capital | Uttarakhand | [Reference](https://cm.uk.gov.in/geography/) |
| additional-2 | Dharamshala | Second / winter capital | Himachal Pradesh | [Reference](https://dfs.hp.gov.in/RFSL-NR-Dharamshala.html) |
| additional-1 | Jammu | Winter capital | Jammu and Kashmir | [Reference](https://gktimehindi.in/list-of-state-and-union-territory-capitals-in-india-english-and-hindi/) |
| high-court-01 | Bombay High Court | High Court | Maharashtra | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-02 | Calcutta High Court | High Court | West Bengal | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-03 | Madras High Court | High Court | Tamil Nadu | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-04 | Allahabad High Court | High Court | Uttar Pradesh | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-05 | Karnataka High Court | High Court | Karnataka | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-06 | Patna High Court | High Court | Bihar | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-07 | Gauhati High Court | High Court | Assam | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-08 | Orissa High Court | High Court | Odisha | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-09 | Rajasthan High Court | High Court | Rajasthan | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-10 | Madhya Pradesh High Court | High Court | Madhya Pradesh | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-11 | Kerala High Court | High Court | Kerala | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-12 | Gujarat High Court | High Court | Gujarat | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-13 | Delhi High Court | High Court | Delhi | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-14 | Punjab and Haryana High Court | High Court | Chandigarh | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-15 | Himachal Pradesh High Court | High Court | Himachal Pradesh | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-16 | Sikkim High Court | High Court | Sikkim | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-17 | Chhattisgarh High Court | High Court | Chhattisgarh | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-18 | Uttarakhand High Court | High Court | Uttarakhand | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-19 | Jharkhand High Court | High Court | Jharkhand | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-20 | Tripura High Court | High Court | Tripura | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-21 | Manipur High Court | High Court | Manipur | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-22 | Meghalaya High Court | High Court | Meghalaya | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-23 | Telangana High Court | High Court | Telangana | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-24 | Andhra Pradesh High Court | High Court | Andhra Pradesh | [Reference](https://www.sci.gov.in/jurisdiction/) |
| high-court-25 | Jammu and Kashmir and Ladakh High Court | High Court | Jammu and Kashmir | [Reference](https://www.sci.gov.in/jurisdiction/) |
