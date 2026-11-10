V3.1 — PYQ ENGINE + REVISED TRUST RULES. Save as /docs/V3_1_PYQ_[ENGINE.md](http://ENGINE.md). These rules override any conflicting rule in /docs/PROJECT_[SPEC.md](http://SPEC.md) and the V3 prompt. North star: the WHOLE SSC CGL General Awareness syllabus (Current Affairs excluded) as a gamified, visual textbook where every micro-topic has a chapter, visuals, flashcards AND real PYQs. The reference screenshots of the other app remain the UX reference for tools, Atlas and Stats.

REVISED TRUST MODEL (replaces "two sources for every fact")

Grade every fact and every PYQ answer:

 • GOLD: matches an official SSC paper/key, or the same question appears in 2+ different papers with the same answer, or 2 independent trusted sources agree.

 • SILVER: one paper with an answer key from a reputable public source.

 • BRONZE: answer reconstructed without a key, or keys conflict. Show a ⚠ "answer unconfirmed". Excluded from Boss tests, GA Mock and "repeated" statistics until upgraded. May appear in Learn and casual practice.

Show a small trust badge in the UI. Never invent a PYQ, year, shift, answer or frequency. Keep the label separation: Real PYQ / Original practice / Pattern-inspired.

PYQ SCOPE

 • Past 15 years, 2011–2026. Primary: CGL Tier-I GA, then CGL Tier-II GS. Second phase: CHSL, MTS, CPO, Stenographer GA, tagged by exam, because GA facts repeat across SSC exams.

 • Order: newest first (2023–2025 as a pilot year-by-year), then 2019–2022, then 2016–2018, then 2011–2015.

 • CGL 2026 Tier-I: the answer key is preliminary, so mark all 2026 answers "provisional" until the final key is found.

SOURCES AND LEGAL HYGIENE

 • Official SSC papers sit behind candidate login: do NOT attempt to log in. Use publicly accessible copies of papers and answer keys (e.g. AglaSem, Prepp, Careers360, StudyIQ, SATHEE-IITK and similar), respecting robots.txt and each site's terms; rate-limit requests; no bulk scraping that violates terms.

 • Store extracted structured question data with source URL and retrieval date. Do not redistribute their PDFs or copy their solutions. Write ALL explanations yourself.

 • Fact cross-checks (for chapters and for staleness): NCERT/ePathshala, [India.gov.in](http://India.gov.in), PIB, ministry sites, Census of India, India Year Book, Survey of India, GSI, MoEFCC/Wildlife Institute of India, Ramsar Sites Information Service, UNESCO World Heritage list, Sangeet Natak Akademi, Ministry of Culture, India Code, RBI, SEBI, ISRO, DRDO, [Olympics.com](http://Olympics.com). Secondary cross-check: Britannica and public pages of established SSC platforms. Wikipedia is a lead only, never a sole source.

PYQ SCHEMA

id, exam, tier, year, date, shift, language(s), question, options, correct_answer, answer_as_of_exam_date, current_answer, staleness_status (ok / changed / needs-check), grade, source_url, retrieved_on, subject, chapter, micro_topic, question_type (direct / match-the-following / odd-one-out / correctly-matched / statement-based), difficulty, explanation (original, short, with a memory hook), chapter_link, duplicate_group_id.

STALENESS CHECK: for count-type and "largest/first/highest" facts (states, UTs, High Courts, Ramsar sites, national parks, UNESCO sites, biosphere reserves, etc.), compute current_answer and flag where it differs from the answer on the exam date. Show "Answer as of <date>" in the UI when they differ.

EXTRACTION RULES

 • PDF access may be limited to the first 30 pages: read every paper in page-range chunks and log pages read. Use OCR for scans. Handle bilingual layouts. Never "repair" an unreadable question by guessing; mark it unreadable and list it.

 • Merge English/Hindi twins and repeated questions across shifts and years into one duplicate_group, keeping every appearance (year, shift).

 • Frequency numbers come ONLY from the collected dataset and always display "based on N papers collected".

PRODUCT FEATURES TO ADD

 • Pattern Radar: per chapter and micro-topic, show how often and in which years SSC asked it, plus question types; show a high-yield ★ in the textbook from real data.

 • PYQ Time Machine: browse a topic's questions by year and see how the same fact is asked in different ways.

 • Trap Detector: recurring wrong-option pairs from the data feed the "Often confused" cards.

 • Format trainers: match-the-following, odd-one-out, correctly-matched, statement-based.

 • GA Mock: 25 questions, about 15 minutes, negative marking, built only from GOLD/SILVER.

 • "Report wrong answer" button with a personal override; reports appear in an admin queue.

 • Every PYQ links to its textbook chapter and creates flashcards; wrong answers become Mistake monsters.

 • Coverage dashboard gets a PYQ count and grade mix per micro-topic.

BATCH PLAN (insert after Batch 2 approval, or run now if Batch 2 is blocked)

Batch 2.5 PILOT: schema + ingestion pipeline + staleness checker, loaded with ONE exam year (2024, CGL Tier-I) end to end into Learn, Practice, Mistakes and the dashboard.

REPORT (then STOP): per exam and year, the papers found with URLs; pages read vs total; GA questions extracted; duplicates merged; unreadable count; grade mix (Gold/Silver/Bronze); questions flagged stale; sources that failed to load; how many answers I should spot-check, listing 20 random ones for me; anything broken. Do not back-fill other years until I approve.

TOC APPROVED, with these checks: (1) confirm the outline includes: a Freedom Movement chronology chapter (1885–1947); World Geography and Economic Geography; selective World History basics; the 12 static schemes under Economics; a Miscellaneous Static GK chapter (symbols, firsts, largest/smallest, important days & themes); Organisations & indices; static Sci-tech (ISRO, DRDO, institutions); and a link from each of the 33 tools to a chapter. Add anything missing. (2) Label chapter weights as "guidance-based" until PYQ data replaces them.

CONTINUE BATCH 2 IN THIS ORDER:

 1. Canonical mistakes store (migrate legacy + new records, keep progress), session restore, and the spaced-repetition scheduler. The pilots depend on these.

 2. Map licence and boundary: do NOT block on it. Record it as a "RELEASE BLOCKER: unresolved, fine for private use" in the dashboard and move on.

 3. Chapter engine, flashcard engine (with image occlusion), fog-of-war map.

 4. Pilot chapters: Mauryan Empire and Rivers of India, to full depth, then the Batch 2 tests and report as specified.

CONTEXT SAFETY: create /docs/[PROGRESS.md](http://PROGRESS.md) and update it at every stop with: what is done, what is in progress, what is next, open problems and key decisions. Read /docs/PROJECT_[SPEC.md](http://SPEC.md), V3_TEXTBOOK_[SPEC.md](http://SPEC.md), V3_1_PYQ_[ENGINE.md](http://ENGINE.md) and [PROGRESS.md](http://PROGRESS.md) at the start of every session. Stop after the Batch 2 report.
