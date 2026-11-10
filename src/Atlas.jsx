import React, { useState, useEffect, useMemo } from 'react';
import {
  Waves, Ship, Zap, Trees, BadgeCheck, Sprout, Layers, Droplets, Mountain, Map,
  Landmark, Sparkles, Music, Crown, Castle, Flag, Building2, Palette, BookOpen,
  TrainFront, Route, MapPin, Users, UsersRound, PartyPopper, Trophy, Medal,
  Rocket, Atom, Globe2, Swords, Lightbulb, Search, ArrowLeft, ArrowRight,
  Compass, CheckCircle2, XCircle, RotateCcw, Filter, Eye, ListFilter
} from 'lucide-react';
import AtlasMap from './AtlasMap';

// 33 Topics mapped strictly to the user's requested 8 categories
export const ATLAS_TOPICS = [
  // 1. Geography & Nature
  { slug: 'rivers', title: 'Rivers of India', titleHi: 'भारत की नदियाँ', category: 'Geography & Nature', icon: Waves, color: '#0284c7', count: 27, hasMap: true },
  { slug: 'waterways', title: 'National Waterways', titleHi: 'राष्ट्रीय जलमार्ग', category: 'Geography & Nature', icon: Ship, color: '#0369a1', count: 12, hasMap: true },
  { slug: 'power-plants', title: 'Power Plants', titleHi: 'ऊर्जा संयंत्र', category: 'Geography & Nature', icon: Zap, color: '#f59e0b', count: 130, hasMap: true },
  { slug: 'national-parks', title: 'National Parks', titleHi: 'राष्ट्रीय उद्यान', category: 'Geography & Nature', icon: Trees, color: '#10b981', count: 104, hasMap: true },
  { slug: 'gi-tags', title: 'GI Tags', titleHi: 'जीआई टैग', category: 'Geography & Nature', icon: BadgeCheck, color: '#8b5cf6', count: 44, hasMap: true },
  { slug: 'crops', title: 'Crops & Agriculture', titleHi: 'फसलें और कृषि', category: 'Geography & Nature', icon: Sprout, color: '#84cc16', count: 61, hasMap: true },
  { slug: 'soils', title: 'Soil Types', titleHi: 'मृदा के प्रकार', category: 'Geography & Nature', icon: Layers, color: '#d97706', count: 52, hasMap: true },
  { slug: 'lakes', title: 'Lakes of India', titleHi: 'भारत की झीलें', category: 'Geography & Nature', icon: Droplets, color: '#06b6d4', count: 40, hasMap: true },
  { slug: 'biosphere-reserves', title: 'Biosphere Reserves', titleHi: 'जैवमंडल आरक्षित क्षेत्र', category: 'Geography & Nature', icon: Trees, color: '#059669', count: 18, hasMap: true },
  { slug: 'mountain-peaks', title: 'Mountain Peaks', titleHi: 'पर्वत चोटियाँ', category: 'Geography & Nature', icon: Mountain, color: '#64748b', count: 62, hasMap: true },
  { slug: 'physical-india', title: 'Physical India', titleHi: 'भौगोलिक भारत', category: 'Geography & Nature', icon: Map, color: '#0d9488', count: 107, hasMap: true },

  // 2. History & Culture
  { slug: 'temples', title: 'Temples of India', titleHi: 'भारत के प्रमुख मंदिर', category: 'History & Culture', icon: Landmark, color: '#b45309', count: 38, hasMap: true },
  { slug: 'dances', title: 'Dances of India', titleHi: 'भारतीय शास्त्रीय व लोक नृत्य', category: 'History & Culture', icon: Sparkles, color: '#ec4899', count: 86, hasMap: true },
  { slug: 'music', title: 'Music of India', titleHi: 'भारतीय संगीत व वाद्ययंत्र', category: 'History & Culture', icon: Music, color: '#a855f7', count: 60, hasMap: true },
  { slug: 'ancient-dynasties', title: 'Ancient Dynasties', titleHi: 'प्राचीन राजवंश', category: 'History & Culture', icon: Crown, color: '#eab308', count: 63, hasMap: true },
  { slug: 'medieval-empires', title: 'Medieval Empires', titleHi: 'मध्यकालीन साम्राज्य', category: 'History & Culture', icon: Castle, color: '#c2410c', count: 44, hasMap: true },
  { slug: 'freedom-movement', title: 'Freedom Movement', titleHi: 'स्वतंत्रता संग्राम', category: 'History & Culture', icon: Flag, color: '#ea580c', count: 49, hasMap: true },
  { slug: 'monuments', title: 'Historical Monuments', titleHi: 'ऐतिहासिक स्मारक', category: 'History & Culture', icon: Building2, color: '#78350f', count: 45, hasMap: true },
  { slug: 'art-culture', title: 'Art & Culture', titleHi: 'कला एवं संस्कृति', category: 'History & Culture', icon: Palette, color: '#db2777', count: 75, hasMap: true },
  { slug: 'books-authors', title: 'Books & Authors', titleHi: 'पुस्तकें और लेखक', category: 'History & Culture', icon: BookOpen, color: '#6366f1', count: 121, hasMap: false },

  // 3. India & Infrastructure / Polity
  { slug: 'railway-zones', title: 'Railway Zones', titleHi: 'रेलवे जोन व मुख्यालय', category: 'India & Infrastructure / Polity', icon: TrainFront, color: '#dc2626', count: 18, hasMap: true },
  { slug: 'highways', title: 'Highways', titleHi: 'राष्ट्रीय राजमार्ग', category: 'India & Infrastructure / Polity', icon: Route, color: '#475569', count: 12, hasMap: true },
  { slug: 'india-basics', title: 'Indian Basics', titleHi: 'भारत की आधारभूत जानकारी', category: 'India & Infrastructure / Polity', icon: MapPin, color: '#2563eb', count: 64, hasMap: true },
  { slug: 'cm-governors', title: 'States & Administration', titleHi: 'मुख्यमंत्री, राज्यपाल व प्रशासन', category: 'India & Infrastructure / Polity', icon: Users, color: '#4f46e5', count: 36, hasMap: true },
  { slug: 'tribes', title: 'Tribes of India', titleHi: 'भारत की जनजातियाँ', category: 'India & Infrastructure / Polity', icon: UsersRound, color: '#ca8a04', count: 52, hasMap: true },

  // 4. Festivals & Society
  { slug: 'festivals', title: 'Festivals of India', titleHi: 'भारत के प्रमुख त्योहार', category: 'Festivals & Society', icon: PartyPopper, color: '#e11d48', count: 108, hasMap: true },

  // 5. Sports
  { slug: 'sports', title: 'Sports', titleHi: 'खेल जगत व शब्दावली', category: 'Sports', icon: Trophy, color: '#16a34a', count: 36, hasMap: true },
  { slug: 'awards-honours', title: 'Awards & Honours', titleHi: 'पुरस्कार एवं सम्मान', category: 'Sports', icon: Medal, color: '#eab308', count: 41, hasMap: false },

  // 6. Science & Technology / Defense
  { slug: 'space-defence', title: 'Space & Defence', titleHi: 'अंतरिक्ष व रक्षा प्रौद्योगिकी', category: 'Science & Technology / Defense', icon: Rocket, color: '#7c3aed', count: 62, hasMap: true },
  { slug: 'science-facts', title: 'Science Facts', titleHi: 'वैज्ञानिक तथ्य व आविष्कार', category: 'Science & Technology / Defense', icon: Atom, color: '#0891b2', count: 117, hasMap: false },

  // 7. International / Organizations
  { slug: 'world-gk', title: 'World GK', titleHi: 'विश्व सामान्य ज्ञान व संगठन', category: 'International / Organizations', icon: Globe2, color: '#0284c7', count: 124, hasMap: true },

  // 8. Miscellaneous
  { slug: 'battles-treaties', title: 'Battles & Treaties', titleHi: 'प्रमुख युद्ध एवं संधियाँ', category: 'Miscellaneous', icon: Swords, color: '#991b1b', count: 50, hasMap: true },
  { slug: 'quick-facts', title: 'Quick Facts', titleHi: 'त्वरित सामान्य ज्ञान', category: 'Miscellaneous', icon: Lightbulb, color: '#f59e0b', count: 134, hasMap: false }
];

