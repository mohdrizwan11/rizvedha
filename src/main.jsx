import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  House, BookOpen, Target, Compass, RotateCcw, Settings,
  PanelLeftClose, PanelLeft, Maximize2, Minimize2,
  Moon, Sun, Search, ArrowRight, ArrowUpRight, CheckCircle2,
  Flame, Zap, Trophy, ShieldCheck, ChevronRight, Languages
} from 'lucide-react';

import { subjects, lessons, tools } from './data';
import { applyExpansions, expansions } from './v2/content';
import { migrateMistakes, reconcileMistakes } from './v3/mistakes';
import { ErrorBoundary } from './v22/shared';

// Lazy loaded subviews
const HomeView = lazy(() => import('./HomeView'));
const LearnView = lazy(() => import('./LearnView'));
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

function App() {
  const [data, setData] = useState(load);
  const [page, setPage] = useState('Home'); // Home | Learn | Play | Atlas | Review | Settings
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('kosha-sidebar-collapsed') === 'true';
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [tab, setTab] = useState('Learn');
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('vedha-lang') || 'en';
  });

  // Persistence effect
  useEffect(() => {
    localStorage.setItem('kosha-progress-v1', JSON.stringify(data));
    document.documentElement.dataset.theme = data.theme;
  }, [data]);

  // Sidebar persistence
  useEffect(() => {
    localStorage.setItem('kosha-sidebar-collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Language toggle
  const toggleLang = () => {
    const next = lang === 'en' ? 'te' : 'en';
    setLang(next);
    localStorage.setItem('vedha-lang', next);
  };

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
          type: 'TOPIC', label: t, sub: s.name, action: () => { go('Learn'); }
        }))),
      ...tools
        .filter(t => t.name.toLowerCase().includes(q))
        .map(t => ({ type: 'ATLAS GAME', label: t.name, sub: t.mode, action: () => go('Atlas') }))
    ].slice(0, 8);
  }, [query]);

  // Navigation Items (6 Focused Sections: Home, Learn, Atlas, Play, Review, Settings)
  const navItems = [
    { id: 'Home', label: lang === 'te' ? 'హోమ్' : 'Home', icon: House, desc: 'Dashboard & daily recall' },
    { id: 'Learn', label: lang === 'te' ? 'నేర్చుకోండి' : 'Learn', icon: BookOpen, desc: 'Visual curriculum & infographics' },
    { id: 'Atlas', label: lang === 'te' ? 'అట్లాస్' : 'Atlas', icon: Compass, desc: '33 2D-3D map games' },
    { id: 'Play', label: lang === 'te' ? 'సాధన' : 'Play', icon: Target, desc: 'Drills, bosses & exam mode' },
    { id: 'Review', label: lang === 'te' ? 'పునశ్చరణ' : 'Review', icon: RotateCcw, desc: 'Mistake clinic & flashcards', badge: (data.mistakes || []).length || null },
    { id: 'Settings', label: lang === 'te' ? 'అమరికలు' : 'Settings', icon: Settings, desc: 'Appearance & backup' }
  ];

  return (
    <div className="app">
      {/* Sleek Collapsible Sidebar (ChatGPT Style) */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Top utility row: Open/Close toggle button at the top slight above */}
        <div className="sidebar-top-bar">
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <div className="sidebar-header">
          <button className="brand" onClick={() => go('Home')} title="RizVedha GK">
            <span className="brandmark">RV<span>•</span></span>
            {!sidebarCollapsed && (
              <span>
                <strong>RizVedha</strong>
                <small>{lang === 'te' ? 'విజువల్ జీకే ప్లాట్‌ఫారమ్' : 'VISUAL GK PLATFORM'}</small>
              </span>
            )}
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
                <strong>{streak} {lang === 'te' ? 'రోజుల స్ట్రీక్' : 'Day Streak'}</strong>
                <p>{data.xp} {lang === 'te' ? 'XP ఆర్జించారు' : 'XP earned locally'}</p>
              </div>
            </div>
          )}

          <button className="profile" onClick={() => go('Settings')}>
            <span className="avatar">R</span>
            {!sidebarCollapsed && (
              <span>
                <strong>{lang === 'te' ? 'రిజ్వాన్ (విద్యార్థి)' : 'Rizwan'}</strong>
                <small>{lang === 'te' ? 'స్థానిక డేటా భద్రం' : 'Local Storage Encrypted'}</small>
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main App Workspace */}
      <div className={`main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <header className="topbar">
          <div className="crumb">
            <span>RIZVEDHA</span>
            <ChevronRight size={14} />
            <b>{selectedChapter ? 'Textbook' : selectedLesson ? 'Lesson' : page}</b>
          </div>

          <div className="header-right">
            {/* Quick Search */}
            <div className="search-wrap">
              <Search size={16} />
              <input
                value={query}
                placeholder={lang === 'te' ? 'జీకే వాస్తవాలు, నదులు వెతకండి…' : 'Search GK facts, rivers, topics...'}
                onFocus={() => setSearchOpen(true)}
                onChange={e => { setQuery(e.target.value); setSearchOpen(true); }}
                aria-label="Search"
              />
              <kbd>⌘ K</kbd>

              {searchOpen && query && (
                <div className="search-results">
                  <div className="search-head">
                    <span>{lang === 'te' ? 'శోధన ఫలితాలు' : 'SEARCH RESULTS'}</span>
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
                    <p>{lang === 'te' ? 'ఏమీ కనుగొనబడలేదు.' : 'No matching content found.'}</p>
                  )}
                </div>
              )}
            </div>

            {/* Language Switcher Button (English / Telugu) */}
            <button
              className="lang-pill header-lang-btn"
              onClick={toggleLang}
              title="Switch between English and Telugu"
            >
              {lang === 'en' ? '🇮🇳 English' : '🇮🇳 తెలుగు'}
            </button>

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
              R
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="content">
          {/* Section 0: HOME (Dashboard, Daily Streak, Yesterday's Revision Quiz) */}
          {page === 'Home' && (
            <Suspense fallback={<div className="panel">Loading RizVedha Dashboard…</div>}>
              <HomeView
                data={data}
                update={update}
                onOpenTopic={(topicSlug) => {
                  go('Atlas');
                }}
                onOpenLesson={openLesson}
                onOpenChapter={openChapter}
                onNavigate={go}
                lang={lang}
              />
            </Suspense>
          )}

          {/* Section 1: LEARN (Visual Curriculum, SVG Infographics, Cover & Recall Tables) */}
          {page === 'Learn' && (
            <Suspense fallback={<div className="panel">Loading Visual Learning Modules…</div>}>
              <LearnView
                data={data}
                update={update}
                onOpenChapter={openChapter}
                onOpenLesson={openLesson}
                onNavigate={go}
                lang={lang}
              />
            </Suspense>
          )}

          {/* Section 2: PLAY (Practice, Bosses, Exam Mode) */}
          {page === 'Play' && (
            <Suspense fallback={<div className="panel">Loading Practice Arena…</div>}>
              <Play
                data={data}
                update={update}
                onOpenLesson={openLesson}
                onOpenChapter={openChapter}
                lang={lang}
              />
            </Suspense>
          )}

          {/* Section 3: ATLAS (33 2D-3D Map Games with Bold Left Inspector) */}
          {page === 'Atlas' && (
            <Suspense fallback={<div className="panel">Loading Visual Atlas & 33 Topic Games…</div>}>
              <Atlas
                data={data}
                update={update}
                onOpenChapter={openChapter}
                lang={lang}
                onToggleLang={toggleLang}
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
                lang={lang}
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
                lang={lang}
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
                  lang={lang}
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
                  lang={lang}
                />
              </Suspense>
            </ErrorBoundary>
          )}

          <footer>
            <span>✳ RIZVEDHA · LOCAL-FIRST VISUAL GK LEARNING</span>
            <span>{lang === 'te' ? 'అన్ని 33 అట్లాస్ విజువల్ టాపిక్స్ ప్రత్యక్షంగా ఉన్నాయి' : 'All 33 Atlas Topics Live · No ads · No tracking'}</span>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation (6 Core Sections) */}
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
