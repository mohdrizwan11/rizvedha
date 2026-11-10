V3 — THE VISUAL TEXTBOOK. Read the attached SSC_GK_Project_[Spec.md](http://Spec.md), save it as /docs/PROJECT_[SPEC.md](http://SPEC.md), and save THIS prompt as /docs/V3_TEXTBOOK_[SPEC.md](http://SPEC.md). Re-read both at the start of every session. Keep everything already built. Current Affairs stays excluded. Keep all standing rules in the spec file.

VISION

The web app must be a COMPLETE visual GK textbook for SSC CGL: a replacement for printed books like Lucent, Parmar SSC and Varun Awasthi GK, with colour, maps, diagrams, animations, flashcards and tables, designed for memory retention and gamified. Preserve the Learn → Practice → Mistakes flow:

 • LEARN = the textbook: Subject → Chapter → Lesson.

 • PRACTICE = the 33 map/quiz tools, PYQ tests, chapter boss tests.

 • MISTAKES = one canonical store, retry, weak zones, stats.

Each textbook chapter links to the related tools, and each tool links back to its chapter.

CHAPTER PAGE ANATOMY (identical for every chapter; data-driven so adding a chapter is content, not code)

1 Hook: one image + one question.

2 Big Picture: the hero visual (SVG map / timeline / diagram / knowledge graph) with real interaction (tap a part to open its facts; labels can be hidden for self-testing).

3 Story cards: 5–7 chunks, colour-coded by subject, each with a small illustration.

4 Compare tables with a "cover and recall" mode.

5 Memory hooks: mnemonic + visual metaphor per chapter.

6 SSC lens: how the topic is asked (question patterns). Show "repeated N times" only when derived from real retrieved papers; otherwise omit it.

7 Recall check: 3–5 instant questions before moving on.

8 Flashcards: auto-generated from the chapter's data, including image-occlusion cards that hide a label on a map or diagram.

9 Connections: links to related chapters and tools (e.g. Mauryan → Ashoka → Kalinga → Dhauli → Buddhism → Sarnath pillar).

VISUAL SYSTEM

Colourful but graduate-level. One colour theme per subject (History, Geography, Polity, Economics, Science, Static GK/Culture, Environment). Consistent icon set. Mobile-first and responsive. Meaningful animation only: river routes drawing, an empire-extent slider across time, timeline scrubbing, flip cards. Respect prefers-reduced-motion. English/Hindi toggle. Offline-capable (PWA) after first load.

IMAGE SOURCING: prefer original SVG illustrations. Otherwise use public-domain or CC-licensed images (e.g. Wikimedia Commons) and store the licence and attribution for each in the data. Never copy images or diagrams from textbooks or paid platforms. If AI-generated illustrations are used, label them as illustrations and never present them as real photos or artefacts. Historical territory maps must be labelled "approximate extent" and sourced.

MEMORY ENGINE

Spaced repetition on all cards and mistakes (intervals 1 / 3 / 7 / 21 days). A "Mastered" state requires correct recall after a delay, not just one correct answer. Interleave older and newer items in the Daily Recall Run (about 10 minutes, mixes due flashcards, due mistakes and one map round).

GAMIFICATION (tied to recall)

 • Fog-of-war maps: India (and later World) starts grey and gains colour as entries are mastered.

 • Mastery rings per chapter (Seen → Recalled → Mastered).

 • XP only for retrieval; bonus for recalling after a delay; no XP for scrolling.

 • Mistake monsters: each mistake is a monster with 2 HP; defeat it with 2 correct retries.

 • Chapter Boss: a timed test (PYQ/pattern-based/original, labelled by type).

 • Streak with a freeze, original rank ladder and badges. Keep the tone suitable for a graduate-level aspirant.

CONTENT PLAN

Do not write chapters yet. First propose a table of contents as data: Subjects → Chapters → Lessons, derived from the spec's syllabus, with a build priority order from the weightage guidance. Show it in the coverage dashboard (statuses: not started / researching / drafted / verified / quality-checked). I will review it before bulk writing.

BATCH 2 SCOPE

A. Finish the Batch 1 leftovers: one canonical mistakes store (migrate the legacy and new records without losing progress), session restore after reload, the syllabus-seeded coverage dashboard, and the map boundary/licence resolution.

B. Build the chapter engine (page anatomy above), the flashcard engine with image occlusion, the spaced-repetition scheduler and the fog-of-war map.

C. Two pilot chapters, written to full depth with two-source verification: (1) History: "Mauryan Empire" (extent map with a time slider, timeline, Ashoka's edicts and pillars, administration, comparison tables, mnemonic, flashcards, recall check, chapter boss); (2) Geography: "Rivers of India", upgrading the existing module into a textbook chapter.

D. Tests: automated tests for the full journey (read chapter → interact with the map → recall check → flashcards → boss test → wrong answers appear in Mistakes → retry → mastery ring and map colour update), then run them.

BATCH 2 REPORT (required, then STOP): the proposed table of contents with chapter counts per subject; pilot chapters' facts count, sources used and failed sources; every unverified fact; images used with licences; honest verified-PYQ count; tests passed/failed; bundle size; anything broken. Do not start Batch 3 until I approve the pilots.
