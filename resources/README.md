# Resources Directory Index

This directory houses syllabus documents, cleaned datasets, extracted reference apps, and raw reference HTML materials used in Kosha.

## Directory Structure

```
resources/
├── datasets-clean/      # 33 production-ready JSON datasets for topic tools
├── gk-games-extracted/  # 33 original standalone HTML interactive apps
├── reference-html/      # Extracted raw HTML subject reference pages
└── syllabus/            # Official syllabus documents and extraction notes
```

---

### 1. `datasets-clean/` (Cleaned Topic Tool Datasets)
Contains 33 standardized JSON datasets representing the 33 topic tools.
Each file follows the structure specified in `inventory.json`.

- `ancient-dynasties.json`, `medieval-empires.json`, `freedom-movement.json`, `battles-treaties.json`, `monuments.json`
- `temples.json`, `dances.json`, `music.json`, `art-culture.json`, `books-authors.json`, `gi-tags.json`, `festivals.json`
- `rivers.json`, `waterways.json`, `power-plants.json`, `crops.json`, `soil-types.json`, `lakes.json`, `mountain-peaks.json`, `physical-india.json`, `biosphere-reserves.json`, `national-parks.json`
- `india-basics.json`, `cm-governors.json`, `tribes.json`
- `railway-zones.json`, `highways.json`
- `sports.json`, `awards-honours.json`
- `space-defence.json`, `science-facts.json`
- `world-gk.json`, `quick-facts.json`
- `inventory.json`: Metadata inventory with entity count, mcq count, format, and subject mapping.

### 2. `gk-games-extracted/` (Interactive Prototype Apps)
33 single-file HTML applications containing the original interactive drills, quiz mechanics, and data tables for each topic tool.
- Reference implementation for porting games into React / TopoJSON.
- `summary.json`: Index of all extracted tool apps.

### 3. `reference-html/` (Raw Subject Reference Pages)
Legacy reference documents and question compilations:
- `economics.html`, `indian_polity.html`, `science.html`, `static-GK.html`
- `Geography/`: `india_world_geo.html`, `physical_geo.html`, `pyq.html`
- `History/`: `ancient_indian_history.html`, `medieval_indian_history.html`, `modern_indian_history.html`, `pyq.html`

### 4. `syllabus/` (Syllabus Documents)
- `GS Syllabus.pdf`: Official general awareness syllabus source.
- `syllabus-extracted.txt`: Clean text extraction of the GS Syllabus.
- `Recent Paper Patterns.pdf`: Analysis of recent SSC exam question patterns.
- `100 Best Static GK By Varun Awasthi.pdf`: Reference benchmark guide for static topics.
