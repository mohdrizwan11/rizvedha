import React, { useState } from 'react';
import { Target, Timer, Trophy, Swords, ClipboardList, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { subjects, lessons } from './data';
import { pilots } from './v3/pilots';

export default function Play({ data, update, onOpenLesson, onOpenChapter }) {
  const [activeTab, setActiveTab] = useState('drills'); // drills | boss | exam
  const [examSettings, setExamSettings] = useState({ count: 10, minutes: 10, negative: 0.5 });
  const [examState, setExamState] = useState(null); // active exam session

  // Gather all practice questions
  const allQuestions = lessons.flatMap(l => l.questions.map((q, i) => ({
    ...q,
    lesson: l,
    index: i,
    id: `${l.id}-${i}`
  })));

  // Start exam session
  const startExam = () => {
    const pool = [...allQuestions].sort(() => Math.random() - 0.5);
    const chosen = pool.slice(0, Math.min(+examSettings.count, allQuestions.length));
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

  // Exam timer effect
  React.useEffect(() => {
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

  // Submit exam and save score / mistakes
  const submitExam = () => {
    if (!examState) return;
    const { questions, answers } = examState;
    let rightCount = 0;
    let attemptedCount = 0;

    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns !== undefined) {
        attemptedCount++;
        if (userAns === q.answer) rightCount++;
      }
    });

    const netScore = +(rightCount - (attemptedCount - rightCount) * examSettings.negative).toFixed(2);

    update(d => {
      // Record any wrong or unanswered questions as mistakes
      let mistakes = [...(d.mistakes || [])];
      let details = { ...(d.mistakeDetails || {}) };
      let answered = { ...(d.answered || {}) };
      let xp = d.xp + (rightCount * 10);

      questions.forEach((q, i) => {
        const id = q.id;
        const answer = answers[i];
        const right = answer === q.answer;
        if (answer !== undefined) answered[id] = right;
        if (!right) {
          if (!mistakes.includes(id)) mistakes.push(id);
          details[id] = {
            attempts: (details[id]?.attempts || 0) + 1,
            status: 'unresolved',
            lastResult: answer === undefined ? 'unanswered' : 'incorrect',
            lastAt: Date.now()
          };
        }
      });

      return {
        ...d,
        xp,
        answered,
        mistakes,
        mistakeDetails: details,
        exams: [
          ...(d.exams || []),
          { at: Date.now(), total: questions.length, attempted: attemptedCount, right: rightCount, score: netScore }
        ]
      };
    });

    setExamState(prev => ({ ...prev, isDone: true }));
  };

  return (
    <div className="play-view">
      <div className="play-header">
        <div>
          <div className="eyebrow"><Target size={15} /> PRACTICE & EXAM SIMULATOR</div>
          <h1>Practice Arena</h1>
          <p>Sharpen your recall with focused topic drills, 2-HP chapter boss challenges, or full-length timed exam simulations.</p>
        </div>

        <div className="play-tabs">
          <button className={activeTab === 'drills' ? 'active' : ''} onClick={() => { setActiveTab('drills'); setExamState(null); }}>
            <Target size={16} /> Topic Drills
          </button>
          <button className={activeTab === 'boss' ? 'active' : ''} onClick={() => { setActiveTab('boss'); setExamState(null); }}>
            <Swords size={16} /> Chapter Bosses
          </button>
          <button className={activeTab === 'exam' ? 'active' : ''} onClick={() => setActiveTab('exam')}>
            <ClipboardList size={16} /> Exam Simulator
          </button>
        </div>
      </div>

      {/* Tab 1: Topic Drills */}
      {activeTab === 'drills' && (
        <div className="drills-grid">
          {lessons.map(lesson => {
            const subj = subjects.find(s => s.id === lesson.subject);
            return (
              <div key={lesson.id} className="drill-card" onClick={() => onOpenLesson(lesson, 'Play')}>
                <div className="drill-top">
                  <span className="drill-subj-tag" style={{ backgroundColor: subj?.color + '22', color: subj?.color }}>
                    {subj?.short}
                  </span>
                  <span className="drill-q-count">{lesson.questions.length} Questions</span>
                </div>
                <h3>{lesson.topic}</h3>
                <p>{lesson.subtitle}</p>
                <div className="drill-footer">
                  <span className="drill-btn">Start Drill →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Chapter Boss Battles */}
      {activeTab === 'boss' && (
        <div className="boss-grid">
          {Object.values(pilots).map(chapter => (
            <div key={chapter.id} className="boss-card">
              <div className="boss-head">
                <span className="boss-badge">2-HP BOSS CHALLENGE</span>
                <span className="boss-subj">{chapter.subject}</span>
              </div>
              <h3>{chapter.title}</h3>
              <p className="boss-hook">"{chapter.hook}"</p>
              <div className="boss-meta">
                <span>⚡ {chapter.facts.length} High-Yield Facts</span>
                <span>⏱️ 5-Minute Timer</span>
              </div>
              <button className="primary" onClick={() => onOpenChapter(chapter.id)}>
                Fight Chapter Boss →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Exam Simulator */}
      {activeTab === 'exam' && (
        <div className="exam-container">
          {!examState ? (
            <div className="exam-setup-card">
              <div className="setup-badge">SSC CGL TIER-1 SIMULATION</div>
              <h2>Configure Your Mock Test</h2>
              <p>Mixed practice generated across all 7 subjects under official time limits and negative marking rules.</p>

              <div className="setup-controls">
                <label>
                  <span>Number of Questions:</span>
                  <select
                    value={examSettings.count}
                    onChange={e => setExamSettings({ ...examSettings, count: +e.target.value })}
                  >
                    {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n} Questions</option>)}
                  </select>
                </label>

                <label>
                  <span>Time Limit:</span>
                  <select
                    value={examSettings.minutes}
                    onChange={e => setExamSettings({ ...examSettings, minutes: +e.target.value })}
                  >
                    {[5, 10, 15, 20].map(m => <option key={m} value={m}>{m} Minutes</option>)}
                  </select>
                </label>

                <label>
                  <span>Negative Marking:</span>
                  <select
                    value={examSettings.negative}
                    onChange={e => setExamSettings({ ...examSettings, negative: +e.target.value })}
                  >
                    <option value={0}>No Negative (0)</option>
                    <option value={0.25}>-0.25 Marks</option>
                    <option value={0.50}>-0.50 Marks (SSC Standard)</option>
                  </select>
                </label>
              </div>

              <button className="primary big" onClick={startExam}>
                Begin Exam Session →
              </button>
            </div>
          ) : !examState.isDone ? (
            <div className="exam-active-layout">
              {/* Question Box */}
              <div className="exam-q-box">
                <div className="exam-status-bar">
                  <span>QUESTION {examState.currentIndex + 1} OF {examState.questions.length}</span>
                  <span className="exam-timer">
                    <Timer size={16} />
                    {Math.floor(examState.remainingSeconds / 60)}:{String(examState.remainingSeconds % 60).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="exam-q-text">
                  {examState.questions[examState.currentIndex].q}
                </h3>

                <div className="exam-options">
                  {examState.questions[examState.currentIndex].options.map((opt, i) => {
                    const isChosen = examState.answers[examState.currentIndex] === i;
                    return (
                      <button
                        key={i}
                        className={`exam-opt-btn ${isChosen ? 'chosen' : ''}`}
                        onClick={() => {
                          setExamState({
                            ...examState,
                            answers: { ...examState.answers, [examState.currentIndex]: i }
                          });
                        }}
                      >
                        <span className="letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="exam-nav-buttons">
                  <button
                    className="outline"
                    disabled={examState.currentIndex === 0}
                    onClick={() => setExamState({ ...examState, currentIndex: examState.currentIndex - 1 })}
                  >
                    ← Previous
                  </button>

                  <button
                    className="outline"
                    onClick={() => {
                      const idx = examState.currentIndex;
                      const marked = examState.marked.includes(idx)
                        ? examState.marked.filter(x => x !== idx)
                        : [...examState.marked, idx];
                      setExamState({ ...examState, marked });
                    }}
                  >
                    {examState.marked.includes(examState.currentIndex) ? 'Unmark Review' : 'Mark for Review'}
                  </button>

                  {examState.currentIndex + 1 < examState.questions.length ? (
                    <button
                      className="primary"
                      onClick={() => setExamState({ ...examState, currentIndex: examState.currentIndex + 1 })}
                    >
                      Next →
                    </button>
                  ) : (
                    <button className="primary submit-btn" onClick={submitExam}>
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>

              {/* Palette */}
              <div className="exam-palette">
                <h4>Question Palette</h4>
                <div className="palette-grid">
                  {examState.questions.map((_, i) => {
                    const isCurrent = examState.currentIndex === i;
                    const isAnswered = examState.answers[i] !== undefined;
                    const isMarked = examState.marked.includes(i);
                    let cls = 'palette-btn';
                    if (isCurrent) cls += ' current';
                    if (isMarked) cls += ' marked';
                    else if (isAnswered) cls += ' answered';

                    return (
                      <button
                        key={i}
                        className={cls}
                        onClick={() => setExamState({ ...examState, currentIndex: i })}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="palette-legend">
                  <span><i className="dot answered" /> Answered</span>
                  <span><i className="dot marked" /> Marked</span>
                  <span><i className="dot current" /> Current</span>
                </div>

                <button className="primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={submitExam}>
                  Submit & Finish
                </button>
              </div>
            </div>
          ) : (
            <div className="exam-results-view">
              <div className="results-header">
                <Trophy size={48} color="#eab308" />
                <h2>Exam Session Results</h2>
                <div className="score-summary-pills">
                  <div>
                    <span>Score</span>
                    <b>
                      {(() => {
                        let right = 0;
                        let attempted = Object.keys(examState.answers).length;
                        examState.questions.forEach((q, i) => {
                          if (examState.answers[i] === q.answer) right++;
                        });
                        return (right - (attempted - right) * examSettings.negative).toFixed(2);
                      })()}
                    </b>
                  </div>
                  <div>
                    <span>Attempted</span>
                    <b>{Object.keys(examState.answers).length} / {examState.questions.length}</b>
                  </div>
                  <div>
                    <span>Accuracy</span>
                    <b>
                      {(() => {
                        let right = 0;
                        let attempted = Object.keys(examState.answers).length;
                        examState.questions.forEach((q, i) => {
                          if (examState.answers[i] === q.answer) right++;
                        });
                        return attempted ? Math.round((right / attempted) * 100) + '%' : '0%';
                      })()}
                    </b>
                  </div>
                </div>
              </div>

              <h3>Question Review & Explanations</h3>
              <div className="results-list">
                {examState.questions.map((q, i) => {
                  const userAns = examState.answers[i];
                  const isCorrect = userAns === q.answer;
                  return (
                    <div key={i} className={`result-item ${isCorrect ? 'correct' : 'wrong'}`}>
                      <div className="res-top">
                        <b>Question {i + 1}</b>
                        <span className={`res-badge ${isCorrect ? 'good' : 'bad'}`}>
                          {userAns === undefined ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="res-q">{q.q}</p>
                      <div className="res-details">
                        <div><b>Correct Answer:</b> {q.options[q.answer]}</div>
                        {userAns !== undefined && !isCorrect && (
                          <div><b>Your Choice:</b> {q.options[userAns]}</div>
                        )}
                        <p className="res-exp">{q.explain}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="primary big" onClick={() => setExamState(null)}>
                Take Another Exam
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
