import React, { useState, useEffect, useMemo } from 'react';
import {
  Target, Timer, Trophy, Swords, ClipboardList, CheckCircle2,
  AlertCircle, ArrowRight, RotateCcw, Zap, Flame, Award,
  Sparkles, Search, Layers, Compass, HelpCircle, Heart, Shield,
  ChevronRight, RefreshCw, XCircle, Clock
} from 'lucide-react';
import playBank from './datasets/play-questions.json';
import { ATLAS_TOPICS } from './Atlas';
import { subjects, lessons } from './data';
import { pilots } from './v3/pilots';

// ==============================================================
// 8 EPIC CHAPTER BOSS BATTLES CONFIGURATION
// ==============================================================
const BOSS_BATTLES = [
  {
    id: 'boss-ancient-kings',
    title: 'The Ancient Harappan & Mauryan Overlords',
    titleTe: 'ప్రాచీన హరప్పా & మౌర్య చక్రవర్తులు',
    subject: 'Ancient History',
    avatar: '👑',
    hook: 'Face the masters of the Bronze Age Citadel, Ashoka’s 24-spoke edicts, and Kautilya’s statecraft.',
    factsCount: 45,
    timerMins: 5,
    topics: ['ancient-dynasties', 'temples', 'monuments']
  },
  {
    id: 'boss-medieval-emperors',
    title: 'The Delhi Sultanate & Mughal Emperors',
    titleTe: 'ఢిల్లీ సుల్తానేట్ & మొఘల్ చక్రవర్తులు',
    subject: 'Medieval History',
    avatar: '⚔️',
    hook: 'Can you defeat the market regulators of Alauddin Khilji and the Mughal artillery tacticians?',
    factsCount: 50,
    timerMins: 5,
    topics: ['medieval-empires', 'battles-treaties', 'monuments']
  },
  {
    id: 'boss-freedom-titans',
    title: 'The Freedom Titans & National Movement',
    titleTe: 'స్వాతంత్ర్య సమరయోధులు & జాతీయోద్యమం',
    subject: 'Modern History',
    avatar: '🇮🇳',
    hook: 'Test your courage against the leaders of 1857, the Salt Satyagraha, and the Quit India call.',
    factsCount: 40,
    timerMins: 5,
    topics: ['freedom-movement', 'battles-treaties']
  },
  {
    id: 'boss-mountain-river-titans',
    title: 'The River Titans & Mountain Passes',
    titleTe: 'పర్వత శిఖరాలు & నదీ ప్రవాహ దిగ్గజాలు',
    subject: 'Indian Physical Geography',
    avatar: '⛰️',
    hook: 'Conquer the highest peaks of the Western Ghats and the treacherous gorges of the Great Himalayas.',
    factsCount: 65,
    timerMins: 5,
    topics: ['rivers', 'mountain-peaks', 'physical-india', 'waterways']
  },
  {
    id: 'boss-constitution-trial',
    title: 'The Constitution & Parliament Trial',
    titleTe: 'రాజ్యాంగ & పార్లమెంటరీ విచారణ',
    subject: 'Polity & Governance',
    avatar: '⚖️',
    hook: 'Defend your fundamental rights against the 5 prerogative writs and constitutional watchdogs.',
    factsCount: 45,
    timerMins: 5,
    topics: ['india-basics', 'cm-governors']
  },
  {
    id: 'boss-green-guardians',
    title: 'The Biosphere & Wildlife Sanctuaries',
    titleTe: 'వన్యప్రాణి సంరక్షణ & ప్రకృతి రక్షకులు',
    subject: 'Environment & Nature',
    avatar: '🐅',
    hook: 'Survive in the dense jungles of Kaziranga, Corbett, and the world’s only floating national park.',
    factsCount: 55,
    timerMins: 5,
    topics: ['national-parks', 'biosphere-reserves', 'lakes', 'soils']
  },
  {
    id: 'boss-science-cosmos',
    title: 'The Cosmos & Scientific Vanguard',
    titleTe: 'అంతరిక్షం & శాస్త్రీయ విజ్ఞాన రంగం',
    subject: 'Science & Defence',
    avatar: '🚀',
    hook: 'Master Newton’s mechanical laws, missile systems, and cellular biochemistry.',
    factsCount: 48,
    timerMins: 5,
    topics: ['space-defence', 'science-facts']
  },
  {
    id: 'boss-grand-ssc-general',
    title: 'The Ultimate SSC CGL General Awareness Boss',
    titleTe: 'గ్రాండ్ SSC CGL జనరల్ అవేర్‌నెస్ బాస్',
    subject: 'All-India Grand Marathon',
    avatar: '🔥',
    hook: 'The definitive challenge: rapid mixed General Awareness across all 33 geographic and static topics.',
    factsCount: 100,
    timerMins: 6,
    topics: ['rivers', 'national-parks', 'power-plants', 'ancient-dynasties', 'temples', 'sports']
  }
];

