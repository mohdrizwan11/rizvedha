import React, { useState, useMemo } from 'react';
import {
  BookOpen, Landmark, Globe2, Scale, ChartNoAxesCombined,
  FlaskConical, Palette, Leaf, Sparkles, CheckCircle2, ArrowRight,
  Eye, EyeOff, Lightbulb, Search, Trophy, ArrowLeft, Layers, Compass, Flame
} from 'lucide-react';
import { LEARN_TOPICS } from './learnCurriculum';

export { LEARN_TOPICS };

export default function LearnView({ data = {}, update = () => {}, onOpenChapter, onNavigate, lang = 'en' }) {
  // Always default to the first rich visual topic for immediate high-impact presentation
  const [activeTopic, setActiveTopic] = useState(LEARN_TOPICS[0]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [search, setSearch] = useState('');
  const [tableRevealed, setTableRevealed] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const completedList = data.completed || [];

  const subjectsList = [
    'All',
    'History',
    'Geography',
    'Indian Polity & Constitution',
    'Economics',
    'General Science',
    'Art & Culture',
    'Static GK'
  ];

  const filteredTopics = useMemo(() => {
    return LEARN_TOPICS.filter(t => {
      const matchSubj = selectedSubject === 'All' || t.subject === selectedSubject;
      const matchQ = !search.trim() ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.titleTe && t.titleTe.includes(search));
      return matchSubj && matchQ;
    });
  }, [selectedSubject, search]);

  const handleSelectAnswer = (optIdx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optIdx);

    const isCorrect = optIdx === activeTopic.quiz[quizIdx]?.answer;
    if (isCorrect) {
      update(d => {
        const completed = [...(d.completed || [])];
        if (!completed.includes(activeTopic.id)) {
          completed.push(activeTopic.id);
        }
        return {
          ...d,
          xp: (d.xp || 0) + 10,
          completed
        };
      });
    }
  };

  const handleNextQuestion = () => {
    if (quizIdx + 1 < (activeTopic.quiz || []).length) {
      setQuizIdx(quizIdx + 1);
      setSelectedOpt(null);
    }
  };

  return (
    <div className="learn-container">
      {/* 1. TOP CURRICULUM SELECTOR BAR */}
      <div className="curriculum-top-bar">
        <div className="ctb-header">
          <div>
            <div className="eyebrow">
              <BookOpen size={14} /> {lang === 'te' ? 'పూర్తి విజువల్ పాఠ్యాంశాలు' : 'COMPREHENSIVE VISUAL CURRICULUM'}
            </div>
            <h1>{lang === 'te' ? 'స్టాటిక్ GK విజువల్ పాఠ్యపుస్తకం' : 'Visual Learning Modules'}</h1>
          </div>
          <button className="outline mini" onClick={() => onNavigate('Atlas')}>
            <Compass size={15} /> {lang === 'te' ? '33 అట్లాస్ మ్యాప్స్' : 'Explore 33 Atlas Maps →'}
          </button>
        </div>

        {/* Subject Filter Tabs */}
        <div className="curriculum-subject-tabs">
          {subjectsList.map(subj => {
            const count = subj === 'All' ? LEARN_TOPICS.length : LEARN_TOPICS.filter(t => t.subject === subj).length;
            return (
              <button
                key={subj}
                className={`subj-tab-btn ${selectedSubject === subj ? 'active' : ''}`}
                onClick={() => setSelectedSubject(subj)}
              >
                {subj === 'All' ? (lang === 'te' ? 'అన్నీ' : 'All') : subj}
                <span className="subj-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Filter Subject Pills & Search */}
        <div className="curriculum-filter-strip">
          <div className="curriculum-search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder={lang === 'te' ? 'పాఠాలను వెతకండి…' : 'Filter curriculum topics…'}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="curriculum-track-scroll">
            {filteredTopics.map(topic => {
              const isTopicDone = completedList.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  className={`track-pill ${activeTopic.id === topic.id ? 'active' : ''} ${isTopicDone ? 'done' : ''}`}
                  onClick={() => {
                    setActiveTopic(topic);
                    setTableRevealed(false);
                    setQuizIdx(0);
                    setSelectedOpt(null);
                  }}
                >
                  <span className="track-subj-tag">{topic.subject.slice(0, 4)}</span>
                  <span className="track-name">{lang === 'te' ? topic.titleTe.split(' ')[0] : topic.title.split(' ')[0]}</span>
                  {isTopicDone && <CheckCircle2 size={13} color="#10b981" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. MAIN ACTIVE VISUAL MODULE VIEW */}
      <div className="learn-active-workspace">
        {/* Topic Header Banner */}
        <div className="topic-hero-banner">
          <div className="th-top-row">
            <span className="th-badge">{activeTopic.subject}</span>
            <span className="th-yield">{activeTopic.badge}</span>
            <span className="th-era">{activeTopic.era}</span>
          </div>

          <h2 className="th-title">{lang === 'te' ? activeTopic.titleTe : activeTopic.title}</h2>
          {lang === 'te' && <div className="th-english-sub">{activeTopic.title}</div>}

          <div className="th-hook-box">
            <Sparkles size={18} color="#f59e0b" />
            <p className="th-hook">{lang === 'te' ? activeTopic.heroHookTe : activeTopic.heroHook}</p>
          </div>
        </div>

        {/* 1. DEDICATED VISUAL INFOGRAPHIC / ARCHITECTURAL SCHEMATIC */}
        <div className="infographic-stage">
          <div className="infographic-caption-bar">
            <span>🎨 {lang === 'te' ? 'విజువల్ ఇన్ఫోగ్రాఫిక్ స్కీమాటిక్' : 'VISUAL INFOGRAPHIC SCHEMATIC'}</span>
            <small>{activeTopic.infographicCaption}</small>
          </div>

          <div className="infographic-canvas-wrap">
            {activeTopic.infographicType === 'indus-grid' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(40, 30)">
                  <rect width="260" height="180" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="8" />
                  <text x="130" y="30" textAnchor="middle" fontWeight="bold" fill="#78350f" fontSize="13">WESTERN CITADEL (ELEVATED)</text>
                  <rect x="30" y="55" width="200" height="75" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
                  <text x="130" y="95" textAnchor="middle" fill="#0369a1" fontWeight="700" fontSize="12">THE GREAT BATH (Bitumen Lined)</text>
                  <text x="130" y="160" textAnchor="middle" fill="#64748b" fontSize="11">Used for ritual purification & ceremonies</text>
                </g>
                <text x="350" y="125" textAnchor="middle" fontSize="22" fill="#94a3b8">→</text>
                <g transform="translate(400, 30)">
                  <rect width="260" height="180" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" rx="8" />
                  <text x="130" y="30" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">EASTERN LOWER TOWN (RESIDENTIAL)</text>
                  <line x1="40" y1="60" x2="220" y2="60" stroke="#94a3b8" strokeDasharray="4" />
                  <line x1="40" y1="100" x2="220" y2="100" stroke="#94a3b8" strokeDasharray="4" />
                  <line x1="90" y1="50" x2="90" y2="120" stroke="#94a3b8" strokeDasharray="4" />
                  <line x1="160" y1="50" x2="160" y2="120" stroke="#94a3b8" strokeDasharray="4" />
                  <text x="130" y="150" textAnchor="middle" fill="#475569" fontSize="11">Burnt-brick houses with covered drains</text>
                </g>
              </svg>
            )}

            {(activeTopic.infographicType === 'mauryan-pillar' || activeTopic.infographicType === 'mauryan-pillars') && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(80, 20)">
                  <rect x="200" y="30" width="140" height="170" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="10" />
                  <circle cx="270" cy="80" r="35" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
                  <text x="270" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">24 SPOKES</text>
                  <text x="270" y="140" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="13">SARNATH CAPITAL</text>
                  <text x="270" y="160" textAnchor="middle" fill="#92400e" fontSize="10">Lion Capital (National Emblem)</text>
                  <rect x="20" y="60" width="150" height="110" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                  <text x="95" y="90" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">Rock Edict XIII</text>
                  <text x="95" y="115" textAnchor="middle" fill="#64748b" fontSize="10">Kalinga War Carnage</text>
                  <text x="95" y="135" textAnchor="middle" fill="#0284c7" fontSize="10">Adoption of Dhamma</text>
                  <rect x="370" y="60" width="150" height="110" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                  <text x="445" y="90" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">Arthashastra</text>
                  <text x="445" y="115" textAnchor="middle" fill="#64748b" fontSize="10">Saptanga Theory</text>
                  <text x="445" y="135" textAnchor="middle" fill="#059669" fontSize="10">Chanakya Statecraft</text>
                </g>
              </svg>
            )}

            {(activeTopic.infographicType === 'delhi-timeline' || activeTopic.infographicType === 'dynasty-chronology') && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(30, 70)">
                  {['Slave (1206-90)', 'Khalji (1290-1320)', 'Tughlaq (1320-1414)', 'Sayyid (1414-51)', 'Lodi (1451-1526)'].map((d, i) => (
                    <g key={i} transform={`translate(${i * 128}, 0)`}>
                      <rect width="118" height="80" fill="#ffffff" stroke="#0284c7" strokeWidth="2" rx="8" />
                      <rect width="118" height="24" fill="#0284c7" rx="6" />
                      <text x="59" y="16" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">0{i + 1} DYNASTY</text>
                      <text x="59" y="48" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">{d.split(' ')[0]}</text>
                      <text x="59" y="66" textAnchor="middle" fill="#64748b" fontSize="9">{d.split(' ')[1]}</text>
                    </g>
                  ))}
                </g>
              </svg>
            )}

            {(activeTopic.infographicType === 'river-basin' || activeTopic.infographicType === 'river-confluence') && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(60, 40)">
                  <path d="M 20 20 Q 150 50 300 80" fill="none" stroke="#0284c7" strokeWidth="4" />
                  <text x="30" y="15" fill="#0369a1" fontWeight="bold" fontSize="12">Bhagirathi (from Gangotri)</text>
                  <path d="M 20 160 Q 150 120 300 80" fill="none" stroke="#38bdf8" strokeWidth="4" />
                  <text x="30" y="180" fill="#0284c7" fontWeight="bold" fontSize="12">Alaknanda (from Badrinath)</text>
                  <circle cx="300" cy="80" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
                  <text x="300" y="55" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="14">Devprayag Confluence</text>
                  <path d="M 300 80 Q 450 80 580 80" fill="none" stroke="#2563eb" strokeWidth="7" />
                  <text x="440" y="65" fill="#1d4ed8" fontWeight="bold" fontSize="15">THE GANGA</text>
                  <text x="440" y="115" fill="#64748b" fontSize="12">Flows 2,525 km to Bay of Bengal</text>
                </g>
              </svg>
            )}

            {(activeTopic.infographicType === 'passes-cross' || activeTopic.infographicType === 'mountain-passes-map') && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(60, 30)">
                  <rect x="0" y="20" width="260" height="150" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="10" />
                  <text x="130" y="50" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="13">HIMALAYAN STRATEGIC PASSES</text>
                  <text x="30" y="85" fill="#0f172a" fontWeight="bold" fontSize="11">• Zoji La:</text><text x="95" y="85" fill="#475569" fontSize="11">Srinagar ↔ Leh Highway</text>
                  <text x="30" y="115" fill="#0f172a" fontWeight="bold" fontSize="11">• Shipki La:</text><text x="105" y="115" fill="#475569" fontSize="11">Sutlej River Gorge into HP</text>
                  <text x="30" y="145" fill="#0f172a" fontWeight="bold" fontSize="11">• Nathu La:</text><text x="105" y="145" fill="#475569" fontSize="11">Sikkim ↔ Tibet Border</text>

                  <rect x="320" y="20" width="260" height="150" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="10" />
                  <text x="450" y="50" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="13">WESTERN GHATS GAPS</text>
                  <text x="350" y="85" fill="#0f172a" fontWeight="bold" fontSize="11">• Thal Ghat:</text><text x="430" y="85" fill="#475569" fontSize="11">Mumbai ↔ Nashik</text>
                  <text x="350" y="115" fill="#0f172a" fontWeight="bold" fontSize="11">• Bhor Ghat:</text><text x="430" y="115" fill="#475569" fontSize="11">Mumbai ↔ Pune</text>
                  <text x="350" y="145" fill="#0f172a" fontWeight="bold" fontSize="11">• Palghat Gap:</text><text x="445" y="145" fill="#475569" fontSize="11">Kerala ↔ Tamil Nadu</text>
                </g>
              </svg>
            )}

            {activeTopic.infographicType === 'writs-architecture' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(30, 40)">
                  {['Habeas Corpus', 'Mandamus', 'Prohibition', 'Certiorari', 'Quo-Warranto'].map((w, idx) => (
                    <g key={idx} transform={`translate(${idx * 130}, 10)`}>
                      <rect width="120" height="130" fill="#f8fafc" stroke="#6366f1" strokeWidth="2" rx="8" />
                      <rect width="120" height="26" fill="#6366f1" rx="6" />
                      <text x="60" y="17" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">WRIT 0{idx + 1}</text>
                      <text x="60" y="55" textAnchor="middle" fill="#1e1b4b" fontWeight="bold" fontSize="11">{w}</text>
                      <text x="60" y="85" textAnchor="middle" fill="#64748b" fontSize="9">Supreme Court Art 32</text>
                      <text x="60" y="105" textAnchor="middle" fill="#64748b" fontSize="9">High Court Art 226</text>
                    </g>
                  ))}
                </g>
              </svg>
            )}

            {activeTopic.infographicType === 'constitutional-bodies' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(40, 40)">
                  <rect x="0" y="20" width="135" height="130" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="8" />
                  <text x="67" y="50" textAnchor="middle" fill="#15803d" fontWeight="bold" fontSize="12">CAG of India</text>
                  <text x="67" y="75" textAnchor="middle" fill="#166534" fontWeight="bold" fontSize="13">Article 148</text>
                  <text x="67" y="110" textAnchor="middle" fill="#4b5563" fontSize="10">Audit of Accounts</text>

                  <rect x="155" y="20" width="135" height="130" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" rx="8" />
                  <text x="222" y="50" textAnchor="middle" fill="#1d4ed8" fontWeight="bold" fontSize="12">Election Comm.</text>
                  <text x="222" y="75" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="13">Article 324</text>
                  <text x="222" y="110" textAnchor="middle" fill="#4b5563" fontSize="10">Conducts Polls</text>

                  <rect x="310" y="20" width="135" height="130" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" rx="8" />
                  <text x="377" y="50" textAnchor="middle" fill="#a16207" fontWeight="bold" fontSize="12">Finance Comm.</text>
                  <text x="377" y="75" textAnchor="middle" fill="#854d0e" fontWeight="bold" fontSize="13">Article 280</text>
                  <text x="377" y="110" textAnchor="middle" fill="#4b5563" fontSize="10">Tax Sharing</text>

                  <rect x="465" y="20" width="135" height="130" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" rx="8" />
                  <text x="532" y="50" textAnchor="middle" fill="#be185d" fontWeight="bold" fontSize="12">UPSC</text>
                  <text x="532" y="75" textAnchor="middle" fill="#9d174d" fontWeight="bold" fontSize="13">Article 315</text>
                  <text x="532" y="110" textAnchor="middle" fill="#4b5563" fontSize="10">Merit Recruitment</text>
                </g>
              </svg>
            )}

            {activeTopic.infographicType === 'rbi-transmission' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(50, 40)">
                  <rect x="0" y="50" width="140" height="70" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="8" />
                  <text x="70" y="80" textAnchor="middle" fontWeight="bold" fill="#92400e" fontSize="12">RBI Repo Rate</text>
                  <text x="70" y="100" textAnchor="middle" fill="#b45309" fontSize="10">Hikes by 25 bps</text>
                  <text x="180" y="90" textAnchor="middle" fontSize="24" fill="#94a3b8">→</text>
                  <rect x="220" y="50" width="160" height="70" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" rx="8" />
                  <text x="300" y="80" textAnchor="middle" fontWeight="bold" fill="#3730a3" fontSize="12">Commercial Banks</text>
                  <text x="300" y="100" textAnchor="middle" fill="#4338ca" fontSize="10">Cost of funds rises</text>
                  <text x="420" y="90" textAnchor="middle" fontSize="24" fill="#94a3b8">→</text>
                  <rect x="460" y="50" width="160" height="70" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" rx="8" />
                  <text x="540" y="80" textAnchor="middle" fontWeight="bold" fill="#991b1b" fontSize="12">Loans & Inflation</text>
                  <text x="540" y="100" textAnchor="middle" fill="#b91c1c" fontSize="10">Demand cools down</text>
                </g>
              </svg>
            )}

            {activeTopic.infographicType === 'cell-schematic' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(100, 20)">
                  <ellipse cx="250" cy="100" rx="220" ry="90" fill="#ecfdf5" stroke="#10b981" strokeWidth="3" />
                  <text x="250" y="25" textAnchor="middle" fontWeight="bold" fill="#047857" fontSize="12">Cell Membrane (Gatekeeper)</text>
                  <circle cx="180" cy="100" r="40" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
                  <text x="180" y="105" textAnchor="middle" fontWeight="bold" fill="#9a3412" fontSize="11">Nucleus (DNA)</text>
                  <ellipse cx="320" cy="75" rx="30" ry="16" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                  <text x="320" y="80" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="10">Mitochondria</text>
                  <circle cx="330" cy="130" r="14" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
                  <text x="330" y="134" textAnchor="middle" fontWeight="bold" fill="#991b1b" fontSize="9">Lysosome</text>
                </g>
              </svg>
            )}

            {activeTopic.infographicType === 'physics-laws' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(50, 40)">
                  <rect x="0" y="30" width="180" height="110" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" rx="8" />
                  <text x="90" y="60" textAnchor="middle" fill="#1d4ed8" fontWeight="bold" fontSize="12">1st Law: Inertia</text>
                  <text x="90" y="85" textAnchor="middle" fill="#475569" fontSize="10">Resists change in state</text>
                  <text x="90" y="105" textAnchor="middle" fill="#64748b" fontSize="10">Sudden brakes in bus</text>

                  <rect x="210" y="30" width="180" height="110" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" rx="8" />
                  <text x="300" y="60" textAnchor="middle" fill="#15803d" fontWeight="bold" fontSize="12">2nd Law: F = m·a</text>
                  <text x="300" y="85" textAnchor="middle" fill="#475569" fontSize="10">Rate of change of momentum</text>
                  <text x="300" y="105" textAnchor="middle" fill="#64748b" fontSize="10">Catching ball in cricket</text>

                  <rect x="420" y="30" width="180" height="110" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" rx="8" />
                  <text x="510" y="60" textAnchor="middle" fill="#b91c1c" fontWeight="bold" fontSize="12">3rd Law: Action-Reaction</text>
                  <text x="510" y="85" textAnchor="middle" fill="#475569" fontSize="10">Equal & opposite force</text>
                  <text x="510" y="105" textAnchor="middle" fill="#64748b" fontSize="10">Rocket propulsion & recoil</text>
                </g>
              </svg>
            )}

            {/* Universal High-Definition Concept Infographic for Other Visual Topics */}
            {![
              'indus-grid', 'mauryan-pillar', 'mauryan-pillars', 'delhi-timeline', 'dynasty-chronology',
              'river-basin', 'river-confluence', 'passes-cross', 'mountain-passes-map',
              'writs-architecture', 'constitutional-bodies', 'rbi-transmission', 'cell-schematic', 'physics-laws'
            ].includes(activeTopic.infographicType) && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(40, 35)">
                  {(activeTopic.storyCards || []).slice(0, 4).map((card, cIdx) => (
                    <g key={cIdx} transform={`translate(${cIdx * 155}, 0)`}>
                      <rect width="145" height="160" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" rx="10" />
                      <rect width="145" height="28" fill="var(--primary, #0284c7)" rx="8" />
                      <text x="72" y="18" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
                        PILLAR 0{cIdx + 1}
                      </text>
                      <text x="72" y="55" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="11">
                        {card.title.slice(0, 18)}
                      </text>
                      <text x="72" y="85" textAnchor="middle" fill="#64748b" fontSize="9">
                        {card.tag || 'High Yield'}
                      </text>
                      <line x1="20" y1="105" x2="125" y2="105" stroke="#f1f5f9" strokeWidth="2" />
                      <text x="72" y="130" textAnchor="middle" fill="var(--primary, #0284c7)" fontWeight="bold" fontSize="10">
                        SSC Key Fact →
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
            )}
          </div>
        </div>

        {/* 2. COMPARE TABLE WITH "COVER AND RECALL" */}
        <div className="compare-table-section">
          <div className="cts-head">
            <div>
              <span className="overline">{lang === 'te' ? 'జ్ఞాపకశక్తి సాధన పట్టిక' : 'ACTIVE RETRIEVAL TABLE'}</span>
              <h2>{lang === 'te' ? 'తులనాత్మక పట్టిక & జ్ఞాపకశక్తి పరీక్ష' : 'Compare & High-Yield Table'}</h2>
            </div>
            <button
              className={`cover-btn ${tableRevealed ? 'revealed' : ''}`}
              onClick={() => setTableRevealed(!tableRevealed)}
            >
              {tableRevealed ? (
                <>
                  <EyeOff size={16} /> {lang === 'te' ? 'సమాధానాలను కప్పి ఉంచండి (స్వీయ పరీక్ష)' : 'Cover Answers for Self-Test'}
                </>
              ) : (
                <>
                  <Eye size={16} /> {lang === 'te' ? 'సమాధానాలను చూపించండి' : 'Reveal Table Answers'}
                </>
              )}
            </button>
          </div>

          <div className="active-compare-table-wrap">
            <table className="active-compare-table">
              <thead>
                <tr>
                  <th style={{ width: '38%' }}>
                    {lang === 'te' && activeTopic.compareTable.leftColTe ? activeTopic.compareTable.leftColTe : activeTopic.compareTable.leftCol}
                  </th>
                  <th>
                    {lang === 'te' && activeTopic.compareTable.rightColTe ? activeTopic.compareTable.rightColTe : activeTopic.compareTable.rightCol}
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeTopic.compareTable.rows.map(([left, right], rIdx) => (
                  <tr key={rIdx}>
                    <td className="table-left-col">{left}</td>
                    <td className="table-right-col">
                      <div className={`table-answer-slot ${tableRevealed ? 'revealed' : 'covered'}`}>
                        {right}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. CORE STORY CARDS (NCERT & SSC KEY CONCEPTS) */}
        <div className="story-cards-section">
          <span className="overline">{lang === 'te' ? 'కీలక భావనలు & వివరాలు' : 'CORE CONCEPT BREAKDOWN'}</span>
          <h2>{lang === 'te' ? 'పరీక్షా దృక్కోణంలో ముఖ్యాంశాలు' : 'High-Yield Exam Focus Cards'}</h2>

          <div className="story-cards-grid">
            {activeTopic.storyCards.map((card, cIdx) => (
              <div key={cIdx} className="learn-story-card">
                <div className="card-tag-row">
                  <span className="source-tag">{card.tag}</span>
                  <span className="card-num">0{cIdx + 1}</span>
                </div>
                <h3>{lang === 'te' && card.titleTe ? card.titleTe : card.title}</h3>
                <p>{lang === 'te' && card.bodyTe ? card.bodyTe : card.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MNEMONIC RECALL FORMULA */}
        {activeTopic.mnemonic && (
          <div className="mnemonic-callout">
            <div className="mnemonic-head">
              <Lightbulb size={20} color="#f59e0b" />
              <strong>{lang === 'te' ? 'జ్ఞాపక సూత్రం (Mnemonic Memory Formula)' : 'Mnemonic Memory Formula'}</strong>
            </div>
            <p className="mnemonic-body">{activeTopic.mnemonic}</p>
          </div>
        )}

        {/* 5. QUICK RECALL SELF-TEST QUIZ */}
        {activeTopic.quiz && activeTopic.quiz.length > 0 && (
          <div className="mini-quiz-card">
            <div className="mq-header">
              <span className="mq-badge">
                <Flame size={14} color="#f59e0b" />
                {lang === 'te' ? 'రీకాల్ సాధన క్విజ్' : 'QUICK RECALL SELF-TEST'}
              </span>
              <span className="mq-prog">
                Question {quizIdx + 1} of {activeTopic.quiz.length} · +10 XP
              </span>
            </div>

            <h3 className="mq-question">{activeTopic.quiz[quizIdx].question}</h3>

            <div className="mq-options-grid">
              {activeTopic.quiz[quizIdx].options.map((opt, oIdx) => {
                const isSelected = selectedOpt === oIdx;
                const isCorrect = oIdx === activeTopic.quiz[quizIdx].answer;
                let optClass = 'mq-opt';
                if (selectedOpt !== null) {
                  if (isCorrect) optClass += ' correct';
                  else if (isSelected) optClass += ' incorrect';
                }
                return (
                  <button
                    key={oIdx}
                    className={optClass}
                    onClick={() => handleSelectAnswer(oIdx)}
                    disabled={selectedOpt !== null}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + oIdx)}</span>
                    <span className="opt-text">{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedOpt !== null && (
              <div className="mq-feedback-row">
                <div className="mq-expl">
                  <strong>
                    {selectedOpt === activeTopic.quiz[quizIdx].answer
                      ? (lang === 'te' ? '✓ సరైన సమాధానం! +10 XP సంపాదించారు.' : '✓ Correct! +10 XP earned.')
                      : (lang === 'te' ? '✗ తప్పు సమాధానం.' : '✗ Incorrect.')}
                  </strong>{' '}
                  {activeTopic.quiz[quizIdx].explain}
                </div>
                {quizIdx + 1 < activeTopic.quiz.length && (
                  <button className="primary mini" onClick={handleNextQuestion}>
                    Next Question →
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
