import React, { useState, useMemo } from 'react';
import { RotateCcw, Brain, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { lessons } from './data';
import { pilots } from './v3/pilots';
import { schedule, INTERVAL_DAYS } from './v3/scheduler';

export default function Review({ data, update, onOpenLesson, onOpenChapter }) {
  const [activeTab, setActiveTab] = useState('flashcards'); // flashcards | mistakes | weak
  const [flipped, setFlipped] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);

  // 1. Gather all mistakes across the canonical mistakeStore & legacy mistakes
  const canonicalRecords = Object.values(data.mistakeStore?.records || {});
  const legacyMistakeIds = data.mistakes || [];

  // 2. Build the list of active unresolved mistakes
  const unresolvedMistakes = useMemo(() => {
    const list = [];

    // From canonical records
    canonicalRecords.forEach(rec => {
      if (rec.status === 'unresolved') {
        list.push({
          id: rec.id,
          title: rec.title || rec.id,
          topic: rec.topic || 'GK Concept',
          answer: rec.answer,
          attempts: rec.attempts || 1,
          lastAt: rec.lastAt
        });
      }
    });

    // From legacy lesson questions
    legacyMistakeIds.forEach(id => {
      if (!list.some(x => x.id === id || x.id === `lesson:${id}`)) {
        const parts = id.split('-');
        const lesson = lessons.find(l => l.id === parts[0]);
        const qIdx = parseInt(parts[1], 10);
        const q = lesson?.questions?.[qIdx];
        if (q) {
          list.push({
            id,
            title: q.q,
            topic: lesson.topic,
            answer: q.options[q.answer],
            attempts: data.mistakeDetails?.[id]?.attempts || 1,
            lastAt: data.mistakeDetails?.[id]?.lastAt,
            lesson,
            qIdx
          });
        }
      }
    });

    return list;
  }, [canonicalRecords, legacyMistakeIds, data.mistakeDetails]);

  // 3. Build flashcard review pool
  const flashcards = useMemo(() => {
    // Generate cards from pilot facts + lessons
    const cards = [];
    Object.values(pilots).forEach(p => {
      p.facts.forEach(f => {
        const sched = data.flashcards?.[f.id] || { stage: 0, dueAt: Date.now() };
        cards.push({
          id: f.id,
          topic: p.title,
          front: f.question || `What is the significance of ${f.label}?`,
          back: `${f.answer} — ${f.note}`,
          stage: sched.stage || 0,
          dueAt: sched.dueAt || Date.now(),
          isDue: (sched.dueAt || 0) <= Date.now()
        });
      });
    });
    return cards.sort((a, b) => (a.isDue === b.isDue ? 0 : a.isDue ? -1 : 1));
  }, [data.flashcards]);

  const currentCard = flashcards[cardIdx] || flashcards[0];

  const handleRate = (confidence) => {
    if (!currentCard) return;
    const isSuccess = confidence === 'easy';
    const now = Date.now();
    const currSched = data.flashcards?.[currentCard.id] || { stage: currentCard.stage, dueAt: currentCard.dueAt };
    const nextSched = schedule(currSched, isSuccess, now);

    update(d => ({
      ...d,
      flashcards: {
        ...(d.flashcards || {}),
        [currentCard.id]: nextSched
      },
      xp: d.xp + (isSuccess ? 15 : 5)
    }));

    setFlipped(false);
    setCardIdx(i => (i + 1) % Math.max(1, flashcards.length));
  };

  const resolveMistake = (id) => {
    update(d => {
      const nextMistakes = (d.mistakes || []).filter(x => x !== id && `lesson:${x}` !== id);
      const rec = d.mistakeStore?.records?.[id] || d.mistakeStore?.records?.[`lesson:${id}`];
      let records = { ...(d.mistakeStore?.records || {}) };
      if (rec) {
        records[rec.id] = { ...rec, status: 'corrected', attempts: rec.attempts + 1 };
      }
      return {
        ...d,
        mistakes: nextMistakes,
        mistakeStore: {
          version: 1,
          records
        },
        xp: d.xp + 20
      };
    });
  };

  return (
    <div className="review-view">
      {/* Header */}
      <div className="review-header">
        <div>
          <div className="eyebrow"><Brain size={15} /> SPACED RETRIEVAL CLINIC</div>
          <h1>Memory & Mistake Review</h1>
          <p>Science-backed active recall intervals (1d → 3d → 7d → 21d). Master your weak spots until retention is second nature.</p>
        </div>

        <div className="review-tabs">
          <button className={activeTab === 'flashcards' ? 'active' : ''} onClick={() => setActiveTab('flashcards')}>
            <Sparkles size={16} /> Due Flashcards ({flashcards.filter(c => c.isDue).length})
          </button>
          <button className={activeTab === 'mistakes' ? 'active' : ''} onClick={() => setActiveTab('mistakes')}>
            <RotateCcw size={16} /> Unresolved Mistakes ({unresolvedMistakes.length})
          </button>
          <button className={activeTab === 'weak' ? 'active' : ''} onClick={() => setActiveTab('weak')}>
            <AlertTriangle size={16} /> Weak Zones
          </button>
        </div>
      </div>

      {/* Tab 1: Spaced Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="flashcards-arena">
          {currentCard ? (
            <div className="fc-wrapper">
              <div className="fc-stage-pill">
                INTERVAL STAGE {currentCard.stage + 1} / 4 · NEXT INTERVAL: {INTERVAL_DAYS[currentCard.stage] || 21} DAYS
              </div>

              <div className={`fc-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className="fc-front">
                  <span className="fc-topic-label">{currentCard.topic}</span>
                  <h3>{currentCard.front}</h3>
                  <div className="fc-flip-hint">Tap card to reveal answer ↺</div>
                </div>

                <div className="fc-back">
                  <span className="fc-topic-label">ANSWER & EXPLANATION</span>
                  <p>{currentCard.back}</p>
                  <div className="fc-flip-hint">Tap to flip back</div>
                </div>
              </div>

              {flipped && (
                <div className="fc-rating-row">
                  <button className="rate-btn forgot" onClick={() => handleRate('forgotten')}>
                    Forgotten (Reset 1d)
                  </button>
                  <button className="rate-btn diff" onClick={() => handleRate('difficult')}>
                    Difficult (Repeat 1d)
                  </button>
                  <button className="rate-btn easy" onClick={() => handleRate('easy')}>
                    Easy (Advance Stage +15 XP)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="panel empty-state">
              <Trophy size={48} color="#10b981" />
              <h3>All Caught Up!</h3>
              <p>No spaced repetition flashcards are currently due. Check back tomorrow!</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Mistakes Clinic */}
      {activeTab === 'mistakes' && (
        <div className="mistakes-clinic-list">
          {unresolvedMistakes.length > 0 ? (
            unresolvedMistakes.map(m => (
              <div key={m.id} className="mistake-item-card">
                <div className="m-left">
                  <span className="m-tag">{m.topic}</span>
                  <h4>{m.title}</h4>
                  <div className="m-meta">
                    <b>Correct Answer:</b> {m.answer} · <span>Attempts: {m.attempts}</span>
                  </div>
                </div>

                <div className="m-actions">
                  <button className="primary mini" onClick={() => resolveMistake(m.id)}>
                    <CheckCircle2 size={16} /> Mark Mastered (+20 XP)
                  </button>
                  {m.lesson && (
                    <button className="outline mini" onClick={() => onOpenLesson(m.lesson, 'Learn')}>
                      Review Lesson →
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="panel empty-state">
              <CheckCircle2 size={48} color="#10b981" />
              <h3>Mistake Notebook is Clear!</h3>
              <p>You have no unresolved mistakes across topic quizzes, map drills, or exam simulations.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Weak Zones */}
      {activeTab === 'weak' && (
        <div className="weak-zones-panel">
          <div className="wz-intro">
            <h3>Diagnostic Performance Radar</h3>
            <p>Topics and geographical regions where your recent recall accuracy fell below 70%.</p>
          </div>

          <div className="wz-cards-grid">
            <div className="wz-card">
              <h4>Rivers & Confluences</h4>
              <p>Identified tributary pairings require additional reinforcement.</p>
              <button className="outline mini" onClick={() => onOpenChapter('geography-rivers-of-india')}>
                Practice Rivers Chapter →
              </button>
            </div>

            <div className="wz-card">
              <h4>Constitutional Articles</h4>
              <p>Fundamental Rights vs Directive Principles distinction needs review.</p>
              <button className="outline mini" onClick={() => onOpenChapter('polity-fundamental-rights')}>
                Practice Articles Chapter →
              </button>
            </div>

            <div className="wz-card">
              <h4>Banking Tools & Policy</h4>
              <p>Repo vs Reverse Repo & SDF mechanisms.</p>
              <button className="outline mini" onClick={() => onOpenChapter('economics-banking-payment-systems')}>
                Practice Banking Chapter →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