const CATEGORIES = [
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

export default function Atlas({ data, update, onOpenChapter }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState(data.atlasLang || 'en');

  const toggleLang = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    update(d => ({ ...d, atlasLang: next }));
  };

  const filteredTopics = useMemo(() => {
    return ATLAS_TOPICS.filter(t => {
      const matchCat = activeCategory === 'All' || t.category === activeCategory;
      const matchQ = !searchQuery.trim() ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.titleHi.includes(searchQuery);
      return matchCat && matchQ;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="atlas-view">
      {!selectedTopic ? (
        <div className="atlas-hub">
          {/* Hero Header */}
          <div className="atlas-hub-header">
            <div className="atlas-hub-title-wrap">
              <div className="eyebrow"><Compass size={15} /> VISUAL ATLAS & 33 GK GAMES</div>
              <h1>Interactive Atlas & Topic Explorer</h1>
              <p>Explore 33 essential static-GK topics via high-precision 2D/3D maps, interactive fact cards, and recall drills.</p>
            </div>

            <div className="atlas-hub-actions">
              <button className="lang-pill" onClick={toggleLang}>
                {lang === 'en' ? 'English' : 'हिंदी'}
              </button>
            </div>
          </div>

          {/* Search & Categories Filter Bar */}
          <div className="atlas-filter-bar">
            <div className="atlas-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder={lang === 'hi' ? 'नदियाँ, ऊर्जा संयंत्र, मंदिर, राजवंश खोजें…' : 'Search rivers, power plants, temples, dynasties, parks…'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="atlas-category-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 33 Topics Grid */}
          <div className="atlas-topic-grid">
            {filteredTopics.map(topic => {
              const IconComp = topic.icon;
              return (
                <div
                  key={topic.slug}
                  className="atlas-topic-card"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="topic-card-top">
                    <span className="topic-icon-badge" style={{ backgroundColor: topic.color + '22', color: topic.color }}>
                      <IconComp size={24} />
                    </span>
                    <span className="topic-entity-tag">{topic.count} {lang === 'hi' ? 'तथ्य' : 'entries'}</span>
                  </div>

                  <h3>{lang === 'hi' ? topic.titleHi : topic.title}</h3>
                  <div className="topic-sub">{topic.category}</div>

                  <div className="topic-card-footer">
                    <span className="topic-feature-pill">
                      {topic.hasMap ? '🗺️ 2D-3D Map & Quiz' : '⚡ Fact Cards & Quiz'}
                    </span>
                    <span className="launch-btn">Explore →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <TopicDetail
          topic={selectedTopic}
          lang={lang}
          toggleLang={toggleLang}
          onBack={() => setSelectedTopic(null)}
          data={data}
          update={update}
          onOpenChapter={onOpenChapter}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Active Topic Detail Component (Map + Cards + Quiz)
// -------------------------------------------------------------
function TopicDetail({ topic, lang, toggleLang, onBack, data, update, onOpenChapter }) {
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(topic.hasMap ? 'map' : 'cards');
  const [selectedState, setSelectedState] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [cardSearch, setCardSearch] = useState('');

  // Practice / Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    let isLive = true;
    setLoading(true);
    import(`./datasets/${topic.slug}.json`)
      .then(m => {
        if (isLive) {
          setDataset(m.default || m);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error loading dataset:', err);
        if (isLive) setLoading(false);
      });
    return () => { isLive = false; };
  }, [topic.slug]);

  const items = useMemo(() => {
    if (!dataset) return [];
    return dataset.items || dataset.entries || [];
  }, [dataset]);

  const filteredItems = useMemo(() => {
    return items.filter(it => {
      const q = cardSearch.toLowerCase();
      const matchQ = !q ||
        (it.n && it.n.toLowerCase().includes(q)) ||
        (it.h && it.h.includes(q)) ||
        (it.st && it.st.toLowerCase().includes(q)) ||
        (it.fact && it.fact.toLowerCase().includes(q));
      return matchQ;
    });
  }, [items, cardSearch]);

  // Quiz Questions Extraction: use dataset.mcq or generate from items
  const questions = useMemo(() => {
    if (!dataset) return [];
    if (dataset.mcq && dataset.mcq.length > 0) {
      return dataset.mcq.map(m => {
        const correctOpt = m.o[0];
        const allOpts = [...m.o].sort(() => Math.random() - 0.5);
        return {
          questionEn: m.q[0],
          questionHi: m.q[1],
          optionsEn: allOpts.map(o => o[0]),
          optionsHi: allOpts.map(o => o[1]),
          correctEn: correctOpt[0],
          explainEn: m.e ? m.e[0] : '',
          explainHi: m.e ? m.e[1] : ''
        };
      });
    }
    // Dynamic fallback generation from items
    if (items.length > 3) {
      return items.slice(0, 15).map((it, idx) => {
        const wrongOpts = items.filter(x => x.n !== it.n).slice(0, 3);
        const allChoices = [it, ...wrongOpts].sort(() => Math.random() - 0.5);
        return {
          questionEn: `Which state or location is associated with ${it.n}?`,
          questionHi: `${it.h || it.n} किस राज्य या स्थान से संबंधित है?`,
          optionsEn: allChoices.map(c => c.st || c.s || c.org || c.n),
          optionsHi: allChoices.map(c => c.sh || c.s || c.orgh || c.h || c.n),
          correctEn: it.st || it.s || it.org || it.n,
          explainEn: it.fact || `${it.n} is located in ${it.st || it.s || 'India'}.`,
          explainHi: it.facth || `${it.h || it.n} ${it.sh || it.st || 'भारत'} में स्थित है।`
        };
      });
    }
    return [];
  }, [dataset, items]);

  const handleAnswer = (choice) => {
    if (selectedChoice !== null) return;
    const currentQ = questions[quizIdx];
    const isRight = choice === currentQ.correctEn;
    setSelectedChoice(choice);
    if (isRight) {
      setScore(s => s + 1);
      update(d => ({ ...d, xp: d.xp + 10 }));
    } else {
      // Record mistake
      const mistId = `atlas:${topic.slug}:${quizIdx}`;
      update(d => {
        const curr = d.mistakes || [];
        return {
          ...d,
          mistakes: curr.includes(mistId) ? curr : [...curr, mistId],
          mistakeStore: {
            version: 1,
            records: {
              ...(d.mistakeStore?.records || {}),
              [mistId]: {
                id: mistId,
                type: 'atlas',
                title: currentQ.questionEn,
                topic: topic.title,
                answer: currentQ.correctEn,
                attempts: ((d.mistakeStore?.records?.[mistId]?.attempts) || 0) + 1,
                status: 'unresolved',
                lastAt: Date.now()
              }
            }
          }
        };
      });
    }
  };

  const nextQuestion = () => {
    setSelectedChoice(null);
    setQuizIdx(i => i + 1);
  };

  if (loading) {
    return <div className="panel" style={{ padding: '3rem', textAlign: 'center' }}>Loading {topic.title} dataset…</div>;
  }

  const IconComp = topic.icon;

  return (
    <div className="atlas-topic-detail">
      {/* Top Navigation Strip */}
      <div className="topic-header-bar">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={17} /> {lang === 'hi' ? 'सभी 33 विषय' : 'All 33 Topics'}
        </button>

        <div className="topic-title-area">
          <span className="topic-icon-badge mini" style={{ backgroundColor: topic.color + '22', color: topic.color }}>
            <IconComp size={20} />
          </span>
          <div>
            <h2>{lang === 'hi' ? topic.titleHi : topic.title}</h2>
            <small>{topic.category} · {items.length} {lang === 'hi' ? 'तथ्य' : 'verified entries'}</small>
          </div>
        </div>

        <div className="topic-right-tools">
          <div className="mode-tabs">
            {topic.hasMap && (
              <button className={activeTab === 'map' ? 'active' : ''} onClick={() => setActiveTab('map')}>
                🗺️ 2D/3D Map
              </button>
            )}
            <button className={activeTab === 'cards' ? 'active' : ''} onClick={() => setActiveTab('cards')}>
              🃏 Fact Cards ({items.length})
            </button>
            <button className={activeTab === 'quiz' ? 'active' : ''} onClick={() => setActiveTab('quiz')}>
              🎯 Play Quiz ({questions.length})
            </button>
          </div>
          <button className="lang-pill" onClick={toggleLang}>
            {lang === 'en' ? 'EN' : 'हिं'}
          </button>
        </div>
      </div>

      {/* Tab 1: 2D-3D Map View */}
      {activeTab === 'map' && (
        <div className="atlas-map-workspace">
          <div className="map-canvas-col">
            <AtlasMap
              lang={lang}
              selectedState={selectedState}
              onSelectState={setSelectedState}
              items={items}
              activeItem={activeItem}
              onSelectItem={setActiveItem}
              themeColor={topic.color}
            />
          </div>

          <div className="map-inspector-col">
            {activeItem ? (
              <div className="inspector-card">
                <div className="inspector-badge" style={{ backgroundColor: topic.color + '22', color: topic.color }}>
                  {activeItem.cat || activeItem.cath || topic.title}
                </div>
                <h3>{lang === 'hi' && activeItem.h ? activeItem.h : activeItem.n}</h3>
                {activeItem.h && lang !== 'hi' && <div className="hindi-sub">{activeItem.h}</div>}

                <div className="fact-box">
                  <div className="fact-label">{lang === 'hi' ? 'स्थान / राज्य' : 'Location / State'}</div>
                  <div className="fact-val">{lang === 'hi' && activeItem.sh ? activeItem.sh : (activeItem.st || activeItem.s || 'India')}</div>
                </div>

                {activeItem.org && (
                  <div className="fact-box">
                    <div className="fact-label">{lang === 'hi' ? 'उद्गम' : 'Origin / Source'}</div>
                    <div className="fact-val">{lang === 'hi' && activeItem.orgh ? activeItem.orgh : activeItem.org}</div>
                  </div>
                )}

                {activeItem.drain && (
                  <div className="fact-box">
                    <div className="fact-label">{lang === 'hi' ? 'मुहाना' : 'Drainage / Outlet'}</div>
                    <div className="fact-val">{lang === 'hi' && activeItem.drainh ? activeItem.drainh : activeItem.drain}</div>
                  </div>
                )}

                {activeItem.L && (
                  <div className="fact-box">
                    <div className="fact-label">{lang === 'hi' ? 'लंबाई' : 'Length'}</div>
                    <div className="fact-val">{activeItem.L} km</div>
                  </div>
                )}

                {activeItem.cap && (
                  <div className="fact-box">
                    <div className="fact-label">{lang === 'hi' ? 'क्षमता' : 'Capacity'}</div>
                    <div className="fact-val">{lang === 'hi' && activeItem.caph ? activeItem.caph : activeItem.cap}</div>
                  </div>
                )}

                {activeItem.fact && (
                  <div className="fact-box highlight">
                    <div className="fact-label">⚡ {lang === 'hi' ? 'महत्वपूर्ण परीक्षा तथ्य' : 'Key Exam Fact'}</div>
                    <div className="fact-val">{lang === 'hi' && activeItem.facth ? activeItem.facth : activeItem.fact}</div>
                  </div>
                )}

                <button className="primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setActiveTab('quiz')}>
                  Test Recall on {activeItem.n} →
                </button>
              </div>
            ) : (
              <div className="inspector-placeholder">
                <Compass size={40} strokeWidth={1.5} color={topic.color} />
                <h3>Interactive Atlas Ready</h3>
                <p>Click on any river, marker, or state on the map to inspect key exam facts, origin points, and notes.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Fact Cards Grid */}
      {activeTab === 'cards' && (
        <div className="atlas-cards-workspace">
          <div className="cards-filter-row">
            <div className="search-field">
              <Search size={16} />
              <input
                type="text"
                placeholder={lang === 'hi' ? 'नाम या विवरण से खोजें…' : 'Filter facts by name, state, or keywords…'}
                value={cardSearch}
                onChange={e => setCardSearch(e.target.value)}
              />
            </div>
            <div className="count-info">{filteredItems.length} of {items.length} cards shown</div>
          </div>

          <div className="cards-masonry">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="study-card">
                <div className="study-card-head">
                  <h4>{lang === 'hi' && item.h ? item.h : item.n}</h4>
                  <span className="card-loc-pill">{lang === 'hi' && item.sh ? item.sh : (item.st || item.s || 'India')}</span>
                </div>
                {item.h && lang !== 'hi' && <div className="card-hindi">{item.h}</div>}
                <p className="card-fact">{lang === 'hi' && item.facth ? item.facth : (item.fact || item.details?.en || item.details?.hi || 'Key static GK entry.')}</p>
                {item.tr && (
                  <div className="card-meta">
                    <b>{lang === 'hi' ? 'सहायक नदियाँ:' : 'Tributaries:'}</b> {lang === 'hi' && item.trh ? item.trh : item.tr}
                  </div>
                )}
                {item.cap && (
                  <div className="card-meta">
                    <b>{lang === 'hi' ? 'क्षमता:' : 'Capacity:'}</b> {lang === 'hi' && item.caph ? item.caph : item.cap}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Quiz Drill */}
      {activeTab === 'quiz' && (
        <div className="atlas-quiz-workspace">
          {!quizStarted ? (
            <div className="quiz-intro-card">
              <Trophy size={48} color={topic.color} />
              <h2>{lang === 'hi' ? 'स्मृति अभ्यास शुरू करें' : 'Practice Active Recall'}</h2>
              <p>{questions.length} questions available for {topic.title}. Test your recall under exam conditions with immediate feedback.</p>
              <button className="primary big" onClick={() => { setQuizStarted(true); setQuizIdx(0); setScore(0); setSelectedChoice(null); }}>
                Start Quiz Drill ({questions.length} Qs) →
              </button>
            </div>
          ) : quizIdx < questions.length ? (
            <div className="quiz-active-card">
              <div className="quiz-progress-bar">
                <div className="progress-fill" style={{ width: `${((quizIdx + 1) / questions.length) * 100}%` }} />
              </div>
              <div className="quiz-q-num">
                QUESTION {quizIdx + 1} OF {questions.length} · SCORE: {score}
              </div>

              <h3 className="quiz-question">
                {lang === 'hi' ? questions[quizIdx].questionHi : questions[quizIdx].questionEn}
              </h3>

              <div className="quiz-options-list">
                {(lang === 'hi' ? questions[quizIdx].optionsHi : questions[quizIdx].optionsEn).map((opt, i) => {
                  const optEn = questions[quizIdx].optionsEn[i];
                  const isCorrect = optEn === questions[quizIdx].correctEn;
                  const isChosen = selectedChoice === optEn;

                  let btnClass = 'quiz-opt-btn';
                  if (selectedChoice !== null) {
                    if (isCorrect) btnClass += ' correct';
                    else if (isChosen) btnClass += ' wrong';
                  }

                  return (
                    <button
                      key={i}
                      className={btnClass}
                      disabled={selectedChoice !== null}
                      onClick={() => handleAnswer(optEn)}
                    >
                      <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                      <span className="opt-text">{opt}</span>
                      {selectedChoice !== null && isCorrect && <CheckCircle2 size={18} className="opt-icon" />}
                      {selectedChoice !== null && isChosen && !isCorrect && <XCircle size={18} className="opt-icon" />}
                    </button>
                  );
                })}
              </div>

              {selectedChoice !== null && (
                <div className="quiz-feedback-box">
                  <div className="fb-text">
                    <b>{selectedChoice === questions[quizIdx].correctEn ? '✓ Correct! +10 XP' : '✗ Incorrect (Saved to Mistakes)'}</b>
                    <p>{lang === 'hi' ? questions[quizIdx].explainHi : questions[quizIdx].explainEn}</p>
                  </div>
                  <button className="primary" onClick={nextQuestion}>
                    {quizIdx + 1 < questions.length ? 'Next Question →' : 'View Results →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-results-card">
              <Trophy size={48} color="#f59e0b" />
              <h2>Quiz Completed!</h2>
              <div className="score-badge">You scored {score} out of {questions.length}</div>
              <p>Incorrect answers have been added to your Spaced Repetition queue in the Review section.</p>
              <div className="results-actions">
                <button className="outline" onClick={() => { setQuizIdx(0); setScore(0); setSelectedChoice(null); }}>
                  Retake Quiz
                </button>
                <button className="primary" onClick={() => setActiveTab('map')}>
                  Back to Atlas Map
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
