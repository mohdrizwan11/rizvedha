# Kosha (Vedha) — Architecture & Engineering Guide

## 1. Executive Summary

**Kosha** (internal code name: `vedha` / `kosha-gk`) is an original, local-first, interactive visual learning platform built for Indian competitive exam aspirants (specifically **SSC CGL Tier 1 and Tier 2 General Awareness**). 

The platform replaces static memorisation books (such as Lucent, Parmar SSC, and Varun Awasthi) with interactive visual pedagogy: interactive SVG maps, timeline scrubbers, image-occlusion flashcards, concept relationship graphs, and spaced-repetition retrieval practice.

### Core Distinctions
- **Local-First & Private:** All user progress, spaced-repetition schedules, and mistake logs are stored in `localStorage` under `kosha-progress-v1`. No cloud login or tracking required.
- **PWA / Offline Capable:** Runs fully offline via Service Worker (`public/sw.js`) after first load.
- **Strict Fact Verification:** Zero invented PYQs, shifts, or frequencies. Facts must carry traceable citations and verification grades. Current Affairs is explicitly excluded.

---

## 2. Core Learning Loop

Every topic and chapter follows a strict 3-stage retention loop:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     1. LEARN    │  ───> │   2. PRACTICE   │  ───> │   3. MISTAKES   │
│ Visual textbook │       │ Timed quiz/maps │       │ Canonical store │
│ Story cards     │       │ Chapter Boss    │       │ 2-HP retry      │
│ Compare tables  │       │ Retrieval drills│       │ 1/3/7/21d queue │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Learn:** Multi-unit conceptual exposition, comparison tables with "cover and recall", visual anchors, and mnemonics.
2. **Practice:** Timed map identification, MCQ drills with configurable difficulty, or Chapter Boss tests.
3. **Mistakes:** Persistent registry of missed items. Incorrect answers stay in the queue until successfully recalled across spaced intervals (1 day → 3 days → 7 days → 21 days).

---

## 3. Codebase Evolution & Architecture Layers

The codebase has evolved through four distinct architectural generations, each preserved with backwards compatibility:

```
src/
├── main.jsx          # Root Shell: Navigation, Router, Global Progress & Exam Mode
├── data.js           # [V1 Layer] Seed lessons, 7 subjects, and 33-tool catalog
│
├── v2/               # [V2 Layer] 3-Stage Structured Lessons
│   ├── content.js    # Lesson text expansions and authored MCQs
│   ├── Topic.jsx     # Learn → Practice → Mistakes lesson controller
│   ├── Visual.jsx    # Custom visualisations (Harappan Map, Polity, Cell)
│   └── style.css
│
├── v22/              # [V2.2 Layer] Entry-Based Data Schema & Map Tools
│   ├── schema.js     # Zod schema for validated topic datasets
│   ├── ToolApp.jsx   # Interactive map tool runner (Learn / Practice / Mistakes)
│   ├── IndiaMap.jsx  # SVG map renderer (d3-geo + TopoJSON + d3-zoom)
│   ├── coverage.jsx  # Syllabus tree & tool coverage explorer
│   ├── shared.jsx    # ErrorBoundary, dueCount, and helper utilities
│   └── datasets/     # india-basics.json, rivers-india.json
│
└── v3/               # [V3 / V3.1 Layer] The Visual Textbook Engine
    ├── Textbook.jsx  # Data-driven chapter viewer (Hook, Story Cards, Boss)
    ├── pilots.js     # Pilot chapters (Mauryan, Rivers, Polity, Banking)
    ├── toc.json      # Master Table of Contents (7 subjects, 84 chapters, 387 topics)
    ├── mistakes.js   # Canonical mistakes store with migration & reconciliation
    └── scheduler.js  # 1/3/7/21-day spaced repetition algorithm
```

### Layer Details

#### V1 (`src/data.js`, `src/main.jsx`)
- Contains the original 7 subjects, 7 starter lessons, and the catalog of 33 topic tools.
- Initial global state structure (`xp`, `completed`, `answered`, `mistakes`, `reviews`, `activity`, `exams`).

#### V2 (`src/v2/`)
- Introduced the **Learn → Practice → Mistakes** workflow.
- Rich content expansions: Harappan civilization (interactive map + timeline), Polity articles, Biology cell diagram.
- Original authored practice questions with explanations.

#### V2.2 (`src/v22/`)
- Introduced **Entry-Based Schemas** (`TopicSchema` using Zod).
- Single source of truth datasets (`india-basics.json` with 64 entries, `rivers-india.json`).
- Interactive SVG map using TopoJSON geometry (`india-states.topo.json`) and d3-geo projection.
- Strict data validation in the build pipeline (`npm run validate`).

#### V3 / V3.1 (`src/v3/`)
- **Visual Textbook:** Full syllabus coverage structure (84 chapters, 387 topics) linked bi-directionally to the 33 tools.
- **Canonical Mistakes Store (`mistakes.js`):** Unifies mistakes across V1 lessons, V2.2 map tools, and V3 textbook chapters into a single versioned store (`mistakeStore.records`).
- **Spaced Repetition Scheduler (`scheduler.js`):** Enforces 1, 3, 7, and 21 day recall intervals with mastery tracking.
- **Chapter Boss & 2-HP Retries:** Requires two consecutive correct recalls to master a missed concept.

---

## 4. State Management & Storage Engine

All persistent state is stored in `localStorage` under the key `kosha-progress-v1`.

