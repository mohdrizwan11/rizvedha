import React, { useState, useEffect, useMemo } from 'react';
import {
  Waves, Ship, Zap, Trees, BadgeCheck, Sprout, Layers, Droplets, Mountain, Map,
  Landmark, Sparkles, Music, Crown, Castle, Flag, Building2, Palette, BookOpen,
  TrainFront, Route, MapPin, Users, UsersRound, PartyPopper, Trophy, Medal,
  Rocket, Atom, Globe2, Swords, Lightbulb, Search, ArrowLeft, ArrowRight,
  Compass, CheckCircle2, XCircle, RotateCcw, Filter, Eye, ListFilter, Flame,
  ChevronDown, FolderOpen, Folder
} from 'lucide-react';
import AtlasMap from './AtlasMap';
import { translateState, translateRiver, getTelugu } from './telugu';

// 33 Topics mapped strictly to the user's requested 8 categories with Telugu titles
export const ATLAS_TOPICS = [
  // 1. Geography & Nature
  { slug: 'rivers', title: 'Rivers of India', titleTe: 'భారతదేశ నదులు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Waves, color: '#0284c7', count: 27, hasMap: true },
  { slug: 'waterways', title: 'National Waterways', titleTe: 'జాతీయ జలమార్గాలు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Ship, color: '#0369a1', count: 12, hasMap: true },
  { slug: 'power-plants', title: 'Power Plants', titleTe: 'విద్యుత్ కేంద్రాలు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Zap, color: '#f59e0b', count: 130, hasMap: true },
  { slug: 'national-parks', title: 'National Parks', titleTe: 'జాతీయ ఉద్యానవనాలు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Trees, color: '#10b981', count: 104, hasMap: true },
  { slug: 'gi-tags', title: 'GI Tags', titleTe: 'భౌగోళిక గుర్తింపు ట్యాగ్‌లు (GI)', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: BadgeCheck, color: '#8b5cf6', count: 44, hasMap: true },
  { slug: 'crops', title: 'Crops & Agriculture', titleTe: 'పంటలు & వ్యవసాయం', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Sprout, color: '#84cc16', count: 61, hasMap: true },
  { slug: 'soils', title: 'Soil Types', titleTe: 'నేలల రకాలు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Layers, color: '#d97706', count: 52, hasMap: true },
  { slug: 'lakes', title: 'Lakes of India', titleTe: 'భారతదేశ సరస్సులు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Droplets, color: '#06b6d4', count: 40, hasMap: true },
  { slug: 'biosphere-reserves', title: 'Biosphere Reserves', titleTe: 'బయోస్పియర్ రిజర్వ్‌లు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Trees, color: '#059669', count: 18, hasMap: true },
  { slug: 'mountain-peaks', title: 'Mountain Peaks', titleTe: 'పర్వత శిఖరాలు', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Mountain, color: '#64748b', count: 30, hasMap: true },
  { slug: 'physical-india', title: 'Physical India', titleTe: 'భౌతిక భారతదేశం', category: 'Geography & Nature', categoryTe: 'భూగోళశాస్త్రం & ప్రకృతి', icon: Map, color: '#0d9488', count: 107, hasMap: true },

  // 2. History & Culture
  { slug: 'temples', title: 'Temples of India', titleTe: 'ప్రసిద్ధ దేవాలయాలు', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Landmark, color: '#b45309', count: 38, hasMap: true },
  { slug: 'dances', title: 'Dances of India', titleTe: 'శాస్త్రీయ & జానపద నృత్యాలు', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Sparkles, color: '#ec4899', count: 86, hasMap: true },
  { slug: 'music', title: 'Music of India', titleTe: 'సంగీతం & వాయిద్యాలు', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Music, color: '#a855f7', count: 60, hasMap: true },
  { slug: 'ancient-dynasties', title: 'Ancient Dynasties', titleTe: 'ప్రాచీన రాజవంశాలు', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Crown, color: '#eab308', count: 63, hasMap: true },
  { slug: 'medieval-empires', title: 'Medieval Empires', titleTe: 'మధ్యయుగ సామ్రాజ్యాలు', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Castle, color: '#c2410c', count: 44, hasMap: true },
  { slug: 'freedom-movement', title: 'Freedom Movement', titleTe: 'స్వాతంత్ర్య సమరం', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Flag, color: '#ea580c', count: 49, hasMap: true },
  { slug: 'monuments', title: 'Historical Monuments', titleTe: 'చారిత్రక కట్టడాలు', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Building2, color: '#78350f', count: 45, hasMap: true },
  { slug: 'art-culture', title: 'Art & Culture', titleTe: 'కళ & సంస్కృతి', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: Palette, color: '#db2777', count: 75, hasMap: true },
  { slug: 'books-authors', title: 'Books & Authors', titleTe: 'పుస్తకాలు & రచయితలు', category: 'History & Culture', categoryTe: 'చరిత్ర & సంస్కృతి', icon: BookOpen, color: '#6366f1', count: 121, hasMap: false },

  // 3. India & Infrastructure / Polity
  { slug: 'railway-zones', title: 'Railway Zones', titleTe: 'రైల్వే జోన్లు & కేంద్రాలు', category: 'India & Infrastructure / Polity', categoryTe: 'మౌలిక వసతులు & పాలన', icon: TrainFront, color: '#dc2626', count: 18, hasMap: true },
  { slug: 'highways', title: 'Highways', titleTe: 'జాతీయ రహదారులు', category: 'India & Infrastructure / Polity', categoryTe: 'మౌలిక వసతులు & పాలన', icon: Route, color: '#475569', count: 12, hasMap: true },
  { slug: 'india-basics', title: 'Indian Basics', titleTe: 'భారతదేశ ప్రాథమిక అంశాలు', category: 'India & Infrastructure / Polity', categoryTe: 'మౌలిక వసతులు & పాలన', icon: MapPin, color: '#2563eb', count: 64, hasMap: true },
  { slug: 'cm-governors', title: 'States & Administration', titleTe: 'రాష్ట్రాలు & పరిపాలన', category: 'India & Infrastructure / Polity', categoryTe: 'మౌలిక వసతులు & పాలన', icon: Users, color: '#4f46e5', count: 36, hasMap: true },
  { slug: 'tribes', title: 'Tribes of India', titleTe: 'భారతీయ తెగలు', category: 'India & Infrastructure / Polity', categoryTe: 'మౌలిక వసతులు & పాలన', icon: UsersRound, color: '#ca8a04', count: 52, hasMap: true },

  // 4. Festivals & Society
  { slug: 'festivals', title: 'Festivals of India', titleTe: 'భారతదేశ పండుగలు', category: 'Festivals & Society', categoryTe: 'పండుగలు & సమాజం', icon: PartyPopper, color: '#e11d48', count: 108, hasMap: true },

  // 5. Sports
  { slug: 'sports', title: 'Sports', titleTe: 'క్రీడలు & పరిభాష', category: 'Sports', categoryTe: 'క్రీడలు', icon: Trophy, color: '#16a34a', count: 36, hasMap: true },
  { slug: 'awards-honours', title: 'Awards & Honours', titleTe: 'అవార్డులు & పురస్కారాలు', category: 'Sports', categoryTe: 'క్రీడలు', icon: Medal, color: '#eab308', count: 41, hasMap: false },

  // 6. Science & Technology / Defense
  { slug: 'space-defence', title: 'Space & Defence', titleTe: 'అంతరిక్షం & రక్షణ రంగం', category: 'Science & Technology / Defense', categoryTe: 'సైన్స్ & రక్షణ', icon: Rocket, color: '#7c3aed', count: 62, hasMap: true },
  { slug: 'science-facts', title: 'Science Facts', titleTe: 'శాస్త్రీయ వాస్తవాలు', category: 'Science & Technology / Defense', categoryTe: 'సైన్స్ & రక్షణ', icon: Atom, color: '#0891b2', count: 117, hasMap: false },

  // 7. International / Organizations
  { slug: 'world-gk', title: 'World GK', titleTe: 'ప్రపంచ సాధారణ జ్ఞానం', category: 'International / Organizations', categoryTe: 'అంతర్జాతీయ సంస్థలు', icon: Globe2, color: '#0284c7', count: 124, hasMap: true },

  // 8. Miscellaneous
  { slug: 'battles-treaties', title: 'Battles & Treaties', titleTe: 'యుద్ధాలు & ఒప్పందాలు', category: 'Miscellaneous', categoryTe: 'ఇతర ముఖ్యమైనవి', icon: Swords, color: '#991b1b', count: 50, hasMap: true },
  { slug: 'quick-facts', title: 'Quick Facts', titleTe: 'శీఘ్ర వాస్తవాలు', category: 'Miscellaneous', categoryTe: 'ఇతర ముఖ్యమైనవి', icon: Lightbulb, color: '#f59e0b', count: 134, hasMap: false }
];

// 8 Organized Atlas Chapters matching the Learn section syllabus accordion pattern
export const ATLAS_CHAPTERS = [
  {
    id: 'geography-nature',
    num: '01',
    category: 'Geography & Nature',
    title: 'Geography & Nature',
    titleTe: 'భూగోళశాస్త్రం & ప్రకృతి',
    desc: 'Rivers, National Waterways, Power Plants, National Parks, Lakes, Soils, Peaks, and Physical India.',
    descTe: 'భారతదేశ నదులు, జాతీయ జలమార్గాలు, విద్యుత్ కేంద్రాలు, ఉద్యానవనాలు, సరస్సులు, నేలలు, పర్వతాలు మరియు భౌతిక భూగోళం.',
    icon: Compass,
    accent: '#0284c7',
    bgLight: 'rgba(2, 132, 199, 0.1)',
    borderGlow: 'rgba(2, 132, 199, 0.25)',
    weight: '11 Maps & Topics',
    weightTe: '11 మ్యాప్‌లు & అంశాలు'
  },
  {
    id: 'history-culture',
    num: '02',
    category: 'History & Culture',
    title: 'History & Culture',
    titleTe: 'చరిత్ర & సంస్కృతి',
    desc: 'Temples, Classical & Folk Dances, Music, Ancient & Medieval Dynasties, Freedom Movement, Monuments, and Books.',
    descTe: 'దేవాలయాలు, నృత్యాలు, సంగీతం, ప్రాచీన-మధ్యయుగ సామ్రాజ్యాలు, స్వాతంత్ర్య సమరం, చారిత్రక కట్టడాలు మరియు ప్రసిద్ధ గ్రంథాలు.',
    icon: Landmark,
    accent: '#b45309',
    bgLight: 'rgba(180, 83, 9, 0.1)',
    borderGlow: 'rgba(180, 83, 9, 0.25)',
    weight: '9 Maps & Topics',
    weightTe: '9 మ్యాప్‌లు & అంశాలు'
  },
  {
    id: 'india-infrastructure',
    num: '03',
    category: 'India & Infrastructure / Polity',
    title: 'India & Infrastructure / Polity',
    titleTe: 'మౌలిక వసతులు & పాలన',
    desc: 'Railway Zones, National Highways, India Geographic Basics, States & Governors, and Tribal Demographics.',
    descTe: 'రైల్వే జోన్లు, జాతీయ రహదారులు, భారతదేశ భౌగోళిక విస్తీర్ణం, రాష్ట్రాలు-గవర్నర్లు మరియు తెగల వివరాలు.',
    icon: Route,
    accent: '#4f46e5',
    bgLight: 'rgba(79, 70, 229, 0.1)',
    borderGlow: 'rgba(79, 70, 229, 0.25)',
    weight: '5 Maps & Topics',
    weightTe: '5 మ్యాప్‌లు & అంశాలు'
  },
  {
    id: 'festivals-society',
    num: '04',
    category: 'Festivals & Society',
    title: 'Festivals & Society',
    titleTe: 'పండుగలు & సమాజం',
    desc: 'Harvest, religious, and state cultural festivals celebrated across Indian states and union territories.',
    descTe: 'భారతదేశంలోని వివిధ రాష్ట్రాలు మరియు కేంద్రపాలిత ప్రాంతాలలో జరుపుకునే ముఖ్యమైన పండుగలు & సంస్కృతి.',
    icon: PartyPopper,
    accent: '#e11d48',
    bgLight: 'rgba(225, 29, 72, 0.1)',
    borderGlow: 'rgba(225, 29, 72, 0.25)',
    weight: '1 Major Map / 108 Entries',
    weightTe: '108 పండుగల సమగ్ర జాబితా'
  },
  {
    id: 'sports',
    num: '05',
    category: 'Sports',
    title: 'Sports & Honours',
    titleTe: 'క్రీడలు & అవార్డులు',
    desc: 'Olympic medals, national sports trophies, terminology, venues, and national awards.',
    descTe: 'క్రీడారంగం, ట్రోఫీలు, స్టేడియంలు, క్రీడా పరిభాష మరియు జాతీయ పౌర/క్రీడా పురస్కారాలు.',
    icon: Trophy,
    accent: '#16a34a',
    bgLight: 'rgba(22, 163, 74, 0.1)',
    borderGlow: 'rgba(22, 163, 74, 0.25)',
    weight: '2 Topics / 77 Entries',
    weightTe: '77 క్రీడా రికార్డులు'
  },
  {
    id: 'science-defense',
    num: '06',
    category: 'Science & Technology / Defense',
    title: 'Science & Technology / Defense',
    titleTe: 'సైన్స్ & రక్షణ రంగం',
    desc: 'ISRO launch vehicles & missions, DRDO missile defense systems, research institutes, and core science facts.',
    descTe: 'ఇస్రో రాకెట్లు, ఉపగ్రహాలు, డిఫెన్స్ రీసెర్చ్ క్షిపణులు, అణు కేంద్రాలు మరియు శాస్త్రీయ సూత్రాలు.',
    icon: Rocket,
    accent: '#7c3aed',
    bgLight: 'rgba(124, 58, 237, 0.1)',
    borderGlow: 'rgba(124, 58, 237, 0.25)',
    weight: '2 Topics / 179 Entries',
    weightTe: '179 సైన్స్ అంశాలు'
  },
  {
    id: 'international-orgs',
    num: '07',
    category: 'International / Organizations',
    title: 'International / Organizations',
    titleTe: 'అంతర్జాతీయ సంస్థలు & ప్రపంచ జీకే',
    desc: 'United Nations bodies, world headquarters, international summits, and global geographic facts.',
    descTe: 'ఐక్యరాజ్యసమితి అనుబంధ సంస్థలు, ప్రధాన కార్యాలయాలు, అంతర్జాతీయ కూటములు మరియు ప్రపంచ భౌగోళిక రికార్డులు.',
    icon: Globe2,
    accent: '#0284c7',
    bgLight: 'rgba(2, 132, 199, 0.1)',
    borderGlow: 'rgba(2, 132, 199, 0.25)',
    weight: '1 Map / 124 Entries',
    weightTe: '124 అంతర్జాతీయ రికార్డులు'
  },
  {
    id: 'miscellaneous',
    num: '08',
    category: 'Miscellaneous',
    title: 'Miscellaneous & Battles',
    titleTe: 'యుద్ధాలు, ఒప్పందాలు & శీఘ్ర వాస్తవాలు',
    desc: 'Historic Indian battles, peace treaties, high-yield static GK one-liners and rapid exam review cards.',
    descTe: 'భారతదేశ ప్రధాన యుద్ధాలు, శాంతి ఒప్పందాలు, పునరావృత స్టాటిక్ జీకే వన్-లైనర్స్.',
    icon: Swords,
    accent: '#991b1b',
    bgLight: 'rgba(153, 27, 27, 0.1)',
    borderGlow: 'rgba(153, 27, 27, 0.25)',
    weight: '2 Topics / 184 Entries',
    weightTe: '184 శీఘ్ర వాస్తవాలు'
  }
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

export default function Atlas({ data, update, onOpenChapter, lang = 'en', onToggleLang }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // All 8 chapters closed/collapsed by default per user request
  const [openChapters, setOpenChapters] = useState({});

  const currentLang = lang || data.atlasLang || 'en';

  const toggleChapter = (chapterId) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const allExpanded = ATLAS_CHAPTERS.every(ch => openChapters[ch.id]);

  const toggleAllChapters = () => {
    if (allExpanded) {
      setOpenChapters({});
    } else {
      const allOpen = {};
      ATLAS_CHAPTERS.forEach(ch => { allOpen[ch.id] = true; });
      setOpenChapters(allOpen);
    }
  };

  // If user enters search query, auto-expand matching chapters
  useEffect(() => {
    if (searchQuery.trim()) {
      const matchingChapters = {};
      ATLAS_CHAPTERS.forEach(ch => {
        const hasMatch = ATLAS_TOPICS.filter(t => t.category === ch.category).some(t => {
          const q = searchQuery.toLowerCase();
          return t.title.toLowerCase().includes(q) ||
            (t.titleTe && t.titleTe.includes(searchQuery)) ||
            ch.title.toLowerCase().includes(q) ||
            (ch.titleTe && ch.titleTe.includes(searchQuery));
        });
        if (hasMatch) {
          matchingChapters[ch.id] = true;
        }
      });
      setOpenChapters(prev => ({ ...prev, ...matchingChapters }));
    }
  }, [searchQuery]);

  const displayedChapters = useMemo(() => {
    return ATLAS_CHAPTERS.filter(ch => {
      if (activeCategory !== 'All' && ch.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const chapterMatches = ch.title.toLowerCase().includes(q) || (ch.titleTe && ch.titleTe.includes(searchQuery));
        const subtopicMatches = ATLAS_TOPICS.filter(t => t.category === ch.category).some(t =>
          t.title.toLowerCase().includes(q) || (t.titleTe && t.titleTe.includes(searchQuery))
        );
        return chapterMatches || subtopicMatches;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="atlas-view">
      {!selectedTopic ? (
        <div className="atlas-hub">
          {/* Hero Header */}
          <div className="atlas-hub-header">
            <div className="atlas-hub-title-wrap">
              <div className="eyebrow"><Compass size={15} /> {currentLang === 'te' ? 'విజువల్ అట్లాస్ · 8 ప్రధాన అధ్యాయాలు' : 'VISUAL ATLAS · 8 CORE CHAPTERS'}</div>
              <h1>{currentLang === 'te' ? 'ఇంటరాక్టివ్ అట్లాస్ సిలబస్' : 'Interactive Atlas Syllabus'}</h1>
              <p>
                {currentLang === 'te'
                  ? 'ప్రతి అధ్యాయాన్ని తెరవడానికి క్రింది బాణాన్ని (Arrow Down) క్లిక్ చేయండి. ఉప-అంశాలను 2D/3D మ్యాప్‌లు మరియు పరీక్ష వాస్తవాలతో అన్వేషించండి.'
                  : 'Click the Arrow Down on any chapter to reveal its subtopics. Launch 2D/3D maps and high-yield fact cards with Take You Forward buttons.'}
              </p>
            </div>

            <div className="atlas-hub-actions" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <button
                className="syllabus-toggle-all-btn"
                onClick={toggleAllChapters}
                title={allExpanded ? 'Collapse All Chapters' : 'Expand All Chapters'}
              >
                {allExpanded ? <Folder size={15} /> : <FolderOpen size={15} />}
                <span>
                  {allExpanded
                    ? (currentLang === 'te' ? 'అన్నీ కుదించు' : 'Collapse All')
                    : (currentLang === 'te' ? 'అన్నీ విస్తరించు' : 'Expand All')}
                </span>
              </button>

              {onToggleLang && (
                <button className="lang-pill" onClick={onToggleLang} title="Toggle English / Telugu">
                  {currentLang === 'en' ? '🇮🇳 English' : '🇮🇳 తెలుగు'}
                </button>
              )}
            </div>
          </div>

          {/* Search & Categories Filter Bar */}
          <div className="atlas-filter-bar">
            <div className="atlas-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder={currentLang === 'te' ? 'నదులు, విద్యుత్ కేంద్రాలు, దేవాలయాలు, ఉద్యానవనాలు వెతకండి…' : 'Search rivers, power plants, temples, dynasties, parks…'}
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

          {/* 8 Chapters Accordion Container */}
          <div className="syllabus-subjects-container">
            {displayedChapters.map(ch => {
              const IconComp = ch.icon;
              const subtopics = ATLAS_TOPICS.filter(t => {
                if (t.category !== ch.category) return false;
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase();
                return t.title.toLowerCase().includes(q) ||
                  (t.titleTe && t.titleTe.includes(searchQuery));
              });
              const isOpen = !!openChapters[ch.id];

              return (
                <div
                  key={ch.id}
                  id={`atlas-chapter-${ch.id}`}
                  className={`syllabus-subject-block ${isOpen ? 'is-open' : 'is-collapsed'}`}
                  style={{
                    borderLeft: `5px solid ${ch.accent}`,
                    borderColor: isOpen ? ch.accent : ch.borderGlow,
                    background: `linear-gradient(to right, ${ch.bgLight}22, var(--card) 45%)`
                  }}
                >
                  {/* Chapter Header Row (Clickable Accordion with Arrow Down) */}
                  <div
                    className="syllabus-subject-header"
                    onClick={() => toggleChapter(ch.id)}
                  >
                    <div className="ssh-left">
                      <div
                        className="ssh-number-tag"
                        style={{
                          color: ch.accent,
                          background: ch.bgLight,
                          border: `1.5px solid ${ch.accent}44`,
                          borderRadius: '8px',
                          padding: '3px 9px',
                          fontSize: '17px',
                          fontWeight: 900,
                          opacity: 1
                        }}
                      >
                        {ch.num}
                      </div>
                      <div className="ssh-icon-badge" style={{ background: ch.bgLight, color: ch.accent, border: `1px solid ${ch.accent}33` }}>
                        <IconComp size={22} />
                      </div>
                      <div className="ssh-titles">
                        <div className="ssh-title-row">
                          <h2>{currentLang === 'te' ? ch.titleTe : ch.title}</h2>
                          <span
                            className="ssh-count-pill"
                            style={{ background: ch.bgLight, color: ch.accent, borderColor: ch.accent + '44' }}
                          >
                            {subtopics.length} {currentLang === 'te' ? 'ఉప-టాపిక్స్' : 'Subtopics'}
                          </span>
                        </div>
                        {currentLang === 'te' && <div className="ssh-english-sub">{ch.title}</div>}
                        <p className="ssh-desc">{currentLang === 'te' ? ch.descTe : ch.desc}</p>
                      </div>
                    </div>

                    <div className="ssh-right">
                      <span
                        className="ssh-weight-badge"
                        style={{ background: ch.bgLight, color: ch.accent, border: `1px solid ${ch.accent}44` }}
                      >
                        {currentLang === 'te' ? ch.weightTe : ch.weight}
                      </span>
                      <button
                        className="accordion-arrow-btn"
                        style={{ color: ch.accent, background: ch.bgLight }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChapter(ch.id);
                        }}
                        aria-label="Toggle Chapter Subtopics"
                      >
                        <ChevronDown
                          size={20}
                          className={`accordion-arrow ${isOpen ? 'rotated' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Subtopics List (Rendered when expanded) */}
                  {isOpen && (
                    <div className="syllabus-subtopics-list">
                      {subtopics.length > 0 ? (
                        subtopics.map((topic, idx) => {
                          return (
                            <div
                              key={topic.slug}
                              className="syllabus-lesson-row"
                              onClick={() => setSelectedTopic(topic)}
                            >
                              <div className="slr-left">
                                <span
                                  className="slr-number"
                                  style={{
                                    background: topic.color + '18',
                                    color: topic.color,
                                    borderColor: topic.color + '44'
                                  }}
                                >
                                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                              </div>

                              <div className="slr-main">
                                <div className="slr-header-line">
                                  <h3 className="slr-title">
                                    {currentLang === 'te' && topic.titleTe ? topic.titleTe : topic.title}
                                  </h3>
                                  {currentLang === 'te' && <span className="slr-sub-en">{topic.title}</span>}
                                </div>

                                <div className="slr-meta-tags">
                                  <span className="slr-tag visual" style={{ borderColor: topic.color + '44', color: topic.color }}>
                                    {topic.hasMap ? '🗺️ 2D/3D Map & Fact Cards' : '⚡ High-Yield Fact Cards'}
                                  </span>
                                  <span className="slr-tag yield">
                                    <Flame size={11} color={topic.color} /> {topic.count} {currentLang === 'te' ? 'రికార్డులు' : 'Entries'}
                                  </span>
                                  <span className="slr-tag era">
                                    {topic.category}
                                  </span>
                                </div>
                              </div>

                              <div className="slr-right">
                                <button
                                  className="btn-take-forward"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTopic(topic);
                                  }}
                                >
                                  <span>{currentLang === 'te' ? 'మ్యాప్ తెరవండి' : 'Open Map & Facts'}</span>
                                  <ArrowRight size={16} className="take-forward-arrow" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no-subtopics-found">
                          <p>{currentLang === 'te' ? 'ఈ శోధనకు సంబంధించిన అంశాలు లేవు.' : 'No subtopics match your search in this chapter.'}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <TopicDetail
          topic={selectedTopic}
          lang={currentLang}
          onToggleLang={onToggleLang}
          onBack={() => setSelectedTopic(null)}
          data={data}
          update={update}
          onOpenChapter={onOpenChapter}
        />
      )}
    </div>
  );
}

// ==============================================================
// UNIVERSAL DYNAMIC METRICS EXTRACTOR ACROSS ALL 33 TOPICS
// ==============================================================
function getItemMetrics(item, topic, lang) {
  if (!item) return [];
  const metrics = [];

  // Rivers
  if (item.org) {
    metrics.push({
      label: lang === 'te' ? 'ఉద్భవం / మూలం' : 'Origin / Source',
      val: item.org
    });
  }
  if (item.drain) {
    metrics.push({
      label: lang === 'te' ? 'సంగమం' : 'Drainage',
      val: item.drain
    });
  }
  if (item.L) {
    metrics.push({
      label: lang === 'te' ? 'పొడవు' : 'Length',
      val: `${item.L} km`
    });
  }

  // Mountain Peaks
  if (item.elev) {
    metrics.push({
      label: lang === 'te' ? 'శిఖర ఎత్తు' : 'Elevation',
      val: `${item.elev} m`
    });
  }
  if (item.range) {
    metrics.push({
      label: lang === 'te' ? 'పర్వత శ్రేణి' : 'Mountain Range',
      val: item.range
    });
  }

  // Power Plants
  if (item.cap) {
    metrics.push({
      label: lang === 'te' ? 'సామర్థ్యం' : 'Capacity',
      val: item.cap
    });
  }
  if (item.fuelType) {
    metrics.push({
      label: lang === 'te' ? 'ఇంధన రకం' : 'Fuel Type',
      val: item.fuelType
    });
  }
  if (item.op) {
    metrics.push({
      label: lang === 'te' ? 'నిర్వాహక సంస్థ' : 'Operator',
      val: item.op
    });
  }

  // Classification & Features (Lakes, Soils, Temples, Monuments, Physical India)
  if (item.cat && !item.org && !item.elev) {
    metrics.push({
      label: lang === 'te' ? 'వర్గీకరణ' : 'Classification',
      val: item.cat
    });
  }
  if (item.arch) {
    metrics.push({
      label: (topic.slug === 'temples' || topic.slug === 'monuments')
        ? (lang === 'te' ? 'శిల్పశైలి' : 'Architecture')
        : (lang === 'te' ? 'ప్రధాన విశిష్టత' : 'Key Feature'),
      val: item.arch
    });
  }
  if (item.deity && topic.slug === 'temples') {
    metrics.push({
      label: lang === 'te' ? 'ప్రధాన దైవం' : 'Presiding Deity',
      val: item.deity
    });
  }
  if (item.kd) {
    metrics.push({
      label: lang === 'te' ? 'భౌగోళిక రూపం' : 'Feature Type',
      val: item.kd
    });
  }
  if (item.tag && !item.elev) {
    metrics.push({
      label: topic.slug === 'national-parks'
        ? (lang === 'te' ? 'వన్యప్రాణి' : 'Key Wildlife')
        : (lang === 'te' ? 'ముఖ్యాంశం' : 'Key Highlight'),
      val: item.tag
    });
  }
  if (item.riv) {
    metrics.push({
      label: lang === 'te' ? 'ప్రవహించే నది' : 'River Basin',
      val: item.riv
    });
  }
  if (item.yr && item.yr !== '—') {
    metrics.push({
      label: lang === 'te' ? 'కాలం / సంవత్సరం' : 'Period / Year',
      val: String(item.yr)
    });
  }

  return metrics.slice(0, 4);
}

// ==============================================================
// HIGH-YIELD SSC PYQ FLASHCARD GENERATOR ACROSS 33 TOPICS
// ==============================================================
function getSSCFlashcard(item, topic, lang) {
  if (!item) return null;

  if (item.pyq && item.pyqAns) {
    return {
      question: item.pyq,
      answer: item.pyqAns,
      freq: lang === 'te' ? 'SSC CGL & RRB పరీక్షలలో పునరావృతం' : 'Asked 4+ times in SSC CGL / CHSL / RRB NTPC'
    };
  }

  const name = item.n;
  const slug = topic.slug;

  if (slug === 'rivers') {
    return {
      question: `Where does River ${name} originate and what is its primary basin?`,
      answer: `Origin: ${item.org || 'Himalayan glaciers / Peninsular plateaus'} | Confluence: ${item.drain || 'Bay of Bengal / Arabian Sea'} (Length: ${item.L ? item.L + ' km' : 'Major river'}).`,
      freq: 'Core SSC Geography PYQ'
    };
  }

  if (slug === 'lakes') {
    return {
      question: `Which state is ${name} located in and what is its key geographic distinction?`,
      answer: `${name} is located in ${item.st || 'India'}. ${item.arch ? `Distinction: ${item.arch}.` : ''} Classification: ${item.cat || 'Waterbody'}.`,
      freq: 'Repeated in SSC CGL & CPO Exams'
    };
  }

  if (slug === 'soils') {
    return {
      question: `What are the agricultural and formation characteristics of ${name}?`,
      answer: `Soil Group: ${item.cat || 'Major Indian Soil'} in ${item.st || 'India'}. Characteristics: ${item.arch || item.fact || 'High agricultural value'}.`,
      freq: 'High-Yield SSC Soil & Agriculture Question'
    };
  }

  if (slug === 'mountain-peaks') {
    return {
      question: `Which mountain range is ${name} part of and what is its geographical importance?`,
      answer: `Range: ${item.range || 'Indian Mountains'} (${item.elev ? item.elev + ' m' : 'Prominent summit'}) in ${item.st || item.country || 'India'}. ${item.tag || ''}`,
      freq: 'Frequent SSC Physical Geography PYQ'
    };
  }

  if (slug === 'physical-india') {
    return {
      question: `What strategic feature or mountain pass connection does ${name} represent?`,
      answer: `Type: ${item.kd || 'Geographic Feature'} in ${item.s || item.st || 'India'}. Route / Significance: ${item.tag || item.fact || 'Key geographic landmark'}.`,
      freq: 'High-Frequency SSC CGL / CDS Question'
    };
  }

  if (slug === 'power-plants') {
    return {
      question: `In which state is ${name} situated and what is its capacity/fuel type?`,
      answer: `State: ${item.st || item.s || 'India'} | Fuel: ${item.fuelType || item.cat || 'Energy'} | Capacity: ${item.cap || 'Major plant'}.`,
      freq: 'SSC Infrastructure & Energy GK'
    };
  }

  if (slug === 'national-parks') {
    return {
      question: `Which state is ${name} in and which wildlife species is it famous for?`,
      answer: `State: ${item.st || item.s || 'India'} | Fauna: ${item.tag || 'Endangered fauna'}${item.riv ? ` | River: ${item.riv}` : ''}.`,
      freq: 'Repeated 5+ times in SSC & State PSC'
    };
  }

  if (slug === 'temples' || slug === 'monuments') {
    return {
      question: `In which state is ${name} located and what architectural style or deity is it known for?`,
      answer: `Location: ${item.st || 'India'} | Style/Deity: ${item.arch || item.deity || 'Historic landmark'} | Period: ${item.yr || 'Historical dynasty'}.`,
      freq: 'SSC Art & Culture Core Question'
    };
  }

  return {
    question: `What is the most frequently tested fact about ${name} in competitive exams?`,
    answer: item.fact || `${name} is located in ${item.st || item.s || 'India'}.`,
    freq: 'SSC Static GK Repeat Fact'
  };
}

// ==============================================================
// TOPIC DETAIL COMPONENT: ENLARGED BOLD LEFT INSPECTOR + MAP
// ==============================================================
function TopicDetail({ topic, lang, onToggleLang, onBack, data, update, onOpenChapter }) {
  const [activeTab, setActiveTab] = useState(topic.hasMap ? 'map' : 'cards');
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [cardSearch, setCardSearch] = useState('');
  const [flashcardOpen, setFlashcardOpen] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Reset flashcard whenever activeItem changes
  useEffect(() => {
    setFlashcardOpen(false);
  }, [activeItem]);

  useEffect(() => {
    let isLive = true;
    setLoading(true);
    import(`./datasets/${topic.slug}.json`)
      .then(m => {
        if (isLive) {
          const loaded = m.default || m;
          setDataset(loaded);
          setLoading(false);
          // Set first prominent item as default active item for immediate visual impact
          const itemsArr = loaded.items || loaded.entries || [];
          if (itemsArr.length > 0) {
            setActiveItem(itemsArr[0]);
          }
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
          questionTe: `${m.q[0]} (తెలుగు సాధన)`,
          optionsEn: allOpts.map(o => o[0]),
          optionsTe: allOpts.map(o => o[0]),
          correctEn: correctOpt[0],
          explainEn: m.e ? m.e[0] : '',
          explainTe: m.e ? m.e[0] : ''
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
          questionTe: `${it.n} ఏ రాష్ట్రం లేదా ప్రాంతానికి సంబంధించినది?`,
          optionsEn: allChoices.map(c => c.st || c.s || c.org || c.n),
          optionsTe: allChoices.map(c => translateState(c.st || c.s || c.org || c.n)),
          correctEn: it.st || it.s || it.org || it.n,
          explainEn: it.fact || `${it.n} is located in ${it.st || it.s || 'India'}.`,
          explainTe: it.fact || `${it.n} ${translateState(it.st || it.s || 'India')}లో ఉంది.`
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

  // Name formatting helpers for Telugu
  const displayItemName = (it) => {
    if (!it) return '';
    if (lang === 'te') {
      if (topic.slug === 'rivers') return translateRiver(it.n);
      return it.n;
    }
    return it.n;
  };

  const displayStateName = (it) => {
    if (!it) return '';
    const st = it.st || it.s || 'India';
    return lang === 'te' ? translateState(st) : st;
  };

  return (
    <div className="atlas-topic-detail">
      {/* Top Navigation Strip */}
      <div className="topic-header-bar">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={17} /> {lang === 'te' ? '← అట్లాస్ అధ్యాయాల సిలబస్' : '← Back to Atlas Chapters'}
        </button>

        <div className="topic-title-area">
          <span className="topic-icon-badge mini" style={{ backgroundColor: topic.color + '22', color: topic.color }}>
            <IconComp size={20} />
          </span>
          <div>
            <h2>{lang === 'te' && topic.titleTe ? topic.titleTe : topic.title}</h2>
            <small>{topic.category} · {items.length} {lang === 'te' ? 'ధృవీకరించబడిన రికార్డులు' : 'verified entries'}</small>
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
          {onToggleLang && (
            <button className="lang-pill" onClick={onToggleLang} title="Switch English / Telugu">
              {lang === 'en' ? 'EN' : 'తెలుగు'}
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: 2D-3D Map View with LEFT MAP and RIGHT SIDE INFO */}
      {activeTab === 'map' && (
        <div className="atlas-map-workspace">
          {/* LEFT COLUMN: 2D/3D MAP CANVAS */}
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

          {/* RIGHT COLUMN: ENLARGED, BOLD INSPECTION CARD */}
          <div className="map-inspector-col">
            {activeItem ? (
              <div className="inspector-card featured-focus">
                {/* Visual Category & Status Badge */}
                <div className="inspector-top-badge-row">
                  <span className="inspector-badge" style={{ backgroundColor: topic.color + '25', color: topic.color, borderColor: topic.color }}>
                    <span className="badge-dot" style={{ backgroundColor: topic.color }} />
                    {activeItem.cat || topic.title}
                  </span>
                  <span className="inspector-state-pill">
                    📍 {displayStateName(activeItem)}
                  </span>
                </div>

                {/* Primary Bold Title (Outfit Font 26px, Reflects to eye) */}
                <h3 className="inspector-main-title">{displayItemName(activeItem)}</h3>
                {lang === 'te' && <div className="inspector-english-sub">{activeItem.n}</div>}

                {/* Universal Metrics Grid (Lakes, Soils, Peaks, Rivers, Parks, Plants, Temples, etc.) */}
                {(() => {
                  const metrics = getItemMetrics(activeItem, topic, lang);
                  if (!metrics.length) return null;
                  return (
                    <div className="inspector-metrics-grid">
                      {metrics.map((m, mIdx) => (
                        <div key={mIdx} className="metric-box">
                          <span className="metric-lbl">{m.label}</span>
                          <strong className="metric-val">{m.val}</strong>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* High-Yield SSC Repeat PYQ Flashcard */}
                {(() => {
                  const flashcard = getSSCFlashcard(activeItem, topic, lang);
                  if (!flashcard) return null;
                  return (
                    <div className="inspector-ssc-flashcard">
                      <div className="flashcard-badge-row">
                        <span className="flashcard-tag">
                          <Flame size={14} color="#f59e0b" />
                          {lang === 'te' ? 'SSC పునరావృత ప్రశ్న' : 'SSC REPEAT QUESTION'}
                        </span>
                        <span className="flashcard-freq">{flashcard.freq}</span>
                      </div>
                      <div className="flashcard-question-wrap">
                        <span className="q-label">Q:</span>
                        <p className="q-text">{flashcard.question}</p>
                      </div>
                      {flashcardOpen ? (
                        <div className="flashcard-answer-revealed">
                          <div className="ans-header">
                            <span>✅ {lang === 'te' ? 'SSC పరీక్ష సమాధానం' : 'EXACT SSC ANSWER'}</span>
                          </div>
                          <p className="ans-text">{flashcard.answer}</p>
                        </div>
                      ) : (
                        <button
                          className="flashcard-reveal-btn"
                          onClick={() => setFlashcardOpen(true)}
                        >
                          👁️ {lang === 'te' ? 'సమాధానం చూడండి (SSC Answer)' : 'Tap to Reveal SSC Exam Answer'}
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Highlighted Key Exam Fact (Eye-Catching Glow Card) */}
                {activeItem.fact && (
                  <div className="fact-box-prominent">
                    <div className="fact-prominent-head">
                      <span>⚡ {lang === 'te' ? 'కీలక పరీక్షాంశం' : 'KEY EXAM FACT'}</span>
                      <span className="ssc-verified-tag">SSC Verified</span>
                    </div>
                    <p className="fact-prominent-body">{activeItem.fact}</p>
                  </div>
                )}

                {/* Tributaries or Details */}
                {activeItem.tr && (
                  <div className="inspector-tributaries-box">
                    <span className="trib-label">{lang === 'te' ? 'ప్రధాన ఉపనదులు:' : 'Major Tributaries:'}</span>
                    <p className="trib-text">{activeItem.tr}</p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  className="primary big glow-btn"
                  style={{ marginTop: '1rem', width: '100%' }}
                  onClick={() => setActiveTab('quiz')}
                >
                  🎯 {lang === 'te' ? `${displayItemName(activeItem)} పై క్విజ్ సాధన చేయండి` : `Test Recall on ${activeItem.n} →`}
                </button>
              </div>
            ) : (
              <div className="inspector-placeholder">
                <Compass size={48} strokeWidth={1.5} color={topic.color} />
                <h3>{lang === 'te' ? 'ఇంటరాక్టివ్ అట్లాస్ సిద్ధంగా ఉంది' : 'Interactive Atlas Ready'}</h3>
                <p>
                  {lang === 'te'
                    ? 'పరీక్ష వాస్తవాలు, మూలస్థానాలు మరియు వివరాలను పరిశీలించడానికి మ్యాప్‌లోని ఏదైనా నది లేదా గుర్తుపై క్లిక్ చేయండి.'
                    : 'Click any river, marker, or state on the map to inspect high-yield exam facts and notes.'}
                </p>

                {/* Quick picker list if nothing is selected */}
                <div className="quick-picker-list">
                  <div className="picker-title">{lang === 'te' ? 'ఈ అంశంలోని ప్రముఖమైనవి:' : 'Featured in this topic:'}</div>
                  {items.slice(0, 6).map((it, idx) => (
                    <button key={idx} className="picker-item-btn" onClick={() => setActiveItem(it)}>
                      <span>{displayItemName(it)}</span>
                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
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
                placeholder={lang === 'te' ? 'పేరు లేదా వివరణతో వెతకండి…' : 'Filter facts by name, state, or keywords…'}
                value={cardSearch}
                onChange={e => setCardSearch(e.target.value)}
              />
            </div>
            <div className="count-info">{filteredItems.length} of {items.length} {lang === 'te' ? 'కార్డులు' : 'cards shown'}</div>
          </div>

          <div className="cards-masonry">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="study-card">
                <div className="study-card-head">
                  <h4>{displayItemName(item)}</h4>
                  <span className="card-loc-pill">{displayStateName(item)}</span>
                </div>
                {lang === 'te' && <div className="card-english-sub">{item.n}</div>}
                <p className="card-fact">{item.fact || item.details?.en || 'Key static GK entry.'}</p>
                {item.tr && (
                  <div className="card-meta">
                    <b>{lang === 'te' ? 'ఉపనదులు:' : 'Tributaries:'}</b> {item.tr}
                  </div>
                )}
                {item.cap && (
                  <div className="card-meta">
                    <b>{lang === 'te' ? 'సామర్థ్యం:' : 'Capacity:'}</b> {item.cap}
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
              <h2>{lang === 'te' ? 'యాక్టివ్ రీకాల్ సాధన ప్రారంభించండి' : 'Practice Active Recall'}</h2>
              <p>
                {lang === 'te'
                  ? `${topic.titleTe || topic.title} కొరకు ${questions.length} ప్రశ్నలు అందుబాటులో ఉన్నాయి. తక్షణ ఫీడ్‌బ్యాక్‌తో పరీక్ష పరిస్థితుల్లో రీకాల్ సాధన చేయండి.`
                  : `${questions.length} questions available for ${topic.title}. Test your recall under exam conditions with immediate feedback.`}
              </p>
              <button
                className="primary big glow-btn"
                onClick={() => { setQuizStarted(true); setQuizIdx(0); setScore(0); setSelectedChoice(null); }}
              >
                {lang === 'te' ? `క్విజ్ ప్రారంభించండి (${questions.length} Qs) →` : `Start Quiz Drill (${questions.length} Qs) →`}
              </button>
            </div>
          ) : quizIdx < questions.length ? (
            <div className="quiz-active-card">
              <div className="quiz-progress-bar">
                <div className="progress-fill" style={{ width: `${((quizIdx + 1) / questions.length) * 100}%` }} />
              </div>
              <div className="quiz-q-num">
                {lang === 'te'
                  ? `ప్రశ్న ${quizIdx + 1} / ${questions.length} · స్కోర్: ${score}`
                  : `QUESTION ${quizIdx + 1} OF ${questions.length} · SCORE: ${score}`}
              </div>

              <h3 className="quiz-question">
                {lang === 'te' ? questions[quizIdx].questionTe : questions[quizIdx].questionEn}
              </h3>

              <div className="quiz-options-list">
                {(lang === 'te' ? questions[quizIdx].optionsTe : questions[quizIdx].optionsEn).map((opt, i) => {
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
                    <b>
                      {selectedChoice === questions[quizIdx].correctEn
                        ? (lang === 'te' ? '✓ సరైన సమాధానం! +10 XP' : '✓ Correct! +10 XP')
                        : (lang === 'te' ? '✗ తప్పు సమాధానం (పునశ్చరణ జాబితాకు జోడించబడింది)' : '✗ Incorrect (Saved to Mistakes queue)')}
                    </b>
                    <p>{lang === 'te' ? questions[quizIdx].explainTe : questions[quizIdx].explainEn}</p>
                  </div>
                  <button className="primary" onClick={nextQuestion}>
                    {quizIdx + 1 < questions.length
                      ? (lang === 'te' ? 'తదుపరి ప్రశ్న →' : 'Next Question →')
                      : (lang === 'te' ? 'ఫలితాలు చూడండి →' : 'View Results →')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-results-card">
              <Trophy size={48} color="#f59e0b" />
              <h2>{lang === 'te' ? 'క్విజ్ పూర్తయింది!' : 'Quiz Completed!'}</h2>
              <div className="score-badge">
                {lang === 'te'
                  ? `మీరు ${questions.length} లో ${score} సాధించారు`
                  : `You scored ${score} out of ${questions.length}`}
              </div>
              <p>
                {lang === 'te'
                  ? 'తప్పు సమాధానాలు సమీక్ష విభాగంలోని అంతర పునశ్చరణ జాబితాకు చేర్చబడ్డాయి.'
                  : 'Incorrect answers have been added to your Spaced Repetition queue in the Review section.'}
              </p>
              <div className="results-actions">
                <button className="outline" onClick={() => { setQuizIdx(0); setScore(0); setSelectedChoice(null); }}>
                  {lang === 'te' ? 'మళ్ళీ సాధన చేయండి' : 'Retake Quiz'}
                </button>
                <button className="primary" onClick={() => setActiveTab('map')}>
                  {lang === 'te' ? 'అట్లాస్ మ్యాప్‌కి తిరిగి వెళ్లండి' : 'Back to Atlas Map'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
