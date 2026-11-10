import React, { useState, useMemo } from 'react';
import {
  BookOpen, Landmark, Globe2, Scale, ChartNoAxesCombined,
  FlaskConical, Palette, Leaf, Sparkles, CheckCircle2, ArrowRight,
  Eye, EyeOff, Lightbulb, Search, Trophy, ArrowLeft, Layers, Compass
} from 'lucide-react';

// ==============================================================
// 10 RICH VISUAL LEARNING TOPICS DATA WITH SVG INFOGRAPHICS
// ==============================================================
export const LEARN_TOPICS = [
  // 1. HISTORY - INDUS VALLEY CIVILISATION
  {
    id: 'history-indus-valley',
    subject: 'History',
    subjectId: 'history',
    title: 'Indus Valley Civilisation (Harappa & Mohenjo-Daro)',
    titleTe: 'సింధు నాగరికత (హరప్పా & మొహెంజో-దారో)',
    era: 'c. 2600 – 1900 BCE · Bronze Age',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did Bronze Age urban engineers build underground covered drainage systems 4,500 years ago?',
    heroHookTe: '4,500 సంవత్సరాల క్రితమే భూగర్భ మురుగునీటి పారుదల వ్యవస్థలను కాంస్య యుగపు ఇంజనీర్లు ఎలా నిర్మించారు?',
    infographicType: 'indus-grid',
    infographicCaption: 'Citadel (Upper Town) vs Lower Town Grid Layout & Great Bath Drainage Architecture.',
    storyCards: [
      {
        title: 'Dual-City Urban Planning',
        titleTe: 'ద్వంద్వ నగర ప్రణాళిక',
        body: 'Major settlements were divided into two sectors: a fortified Western Citadel (elevated mud-brick platform for public structures) and a spacious Eastern Lower Town built on a strict grid with north-south streets.',
        bodyTe: 'ప్రధాన నగరాలు రెండు భాగాలుగా విభజించబడ్డాయి: ఎత్తైన పశ్చిమ కోట (సిటాడెల్) మరియు గ్రిడ్ పద్ధతిలో విస్తరించిన తూర్పు దిగువ పట్టణం.',
        tag: 'NCERT Class 12 · Ch 1'
      },
      {
        title: 'The Great Bath at Mohenjo-Daro',
        titleTe: 'మొహెంజో-దారోలోని గొప్ప స్నానవాటిక',
        body: 'A rectangular tank in the citadel built with fitted burnt bricks, gypsum mortar, and bitumen lining to prevent water leakage. Two flights of stairs led into the pool, surrounded by rooms on three sides.',
        bodyTe: 'కాల్చిన ఇటుకలు, జిప్సం మోర్టార్ మరియు తారు పూతతో నిర్మించిన దీర్ఘచతురస్రాకార స్నానవాటిక. మూడు వైపులా గదులు కలిగి ఉంది.',
        tag: 'Archaeological Survey of India'
      },
      {
        title: 'Dockyard at Lothal',
        titleTe: 'లోథాల్‌లోని నౌకాశ్రయం (డాక్‌యార్డ్)',
        body: 'Located in Gujarat on the Bhogava river, Lothal featured a world-first tidal dockyard connecting maritime trade routes to Mesopotamia and Oman.',
        bodyTe: 'గుజరాత్‌లోని భోగావా నది ఒడ్డున ఉన్న లోథాల్‌లో మెసొపొటేమియాతో వాణిజ్య సంబంధాలు నెరిపిన ప్రపంచంలోనే మొదటి టైడల్ డాక్‌యార్డ్ ఉంది.',
        tag: 'UNESCO World Heritage'
      },
      {
        title: 'Dholavira: Advanced Water Reservoir System',
        titleTe: 'ధోలవిరా: నీటి సంరక్షణ వ్యవస్థ',
        body: 'Situated in the Rann of Kutch, Dholavira used massive stone architecture, a 3-tier city design (Citadel, Middle Town, Lower Town), and 16 interconnected rainwater reservoirs.',
        bodyTe: 'కచ్ ప్రాంతంలో రాతి కట్టడాలతో 3-స్థాయిల నగర విభజన మరియు 16 అనుసంధానించబడిన వర్షపు నీటి నిల్వ జలాశయాలు కలిగి ఉంది.',
        tag: 'UNESCO 2021'
      }
    ],
    compareTable: {
      leftCol: 'Indus Site',
      leftColTe: 'సింధు ప్రాంతం',
      rightCol: 'Unique Distinguishing Archaeological Find',
      rightColTe: 'ప్రత్యేక పురావస్తు ఆధారాలు',
      rows: [
        ['Mohenjo-Daro', 'Great Bath, Bronze Dancing Girl, Bearded Priest, Granary'],
        ['Harappa', 'R-37 Cemetery, Granaries in row of 6, Working floors'],
        ['Lothal (Gujarat)', 'Tidal Brick Dockyard, Rice husk, Double burial, Fire altars'],
        ['Kalibangan (Rajasthan)', 'Ploughed field surface, Fire altars, Camel bones'],
        ['Dholavira (Gujarat)', '16 Water reservoirs, Stadium, Giant 10-symbol signboard'],
        ['Chanhudaro', 'Bead-making factory; only Indus city without a citadel']
      ]
    },
    mnemonic: 'M-B-D: Mohenjo-Daro = Bath, Bronze Dancer. L-D: Lothal = Dockyard. D-W: Dholavira = Water reservoirs.',
    quiz: [
      {
        q: 'The famous tidal brick dockyard was discovered at which Indus Valley site?',
        qTe: 'ప్రసిద్ధ టైడల్ ఇటుక డాక్‌యార్డ్ ఏ సింధు లోయ ప్రాంతంలో కనుగొనబడింది?',
        options: ['Lothal', 'Harappa', 'Kalibangan', 'Chanhudaro'],
        answer: 0,
        explain: 'Lothal on the Bhogava river in Gujarat had the earliest known tidal dockyard in the world.'
      },
      {
        q: 'Which Indus city was divided into THREE sectors instead of the usual two?',
        qTe: 'సాధారణ రెండు విభాగాలకు బదులుగా మూడు విభాగాలుగా విభజించబడిన సింధు నగరం ఏది?',
        options: ['Dholavira', 'Mohenjo-daro', 'Banawali', 'Rakhigarhi'],
        answer: 0,
        explain: 'Dholavira is unique for its 3-tier urban division: Citadel, Middle Town, and Lower Town.'
      }
    ]
  },

  // 2. HISTORY - MAURYAN EMPIRE
  {
    id: 'history-mauryan-empire',
    subject: 'History',
    subjectId: 'history',
    title: 'Mauryan Empire & Ashokan Inscriptions',
    titleTe: 'మౌర్య సామ్రాజ్యం & అశోకుడి శిలాశాసనాలు',
    era: '322 – 185 BCE · Magadha Capital at Pataliputra',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did Chandragupta Maurya and Chanakya overthrow the Nanda Dynasty and build India’s first pan-subcontinental empire?',
    heroHookTe: 'చంద్రగుప్త మౌర్యుడు మరియు చాణక్యుడు నంద వంశాన్ని ఓడించి భారతదేశపు మొదటి సామ్రాజ్యాన్ని ఎలా నిర్మించారు?',
    infographicType: 'mauryan-pillars',
    infographicCaption: 'The Lion Capital of Sarnath (National Emblem) and Major Rock Edict XIII.',
    storyCards: [
      {
        title: 'Foundation & Megasthenes',
        titleTe: 'స్థాపన & మెగస్తనీస్ ఇండికా',
        body: 'Founded in 322 BCE by Chandragupta with mentor Chanakya (Kautilya, author of Arthashastra). Greek ambassador Megasthenes wrote "Indica", describing Pataliputra’s 64 gates and municipal boards.',
        bodyTe: 'క్రీ.పూ 322లో చాణక్యుడి సహాయంతో చంద్రగుప్తుడు స్థాపించాడు. గ్రీకు రాయబారి మెగస్తనీస్ "ఇండికా" గ్రంథాన్ని రచించాడు.',
        tag: 'Ancient Historical Sources'
      },
      {
        title: 'Ashoka and the Kalinga War (261 BCE)',
        titleTe: 'అశోకుడు మరియు కళింగ యుద్ధం (క్రీ.పూ 261)',
        body: 'Described in Major Rock Edict XIII. The carnage of Kalinga led Ashoka to renounce military conquest (Bherighosha) in favour of cultural and moral conquest (Dhammaghosha).',
        bodyTe: '13వ ప్రధాన శిలాశాసనంలో కళింగ యుద్ధం వర్ణించబడింది. ఈ యుద్ధ రక్తపాతం చూసి అశోకుడు బేరీఘోషను వదిలి ధమ్మఘోషను స్వీకరించాడు.',
        tag: 'Rock Edict XIII'
      },
      {
        title: 'The National Emblem (Sarnath Lion Capital)',
        titleTe: 'జాతీయ చిహ్నం (సారనాథ్ సింహ రాజధాని)',
        body: 'Carved from Chunar sandstone: four Asiatic lions back-to-back over an abacus featuring the Ashoka Chakra (24 spokes), horse, bull, elephant, and lion, resting on an inverted lotus.',
        bodyTe: 'చునార్ ఇసుకరాయితో చెక్కినది: అశోక చక్రం (24 ఆకులు), గుర్రం, ఎద్దు, ఏనుగు, సింహం మరియు నాలుగు సింహాలు కలవు.',
        tag: 'Govt of India Emblem'
      }
    ],
    compareTable: {
      leftCol: 'Mauryan Inscription / Pillar',
      leftColTe: 'మౌర్య శాసనం / స్తంభం',
      rightCol: 'Historical Significance / SSC Exam Fact',
      rightColTe: 'చారిత్రక ప్రాధాన్యత',
      rows: [
        ['Major Rock Edict XIII', 'Kalinga War (261 BCE), remorse of Ashoka, conversion to Buddhism'],
        ['Major Rock Edict I', 'Prohibition of animal sacrifice and festive gatherings'],
        ['Rummindei Pillar (Nepal)', 'Marks Buddha birth at Lumbini; tax reduction (Bali & Bhaga)'],
        ['Maski Minor Rock Edict', 'Explicitly names Ashoka as "Devanampiya Ashoka"'],
        ['Sarnath Pillar Capital', 'Adopted as National Emblem of India on 26 January 1950']
      ]
    },
    mnemonic: 'Kalinga in XIII (13 is the bloody battle turning point). Maski names Ashoka directly.',
    quiz: [
      {
        q: 'Which Major Rock Edict of Ashoka describes the Kalinga War of 261 BCE?',
        qTe: 'క్రీ.పూ 261 నాటి కళింగ యుద్ధాన్ని వర్ణించే అశోకుడి ప్రధాన శిలాశాసనం ఏది?',
        options: ['Major Rock Edict XIII', 'Major Rock Edict I', 'Major Rock Edict VII', 'Minor Edict Maski'],
        answer: 0,
        explain: 'Major Rock Edict XIII provides the heartfelt account of Ashoka’s victory and subsequent remorse over Kalinga.'
      }
    ]
  },

  // 3. HISTORY - DELHI SULTANATE
  {
    id: 'history-delhi-sultanate',
    subject: 'History',
    subjectId: 'history',
    title: 'Delhi Sultanate — Dynasties & Administration',
    titleTe: 'ఢిల్లీ సుల్తానేట్ — రాజవంశాలు & పరిపాలన',
    era: '1206 – 1526 CE · 5 Dynasties',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did 5 distinct dynasties rule from Delhi across 320 years before Babur arrived at Panipat?',
    heroHookTe: 'బాబర్ పానిపట్ చేరుకోవడానికి ముందు 320 సంవత్సరాలలో 5 రాజవంశాలు ఢిల్లీని ఎలా పాలించాయి?',
    infographicType: 'dynasty-chronology',
    infographicCaption: 'Chronological Sequence of 5 Dynasties: Slave → Khalji → Tughlaq → Sayyid → Lodi.',
    storyCards: [
      {
        title: 'Mamluk / Slave Dynasty (1206–1290)',
        titleTe: 'బానిస వంశం (మమ్లూక్)',
        body: 'Founded by Qutb-ud-din Aibak (Lakh Baksh), builder of Quwwat-ul-Islam mosque. Iltutmish introduced the Silver Tanka and Copper Jital and organized the "Turkan-i-Chahalgani" (Group of 40).',
        bodyTe: 'కుతుబుద్దీన్ ఐబక్ స్థాపించాడు. ఇల్తుత్మిష్ వెండి టంకా మరియు రాగి జీతల్ నాణేలను ప్రవేశపెట్టాడు.',
        tag: 'Mamluk Era'
      },
      {
        title: 'Alauddin Khalji’s Market Regulations',
        titleTe: 'అల్లావుద్దీన్ ఖిల్జీ మార్కెట్ సంస్కరణలు',
        body: 'Fixed prices of grains, cloth, and horses. Appointed Shahna-i-Mandi (market superintendent) and maintained huge standing army with Dagh (branding horses) and Chehra (descriptive rolls).',
        bodyTe: 'ధరల నియంత్రణ, షహ్నా-ఇ-మండి నియామకం, దాగ్ (గుర్రాలకు ముద్ర) మరియు చెహ్రా పద్ధతులను ప్రవేశపెట్టాడు.',
        tag: 'Khalji Reforms'
      },
      {
        title: 'Muhammad bin Tughlaq’s Experiments',
        titleTe: 'మహమ్మద్ బిన్ తుగ్లక్ ప్రయోగాలు',
        body: 'Shifted capital from Delhi to Daulatabad (Devagiri) in 1327 and introduced bronze/copper Token Currency in 1330. Created Diwan-i-Kohi (agriculture department).',
        bodyTe: 'రాజధానిని ఢిల్లీ నుండి దౌలతాబాద్‌కు మార్చడం, టోకెన్ కరెన్సీ ప్రవేశపెట్టడం మరియు దివాన్-ఇ-కోహి వ్యవసాయ శాఖ ఏర్పాటు.',
        tag: 'Tughlaq Dynasty'
      }
    ],
    compareTable: {
      leftCol: 'Delhi Sultanate Administrative Office',
      leftColTe: 'సుల్తానేట్ పరిపాలనా శాఖ',
      rightCol: 'Department Portfolio & Founding Ruler',
      rightColTe: 'శాఖ విధులు & స్థాపకుడు',
      rows: [
        ['Diwan-i-Arz', 'Military Department (Created by Balban)'],
        ['Diwan-i-Insha', 'State Correspondence & Royal decrees'],
        ['Diwan-i-Risalat', 'Foreign affairs and religious endowments'],
        ['Diwan-i-Kohi', 'Agriculture Development (Created by Muhammad bin Tughlaq)'],
        ['Diwan-i-Mustakhraj', 'Arrears Revenue Department (Created by Alauddin Khalji)']
      ]
    },
    mnemonic: 'S-K-T-S-L: Say Kisses To Sweet Lovers = Slave, Khalji, Tughlaq, Sayyid, Lodi.',
    quiz: [
      {
        q: 'Which Delhi Sultan established the agricultural department named Diwan-i-Kohi?',
        qTe: 'దివాన్-ఇ-కోహి అనే వ్యవసాయ శాఖను ఏర్పాటు చేసిన ఢిల్లీ సుల్తాన్ ఎవరు?',
        options: ['Muhammad bin Tughlaq', 'Alauddin Khalji', 'Balban', 'Firoz Shah Tughlaq'],
        answer: 0,
        explain: 'Muhammad bin Tughlaq set up Diwan-i-Kohi to expand cultivable land and provide Sondhar agricultural loans.'
      }
    ]
  },

  // 4. GEOGRAPHY - RIVER SYSTEMS & DRAINAGE
  {
    id: 'geography-river-systems',
    subject: 'Geography',
    subjectId: 'geography',
    title: 'Indian River Systems (Himalayan vs Peninsular)',
    titleTe: 'భారతదేశ నదీ వ్యవస్థలు (హిమాలయ vs ద్వీపకల్ప)',
    era: 'Drainage Basins · Length & Confluences',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why do Himalayan rivers flow perennially while Peninsular rivers are rain-fed and seasonal?',
    heroHookTe: 'హిమాలయ నదులు జీవనదులుగా ఎందుకు ప్రవహిస్తాయి, ద్వీపకల్ప నదులు వర్షాధారితంగా ఎందుకు ఉంటాయి?',
    infographicType: 'river-confluence',
    infographicCaption: 'Panch Prayag confluences on Alaknanda River leading to the Ganga at Devprayag.',
    storyCards: [
      {
        title: 'The Panch Prayag Confluences',
        titleTe: 'పంచ ప్రయాగలు',
        body: 'Vishnuprayag (Alaknanda + Dhauliganga) → Nandaprayag (+ Nandakini) → Karnaprayag (+ Pindar) → Rudraprayag (+ Mandakini) → Devprayag (+ Bhagirathi = Ganga).',
        bodyTe: 'విష్ణుప్రయాగ (ధౌలిగంగా) → నందప్రయాగ (నందాకిని) → కర్ణప్రయాగ (పిండార్) → రుద్రప్రయాగ (మందాకిని) → దేవప్రయాగ (భాగీరథి = గంగా నది).',
        tag: 'Uttarakhand Drainage'
      },
      {
        title: 'Indus Water Treaty (1960)',
        titleTe: 'సింధు జలాల ఒప్పందం (1960)',
        body: 'Brokered by World Bank: India has unrestricted use of 3 Eastern rivers (Sutlej, Beas, Ravi), while Pakistan receives 3 Western rivers (Indus, Jhelum, Chenab).',
        bodyTe: 'తూర్పు నదులు (సట్లెజ్, బియాస్, రావి) భారతదేశానికి, పశ్చిమ నదులు (సింధు, జీలం, చీనాబ్) పాకిస్తాన్‌కు కేటాయించబడ్డాయి.',
        tag: 'International Treaties'
      },
      {
        title: 'Peninsular West-Flowing Rivers',
        titleTe: 'పశ్చిమాన ప్రవహించే నదులు',
        body: 'Narmada and Tapti flow through rift valleys between Vindhya and Satpura ranges into Arabian Sea, forming estuaries rather than deltas.',
        bodyTe: 'నర్మద మరియు తపతి నదులు పగులు లోయల ద్వారా ప్రవహించి అరేబియా సముద్రంలో కలుస్తాయి. ఇవి డెల్టాలను కాకుండా ఎస్చురీలను ఏర్పరుస్తాయి.',
        tag: 'Rift Valley Drainage'
      }
    ],
    compareTable: {
      leftCol: 'Panch Prayag Node',
      leftColTe: 'ప్రయాగ ప్రదేశం',
      rightCol: 'Alaknanda Confluence Tributary',
      rightColTe: 'అలకనందతో కలిసే ఉపనది',
      rows: [
        ['Vishnuprayag', 'Dhauliganga River'],
        ['Nandaprayag', 'Nandakini River'],
        ['Karnaprayag', 'Pindar River'],
        ['Rudraprayag', 'Mandakini River (flows from Kedarnath)'],
        ['Devprayag', 'Bhagirathi River (forms Ganga downstream)']
      ]
    },
    mnemonic: 'V-N-K-R-D: Very Nice Kids Read Daily = Vishnu, Nanda, Karna, Rudra, Dev prayags.',
    quiz: [
      {
        q: 'At which confluence do the Bhagirathi and Alaknanda rivers meet to form the Ganga?',
        qTe: 'భాగీరథి మరియు అలకనంద నదులు కలిసి గంగా నదిగా ఏర్పడే ప్రయాగ ఏది?',
        options: ['Devprayag', 'Rudraprayag', 'Karnaprayag', 'Vishnuprayag'],
        answer: 0,
        explain: 'At Devprayag in Tehri Garhwal, Bhagirathi and Alaknanda unite and flow downstream as the Ganga.'
      }
    ]
  },

  // 5. GEOGRAPHY - MOUNTAIN PASSES
  {
    id: 'geography-mountain-passes',
    subject: 'Geography',
    subjectId: 'geography',
    title: 'Major Mountain Passes of India',
    titleTe: 'భారతదేశ ప్రధాన పర్వత కనుమలు (Passes)',
    era: 'Himalayan & Western Ghats Corridors',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Which strategic Himalayan mountain pass connects Srinagar to Leh across the Great Himalayas?',
    heroHookTe: 'శ్రీనగర్ మరియు లేహ్ మధ్య ప్రయాణాన్ని అనుసంధానించే వ్యూహాత్మక హిమాలయ కనుమ ఏది?',
    infographicType: 'mountain-passes-map',
    infographicCaption: 'Himalayan High Passes (Zoji La, Shipki La, Nathu La) vs Western Ghats (Thal, Bhor, Palghat).',
    storyCards: [
      {
        title: 'Zoji La & Khardung La (Ladakh)',
        titleTe: 'జోజి లా & ఖర్దుంగ్ లా',
        body: 'Zoji La connects Srinagar with Kargil and Leh on NH-1. Khardung La is one of the highest motorable passes in the world in Ladakh range.',
        bodyTe: 'జోజి లా శ్రీనగర్ మరియు లేహ్ నగరాలను కలుపుతుంది. ఖర్దుంగ్ లా లడఖ్‌లో అత్యంత ఎత్తైన రహదారి కనుమ.',
        tag: 'Ladakh Range'
      },
      {
        title: 'Nathu La & Jelep La (Sikkim)',
        titleTe: 'నాథూ లా & జెలేప్ లా (సిక్కిం)',
        body: 'Nathu La forms an ancient offshoot of the Silk Road connecting Sikkim with Tibet’s Chumbi Valley. Reopened for border trade in 2006.',
        bodyTe: 'సిక్కిం మరియు టిబెట్‌ల మధ్య ప్రాచీన సిల్క్ రూట్ భాగం. 2006లో వాణిజ్యం కోసం తిరిగి తెరవబడింది.',
        tag: 'Sikkim-Tibet Border'
      },
      {
        title: 'Western Ghats Gaps: Thal, Bhor, Palghat',
        titleTe: 'పశ్చిమ కనుమలు: తాల్, భోర్, పాల్‌ఘాట్',
        body: 'Thal Ghat connects Mumbai to Nashik. Bhor Ghat connects Mumbai to Pune. Palghat Gap connects Palakkad (Kerala) to Coimbatore (Tamil Nadu).',
        bodyTe: 'తాల్ ఘాట్: ముంబై-నాసిక్. భోర్ ఘాట్: ముంబై-పూణే. పాల్‌ఘాట్: కేరళ-తమిళనాడు.',
        tag: 'Peninsular Passes'
      }
    ],
    compareTable: {
      leftCol: 'Mountain Pass',
      leftColTe: 'పర్వత కనుమ',
      rightCol: 'State / UT & Strategic Link',
      rightColTe: 'రాష్ట్రం & అనుసంధానించే ప్రాంతాలు',
      rows: [
        ['Zoji La', 'Ladakh / J&K (Srinagar to Leh)'],
        ['Shipki La', 'Himachal Pradesh (Sutlej River enters India from Tibet)'],
        ['Nathu La', 'Sikkim (Connects India with Tibet / China)'],
        ['Lipulekh', 'Uttarakhand (Kailash-Mansarovar pilgrimage route)'],
        ['Palghat Gap', 'Kerala - Tamil Nadu (Palakkad to Coimbatore)']
      ]
    },
    mnemonic: 'S-S: Shipki La = Sutlej river entry. N-S: Nathu La = Sikkim. Z-L: Zoji La = Leh highway.',
    quiz: [
      {
        q: 'Through which Himalayan pass does the Sutlej river enter India from Tibet?',
        qTe: 'సట్లెజ్ నది టిబెట్ నుండి భారతదేశంలోకి ఏ కనుమ ద్వారా ప్రవేశిస్తుంది?',
        options: ['Shipki La', 'Zoji La', 'Nathu La', 'Rohtang Pass'],
        answer: 0,
        explain: 'The Sutlej river enters Kinnaur district of Himachal Pradesh through Shipki La pass.'
      }
    ]
  },

  // 6. POLITY - FUNDAMENTAL RIGHTS & WRITS
  {
    id: 'polity-fundamental-rights',
    subject: 'Indian Polity & Constitution',
    subjectId: 'polity',
    title: 'Fundamental Rights & Constitutional Writs (Articles 12 – 35)',
    titleTe: 'ప్రాథమిక హక్కులు & రాజ్యాంగ రిట్లు (అధికరణలు 12 – 35)',
    era: 'Part III of the Constitution · Magna Carta of India',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why is Article 32 called the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
    heroHookTe: 'డాక్టర్ బి.ఆర్. అంబేద్కర్ అధికరణ 32ను రాజ్యాంగపు "హృదయం మరియు ఆత్మ" అని ఎందుకు పేర్కొన్నారు?',
    infographicType: 'writs-architecture',
    infographicCaption: 'The 5 Supreme Court & High Court Writs under Articles 32 and 226.',
    storyCards: [
      {
        title: 'Six Broad Categories of Rights',
        titleTe: 'ఆరు ప్రాథమిక హక్కుల విభాగాలు',
        body: '1. Right to Equality (Arts 14-18), 2. Right to Freedom (19-22), 3. Against Exploitation (23-24), 4. Freedom of Religion (25-28), 5. Cultural & Educational (29-30), 6. Constitutional Remedies (32).',
        bodyTe: 'సమానత్వపు హక్కు (14-18), స్వేచ్ఛా హక్కు (19-22), పీడనాన్ని నిరోధించే హక్కు (23-24), మత స్వాతంత్ర్యపు హక్కు (25-28), విద్యా సాంస్కృతిక హక్కు (29-30), రాజ్యాంగ పరిహారాల హక్కు (32).',
        tag: 'Part III Overview'
      },
      {
        title: 'Article 21: Protection of Life and Liberty',
        titleTe: 'అధికరణ 21: జీవించే హక్కు',
        body: 'No person shall be deprived of life or personal liberty except according to procedure established by law. Menaka Gandhi Case (1978) expanded it to "due process" including right to privacy (Puttaswamy 2017).',
        bodyTe: 'చట్టం నిర్దేశించిన పద్ధతిలో తప్ప ఏ వ్యక్తి యొక్క ప్రాణాన్ని లేదా వ్యక్తిగత స్వేచ్ఛను హరించకూడదు.',
        tag: 'Article 21 Jurisprudence'
      },
      {
        title: 'The 5 Writs (SC Art 32 / HC Art 226)',
        titleTe: '5 రకాల రాజ్యాంగ రిట్లు',
        body: 'Habeas Corpus (produce body), Mandamus (we command public official), Prohibition (stay lower court proceedings), Certiorari (quash illegal lower court order), Quo-Warranto (by what warrant/authority).',
        bodyTe: 'హేబియస్ కార్పస్, మాండమస్, ప్రొహిబిషన్, సెర్టియోరరి, కో-వారంటో.',
        tag: 'Judicial Enforcement'
      }
    ],
    compareTable: {
      leftCol: 'Writ Type (Latin Term)',
      leftColTe: 'రిట్ రకం',
      rightCol: 'Literal Meaning & When Issued by Court',
      rightColTe: 'అర్థం & న్యాయస్థానం ఎప్పుడు జారీ చేస్తుంది',
      rows: [
        ['Habeas Corpus', '"To have the body of" — Against unlawful detention of a person'],
        ['Mandamus', '"We command" — Orders a public official/body to perform mandatory duty'],
        ['Prohibition', '"To forbid" — Issued by higher court to stop inferior court from exceeding jurisdiction'],
        ['Certiorari', '"To be certified" — Quashes an existing order of an inferior court or tribunal'],
        ['Quo-Warranto', '"By what warrant" — Enquires into the legality of claim of a person to public office']
      ]
    },
    mnemonic: 'H-M-P-C-Q: Heavy Monkeys Pick Clean Questions = Habeas, Mandamus, Prohibition, Certiorari, Quo-Warranto.',
    quiz: [
      {
        q: 'Which writ is issued to inquire into the legality of a person holding a public office?',
        qTe: 'ఒక వ్యక్తి ఏ అధికారంతో ప్రభుత్వ పదవిని కలిగి ఉన్నారో విచారించడానికి జారీ చేసే రిట్ ఏది?',
        options: ['Quo-Warranto', 'Mandamus', 'Habeas Corpus', 'Certiorari'],
        answer: 0,
        explain: 'Quo-Warranto literally means "By what authority or warrant" and prevents illegal usurpation of public office.'
      }
    ]
  },

  // 7. POLITY - CONSTITUTIONAL BODIES
  {
    id: 'polity-constitutional-bodies',
    subject: 'Indian Polity & Constitution',
    subjectId: 'polity',
    title: 'Key Constitutional & Non-Constitutional Bodies',
    titleTe: 'ముఖ్యమైన రాజ్యాంగ & రాజ్యాంగేతర సంస్థలు',
    era: 'Articles 148, 280, 315, 324',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'What is the constitutional difference between CAG (Art 148) and NITI Aayog (Executive Resolution)?',
    heroHookTe: 'కాగ్ (CAG - అధికరణ 148) మరియు నీతి ఆయోగ్ (ఎగ్జిక్యూటివ్ తీర్మానం) మధ్య రాజ్యాంగపరమైన తేడా ఏమిటి?',
    infographicType: 'constitutional-bodies',
    infographicCaption: 'Constitutional (Directly in Constitution) vs Statutory (Parliament Act) vs Executive Bodies.',
    storyCards: [
      {
        title: 'Comptroller & Auditor General (CAG - Art 148)',
        titleTe: 'కంప్ట్రోలర్ & ఆడిటర్ జనరల్ (కాగ్ - Art 148)',
        body: 'Guardian of the public purse. Audits all expenditure from Consolidated Fund of India. Tenure: 6 years or up to 65 years of age. Submits reports to President who lays them before Parliament.',
        bodyTe: 'ప్రభుత్వ ఖజానా సంరక్షకుడు. భారత సంఘటిత నిధి నుండి చేసే ఖర్చులను ఆడిట్ చేస్తారు. పదవీకాలం: 6 సంవత్సరాలు లేదా 65 ఏళ్లు.',
        tag: 'Article 148'
      },
      {
        title: 'Election Commission of India (Art 324)',
        titleTe: 'భారత ఎన్నికల సంఘం (Art 324)',
        body: 'Superintends elections to Parliament, State Legislatures, President, and Vice President. (Note: Panchayat/Municipal elections conducted by State Election Commission under 243K).',
        bodyTe: 'పార్లమెంట్, రాష్ట్ర అసెంబ్లీలు, రాష్ట్రపతి, ఉపరాష్ట్రపతి ఎన్నికలను నిర్వహిస్తుంది.',
        tag: 'Article 324'
      },
      {
        title: 'Finance Commission (Art 280)',
        titleTe: 'ఆర్థిక సంఘం (Finance Commission - Art 280)',
        body: 'Constituted every 5 years by President. Recommends distribution of net tax proceeds between Union and States (Vertical Devolution) and among States (Horizontal Devolution).',
        bodyTe: 'రాష్ట్రపతి ప్రతి 5 సంవత్సరాలకు ఏర్పాటు చేస్తారు. కేంద్రం మరియు రాష్ట్రాల మధ్య పన్నుల పంపిణీని సిఫార్సు చేస్తుంది.',
        tag: 'Article 280'
      }
    ],
    compareTable: {
      leftCol: 'Constitutional Body',
      leftColTe: 'రాజ్యాంగ సంస్థ',
      rightCol: 'Article & Appointment / Tenure Rules',
      rightColTe: 'అధికరణ & పదవీ కాలం',
      rows: [
        ['Election Commission', 'Article 324 · Appointed by President · 6 yrs / 65 yrs age'],
        ['Comptroller & Auditor General', 'Article 148 · Guardian of Public Purse · 6 yrs / 65 yrs age'],
        ['Union Public Service Commission', 'Article 315 · Merit recruitment · 6 yrs / 65 yrs age'],
        ['Finance Commission', 'Article 280 · Constituted every 5 years by President'],
        ['Attorney General of India', 'Article 76 · Highest law officer · Pleasure of President']
      ]
    },
    mnemonic: 'CAG 148 (Audit 1-4-8), Finance 280, Election 324, UPSC 315.',
    quiz: [
      {
        q: 'Under which Article of the Constitution is the Finance Commission constituted by the President?',
        qTe: 'రాజ్యాంగంలోని ఏ అధికరణ ప్రకారం రాష్ట్రపతి ఆర్థిక సంఘాన్ని ఏర్పాటు చేస్తారు?',
        options: ['Article 280', 'Article 324', 'Article 148', 'Article 315'],
        answer: 0,
        explain: 'Article 280 mandates the constitution of a Finance Commission by the President every five years.'
      }
    ]
  },

  // 8. ECONOMICS - RBI & MONETARY POLICY
  {
    id: 'economics-rbi-monetary',
    subject: 'Economics',
    subjectId: 'economics',
    title: 'RBI & Monetary Policy Instruments',
    titleTe: 'రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా (RBI) & ద్రవ్య విధాన సాధనాలు',
    era: 'Central Banking · Inflation Targeting & Liquidity',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How does changing the Policy Repo Rate by 25 basis points cool down national inflation and influence loan interest rates?',
    heroHookTe: 'రెపో రేటులో 25 బేసిస్ పాయింట్ల మార్పు ద్రవ్యోల్బణాన్ని ఎలా తగ్గిస్తుంది మరియు రుణ వడ్డీ రేట్లను ఎలా ప్రభావితం చేస్తుంది?',
    infographicType: 'rbi-transmission',
    infographicCaption: 'Monetary Transmission: Repo Rate → Interbank Lending → Commercial Bank MCLR → Consumer Loans.',
    storyCards: [
      {
        title: 'Establishment of the RBI',
        titleTe: 'RBI ఏర్పాటు',
        body: 'Set up on April 1, 1935 under the Reserve Bank of India Act, 1934 based on the Hilton Young Commission recommendations. Nationalised on January 1, 1949.',
        bodyTe: 'హిల్టన్ యంగ్ కమిషన్ సిఫార్సుల మేరకు ఏప్రిల్ 1, 1935న స్థాపించబడింది. జనవరి 1, 1949న జాతీయం చేయబడింది.',
        tag: 'Hilton Young Commission'
      },
      {
        title: 'Key Quantitative Tools (Repo, CRR, SLR)',
        titleTe: 'ద్రవ్య విధాన సాధనాలు (రెపో, CRR, SLR)',
        body: 'Repo Rate is the interest rate at which RBI lends short-term funds to commercial banks against government securities. CRR (Cash Reserve Ratio) is cash banks must keep with RBI. SLR is liquid assets (gold, G-Secs) banks must hold.',
        bodyTe: 'రెపో రేటు: సెక్యూరిటీలపై వాణిజ్య బ్యాంకులకు RBI ఇచ్చే స్వల్పకాలిక రుణాల వడ్డీ రేటు. CRR: RBI వద్ద ఉంచాల్సిన నగదు నిల్వలు. SLR: బ్యాంకులు తమ వద్ద ఉంచుకోవాల్సిన ద్రవ్య ఆస్తులు.',
        tag: 'RBI Monetary Instruments'
      },
      {
        title: 'Monetary Policy Committee (MPC)',
        titleTe: 'మానిటరీ పాలసీ కమిటీ (MPC)',
        body: 'Consists of 6 members (3 from RBI including Governor who holds casting vote, and 3 external economists appointed by Central Govt). Targets CPI inflation at 4% with a tolerance band of +/- 2%.',
        bodyTe: '6 మంది సభ్యులు ఉంటారు. ద్రవ్యోల్బణ లక్ష్యం: 4% (+/- 2% పరిమితి).',
        tag: 'Inflation Targeting Framework'
      }
    ],
    compareTable: {
      leftCol: 'Monetary Policy Instrument',
      leftColTe: 'ద్రవ్య సాధనం',
      rightCol: 'Definition & Effect on Market Liquidity',
      rightColTe: 'నిర్వచనం & మార్కెట్ లిక్విడిటీపై ప్రభావం',
      rows: [
        ['Policy Repo Rate', 'Rate at which RBI injects liquidity to commercial banks against collateral'],
        ['Reverse Repo Rate', 'Rate at which RBI absorbs overnight liquidity from banks against eligible securities'],
        ['Standing Deposit Facility (SDF)', 'Allows RBI to absorb liquidity WITHOUT collateral; serves as floor of LAF corridor'],
        ['Marginal Standing Facility (MSF)', 'Penal overnight borrowing rate for banks against G-Secs dipped into SLR quota']
      ]
    },
    mnemonic: 'High Repo Rate = Borrowing expensive = Less money supply in market = Inflation drops.',
    quiz: [
      {
        q: 'Which commission recommended the establishment of India’s central bank, the RBI?',
        qTe: 'భారత కేంద్ర బ్యాంక్ (RBI) ఏర్పాటును సిఫార్సు చేసిన కమిషన్ ఏది?',
        options: ['Hilton Young Commission', 'Kothari Commission', 'Sarkaria Commission', 'Hunter Commission'],
        answer: 0,
        explain: 'The Royal Commission on Indian Currency and Finance (Hilton Young Commission) in 1926 recommended creating the RBI.'
      }
    ]
  },

  // 9. SCIENCE - CELL BIOLOGY
  {
    id: 'science-cell-biology',
    subject: 'General Science',
    subjectId: 'science',
    title: 'Cell Biology — Organelles & Functions',
    titleTe: 'కణ జీవశాస్త్రం — కణాంగాలు & విధులు',
    era: 'Cytology · Plant vs Animal Cell Structure',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why is Mitochondria called the "Powerhouse of the Cell" and Lysosome the "Suicidal Bag"?',
    heroHookTe: 'మైటోకాండ్రియాను "కణ శక్త్యాగారం" అని, లైసోజోమ్‌ను "ఆత్మహత్య కోశాలు" అని ఎందుకు పిలుస్తారు?',
    infographicType: 'cell-schematic',
    infographicCaption: 'Animal Cell vs Plant Cell: Cell Wall, Chloroplasts, Vacuoles, and Double-Membrane Organelles.',
    storyCards: [
      {
        title: 'Mitochondria — The Powerhouse',
        titleTe: 'మైటోకాండ్రియా — కణ శక్త్యాగారం',
        body: 'Double-membraned organelle that synthesises cellular energy in the form of ATP (Adenosine Triphosphate) through aerobic cellular respiration. Has its own circular DNA and 70S ribosomes.',
        bodyTe: 'ద్వంద్వ త్వచంతో కూడిన కణాంగం. ఇది ఏటీపీ (ATP) రూపంలో శక్తిని ఉత్పత్తి చేస్తుంది. దీనికి సొంత DNA మరియు రైబోజోములు ఉంటాయి.',
        tag: 'NCERT Class 9 & 11'
      },
      {
        title: 'Lysosomes — Digestive & Suicidal Bags',
        titleTe: 'లైసోజోములు — జీర్ణ మరియు ఆత్మహత్య కోశాలు',
        body: 'Membrane-bound vesicles packed with hydrolytic enzymes. If a cell is irreversibly damaged, lysosomes burst and their enzymes digest the cell itself.',
        bodyTe: 'హైడ్రోలైటిక్ ఎంజైమ్‌లను కలిగి ఉంటాయి. కణం దెబ్బతిన్నప్పుడు ఇవి పగిలి కణాన్ని స్వయంగా జీర్ణం చేస్తాయి.',
        tag: 'De Duve Discovery'
      },
      {
        title: 'Plant Cell Specifics: Wall & Plastids',
        titleTe: 'వృక్ష కణ ప్రత్యేకతలు',
        body: 'Plant cells have a rigid outer Cell Wall made of cellulose and Plastids (Chloroplasts containing chlorophyll for photosynthesis, Chromoplasts for color, Leucoplasts for starch storage).',
        bodyTe: 'వృక్ష కణాల్లో సెల్యులోజ్‌తో చేసిన దృఢమైన కణకవచం మరియు క్లోరోప్లాస్ట్‌లు (హరితరేణువులు) ఉంటాయి.',
        tag: 'Plant Cytology'
      }
    ],
    compareTable: {
      leftCol: 'Cellular Organelle',
      leftColTe: 'కణాంగం',
      rightCol: 'Key Nickname & Chief Biochemical Function',
      rightColTe: 'ముఖ్యమైన పేరు & జీవక్రియ విధి',
      rows: [
        ['Mitochondria', 'Powerhouse of Cell · Generates ATP · Has own DNA & Ribosomes'],
        ['Ribosomes', 'Protein Factory · Non-membrane bound · Site of translation'],
        ['Lysosomes', 'Suicide Bags · Hydrolytic digestive enzymes · Intracellular digestion'],
        ['Golgi Apparatus', 'Packaging & Dispatch Center · Post-translational modification of proteins'],
        ['Chloroplasts', 'Kitchen of the Plant Cell · Photosynthesis site · Contains Thylakoids']
      ]
    },
    mnemonic: 'M-Power (Mitochondria = Powerhouse), L-Suicide (Lysosome = Suicidal Bag), R-Protein (Ribosome = Protein factory).',
    quiz: [
      {
        q: 'Which organelle contains hydrolytic enzymes and is termed the "suicide bag" of the cell?',
        qTe: 'హైడ్రోలైటిక్ ఎంజైమ్‌లను కలిగి ఉండి "ఆత్మహత్య కోశాలు" అని పిలువబడే కణాంగం ఏది?',
        options: ['Lysosome', 'Ribosome', 'Mitochondria', 'Centrosome'],
        answer: 0,
        explain: 'Lysosomes contain digestive enzymes that break down cell debris and destroy damaged cells.'
      }
    ]
  },

  // 10. SCIENCE - PHYSICS LAWS & SI UNITS
  {
    id: 'science-physics-laws',
    subject: 'General Science',
    subjectId: 'science',
    title: 'Physics — Newton’s Laws & SI Units',
    titleTe: 'భౌతిక శాస్త్రం — న్యూటన్ నియమాలు & SI ప్రమాణాలు',
    era: 'Classical Mechanics & Measurement',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How does recoil of a gun directly demonstrate Newton’s Third Law and Conservation of Momentum?',
    heroHookTe: 'తుపాకీ రీకాయిల్ (వెనుకకు తన్నడం) న్యూటన్ మూడవ నియమాన్ని ఎలా నిరూపిస్తుంది?',
    infographicType: 'physics-laws',
    infographicCaption: 'Newton’s 3 Laws of Motion: Inertia (1st), F=ma (2nd), Action-Reaction (3rd).',
    storyCards: [
      {
        title: 'Newton’s First Law (Law of Inertia)',
        titleTe: 'మొదటి నియమం (జడత్వ నియమం)',
        body: 'A body continues in its state of rest or uniform motion unless acted upon by an external net force. Explains why passengers fall forward when a bus brakes suddenly.',
        bodyTe: 'బాహ్య బలం పనిచేయనంత వరకు వస్తువు తన నిశ్చల లేదా సమచలన స్థితిలో కొనసాగుతుంది.',
        tag: 'Law of Inertia'
      },
      {
        title: 'Newton’s Second Law (F = ma)',
        titleTe: 'రెండవ నియమం (ద్రవ్యవేగ మార్పు)',
        body: 'Rate of change of momentum is directly proportional to applied force. F = dP/dt = m*a. Why a cricketer draws hands backward while catching a ball (increases contact time, decreases impact force).',
        bodyTe: 'బలం = ద్రవ్యరాశి x త్వరణం (F = ma). క్రికెటర్ క్యాచ్ పట్టేటప్పుడు చేతులను వెనక్కి లాగడం.',
        tag: 'F = ma Formulation'
      },
      {
        title: 'Newton’s Third Law (Action-Reaction)',
        titleTe: 'మూడవ నియమం (చర్య - ప్రతిచర్య)',
        body: 'For every action, there is an equal and opposite reaction. Examples: Rocket propulsion, swimming, gun recoil, walking on ground.',
        bodyTe: 'ప్రతి చర్యకు సమానమైన మరియు వ్యతిరేకమైన ప్రతిచర్య ఉంటుంది. ఉదాహరణ: రాకెట్ ప్రయోగం, ఈత కొట్టడం.',
        tag: 'Action-Reaction Pairs'
      }
    ],
    compareTable: {
      leftCol: 'Physical Quantity',
      leftColTe: 'భౌతిక రాశి',
      rightCol: 'SI Unit & Common Competitive Exam Confusion',
      rightColTe: 'SI ప్రమాణం',
      rows: [
        ['Force', 'Newton (N) = kg·m/s² · CGS: Dyne (1 N = 10⁵ dyne)'],
        ['Work / Energy', 'Joule (J) = N·m · CGS: Erg (1 J = 10⁷ erg)'],
        ['Power', 'Watt (W) = J/s · 1 Horsepower (HP) = 746 Watts'],
        ['Pressure', 'Pascal (Pa) = N/m² · 1 bar = 10⁵ Pa'],
        ['Frequency', 'Hertz (Hz) = s⁻¹ · Audible human range: 20 Hz – 20,000 Hz']
      ]
    },
    mnemonic: '1 HP = 746 W. Work in Joules, Force in Newtons, Frequency in Hertz.',
    quiz: [
      {
        q: '1 Horsepower (HP) is equivalent to how many Watts?',
        qTe: '1 హార్స్ పవర్ (HP) ఎన్ని వాట్లకు సమానం?',
        options: ['746 Watts', '1000 Watts', '550 Watts', '750 Watts'],
        answer: 0,
        explain: '1 Imperial horsepower is precisely defined as 746 Watts.'
      }
    ]
  }
];

