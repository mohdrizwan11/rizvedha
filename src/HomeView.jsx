import React from 'react';
import {
  Flame, Zap, Trophy, Target, BookOpen, Compass, RotateCcw,
  ArrowRight, CheckCircle2, AlertCircle, PlayCircle, Clock, Sparkles
} from 'lucide-react';
import { lessons } from './data';
import { ATLAS_TOPICS } from './Atlas';

export default function HomeView({
  data,
  update,
  onOpenTopic,
  onOpenLesson,
  onOpenChapter,
  onNavigate,
  lang = 'en'
}) {
  const streak = data.activity ? data.activity.length : 1;
  const xp = data.xp || 0;
  const goal = data.goal || 5;
  const completedLessons = data.completed || [];
  const mistakesCount = (data.mistakes || []).length;

  // Find yesterday's / last studied topic
  const lastLessonId = completedLessons.length > 0 ? completedLessons[completedLessons.length - 1] : 'rivers';
  const lastLesson = lessons.find(l => l.id === lastLessonId) || lessons[0];

  return (
    <div className="home-dashboard">
      {/* 1. TOP HERO: YESTERDAY'S REVISION & DAILY RECALL BANNER */}
      <div className="daily-recall-hero">
        <div className="drh-left">
          <div className="drh-badge">
            <Sparkles size={14} /> {lang === 'te' ? 'నిన్నటి పునశ్చరణ క్విజ్' : "YESTERDAY'S REVISION QUIZ"}
          </div>
          <h2>
            {lang === 'te'
              ? `${lastLesson.topic} పై 3 నిమిషాల క్విజ్ తీసుకోండి`
              : `Review ${lastLesson.topic} with a 3-min Recall Quiz`}
          </h2>
          <p>
            {lang === 'te'
              ? 'నిన్న నేర్చుకున్న అంశాలను పునశ్చరణ చేయడం వల్ల దీర్ఘకాలిక జ్ఞాపకశక్తి 80% పెరుగుతుంది.'
              : 'Testing concepts within 24 hours reinforces synaptic connections and prevents memory decay.'}
          </p>

          <div className="drh-actions">
            <button
              className="primary big glow-btn"
              onClick={() => onOpenLesson(lastLesson, 'Play')}
            >
              <PlayCircle size={18} /> {lang === 'te' ? 'క్విజ్ ప్రారంభించండి' : 'Start Revision Quiz (5 Qs)'}
            </button>
            <button
              className="outline big"
              onClick={() => onNavigate('Review')}
            >
              <RotateCcw size={17} /> {lang === 'te' ? '10-నిమిషాల పూర్తి రీకాల్' : '10-Min Interleaved Run'}
            </button>
          </div>
        </div>

        <div className="drh-stats-hud">
          <div className="hud-card">
            <span className="hud-icon"><Flame size={20} color="#f97316" /></span>
            <div>
              <b className="hud-val">{streak}</b>
              <small className="hud-lbl">{lang === 'te' ? 'రోజుల స్ట్రీక్' : 'Day Streak'}</small>
            </div>
          </div>

          <div className="hud-card">
            <span className="hud-icon"><Zap size={20} color="#eab308" /></span>
            <div>
              <b className="hud-val">{xp}</b>
              <small className="hud-lbl">{lang === 'te' ? 'మొత్తం XP' : 'Total XP'}</small>
            </div>
          </div>

          <div className="hud-card">
            <span className="hud-icon"><CheckCircle2 size={20} color="#10b981" /></span>
            <div>
              <b className="hud-val">{completedLessons.length}</b>
              <small className="hud-lbl">{lang === 'te' ? 'పూర్తయిన పాఠాలు' : 'Completed'}</small>
            </div>
          </div>

          <div className="hud-card">
            <span className="hud-icon"><AlertCircle size={20} color="#ef4444" /></span>
            <div>
              <b className="hud-val">{mistakesCount}</b>
              <small className="hud-lbl">{lang === 'te' ? 'సమీక్షించాల్సినవి' : 'In Review'}</small>
            </div>
          </div>
        </div>
      </div>

      {/* 2. WEEKLY GOAL STRIP */}
      <div className="weekly-target-strip">
        <div className="wt-info">
          <b>{lang === 'te' ? 'వారపు అధ్యయన లక్ష్యం' : 'Weekly Study Target'}</b>
          <span>{Math.min(streak, goal)} / {goal} {lang === 'te' ? 'రోజులు పూర్తయ్యాయి' : 'days active this week'}</span>
        </div>
        <div className="wt-progress-bar">
          <div
            className="wt-progress-fill"
            style={{ width: `${Math.min(100, (Math.min(streak, goal) / goal) * 100)}%` }}
          />
        </div>
      </div>

      {/* 3. CONTINUE LEARNING (RESUME SHELF) */}
      <div className="dashboard-section">
        <div className="section-head">
          <div>
            <div className="overline">{lang === 'te' ? 'మీ అభ్యాసాన్ని కొనసాగించండి' : 'PICK UP WHERE YOU LEFT OFF'}</div>
            <h2>{lang === 'te' ? 'సిఫార్సు చేయబడిన పాఠాలు' : 'Resume Your Learning Path'}</h2>
          </div>
          <button className="text-link" onClick={() => onNavigate('Learn')}>
            {lang === 'te' ? 'అన్ని పాఠాలు చూడండి' : 'View full curriculum'} <ArrowRight size={15} />
          </button>
        </div>

        <div className="resume-grid">
          <div className="resume-card" onClick={() => onOpenChapter('history-mauryan-empire')}>
            <span className="resume-tag history">HISTORY</span>
            <h3>{lang === 'te' ? 'మౌర్య సామ్రాజ్యం' : 'Mauryan Empire'}</h3>
            <p>{lang === 'te' ? 'చంద్రగుప్తుడు నుండి అశోకుడు, శిలాశాసనాలు మరియు పరిపాలన.' : 'From Chandragupta to Ashoka, rock edicts, and imperial statecraft.'}</p>
            <div className="resume-footer">
              <span>{lang === 'te' ? 'ఇన్ఫోగ్రాఫిక్స్ & బాస్ క్విజ్' : 'Infographics & 2-HP Boss'}</span>
              <span className="go-btn">{lang === 'te' ? 'చదవండి →' : 'Resume Chapter →'}</span>
            </div>
          </div>

          <div className="resume-card" onClick={() => onOpenChapter('geography-rivers-of-india')}>
            <span className="resume-tag geography">GEOGRAPHY</span>
            <h3>{lang === 'te' ? 'భారతదేశ నదులు' : 'Rivers of India'}</h3>
            <p>{lang === 'te' ? 'హిమాలయ మరియు ద్వీపకల్ప నదీ వ్యవస్థలు, సంగమాలు మరియు ఉపనదులు.' : 'Himalayan & Peninsular drainage systems, confluences, and tributaries.'}</p>
            <div className="resume-footer">
              <span>{lang === 'te' ? 'నదీ మార్గాల మ్యాప్' : 'Vector Flow Atlas'}</span>
              <span className="go-btn">{lang === 'te' ? 'చదవండి →' : 'Resume Chapter →'}</span>
            </div>
          </div>

          <div className="resume-card" onClick={() => onOpenChapter('polity-fundamental-rights')}>
            <span className="resume-tag polity">POLITY</span>
            <h3>{lang === 'te' ? 'ప్రాథమిక హక్కులు & ఆదేశిక సూత్రాలు' : 'Fundamental Rights & DPSP'}</h3>
            <p>{lang === 'te' ? 'భాగం III & IV, అధికరణలు 14, 19, 21, 32 రిట్లు.' : 'Part III & IV, Articles 14, 19, 21, and Article 32 constitutional writs.'}</p>
            <div className="resume-footer">
              <span>{lang === 'te' ? 'రాజ్యాంగ ఇన్ఫోగ్రాఫిక్' : 'Constitutional Visuals'}</span>
              <span className="go-btn">{lang === 'te' ? 'చదవండి →' : 'Resume Chapter →'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. EXPLORE 33 ATLAS TOPIC GAMES SHORTCUT */}
      <div className="dashboard-section" style={{ marginTop: '2.5rem' }}>
        <div className="section-head">
          <div>
            <div className="overline">{lang === 'te' ? 'ఇంటరాక్టివ్ అట్లాస్ ఆటలు' : 'INTERACTIVE ATLAS & GAMES'}</div>
            <h2>{lang === 'te' ? '33 స్టాటిక్ GK విజువల్ టాపిక్స్' : 'Popular 2D/3D Map Explorers'}</h2>
          </div>
          <button className="text-link" onClick={() => onNavigate('Atlas')}>
            {lang === 'te' ? 'అన్ని 33 అట్లాస్ టాపిక్స్' : 'Explore all 33 topics'} <ArrowRight size={15} />
          </button>
        </div>

        <div className="quick-atlas-row">
          {ATLAS_TOPICS.slice(0, 4).map(t => {
            const IconComp = t.icon;
            return (
              <div
                key={t.slug}
                className="quick-atlas-card"
                onClick={() => onNavigate('Atlas')}
              >
                <span className="qa-icon" style={{ backgroundColor: t.color + '22', color: t.color }}>
                  <IconComp size={22} />
                </span>
                <div>
                  <h4>{lang === 'te' ? t.titleHi : t.title}</h4>
                  <small>{t.count} {lang === 'te' ? 'నమోదులు' : 'entities'} · 2D-3D Map</small>
                </div>
                <ArrowRight size={16} className="qa-arr" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
