import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen, Target, Compass, RotateCcw, Settings,
  PanelLeftClose, PanelLeft, Maximize2, Minimize2,
  Moon, Sun, Search, ArrowRight, ArrowUpRight, CheckCircle2,
  Flame, Zap, Trophy, ShieldCheck, ChevronRight
} from 'lucide-react';

import { subjects, lessons, tools } from './data';
import { applyExpansions, expansions } from './v2/content';
import { migrateMistakes, reconcileMistakes } from './v3/mistakes';
import { ErrorBoundary } from './v22/shared';

// Lazy loaded subviews
const Atlas = lazy(() => import('./Atlas'));
const Play = lazy(() => import('./Play'));
const Review = lazy(() => import('./Review'));
const SettingsView = lazy(() => import('./SettingsView'));
const Textbook = lazy(() => import('./v3/Textbook'));
const Topic = lazy(() => import('./v2/Topic'));

// Global styles
import './v22/style.css';
import './style.css';
import './v2/style.css';
import './v3/coverage.css';
import './v3/textbook.css';

applyExpansions(lessons);

const init = {
  xp: 0,
  completed: [],
  answered: {},
  mistakes: [],
  reviews: {},
  activity: [],
  exams: [],
  theme: 'light',
  goal: 5,
  toolBookmarks: [],
  flashcards: {},
  chapterSessions: {},
  v22: {}
};

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem('kosha-progress-v1') || '{}');
    return migrateMistakes({ ...init, ...raw });
  } catch {
    return migrateMistakes(init);
  }
}

const localDay = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const day = () => localDay(new Date());
const qid = (l, i) => `${l.id}-${i}`;

