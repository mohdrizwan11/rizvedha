import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Search,
  Compass,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  HelpCircle,
  Award,
  Zap,
  Flame,
  Landmark,
  Scale,
  TrendingUp,
  Atom,
  Palette,
  Globe2
} from 'lucide-react';
import { SEVEN_SUBJECTS, LEARN_TOPICS } from './learnCurriculum.js';

// Map icon strings to Lucide components
const ICON_MAP = {
  Landmark,
  Compass,
  Scale,
  TrendingUp,
  Atom,
  Palette,
  Globe2
};

export default function LearnView({ lang = 'en', onNavigate = () => {} }) {
  // activeTopic: null = Master Syllabus Directory, non-null = Focused Visual Study Room
  const [activeTopic, setActiveTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tableRevealed, setTableRevealed] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [completedList, setCompletedList] = useState([]);

  // Accordion state: all 7 subjects closed by default, user opens and explores each topic
  const [openSubjects, setOpenSubjects] = useState({});

  // Load completed topics from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kosha-learn-completed');
      if (stored) {
        setCompletedList(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save completed topics to local storage
  const markTopicCompleted = (topicId) => {
    if (!completedList.includes(topicId)) {
      const updated = [...completedList, topicId];
      setCompletedList(updated);
      try {
        localStorage.setItem('kosha-learn-completed', JSON.stringify(updated));
        // Add 10 XP locally
        const curXp = parseInt(localStorage.getItem('kosha-xp') || '0', 10);
        localStorage.setItem('kosha-xp', (curXp + 10).toString());
      } catch {
        // Fallback
      }
    }
  };

  // Toggle individual subject accordion
  const toggleSubject = (subjId) => {
    setOpenSubjects(prev => ({
      ...prev,
      [subjId]: !prev[subjId]
    }));
  };

  // Toggle all subjects open/closed
  const toggleAllSubjects = () => {
    const anyOpen = SEVEN_SUBJECTS.some(s => !!openSubjects[s.id]);
    const updated = {};
    SEVEN_SUBJECTS.forEach(s => {
      updated[s.id] = !anyOpen;
    });
    setOpenSubjects(updated);
  };

  // Filter topics based on search
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return LEARN_TOPICS;
    const q = searchQuery.toLowerCase();
    return LEARN_TOPICS.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.titleTe && t.titleTe.toLowerCase().includes(q)) ||
      t.subject.toLowerCase().includes(q) ||
      t.heroHook.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Group filtered topics by subjectKey
  const topicsBySubject = useMemo(() => {
    const map = {};
    SEVEN_SUBJECTS.forEach(s => {
      map[s.subjectKey] = filteredTopics.filter(t => t.subject === s.subjectKey);
    });
    return map;
  }, [filteredTopics]);

  // When searching, automatically expand subjects with matching results
  useEffect(() => {
    if (searchQuery.trim()) {
      const updated = {};
      SEVEN_SUBJECTS.forEach(s => {
        if ((topicsBySubject[s.subjectKey] || []).length > 0) {
          updated[s.id] = true;
        }
      });
      setOpenSubjects(updated);
    }
  }, [searchQuery, topicsBySubject]);

  // Smooth scroll to a subject section
  const scrollToSubject = (subjectId) => {
    // If collapsed, expand it first
    setOpenSubjects(prev => ({ ...prev, [subjectId]: true }));
    setTimeout(() => {
      const el = document.getElementById(`subject-section-${subjectId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Handle open topic
  const openTopic = (topic) => {
    setActiveTopic(topic);
    setTableRevealed(false);
    setQuizIdx(0);
    setSelectedOpt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation between topics in study mode
  const currentTopicIndex = useMemo(() => {
    if (!activeTopic) return -1;
    return LEARN_TOPICS.findIndex(t => t.id === activeTopic.id);
  }, [activeTopic]);

  const goToPrevTopic = () => {
    if (currentTopicIndex > 0) {
      openTopic(LEARN_TOPICS[currentTopicIndex - 1]);
    }
  };

  const goToNextTopic = () => {
    if (currentTopicIndex < LEARN_TOPICS.length - 1) {
      openTopic(LEARN_TOPICS[currentTopicIndex + 1]);
    }
  };

  // -------------------------------------------------------------
  // RENDER DEDICATED SVG INFOGRAPHIC SCHEMATIC
  // -------------------------------------------------------------
  const renderInfographic = (type) => {
    switch (type) {
      case 'indus-grid':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(45, 30)">
              <rect width="280" height="190" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="10" />
              <text x="140" y="32" textAnchor="middle" fontWeight="bold" fill="#78350f" fontSize="13">WESTERN CITADEL (ELEVATED MOUND)</text>
              <rect x="35" y="55" width="210" height="75" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6" />
              <text x="140" y="92" textAnchor="middle" fill="#0369a1" fontWeight="700" fontSize="12">THE GREAT BATH (Mohenjo-Daro)</text>
              <text x="140" y="112" textAnchor="middle" fill="#0284c7" fontSize="10">Bitumen lining & gypsum mortar</text>
              <text x="140" y="155" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">• Granaries & Assembly Halls</text>
              <text x="140" y="172" textAnchor="middle" fill="#64748b" fontSize="10">Reserved for ritual & administrative elite</text>
            </g>
            <text x="370" y="130" textAnchor="middle" fontSize="24" fill="#94a3b8" fontWeight="bold">→</text>
            <g transform="translate(415, 30)">
              <rect width="280" height="190" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="10" />
              <text x="140" y="32" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">EASTERN LOWER TOWN (RESIDENTIAL)</text>
              <line x1="40" y1="65" x2="240" y2="65" stroke="#94a3b8" strokeDasharray="4" strokeWidth="1.5" />
              <line x1="40" y1="110" x2="240" y2="110" stroke="#94a3b8" strokeDasharray="4" strokeWidth="1.5" />
              <line x1="95" y1="50" x2="95" y2="135" stroke="#94a3b8" strokeDasharray="4" strokeWidth="1.5" />
              <line x1="185" y1="50" x2="185" y2="135" stroke="#94a3b8" strokeDasharray="4" strokeWidth="1.5" />
              <text x="140" y="155" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="600">• Strict Cardo-Decumanus Grid</text>
              <text x="140" y="172" textAnchor="middle" fill="#64748b" fontSize="10">Burnt-brick houses with covered street drains</text>
            </g>
          </svg>
        );

      case 'mauryan-pillar':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(60, 25)">
              <rect x="230" y="25" width="160" height="190" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="10" />
              <circle cx="310" cy="80" r="38" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
              <text x="310" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">24 SPOKES</text>
              <text x="310" y="145" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="13">SARNATH PILLAR</text>
              <text x="310" y="165" textAnchor="middle" fill="#92400e" fontSize="10">Lion Capital (National Emblem)</text>
              <text x="310" y="185" textAnchor="middle" fill="#b45309" fontSize="10">"Satyameva Jayate" (Mundaka)</text>

              <rect x="20" y="55" width="180" height="130" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="8" />
              <text x="110" y="85" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="13">Rock Edict XIII</text>
              <text x="110" y="110" textAnchor="middle" fill="#0f172a" fontSize="11">Kalinga War (261 BCE)</text>
              <text x="110" y="130" textAnchor="middle" fill="#64748b" fontSize="10">Devastating slaughter</text>
              <text x="110" y="155" textAnchor="middle" fill="#0284c7" fontWeight="600" fontSize="11">Bherighosha → Dhammaghosha</text>

              <rect x="420" y="55" width="180" height="130" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" rx="8" />
              <text x="510" y="85" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">Arthashastra</text>
              <text x="510" y="110" textAnchor="middle" fill="#0f172a" fontSize="11">Chanakya / Kautilya</text>
              <text x="510" y="130" textAnchor="middle" fill="#64748b" fontSize="10">Saptanga Theory of State</text>
              <text x="510" y="155" textAnchor="middle" fill="#059669" fontWeight="600" fontSize="11">7 Limbs of Sovereignty</text>
            </g>
          </svg>
        );

      case 'river-basin':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(60, 35)">
              <path d="M 20 30 Q 180 60 320 95" fill="none" stroke="#0284c7" strokeWidth="5" />
              <text x="25" y="20" fill="#0369a1" fontWeight="bold" fontSize="12">Bhagirathi (Gangotri Glacier)</text>
              <path d="M 20 170 Q 180 130 320 95" fill="none" stroke="#38bdf8" strokeWidth="5" />
              <text x="25" y="195" fill="#0284c7" fontWeight="bold" fontSize="12">Alaknanda (Satopanth Glacier)</text>

              <circle cx="320" cy="95" r="14" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
              <text x="320" y="65" textAnchor="middle" fill="#b45309" fontWeight="800" fontSize="14">Devprayag Confluence</text>
              <text x="320" y="130" textAnchor="middle" fill="#78350f" fontSize="10">Panch Prayag Apex</text>

              <path d="M 320 95 Q 480 95 620 95" fill="none" stroke="#1d4ed8" strokeWidth="8" />
              <text x="460" y="78" fill="#1e40af" fontWeight="800" fontSize="16">THE GANGA</text>
              <text x="460" y="125" fill="#475569" fontSize="11">2,525 km · Bay of Bengal</text>
              <text x="460" y="145" fill="#64748b" fontSize="10">Sundarbans Delta with Brahmaputra</text>
            </g>
          </svg>
        );

      case 'writs-architecture':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(25, 30)">
              <rect x="250" y="0" width="220" height="40" fill="#10b981" rx="8" />
              <text x="360" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">ARTICLE 32: THE 5 WRITS</text>
              <g transform="translate(0, 70)">
                {[
                  { name: 'Habeas Corpus', sub: '"To have the body"', desc: 'Against illegal detention' },
                  { name: 'Mandamus', sub: '"We Command"', desc: 'To perform public duty' },
                  { name: 'Prohibition', sub: '"To Forbid"', desc: 'Stops lower court jurisdiction' },
                  { name: 'Certiorari', sub: '"To be Certified"', desc: 'Quashes illegal order' },
                  { name: 'Quo-Warranto', sub: '"By What Authority"', desc: 'Against illegal office holding' }
                ].map((w, i) => (
                  <g key={i} transform={`translate(${i * 138}, 0)`}>
                    <rect width="130" height="115" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" rx="8" />
                    <rect width="130" height="24" fill="#ecfdf5" rx="6" />
                    <text x="65" y="16" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="10">WRIT 0{i + 1}</text>
                    <text x="65" y="45" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="11">{w.name.split(' ')[0]}</text>
                    <text x="65" y="60" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="11">{w.name.split(' ')[1] || ''}</text>
                    <text x="65" y="80" textAnchor="middle" fill="#059669" fontSize="9">{w.sub}</text>
                    <text x="65" y="100" textAnchor="middle" fill="#64748b" fontSize="8">{w.desc}</text>
                  </g>
                ))}
              </g>
            </g>
          </svg>
        );

      case 'rbi-transmission':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(45, 30)">
              <rect x="0" y="30" width="180" height="140" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" rx="10" />
              <text x="90" y="60" textAnchor="middle" fill="#3730a3" fontWeight="bold" fontSize="13">RESERVE BANK</text>
              <text x="90" y="80" textAnchor="middle" fill="#4338ca" fontSize="11">Monetary Authority</text>
              <text x="90" y="115" textAnchor="middle" fill="#1e1b4b" fontWeight="600" fontSize="11">• Repo Rate (Lending)</text>
              <text x="90" y="135" textAnchor="middle" fill="#1e1b4b" fontWeight="600" fontSize="11">• Reverse Repo (Borrowing)</text>
              <text x="90" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Hilton Young Comm. (1935)</text>

              <path d="M 180 100 L 260 100" stroke="#6366f1" strokeWidth="3" />
              <text x="220" y="85" textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="bold">Liquidity</text>

              <rect x="260" y="30" width="180" height="140" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" rx="10" />
              <text x="350" y="60" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="13">COMMERCIAL BANKS</text>
              <text x="350" y="80" textAnchor="middle" fill="#64748b" fontSize="10">CRR & SLR Reserves</text>
              <text x="350" y="115" textAnchor="middle" fill="#475569" fontSize="10">• CRR: Cash held with RBI</text>
              <text x="350" y="135" textAnchor="middle" fill="#475569" fontSize="10">• SLR: Gold/G-Secs with bank</text>
              <text x="350" y="155" textAnchor="middle" fill="#6366f1" fontWeight="bold" fontSize="10">Bank Credit Engine</text>

              <path d="M 440 100 L 510 100" stroke="#10b981" strokeWidth="3" />
              <text x="475" y="85" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Credit</text>

              <rect x="510" y="30" width="180" height="140" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" rx="10" />
              <text x="600" y="60" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">REAL ECONOMY</text>
              <text x="600" y="80" textAnchor="middle" fill="#047857" fontSize="10">Inflation & Growth</text>
              <text x="600" y="115" textAnchor="middle" fill="#064e3b" fontSize="10">Target: 4% ± 2% CPI</text>
              <text x="600" y="135" textAnchor="middle" fill="#064e3b" fontSize="10">6-Member MPC Panel</text>
              <text x="600" y="155" textAnchor="middle" fill="#10b981" fontWeight="600" fontSize="10">Economic Output (GDP)</text>
            </g>
          </svg>
        );

      case 'cell-schematic':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(45, 30)">
              <rect x="0" y="20" width="300" height="160" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2" rx="10" />
              <text x="150" y="45" textAnchor="middle" fill="#9d174d" fontWeight="bold" fontSize="13">PLANT CELL (CELL WALL & CHLOROPLAST)</text>
              <circle cx="70" cy="100" r="30" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
              <text x="70" y="105" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold">Chloroplast</text>
              <rect x="130" y="70" width="145" height="90" fill="#ffffff" stroke="#ec4899" rx="6" />
              <text x="202" y="90" textAnchor="middle" fill="#be185d" fontWeight="bold" fontSize="11">• Rigid Cellulose Wall</text>
              <text x="202" y="110" textAnchor="middle" fill="#475569" fontSize="10">• Large Central Vacuole</text>
              <text x="202" y="130" textAnchor="middle" fill="#475569" fontSize="10">• Autotrophic Photosynthesis</text>

              <text x="350" y="105" textAnchor="middle" fontSize="24" fill="#94a3b8" fontWeight="bold">vs</text>

              <rect x="400" y="20" width="300" height="160" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" rx="10" />
              <text x="550" y="45" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">ANIMAL CELL (NO WALL, LYSOSOMES)</text>
              <ellipse cx="470" cy="100" rx="35" ry="25" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
              <text x="470" y="104" textAnchor="middle" fill="#9a3412" fontSize="9" fontWeight="bold">Mitochondria</text>
              <text x="470" y="135" textAnchor="middle" fill="#ea580c" fontSize="8" fontWeight="bold">ATP Powerhouse</text>
              <rect x="525" y="70" width="155" height="90" fill="#ffffff" stroke="#10b981" rx="6" />
              <text x="602" y="90" textAnchor="middle" fill="#047857" fontWeight="bold" fontSize="11">• Flexible Plasma Membrane</text>
              <text x="602" y="110" textAnchor="middle" fill="#475569" fontSize="10">• Suicide Bags (Lysosomes)</text>
              <text x="602" y="130" textAnchor="middle" fill="#475569" fontSize="10">• Centrosome (Cell Division)</text>
            </g>
          </svg>
        );

      case 'temple-styles':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(30, 25)">
              <g transform="translate(20, 0)">
                <rect width="190" height="190" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="8" />
                <text x="95" y="30" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="12">1. NAGARA STYLE (NORTH)</text>
                <path d="M 95 50 Q 80 110 50 130 L 140 130 Q 110 110 95 50 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                <text x="95" y="115" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Curvilinear Shikhara</text>
                <text x="95" y="150" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Kalasha & Amalaka</text>
                <text x="95" y="168" textAnchor="middle" fill="#64748b" fontSize="9">Khajuraho, Sun Temple, Kashi</text>
              </g>

              <g transform="translate(245, 0)">
                <rect width="190" height="190" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="8" />
                <text x="95" y="30" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="12">2. DRAVIDA STYLE (SOUTH)</text>
                <polygon points="95,50 45,130 145,130" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
                <text x="95" y="105" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Stepped Vimana</text>
                <text x="95" y="150" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">Towering Gopuram Gate</text>
                <text x="95" y="168" textAnchor="middle" fill="#64748b" fontSize="9">Brihadisvara, Meenakshi, Shore</text>
              </g>

              <g transform="translate(470, 0)">
                <rect width="190" height="190" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" rx="8" />
                <text x="95" y="30" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="12">3. VESARA STYLE (HYBRID)</text>
                <rect x="55" y="60" width="80" height="65" fill="#10b981" stroke="#047857" strokeWidth="1.5" rx="6" />
                <text x="95" y="100" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Deccan Hybrid</text>
                <text x="95" y="150" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Chalukya & Hoysala</text>
                <text x="95" y="168" textAnchor="middle" fill="#64748b" fontSize="9">Badami, Aihole, Belur, Halebidu</text>
              </g>
            </g>
          </svg>
        );

      case 'space-defense':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(40, 25)">
              <rect x="0" y="15" width="310" height="175" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" rx="10" />
              <text x="155" y="42" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">ISRO SPACE VEHICLES (1969)</text>
              <rect x="25" y="60" width="120" height="110" fill="#ffffff" stroke="#10b981" rx="6" />
              <text x="85" y="82" textAnchor="middle" fill="#047857" fontWeight="bold" fontSize="11">PSLV</text>
              <text x="85" y="100" textAnchor="middle" fill="#64748b" fontSize="9">Workhorse Rocket</text>
              <text x="85" y="120" textAnchor="middle" fill="#065f46" fontSize="9">4 Stages (S-L-S-L)</text>
              <text x="85" y="140" textAnchor="middle" fill="#059669" fontSize="8">Chandrayaan-1, Mangalyaan</text>

              <rect x="165" y="60" width="120" height="110" fill="#ffffff" stroke="#10b981" rx="6" />
              <text x="225" y="82" textAnchor="middle" fill="#047857" fontWeight="bold" fontSize="11">LVM3 (GSLV Mk3)</text>
              <text x="225" y="100" textAnchor="middle" fill="#64748b" fontSize="9">Heavy Lift Rocket</text>
              <text x="225" y="120" textAnchor="middle" fill="#065f46" fontSize="9">Cryogenic CE-20</text>
              <text x="225" y="140" textAnchor="middle" fill="#059669" fontSize="8">Chandrayaan-3, Gaganyaan</text>

              <rect x="350" y="15" width="310" height="175" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="10" />
              <text x="505" y="42" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="13">DRDO IGMDP MISSILES (PATNA)</text>
              <g transform="translate(365, 60)">
                {[
                  { m: 'P', name: 'Prithvi', type: 'Surface-to-Surface' },
                  { m: 'A', name: 'Agni', type: 'Ballistic (ICBM 5000km+)' },
                  { m: 'T', name: 'Trishul', type: 'Short Surface-to-Air' },
                  { m: 'N', name: 'Nag', type: 'Anti-Tank Fire-and-Forget' },
                  { m: 'A', name: 'Akash', type: 'Surface-to-Air with Radar' }
                ].map((item, idx) => (
                  <g key={idx} transform={`translate(0, ${idx * 21})`}>
                    <rect width="280" height="18" fill="#ffffff" stroke="#93c5fd" rx="4" />
                    <text x="15" y="13" fill="#1d4ed8" fontWeight="bold" fontSize="10">{item.m}</text>
                    <text x="45" y="13" fill="#0f172a" fontWeight="bold" fontSize="10">{item.name}</text>
                    <text x="140" y="13" fill="#64748b" fontSize="9">{item.type}</text>
                  </g>
                ))}
              </g>
            </g>
          </svg>
        );

      case 'coastal-plains':
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(40, 25)">
              <rect x="0" y="20" width="300" height="165" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" rx="8" />
              <text x="150" y="48" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="12">WESTERN COAST (SUBMERGED)</text>
              <text x="150" y="75" textAnchor="middle" fill="#0f172a" fontSize="10">• Konkan Coast: Maharashtra & Goa</text>
              <text x="150" y="95" textAnchor="middle" fill="#0f172a" fontSize="10">• Kannad Coast: Karnataka</text>
              <text x="150" y="115" textAnchor="middle" fill="#0f172a" fontSize="10">• Malabar Coast: Kerala (Kayals/Lagoons)</text>
              <text x="150" y="145" textAnchor="middle" fill="#0284c7" fontWeight="bold" fontSize="11">Forms Estuaries (Narmada, Tapti)</text>

              <rect x="360" y="20" width="300" height="165" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" rx="8" />
              <text x="510" y="48" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="12">CHANNELS & ISLANDS</text>
              <text x="510" y="75" textAnchor="middle" fill="#0f172a" fontSize="10">• 10° Channel: Andaman vs Nicobar</text>
              <text x="510" y="95" textAnchor="middle" fill="#0f172a" fontSize="10">• 9° Channel: Minicoy vs Lakshadweep</text>
              <text x="510" y="115" textAnchor="middle" fill="#0f172a" fontSize="10">• 8° Channel: Minicoy vs Maldives</text>
              <text x="510" y="145" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="11">Barren Island: Active Volcano</text>
            </g>
          </svg>
        );

      default:
        // Universal clean high-contrast schematic
        return (
          <svg viewBox="0 0 740 250" className="infographic-svg">
            <rect width="740" height="250" fill="var(--soft, #f8fafc)" rx="12" />
            <g transform="translate(60, 30)">
              <rect width="620" height="190" fill="#ffffff" stroke="var(--border, #cbd5e1)" strokeWidth="2" rx="10" />
              <rect width="620" height="42" fill="#0284c7" rx="8" />
              <text x="310" y="27" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                {activeTopic?.title || 'CONCEPT VISUAL SCHEMATIC'}
              </text>
              <g transform="translate(30, 65)">
                <rect width="165" height="100" fill="#f8fafc" stroke="#94a3b8" rx="6" />
                <text x="82" y="30" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="11">1. HISTORICAL / SCOPE</text>
                <text x="82" y="55" textAnchor="middle" fill="#64748b" fontSize="10">{activeTopic?.era || 'Foundational Era'}</text>
                <text x="82" y="75" textAnchor="middle" fill="#0284c7" fontSize="9" fontWeight="600">{activeTopic?.badge || 'SSC Core'}</text>

                <rect x="195" y="0" width="170" height="100" fill="#fef3c7" stroke="#d97706" rx="6" />
                <text x="280" y="30" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="11">2. CORE HIGH-YIELD FACT</text>
                <text x="280" y="55" textAnchor="middle" fill="#92400e" fontSize="10">Active Retrieval Point</text>
                <text x="280" y="75" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="600">Exam Repeat Weight</text>

                <rect x="395" y="0" width="165" height="100" fill="#ecfdf5" stroke="#10b981" rx="6" />
                <text x="477" y="30" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="11">3. MEMORY RETRIEVAL</text>
                <text x="477" y="55" textAnchor="middle" fill="#047857" fontSize="10">Mnemonic Association</text>
                <text x="477" y="75" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="600">+10 XP Knowledge Gain</text>
              </g>
            </g>
          </svg>
        );
    }
  };

  // -------------------------------------------------------------
  // VIEW MODE 1: MASTER SYLLABUS (ACCORDION WITH ARROWS DOWN & FORWARD)
  // -------------------------------------------------------------
  if (!activeTopic) {
    const anyOpen = SEVEN_SUBJECTS.some(s => !!openSubjects[s.id]);

    return (
      <div className="learn-master-directory">
        {/* Top Header Banner */}
        <div className="curriculum-top-bar">
          <div className="ctb-header">
            <div>
              <div className="eyebrow">
                <BookOpen size={15} /> {lang === 'te' ? 'సమగ్ర విజువల్ పాఠ్యాంశాలు · 7 విభాగాలు' : 'GENERAL AWARENESS SYLLABUS · 7 CORE SUBJECTS'}
              </div>
              <h1>{lang === 'te' ? 'విజువల్ లెర్నింగ్ పాఠ్యాంశాలు' : 'Visual Learning Curriculum'}</h1>
              <p className="ctb-sub">
                {lang === 'te'
                  ? 'క్రింది బాణం (arrow down) నొక్కి సబ్జెక్టులోని ఉప-పాఠాలను చూడండి. పాఠం ప్రారంభించడానికి "ముందుకు సాగండి" (take you forward) బాణాన్ని అనుసరించండి.'
                  : 'Tap the arrow down to reveal subtopics inside each subject. Use the "Take You Forward" arrow to start any visual lesson.'}
              </p>
            </div>
            <div className="ctb-top-actions">
              <button className="outline mini" onClick={toggleAllSubjects}>
                {anyOpen
                  ? (lang === 'te' ? 'అన్నీ కుదించు' : 'Collapse All')
                  : (lang === 'te' ? 'అన్నీ విస్తరించు' : 'Expand All')}
              </button>
              <button className="outline mini" onClick={() => onNavigate('Atlas')}>
                <Compass size={15} /> {lang === 'te' ? '33 అట్లాస్ మ్యాప్స్' : 'Explore 33 Atlas Maps →'}
              </button>
            </div>
          </div>

          {/* Quick Jump Bar across the 7 Subjects */}
          <div className="subjects-quick-jump-bar">
            <span className="jump-label">{lang === 'te' ? 'విభాగాలు:' : 'Subjects:'}</span>
            <div className="jump-pills-row">
              {SEVEN_SUBJECTS.map(subj => {
                const IconComp = ICON_MAP[subj.iconName] || BookOpen;
                return (
                  <button
                    key={subj.id}
                    className="jump-pill"
                    onClick={() => scrollToSubject(subj.id)}
                  >
                    <IconComp size={13} color={subj.accent} />
                    <span>{subj.num}. {lang === 'te' ? subj.titleTe.split(' ')[0] : subj.title.split(' ')[0]}</span>
                    <ChevronDown size={11} className={openSubjects[subj.id] ? 'arrow-open' : 'arrow-closed'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Across All 29 Subtopics */}
          <div className="curriculum-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={lang === 'te' ? '29 ఉప-పాఠాలలో వెతకండి (సింధు, నదులు, రాజ్యాంగం, GDP, కణాలు, నృత్యాలు)…' : 'Search across all 29 subtopics (Indus, Rivers, Preamble, GDP, Cells, Dances, ISRO)...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        </div>

        {/* SYLLABUS ACCORDION STREAM OF 7 MAIN SUBJECTS */}
        <div className="seven-subjects-vertical-stream">
          {SEVEN_SUBJECTS.map(subj => {
            const IconComp = ICON_MAP[subj.iconName] || BookOpen;
            const subtopics = topicsBySubject[subj.subjectKey] || [];
            const completedInSubj = subtopics.filter(t => completedList.includes(t.id)).length;
            const isOpen = !!openSubjects[subj.id];

            return (
              <div
                key={subj.id}
                id={`subject-section-${subj.id}`}
                className={`syllabus-subject-block ${isOpen ? 'is-open' : 'is-collapsed'}`}
                style={{
                  borderLeft: `5px solid ${subj.accent}`,
                  borderColor: isOpen ? subj.accent : subj.borderGlow,
                  background: `linear-gradient(to right, ${subj.bgLight}22, var(--card) 45%)`
                }}
              >
                {/* Subject Header Row (Clickable Accordion with Arrow Down) */}
                <div
                  className="syllabus-subject-header"
                  onClick={() => toggleSubject(subj.id)}
                >
                  <div className="ssh-left">
                    <div
                      className="ssh-number-tag"
                      style={{
                        color: subj.accent,
                        background: subj.bgLight,
                        border: `1.5px solid ${subj.accent}44`,
                        borderRadius: '8px',
                        padding: '3px 9px',
                        fontSize: '17px',
                        fontWeight: 900,
                        opacity: 1
                      }}
                    >
                      {subj.num}
                    </div>
                    <div className="ssh-icon-badge" style={{ background: subj.bgLight, color: subj.accent, border: `1px solid ${subj.accent}33` }}>
                      <IconComp size={22} />
                    </div>
                    <div className="ssh-titles">
                      <div className="ssh-title-row">
                        <h2>{lang === 'te' ? subj.titleTe : subj.title}</h2>
                        <span
                          className="ssh-count-pill"
                          style={{ background: subj.bgLight, color: subj.accent, borderColor: subj.accent + '44' }}
                        >
                          {subtopics.length} {lang === 'te' ? 'ఉప-పాఠాలు' : 'Subtopics'}
                        </span>
                      </div>
                      {lang === 'te' && <div className="ssh-english-sub">{subj.title}</div>}
                      <p className="ssh-desc">{lang === 'te' ? subj.descTe : subj.desc}</p>
                    </div>
                  </div>

                  <div className="ssh-right">
                    <span
                      className="ssh-weight-badge"
                      style={{ background: subj.bgLight, color: subj.accent, border: `1px solid ${subj.accent}44` }}
                    >
                      {subj.weight}
                    </span>
                    <div className="ssh-progress-pill">
                      <span className="spp-text">{completedInSubj} / {subtopics.length} {lang === 'te' ? 'పూర్తయ్యాయి' : 'Mastered'}</span>
                      <div className="spp-bar">
                        <div
                          className="spp-bar-fill"
                          style={{
                            width: `${subtopics.length > 0 ? (completedInSubj / subtopics.length) * 100 : 0}%`,
                            background: subj.accent
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className="accordion-arrow-btn"
                      style={{ color: subj.accent, background: subj.bgLight }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubject(subj.id);
                      }}
                      aria-label="Toggle Subtopics"
                    >
                      <ChevronDown
                        size={20}
                        className={`accordion-arrow ${isOpen ? 'rotated' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* SUBTOPICS LIST (WHEN EXPANDED - WITH 'TAKE YOU FORWARD' ARROWS) */}
                {isOpen && (
                  <div className="syllabus-subtopics-list">
                    {subtopics.length > 0 ? (
                      subtopics.map((topic, idx) => {
                        const isDone = completedList.includes(topic.id);
                        return (
                          <div
                            key={topic.id}
                            className={`syllabus-lesson-row ${isDone ? 'completed' : ''}`}
                            onClick={() => openTopic(topic)}
                          >
                            <div className="slr-left">
                              <span className={`slr-number ${isDone ? 'done' : ''}`}>
                                {isDone ? <CheckCircle2 size={16} /> : (idx + 1 < 10 ? `0${idx + 1}` : idx + 1)}
                              </span>
                            </div>

                            <div className="slr-main">
                              <div className="slr-header-line">
                                <h3 className="slr-title">
                                  {lang === 'te' ? topic.titleTe : topic.title}
                                </h3>
                                {lang === 'te' && <span className="slr-sub-en">{topic.title}</span>}
                              </div>

                              <div className="slr-meta-tags">
                                <span className="slr-tag era">{topic.era}</span>
                                <span className="slr-tag visual">🎨 {topic.infographicCaption.split('&')[0]}</span>
                                <span className="slr-tag yield">
                                  <Flame size={11} /> {topic.badge.split('·')[0].trim()}
                                </span>
                                {isDone && (
                                  <span className="slr-tag done">
                                    <CheckCircle2 size={11} /> {lang === 'te' ? 'పూర్తయింది (+10 XP)' : 'Mastered (+10 XP)'}
                                  </span>
                                )}
                              </div>

                              <p className="slr-hook">"{lang === 'te' ? topic.heroHookTe : topic.heroHook}"</p>
                            </div>

                            <div className="slr-right">
                              <button
                                className="btn-take-forward"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openTopic(topic);
                                }}
                              >
                                <span>{lang === 'te' ? 'పాఠం ప్రారంభించండి' : 'Start Lesson'}</span>
                                <ArrowRight size={16} className="take-forward-arrow" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-subtopics-found">
                        <p>{lang === 'te' ? 'ఈ శోధనకు సంబంధించిన అంశాలు లేవు.' : 'No subtopics match your search in this subject.'}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW MODE 2: FOCUSED VISUAL STUDY ROOM (FOR ACTIVE SUBTOPIC)
  // -------------------------------------------------------------
  const isCurrentDone = completedList.includes(activeTopic.id);
  const quizList = activeTopic.quiz || [];
  const currentQuiz = quizList[quizIdx] || quizList[0];

  return (
    <div className="study-room-container">
      {/* Sticky Top Navigation Bar */}
      <div className="study-room-top-bar">
        <button className="study-back-btn" onClick={() => setActiveTopic(null)}>
          <ArrowLeft size={16} /> {lang === 'te' ? '← సిలబస్ జాబితాకు తిరిగి వెళ్లండి' : '← Back to Syllabus'}
        </button>

        <div className="study-breadcrumbs">
          <span className="bc-subject">{activeTopic.subject}</span>
          <span className="bc-sep">/</span>
          <strong className="bc-topic">{lang === 'te' ? activeTopic.titleTe : activeTopic.title}</strong>
        </div>

        <div className="study-nav-controls">
          <button
            className="study-nav-btn"
            disabled={currentTopicIndex <= 0}
            onClick={goToPrevTopic}
            title="Previous Subtopic"
          >
            <ArrowLeft size={14} /> {lang === 'te' ? 'మునుపటి' : 'Prev'}
          </button>
          <span className="study-seq-label">
            {currentTopicIndex + 1} / {LEARN_TOPICS.length}
          </span>
          <button
            className="study-nav-btn"
            disabled={currentTopicIndex >= LEARN_TOPICS.length - 1}
            onClick={goToNextTopic}
            title="Next Subtopic"
          >
            {lang === 'te' ? 'తదుపరి' : 'Next'} <ArrowRight size={14} />
          </button>

          <button
            className={`study-mastered-btn ${isCurrentDone ? 'done' : ''}`}
            onClick={() => markTopicCompleted(activeTopic.id)}
          >
            <CheckCircle2 size={15} />
            {isCurrentDone
              ? (lang === 'te' ? 'పూర్తయింది (+10 XP)' : 'Mastered (+10 XP)')
              : (lang === 'te' ? 'పూర్తిగా గుర్తించండి (+10 XP)' : 'Mark as Mastered (+10 XP)')}
          </button>
        </div>
      </div>

      {/* Main Study Content Area */}
      <div className="study-content-workspace">
        {/* Hero Topic Banner */}
        <div className="topic-hero-banner">
          <div className="th-top-row">
            <span className="th-badge">{activeTopic.subject}</span>
            <span className="th-yield">{activeTopic.badge}</span>
            <span className="th-era">{activeTopic.era}</span>
          </div>

          <h1 className="th-title">{lang === 'te' ? activeTopic.titleTe : activeTopic.title}</h1>
          {lang === 'te' && <div className="th-english-sub">{activeTopic.title}</div>}

          <div className="th-hook-box">
            <Sparkles size={20} color="#f59e0b" className="hook-icon" />
            <p className="th-hook">{lang === 'te' ? activeTopic.heroHookTe : activeTopic.heroHook}</p>
          </div>
        </div>

        {/* 1. DEDICATED VISUAL INFOGRAPHIC / ARCHITECTURAL SCHEMATIC */}
        <div className="infographic-stage">
          <div className="infographic-caption-bar">
            <div className="icb-left">
              <span className="icb-badge">🎨 {lang === 'te' ? 'విజువల్ ఇన్ఫోగ్రాఫిక్ స్కీమాటిక్' : 'VISUAL INFOGRAPHIC SCHEMATIC'}</span>
              <span className="icb-caption">{activeTopic.infographicCaption}</span>
            </div>
            <span className="icb-note">HD Vector Schematic</span>
          </div>

          <div className="infographic-canvas-wrap">
            {renderInfographic(activeTopic.infographicType)}
          </div>
        </div>

        {/* 2. CORE CONCEPT STORY CARDS */}
        <div className="study-section-header">
          <h3>📖 {lang === 'te' ? 'కీలక సిద్ధాంత భావనలు & ఆధారాలు' : 'Core Concept Pillars & Historical Evidence'}</h3>
          <span className="ssh-subtag">NCERT & Standard Reference Architecture</span>
        </div>

        <div className="story-cards-grid">
          {(activeTopic.storyCards || []).map((card, idx) => (
            <div key={idx} className="story-card">
              <div className="sc-header">
                <span className="sc-index">PILLAR 0{idx + 1}</span>
                <span className="sc-tag">{card.tag}</span>
              </div>
              <h4>{lang === 'te' && card.titleTe ? card.titleTe : card.title}</h4>
              <p>{lang === 'te' && card.bodyTe ? card.bodyTe : card.body}</p>
            </div>
          ))}
        </div>

        {/* 3. ACTIVE RETRIEVAL "COVER & RECALL" TABLE */}
        {activeTopic.compareTable && (
          <div className="retrieval-table-stage">
            <div className="table-stage-header">
              <div>
                <span className="tsh-eyebrow">🧠 ACTIVE RETRIEVAL METHOD</span>
                <h3>{lang === 'te' ? 'పరీక్షా రీకాల్ పట్టిక (కవర్ చేసి గుర్తు తెచ్చుకోండి)' : 'Active Recall & High-Yield Exam Facts'}</h3>
                <p className="tsh-note">
                  {lang === 'te'
                    ? 'సమాధానాన్ని చూడకముందు మనసులో గుర్తుకు తెచ్చుకోవడానికి "సమాధానాలు దాచండి" ఉపయోగించండి.'
                    : 'Use active retrieval: cover facts mentally first, then reveal to verify retention.'}
                </p>
              </div>

              <button
                className="btn-reveal-toggle"
                onClick={() => setTableRevealed(!tableRevealed)}
              >
                {tableRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
                {tableRevealed
                  ? (lang === 'te' ? 'రీకాల్ కొరకు దాచండి' : 'Cover for Active Recall')
                  : (lang === 'te' ? 'సమాధానాలు చూపించండి' : 'Reveal All Answers')}
              </button>
            </div>

            <div className="recall-table-wrap">
              <table className="recall-table">
                <thead>
                  <tr>
                    <th style={{ width: '32%' }}>
                      {lang === 'te' && activeTopic.compareTable.leftColTe ? activeTopic.compareTable.leftColTe : activeTopic.compareTable.leftCol}
                    </th>
                    <th style={{ width: '68%' }}>
                      {lang === 'te' && activeTopic.compareTable.rightColTe ? activeTopic.compareTable.rightColTe : activeTopic.compareTable.rightCol}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeTopic.compareTable.rows.map((row, i) => (
                    <tr key={i}>
                      <td className="term-cell">
                        <strong>{row[0]}</strong>
                      </td>
                      <td className="fact-cell">
                        <span className={tableRevealed ? 'fact-text revealed' : 'fact-text blurred'}>
                          {row[1]}
                        </span>
                        {!tableRevealed && (
                          <span
                            className="tap-to-unblur-hint"
                            onClick={() => setTableRevealed(true)}
                          >
                            👁️ {lang === 'te' ? 'చూడటానికి నొక్కండి' : 'Tap to reveal'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. MEMORY HOOK & MNEMONIC CARD */}
        {activeTopic.mnemonic && (
          <div className="mnemonic-card">
            <div className="mc-head">
              <Zap size={18} color="#f59e0b" />
              <strong>{lang === 'te' ? 'జ్ఞాపకశక్తి సాధనం (Mnemonic)' : 'Memory Hook & High-Yield Mnemonic'}</strong>
            </div>
            <p className="mc-body">{activeTopic.mnemonic}</p>
          </div>
        )}

        {/* 5. INTERACTIVE 4-OPTION TOPIC QUIZ */}
        {currentQuiz && (
          <div className="study-quiz-stage">
            <div className="sq-head">
              <div className="sq-badge">
                <HelpCircle size={15} /> {lang === 'te' ? 'తక్షణ పునశ్చరణ క్విజ్' : 'TOPIC MASTERY QUIZ'}
              </div>
              <span className="sq-pts">+10 XP</span>
            </div>

            <div className="sq-question-box">
              <div className="sq-q-num">Q{quizIdx + 1} of {quizList.length}</div>
              <h4>{currentQuiz.question}</h4>

              <div className="sq-options-grid">
                {currentQuiz.options.map((opt, oIdx) => {
                  let optClass = 'sq-option-btn';
                  if (selectedOpt !== null) {
                    if (oIdx === currentQuiz.answer) optClass += ' correct';
                    else if (selectedOpt === oIdx) optClass += ' wrong';
                  }
                  return (
                    <button
                      key={oIdx}
                      className={optClass}
                      disabled={selectedOpt !== null}
                      onClick={() => {
                        setSelectedOpt(oIdx);
                        if (oIdx === currentQuiz.answer) {
                          markTopicCompleted(activeTopic.id);
                        }
                      }}
                    >
                      <span className="sq-opt-letter">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="sq-opt-text">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {selectedOpt !== null && (
                <div className={`sq-feedback-box ${selectedOpt === currentQuiz.answer ? 'correct' : 'wrong'}`}>
                  <strong>{selectedOpt === currentQuiz.answer ? '✓ Correct! +10 XP Awarded' : '✗ Incorrect'}</strong>
                  <p>{currentQuiz.explain}</p>
                  {quizIdx < quizList.length - 1 && (
                    <button
                      className="sq-next-btn"
                      onClick={() => {
                        setQuizIdx(quizIdx + 1);
                        setSelectedOpt(null);
                      }}
                    >
                      {lang === 'te' ? 'తదుపరి ప్రశ్న →' : 'Next Question →'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Navigation Strip */}
        <div className="study-bottom-nav-bar">
          <button
            className="bottom-nav-btn"
            disabled={currentTopicIndex <= 0}
            onClick={goToPrevTopic}
          >
            <ArrowLeft size={16} /> {lang === 'te' ? 'మునుపటి పాఠం' : 'Previous Module'}
          </button>

          <button
            className="bottom-back-home-btn"
            onClick={() => {
              setActiveTopic(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            ↑ {lang === 'te' ? 'సిలబస్ జాబితాకు తిరిగి వెళ్లండి' : 'Return to Syllabus Directory'}
          </button>

          <button
            className="bottom-nav-btn primary"
            disabled={currentTopicIndex >= LEARN_TOPICS.length - 1}
            onClick={goToNextTopic}
          >
            {lang === 'te' ? 'తదుపరి పాఠం' : 'Next Module'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