### Data Schema
```typescript
interface UserProgress {
  xp: number;
  completed: string[];               // e.g. ['rivers', 'harappa']
  answered: Record<string, boolean>; // e.g. { 'rivers-0': true }
  mistakes: string[];                // Legacy string IDs for backward compatibility
  mistakeDetails: Record<string, MistakeDetail>;
  mistakeStore: {                    // Canonical V3 store
    version: 1;
    records: Record<string, CanonicalMistakeRecord>;
  };
  reviews: Record<string, Review>;
  flashcards: Record<string, CardProgress>;
  chapterSessions: Record<string, SessionState>;
  v22: Record<string, ToolProgress>;
  activity: string[];                // ISO dates ['2026-11-10', ...]
  exams: ExamRecord[];
  theme: 'light' | 'dark';
  goal: number;
  toolBookmarks?: number[];
}
```

### Mistake Reconciliation (`src/v3/mistakes.js`)
When legacy components (such as V1 exam mode or V2 lessons) write to `d.mistakes`, `reconcileMistakes()` automatically synchronizes changes with `mistakeStore.records`, and vice versa, preserving full compatibility without data loss.

---

## 5. Subject Coverage & 33 Topic Tools

The curriculum covers 7 core static subjects, mapped to 33 dedicated topic tools:

| Subject | Weightage | Chapters | Example Tools |
|---|---|---|---|
| **Indian Polity & Constitution** | ~8–10 Qs | 12 | India Basics, CMs & Governors, Tribes of India |
| **Indian Economy** | ~8–10 Qs | 11 | Banking & Payments, Financial Institutions |
| **History** | ~6–8 Qs | 16 | Ancient Dynasties, Medieval Empires, Freedom Movement, Battles, Monuments |
| **Geography** | ~6–8 Qs | 15 | Rivers, Waterways, Power Plants, Crops, Soil Types, Lakes, Mountain Peaks |
| **Static GK & Culture** | ~6–8 Qs | 15 | Dances, Music, Temples, Books & Authors, GI Tags, Festivals, Sports, Awards |
| **General Science** | ~5–7 Qs | 10 | Science Facts, Space & Defence |
| **Environment & Ecology** | ~3–5 Qs | 5 | Biosphere Reserves, National Parks |

---

## 6. Directory Layout

The workspace is organized into clear functional boundaries:

```
vedha/
├── dist/                  # Production Vite build output
├── docs/                  # Project specifications, architecture, and reports
│   ├── README.md          # Documentation index & reading order
│   ├── ARCHITECTURE.md    # Master architecture guide (this file)
│   ├── PROJECT_SPEC.md    # Standing project rules & syllabus reference
│   ├── V3_TEXTBOOK_SPEC.md# Visual textbook design specification
│   ├── V3_1_PYQ_ENGINE.md # Question evidence & PYQ rules
│   ├── PROGRESS.md        # Current sprint status & active tasks
│   └── reports/           # Sprint audit reports, verification logs, deploy notes
│       ├── ALPHA-DEPLOY.md
│       ├── BATCH-1-REPORT.md
│       ├── BATCH-2-INTERIM.md
│       ├── MANUAL-VERIFICATION.md
│       ├── MAP-DATA.md
│       ├── SPRINT-ALPHA-STATUS.md
│       ├── V3-TOC-REVIEW.md
│       └── batch2-build.log
│
├── public/                # PWA assets (sw.js, manifest.webmanifest, icons)
├── resources/             # Source data, syllabus PDFs, and clean datasets
│   ├── README.md          # Index of resources
│   ├── datasets-clean/    # 33 JSON datasets ready for tool integration
│   ├── gk-games-extracted/# 33 standalone HTML prototype games
│   ├── reference-html/    # Extracted raw HTML subject reference pages
│   └── syllabus/          # GS Syllabus.pdf, extracted text, and pattern analyses
│
├── scripts/               # Build-time validation and helper scripts
│   └── validate-content.js# Zod content validator (runs before build)
│
├── src/                   # Application source code
│   ├── main.jsx           # Root application shell and router
│   ├── data.js            # V1 seed data
│   ├── style.css          # Global CSS
│   ├── v2/                # V2 lesson flow and interactive visuals
│   ├── v22/               # V2.2 entry-based map tools and TopoJSON map
│   └── v3/                # V3 visual textbook, scheduler, and TOC
│
├── tests/                 # Automated test suite
│   ├── README.md          # Test suite documentation & run instructions
│   ├── unit/              # Unit tests (storage, scheduler)
│   │   └── v3-storage.test.mjs
│   └── e2e/               # Browser Playwright tests (flows, maps, offline)
│       ├── smoke.test.cjs
│       ├── v3-toc.test.cjs
│       ├── batch1-journey.test.cjs
│       ├── batch2-pilot.test.cjs
│       └── ...
│
├── index.html             # Vite HTML entrypoint
├── package.json           # Dependencies and npm scripts
├── package-lock.json
├── README.md              # Project overview and quick start
└── vite.config.js         # Vite configuration with React plugin
```

---

## 7. Development & Verification Workflows

### Essential NPM Scripts
```bash
# Start local development server (http://localhost:5173)
npm run dev

# Validate all entry datasets against Zod schema
npm run validate

# Production build (automatically validates datasets first)
npm run build

# Preview production build (http://localhost:4173)
npm run preview

# Run unit tests (instant)
npm test

# Run TOC structure & navigation test (requires dev server)
npm run test:toc

# Run pilot chapter & boss test (requires dev server)
npm run test:e2e:pilot

# Run mobile & offline PWA test (requires preview server)
npm run test:e2e:sprint
```

### Fact Verification Standard
1. **GOLD:** Confirmed against two independent, directly fetched official/authoritative sources (e.g. NCERT + Britannica or Government Ministry portal).
2. **SILVER:** Supported by one reliable fetched source; awaiting second independent confirmation.
3. **BRONZE / UNVERIFIED:** Needs review; must be explicitly marked unverified. Never invent questions, answers, years, or frequencies.