export default function LearnView({ onOpenChapter, onNavigate, lang = 'en' }) {
  // Always default to the first rich visual topic for immediate high-impact presentation!
  const [activeTopic, setActiveTopic] = useState(LEARN_TOPICS[0]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [search, setSearch] = useState('');
  const [tableRevealed, setTableRevealed] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const subjectsList = ['All', 'History', 'Geography', 'Indian Polity & Constitution', 'Economics', 'General Science'];

  const filteredTopics = useMemo(() => {
    return LEARN_TOPICS.filter(t => {
      const matchSubj = selectedSubject === 'All' || t.subject === selectedSubject;
      const matchQ = !search.trim() ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.titleTe.includes(search);
      return matchSubj && matchQ;
    });
  }, [selectedSubject, search]);

  return (
    <div className="learn-container">
      {/* 1. TOP CURRICULUM SELECTOR BAR */}
      <div className="curriculum-top-bar">
        <div className="ctb-header">
          <div>
            <div className="eyebrow"><BookOpen size={14} /> {lang === 'te' ? 'పూర్తి విజువల్ పాఠ్యాంశాలు' : 'COMPREHENSIVE VISUAL CURRICULUM'}</div>
            <h1>{lang === 'te' ? 'స్టాటిక్ GK విజువల్ పాఠ్యపుస్తకం' : 'Visual Learning Modules'}</h1>
          </div>
          <button className="outline mini" onClick={() => onNavigate('Atlas')}>
            <Compass size={15} /> {lang === 'te' ? '33 అట్లాస్ మ్యాప్స్' : 'Explore 33 Atlas Maps →'}
          </button>
        </div>

        {/* Quick Filter Subject Pills */}
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
            {LEARN_TOPICS.map(topic => (
              <button
                key={topic.id}
                className={`track-pill ${activeTopic.id === topic.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTopic(topic);
                  setTableRevealed(false);
                  setQuizIdx(0);
                  setSelectedOpt(null);
                }}
              >
                <span className="track-subj-tag">{topic.subject.slice(0, 4)}</span>
                <span className="track-name">{lang === 'te' ? topic.titleTe.split(' ')[0] : topic.title.split(' ')[0]}</span>
              </button>
            ))}
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
          <p className="th-hook">"{lang === 'te' ? activeTopic.heroHookTe : activeTopic.heroHook}"</p>
        </div>

        {/* 1. VISUAL INFOGRAPHIC / SCHEMATIC SECTION */}
        <div className="infographic-stage">
          <div className="stage-head">
            <span className="stage-badge">📊 {lang === 'te' ? 'ఇన్ఫోగ్రాఫిక్ చిత్రం' : 'INFOGRAPHIC SCHEMATIC'}</span>
            <span className="stage-caption-text">{activeTopic.infographicCaption}</span>
          </div>

          <div className="svg-schematic-box">
            {activeTopic.infographicType === 'indus-grid' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                {/* Citadel Box */}
                <g transform="translate(40, 30)">
                  <rect width="260" height="180" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" rx="8" />
                  <text x="130" y="30" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">WESTERN CITADEL (ELEVATED MOUND)</text>
                  <rect x="35" y="55" width="190" height="70" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" rx="4" />
                  <text x="130" y="95" textAnchor="middle" fill="#0369a1" fontWeight="700" fontSize="12">THE GREAT BATH (Bitumen Lined)</text>
                  <text x="130" y="160" textAnchor="middle" fill="#64748b" fontSize="11">Used for ritual purification & ceremonies</text>
                </g>
                <text x="350" y="125" textAnchor="middle" fontSize="22" fill="#94a3b8">→</text>
                {/* Lower Town */}
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

            {activeTopic.infographicType === 'mauryan-pillars' && (
              <svg viewBox="0 0 700 240" className="infographic-svg">
                <rect width="700" height="240" fill="var(--soft, #f8fafc)" rx="12" />
                <g transform="translate(80, 20)">
                  <rect x="200" y="30" width="140" height="170" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="10" />
                  <circle cx="270" cy="80" r="35" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
                  <text x="270" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">24 SPOKES</text>
                  <text x="270" y="140" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="13">SARNATH CAPITAL</text>
                  <text x="270" y="160" textAnchor="middle" fill="#92400e" fontSize="10">Lion Capital (National Emblem)</text>
                  {/* Left Box: Rock Edicts */}
                  <rect x="20" y="60" width="150" height="110" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                  <text x="95" y="90" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">Rock Edict XIII</text>
                  <text x="95" y="115" textAnchor="middle" fill="#64748b" fontSize="10">Kalinga War Carnage</text>
                  <text x="95" y="135" textAnchor="middle" fill="#0284c7" fontSize="10">Adoption of Dhamma</text>
                  {/* Right Box: Administration */}
                  <rect x="370" y="60" width="150" height="110" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                  <text x="445" y="90" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">Arthashastra</text>
                  <text x="445" y="115" textAnchor="middle" fill="#64748b" fontSize="10">Saptanga Theory</text>
                  <text x="445" y="135" textAnchor="middle" fill="#059669" fontSize="10">Chanakya Statecraft</text>
                </g>
              </svg>
            )}

            {activeTopic.infographicType === 'dynasty-chronology' && (
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

            {activeTopic.infographicType === 'river-confluence' && (
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

            {activeTopic.infographicType === 'mountain-passes-map' && (
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
              {tableRevealed ? <><EyeOff size={16} /> {lang === 'te' ? 'సమాధానాలను కప్పి ఉంచండి (స్వీయ పరీక్ష)' : 'Cover Answers for Self-Test'}</> : <><Eye size={16} /> {lang === 'te' ? 'సమాధానాలను చూపించండి' : 'Reveal Table Answers'}</>}
            </button>
          </div>

          <div className="compare-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>{lang === 'te' ? activeTopic.compareTable.leftColTe : activeTopic.compareTable.leftCol}</th>
                  <th>{lang === 'te' ? activeTopic.compareTable.rightColTe : activeTopic.compareTable.rightCol}</th>
                </tr>
              </thead>
              <tbody>
                {activeTopic.compareTable.rows.map(([left, right], idx) => (
                  <tr key={idx}>
                    <td><b>{left}</b></td>
                    <td>
                      <span className={`table-answer ${tableRevealed ? 'shown' : 'hidden'}`}>
                        {right}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. MEMORY HOOK / MNEMONIC */}
        <div className="mnemonic-box">
          <Lightbulb size={24} color="#f59e0b" />
          <div className="mnemonic-content">
            <b>{lang === 'te' ? 'జ్ఞాపక సంకేతం (Mnemonic):' : 'Memory Hook & Mnemonic:'}</b>
            <p>{activeTopic.mnemonic}</p>
          </div>
        </div>

        {/* 4. STORY CARDS GRID */}
        <div className="section-head" style={{ marginTop: '2.5rem' }}>
          <div>
            <div className="overline">ESSENTIAL PEDAGOGICAL UNITS</div>
            <h2>High-Yield Concept Cards</h2>
          </div>
        </div>

        <div className="story-cards-grid">
          {activeTopic.storyCards.map((card, i) => (
            <div key={i} className="sc-card">
              <div className="sc-top">
                <h4>{lang === 'te' ? card.titleTe : card.title}</h4>
                <span className="sc-tag">{card.tag}</span>
              </div>
              <p>{lang === 'te' ? card.bodyTe : card.body}</p>
            </div>
          ))}
        </div>

        {/* 5. INSTANT RETENTION CHECK QUIZ */}
        <div className="module-quiz-box">
          <div className="mq-head">
            <Trophy size={22} color="#f59e0b" />
            <div>
              <h3>{lang === 'te' ? 'తక్షణ గ్రహణ శక్తి క్విజ్' : 'Instant Retention Check'}</h3>
              <small>{lang === 'te' ? 'పరీక్ష తరహా ప్రశ్నలతో మీ జ్ఞాపకశక్తిని పరీక్షించుకోండి' : 'Verify active recall before moving to the next track'}</small>
            </div>
          </div>

          {activeTopic.quiz.length > 0 && (
            <div className="mq-question-card">
              <h4>{lang === 'te' ? activeTopic.quiz[quizIdx].qTe : activeTopic.quiz[quizIdx].q}</h4>
              <div className="mq-options">
                {activeTopic.quiz[quizIdx].options.map((opt, i) => {
                  const isCorrect = i === activeTopic.quiz[quizIdx].answer;
                  const isSelected = selectedOpt === i;
                  let cls = 'mq-opt';
                  if (selectedOpt !== null) {
                    if (isCorrect) cls += ' correct';
                    else if (isSelected) cls += ' wrong';
                  }
                  return (
                    <button
                      key={i}
                      className={cls}
                      disabled={selectedOpt !== null}
                      onClick={() => setSelectedOpt(i)}
                    >
                      <span>{String.fromCharCode(65 + i)}</span> {opt}
                    </button>
                  );
                })}
              </div>

              {selectedOpt !== null && (
                <div className="mq-feedback">
                  <b>{selectedOpt === activeTopic.quiz[quizIdx].answer ? '✓ Correct! +10 XP' : '✗ Incorrect'}</b>
                  <p>{activeTopic.quiz[quizIdx].explain}</p>
                  <button className="primary mini" onClick={() => setSelectedOpt(null)}>
                    {lang === 'te' ? 'మళ్ళీ ప్రయత్నించండి' : 'Try Again'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