export default function Play({ data, update, onOpenLesson, onOpenChapter, lang = 'en' }) {
  // Navigation tabs: 'drills' | 'subjects' | 'boss' | 'exam' | 'blitz'
  const [activeTab, setActiveTab] = useState('drills');
  const [drillCategory, setDrillCategory] = useState('All');
  const [drillSearch, setDrillSearch] = useState('');

  // Active Session states
  const [activeDrill, setActiveDrill] = useState(null); // active topic drill session
  const [activeBoss, setActiveBoss] = useState(null); // active boss battle session
  const [examSettings, setExamSettings] = useState({ preset: 'cgl', count: 25, minutes: 15, negative: 0.5 });
  const [examState, setExamState] = useState(null); // active exam session
  const [blitzState, setBlitzState] = useState(null); // 60s speed blitz session

  // -------------------------------------------------------------
  // ALL 33 TOPICS MERGED WITH DRILL QUESTION COUNTS
  // -------------------------------------------------------------
  const allTopicDrills = useMemo(() => {
    return ATLAS_TOPICS.map(t => {
      const qCount = (playBank.questions || []).filter(q => q.topicSlug === t.slug).length;
      return {
        ...t,
        qCount: qCount || t.count || 15
      };
    });
  }, []);

  const filteredDrills = useMemo(() => {
    return allTopicDrills.filter(t => {
      const matchCat = drillCategory === 'All' || t.category === drillCategory;
      const matchQ = !drillSearch.trim() ||
        t.title.toLowerCase().includes(drillSearch.toLowerCase()) ||
        (t.titleTe && t.titleTe.includes(drillSearch));
      return matchCat && matchQ;
    });
  }, [allTopicDrills, drillCategory, drillSearch]);

  const drillCategories = [
    'All',
    'Geography & Nature',
    'History & Culture',
    'India & Infrastructure / Polity',
    'Festivals & Society',
    'Sports',
    'Science & Technology / Defense',
    'International / Organizations',
    'Miscellaneous'
  ];

  // -------------------------------------------------------------
  // START FOCUSED TOPIC DRILL SESSION
  // -------------------------------------------------------------
  const startTopicDrill = (topic) => {
    const topicPool = (playBank.questions || []).filter(q => q.topicSlug === topic.slug);
    const pool = topicPool.length >= 5 ? topicPool : (playBank.questions || []);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);

    setActiveDrill({
      topic,
      questions: shuffled,
      currentIdx: 0,
      selectedOpt: null,
      score: 0,
      isDone: false
    });
  };

  const handleDrillAnswer = (opt) => {
    if (!activeDrill || activeDrill.selectedOpt !== null) return;
    const currentQ = activeDrill.questions[activeDrill.currentIdx];
    const isCorrect = opt === currentQ.correct;

    if (isCorrect) {
      update(d => ({
        ...d,
        xp: (d.xp || 0) + 10
      }));
    }

    setActiveDrill(prev => ({
      ...prev,
      selectedOpt: opt,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNextDrillQuestion = () => {
    if (!activeDrill) return;
    if (activeDrill.currentIdx + 1 < activeDrill.questions.length) {
      setActiveDrill(prev => ({
        ...prev,
        currentIdx: prev.currentIdx + 1,
        selectedOpt: null
      }));
    } else {
      setActiveDrill(prev => ({ ...prev, isDone: true }));
    }
  };

  // -------------------------------------------------------------
  // START CHAPTER MASTERY CHALLENGE (FULL-RUN SINGLE PERSON LEARNING)
  // -------------------------------------------------------------
  const startBossBattle = (boss) => {
    const bossPool = (playBank.questions || []).filter(q => boss.topics.includes(q.topicSlug));
    const pool = bossPool.length >= 8 ? bossPool : (playBank.questions || []);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);

    setActiveBoss({
      boss,
      questions: shuffled,
      currentIdx: 0,
      selectedOpt: null,
      score: 0,
      streak: 0,
      isDone: false,
      answersHistory: []
    });
  };

  const handleBossAnswer = (opt) => {
    if (!activeBoss || activeBoss.selectedOpt !== null) return;
    const currentQ = activeBoss.questions[activeBoss.currentIdx];
    const isCorrect = opt === currentQ.correct;

    if (isCorrect) {
      update(d => ({ ...d, xp: (d.xp || 0) + 15 }));
    }

    setActiveBoss(prev => ({
      ...prev,
      selectedOpt: opt,
      score: isCorrect ? prev.score + 1 : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
      answersHistory: [
        ...prev.answersHistory,
        {
          question: currentQ.question,
          selected: opt,
          correct: currentQ.correct,
          isCorrect,
          explain: currentQ.explain
        }
      ]
    }));
  };

  const handleNextBossQuestion = () => {
    if (!activeBoss) return;
    if (activeBoss.currentIdx + 1 < activeBoss.questions.length) {
      setActiveBoss(prev => ({
        ...prev,
        currentIdx: prev.currentIdx + 1,
        selectedOpt: null
      }));
    } else {
      setActiveBoss(prev => ({
        ...prev,
        isDone: true
      }));
    }
  };

  // -------------------------------------------------------------
  // OFFICIAL EXAM SIMULATOR
  // -------------------------------------------------------------
  const applyPreset = (presetKey) => {
    if (presetKey === 'cgl') setExamSettings({ preset: 'cgl', count: 25, minutes: 15, negative: 0.5 });
    else if (presetKey === 'chsl') setExamSettings({ preset: 'chsl', count: 25, minutes: 15, negative: 0.5 });
    else if (presetKey === 'rrb') setExamSettings({ preset: 'rrb', count: 20, minutes: 12, negative: 0.33 });
    else if (presetKey === 'marathon') setExamSettings({ preset: 'marathon', count: 50, minutes: 30, negative: 0.5 });
    else if (presetKey === 'sprint') setExamSettings({ preset: 'sprint', count: 10, minutes: 5, negative: 0.25 });
  };

  const startExam = () => {
    const pool = [...(playBank.questions || [])].sort(() => Math.random() - 0.5);
    const chosen = pool.slice(0, Math.min(+examSettings.count, pool.length));
    setExamState({
      questions: chosen,
      currentIndex: 0,
      answers: {},
      marked: [],
      remainingSeconds: examSettings.minutes * 60,
      isDone: false,
      startTime: Date.now()
    });
  };

  // Exam timer
  useEffect(() => {
    if (!examState || examState.isDone) return;
    const interval = setInterval(() => {
      setExamState(prev => {
        if (!prev || prev.isDone) return prev;
        if (prev.remainingSeconds <= 1) {
          return { ...prev, remainingSeconds: 0, isDone: true };
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examState?.isDone]);

  const submitExam = () => {
    if (!examState) return;
    const { questions, answers } = examState;
    let rightCount = 0;
    let attemptedCount = 0;

    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns !== undefined) {
        attemptedCount++;
        if (userAns === q.correct) rightCount++;
      }
    });

    const netScore = +(rightCount - (attemptedCount - rightCount) * examSettings.negative).toFixed(2);

    update(d => {
      let mistakes = [...(d.mistakes || [])];
      let answered = { ...(d.answered || {}) };
      let xp = (d.xp || 0) + (rightCount * 10);

      questions.forEach((q, i) => {
        const id = q.id;
        const answer = answers[i];
        const right = answer === q.correct;
        if (answer !== undefined) answered[id] = right;
        if (!right && !mistakes.includes(id)) {
          mistakes.push(id);
        }
      });

      return {
        ...d,
        xp,
        answered,
        mistakes,
        exams: [
          ...(d.exams || []),
          { at: Date.now(), total: questions.length, attempted: attemptedCount, right: rightCount, score: netScore }
        ]
      };
    });

    setExamState(prev => ({ ...prev, isDone: true }));
  };

  // -------------------------------------------------------------
  // 60-SECOND SPEED BLITZ
  // -------------------------------------------------------------
  const startBlitz = () => {
    const pool = [...(playBank.questions || [])].sort(() => Math.random() - 0.5);
    setBlitzState({
      questions: pool,
      currentIdx: 0,
      score: 0,
      attempted: 0,
      secondsLeft: 60,
      isDone: false
    });
  };

  useEffect(() => {
    if (!blitzState || blitzState.isDone) return;
    const interval = setInterval(() => {
      setBlitzState(prev => {
        if (!prev || prev.isDone) return prev;
        if (prev.secondsLeft <= 1) {
          return { ...prev, secondsLeft: 0, isDone: true };
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [blitzState?.isDone]);

  const handleBlitzAnswer = (opt) => {
    if (!blitzState || blitzState.isDone) return;
    const currentQ = blitzState.questions[blitzState.currentIdx];
    const isCorrect = opt === currentQ.correct;

    if (isCorrect) {
      update(d => ({ ...d, xp: (d.xp || 0) + 10 }));
    }

    setBlitzState(prev => ({
      ...prev,
      currentIdx: prev.currentIdx + 1,
      attempted: prev.attempted + 1,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  return (
    <div className="play-view">
      {/* 1. TOP HEADER & NAVIGATION TABS */}
      <div className="play-header">
        <div>
          <div className="eyebrow">
            <Target size={15} /> {lang === 'te' ? 'సాధన & పరీక్షా వేదిక' : 'PRACTICE & EXAM SIMULATOR'}
          </div>
          <h1>{lang === 'te' ? 'సాధన రంగాస్థలం (Play Arena)' : 'Practice Arena'}</h1>
          <p>
            {lang === 'te'
              ? '33 అట్లాస్ టాపిక్ డ్రిల్స్, 8 ఛాప్టర్ బాస్ సవాళ్లు మరియు అధికారిక SSC CGL/CHSL పరీక్షల అనుకరణ.'
              : 'Master General Awareness with 33 topic drills, 8 epic chapter bosses, official mock exams, and rapid speed blitz.'}
          </p>
        </div>

        <div className="play-tabs">
          <button
            className={activeTab === 'drills' ? 'active' : ''}
            onClick={() => { setActiveTab('drills'); setActiveDrill(null); }}
          >
            <Target size={16} /> {lang === 'te' ? '33 అంశాల డ్రిల్స్' : '33 Topic Drills'}
          </button>
          <button
            className={activeTab === 'boss' ? 'active' : ''}
            onClick={() => { setActiveTab('boss'); setActiveBoss(null); }}
          >
            <Swords size={16} /> {lang === 'te' ? 'బాస్ సవాళ్లు (8)' : 'Chapter Bosses (8)'}
          </button>
          <button
            className={activeTab === 'exam' ? 'active' : ''}
            onClick={() => { setActiveTab('exam'); setExamState(null); }}
          >
            <ClipboardList size={16} /> {lang === 'te' ? 'పరీక్షా సిమ్యులేటర్' : 'Exam Simulator'}
          </button>
          <button
            className={activeTab === 'blitz' ? 'active' : ''}
            onClick={() => { setActiveTab('blitz'); setBlitzState(null); }}
          >
            <Zap size={16} /> {lang === 'te' ? '60s స్పీడ్ బ్లిట్జ్' : '60s Speed Blitz'}
          </button>
        </div>
      </div>

      {/* =========================================================
          TAB 1: TOPIC DRILLS (ALL 33 ATLAS TOPICS)
         ========================================================= */}
      {activeTab === 'drills' && (
        <div className="tab-pane-content">
          {!activeDrill ? (
            <div>
              {/* Category Filter Pills & Search */}
              <div className="drills-filter-bar">
                <div className="drills-search-wrap">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder={lang === 'te' ? '33 అంశాలలో వెతకండి (నదులు, నేలలు, దేవాలయాలు, ఉద్యానవనాలు)…' : 'Search any topic (Rivers, Soils, Peaks, Temples, Dynasties)...'}
                    value={drillSearch}
                    onChange={e => setDrillSearch(e.target.value)}
                  />
                  {drillSearch && (
                    <button
                      className="drills-search-clear"
                      onClick={() => setDrillSearch('')}
                      title="Clear search"
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                  <button
                    className="drills-search-btn"
                    onClick={() => {}}
                    title={lang === 'te' ? 'శోధన' : 'Search'}
                  >
                    <Search size={13} />
                    <span>{lang === 'te' ? 'వెతకండి' : 'Search'}</span>
                  </button>
                </div>

                <div className="category-pills-row">
                  {drillCategories.map(cat => (
                    <button
                      key={cat}
                      className={`cat-pill ${drillCategory === cat ? 'active' : ''}`}
                      onClick={() => setDrillCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 33 Topic Cards Grid with Visual Differentiation */}
              <div className="drills-grid">
                {filteredDrills.map(topic => {
                  const IconC = topic.icon;
                  return (
                    <div
                      key={topic.slug}
                      className="drill-card"
                      onClick={() => startTopicDrill(topic)}
                      style={{
                        borderTop: `4px solid ${topic.color}`,
                        borderColor: `${topic.color}35`,
                        background: `linear-gradient(to bottom, ${topic.color}0a, var(--card) 45%)`
                      }}
                    >
                      <div className="drill-top">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            className="drill-icon-box"
                            style={{
                              backgroundColor: topic.color + '18',
                              color: topic.color,
                              border: `1px solid ${topic.color}35`,
                              borderRadius: '8px',
                              padding: '5px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <IconC size={16} />
                          </span>
                          <span
                            className="drill-subj-tag"
                            style={{
                              backgroundColor: topic.color + '18',
                              color: topic.color,
                              border: `1px solid ${topic.color}35`,
                              fontWeight: 700
                            }}
                          >
                            {topic.category}
                          </span>
                        </div>
                        <span className="drill-q-count">{topic.qCount} {lang === 'te' ? 'ప్రశ్నలు' : 'Questions'}</span>
                      </div>

                      <h3 style={{ color: 'var(--text)', marginTop: '8px', marginBottom: '4px' }}>
                        {lang === 'te' && topic.titleTe ? topic.titleTe : topic.title}
                      </h3>
                      {lang === 'te' && (
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                          {topic.title}
                        </div>
                      )}
                      <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '16px' }}>
                        {topic.hasMap ? (lang === 'te' ? '🗺️ మ్యాప్ ఆధారిత క్విజ్' : '🗺️ 2D/3D Map Drill') : (lang === 'te' ? '⚡ కాన్సెప్ట్ రీకాల్ డ్రిల్' : '⚡ Concept Recall Drill')}
                      </p>

                      <div
                        className="drill-footer"
                        style={{
                          borderTopColor: 'var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '12px'
                        }}
                      >
                        <span
                          className="drill-btn"
                          style={{
                            color: topic.color,
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {lang === 'te' ? '10-ప్రశ్నల సాధన ప్రారంభించండి' : 'Start 10-Q Drill'} →
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            color: topic.color,
                            background: topic.color + '14',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          10 Qs
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ACTIVE DRILL SESSION SCREEN */
            <div className="active-drill-session">
              <div className="session-top-bar">
                <button
                  className="outline mini"
                  onClick={() => setActiveDrill(null)}
                >
                  ← {lang === 'te' ? 'అన్ని డ్రిల్స్‌కు తిరిగి వెళ్లండి' : 'Back to All Drills'}
                </button>
                <div className="session-title-tag">
                  <strong>{lang === 'te' && activeDrill.topic.titleTe ? activeDrill.topic.titleTe : activeDrill.topic.title}</strong>
                  <span className="tag-badge">10 Questions</span>
                </div>
                <div className="session-score-pill">
                  Score: {activeDrill.score} / {activeDrill.questions.length} · +10 XP
                </div>
              </div>

              {!activeDrill.isDone ? (
                <div className="drill-card-active">
                  <div className="dca-progress-bar">
                    <div
                      className="dca-progress-fill"
                      style={{ width: `${((activeDrill.currentIdx + 1) / activeDrill.questions.length) * 100}%` }}
                    />
                  </div>

                  <div className="dca-num-row">
                    <span>Question {activeDrill.currentIdx + 1} of {activeDrill.questions.length}</span>
                    <span className="source-label">SSC Verified Question</span>
                  </div>

                  <h2 className="dca-question">
                    {activeDrill.questions[activeDrill.currentIdx].question}
                  </h2>

                  <div className="dca-options-grid">
                    {activeDrill.questions[activeDrill.currentIdx].options.map((opt, oIdx) => {
                      const isSelected = activeDrill.selectedOpt === opt;
                      const isCorrect = opt === activeDrill.questions[activeDrill.currentIdx].correct;
                      let btnClass = 'dca-opt-btn';
                      if (activeDrill.selectedOpt !== null) {
                        if (isCorrect) btnClass += ' correct';
                        else if (isSelected) btnClass += ' incorrect';
                      }
                      return (
                        <button
                          key={oIdx}
                          className={btnClass}
                          onClick={() => handleDrillAnswer(opt)}
                          disabled={activeDrill.selectedOpt !== null}
                        >
                          <span className="opt-marker">{String.fromCharCode(65 + oIdx)}</span>
                          <span className="opt-val">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {activeDrill.selectedOpt !== null && (
                    <div className="dca-feedback-wrap">
                      <div className="feedback-text">
                        <strong>
                          {activeDrill.selectedOpt === activeDrill.questions[activeDrill.currentIdx].correct
                            ? '✓ Correct! +10 XP earned'
                            : `✗ Incorrect. Correct: ${activeDrill.questions[activeDrill.currentIdx].correct}`}
                        </strong>
                        <p>{activeDrill.questions[activeDrill.currentIdx].explanation}</p>
                      </div>
                      <button className="primary" onClick={handleNextDrillQuestion}>
                        {activeDrill.currentIdx + 1 < activeDrill.questions.length ? 'Next Question →' : 'View Drill Summary →'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* DRILL COMPLETE SUMMARY */
                <div className="drill-summary-card">
                  <Trophy size={48} color="#f59e0b" />
                  <h2>{lang === 'te' ? 'డ్రిల్ విజయవంతంగా పూర్తయింది!' : 'Topic Drill Completed!'}</h2>
                  <div className="summary-score-large">
                    {activeDrill.score} / {activeDrill.questions.length}
                  </div>
                  <p>
                    Accuracy: {((activeDrill.score / activeDrill.questions.length) * 100).toFixed(0)}% · XP Earned: +{activeDrill.score * 10} XP
                  </p>
                  <div className="summary-actions">
                    <button className="outline" onClick={() => startTopicDrill(activeDrill.topic)}>
                      <RotateCcw size={15} /> Retake Drill
                    </button>
                    <button className="primary" onClick={() => setActiveDrill(null)}>
                      Choose Another Topic →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 2: CHAPTER CHALLENGES (8 COMPREHENSIVE CHAPTERS)
         ========================================================= */}
      {activeTab === 'boss' && (
        <div className="tab-pane-content">
          {!activeBoss ? (
            <div className="boss-grid">
              {BOSS_BATTLES.map(boss => (
                <div key={boss.id} className="boss-card">
                  <div className="boss-head">
                    <span className="boss-avatar">{boss.avatar}</span>
                    <span className="boss-badge">CHAPTER MASTERY</span>
                    <span className="boss-subj">{boss.subject}</span>
                  </div>
                  <h3>{lang === 'te' && boss.titleTe ? boss.titleTe : boss.title}</h3>
                  <p className="boss-hook">"{boss.hook}"</p>
                  <div className="boss-meta">
                    <span>⚡ {boss.factsCount} High-Yield Pool</span>
                    <span>🎯 10 Targeted Questions</span>
                    <span>⭐ +15 XP / Question</span>
                  </div>
                  <button className="primary" onClick={() => startBossBattle(boss)}>
                    {lang === 'te' ? 'ఛాప్టర్ సాధన ప్రారంభించండి →' : 'Start Chapter Challenge →'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* ACTIVE CHAPTER MASTERY SESSION */
            <div className="boss-arena-card">
              <div className="boss-arena-hud">
                <div className="hud-player">
                  <span className="hud-label">PROGRESS & SCORE</span>
                  <div className="session-score-pill">
                    <strong>Score: {activeBoss.score} / {activeBoss.questions.length}</strong>
                    {activeBoss.streak > 1 && (
                      <span className="streak-tag">🔥 {activeBoss.streak} Streak!</span>
                    )}
                  </div>
                </div>

                <div className="hud-boss-info">
                  <span className="boss-arena-title">{activeBoss.boss.title}</span>
                  <div className="boss-hp-bar">
                    <div
                      className="boss-hp-fill"
                      style={{ width: `${((activeBoss.currentIdx + 1) / activeBoss.questions.length) * 100}%` }}
                    />
                  </div>
                  <small>Question {activeBoss.currentIdx + 1} of {activeBoss.questions.length}</small>
                </div>

                <button className="outline mini" onClick={() => setActiveBoss(null)}>
                  {lang === 'te' ? 'నిష్క్రమించు' : 'Exit Challenge'}
                </button>
              </div>

              {!activeBoss.isDone ? (
                <div className="boss-q-stage">
                  <div className="boss-q-num">
                    Question {activeBoss.currentIdx + 1} of {activeBoss.questions.length}
                  </div>
                  <h2>{activeBoss.questions[activeBoss.currentIdx].question}</h2>

                  <div className="dca-options-grid">
                    {activeBoss.questions[activeBoss.currentIdx].options.map((opt, oIdx) => {
                      let btnCls = 'dca-opt-btn';
                      if (activeBoss.selectedOpt !== null) {
                        if (opt === activeBoss.questions[activeBoss.currentIdx].correct) btnCls += ' correct';
                        else if (activeBoss.selectedOpt === opt) btnCls += ' wrong';
                      }
                      return (
                        <button
                          key={oIdx}
                          className={btnCls}
                          onClick={() => handleBossAnswer(opt)}
                          disabled={activeBoss.selectedOpt !== null}
                        >
                          <span className="opt-marker">{String.fromCharCode(65 + oIdx)}</span>
                          <span className="opt-val">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {activeBoss.selectedOpt !== null && (
                    <div className={`boss-feedback-row ${activeBoss.selectedOpt === activeBoss.questions[activeBoss.currentIdx].correct ? 'correct' : 'wrong'}`}>
                      <div>
                        <strong>
                          {activeBoss.selectedOpt === activeBoss.questions[activeBoss.currentIdx].correct
                            ? '✓ Correct! +15 XP'
                            : `✗ Incorrect · Correct: ${activeBoss.questions[activeBoss.currentIdx].correct}`}
                        </strong>
                        <p>{activeBoss.questions[activeBoss.currentIdx].explain}</p>
                      </div>
                      <button className="primary" onClick={handleNextBossQuestion}>
                        {activeBoss.currentIdx + 1 < activeBoss.questions.length
                          ? (lang === 'te' ? 'తదుపరి ప్రశ్న →' : 'Next Question →')
                          : (lang === 'te' ? 'ఫలితాలను చూడండి →' : 'View Results →')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="battle-outcome victory">
                  <Trophy size={54} color="#f59e0b" />
                  <h2>{lang === 'te' ? 'ఛాప్టర్ సాధన పూర్తయింది!' : 'Chapter Challenge Completed!'}</h2>
                  <p>
                    {lang === 'te'
                      ? `మీరు ${activeBoss.questions.length} ప్రశ్నలలో ${activeBoss.score} సరైన సమాధానాలు చెప్పారు (${Math.round((activeBoss.score / activeBoss.questions.length) * 100)}% ఖచ్చితత్వం). +${activeBoss.score * 15} XP సాధించారు!`
                      : `You answered ${activeBoss.score} out of ${activeBoss.questions.length} questions correctly (${Math.round((activeBoss.score / activeBoss.questions.length) * 100)}% accuracy). Earned +${activeBoss.score * 15} XP!`}
                  </p>

                  <div className="battle-review-list">
                    <h4>{lang === 'te' ? 'సమీక్ష & వివరణలు' : 'Review & Key Explanations'}</h4>
                    {activeBoss.answersHistory.map((item, hIdx) => (
                      <div key={hIdx} className={`review-item ${item.isCorrect ? 'correct' : 'wrong'}`}>
                        <div className="ri-q"><strong>Q{hIdx + 1}:</strong> {item.question}</div>
                        <div className="ri-ans">
                          <span className={item.isCorrect ? 'tag-correct' : 'tag-wrong'}>
                            {item.isCorrect ? '✓ Correct' : `✗ You chose: ${item.selected} | Answer: ${item.correct}`}
                          </span>
                        </div>
                        {item.explain && <div className="ri-exp">{item.explain}</div>}
                      </div>
                    ))}
                  </div>

                  <div className="battle-outcome-actions">
                    <button className="primary" onClick={() => startBossBattle(activeBoss.boss)}>
                      {lang === 'te' ? 'మళ్లీ ప్రయత్నించండి' : 'Practice Again'}
                    </button>
                    <button className="outline" onClick={() => setActiveBoss(null)}>
                      {lang === 'te' ? 'అన్ని ఛాప్టర్లు' : 'All Chapter Challenges'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 3: EXAM SIMULATOR (OFFICIAL SSC CGL / CHSL / RRB)
         ========================================================= */}
      {activeTab === 'exam' && (
        <div className="tab-pane-content">
          {!examState ? (
            <div className="exam-setup-card">
              <div className="setup-badge">OFFICIAL MOCK EXAM CONFIGURATOR</div>
              <h2>Select Official Exam Simulation Mode</h2>
              <p>Realistic examination environment with negative marking and countdown clock.</p>

              {/* Preset Cards */}
              <div className="exam-presets-grid">
                {[
                  { key: 'cgl', title: 'SSC CGL Tier-1 GA', q: 25, mins: 15, neg: -0.5, desc: 'Official 25-Question General Awareness Section' },
                  { key: 'chsl', title: 'SSC CHSL Tier-1 Mock', q: 25, mins: 15, neg: -0.5, desc: '10+2 Combined Higher Secondary Level' },
                  { key: 'rrb', title: 'RRB NTPC General Awareness', q: 20, mins: 12, neg: -0.33, desc: 'Railway Recruitment Board Standard Mock' },
                  { key: 'marathon', title: 'Grand 50-Q GA Marathon', q: 50, mins: 30, neg: -0.5, desc: 'Exhaustive Test Covering All 33 Atlas Topics' },
                  { key: 'sprint', title: 'Speed Sprint Drill', q: 10, mins: 5, neg: -0.25, desc: 'High-Speed 5-Minute Rapid Diagnostic' }
                ].map(p => (
                  <div
                    key={p.key}
                    className={`preset-card ${examSettings.preset === p.key ? 'selected' : ''}`}
                    onClick={() => applyPreset(p.key)}
                  >
                    <h4>{p.title}</h4>
                    <small>{p.desc}</small>
                    <div className="preset-meta">
                      <span>{p.q} Questions</span>
                      <span>{p.mins} Mins</span>
                      <span>{p.neg} Neg</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="start-btn-row">
                <button className="primary big glow-btn" onClick={startExam}>
                  Begin {examSettings.count}-Question Mock Examination →
                </button>
              </div>
            </div>
          ) : !examState.isDone ? (
            /* LIVE EXAM RUNNER */
            <div className="live-exam-workspace">
              <div className="exam-live-header">
                <div className="exam-timer-pill">
                  <Clock size={16} />
                  <span>
                    Time Left: {Math.floor(examState.remainingSeconds / 60)}:
                    {String(examState.remainingSeconds % 60).padStart(2, '0')}
                  </span>
                </div>
                <div className="exam-progress-info">
                  Question {examState.currentIndex + 1} of {examState.questions.length}
                </div>
                <button className="danger mini" onClick={submitExam}>
                  Submit Exam
                </button>
              </div>

              <div className="exam-two-col">
                {/* Left: Active Question */}
                <div className="exam-question-col">
                  <h3 className="exam-q-text">
                    {examState.questions[examState.currentIndex].question}
                  </h3>

                  <div className="dca-options-grid">
                    {examState.questions[examState.currentIndex].options.map((opt, oIdx) => {
                      const isChosen = examState.answers[examState.currentIndex] === opt;
                      return (
                        <button
                          key={oIdx}
                          className={`dca-opt-btn ${isChosen ? 'selected' : ''}`}
                          onClick={() => {
                            setExamState(prev => ({
                              ...prev,
                              answers: { ...prev.answers, [prev.currentIndex]: opt }
                            }));
                          }}
                        >
                          <span className="opt-marker">{String.fromCharCode(65 + oIdx)}</span>
                          <span className="opt-val">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="exam-nav-actions">
                    <button
                      className="outline mini"
                      onClick={() => {
                        setExamState(prev => ({
                          ...prev,
                          answers: { ...prev.answers, [prev.currentIndex]: undefined }
                        }));
                      }}
                    >
                      Clear Response
                    </button>
                    <button
                      className="primary mini"
                      onClick={() => {
                        if (examState.currentIndex + 1 < examState.questions.length) {
                          setExamState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
                        }
                      }}
                    >
                      Save & Next →
                    </button>
                  </div>
                </div>

                {/* Right: Question Navigation Palette */}
                <div className="exam-palette-col">
                  <h4>Question Palette</h4>
                  <div className="palette-grid">
                    {examState.questions.map((_, idx) => {
                      const isAnswered = examState.answers[idx] !== undefined;
                      const isCurrent = examState.currentIndex === idx;
                      let pClass = 'palette-btn';
                      if (isCurrent) pClass += ' current';
                      if (isAnswered) pClass += ' answered';
                      return (
                        <button
                          key={idx}
                          className={pClass}
                          onClick={() => setExamState(prev => ({ ...prev, currentIndex: idx }))}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* EXAM FINAL SCORECARD */
            <div className="exam-scorecard-card">
              <Trophy size={48} color="#f59e0b" />
              <h2>Examination Submitted</h2>
              <div className="scorecard-stats-grid">
                <div className="sc-box">
                  <span className="sc-lbl">Total Questions</span>
                  <strong>{examState.questions.length}</strong>
                </div>
                <div className="sc-box">
                  <span className="sc-lbl">Attempted</span>
                  <strong>{Object.keys(examState.answers).filter(k => examState.answers[k] !== undefined).length}</strong>
                </div>
                <div className="sc-box">
                  <span className="sc-lbl">Correct Answers</span>
                  <strong style={{ color: '#10b981' }}>
                    {examState.questions.filter((q, i) => examState.answers[i] === q.correct).length}
                  </strong>
                </div>
              </div>

              <div className="summary-actions">
                <button className="primary" onClick={() => setExamState(null)}>
                  Start New Mock Exam
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 4: 60-SECOND SPEED BLITZ
         ========================================================= */}
      {activeTab === 'blitz' && (
        <div className="tab-pane-content">
          {!blitzState ? (
            <div className="blitz-intro-card">
              <Zap size={48} color="#f59e0b" />
              <h2>60-Second Speed Recall Blitz</h2>
              <p>How many General Awareness questions can you answer in 60 seconds?</p>
              <button className="primary big glow-btn" onClick={startBlitz}>
                Start 60s Challenge →
              </button>
            </div>
          ) : !blitzState.isDone ? (
            <div className="blitz-active-card">
              <div className="blitz-timer-bar">
                <span className="blitz-time">{blitzState.secondsLeft}s Remaining</span>
                <span className="blitz-score">Score: {blitzState.score}</span>
              </div>

              <h2 className="blitz-q">
                {blitzState.questions[blitzState.currentIdx].question}
              </h2>

              <div className="dca-options-grid">
                {blitzState.questions[blitzState.currentIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    className="dca-opt-btn"
                    onClick={() => handleBlitzAnswer(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="blitz-summary-card">
              <Trophy size={48} color="#f59e0b" />
              <h2>Blitz Time's Up!</h2>
              <div className="summary-score-large">{blitzState.score} Correct</div>
              <p>Attempted {blitzState.attempted} in 60 seconds. +{blitzState.score * 10} XP earned!</p>
              <button className="primary" onClick={startBlitz}>
                Play Another Blitz →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
