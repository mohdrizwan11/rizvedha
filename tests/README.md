# Test Suite Guide

This directory contains automated unit and end-to-end tests for the Kosha GK learning application.

## Test Categories

### 1. Unit Tests (`tests/unit/`)
Pure Node.js tests (no browser required). Run instantly in CI or local terminal.
- `v3-storage.test.mjs`: Tests mistake store migration, backward-compatibility projection, reconciliation, and the 1/3/7/21-day spaced repetition scheduler (`schedule()`).
  - Run with: `npm test` or `npm run test:unit`

### 2. End-to-End Tests (`tests/e2e/`)
Browser tests using `@playwright/test` / Chromium to test interactive user flows, navigation, localStorage persistence, and responsive layouts.

> **Note on E2E Prerequisites**:
> - Most tests connect to `http://localhost:5173` (start with `npm run dev`).
> - Tests ending with offline / production PWA verification (`sprint-alpha.test.cjs`, `verify.test.cjs`) connect to `http://localhost:4173` (start with `npm run build && npm run preview`).

| Test File | Target URL | What It Verifies |
|---|---|---|
| `smoke.test.cjs` | `:5173` | Basic smoke test: home page, starter lesson, quiz drill, XP persistence, mobile layout. |
| `verify.test.cjs` | `:4173` | Exam Mode flow, timer, submission, score calculation, offline shell. |
| `v2.test.cjs` | `:5173` | V2 Learn → Practice → Mistakes flow, 3-stage topic interactions. |
| `v2-more.test.cjs` | `:5173` | Extended V2 edge cases, question reload persistence. |
| `v22.test.cjs` | `:5173` | V2.2 India Basics & Rivers map tools, state selection, note drawer. |
| `v22-schedule.test.cjs` | `:5173` | V2.2 spaced repetition intervals, due card badges. |
| `v3-toc.test.cjs` | `:5173` | 7 subjects, 84 chapters, 387 topics TOC integrity, search, filter, tool links. |
| `batch1-journey.test.cjs` | `:5173` | Full Batch 1 user journey: hub search → bookmark → map quiz → retry mistake. |
| `batch2-infra.test.cjs` | `:5173` | Legacy mistake migration, reverse chapter links, timed session restore. |
| `batch2-pilot.test.cjs` | `:5173` | Mauryan & Rivers pilots, 2-HP chapter boss challenge, Gold/Silver grades. |
| `batch2-reverse.test.cjs` | `:5173` | Verifies all 33 tools correctly link back to their respective textbook chapters. |
| `sprint-alpha.test.cjs` | `:4173` | Fundamental Rights & Banking compact chapters, mobile nav, offline caching. |

## Quick Commands
```bash
# Unit test (instant)
npm test

# TOC structure and navigation test (requires npm run dev)
npm run test:toc

# Pilot chapter and boss test (requires npm run dev)
npm run test:e2e:pilot

# Sprint Alpha mobile & offline test (requires npm run preview)
npm run test:e2e:sprint
```

