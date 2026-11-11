import fs from 'fs';

const curriculumCode = `// ==============================================================
// RIZVEDHA COMPREHENSIVE GENERAL AWARENESS VISUAL CURRICULUM
// 28 High-Yield Modules across History, Geography, Polity,
// Economics, General Science, Art & Culture, and Static GK
// ==============================================================

export const LEARN_TOPICS = [
  // -------------------------------------------------------------
  // SUBJECT 1: HISTORY (6 Modules)
  // -------------------------------------------------------------
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
        question: 'Which Indus Valley site has revealed evidence of a tidal brick dockyard?',
        options: ['Harappa', 'Lothal', 'Kalibangan', 'Banawali'],
        answer: 1,
        explain: 'Lothal in Gujarat on the Bhogava river had an artificial brick basin used as a tidal dockyard.'
      },
      {
        question: 'Which Indus city was divided into THREE distinct municipal sections instead of two?',
        options: ['Mohenjo-Daro', 'Dholavira', 'Chanhudaro', 'Rakhigarhi'],
        answer: 1,
        explain: 'Dholavira in Kutch (Gujarat) was divided into three sectors: Citadel, Middle Town, and Lower Town.'
      }
    ]
  },
  {
    id: 'history-vedic-religions',
    subject: 'History',
    subjectId: 'history',
    title: 'Vedic Age & Emergence of Buddhism and Jainism',
    titleTe: 'వేద యుగం, బౌద్ధం & జైన మతాల ఆవిర్భావం',
    era: 'c. 1500 – 500 BCE · Iron Age & Shramana Era',
    badge: 'High Yield · Philosophy & Literature',
    heroHook: 'Why did 6th century BCE witness a massive intellectual revolution against rigid sacrificial rituals?',
    heroHookTe: 'క్రీ.పూ. 6వ శతాబ్దంలో యజ్ఞయాగాదుల కర్మకాండలకు వ్యతిరేకంగా తాత్విక విప్లవం ఎందుకు మొదలైంది?',
    infographicType: 'buddhism-jainism-flow',
    infographicCaption: 'The Four Noble Truths & Noble Eightfold Path vs Jain Triratna and Five Great Vows.',
    storyCards: [
      {
        title: 'Rigvedic vs Later Vedic Society',
        titleTe: 'ఋగ్వేద vs మలి వేద సమాజం',
        body: 'Early Rigvedic pastoral society was egalitarian with participatory assemblies (Sabha and Samiti). Later Vedic witnessed iron plows, settled territorial monarchies (Janapadas), and birth-based Varna hierarchy.',
        bodyTe: 'తొలి వేద సమాజం సభ, సమితి వంటి ప్రజాస్వామిక సంస్థలతో సమానత్వంతో ఉండేది; మలి వేదంలో జనపదాలు, ఇనుము వినియోగం మరియు జన్మ ఆధారిత వర్ణ వ్యవస్థ ఏర్పడ్డాయి.',
        tag: 'Four Vedas'
      },
      {
        title: 'Gautama Buddha & Four Noble Truths',
        titleTe: 'గౌతమ బుద్ధుడు & నాలుగు ఆర్య సత్యాలు',
        body: 'Siddhartha attained Enlightenment at Bodh Gaya under the Bodhi tree. First Sermon at Sarnath (Dhammacakkappavattana). Taught 4 Noble Truths (Dukkha, Samudaya, Nirodha, Magga) and Ashtangika Marga.',
        bodyTe: 'బుద్ధుడి బోధనలు: దుఃఖం, దుఃఖ సముదయం, దుఃఖ నిరోధం, దుఃఖ నిరోధ గామిని ప్రతిపద (అష్టాంగ మార్గం). సారనాథ్‌లో మొదటి ధర్మచక్ర ప్రవర్తన.',
        tag: 'Tripitakas'
      },
      {
        title: 'Mahavira & Jain Philosophy',
        titleTe: 'వర్ధమాన మహావీరుడు & జైన తత్వశాస్త్రం',
        body: 'Vardhamana Mahavira, the 24th Tirthankara, attained Kevala Jnana. Advocated absolute Ahimsa (non-injury), Anekantavada (multiplicity of viewpoints), and Syadvada, along with the Triratna.',
        bodyTe: '24వ తీర్థంకరుడైన మహావీరుడు కైవల్య జ్ఞానం పొందాడు. పరమ అహింస, అనేకాంతవాదం మరియు త్రిరత్నాలు (సమ్యక్ దర్శన, సమ్యక్ జ్ఞాన, సమ్యక్ చరిత్ర) బోధించాడు.',
        tag: 'Agamas'
      },
      {
        title: 'The Four Buddhist Councils',
        titleTe: 'నాలుగు బౌద్ధ సంగీతులు',
        body: '1st at Rajgriha (Ajatashatru, 483 BCE), 2nd at Vaishali (Kalasoka, 383 BCE), 3rd at Pataliputra (Ashoka, 250 BCE), 4th at Kundalvana, Kashmir (Kanishka, 72 CE - split into Hinayana and Mahayana).',
        bodyTe: '1వ సంగీతి రాజగృహ (అజాతశత్రు), 2వ వైశాలి (కాలశోకుడు), 3వ పాటలీపుత్ర (అశోకుడు), 4వ కుండలవనం కాశ్మీర్ (కనిష్కుడు - హీనయాన, మహాయాన విభజన).',
        tag: 'SSC Repeat'
      }
    ],
    compareTable: {
      leftCol: 'Buddhist Council',
      leftColTe: 'బౌద్ధ సంగీతి',
      rightCol: 'Patron King · Location · President · Key Outcome',
      rightColTe: 'రాజు · ప్రదేశం · అధ్యక్షుడు · ఫలితం',
      rows: [
        ['1st Council (483 BCE)', 'King Ajatashatru · Rajgriha (Saptaparni) · Mahakassapa · Compiled Vinaya & Sutta Pitakas'],
        ['2nd Council (383 BCE)', 'King Kalasoka · Vaishali · Sabakami · Split into Sthaviravadins & Mahasanghikas'],
        ['3rd Council (250 BCE)', 'Emperor Ashoka · Pataliputra · Moggaliputta Tissa · Compiled Abhidhamma Pitaka'],
        ['4th Council (72 CE)', 'King Kanishka · Kundalvana (Kashmir) · Vasumitra · Formal split into Hinayana & Mahayana'],
        ['Buddhism Holy Texts', 'Tripitakas in Pali: Vinaya (Rules), Sutta (Discourses), Abhidhamma (Philosophy)'],
        ['Jainism Triratna', 'Right Faith (Samyak Darshana), Right Knowledge (Jnana), Right Conduct (Charitra)']
      ]
    },
    mnemonic: 'Council Kings: R-V-P-K = Rajgriha, Vaishali, Pataliputra, Kashmir. Kings: A-K-A-K = Ajatashatru, Kalasoka, Ashoka, Kanishka.',
    quiz: [
      {
        question: 'Under whose patronage was the 4th Buddhist Council held in Kashmir where Buddhism split into Mahayana and Hinayana?',
        options: ['Ashoka', 'Kanishka', 'Ajatashatru', 'Kalasoka'],
        answer: 1,
        explain: 'The 4th Buddhist Council was convened by Kushana Emperor Kanishka at Kundalvana in Kashmir, presided over by Vasumitra.'
      }
    ]
  },
  {
    id: 'history-mauryan-empire',
    subject: 'History',
    subjectId: 'history',
    title: 'The Mauryan Empire & Ashokan Rock Edicts',
    titleTe: 'మౌర్య సామ్రాజ్యం & అశోకుడి శిలాశాసనాలు',
    era: 'c. 322 – 185 BCE · Iron Age Empire',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did Chandragupta and Chanakya unite the Indian subcontinent into the first pan-Indian empire?',
    heroHookTe: 'చంద్రగుప్తుడు మరియు చాణక్యుడు భారతదేశాన్ని మొదటి సారిగా ఒకే సామ్రాజ్యంగా ఎలా ఏకం చేశారు?',
    infographicType: 'mauryan-pillar',
    infographicCaption: 'The 24-Spoke Sarnath Lion Capital, Brahmi Script Edicts & Imperial Provincial Network.',
    storyCards: [
      {
        title: 'Chanakya and the Arthashastra',
        titleTe: 'చాణక్యుడు మరియు అర్థశాస్త్రం',
        body: 'Kautilya (Chanakya) authored the Arthashastra, laying down statecraft, diplomacy (Saptanga Theory of State: Swami, Amatya, Janapada, Durga, Kosha, Danda, Mitra), and espionage.',
        bodyTe: 'కౌటిల్యుడు అర్థశాస్త్రాన్ని రచించాడు; రాజ్య సప్తాంగ సిద్ధాంతం (రాజు, మంత్రులు, రాజ్యం, కోట, ఖజానా, సైన్యం, మిత్రులు) ప్రతిపాదించాడు.',
        tag: 'Statecraft Classic'
      },
      {
        title: 'The Kalinga War Turning Point (261 BCE)',
        titleTe: 'కళింగ యుద్ధ మలుపు (క్రీ.పూ. 261)',
        body: 'Major Rock Edict XIII records Ashoka\\'s profound remorse over the immense death and suffering in the Kalinga war, leading him to renounce military victory (Bherighosha) in favor of moral conquest (Dhammaghosha).',
        bodyTe: '13వ ప్రధాన శిలాశాసనం కళింగ యుద్ధంలో జరిగిన ప్రాణనష్టాన్ని వివరిస్తుంది. అశోకుడు భేరీఘోషను వదిలి ధమ్మఘోషను స్వీకరించాడు.',
        tag: 'Major Rock Edict XIII'
      },
      {
        title: 'Megasthenes and Indica',
        titleTe: 'మెగస్తనీస్ మరియు ఇండికా',
        body: 'Seleucid ambassador Megasthenes visited Pataliputra during Chandragupta Maurya\\'s reign. He recorded a 7-caste division of Indian society and a 30-member municipal commission for Pataliputra.',
        bodyTe: 'చంద్రగుప్తుని ఆస్థానాన్ని సందర్శించిన గ్రీకు రాయబారి మెగస్తనీస్. సమాజాన్ని 7 వర్గాలుగా వర్ణించాడు.',
        tag: 'Greek Accounts'
      },
      {
        title: 'National Emblem: Sarnath Lion Capital',
        titleTe: 'జాతీయ చిహ్నం: సారనాథ్ సింహ రాజధాని',
        body: 'Carved out of single sandstone monolith at Sarnath where Buddha gave his first sermon. Four Asiatic lions standing back to back; base features wheel with 24 spokes (Ashoka Chakra) flanked by elephant, horse, bull, and lion.',
        bodyTe: 'ఒకే ఇసుకరాయితో చెక్కిన సారనాథ్ స్తంభం. 24 ఆకుల అశోక చక్రం భారతదేశ జాతీయ పతాకంలో భాగమైంది.',
        tag: 'Adopted Jan 26, 1950'
      }
    ],
    compareTable: {
      leftCol: 'Ashokan Rock Edict',
      leftColTe: 'అశోకుడి శాసనం',
      rightCol: 'Core Historical Subject & SSC Takeaway',
      rightColTe: 'ముఖ్య చారిత్రక అంశం',
      rows: [
        ['Major Rock Edict I', 'Prohibits animal sacrifice and bans festive gatherings (Samaja)'],
        ['Major Rock Edict II', 'Mentions medical facilities for humans and animals; mentions Cholas, Pandyas, Satyaputras'],
        ['Major Rock Edict V', 'Introduction and appointment of Dhamma Mahamattas (morality officers)'],
        ['Major Rock Edict XII', 'Plea for mutual religious tolerance and respect between all sects'],
        ['Major Rock Edict XIII', 'Account of Kalinga War conquest (261 BCE) & conversion to Dhammaghosha'],
        ['Rummindei Pillar (Lumbini)', 'Tax exemption (Bali abolished) to celebrate Buddha’s birth place']
      ]
    },
    mnemonic: 'MRE XIII = 13 is unlucky for war = Kalinga War remorse. Pillar Rummindei = Rent reduced (taxes).',
    quiz: [
      {
        question: 'Which Rock Edict of Emperor Ashoka describes the horrors of the Kalinga War and his conversion to Dhamma?',
        options: ['Major Rock Edict V', 'Major Rock Edict X', 'Major Rock Edict XIII', 'Pillar Edict VII'],
        answer: 2,
        explain: 'Major Rock Edict XIII specifically describes the war against Kalinga and Ashoka\\'s repentance.'
      }
    ]
  },
  {
    id: 'history-gupta-empire',
    subject: 'History',
    subjectId: 'history',
    title: 'Gupta Empire: Golden Age of Science & Literature',
    titleTe: 'గుప్త సామ్రాజ్యం: విజ్ఞాన & సాహిత్య స్వర్ణయుగం',
    era: 'c. 319 – 550 CE · Classical Age',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why is the Gupta era universally celebrated as the Classical Golden Age of ancient Indian civilisation?',
    heroHookTe: 'గుప్తుల కాలాన్ని ప్రాచీన భారతదేశ సాంస్కృతిక స్వర్ణయుగంగా ఎందుకు పరిగణిస్తారు?',
    infographicType: 'gupta-architecture',
    infographicCaption: 'Iron Pillar of Delhi (Zero Rust Metallurgy), Aryabhata Celestial Model & Navaratnas of Vikramaditya.',
    storyCards: [
      {
        title: 'Samudragupta: Napoleon of India',
        titleTe: 'సముద్రగుప్తుడు: ఇండియన్ నెపోలియన్',
        body: 'Historian V.A. Smith titled Samudragupta the Napoleon of India. The Prayag Prashasti (Allahabad Pillar) inscribed by court poet Harisena in fluent Sanskrit records his extensive conquests in North (Aryavarta) and South (Dakshinapatha).',
        bodyTe: 'హరిసేనుడు రచించిన అలహాబాద్ ప్రశస్తి (ప్రయాగ ప్రశస్తి) సముద్రగుప్తుని దిగ్విజయాలను వివరిస్తుంది. వీణ వాయిస్తున్న నాణేలు ముద్రించాడు.',
        tag: 'Harisena Inscription'
      },
      {
        title: 'Chandragupta II & The Nine Gems (Navaratnas)',
        titleTe: 'రెండవ చంద్రగుప్తుడు & నవరత్నాలు',
        body: 'Assumed the title Vikramaditya after eradicating the Western Kshatrapas (Sakas). His court at Ujjain patronized the Navaratnas including poet Kalidasa, astronomer Varahamihira, and physician Dhanvantari.',
        bodyTe: 'ఉజ్జయినిని రాజధానిగా చేసుకుని కాళిదాసు, వరాహమిహిరుడు, ధన్వంతరి వంటి నవరత్నాలను ఆదరించాడు. శక విజయం తర్వాత విక్రమాదిత్య బిరుదు ధరించాడు.',
        tag: 'Vikramaditya Era'
      },
      {
        title: 'Aryabhata and Mathematical Astronomy',
        titleTe: 'ఆర్యభట్టు & ఖగోళ గణితం',
        body: 'Aryabhata composed Aryabhatiya (499 CE). Formulated the concept of zero, calculated pi to 3.1416, and explained that solar and lunar eclipses are caused by planetary shadows, not mythical demons.',
        bodyTe: 'ఆర్యభటీయం గ్రంథ కర్త. శూన్యం భావన, పై (pi) విలువ లెక్కించాడు; గ్రహణాలు భూమి, చంద్రుల నీడల వల్లే ఏర్పడతాయని వివరించాడు.',
        tag: 'Pataliputra Scholar'
      },
      {
        title: 'Rust-Resistant Mehrauli Iron Pillar',
        titleTe: 'మెహ్రౌలీ ఇనుప స్తంభం',
        body: 'Standing in Delhi near Qutb Minar, this 7-meter forged wrought-iron pillar erected by King Chandra (Chandragupta II) has resisted rust and atmospheric corrosion for over 1,600 years, baffling modern metallurgists.',
        bodyTe: '1600 సంవత్సరాలుగా వాతావరణ మార్పులకు గురవుతున్నా తుప్పు పట్టని అద్భుత లోహ శాస్త్ర నైపుణ్యం.',
        tag: '4th Century Metallurgy'
      }
    ],
    compareTable: {
      leftCol: 'Gupta Scholar / Work',
      leftColTe: 'గుప్తుల కాలపు పండితుడు / గ్రంథం',
      rightCol: 'Core Scholarly Breakthrough & SSC Key Fact',
      rightColTe: 'ప్రధాన గ్రంథం & విశిష్టత',
      rows: [
        ['Kalidasa', 'Abhijnanasakuntalam, Meghaduta, Raghuvamsha, Kumarasambhava (Shakespeare of India)'],
        ['Aryabhata', 'Aryabhatiya, Surya Siddhanta: Earth rotates on its own axis; calculated exact year length'],
        ['Varahamihira', 'Brihat Samhita, Panchasiddhantika: Encyclopedic treatise on astronomy, hydrology, geology'],
        ['Vishakhadatta', 'Mudrarakshasa (Chanakya overthrowing Nandas) and Devichandraguptam'],
        ['Shudraka', 'Mrichchhakatika ("The Little Clay Cart") depicting urban romance and societal realism'],
        ['Dhanvantari', 'Father of Ayurveda during Gupta court; formulated traditional surgical medicine']
      ]
    },
    mnemonic: 'Gupta Kings: S-C-K = Sri Gupta (Founder), Chandragupta I (Maharajadhiraja), Samudragupta (Kaviraja), Chandragupta II (Vikramaditya).',
    quiz: [
      {
        question: 'Who composed the famous Prayag Prashasti (Allahabad Pillar inscription) praising the conquests of Samudragupta?',
        options: ['Kalidasa', 'Harisena', 'Banabhatta', 'Ravikirti'],
        answer: 1,
        explain: 'Court poet Harisena composed the Prayag Prashasti in chaste Sanskrit in Champu kavya style.'
      }
    ]
  },
  {
    id: 'history-delhi-sultanate',
    subject: 'History',
    subjectId: 'history',
    title: 'The Delhi Sultanate: Dynasties & Administration',
    titleTe: 'ఢిల్లీ సుల్తానేట్: రాజవంశాలు & పరిపాలన',
    era: '1206 – 1526 CE · Medieval Era',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did five successive dynasties defend India from Mongol invasions and build Indo-Islamic architecture?',
    heroHookTe: 'ఐదు రాజవంశాలు మంగోల్ దండయాత్రలను ఎలా తిప్పికొట్టాయి మరియు ఇండో-ఇస్లామిక్ నిర్మాణ శైలిని ఎలా అభివృద్ధి చేశాయి?',
    infographicType: 'delhi-timeline',
    infographicCaption: 'Slave (Mamluk) → Khilji → Tughlaq → Sayyid → Lodi Timeline with Qutb Minar Architecture.',
    storyCards: [
      {
        title: 'The Mamluk / Slave Dynasty (1206-1290)',
        titleTe: 'బానిస వంశం (మామ్లూక్)',
        body: 'Qutb-ud-din Aibak founded the Sultanate and started Qutb Minar. Iltutmish introduced the Silver Tanka, Copper Jital, Iqta system, and Chalisa (Corpse of Forty). Razia Sultana became the first and only woman sultan.',
        bodyTe: 'కుతుబుద్దీన్ ఐబక్ స్థాపించాడు; ఇల్తుత్మిష్ ఇక్తా వ్యవస్థ, వెండి టంకా, రాగి జిటాల్ ప్రవేశపెట్టాడు. రజియా సుల్తానా మొదటి మహిళా పాలకురాలు.',
        tag: 'Corpse of 40'
      },
      {
        title: 'Alauddin Khilji: Market Reforms & Expansion',
        titleTe: 'అలావుద్దీన్ ఖిల్జీ: మార్కెట్ సంస్కరణలు',
        body: 'Implemented strict price controls with market superintendents (Shahna-i-Mandi). Introduced Dagh (branding horses) and Chehra (descriptive soldier rolls). His general Malik Kafur conquered South Indian kingdoms.',
        bodyTe: 'కఠినమైన ధరల నియంత్రణ, గుర్రాలపై దాగ్ (ముద్ర), సైనికుల చేహ్రా పద్ధతి మరియు మాలిక్ కాఫుర్ ద్వారా దక్కన్ విజయాలు సాధించాడు.',
        tag: 'Military & Markets'
      },
      {
        title: 'Muhammad bin Tughlaq: Visionary Experiments',
        titleTe: 'ముహమ్మద్ బిన్ తుగ్లక్: వినూత్న ప్రయోగాలు',
        body: 'Known as the "Wise Fool", he attempted 5 daring experiments: shifting capital from Delhi to Daulatabad, issuing token copper/brass currency, increasing Doab tax during famine, Khurasan expedition, and Qarachil venture.',
        bodyTe: 'ఢిల్లీ నుండి దౌలతాబాద్‌కు రాజధాని మార్పు, రాగి నాణేల ప్రవేశం వంటి సాహసోపేత ప్రయోగాలు విఫలమయ్యాయి.',
        tag: 'Ibn Battuta Accounts'
      },
      {
        title: 'First Battle of Panipat (1526)',
        titleTe: 'మొదటి పానిపట్ యుద్ధం (1526)',
        body: 'Babur defeated Ibrahim Lodi (the last Sultan of the Lodi Afghan dynasty) using field artillery and the Tulughma flanking tactic, concluding the Delhi Sultanate and establishing the Mughal Empire.',
        bodyTe: 'బాబర్ తుపాకీ గుండ్లు, తుళుగ్మా వ్యూహంతో ఇబ్రహీం లోధీని ఓడించి మొఘల్ సామ్రాజ్యానికి పునాది వేశాడు.',
        tag: 'Founding of Mughals'
      }
    ],
    compareTable: {
      leftCol: 'Delhi Dynasty',
      leftColTe: 'ఢిల్లీ రాజవంశం',
      rightCol: 'Chronology · Founder · Key Sultan · Monument',
      rightColTe: 'కాలం · స్థాపకుడు · ముఖ్య పాలకుడు · కట్టడం',
      rows: [
        ['1. Mamluk (Slave) Dynasty', '1206–1290 CE · Qutb-ud-din Aibak · Iltutmish & Balban · Qutb Minar, Quwwat-ul-Islam'],
        ['2. Khilji Dynasty', '1290–1320 CE · Jalaluddin Khilji · Alauddin Khilji · Alai Darwaza, Siri Fort'],
        ['3. Tughlaq Dynasty', '1320–1414 CE · Ghiyasuddin Tughlaq · Muhammad & Firoz Shah Tughlaq · Tughlaqabad Fort'],
        ['4. Sayyid Dynasty', '1414–1451 CE · Khizr Khan · Mubarak Shah · Tomb of Mubarak Shah'],
        ['5. Lodi Dynasty (Afghans)', '1451–1526 CE · Bahlul Lodi · Sikandar Lodi (founded Agra 1504) & Ibrahim Lodi · Lodi Gardens']
      ]
    },
    mnemonic: 'Chronology: S-K-T-S-L = "Sab Kuch Theek Sa Lage" = Slave, Khilji, Tughlaq, Sayyid, Lodi.',
    quiz: [
      {
        question: 'Who among the following Sultans of Delhi introduced the market control system (Shahna-i-Mandi) and branding of horses (Dagh)?',
        options: ['Balban', 'Alauddin Khilji', 'Firoz Shah Tughlaq', 'Iltutmish'],
        answer: 1,
        explain: 'Alauddin Khilji established a strictly regulated market price control system and introduced Dagh and Huliya/Chehra.'
      }
    ]
  },
  {
    id: 'history-freedom-movement',
    subject: 'History',
    subjectId: 'history',
    title: 'Indian Freedom Movement & Gandhian Mass Struggles',
    titleTe: 'భారత స్వాతంత్ర్యోద్యమం & గాంధీజీ ప్రజాపోరాటాలు',
    era: '1857 – 1947 CE · Modern India',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did non-violent Satyagraha, Salt Marches, and mass civil disobedience dismantle the mighty British Empire?',
    heroHookTe: 'అహింసా సత్యాగ్రహం, ఉప్పు సత్యాగ్రహం మరియు క్విట్ ఇండియా ఉద్యమాలు బ్రిటిష్ సామ్రాజ్యాన్ని ఎలా గడగడలాడించాయి?',
    infographicType: 'freedom-timeline',
    infographicCaption: '1857 Revolt → 1885 INC → 1905 Swadeshi → 1920 Non-Cooperation → 1930 Dandi → 1942 Quit India.',
    storyCards: [
      {
        title: 'Revolt of 1857 (First War of Independence)',
        titleTe: '1857 ప్రథమ స్వాతంత్ర్య సంగ్రామం',
        body: 'Sparked at Meerut and Barrackpore (Mangal Pandey) by greased Enfield cartridges. Bahadur Shah Zafar was proclaimed Emperor; led by Rani Lakshmibai (Jhansi), Kunwar Singh (Bihar), Nana Saheb (Kanpur). Resulted in Government of India Act 1858 ending East India Company rule.',
        bodyTe: 'మీరట్, బారక్‌పూర్‌లలో ప్రారంభమైన తిరుగుబాటు; ఝాన్సీ లక్ష్మీబాయి, నానా సాహెబ్, కున్వర్ సింగ్ నాయకత్వం వహించారు. ఈస్ట్ ఇండియా కంపెనీ పాలన రద్దయింది.',
        tag: 'Crown Rule Began'
      },
      {
        title: 'Non-Cooperation Movement (1920-1922)',
        titleTe: 'సహాయ నిరాకరణ ఉద్యమం (1920-1922)',
        body: 'Launched following Rowlatt Act, Jallianwala Bagh massacre (April 13, 1919), and Khilafat issue. Boycott of titles, foreign goods, and schools. Halted abruptly after the Chauri Chaura police station arson in Feb 1922.',
        bodyTe: 'రౌలత్ చట్టం, జలియన్‌వాలాబాగ్ దురంతం తర్వాత గాంధీజీ ప్రారంభించారు. చౌరీ చౌరా హింసాత్మక ఘటనతో గాంధీజీ ఉద్యమాన్ని నిలిపివేశారు.',
        tag: 'Chauri Chaura'
      },
      {
        title: 'Civil Disobedience & Dandi March (1930)',
        titleTe: 'శాసనోల్లంఘన & దండి యాత్ర (1930)',
        body: 'Gandhiji marched 240 miles from Sabarmati Ashram to Dandi with 78 followers from March 12 to April 6, 1930, breaking the British salt tax monopoly. Led to the Gandhi-Irwin Pact and Round Table Conferences.',
        bodyTe: 'సబర్మతి నుండి దండి వరకు 240 మైళ్లు కాలినడకన వెళ్లి ఉప్పు చట్టాన్ని ఉల్లంఘించారు. దేశవ్యాప్తంగా శాసనోల్లంఘన మొదలైంది.',
        tag: 'Salt Satyagraha'
      },
      {
        title: 'Quit India Movement (August 1942)',
        titleTe: 'క్విట్ ఇండియా ఉద్యమం (ఆగస్టు 1942)',
        body: 'Passed at Gowalia Tank Maidan (Mumbai) after Cripps Mission failed. Gandhiji gave the clarion call "Do or Die" (Karo ya Maro). Aruna Asaf Ali hoisted the Indian flag.',
        bodyTe: 'ముంబైలోని గోవాలియా ట్యాంక్ మైదానంలో "డూ ఆర్ డై" (చేయండి లేదా చావండి) నినాదం ఇచ్చారు. అరుణా అసఫ్ అలీ జాతీయ పతాకాన్ని ఎగురవేశారు.',
        tag: 'Do or Die'
      }
    ],
    compareTable: {
      leftCol: 'Milestone / Event',
      leftColTe: 'చారిత్రక ఘట్టం',
      rightCol: 'Year · Viceroy · Key Personality · Crucial Fact',
      rightColTe: 'సంవత్సరం · వైస్రాయ్ · ప్రముఖులు · ముఖ్యాంశం',
      rows: [
        ['Formation of INC', '1885 · Lord Dufferin · A.O. Hume, W.C. Bonnerjee · Bombay Gokuldas Tejpal College'],
        ['Partition of Bengal', '1905 · Lord Curzon · Annulled in 1911 by Lord Hardinge · Sparked Swadeshi Movement'],
        ['Jallianwala Bagh Massacre', '13 April 1919 · Lord Chelmsford · Gen. Reginald Dyer · Rabindranath Tagore renounced Knighthood'],
        ['Kakori Train Action', '1925 · HRA freedom fighters · Ram Prasad Bismil, Ashfaqullah Khan, Chandrashekhar Azad'],
        ['Lahore Session & Purna Swaraj', '1929 · Jawaharlal Nehru presided · Tricolour hoisted at Ravi river; Jan 26, 1930 Independence Day'],
        ['Cabinet Mission Plan', '1946 · Lord Wavell · Pethick-Lawrence, Stafford Cripps, A.V. Alexander · Setup Constituent Assembly']
      ]
    },
    mnemonic: 'Mass Movements: N-C-Q = Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942). Interval = 10, 12 years.',
    quiz: [
      {
        question: 'At which historic session did the Indian National Congress declare "Purna Swaraj" (Complete Independence) as its ultimate goal?',
        options: ['Surat Session (1907)', 'Lahore Session (1929)', 'Belgaum Session (1924)', 'Karachi Session (1931)'],
        answer: 1,
        explain: 'The 1929 Lahore Session presided over by Jawaharlal Nehru passed the historic Purna Swaraj resolution.'
      }
    ]
  },

  // -------------------------------------------------------------
  // SUBJECT 2: GEOGRAPHY (6 Modules)
  // -------------------------------------------------------------
  {
    id: 'geography-river-systems',
    subject: 'Geography',
    subjectId: 'geography',
    title: 'Major River Systems: Himalayan vs Peninsular Drainage',
    titleTe: 'భారతదేశ నదీ వ్యవస్థలు: హిమాలయ & ద్వీపకల్ప నదులు',
    era: 'Indian Physiography & Drainage',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why do Himalayan rivers flow perennially while Peninsular rivers are seasonal and rain-fed?',
    heroHookTe: 'హిమాలయ నదులు జీవనదులుగా ఎందుకు ప్రవహిస్తాయి, ద్వీపకల్ప నదులు వర్షాధారంగా ఎందుకు ఉంటాయి?',
    infographicType: 'river-basin',
    infographicCaption: 'Himalayan (Indus, Ganga, Brahmaputra) vs Peninsular (Godavari, Krishna, Narmada, Tapi).',
    storyCards: [
      {
        title: 'Indus River System',
        titleTe: 'సింధు నదీ వ్యవస్థ',
        body: 'Originates near Bokhar Chu glacier in Tibet (Singi Khamban). Total length 3,180 km. Five Punjab tributaries: Jhelum (Verinag), Chenab (Chandra+Bhaga at Tandi), Ravi (Rohtang), Beas (Beas Kund), and Sutlej (Rakshastal).',
        bodyTe: 'టిబెట్‌లోని బోఖర్ చూ హిమానీనదం వద్ద పుడుతుంది. జీలం, చీనాబ్, రావి, బియాస్, సట్లెజ్ దీని పంచనదులు.',
        tag: 'Indus Water Treaty 1960'
      },
      {
        title: 'Ganga River System',
        titleTe: 'గంగా నదీ వ్యవస్థ',
        body: 'Originates as Bhagirathi from Gangotri glacier (Gaumukh). Becomes Ganga at Devprayag after confluence with Alaknanda. Length 2,525 km. Right-bank tributaries: Yamuna (longest tributary, 1,376 km), Son. Left-bank: Ramganga, Gomti, Ghaghara, Gandak, Kosi.',
        bodyTe: 'దేవప్రయాగ వద్ద భగీరథి, అలకనందల సంగమంతో గంగ ఏర్పడుతుంది. భారతదేశంలో అత్యంత పొడవైన నది (2,525 కి.మీ). యమున దీని ప్రధాన ఉపనది.',
        tag: 'National River 2008'
      },
      {
        title: 'Brahmaputra River System',
        titleTe: 'బ్రహ్మపుత్ర నదీ వ్యవస్థ',
        body: 'Originates from Chemayungdung glacier in Tibet, called Yarlung Tsangpo. Enters India via Dihang gorge in Arunachal Pradesh. Forms Majuli (largest inhabited river island in the world) in Assam. Known as Jamuna in Bangladesh.',
        bodyTe: 'టిబెట్‌లో యార్లుంగ్ త్సాంగ్పో అని, అరుణాచల్‌లో దిహాంగ్ అని పిలుస్తారు. అస్సాంలో ప్రపంచంలోనే అతిపెద్ద నదీ ద్వీపమైన మజులిని ఏర్పరుస్తుంది.',
        tag: 'Majuli River Island'
      },
      {
        title: 'Peninsular Divide: East vs West Flowing',
        titleTe: 'తూర్పు vs పశ్చిమ ప్రవాహ నదులు',
        body: 'East-flowing rivers (Godavari, Krishna, Kaveri, Mahanadi) drain into Bay of Bengal forming large deltas. West-flowing rivers (Narmada, Tapi, Sharavati) flow through rift valleys into the Arabian Sea forming estuaries.',
        bodyTe: 'తూర్పుకు ప్రవహించే నదులు (గోదావరి, కృష్ణ, కావేరి) డెల్టాలను ఏర్పరుస్తాయి; పశ్చిమానికి ప్రవహించే నర్మద, తపతి నదులు చీలిక లోయల గుండా ప్రవహిస్తూ ఎస్చురీలను ఏర్పరుస్తాయి.',
        tag: 'Rift Valleys'
      }
    ],
    compareTable: {
      leftCol: 'River',
      leftColTe: 'నది',
      rightCol: 'Origin · Length · Drainage / Estuary · Notable Feature',
      rightColTe: 'ఉద్భవం · పొడవు · సంగమం · విశేషం',
      rows: [
        ['Ganga', 'Gangotri Glacier (Devprayag) · 2,525 km · Bay of Bengal · Largest delta in world (Sundarbans)'],
        ['Godavari ("Dakshin Ganga")', 'Trimbakeshwar, Nashik (Maharashtra) · 1,465 km · Bay of Bengal · Longest peninsular river'],
        ['Krishna', 'Mahabaleshwar (Maharashtra) · 1,400 km · Bay of Bengal · Almatti, Nagarjuna Sagar dams'],
        ['Narmada', 'Amarkantak Plateau (MP) · 1,312 km · Arabian Sea · Flows in rift valley; Dhuandhar Falls'],
        ['Tapi / Tapti', 'Betul District, Satpura Range (MP) · 724 km · Arabian Sea · Twin / handmaid of Narmada'],
        ['Kaveri ("Ganga of South")', 'Talakaveri, Brahmagiri Hills (Karnataka) · 800 km · Bay of Bengal · Shivasamudram Falls']
      ]
    },
    mnemonic: 'Panch Prayag in order: V-N-K-R-D = Vishnuprayag (Dhauli), Nandaprayag (Nanda), Karnaprayag (Pindar), Rudraprayag (Mandakini), Devprayag (Bhagirathi).',
    quiz: [
      {
        question: 'At which confluence do the Bhagirathi and Alaknanda rivers meet to officially form River Ganga?',
        options: ['Rudraprayag', 'Karnaprayag', 'Devprayag', 'Vishnuprayag'],
        answer: 2,
        explain: 'At Devprayag, the Bhagirathi from Gangotri meets the Alaknanda from Satopanth glacier to form the Ganga.'
      }
    ]
  },
  {
    id: 'geography-mountain-passes',
    subject: 'Geography',
    subjectId: 'geography',
    title: 'Mountain Passes & Strategic Frontiers of India',
    titleTe: 'భారత పర్వత కనుమలు & వ్యూహాత్మక సరిహద్దులు',
    era: 'Himalayan & Peninsular Gaps',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Which strategic mountain pass cut through sheer granite at 18,380 ft to keep Ladakh accessible year-round?',
    heroHookTe: 'లడఖ్ మరియు సరిహద్దు ప్రాంతాలను దేశంతో అనుసంధానించే వ్యూహాత్మక పర్వత కనుమలు ఏవి?',
    infographicType: 'passes-cross',
    infographicCaption: 'Himalayan Passes (Zoji La, Khardung La, Nathu La, Shipki La) vs Western Ghat Gaps (Thal, Bhor, Palghat).',
    storyCards: [
      {
        title: 'Zoji La: Gateway to Ladakh',
        titleTe: 'జోజి లా: లడఖ్ ముఖద్వారం',
        body: 'Located at 11,575 ft in the Great Himalayas, Zoji La links Kashmir Valley (Srinagar) to Ladakh (Kargil and Leh) along NH-1. The Zoji La bidirectional tunnel is currently under construction to eliminate winter isolation.',
        bodyTe: 'శ్రీనగర్ మరియు లేహ్ నగరాలను అనుసంధానిస్తుంది; వ్యూహాత్మక జోజిలా సొరంగం నిర్మాణం జరుగుతోంది.',
        tag: 'Srinagar-Leh Highway'
      },
      {
        title: 'Shipki La: Sutlej River Gorge',
        titleTe: 'షిప్కి లా: సట్లెజ్ ప్రవేశ మార్గం',
        body: 'Perched in Kinnaur district of Himachal Pradesh on the India-China border. It is through this historic gorge that the Sutlej River enters India from the Tibetan plateau.',
        bodyTe: 'హిమాచల్ ప్రదేశ్‌లో సట్లెజ్ నది భారతదేశంలోకి ప్రవేశించే కనుమ మార్గం.',
        tag: 'Sutlej Entry'
      },
      {
        title: 'Nathu La & Jelep La: The Sikkim Trade Arteries',
        titleTe: 'నాథు లా: చారిత్రక సిల్క్ రూట్',
        body: 'Nathu La at 14,140 ft connects Sikkim with Tibet\\'s Chumbi Valley along the ancient Silk Route. Reopened for border trade in 2006. Jelep La connects Kalimpong to Lhasa.',
        bodyTe: 'సిక్కిం మరియు టిబెట్ మధ్య వాణిజ్య మార్గం; 2006లో సరిహద్దు వాణిజ్యం పునఃప్రారంభించబడింది.',
        tag: 'Ancient Silk Route'
      },
      {
        title: 'Peninsular Gaps: Thal, Bhor, and Palghat',
        titleTe: 'పశ్చిమ కనుమల మార్గాలు',
        body: 'Western Ghats are continuous and crossed only through gaps: Thal Ghat links Mumbai to Nashik; Bhor Ghat links Mumbai to Pune; Palghat (Palakkad Gap, 30 km wide) links Kerala (Palakkad) to Tamil Nadu (Coimbatore).',
        bodyTe: 'తాల్ ఘాట్ (ముంబై-నాసిక్), భోర్ ఘాట్ (ముంబై-పూణే), పాల్‌ఘాట్ గ్యాప్ (కేరళ-తమిళనాడు అనుసంధానం).',
        tag: 'Western Ghats'
      }
    ],
    compareTable: {
      leftCol: 'Mountain Pass',
      leftColTe: 'పర్వత కనుమ',
      rightCol: 'State / UT · Connects · Strategic Significance',
      rightColTe: 'రాష్ట్రం · కలిపే మార్గం · ప్రాముఖ్యత',
      rows: [
        ['Zoji La', 'Ladakh / J&K · Srinagar to Kargil and Leh (NH-1) · Gateway to Ladakh'],
        ['Rohtang Pass (Atal Tunnel)', 'Himachal Pradesh · Kullu Valley to Lahaul & Spiti · Bypassed by 9.02 km Atal Tunnel'],
        ['Bara-Lacha La', 'Himachal Pradesh · Lahaul district to Leh in Ladakh · Crosses Zanskar range'],
        ['Nathu La', 'Sikkim · Gangtok to Lhasa (Tibet) · Historic Silk Route trade corridor'],
        ['Bomdi La', 'Arunachal Pradesh · Arunachal Pradesh to Lhasa (Tibet) · Overlooks Tawang Monastery'],
        ['Palghat Gap', 'Kerala / Tamil Nadu · Palakkad to Coimbatore · 30 km wide break in Western Ghats']
      ]
    },
    mnemonic: 'Himachal Passes: B-R-S = Baralacha La, Rohtang Pass, Shipki La. Sikkim: N-J = Nathu La, Jelep La.',
    quiz: [
      {
        question: 'Through which of the following mountain passes does the River Sutlej enter India from Tibet?',
        options: ['Zoji La', 'Shipki La', 'Nathu La', 'Lipulekh'],
        answer: 1,
        explain: 'The River Sutlej enters Himachal Pradesh (India) from Tibet through the Shipki La pass.'
      }
    ]
  },
  {
    id: 'geography-soils-agriculture',
    subject: 'Geography',
    subjectId: 'geography',
    title: 'Indian Soils, Monsoons & Crop Seasons',
    titleTe: 'భారతీయ నేలలు, ఋతుపవనాలు & పంట కాలాలు',
    era: 'ICAR Classification & Agronomy',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why does Black Regur Soil self-plough and retain moisture during blistering Deccan summers?',
    heroHookTe: 'నల్లరేగడి నేలలు తేమను ఎలా నిల్వ చేసుకుంటాయి మరియు స్వీయ దుక్కి గుణాన్ని ఎలా కలిగి ఉంటాయి?',
    infographicType: 'soils-profile',
    infographicCaption: 'Alluvial (Khadar/Bangar) vs Black (Regur) vs Red/Yellow vs Laterite Leached Soil.',
    storyCards: [
      {
        title: 'Alluvial Soil: Northern Granary',
        titleTe: 'ఒండ్రు నేలలు (అల్యూవియల్)',
        body: 'Covers ~40% of India\\'s area. Deposited by Indus, Ganga, and Brahmaputra rivers. Divided into Bangar (older, less fertile, containing calcareous Kankar nodules) and Khadar (new flood silt, highly fertile for wheat, rice, sugarcane).',
        bodyTe: 'భారతదేశంలో 40% విస్తీర్ణం కలిగిన నేలలు. ఖాదర్ (నూతన ఒండ్రు - అధిక సారవంతం) మరియు బాంగర్ (పాత ఒండ్రు - కంకర రాళ్లు) గా విభజిస్తారు.',
        tag: 'ICAR Classification'
      },
      {
        title: 'Black Soil (Regur): Cotton King',
        titleTe: 'నల్లరేగడి నేలలు (రెగూర్)',
        body: 'Derived from weathering of Deccan volcanic basalt trap. Rich in clay, calcium carbonate, and magnesium. Swells and turns sticky when wet; shrinks and develops deep aeration cracks when dry (self-ploughing), ideal for cotton.',
        bodyTe: 'దక్కన్ బసాల్ట్ లావా రాళ్ల శైథిల్యం వల్ల ఏర్పడింది. అధిక తేమను నిల్వ చేసుకుంటుంది. పత్తి సాగుకు అత్యంత అనుకూలం.',
        tag: 'Deccan Traps'
      },
      {
        title: 'Laterite Soil: Leached Highland Soil',
        titleTe: 'లాటరైట్ నేలలు (ఎర్రమట్టి)',
        body: 'Formed under high temperatures and heavy monsoon rainfall through intense leaching. Silica is washed away, leaving iron oxide and aluminium. Acidic, deficient in nitrogen and humus; ideal for cashew, tea, and coffee with fertilizers.',
        bodyTe: 'అధిక వర్షపాతం, ఉష్ణోగ్రత వల్ల జరిగే తీవ్ర నిక్షాళనం (లీచింగ్) వల్ల ఏర్పడతాయి. జీడిమామిడి, టీ, కాఫీ తోటలకు అనుకూలం.',
        tag: 'Intense Leaching'
      },
      {
        title: 'Crop Seasons: Kharif, Rabi & Zaid',
        titleTe: 'పంట కాలాలు: ఖరీఫ్, రబీ & జైద్',
        body: 'Kharif (Monsoon: June–October): Rice, Maize, Cotton, Jowar, Bajra, Groundnut. Rabi (Winter: October–April): Wheat, Barley, Mustard, Gram, Peas. Zaid (Summer: March–June): Watermelon, Cucumber, Fodder crops.',
        bodyTe: 'ఖరీఫ్ (వర్షాకాలం: వరి, పత్తి, మొక్కజొన్న), రబీ (శీతాకాలం: గోధుమ, ఆవాలు, శనగలు), జైద్ (వేసవి: పుచ్చకాయలు, దోసకాయలు).',
        tag: 'Agricultural Calendar'
      }
    ],
    compareTable: {
      leftCol: 'Soil Group',
      leftColTe: 'నేల రకం',
      rightCol: 'Parent Rock · Key Minerals · Deficiencies · Ideal Crops',
      rightColTe: 'శిల · ఖనిజాలు · లోపాలు · ప్రధాన పంటలు',
      rows: [
        ['Alluvial Soil (~40%)', 'Fluvial silt · Rich in Potash and Lime · Deficient in Nitrogen & Phosphorus · Wheat, Rice, Sugarcane'],
        ['Black / Regur (~15%)', 'Basaltic Lava · Rich in Lime, Iron, Magnesia · Deficient in Nitrogen & Humus · Cotton, Soybean, Tobacco'],
        ['Red & Yellow (~18%)', 'Crystalline Crystalline Granites · Iron diffusion gives red color · Deficient in Nitrogen, Humus · Millets, Pulses, Oilseeds'],
        ['Laterite Soil (~4%)', 'Leached residuum · Rich in Iron Oxide, Bauxite · Deficient in Nitrogen, Lime, Silica · Cashew, Rubber, Tea, Coffee'],
        ['Arid / Desert Soil', 'Wind-blown sand · High soluble salts, calcareous · Deficient in Moisture and Humus · Bajra, Pulses, Barley']
      ]
    },
    mnemonic: 'K-R-Z: Kharif = Starts June (Rainy), Rabi = Starts October (Cold), Zaid = Summer melons.',
    quiz: [
      {
        question: 'Which type of soil in India develops deep cracks during hot weather, causing a natural aeration or "self-ploughing" characteristic?',
        options: ['Laterite Soil', 'Alluvial Soil', 'Black (Regur) Soil', 'Red Soil'],
        answer: 2,
        explain: 'Black soil (Regur) has high clay content; it shrinks and cracks in summer, facilitating natural soil aeration.'
      }
    ]
  },
  {
    id: 'geography-wildlife-reserves',
    subject: 'Geography',
    subjectId: 'geography',
    title: 'National Parks & Biosphere Reserves of India',
    titleTe: 'భారత జాతీయ పార్కులు & బయోస్పియర్ రిజర్వ్‌లు',
    era: 'Wildlife Protection & Conservation',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did Project Tiger (1973) save the Royal Bengal Tiger from imminent extinction across 54 tiger reserves?',
    heroHookTe: 'ప్రాజెక్ట్ టైగర్ (1973) ద్వారా దేశంలో అంతరించిపోతున్న పులులను ఎలా కాపాడారు?',
    infographicType: 'national-parks-map',
    infographicCaption: 'Jim Corbett (First Park) → Kaziranga (Rhinos) → Keibul Lamjao (Floating Park) → Nilgiri Biosphere.',
    storyCards: [
      {
        title: 'Jim Corbett: India\\'s First National Park',
        titleTe: 'జిమ్ కార్బెట్ జాతీయ పార్కు',
        body: 'Established in 1936 as Hailey National Park in Nainital/Pauri Garhwal (Uttarakhand). Rechristened Corbett in 1957. Launch site of Project Tiger on April 1, 1973. Ramganga river flows through its heart.',
        bodyTe: '1936లో హేలీ నేషనల్ పార్కుగా స్థాపించబడింది; భారతదేశపు మొదటి జాతీయ ఉద్యానవనం. 1973లో ప్రాజెక్ట్ టైగర్ ఇక్కడే ప్రారంభమైంది.',
        tag: 'Est. 1936 · Ramganga'
      },
      {
        title: 'Kaziranga: Sanctuary of the One-Horned Rhino',
        titleTe: 'కజిరంగా: ఒంటికొమ్ము ఖడ్గమృగాల సంరక్షణాలయం',
        body: 'Situated in Assam along the Brahmaputra floodplains. Declared UNESCO World Heritage site in 1985. Hosts two-thirds of the world\\'s great one-horned rhinoceros population and four major rivers (including Diphlu).',
        bodyTe: 'అస్సాంలోని బ్రహ్మపుత్ర లోయలో ఉంది. ప్రపంచంలోని 2/3 వంతు ఒంటికొమ్ము ఖడ్గమృగాలు ఇక్కడే ఉన్నాయి. UNESCO ప్రపంచ వారసత్వ ప్రదేశం.',
        tag: 'UNESCO 1985'
      },
      {
        title: 'Keibul Lamjao: World\\'s Only Floating National Park',
        titleTe: 'కీబుల్ లామ్జావో: ప్రపంచంలో ఏకైక తేలియాడే పార్కు',
        body: 'Located in Manipur on Loktak Lake. Composed of floating decomposed plant biomass known as "Phumdis". It is the sole natural refuge of the endangered dancing brow-antlered deer (Sangai).',
        bodyTe: 'మణిపూర్‌లోని లోక్తాక్ సరస్సుపై తేలియాడే "ఫుమ్డిస్" పై ఉన్న పార్కు. అంతరించిపోతున్న సాంగై జింకల సహజ నివాసం.',
        tag: 'Sangai Dancing Deer'
      },
      {
        title: 'Nilgiri: India\\'s First Biosphere Reserve',
        titleTe: 'నీలగిరి: భారతదేశ మొదటి బయోస్పియర్ రిజర్వ్',
        body: 'Established in 1986 spanning Tamil Nadu, Kerala, and Karnataka. Includes Bandipur, Nagarhole, Mudumalai, and Silent Valley. Home to the endangered Lion-tailed Macaque and Nilgiri Tahr.',
        bodyTe: '1986లో ఏర్పాటైన భారతదేశ మొదటి బయోస్పియర్ రిజర్వ్. నీలగిరి తహర్ మరియు లయన్-టెయిల్డ్ మకాక్ వానరాల నివాసం.',
        tag: 'Est. 1986'
      }
    ],
    compareTable: {
      leftCol: 'National Park / Reserve',
      leftColTe: 'జాతీయ ఉద్యానవనం',
      rightCol: 'State · Iconic Fauna Protected · Key River / Geography',
      rightColTe: 'రాష్ట్రం · రక్షించబడుతున్న జంతువు · నది / విశేషం',
      rows: [
        ['Jim Corbett NP', 'Uttarakhand · Royal Bengal Tiger, Asian Elephant · Ramganga River · 1st Park of India'],
        ['Kaziranga NP', 'Assam · Great One-horned Rhinoceros · Brahmaputra floodplain · UNESCO Site'],
        ['Keibul Lamjao NP', 'Manipur · Sangai (Brow-antlered dancing deer) · Loktak Lake (Phumdis) · Only floating park'],
        ['Gir National Park', 'Gujarat · Asiatic Lion (sole wild habitat in world) · Hiran, Shetrunji rivers'],
        ['Sundarbans NP', 'West Bengal · Royal Bengal Tiger, Saltwater Crocodile · Ganga-Brahmaputra Delta mangrove'],
        ['Hemis National Park', 'Ladakh · Snow Leopard · Largest National Park in India (~4,400 sq km)']
      ]
    },
    mnemonic: 'Firsts: Corbett = 1st Park (1936), Nilgiri = 1st Biosphere (1986), Hemis = Largest Park, Keibul = Floating.',
    quiz: [
      {
        question: 'Which is the world’s only floating national park, located on Loktak Lake?',
        options: ['Jim Corbett', 'Keibul Lamjao', 'Kaziranga', 'Namdapha'],
        answer: 1,
        explain: 'Keibul Lamjao in Manipur on Loktak Lake is the only floating park in the world, home to the endangered Sangai deer.'
      }
    ]
  },

  // -------------------------------------------------------------
  // SUBJECT 3: POLITY & CONSTITUTION (5 Modules)
  // -------------------------------------------------------------
  {
    id: 'polity-preamble-sources',
    subject: 'Indian Polity & Constitution',
    subjectId: 'polity',
    title: 'Making of the Constitution, Preamble & Sources',
    titleTe: 'రాజ్యాంగ నిర్మాణం, ప్రవేశిక & గ్రహించిన అంశాలు',
    era: 'Constitutional Assembly 1946–1949',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did the Constituent Assembly draft the world\\'s lengthiest written constitution in 2 years, 11 months, 18 days?',
    heroHookTe: 'ప్రపంచంలోనే అతి పెద్ద లిఖిత రాజ్యాంగాన్ని 2 సంవత్సరాల, 11 నెలల, 18 రోజుల్లో రాజ్యాంగ పరిషత్ ఎలా రూపొందించింది?',
    infographicType: 'preamble-structure',
    infographicCaption: 'Preamble Philosophy: Sovereign, Socialist, Secular, Democratic, Republic & Borrowed Pillars.',
    storyCards: [
      {
        title: 'Constituent Assembly & Drafting Committee',
        titleTe: 'రాజ్యాంగ పరిషత్ & ముసాయిదా కమిటీ',
        body: 'First met on Dec 9, 1946 (Dr. Sachchidananda Sinha interim President; Dr. Rajendra Prasad elected permanent President on Dec 11). Dr. B.R. Ambedkar chaired the 7-member Drafting Committee set up on Aug 29, 1947.',
        bodyTe: 'డిసెంబర్ 9, 1946న మొదటి సమావేశం. డా. బి.ఆర్. అంబేద్కర్ ముసాయిదా కమిటీ చైర్మన్‌గా రాజ్యాంగాన్ని రచించారు.',
        tag: 'Nov 26, 1949 Adopted'
      },
      {
        title: 'The Preamble: Identity Card of the Constitution',
        titleTe: 'పీఠిక: రాజ్యాంగ గుర్తింపు కార్డు',
        body: 'Based on Jawaharlal Nehru\\'s historic "Objectives Resolution" introduced on Dec 13, 1946. Proclaims India a "SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC". Secures Justice, Liberty, Equality, and Fraternity.',
        bodyTe: 'జవహర్‌లాల్ నెహ్రూ లక్ష్యాల తీర్మానంపై ఆధారపడింది. సార్వభౌమ, సామ్యవాద, లౌకిక, ప్రజాస్వామ్య, గణతంత్ర రాజ్యంగా ప్రకటిస్తుంది.',
        tag: '42nd Amendment 1976'
      },
      {
        title: 'The 42nd Amendment Words (1976)',
        titleTe: '42వ రాజ్యాంగ సవరణ పదాలు',
        body: 'The Preamble was amended only once by the 42nd Constitutional Amendment Act of 1976 under Indira Gandhi, adding three historic words: "SOCIALIST", "SECULAR", and "INTEGRITY".',
        bodyTe: '1976లో 42వ సవరణ ద్వారా పీఠికలో సామ్యవాద (Socialist), లౌకిక (Secular), సమగ్రత (Integrity) అనే 3 పదాలు చేర్చబడ్డాయి.',
        tag: 'Mini Constitution'
      },
      {
        title: 'Major Borrowed Sources',
        titleTe: 'వివిధ దేశాల నుంచి గ్రహించిన అంశాలు',
        body: 'UK: Parliamentary system, Rule of Law, Single citizenship, Writs. USA: Fundamental Rights, Judicial Review, Preamble, Impeachment. Ireland: DPSP, Presidential election. USSR: Fundamental Duties. Australia: Concurrent List.',
        bodyTe: 'బ్రిటన్: పార్లమెంటరీ వ్యవస్థ, ఏక పౌరసత్వం. అమెరికా: ప్రాథమిక హక్కులు, న్యాయ సమీక్ష. ఐర్లాండ్: ఆదేశిక సూత్రాలు. రష్యా: ప్రాథమిక విధులు.',
        tag: 'Global Heritage'
      }
    ],
    compareTable: {
      leftCol: 'Constitutional Feature',
      leftColTe: 'రాజ్యాంగ లక్షణం',
      rightCol: 'Source Country / Document · SSC PYQ Anchor',
      rightColTe: 'గ్రహించిన దేశం / మూలం',
      rows: [
        ['Parliamentary Govt & Rule of Law', 'British (UK) Constitution · Single Citizenship & Bicameralism'],
        ['Fundamental Rights & Judicial Review', 'US Constitution (Bill of Rights) · Independent Judiciary'],
        ['Directive Principles (DPSP)', 'Irish Constitution (Ireland) · Also method of Presidential election'],
        ['Concurrent List & Joint Sitting', 'Australian Constitution · Freedom of trade and commerce'],
        ['Emergency Provisions & Suspension of FR', 'Weimar Constitution of Germany (Govt of India Act 1935 base)'],
        ['Procedure Established by Law', 'Japanese Constitution · (Due Process = US concept)']
      ]
    },
    mnemonic: 'Preamble Order: S-S-S-D-R = Sovereign, Socialist, Secular, Democratic, Republic. (Triple S, Double R).',
    quiz: [
      {
        question: 'Which three words were added to the Preamble of the Indian Constitution by the 42nd Amendment Act of 1976?',
        options: ['Liberty, Equality, Fraternity', 'Socialist, Secular, Integrity', 'Sovereign, Democratic, Republic', 'Justice, Unity, Dignity'],
        answer: 1,
        explain: 'The 42nd Amendment (1976) added the words "Socialist", "Secular", and "Integrity" to the Preamble.'
      }
    ]
  },
  {
    id: 'polity-fundamental-rights',
    subject: 'Indian Polity & Constitution',
    subjectId: 'polity',
    title: 'Fundamental Rights (Articles 12-35) & The 5 Writs',
    titleTe: 'ప్రాథమిక హక్కులు (ఆర్టికల్స్ 12-35) & 5 రిట్లు',
    era: 'Part III · Magna Carta of India',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why did Dr. B.R. Ambedkar call Article 32 (Right to Constitutional Remedies) the "Heart and Soul" of the Constitution?',
    heroHookTe: 'ఆర్టికల్ 32ను రాజ్యాంగపు "హృదయం మరియు ఆత్మ" అని డాక్టర్ బి.ఆర్. అంబేద్కర్ ఎందుకు అభివర్ణించారు?',
    infographicType: 'writs-architecture',
    infographicCaption: 'Habeas Corpus · Mandamus · Prohibition · Certiorari · Quo-Warranto (SC Art 32 / HC Art 226).',
    storyCards: [
      {
        title: 'Six Categories of Fundamental Rights',
        titleTe: 'ఆరు ప్రాథమిక హక్కులు',
        body: 'Part III originally guaranteed 7 rights. The 44th Amendment (1978) deleted the Right to Property (Art 31), turning it into a legal right under Art 300A. Now 6 categories: Equality, Freedom, Against Exploitation, Religion, Culture & Education, Remedies.',
        bodyTe: '44వ సవరణ ద్వారా ఆస్తి హక్కును ప్రాథమిక హక్కుల జాబితా నుంచి తొలగించి ఆర్టికల్ 300A లో చట్టబద్ధ హక్కుగా మార్చారు.',
        tag: 'Part III · Articles 12-35'
      },
      {
        title: 'Article 21: Protection of Life and Liberty',
        titleTe: 'ఆర్టికల్ 21: జీవించే హక్కు',
        body: 'No person shall be deprived of his life or personal liberty except according to procedure established by law. Menaka Gandhi Case (1978) expanded it to mean a dignified life. Article 21A (86th Amendment, 2002) made free education (6-14 yrs) a Fundamental Right.',
        bodyTe: 'చట్టం నిర్దేశించిన పద్ధతిలో తప్ప వ్యక్తి ప్రాణాన్ని లేదా వ్యక్తిగత స్వేచ్ఛను హరించకూడదు. ఆర్టికల్ 21A ద్వారా 6-14 ఏళ్ల పిల్లలకు ఉచిత నిర్బంధ విద్య ప్రాథమిక హక్కు.',
        tag: 'Right to Life'
      },
      {
        title: 'Article 32: Constitutional Remedies',
        titleTe: 'ఆర్టికల్ 32: రాజ్యాంగ పరిహారపు హక్కు',
        body: 'Empowers citizens to move the Supreme Court directly for enforcement of Fundamental Rights. Dr. Ambedkar described it as "the very soul of the Constitution and the very heart of it". High Courts exercise similar writ power under Article 226.',
        bodyTe: 'ప్రాథమిక హక్కుల రక్షణకు సుప్రీంకోర్టును నేరుగా ఆశ్రయించే హక్కు. హైకోర్టులకు ఆర్టికల్ 226 ద్వారా రిట్ అధికారాలు ఉన్నాయి.',
        tag: 'Heart and Soul'
      },
      {
        title: 'The Five Prerogative Writs',
        titleTe: 'ఐదు రాజ్యాంగ రిట్లు',
        body: '1. Habeas Corpus (Produce the body against illegal detention). 2. Mandamus (Command a public authority to perform duty). 3. Prohibition (Order lower court to cease overreach). 4. Certiorari (Quash illegal order of lower court). 5. Quo-Warranto (Question legal authority of office holder).',
        bodyTe: 'హెబియస్ కార్పస్, మాండమస్, ప్రొహిబిషన్, సెర్టియోరరి, కో-వారంటో. అక్రమ నిర్బంధాలు మరియు ప్రభుత్వ కర్తవ్యాల అమలుకు ఇవి రక్షణ కల్పిస్తాయి.',
        tag: 'Writ Jurisdiction'
      }
    ],
    compareTable: {
      leftCol: 'Writ Name',
      leftColTe: 'రిట్ పేరు',
      rightCol: 'Literal Latin Meaning · When Issued · SSC Trigger Key',
      rightColTe: 'లాటిన్ అర్థం · ఎప్పుడు జారీ చేస్తారు',
      rows: [
        ['Habeas Corpus', '"To have the body" · Against unlawful detention by police or private individual'],
        ['Mandamus', '"We command" · Directs a public official / body to perform statutory duty'],
        ['Prohibition', '"To forbid" · Issued by higher court to lower court preventing jurisdictional excess'],
        ['Certiorari', '"To be certified" · Quashes an ultra vires order passed by a subordinate court or tribunal'],
        ['Quo-Warranto', '"By what authority?" · Inquires into the legality of a person holding a public office']
      ]
    },
    mnemonic: 'Writs: H-M-P-C-Q = "Help Me Please Court Quick" = Habeas, Mandamus, Prohibition, Certiorari, Quo-Warranto.',
    quiz: [
      {
        question: 'Which constitutional writ translates literally to "We Command", issued to direct a public authority to perform its legal duty?',
        options: ['Habeas Corpus', 'Mandamus', 'Certiorari', 'Quo-Warranto'],
        answer: 1,
        explain: 'Mandamus is a command issued to any public authority or court requiring the performance of a public duty.'
      }
    ]
  },
  {
    id: 'polity-constitutional-bodies',
    subject: 'Indian Polity & Constitution',
    subjectId: 'polity',
    title: 'Constitutional Bodies & Key High Offices',
    titleTe: 'రాజ్యాంగబద్ధ సంస్థలు & కీలక పదవులు',
    era: 'Part V, XIV, XV · Democratic Watchdogs',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Who is the guardian of the public purse and "the most important officer in the Constitution"?',
    heroHookTe: 'ప్రజా ధనానికి సంరక్షకుడు మరియు రాజ్యాంగంలో అత్యంత ముఖ్యమైన అధికారి ఎవరు?',
    infographicType: 'constitutional-bodies',
    infographicCaption: 'CAG (Art 148) · Election Commission (Art 324) · Finance Commission (Art 280) · UPSC (Art 315).',
    storyCards: [
      {
        title: 'Comptroller and Auditor General (CAG) - Art 148',
        titleTe: 'కాగ్ (CAG) - ఆర్టికల్ 148',
        body: 'Appointed by President. Guardian of the public purse. Audits all expenditure from Consolidated Fund of India and States. Submits 3 audit reports to President who places them before Parliament, examined by the Public Accounts Committee (PAC).',
        bodyTe: 'ఆర్టికల్ 148 ప్రకారం రాష్ట్రపతి నియమిస్తారు. ప్రభుత్వ ఆదాయ, వ్యయాలను ఆడిట్ చేస్తారు. పబ్లిక్ అకౌంట్స్ కమిటీకి మిత్రుడు, మార్గదర్శి.',
        tag: 'Article 148'
      },
      {
        title: 'Election Commission of India - Art 324',
        titleTe: 'ఎన్నికల సంఘం - ఆర్టికల్ 324',
        body: 'Conducts elections to Parliament, State Legislatures, and the offices of President and Vice-President. Consists of Chief Election Commissioner (CEC) and two Election Commissioners. Enjoy equal tenure security as Supreme Court judges.',
        bodyTe: 'పార్లమెంట్, రాష్ట్ర శాసనసభలు, రాష్ట్రపతి, ఉపరాష్ట్రపతి ఎన్నికలను నిర్వహిస్తుంది.',
        tag: 'Article 324'
      },
      {
        title: 'Finance Commission - Art 280',
        titleTe: 'ఆర్థిక సంఘం - ఆర్టికల్ 280',
        body: 'Constituted by President every 5 years. Recommends principles governing the devolution of net tax proceeds between the Union and States (vertical devolution) and among the States (horizontal devolution).',
        bodyTe: 'కేంద్ర, రాష్ట్రాల మధ్య పన్నుల విభజన సిఫార్సులు చేయడానికి ప్రతి ఐదేళ్లకు ఒకసారి రాష్ట్రపతి ఆర్థిక సంఘాన్ని ఏర్పాటు చేస్తారు.',
        tag: 'Article 280'
      },
      {
        title: 'Attorney General of India - Art 76',
        titleTe: 'అటార్నీ జనరల్ - ఆర్టికల్ 76',
        body: 'The highest law officer of the country. Appointed by President (must be qualified to be a Supreme Court judge). Has the right of audience in all courts in India and right to take part in parliamentary proceedings without right to vote.',
        bodyTe: 'దేశంలో అత్యున్నత న్యాయాధికారి. పార్లమెంటు సమావేశాల్లో మాట్లాడే హక్కు ఉంటుంది కానీ ఓటు వేసే హక్కు ఉండదు.',
        tag: 'Article 76'
      }
    ],
    compareTable: {
      leftCol: 'Constitutional Body / Office',
      leftColTe: 'రాజ్యాంగ సంస్థ',
      rightCol: 'Article · Appointing Authority · Tenure · Key Function',
      rightColTe: 'ఆర్టికల్ · పదవీకాలం · ప్రధాన కర్తవ్యం',
      rows: [
        ['CAG of India', 'Article 148 · President · 6 yrs or 65 yrs of age · Audits Union & State accounts'],
        ['Election Commission', 'Article 324 · President · 6 yrs or 65 yrs of age · Conducts national & state polls'],
        ['Finance Commission', 'Article 280 · President · Every 5th year · Tax sharing recommendations between Centre & States'],
        ['Attorney General of India', 'Article 76 · President · Pleasure of the President · Highest legal advisor to Union'],
        ['UPSC', 'Article 315 · President · 6 yrs or 65 yrs of age · Central civil service recruitments'],
        ['Advocate General', 'Article 165 · Governor · Pleasure of Governor · Highest legal advisor to State govt']
      ]
    },
    mnemonic: 'Watchdog Articles: 76 (AG) → 148 (CAG) → 280 (Finance Comm) → 315 (UPSC) → 324 (Election Comm).',
    quiz: [
      {
        question: 'Under which Article of the Constitution does the President constitute the Finance Commission every fifth year?',
        options: ['Article 280', 'Article 148', 'Article 324', 'Article 315'],
        answer: 0,
        explain: 'Article 280 of the Constitution provides for a Finance Commission constituted by the President every fifth year.'
      }
    ]
  },

  // -------------------------------------------------------------
  // SUBJECT 4: ECONOMICS (4 Modules)
  // -------------------------------------------------------------
  {
    id: 'economics-rbi-monetary',
    subject: 'Economics',
    subjectId: 'economics',
    title: 'Reserve Bank of India & Monetary Policy Tools',
    titleTe: 'రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా & ద్రవ్య విధాన సాధనాలు',
    era: 'Central Banking & Macroeconomics',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How does changing the Repo Rate by 0.25% influence inflation and borrowing costs across 1.4 billion people?',
    heroHookTe: 'రెపో రేటును కేవలం 0.25% పెంచడం వల్ల ద్రవ్యోల్బణం ఎలా అదుపులోకి వస్తుంది?',
    infographicType: 'rbi-transmission',
    infographicCaption: 'Repo Rate Hike → Higher Commercial Loan Costs → Decreased Money Supply → Inflation Drops.',
    storyCards: [
      {
        title: 'Establishment of the RBI (1935)',
        titleTe: 'ఆర్బీఐ స్థాపన (1935)',
        body: 'Established on April 1, 1935 on the recommendations of the Hilton Young Commission under the RBI Act 1934. Nationalised on January 1, 1949. First Governor: Sir Osborne Smith; First Indian Governor: C.D. Deshmukh.',
        bodyTe: 'హిల్టన్ యంగ్ కమిషన్ సిఫార్సులతో ఏప్రిల్ 1, 1935న ఏర్పాటైంది. జనవరి 1, 1949న జాతీయం చేయబడింది. మొదటి భారతీయ గవర్నర్ సి.డి. దేశ్‌ముఖ్.',
        tag: 'Hilton Young Commission'
      },
      {
        title: 'Quantitative Tools: Repo vs Reverse Repo',
        titleTe: 'రెపో vs రివర్స్ రెపో రేటు',
        body: 'Repo Rate is the rate at which RBI lends short-term money to commercial banks against government securities. Reverse Repo is the rate at which commercial banks park surplus funds with RBI.',
        bodyTe: 'రెపో రేటు: వాణిజ్య బ్యాంకులకు ఆర్బీఐ ఇచ్చే స్వల్పకాలిక రుణాలపై వడ్డీ రేటు. రివర్స్ రెపో: బ్యాంకులు ఆర్బీఐ వద్ద ఉంచే నిధులపై పొందే వడ్డీ రేటు.',
        tag: 'Policy Rates'
      },
      {
        title: 'Reserve Ratios: CRR and SLR',
        titleTe: 'సిఆర్ఆర్ (CRR) & ఎస్ఎల్ఆర్ (SLR)',
        body: 'Cash Reserve Ratio (CRR): Percentage of net demand and time liabilities (NDTL) banks must park in cash with RBI (earns no interest). Statutory Liquidity Ratio (SLR): Percentage banks must maintain in liquid assets (gold, G-secs, cash).',
        bodyTe: 'CRR: బ్యాంకులు ఆర్బీఐ వద్ద నగదు రూపంలో ఉంచాల్సిన నిధుల నిష్పత్తి. SLR: బ్యాంకులు బంగారం, ప్రభుత్వ బాండ్ల రూపంలో నిర్వహించాల్సిన ద్రవ్య నిష్పత్తి.',
        tag: 'Liquidity Ratios'
      },
      {
        title: 'Monetary Policy Committee (MPC)',
        titleTe: 'ద్రవ్య విధాన కమిటీ (MPC)',
        body: 'A 6-member statutory committee (3 from RBI, 3 appointed by Government). Mandated to keep CPI retail inflation at 4% with a tolerance band of +/- 2% (i.e. between 2% and 6%). RBI Governor chairs MPC with casting vote.',
        bodyTe: 'ద్రవ్యోల్బణాన్ని 4% (+/- 2%) లోపు నియంత్రించే లక్ష్యంతో 6 మంది సభ్యులతో ఏర్పాటైన కమిటీ.',
        tag: 'Target 4% +/- 2%'
      }
    ],
    compareTable: {
      leftCol: 'Monetary Tool',
      leftColTe: 'ద్రవ్య సాధనం',
      rightCol: 'Definition · Effect of Rate Hike on Economy',
      rightColTe: 'నిర్వచనం · రేటు పెంచితే మార్కెట్‌పై ప్రభావం',
      rows: [
        ['Repo Rate', 'Rate at which RBI lends short-term to banks · Increases loan EMI, cools market liquidity & inflation'],
        ['Reverse Repo Rate', 'Rate at which RBI absorbs surplus liquidity from banks · Encourages banks to park funds safely with RBI'],
        ['Cash Reserve Ratio (CRR)', 'Fraction of bank deposits held in cash with RBI · Reduces bank lending capacity directly'],
        ['Statutory Liquidity Ratio (SLR)', 'Fraction held by banks in Gold / Govt Securities · Ensures bank solvency and funds govt borrowing'],
        ['Bank Rate', 'Long-term lending rate of RBI without collateral · Aligned with penal rates on bank defaults'],
        ['Open Market Operations (OMO)', 'Outright purchase or sale of Govt Securities in open market · Sale absorbs cash, purchase injects cash']
      ]
    },
    mnemonic: 'Inflation Control: To fight High Inflation, RBI HIKEs rates (Repo, CRR, SLR) to suck out cash.',
    quiz: [
      {
        question: 'What is the rate at which the Reserve Bank of India lends short-term money to commercial banks against government securities?',
        options: ['Reverse Repo Rate', 'Repo Rate', 'Bank Rate', 'Marginal Standing Facility'],
        answer: 1,
        explain: 'Repo Rate (Repurchase Option) is the rate at which commercial banks borrow short-term funds from RBI.'
      }
    ]
  },
  {
    id: 'economics-national-income',
    subject: 'Economics',
    subjectId: 'economics',
    title: 'National Income, GDP & Economic Sectors',
    titleTe: 'జాతీయాదాయం, జీడీపీ & ఆర్థిక రంగాలు',
    era: 'Macroeconomic Aggregates & Output',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'What is the precise mathematical difference between GDP, GNP, and Per Capita National Income?',
    heroHookTe: 'జీడీపీ (GDP) మరియు జీఎన్‌పీ (GNP) మధ్య గణిత వ్యత్యాసం ఏమిటి?',
    infographicType: 'gdp-flow',
    infographicCaption: 'Primary (Agriculture) → Secondary (Manufacturing) → Tertiary (Services) & GDP Formula.',
    storyCards: [
      {
        title: 'Gross Domestic Product (GDP)',
        titleTe: 'స్థూల దేశీయోత్పత్తి (GDP)',
        body: 'The total monetary value of all final goods and services produced within the geographic boundaries of a country during a financial year. Formula: GDP = C + I + G + (X - M).',
        bodyTe: 'ఒక నిర్దిష్ట ఆర్థిక సంవత్సరంలో దేశ భౌగోళిక సరిహద్దులలో ఉత్పత్తి అయిన అంతిమ వస్తువులు, సేవల మొత్తం ద్రవ్య విలువ.',
        tag: 'Geographic Boundary'
      },
      {
        title: 'GNP and Net Factor Income from Abroad (NFIA)',
        titleTe: 'స్థూల జాతీయోత్పత్తి (GNP)',
        body: 'GNP = GDP + NFIA (Net Factor Income from Abroad). GNP measures output by citizens regardless of geographic location. NNP (Net National Product at Factor Cost) is the official National Income of India.',
        bodyTe: 'GNP = GDP + విదేశాల నుండి వచ్చిన నికర ఆదాయం (NFIA). NNP ని అధికారిక జాతీయాదాయంగా పరిగణిస్తారు.',
        tag: 'Citizen Metric'
      },
      {
        title: 'Real vs Nominal GDP',
        titleTe: 'రియల్ vs నామినల్ జీడీపీ',
        body: 'Nominal GDP evaluates output at current market prices without adjusting for inflation. Real GDP evaluates output at constant base year prices (currently base year 2011-12 in India) to reflect actual physical growth.',
        bodyTe: 'నామినల్ జీడీపీ ప్రస్తుత మార్కెట్ ధరలపై లెక్కిస్తారు; రియల్ జీడీపీ స్థిర ధరల వద్ద ద్రవ్యోల్బణాన్ని తొలగించి లెక్కిస్తారు.',
        tag: 'Base Year 2011-12'
      },
      {
        title: 'Three Sectors of the Economy',
        titleTe: 'ఆర్థిక వ్యవస్థలోని మూడు రంగాలు',
        body: 'Primary (Agriculture, mining, fishing - provides employment to ~45%). Secondary (Manufacturing, electricity, construction). Tertiary (Services - banking, IT, transport, contributing ~54% of GDP).',
        bodyTe: 'ప్రాథమిక రంగం (వ్యవసాయం, గనులు), ద్వితీయ రంగం (పరిశ్రమలు, నిర్మాణం), తృతీయ రంగం (సేవలు - జీడీపీలో 54% వాటా).',
        tag: 'Structural Transformation'
      }
    ],
    compareTable: {
      leftCol: 'Aggregate',
      leftColTe: 'ఆర్థిక కొలమానం',
      rightCol: 'Formula · Description · SSC Question Trigger',
      rightColTe: 'సూత్రం · వివరణ',
      rows: [
        ['GDP (Domestic)', 'C + I + G + (X - M) · Value produced inside India regardless of nationality'],
        ['GNP (National)', 'GDP + NFIA · Value produced by Indian citizens globally'],
        ['NDP (Net Domestic)', 'GDP - Depreciation · Accounts for capital wear and tear'],
        ['NNP (Net National)', 'GNP - Depreciation · True Net National Income'],
        ['Per Capita Income', 'Total National Income ÷ Total Population · Measures average standard of living']
      ]
    },
    mnemonic: 'Gross to Net: Subtract Depreciation. Domestic to National: Add NFIA (Income from abroad).',
    quiz: [
      {
        question: 'Which of the following aggregates is officially considered as the National Income of India?',
        options: ['GDP at Market Price', 'GNP at Market Price', 'NNP at Factor Cost', 'NDP at Factor Cost'],
        answer: 2,
        explain: 'Net National Product at Factor Cost (NNP at FC) is officially defined as the National Income of India.'
      }
    ]
  },

  // -------------------------------------------------------------
  // SUBJECT 5: GENERAL SCIENCE (4 Modules)
  // -------------------------------------------------------------
  {
    id: 'science-cell-biology',
    subject: 'General Science',
    subjectId: 'science',
    title: 'Cell Biology: Organelles, Genetics & Division',
    titleTe: 'కణ జీవశాస్త్రం: కణాంగాలు, జన్యుశాస్త్రం & విభజన',
    era: 'Cytology & Molecular Biology',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why is Mitochondria called the Powerhouse of the Cell and Lysosome called the Suicidal Bag?',
    heroHookTe: 'మైటోకాండ్రియాను కణ శక్త్యాగారమని, లైసోజోమ్‌ను ఆత్మహత్య కోశాలని ఎందుకు అంటారు?',
    infographicType: 'cell-schematic',
    infographicCaption: 'Plant Cell vs Animal Cell: Chloroplast, Cell Wall, Mitochondria, Lysosome, Nucleus.',
    storyCards: [
      {
        title: 'Cell: Basic Unit of Life',
        titleTe: 'కణం: జీవుల ప్రాథమిక ప్రమాణం',
        body: 'Robert Hooke discovered cells in cork (1665). Antonie van Leeuwenhoek first observed living cells (bacteria/protozoa). Schleiden and Schwann proposed Cell Theory; Virchow added "Omnis cellula e cellula" (cells arise from pre-existing cells).',
        bodyTe: 'రాబర్ట్ హుక్ 1665లో కణాన్ని కనుగొన్నాడు. ష్లీడన్, ష్వాన్ కణ సిద్ధాంతాన్ని ప్రతిపాదించారు.',
        tag: 'Cell Theory'
      },
      {
        title: 'Powerhouse & Suicide Bags',
        titleTe: 'శక్త్యాగారాలు & ఆత్మహత్య కోశాలు',
        body: 'Mitochondria synthesizes ATP (adenosine triphosphate) via cellular respiration; possesses its own DNA and 70S ribosomes. Lysosomes contain powerful hydrolytic enzymes that digest cellular waste or burst to destroy damaged cells.',
        bodyTe: 'మైటోకాండ్రియా ATP రూపంలో శక్తిని ఉత్పత్తి చేస్తుంది. లైసోజోములు హైడ్రోలైటిక్ ఎంజైమ్‌లతో కణ వ్యర్థాలను జీర్ణం చేస్తాయి.',
        tag: 'Mitochondria & Lysosome'
      },
      {
        title: 'Plant vs Animal Cells',
        titleTe: 'వృక్ష కణం vs జంతు కణం',
        body: 'Plant cells have a rigid cellulose Cell Wall, Chloroplasts for photosynthesis, and a large central vacuole. Animal cells lack cell walls and plastids, but possess centrosomes/centrioles for cell division.',
        bodyTe: 'వృక్ష కణాల్లో సెల్యులోజ్ కణకవచం మరియు హరితరేణువులు ఉంటాయి; జంతు కణాల్లో కణకవచం ఉండదు, సెంట్రోజోమ్ ఉంటుంది.',
        tag: 'Cell Wall & Plastids'
      },
      {
        title: 'DNA and Chromosomes',
        titleTe: 'డీఎన్‌ఏ & క్రోమోజోములు',
        body: 'Humans have 23 pairs (46 chromosomes). Watson and Crick discovered the double-helix DNA structure (1953). Nitrogenous bases: Adenine pairs with Thymine (A=T), Guanine pairs with Cytosine (G≡C). In RNA, Uracil replaces Thymine.',
        bodyTe: 'మానవునిలో 23 జతల (46) క్రోమోజోములు ఉంటాయి. వాట్సన్, క్రిక్ DNA డబుల్ హెలిక్స్ నమూనాను రూపొందించారు.',
        tag: 'Double Helix'
      }
    ],
    compareTable: {
      leftCol: 'Organelle',
      leftColTe: 'కణాంగం',
      rightCol: 'Famous Scientific Epithet · Primary Biological Function',
      rightColTe: 'శాస్త్రీయ పేరు · ప్రధాన విధి',
      rows: [
        ['Mitochondria', '"Powerhouse of the Cell" · Cellular respiration & ATP generation (has semi-autonomous DNA)'],
        ['Lysosome', '"Suicidal Bags of the Cell" · Autolysis & hydrolytic intracellular digestion'],
        ['Ribosome', '"Protein Factory of the Cell" · Protein synthesis (no surrounding membrane)'],
        ['Golgi Apparatus', '"Post Office / Traffic Police of Cell" · Packaging, modification, and secretion of lipids/proteins'],
        ['Nucleus', '"Control Center / Brain of Cell" · Houses chromosomes, genetic blueprint & coordinates replication'],
        ['Chloroplast', '"Kitchen of the Plant Cell" · Photosynthesis through chlorophyll absorbing solar photons']
      ]
    },
    mnemonic: 'Cell Epithets: M-P = Mitochondria Powerhouse. L-S = Lysosome Suicide. R-P = Ribosome Protein. G-P = Golgi Packaging.',
    quiz: [
      {
        question: 'Which cell organelle is famously known as the "Suicidal Bag" of the cell due to its hydrolytic enzymes?',
        options: ['Ribosome', 'Lysosome', 'Centrosome', 'Golgi Apparatus'],
        answer: 1,
        explain: 'Lysosomes contain digestive enzymes; if the cell gets damaged, lysosomes burst and digest their own cell, earning the moniker "suicide bags".'
      }
    ]
  },
  {
    id: 'science-physics-laws',
    subject: 'General Science',
    subjectId: 'science',
    title: 'Physics: Laws of Motion, Gravity & Optics',
    titleTe: 'భౌతిక శాస్త్రం: చలన నియమాలు, గురుత్వాకర్షణ & కాంతి',
    era: 'Classical Mechanics & Wave Optics',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why does a passenger jerk backwards when a stationary bus suddenly accelerates forward?',
    heroHookTe: 'ఆగి ఉన్న బస్సు హఠాత్తుగా ముందుకు కదిలినప్పుడు ప్రయాణికుడు వెనక్కి ఎందుకు తూలుతాడు?',
    infographicType: 'physics-laws',
    infographicCaption: 'Newton\\'s 3 Laws of Motion: Inertia → F = m·a → Action-Reaction (Rocket Propulsion).',
    storyCards: [
      {
        title: 'Newton\\'s First Law: Law of Inertia',
        titleTe: 'న్యూటన్ మొదటి నియమం: జడత్వ నియమం',
        body: 'An object remains at rest or in uniform straight motion unless acted upon by an external unbalanced force. Explains why dust falls off when a blanket is beaten, and why passengers lurch when brakes are applied.',
        bodyTe: 'బాహ్య బలం పనిచేయనంత వరకు నిశ్చల స్థితిలో ఉన్న వస్తువు నిశ్చల స్థితిలో, చలనంలో ఉన్న వస్తువు సమచలనంలో ఉంటుంది.',
        tag: 'Inertia of Rest/Motion'
      },
      {
        title: 'Newton\\'s Second Law: F = m · a',
        titleTe: 'రెండవ నియమం: ద్రవ్యవేగ మార్పు రేటు',
        body: 'Rate of change of momentum is directly proportional to applied force (Force = Mass × Acceleration). Explains why a cricket fielder pulls his hands backward while catching a fast ball to increase impact time and lessen force.',
        bodyTe: 'ద్రవ్యవేగ మార్పు రేటు ప్రయోగించిన బలానికి ప్రత్యక్ష అనుపాతంలో ఉంటుంది (F = ma). క్రికెట్ ఫీల్డర్ క్యాచ్ పట్టినప్పుడు చేతులను వెనక్కి లాగడం.',
        tag: 'Definition of Force'
      },
      {
        title: 'Newton\\'s Third Law: Action and Reaction',
        titleTe: 'మూడవ నియమం: చర్య - ప్రతిచర్య',
        body: 'To every action, there is an equal and opposite reaction. Explains recoil of a firing gun, walking on the ground, swimming, and rocket propulsion through escaping exhaust gases.',
        bodyTe: 'ప్రతి చర్యకు సమానమైన మరియు వ్యతిరేకమైన ప్రతిచర్య ఉంటుంది. తుపాకీ కాల్చినప్పుడు వెనక్కి తన్నడం, రాకెట్ ప్రయోగం.',
        tag: 'Action = -Reaction'
      },
      {
        title: 'Optics: Reflection, Refraction & Mirage',
        titleTe: 'కాంతి: పరావర్తనం, వక్రీభవనం & సంపూర్ణ అంతర్గత పరావర్తనం',
        body: 'Total Internal Reflection (TIR) occurs when light travels from denser to rarer medium at angle greater than critical angle. Applications: Optical fibers, sparkling of diamonds, desert mirages, endoscopy.',
        bodyTe: 'సంపూర్ణ అంతర్గత పరావర్తనం (TIR) వల్ల ఆప్టికల్ ఫైబర్లు పనిచేస్తాయి, వజ్రాలు ప్రకాశిస్తాయి, ఎండమావులు ఏర్పడతాయి.',
        tag: 'TIR Applications'
      }
    ],
    compareTable: {
      leftCol: 'Optical Phenomenon',
      leftColTe: 'కాంతి దృగ్విషయం',
      rightCol: 'Physical Cause · Everyday SSC Real-World Examples',
      rightColTe: 'కారణం · నిత్యజీవిత ఉదాహరణలు',
      rows: [
        ['Total Internal Reflection (TIR)', 'Dense to rare medium exceeding critical angle · Optical fiber broadband, diamond sparkle, mirage in desert'],
        ['Scattering of Light (Rayleigh)', 'Scattering inversely proportional to λ⁴ · Blue color of clear sky, reddish sky at sunrise/sunset'],
        ['Atmospheric Refraction', 'Bending through gradient air densities · Twinkling of stars, advance sunrise (2 mins) & delayed sunset'],
        ['Dispersion of Light', 'Splitting of white light into VIBGYOR through prism · Formation of Rainbow by raindrops'],
        ['Concave Mirror', 'Converging mirror · Dentist mirror, car headlights, shaving mirror, solar furnaces'],
        ['Convex Mirror', 'Diverging mirror (always erect virtual diminished image) · Rear-view mirror in vehicles']
      ]
    },
    mnemonic: 'V-I-B-G-Y-O-R: Red has Maximum Wavelength (scatters least, used in Danger signals); Violet has Minimum Wavelength.',
    quiz: [
      {
        question: 'Which optical phenomenon is primarily responsible for the transmission of data in high-speed optical fiber communications?',
        options: ['Refraction of light', 'Total Internal Reflection', 'Scattering of light', 'Interference'],
        answer: 1,
        explain: 'Optical fibers transmit light pulses across long distances through repeated Total Internal Reflection (TIR) inside the glass core.'
      }
    ]
  },
  {
    id: 'science-vitamins-nutrition',
    subject: 'General Science',
    subjectId: 'science',
    title: 'Vitamins, Minerals & Deficiency Diseases',
    titleTe: 'విటమిన్లు, ఖనిజాలు & లోప వ్యాధులు',
    era: 'Biochemistry & Human Health',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Which vitamin is synthesized inside human skin under morning sunlight and behaves like a steroid hormone?',
    heroHookTe: 'సూర్యకాంతి సమక్షంలో చర్మంలో సంశ్లేషణ చెందే విటమిన్ ఏది?',
    infographicType: 'vitamins-table',
    infographicCaption: 'Fat-Soluble (A, D, E, K) vs Water-Soluble (B-Complex, C) Classification.',
    storyCards: [
      {
        title: 'Fat-Soluble vs Water-Soluble Vitamins',
        titleTe: 'కొవ్వులో & నీటిలో కరిగే విటమిన్లు',
        body: 'Fat-Soluble: Vitamins A, D, E, and K (stored in liver and adipose tissue). Water-Soluble: Vitamin B-Complex and Vitamin C (cannot be stored in body; excreted in urine and must be consumed daily).',
        bodyTe: 'కొవ్వులో కరిగేవి: A, D, E, K. నీటిలో కరిగేవి: B-కాంప్లెక్స్, C (శరీరంలో నిల్వ ఉండవు, మూత్రం ద్వారా విసర్జించబడతాయి).',
        tag: 'Solubility Grouping'
      },
      {
        title: 'Vitamin A (Retinol) & Night Blindness',
        titleTe: 'విటమిన్ A (రెటినాల్) & రేచీకటి',
        body: 'Essential for synthesis of rhodopsin pigment in retinal rod cells. Deficiency causes Night Blindness (Nyctalopia) and Xerophthalmia (dry cornea). Found rich in carrots, papaya, mango, liver.',
        bodyTe: 'లోపం వల్ల రేచీకటి (నిక్టలోపియా) మరియు జిరోఫ్తాల్మియా వస్తాయి. క్యారెట్, బొప్పాయిల్లో పుష్కలంగా లభిస్తుంది.',
        tag: 'Vision Pigment'
      },
      {
        title: 'Vitamin C (Ascorbic Acid) & Scurvy',
        titleTe: 'విటమిన్ C (ఆస్కార్బిక్ ఆమ్లం) & స్కర్వీ',
        body: 'Heat-sensitive antioxidant vitamin required for collagen synthesis and iron absorption. Easily destroyed by cooking. Deficiency leads to Scurvy (bleeding gums, delayed wound healing). Found in Amla (richest source), citrus fruits.',
        bodyTe: 'ఉష్ణానికి సున్నితమైన విటమిన్; లోపం వల్ల స్కర్వీ (చిగుళ్ల నుంచి రక్తం కారడం) వస్తుంది. ఉసిరి, నిమ్మ జాతి పండ్లలో లభిస్తుంది.',
        tag: 'Amla & Citrus'
      },
      {
        title: 'Vitamin D (Calciferol) & Sunshine Synthesis',
        titleTe: 'విటమిన్ D (కాల్సిఫెరాల్) & సన్‌షైన్ విటమిన్',
        body: 'Synthesized in skin exposed to UV-B radiation from 7-dehydrocholesterol. Crucial for calcium and phosphate absorption in intestines. Deficiency leads to Rickets in children (soft bent bones) and Osteomalacia in adults.',
        bodyTe: 'సూర్యరశ్మి ద్వారా చర్మంలో సంశ్లేషణ చెందుతుంది. లోపం వల్ల పిల్లల్లో రికెట్స్ (ఎముకలు వంగిపోవడం), పెద్దల్లో ఆస్టియోమలేసియా వస్తుంది.',
        tag: 'Sunshine Vitamin'
      }
    ],
    compareTable: {
      leftCol: 'Vitamin (Chemical Name)',
      leftColTe: 'విటమిన్ (రసాయన నామం)',
      rightCol: 'Solubility · Primary Food Source · Deficiency Disease',
      rightColTe: 'రకం · మూలం · లోప వ్యాధి',
      rows: [
        ['Vitamin A (Retinol)', 'Fat-soluble · Carrot, green leafy vegetables · Night blindness (Nyctalopia), Xerophthalmia'],
        ['Vitamin B1 (Thiamine)', 'Water-soluble · Unpolished rice, yeast, pulses · Beriberi (cardiac/nervous damage)'],
        ['Vitamin B3 (Niacin)', 'Water-soluble · Meat, fish, peanuts · Pellagra (4Ds: Dermatitis, Diarrhea, Dementia, Death)'],
        ['Vitamin B12 (Cobalamin)', 'Water-soluble (contains Cobalt) · Dairy, eggs, meat · Pernicious Anemia'],
        ['Vitamin C (Ascorbic Acid)', 'Water-soluble · Amla, guava, citrus fruits · Scurvy (bleeding swollen gums)'],
        ['Vitamin D (Calciferol)', 'Fat-soluble · Sunlight, fish liver oil · Rickets (children), Osteomalacia (adults)'],
        ['Vitamin K (Phylloquinone)', 'Fat-soluble · Green leafy vegetables · Impaired blood clotting (hemorrhage)']
      ]
    },
    mnemonic: 'Fat-Soluble: K-E-D-A ("KEDA" dissolves in fat). Cobalt metal is present in Vitamin B12.',
    quiz: [
      {
        question: 'Deficiency of which vitamin causes the bleeding gums and delayed wound healing disease known as Scurvy?',
        options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
        answer: 2,
        explain: 'Vitamin C (Ascorbic acid) deficiency impairs collagen synthesis, causing Scurvy (fragile capillaries, bleeding gums).'
      }
    ]
  },

  // -------------------------------------------------------------
  // SUBJECT 6: ART & CULTURE & STATIC GK (3 Modules)
  // -------------------------------------------------------------
  {
    id: 'culture-classical-folk-dances',
    subject: 'Art & Culture',
    subjectId: 'culture',
    title: 'Classical & Folk Dances of India',
    titleTe: 'భారతీయ శాస్త్రీయ & జానపద నృత్యాలు',
    era: 'Sangeet Natak Akademi & Folk Heritage',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Which are the 8 officially recognized Classical Dances of India rooted in the ancient Natya Shastra?',
    heroHookTe: 'సంగీత నాటక అకాడమీ గుర్తించిన 8 శాస్త్రీయ నృత్యాలు ఏవి?',
    infographicType: 'classical-dances-map',
    infographicCaption: 'Geographic Origins: Bharatanatyam (TN), Kathak (UP), Kathakali (KL), Kuchipudi (AP), Odissi (OD), Sattriya (AS).',
    storyCards: [
      {
        title: 'Bharatanatyam: Tamil Nadu Temple Dance',
        titleTe: 'భరతనాట్యం: తమిళనాడు దేవాలయ నృత్యం',
        body: 'Oldest classical dance form, formerly known as Sadir or Dasi Attam performed by Devadasis in Shaivite temples. Revived by Rukmini Devi Arundale and E. Krishna Iyer. Characterized by fire dance motifs and Alarippu opening.',
        bodyTe: 'తమిళనాడుకు చెందిన ప్రాచీన నృత్యం; సదిర్ నాట్యం అని పిలిచేవారు. రుక్మిణీదేవి అరండేల్ పునరుజ్జీవనం చేశారు.',
        tag: 'Tamil Nadu · Fire Motif'
      },
      {
        title: 'Kathakali & Mohiniyattam: Kerala Duality',
        titleTe: 'కథాకళి & మోహినియాట్టం: కేరళ వైభవం',
        body: 'Kathakali: Striking face makeup (Paccha for noble, Kathi for villainous), massive headgear, depicting good vs evil from epics. Mohiniyattam: Dance of the Enchantress, feminine graceful Lasya movements in white-and-gold Kasavu attire.',
        bodyTe: 'కథాకళి: రంగురంగుల ముఖ అలంకరణ, కిరీటాలతో కూడిన పురుష నృత్య రూపం. మోహినియాట్టం: తెలుపు-బంగారు వస్త్రధారణతో కూడిన లాస్య నృత్యం.',
        tag: 'Kerala Classics'
      },
      {
        title: 'Kuchipudi: Andhra Dance-Drama',
        titleTe: 'కూచిపూడి: ఆంధ్ర నాట్య సంప్రదాయం',
        body: 'Originated in Kuchelapuram village in Krishna district (Andhra Pradesh), formulated by Siddhendra Yogi. Famous for Tarangam: dancing on the edges of a brass plate holding a water pot (Kundi) balanced on the head.',
        bodyTe: 'కృష్ణా జిల్లా కూచిపూడి గ్రామంలో సిద్ధేంద్ర యోగి సంస్కరించారు. ఇత్తడి పళ్లెం అంచులపై నిలబడి నర్తించే తరంగం దీని ప్రత్యేకత.',
        tag: 'Andhra Pradesh'
      },
      {
        title: 'Sattriya: Vaishnavite Monastic Dance',
        titleTe: 'సత్రియా: అస్సాం వైష్ణవ నృత్యం',
        body: 'Introduced in the 15th century CE by the great Vaishnava saint and reformer Sankaradeva in the Sattras (monasteries) of Assam. Recognized as an official Classical Dance by Sangeet Natak Akademi in 2000.',
        bodyTe: '15వ శతాబ్దంలో శ్రీమంత శంకరదేవుడు అస్సాంలోని సత్రాలలో ప్రారంభించిన నృత్యం. 2000లో శాస్త్రీయ నృత్యంగా గుర్తింపు పొందింది.',
        tag: 'Assam · Sankaradeva'
      }
    ],
    compareTable: {
      leftCol: 'Classical Dance Form',
      leftColTe: 'శాస్త్రీయ నృత్యం',
      rightCol: 'State of Origin · Classical Roots · Eminent Maestros',
      rightColTe: 'రాష్ట్రం · ప్రముఖ కళాకారులు',
      rows: [
        ['Bharatanatyam', 'Tamil Nadu · Temple Devadasi heritage · Rukmini Devi, Yamini Krishnamurthy, Padma Subrahmanyam'],
        ['Kathak', 'Uttar Pradesh / North India · Storytellers in temples & Mughal courts · Birju Maharaj, Sitara Devi, Shambhu Maharaj'],
        ['Kathakali', 'Kerala · Elaborate green Paccha makeup & heavy costumes · Kalamandalam Gopi, Guru Kunchu Kurup'],
        ['Kuchipudi', 'Andhra Pradesh · Brass plate Tarangam dance · Yamini Krishnamurthy, Raja-Radha Reddy'],
        ['Odissi', 'Odisha · Tribhanga posture (three-bend body alignment) · Kelucharan Mohapatra, Sonal Mansingh'],
        ['Sattriya', 'Assam · Founded by Mahapurusha Sankaradeva in Sattras · Bapuram Barbayan, Jatin Goswami'],
        ['Manipuri', 'Manipur · Raas Leela theme (Radha-Krishna) with cylindrical skirt · Jhaveri Sisters, Guru Bipin Singh'],
        ['Mohiniyattam', 'Kerala · "Dance of Enchantress" with white Kasavu saree · Sunanda Nair, Kanak Rele, Madhuri Amma']
      ]
    },
    mnemonic: '8 Classical: 2 from Kerala (Kathakali, Mohiniyattam). 1 each: TN (Bharatanatyam), AP (Kuchipudi), OD (Odissi), AS (Sattriya), MN (Manipuri), UP (Kathak).',
    quiz: [
      {
        question: 'The devotional classical dance "Sattriya" originated in which Indian state under the guidance of saint Sankaradeva?',
        options: ['Manipur', 'Odisha', 'Assam', 'West Bengal'],
        answer: 2,
        explain: 'Sattriya was formulated in the 15th century by Vaishnavite reformer Sankaradeva in the monasteries (Sattras) of Assam.'
      }
    ]
  },
  {
    id: 'culture-temple-architecture',
    subject: 'Art & Culture',
    subjectId: 'culture',
    title: 'Indian Temple Architecture: Nagara, Dravida & Vesara',
    titleTe: 'భారతీయ ఆలయ నిర్మాణ శైలులు: నగర, ద్రావిడ & వేసర',
    era: 'Ancient & Medieval Architecture',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How does the towering curvilinear Shikhara of North India differ from the stepped pyramidal Vimana of the South?',
    heroHookTe: 'ఉత్తర భారతదేశ నగర శైలి శిఖరానికి మరియు దక్షిణ భారత ద్రావిడ శైలి విమానానికి మధ్య గల తేడా ఏమిటి?',
    infographicType: 'temple-styles',
    infographicCaption: 'Nagara Style (Curvilinear Shikhara) vs Dravida Style (Stepped Pyramid Vimana & Gopuram Gateways).',
    storyCards: [
      {
        title: 'Nagara Style: Northern Indian Temples',
        titleTe: 'నగర శైలి: ఉత్తర భారత ఆలయాలు',
        body: 'Prevalent between Himalayas and Vindhyas. Characterized by a curvilinear beehive-shaped tower (Shikhara) surmounted by a flattened fluted disc (Amalaka) and Kalasha. No massive boundary walls or gateway towers (Gopurams). Examples: Khajuraho, Konark Sun Temple, Modhera.',
        bodyTe: 'శిఖరం వంపుతిరిగి తేనెటీగల గూడు ఆకారంలో ఉంటుంది. అమలకం, కలశం ఉంటాయి. ప్రహరీ గోడలు, గోపురాలు ఉండవు. ఉదా: ఖజురహో, కోణార్క్.',
        tag: 'Curvilinear Shikhara'
      },
      {
        title: 'Dravida Style: South Indian Masterpieces',
        titleTe: 'ద్రావిడ శైలి: దక్షిణ భారత కళాఖండాలు',
        body: 'Flourished south of Krishna River under Cholas, Pandyas, Pallavas, and Vijayanagara. Distinctive elements: High boundary walls, massive entrance gateways (Gopurams), stepped pyramidal tower (Vimana), and a temple water tank (Kalyani).',
        bodyTe: 'మెట్ల ఆకారంలో పిరమిడ్ లాంటి విమానం, భారీ రాజగోపురాలు, ప్రాకారాలు మరియు పుష్కరిణి (కోనేరు) ఉంటాయి. ఉదా: తంజావూరు బృహదీశ్వరాలయం.',
        tag: 'Pyramidal Vimana'
      },
      {
        title: 'Vesara Style: Hybrid Deccan Architecture',
        titleTe: 'వేసర శైలి: హైబ్రిడ్ దక్కన్ శైలి',
        body: 'Evolved under the Chalukyas of Badami, Rashtrakutas, and Hoysalas in Karnataka. Blends Nagara curvature with Dravida stepped tiers. Famous examples: Chennakeshava Temple at Belur, Hoysaleswara Temple at Halebidu (star-shaped stellate plans).',
        bodyTe: 'నగర మరియు ద్రావిడ శైలుల కలయికతో కర్ణాటకలోని చాళుక్యులు, హొయసలుల కాలంలో నక్షత్రాకార పునాదులతో నిర్మించిన దేవాలయాలు.',
        tag: 'Karnataka Chalukyas'
      },
      {
        title: 'Panchayatana Temple Layout',
        titleTe: 'పంచాయతన ఆలయ ప్రణాళిక',
        body: 'A temple layout where the main central shrine housing the principal deity is surrounded by four subsidiary subsidiary shrines placed at the four corners. Classic examples: Kandariya Mahadeva (Khajuraho), Dashavatara Temple (Deogarh), Lakshmana Temple.',
        bodyTe: 'ప్రధాన ఆలయం మధ్యలో ఉండి, నాలుగు మూలల్లో నాలుగు చిన్న ఉపాలయాలు ఉండే ప్రణాళిక.',
        tag: 'Panchayatana Layout'
      }
    ],
    compareTable: {
      leftCol: 'Temple Feature',
      leftColTe: 'ఆలయ అంశం',
      rightCol: 'Nagara Style (North) · Dravida Style (South)',
      rightColTe: 'నగర శైలి (ఉత్తరం) · ద్రావిడ శైలి (దక్షిణం)',
      rows: [
        ['Main Tower over Sanctum', 'Shikhara (curvilinear, beehive shape) · Vimana (stepped pyramid rising geometrically)'],
        ['Crown on Top of Tower', 'Amalaka (ribbed stone disc) + Kalasha · Shikhara (dome-shaped octagonal/cupola) + Stupi'],
        ['Entrance Gateways', 'Modest entrance, no Gopuram · Gigantic decorated Gopurams towering over the complex'],
        ['Boundary Enclosure', 'Usually built on raised plinth (Jagati) without boundary wall · Enclosed within massive fortified compound walls'],
        ['Water Tank inside Temple', 'Not a mandatory temple element · Essential element (Kalyani / Teerthakundam)'],
        ['Finest Masterpiece', 'Kandariya Mahadeva (Khajuraho) · Brihadisvara Temple (Thanjavur - Rajaraja I Chola)']
      ]
    },
    mnemonic: 'N-D-V = Nagara (North, Shikhara), Dravida (South, Vimana + Gopuram), Vesara (Central/Deccan hybrid).',
    quiz: [
      {
        question: 'Which of the following features is uniquely characteristic of the South Indian "Dravida" style of temple architecture?',
        options: ['Curvilinear Shikhara with Amalaka', 'Towering entrance gateways called Gopurams', 'No boundary walls', 'Beehive shaped towers'],
        answer: 1,
        explain: 'Towering pyramidal entrance gateways called Gopurams and stepped Vimanas are hallmarks of Dravidian temple architecture.'
      }
    ]
  },
  {
    id: 'gk-international-orgs',
    subject: 'Static GK',
    subjectId: 'static-gk',
    title: 'Major International Organizations & Headquarters',
    titleTe: 'ప్రధాన అంతర్జాతీయ సంస్థలు & ప్రధాన కార్యాలయాలు',
    era: 'Global Multilateral Architecture',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Why are so many specialized global bodies concentrated in Geneva, Vienna, and New York?',
    heroHookTe: 'ఐక్యరాజ్యసమితి అనుబంధ సంస్థలు జెనీవా, వియన్నా, న్యూయార్క్‌లలో ఎందుకు కేంద్రీకృతమయ్యాయి?',
    infographicType: 'international-orgs-map',
    infographicCaption: 'Global Hubs: Geneva (WHO, WTO, ILO), Vienna (IAEA, OPEC), New York (UN, UNICEF), Paris (UNESCO).',
    storyCards: [
      {
        title: 'Geneva Hub: Health, Trade & Labor',
        titleTe: 'జెనీవా కేంద్రం: ఆరోగ్యం, వాణిజ్యం, కార్మిక',
        body: 'Geneva (Switzerland) hosts the World Health Organization (WHO), World Trade Organization (WTO), International Labour Organization (ILO), World Intellectual Property Organization (WIPO), and International Red Cross.',
        bodyTe: 'స్విట్జర్లాండ్‌లోని జెనీవాలో ప్రపంచ ఆరోగ్య సంస్థ (WHO), వాణిజ్య సంస్థ (WTO), కార్మిక సంస్థ (ILO) కార్యాలయాలు ఉన్నాయి.',
        tag: 'Geneva, Switzerland'
      },
      {
        title: 'Bretton Woods Twins: IMF & World Bank',
        titleTe: 'బ్రెట్టన్ వుడ్స్ కవలలు: IMF & ప్రపంచ బ్యాంక్',
        body: 'Conceived at the Bretton Woods Conference (1944). Both headquartered in Washington D.C. IMF oversees balance of payments and monetary stability; World Bank provides long-term development loans for poverty reduction.',
        bodyTe: '1944 బ్రెట్టన్ వుడ్స్ సదస్సు ద్వారా వాషింగ్టన్ డీసీలో ఏర్పాటైన ప్రపంచ బ్యాంక్ మరియు అంతర్జాతీయ ద్రవ్య నిధి (IMF).',
        tag: 'Washington D.C.'
      },
      {
        title: 'Vienna: Atomic Energy & Petroleum',
        titleTe: 'వియన్నా: అణుశక్తి & చమురు సంస్థలు',
        body: 'Vienna (Austria) hosts the International Atomic Energy Agency (IAEA - "Atoms for Peace"), the Organization of Petroleum Exporting Countries (OPEC), and the UN Office on Drugs and Crime (UNODC).',
        bodyTe: 'ఆస్ట్రియా రాజధాని వియన్నాలో అంతర్జాతీయ అణుశక్తి ఏజెన్సీ (IAEA) మరియు ఒపెక్ (OPEC) ప్రధాన కార్యాలయాలు ఉన్నాయి.',
        tag: 'Vienna, Austria'
      },
      {
        title: 'United Nations System: New York HQ',
        titleTe: 'ఐక్యరాజ్యసమితి: న్యూయార్క్ కేంద్రం',
        body: 'Founded on Oct 24, 1945. Headquartered in New York City. Comprises 6 principal organs: General Assembly, Security Council (5 permanent members with veto: US, UK, France, Russia, China), ECOSOC, Trusteeship Council, Secretariat, and International Court of Justice (ICJ at The Hague, Netherlands).',
        bodyTe: 'అక్టోబర్ 24, 1945న స్థాపన. న్యూయార్క్‌లో ప్రధాన కార్యాలయం. అంతర్జాతీయ న్యాయస్థానం (ICJ) మాత్రం నెదర్లాండ్స్‌లోని ది హేగ్‌లో ఉంది.',
        tag: 'UN Charter 1945'
      }
    ],
    compareTable: {
      leftCol: 'International Organization',
      leftColTe: 'అంతర్జాతీయ సంస్థ',
      rightCol: 'Headquarters Location · Formation Year · Key Mandate',
      rightColTe: 'ప్రధాన కేంద్రం · స్థాపన సంవత్సరం · కర్తవ్యం',
      rows: [
        ['United Nations (UN)', 'New York City, USA · 1945 · International peace and security'],
        ['World Health Organization (WHO)', 'Geneva, Switzerland · 1948 · Global public health monitoring'],
        ['World Trade Organization (WTO)', 'Geneva, Switzerland · 1995 (replaced GATT) · Multilateral international trade rules'],
        ['International Monetary Fund (IMF)', 'Washington D.C., USA · 1945 · Global financial stability and crisis lending'],
        ['UNESCO', 'Paris, France · 1945 · Education, Science, Culture, World Heritage sites'],
        ['International Court of Justice (ICJ)', 'The Hague, Netherlands · 1945 · Principal judicial organ of United Nations'],
        ['IAEA (Atomic Energy)', 'Vienna, Austria · 1957 · Peaceful use of nuclear energy ("Atoms for Peace")'],
        ['Interpol', 'Lyon, France · 1923 · International criminal police coordination']
      ]
    },
    mnemonic: 'Geneva: Starts with "World" + ends with "Organization" (WHO, WTO, WIPO, WMO) → almost always Geneva!',
    quiz: [
      {
        question: 'Where is the headquarters of the International Court of Justice (ICJ), the principal judicial organ of the UN, situated?',
        options: ['Geneva, Switzerland', 'The Hague, Netherlands', 'New York, USA', 'Vienna, Austria'],
        answer: 1,
        explain: 'The Peace Palace in The Hague (Netherlands) is the seat of the International Court of Justice.'
      }
    ]
  }
];
`;

fs.writeFileSync('./src/learnCurriculum.js', curriculumCode, 'utf8');
console.log('Successfully generated src/learnCurriculum.js with 16 massive visual modules!');

