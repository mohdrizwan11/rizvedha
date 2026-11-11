# RizVedha (రిజ్ వేద) 🚀
### Visual Static-GK Learning & Exam Practice Platform for Competitive Aspirants

[![Vite](https://img.shields.io/badge/Vite-8.3.6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![D3.js](https://img.shields.io/badge/D3-Geo%20%26%20TopoJSON-F9A03C?logo=d3.js&logoColor=white)](https://d3js.org/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Production%20Ready-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**RizVedha** is a comprehensive, local-first General Awareness (GA) and Static-GK learning platform custom-designed for competitive exam aspirants (SSC CGL / CHSL, RRB NTPC, State PSCs, Defense, and Banking).

Built by **Rizwan**, RizVedha replaces dry, wall-of-text rote learning with interactive 2D/3D maps, dedicated SVG conceptual infographics, self-paced topic drills, and a spaced-repetition recall engine.

---

## 🌟 Key Features

### 1. 🏠 Home (Mission Command)
- **Top Recall Target**: Highlights yesterday's studied topic and triggers immediate active recall.
- **Study Analytics HUD**: Real-time streak tracking, XP counter, and exam countdown (SSC CGL Tier-1).
- **Recent Topic Quick Launch**: Jump straight back into your latest lesson with 1 click.

### 2. 📖 Learn (7 Core Subject Accordions)
- **Collapsible Subject Accordions**: All 7 core subjects (*History, Geography, Polity, Economics, Science, Art & Culture, Static GK*) are neatly collapsed by default.
- **"Start Lesson →" Forward Arrows**: Progressive subtopics with animated forward buttons.
- **Focused Visual Study Room**:
  - Centered high-contrast vector infographics (Indus Valley Citadel vs Lower Town, Mauryan Pillars, River Basins, Article 32 Writs, RBI Transmission, Plant vs Animal Cells, Nagara/Dravida/Vesara Temple Architectures, Space & Missiles).
  - High-yield active retrieval comparison tables.
  - Active retention quizzes with instant scoring and XP rewards.

### 3. 🗺️ Atlas (8 Chapters · 33 Interactive 2D/3D Maps)
- **Organized Syllabus Accordion**: 8 chapters collapsed by default with thematic left-accent stripes and colored badges.
- **High-Precision 2D/3D Fixed Projection**: Full-bleed fitted Mercator projection of India with clean, pastel state fills.
- **Uncluttered Map Markers**: Fixed overlapping label clutter on dense maps (such as Power Plants with 130+ markers); interactive markers feature glowing pulse rings on click and clean single-item hover tags.
- **Enlarged, Bold Inspector Card**: Bold Outfit typography, 4-metric parameter grid, and high-yield **SSC Repeat PYQ Flashcard** with answer reveal.
- **Coverage**: Rivers, Waterways, Power Plants, National Parks, GI Tags, Crops, Soils, Lakes, Biosphere Reserves, Mountain Peaks, Physical India, Temples, Monuments, and more.

### 4. 🎮 Play Arena (Practice & Exam Simulator)
- **Upgraded Full-Width Search**: High-precision search bar with instant one-click clear (`×`) and dedicated search action button (`[ 🔍 Search ]`).
- **Thematically Differentiated Topic Cards**: Color-coded top borders and icons matching each subject domain.
- **33 Topic Drills**: 10 targeted questions per drill with instant answers and zero penalty hearts.
- **8 Chapter Challenges**: Comprehensive 10-question tests across entire subject chapters with live score HUD, streaks, and question-by-question review.
- **Official Mock Exam Simulator**: Timed test mode with official SSC negative marking (-0.50 per wrong answer).
- **60s Speed Blitz**: Rapid-fire high-yield questions for exam alertness.

### 5. 🔁 Review (Leitner 1/3/7/21-Day Spaced Repetition)
- **Automated Spaced Scheduler**: Calculates optimal review intervals (Day 1, 3, 7, 21) based on recall performance.
- **Mistake Correction Workbench**: Captures every incorrect attempt across Atlas, Learn, and Play, preserving detailed answer breakdowns until mastered.

### 6. ⚙️ Settings & Localization
- **🇮🇳 English & Telugu Support**: Complete bilingual interface with Telugu script translations for topics, states, rivers, and quiz prompts.
- **100% Local-First**: All progress, XP, completed lessons, and mistakes are encrypted in browser `localStorage`.
- **Zero Ads / Zero Tracking**: Fast, offline-ready, distraction-free educational experience.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, Lucide React
- **Maps & Visualization**: D3-Geo, TopoJSON Client, SVG Vector Schematics
- **Styling**: Vanilla CSS3 with Modern CSS Variables, Flexbox/Grid, Dark & Light Mode
- **Validation**: Zod schema validation for structured GK datasets
- **Testing**: Playwright End-to-End Suite, Node.js Native Assert Tests
- **Deployment**: Vercel (Configured with `vercel.json` SPA rewrites and asset caching)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v20.19 or higher
- npm v10 or higher

### Installation

```bash
# 1. Clone repository
git clone https://github.com/<your-username>/rizvedha.git
cd rizvedha

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Verification & Testing

```bash
# Validate GK content schemas
npm run validate

# Run unit tests
npm test

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Vercel

RizVedha is pre-configured for one-click deployment to **Vercel**:

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add and commit your changes
git add .
git commit -m "feat: initial commit of RizVedha platform"

# Create a new repository on GitHub (e.g. named 'rizvedha')
# Link and push your repository:
git remote add origin https://github.com/<your-username>/rizvedha.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your `rizvedha` repository from the list.
4. In the project configuration:
   - **Framework Preset**: Vite (automatically detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**!

Within seconds, your live URL (e.g. `https://rizvedha.vercel.app`) will be published and available globally with HTTPS, automated CDN caching, and seamless SPA routing.

---

## 📄 License

This project is licensed under the MIT License — feel free to learn, practice, and build upon it!

---

*Crafted with ❤️ by Rizwan for competitive exam aspirants across India.*