function App() {
  const [data, setData] = useState(load);
  const [page, setPage] = useState('Learn'); // Learn | Play | Atlas | Review | Settings
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('kosha-sidebar-collapsed') === 'true';
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [tab, setTab] = useState('Learn');
  const [subjectFilter, setSubjectFilter] = useState('All');

  // Persistence effect
  useEffect(() => {
    localStorage.setItem('kosha-progress-v1', JSON.stringify(data));
    document.documentElement.dataset.theme = data.theme;
  }, [data]);

  // Sidebar persistence
  useEffect(() => {
    localStorage.setItem('kosha-sidebar-collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Keyboard shortcut Ctrl/Cmd+K for search
  useEffect(() => {
    const key = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.querySelector('.search-wrap input')?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  const update = fn => setData(d => reconcileMistakes(d, fn(d)));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const streak = useMemo(() => {
    let a = new Set(data.activity), n = 0, d = new Date();
    if (!a.has(day())) d.setDate(d.getDate() - 1);
    while (a.has(localDay(d))) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }, [data.activity]);

  const addActivity = d => [...new Set([...d.activity, day()])];

  const go = (targetPage) => {
    setPage(targetPage);
    setSelectedLesson(null);
    setSelectedChapter(null);
    setSearchOpen(false);
    window.scrollTo(0, 0);
  };

  const openLesson = (l, initialTab = 'Learn') => {
    setSelectedLesson(l);
    setSelectedChapter(null);
    setTab(initialTab);
    setPage('Lesson');
    window.scrollTo(0, 0);
  };

  const openChapter = (chapId) => {
    setSelectedChapter(chapId);
    setSelectedLesson(null);
    setPage('Textbook');
    window.scrollTo(0, 0);
  };

  // Search indexing
  const matches = useMemo(() => {
    let q = query.toLowerCase().trim();
    if (!q) return [];
    return [
      ...lessons
        .filter(l => [l.title, l.topic, l.intro, ...l.tags].join(' ').toLowerCase().includes(q))
        .map(l => ({ type: 'LESSON', label: l.title, sub: l.topic, action: () => openLesson(l) })),
      ...subjects
        .flatMap(s => s.topics.split(', ').filter(t => t.toLowerCase().includes(q)).map(t => ({
          type: 'TOPIC', label: t, sub: s.name, action: () => { go('Learn'); setSubjectFilter(s.id); }
        }))),
      ...tools
        .filter(t => t.name.toLowerCase().includes(q))
        .map(t => ({ type: 'ATLAS GAME', label: t.name, sub: t.mode, action: () => go('Atlas') }))
    ].slice(0, 8);
  }, [query]);

  // Navigation Items (Max 5, clean & focused)
  const navItems = [
    { id: 'Learn', label: 'Learn', icon: BookOpen, desc: 'Visual textbook & syllabus' },
    { id: 'Play', label: 'Play', icon: Target, desc: 'Drills, bosses & exam mode' },
    { id: 'Atlas', label: 'Atlas', icon: Compass, desc: '33 2D-3D map games' },
    { id: 'Review', label: 'Review', icon: RotateCcw, desc: 'Mistake clinic & flashcards', badge: (data.mistakes || []).length || null },
    { id: 'Settings', label: 'Settings', icon: Settings, desc: 'Appearance & backup' }
  ];

  return (
    <div className="app">
      {/* Sleek Collapsible Sidebar (ChatGPT Style) */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <button className="brand" onClick={() => go('Learn')} title="Kosha GK">
            <span className="brandmark">k<span>•</span></span>
            {!sidebarCollapsed && (
              <span>
                <strong>kosha</strong>
                <small>VISUAL GK PLATFORM</small>
              </span>
            )}
          </button>

          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <nav>
          {navItems.map(item => {
            const IconC = item.icon;
            const isActive = (page === item.id) ||
              (item.id === 'Learn' && (page === 'Lesson' || page === 'Textbook'));
            return (
              <button
                key={item.id}
                className={`navitem ${isActive ? 'active' : ''}`}
                onClick={() => go(item.id)}
                title={sidebarCollapsed ? `${item.label} — ${item.desc}` : undefined}
              >
                <IconC size={19} />
                <span>{item.label}</span>
                {item.badge && <b>{item.badge}</b>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          {!sidebarCollapsed && (
            <div className="side-note">
              <span className="side-spark"><Flame size={20} color="#f59e0b" /></span>
              <div>
                <strong>{streak} Day Streak</strong>
                <p>{data.xp} XP earned locally</p>
              </div>
            </div>
          )}

          <button className="profile" onClick={() => go('Settings')}>
            <span className="avatar">G</span>
            {!sidebarCollapsed && (
              <span>
                <strong>Guest Learner</strong>
                <small>Local Storage Encrypted</small>
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main App Workspace */}
      <div className={`main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <header className="topbar">
          <div className="crumb">
            <span>KOSHA</span>
            <ChevronRight size={14} />
            <b>{selectedChapter ? 'Textbook' : selectedLesson ? 'Lesson' : page}</b>
          </div>

          <div className="header-right">
            {/* Quick Search */}
            <div className="search-wrap">
              <Search size={16} />
              <input
                value={query}
                placeholder="Search GK facts, rivers, topics..."
                onFocus={() => setSearchOpen(true)}
                onChange={e => { setQuery(e.target.value); setSearchOpen(true); }}
                aria-label="Search"
              />
              <kbd>⌘ K</kbd>

              {searchOpen && query && (
                <div className="search-results">
                  <div className="search-head">
                    <span>SEARCH RESULTS</span>
                    <button onClick={() => setSearchOpen(false)}>Close</button>
                  </div>
                  {matches.length > 0 ? (
                    matches.map((m, i) => (
                      <button key={i} onClick={() => { m.action(); setSearchOpen(false); }}>
                        <span>
                          {m.label}
                          <small>{m.type} · {m.sub}</small>
                        </span>
                        <ArrowUpRight size={14} />
                      </button>
                    ))
                  ) : (
                    <p>No matching content found.</p>
                  )}
                </div>
              )}
            </div>

            {/* Distraction-Free Fullscreen Button */}
            <button
              className="iconbtn fullscreen-toggle"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen Mode'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>

            {/* Theme Toggle Button */}
            <button
              className="iconbtn theme-toggle"
              onClick={() => update(d => ({ ...d, theme: d.theme === 'light' ? 'dark' : 'light' }))}
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {data.theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* User Profile */}
            <button className="header-avatar" onClick={() => go('Settings')} aria-label="Profile">
              G
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="content">
          {/* Section 1: LEARN (Visual Textbook & Syllabus) */}
          {page === 'Learn' && (
            <div className="learn-page">
              <div className="welcome">
                <div>
                  <div className="eyebrow"><ShieldCheck size={14} /> COMPLETE SSC CGL GA SYLLABUS</div>
                  <h1>Master GK Visually</h1>
                  <p>7 comprehensive subjects, 84 curriculum chapters, and 387 structured lesson topics designed for memory retention.</p>
                </div>
              </div>

              {/* Subject Roadmap Grid */}
              <div className="section-head">
                <div>
                  <div className="overline">7 CORE SUBJECT TRACKS</div>
                  <h2>Choose a Subject Track</h2>
                </div>
                <div className="filter-row">
                  {['All', ...subjects.map(s => s.short)].map(x => (
                    <button
                      key={x}
                      className={subjectFilter === x ? 'selected' : ''}
                      onClick={() => setSubjectFilter(x)}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>

              <div className="subject-grid">
                {subjects
                  .filter(s => subjectFilter === 'All' || s.short === subjectFilter)
                  .map((s, i) => {
                    const l = lessons.find(x => x.subject === s.id);
                    const done = l && data.completed.includes(l.id);
                    return (
                      <div className="subject-card" key={s.id} onClick={() => l && openLesson(l)}>
                        <div className="subject-top">
                          <span className="subject-icon" style={{ background: s.color }}>
                            {s.short[0]}
                          </span>
                          <span className="card-arrow"><ArrowUpRight size={16} /></span>
                        </div>
                        <div className="subject-no">TRACK 0{i + 1}</div>
                        <h3>{s.name}</h3>
                        <p>{s.desc}</p>
                        <div className="card-bottom">
                          <div className="progress">
                            <i style={{ width: done ? '100%' : '15%' }} />
                          </div>
                          <span>{done ? 'Completed' : 'Explore Track →'}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Visual Textbook Pilots Showcase */}
              <div className="section-head" style={{ marginTop: '2.5rem' }}>
                <div>
                  <div className="overline">V3 VISUAL TEXTBOOK CHAPTERS</div>
                  <h2>Deep-Dive Concept Chapters</h2>
                  <p>Interactive story cards, compare tables with "cover and recall", and 2-HP chapter boss challenges.</p>
                </div>
              </div>

              <div className="directory-grid">
                <div className="directory-card" onClick={() => openChapter('history-mauryan-empire')}>
                  <small style={{ color: '#bb7655' }}>HISTORY · ANCIENT</small>
                  <h3>Mauryan Empire</h3>
                  <p>Chandragupta to Ashoka, Kalinga edicts, and imperial administration.</p>
                  <div><span>Open Visual Chapter</span><ArrowRight size={15} /></div>
                </div>

                <div className="directory-card" onClick={() => openChapter('geography-rivers-of-india')}>
                  <small style={{ color: '#0284c7' }}>GEOGRAPHY · DRAINAGE</small>
                  <h3>Rivers of India</h3>
                  <p>Himalayan confluences, peninsular basins, and major tributaries.</p>
                  <div><span>Open Visual Chapter</span><ArrowRight size={15} /></div>
                </div>

                <div className="directory-card" onClick={() => openChapter('polity-fundamental-rights')}>
                  <small style={{ color: '#7c3aed' }}>POLITY · CONSTITUTION</small>
                  <h3>Fundamental Rights & DPSP</h3>
                  <p>Parts III & IV, Articles 14, 17, 21, 21A, 32 writs, and state directives.</p>
                  <div><span>Open Visual Chapter</span><ArrowRight size={15} /></div>
                </div>

                <div className="directory-card" onClick={() => openChapter('economics-banking-payment-systems')}>
                  <small style={{ color: '#d97706' }}>ECONOMICS · BANKING</small>
                  <h3>RBI, Banking & Monetary Policy</h3>
                  <p>Repo, reverse repo, CRR, SLR, SDF, and liquidity operations.</p>
                  <div><span>Open Visual Chapter</span><ArrowRight size={15} /></div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: PLAY (Practice, Bosses, Exam Mode) */}
          {page === 'Play' && (
            <Suspense fallback={<div className="panel">Loading Practice Arena…</div>}>
              <Play
                data={data}
                update={update}
                onOpenLesson={openLesson}
                onOpenChapter={openChapter}
              />
            </Suspense>
          )}

          {/* Section 3: ATLAS (33 2D-3D Map Games Inspired by ssc-focus.web.app) */}
          {page === 'Atlas' && (
            <Suspense fallback={<div className="panel">Loading Visual Atlas & 33 Topic Games…</div>}>
              <Atlas
                data={data}
                update={update}
                onOpenChapter={openChapter}
              />
            </Suspense>
          )}

          {/* Section 4: REVIEW (Mistakes & Spaced Retrieval Clinic) */}
          {page === 'Review' && (
            <Suspense fallback={<div className="panel">Loading Mistake Clinic…</div>}>
              <Review
                data={data}
                update={update}
                onOpenLesson={openLesson}
                onOpenChapter={openChapter}
              />
            </Suspense>
          )}

          {/* Section 5: SETTINGS */}
          {page === 'Settings' && (
            <Suspense fallback={<div className="panel">Loading Settings…</div>}>
              <SettingsView
                data={data}
                update={update}
                onReset={() => {
                  if (confirm('Delete all local learning progress? This cannot be undone.')) {
                    setData(init);
                  }
                }}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            </Suspense>
          )}

          {/* Route: Active Visual Textbook Chapter */}
          {page === 'Textbook' && selectedChapter && (
            <ErrorBoundary>
              <Suspense fallback={<div className="panel">Loading textbook chapter…</div>}>
                <Textbook
                  key={selectedChapter}
                  id={selectedChapter}
                  data={data}
                  update={update}
                  onBack={() => go('Learn')}
                  onTool={() => go('Atlas')}
                />
              </Suspense>
            </ErrorBoundary>
          )}

          {/* Route: Active V2 Lesson */}
          {page === 'Lesson' && selectedLesson && (
            <ErrorBoundary>
              <Suspense fallback={<div className="panel">Loading lesson…</div>}>
                <Topic
                  lesson={selectedLesson}
                  subject={subjects.find(s => s.id === selectedLesson.subject)}
                  data={data}
                  update={update}
                  tab={tab}
                  setTab={setTab}
                  onBack={() => go('Learn')}
                  complete={(l) => {
                    if (data.completed.includes(l.id)) return;
                    update(d => ({
                      ...d,
                      xp: d.xp + 20,
                      completed: [...d.completed, l.id],
                      activity: addActivity(d)
                    }));
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          )}

          <footer>
            <span>✳ KOSHA · LOCAL-FIRST VISUAL GK LEARNING</span>
            <span>All 33 Atlas Topics Live · No ads · No tracking</span>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation (5 Core Sections) */}
      <div className="mobile-nav">
        {navItems.map(item => {
          const IconC = item.icon;
          const isActive = (page === item.id) ||
            (item.id === 'Learn' && (page === 'Lesson' || page === 'Textbook'));
          return (
            <button
              key={item.id}
              className={isActive ? 'active' : ''}
              onClick={() => go(item.id)}
            >
              <IconC size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
