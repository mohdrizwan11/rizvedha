import fs from 'fs';
import path from 'path';

// Read existing 21 topics from src/learnCurriculum.js
// We will enrich and ensure all 7 subjects have 4-6 rich subtopics (total 30 modules).
import { LEARN_TOPICS as existingTopics } from '../src/learnCurriculum.js';

// Define the 9 new high-yield modules to add to reach 30 comprehensive modules
const additionalTopics = [
  // Subject 2: Geography
  {
    id: 'geography-physiography-coasts',
    subject: 'Geography',
    subjectId: 'geography',
    title: 'Physiography of India: Coastal Plains & Islands',
    titleTe: 'భారత భౌతిక స్వరూపం: తీర మైదానాలు & ద్వీపాలు',
    era: 'Western Ghats · Eastern Ghats · Andaman & Nicobar',
    badge: 'High Yield · SSC Repeat',
    heroHook: 'Why is the Western Coastal Plain narrow and submerged while the Eastern Plain has massive fertile deltas?',
    heroHookTe: 'పశ్చిమ తీర మైదానం ఎందుకు ఇరుకుగా ఉంటుంది, తూర్పు తీరంలో ఎందుకు విస్తారమైన డెల్టాలు ఏర్పడతాయి?',
    infographicType: 'coastal-plains',
    infographicCaption: 'Western Ghats vs Eastern Ghats and 10 Degree Channel Schematic.',
    storyCards: [
      {
        title: 'Western vs Eastern Coastal Plains',
        titleTe: 'పశ్చిమ vs తూర్పు తీర మైదానాలు',
        body: 'Western coast is narrow (submerged type) with estuaries (Narmada, Tapti), divided into Konkan, Kannad, and Malabar (Kayals/Lagoons). Eastern coast is broad (emerged type) with sprawling deltas (Mahanadi, Godavari, Krishna, Cauvery).',
        bodyTe: 'పశ్చిమ తీరం ఇరుకైనది మరియు మునిగిన రకం, ఎస్ట్యురీలు ఏర్పడతాయి. తూర్పు తీరం విస్తారమైనది మరియు డెల్టాలతో కూడి ఉంటుంది.',
        tag: 'NCERT Class 11 Physical'
      },
      {
        title: 'Andaman & Nicobar Islands & Channels',
        titleTe: 'అండమాన్ నికోబార్ & ఛానల్స్',
        body: '10 Degree Channel separates Andaman from Nicobar. Duncan Passage separates South Andaman and Little Andaman. India’s only active volcano is Barren Island (Andaman).',
        bodyTe: '10 డిగ్రీల ఛానల్ అండమాన్ మరియు నికోబార్‌లను వేరు చేస్తుంది. డుంకన్ పాసేజ్ సౌత్ అండమాన్ మరియు లిటిల్ అండమాన్‌లను వేరు చేస్తుంది.',
        tag: 'Survey of India'
      },
      {
        title: 'Lakshadweep & 9 Degree Channel',
        titleTe: 'లక్షద్వీప్ & 9 డిగ్రీల ఛానల్',
        body: 'Coral reef origin in the Arabian Sea. Minicoy is separated from main Lakshadweep by 9 Degree Channel, and from Maldives by 8 Degree Channel.',
        bodyTe: 'అరేబియా సముద్రంలో పగడపు దిబ్బలతో ఏర్పడింది. 9 డిగ్రీల ఛానల్ మినికాయ్ మరియు లక్షద్వీప్‌లను వేరు చేస్తుంది.',
        tag: 'National Geography'
      }
    ],
    compareTable: {
      leftCol: 'Geographic Channel / Feature',
      leftColTe: 'భౌగోళిక ఛానల్ / ఫీచర్',
      rightCol: 'Separates / Location Details',
      rightColTe: 'వేరుచేసే ప్రాంతాలు / వివరాలు',
      rows: [
        ['10 Degree Channel', 'Separates Andaman Islands from Nicobar Islands'],
        ['9 Degree Channel', 'Separates Minicoy Island from main Lakshadweep archipelago'],
        ['8 Degree Channel', 'Separates Minicoy (India) from Maldives'],
        ['Duncan Passage', 'Separates South Andaman and Little Andaman'],
        ['Palk Strait & Adams Bridge', 'Separates India (Tamil Nadu) from Sri Lanka']
      ]
    },
    mnemonic: 'Channel Memory: 8-M-M (Minicoy-Maldives), 9-M-L (Minicoy-Lakshadweep), 10-A-N (Andaman-Nicobar).',
    quiz: [
      {
        question: 'Which water channel separates the Andaman Islands from the Nicobar Islands?',
        options: ['8 Degree Channel', '9 Degree Channel', '10 Degree Channel', 'Duncan Passage'],
        answer: 2,
        explain: 'The 10 Degree Channel in the Bay of Bengal separates the Andaman Islands to the north from the Nicobar Islands to the south.'
      },
      {
        question: 'Where is India’s only active volcano located?',
        options: ['Narcondam Island', 'Barren Island', 'Minicoy Island', 'Neil Island'],
        answer: 1,
        explain: 'Barren Island in the Andaman Sea is India’s and South Asia’s only confirmed active volcano.'
      }
    ]
  },

  // Subject 3: Indian Polity
  {
    id: 'polity-dpsp-duties',
    subject: 'Indian Polity & Constitution',
    subjectId: 'polity',
    title: 'Directive Principles (DPSP) & Fundamental Duties',
    titleTe: 'ఆదేశిక సూత్రాలు (DPSP) & ప్రాథమిక విధులు',
    era: 'Part IV (Articles 36-51) & Part IVA (Article 51A)',
    badge: 'High Yield · SSC Repeat',
    heroHook: 'Why are DPSPs non-justiciable yet fundamental in the governance of the country?',
    heroHookTe: 'ఆదేశిక సూత్రాలు న్యాయస్థానాల ద్వారా అమలు పరచలేకపోయినా దేశ పాలనలో ఎందుకు అత్యంత ముఖ్యమైనవి?',
    infographicType: 'dpsp-flow',
    infographicCaption: 'DPSP Three-Fold Classification (Socialistic, Gandhian, Liberal-Intellectual) & 11 Fundamental Duties.',
    storyCards: [
      {
        title: 'Origin & Nature of DPSP',
        titleTe: 'ఆదేశిక సూత్రాల మూలం & స్వభావం',
        body: 'Borrowed from Irish Constitution (Article 45 of Irish Constitution, which took it from Spain). Part IV (Articles 36–51). Non-justiciable (cannot be enforced through courts, Art 37).',
        bodyTe: 'ఐరిష్ రాజ్యాంగం నుండి తీసుకోబడింది. భాగం IV (ఆర్టికల్స్ 36-51). న్యాయస్థానాల ద్వారా అమలు పరచలేనివి (ఆర్టికల్ 37).',
        tag: 'Part IV · Constitution of India'
      },
      {
        title: 'Key High-Yield Articles of DPSP',
        titleTe: 'కీలక ఆదేశిక సూత్రాల ఆర్టికల్స్',
        body: 'Art 40: Organization of Village Panchayats. Art 44: Uniform Civil Code (UCC). Art 45: Early childhood care. Art 48A: Protection of environment & wildlife. Art 50: Separation of judiciary from executive.',
        bodyTe: 'ఆర్టికల్ 40: గ్రామ పంచాయతీలు. ఆర్టికల్ 44: ఉమ్మడి పౌరస్మృతి (UCC). ఆర్టికల్ 48A: పర్యావరణ పరిరక్షణ. ఆర్టికల్ 50: న్యాయవ్యవస్థ, కార్యనిర్వాహక వ్యవస్థ విభజన.',
        tag: 'SSC Verified Questions'
      },
      {
        title: 'Fundamental Duties (Part IVA · Art 51A)',
        titleTe: 'ప్రాథమిక విధులు (ఆర్టికల్ 51A)',
        body: 'Recommended by Swaran Singh Committee (1976). Added via 42nd Amendment 1976 (10 duties). 11th duty (education for children 6-14) added by 86th Amendment 2002. Borrowed from USSR Constitution.',
        bodyTe: 'స్వరణ్ సింగ్ కమిటీ సిఫారసుల ఆధారంగా 42వ రాజ్యాంగ సవరణ (1976) ద్వారా చేర్చబడ్డాయి. 11వ విధిని 86వ సవరణ (2002) లో చేర్చారు.',
        tag: 'Part IVA · Swaran Singh Committee'
      }
    ],
    compareTable: {
      leftCol: 'Article',
      leftColTe: 'ఆర్టికల్',
      rightCol: 'Subject Matter / Constitutional Mandate',
      rightColTe: 'విషయం / రాజ్యాంగ నిబంధన',
      rows: [
        ['Article 40', 'Organization of Village Panchayats (Gandhian principle)'],
        ['Article 44', 'Uniform Civil Code for all citizens throughout India'],
        ['Article 48A', 'Protection and improvement of environment, forests, and wildlife'],
        ['Article 50', 'Separation of Judiciary from Executive in public services'],
        ['Article 51', 'Promotion of international peace and security'],
        ['Article 51A(k)', 'Parent/guardian duty to provide education to child aged 6 to 14']
      ]
    },
    mnemonic: 'Art 40 = Panchayat, Art 44 = 4 & 4 are UNIFORM, Art 50 = 50-50 Split Judiciary/Executive, Art 51 = World Peace.',
    quiz: [
      {
        question: 'Which constitutional amendment added Fundamental Duties to the Indian Constitution?',
        options: ['44th Amendment 1978', '42nd Amendment 1976', '86th Amendment 2002', '73rd Amendment 1992'],
        answer: 1,
        explain: 'The 42nd Constitutional Amendment Act of 1976 added Part IVA and Article 51A on the recommendations of the Swaran Singh Committee.'
      },
      {
        question: 'Under which Article of the Constitution is the Uniform Civil Code mentioned?',
        options: ['Article 40', 'Article 42', 'Article 44', 'Article 48A'],
        answer: 2,
        explain: 'Article 44 in Part IV directs the State to secure for citizens a Uniform Civil Code throughout the territory of India.'
      }
    ]
  },

  {
    id: 'polity-parliament-judiciary',
    subject: 'Indian Polity & Constitution',
    subjectId: 'polity',
    title: 'Union Parliament, President & The Supreme Court',
    titleTe: 'కేంద్ర పార్లమెంట్, రాష్ట్రపతి & సుప్రీంకోర్టు',
    era: 'Articles 52-151 (Union Executive, Legislature & Judiciary)',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How does the doctrine of checks and balances operate between Parliament and the Supreme Court?',
    heroHookTe: 'పార్లమెంట్ మరియు సుప్రీంకోర్టు మధ్య నియంత్రణలు మరియు సమతుల్యతల సూత్రం ఎలా పనిచేస్తుంది?',
    infographicType: 'parliament-schematic',
    infographicCaption: 'Bicameral Parliament (Lok Sabha & Rajya Sabha), Presidential Veto Powers & Judicial Review.',
    storyCards: [
      {
        title: 'The President of India (Articles 52-62)',
        titleTe: 'భారత రాష్ట్రపతి (ఆర్టికల్స్ 52-62)',
        body: 'First Citizen and Head of State. Elected by an electoral college (elected members of Lok Sabha, Rajya Sabha, and State Legislative Assemblies). Impeached under Article 61 for "violation of the Constitution". Pardon powers under Article 72.',
        bodyTe: 'దేశ ప్రథమ పౌరుడు మరియు దేశాధినేత. ఆర్టికల్ 61 ప్రకారం మహాభియోగ తీర్మానం ద్వారా తొలగించవచ్చు. ఆర్టికల్ 72 ప్రకారం క్షమాభిక్ష అధికారాలు.',
        tag: 'Part V · The Union'
      },
      {
        title: 'Bicameral Parliament: Lok Sabha & Rajya Sabha',
        titleTe: 'ఉభయ సభలు: లోక్‌సభ & రాజ్యసభ',
        body: 'Rajya Sabha (Upper House, permanent body, 1/3rd members retire every 2 years, chaired by Vice President). Lok Sabha (Lower House, 5-year term, presided by Speaker). Money Bills (Art 110) can only be introduced in Lok Sabha with President recommendation.',
        bodyTe: 'రాజ్యసభ శాశ్వత సభ, ప్రతి 2 సంవత్సరాలకు 1/3 వంతు సభ్యులు పదవీ విరమణ చేస్తారు. మనీ బిల్లులు (ఆర్టికల్ 110) లోక్‌సభలో మాత్రమే ప్రవేశపెట్టాలి.',
        tag: 'Articles 79-122'
      },
      {
        title: 'The Supreme Court of India (Articles 124-147)',
        titleTe: 'భారత సుప్రీంకోర్టు (ఆర్టికల్స్ 124-147)',
        body: 'Established on 28 January 1950. Guardian of the Constitution and Court of Record (Art 129). Original Jurisdiction (Art 131), Appellate Jurisdiction (Art 132-136), and Advisory Jurisdiction (Art 143).',
        bodyTe: '1950 జనవరి 28న ప్రారంభించబడింది. రాజ్యాంగ పరిరక్షకురాలు మరియు కోర్ట్ ఆఫ్ రికార్డ్ (ఆర్టికల్ 129). ఆర్టికల్ 143 ప్రకారం రాష్ట్రపతికి సలహా అధికారం.',
        tag: 'Articles 124-147'
      }
    ],
    compareTable: {
      leftCol: 'Constitutional Body / Office',
      leftColTe: 'రాజ్యాంగ కార్యాలయం / సభ',
      rightCol: 'Tenure, Minimum Age & Crucial Exam Metric',
      rightColTe: 'పదవీకాలం, కనీస వయస్సు & ముఖ్యాంశాలు',
      rows: [
        ['President of India', '5 Years · Min Age 35 · Oath by Chief Justice of India (Art 60)'],
        ['Rajya Sabha Member', '6 Years (1/3rd retire every 2 yrs) · Min Age 30 · Max 250 members'],
        ['Lok Sabha Member', '5 Years · Min Age 25 · Max 552 (currently 543)'],
        ['Supreme Court Judge', 'Retirement Age 65 · Appointed by President · Removal by Parliament'],
        ['High Court Judge', 'Retirement Age 62 · Transferred by President with CJI consultation']
      ]
    },
    mnemonic: 'Age Ladder: Lok Sabha 25 < Rajya Sabha 30 < President/Governor 35.',
    quiz: [
      {
        question: 'Under which Article can the President of India seek the advisory opinion of the Supreme Court?',
        options: ['Article 123', 'Article 131', 'Article 143', 'Article 148'],
        answer: 2,
        explain: 'Article 143 authorizes the President to consult the Supreme Court on questions of law or fact of public importance.'
      },
      {
        question: 'Who decides whether a bill is a Money Bill or not under Article 110?',
        options: ['President of India', 'Speaker of Lok Sabha', 'Chairman of Rajya Sabha', 'Finance Minister'],
        answer: 1,
        explain: 'The Speaker of the Lok Sabha has the final and conclusive authority to certify whether a bill is a Money Bill.'
      }
    ]
  },

  // Subject 4: Economics
  {
    id: 'economics-five-year-plans',
    subject: 'Economics',
    subjectId: 'economics',
    title: 'Five-Year Plans, NITI Aayog & 1991 LPG Reforms',
    titleTe: 'పంచవర్ష ప్రణాళికలు, నీతి ఆయోగ్ & 1991 సంస్కరణలు',
    era: '1951 to Present · Harrod-Domar, Mahalanobis & LPG',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did the 1991 Balance of Payments crisis transform India into an open market economy?',
    heroHookTe: '1991 చెల్లింపుల సంక్షోభం భారతదేశాన్ని ఓపెన్ మార్కెట్ ఆర్థిక వ్యవస్థగా ఎలా మార్చింది?',
    infographicType: 'economics-reforms',
    infographicCaption: 'Chronology of Five-Year Plans (1st to 12th) & 1991 LPG (Liberalization, Privatization, Globalization).',
    storyCards: [
      {
        title: 'First & Second Five-Year Plans',
        titleTe: 'మొదటి మరియు రెండవ పంచవర్ష ప్రణాళికలు',
        body: '1st Plan (1951-56): Harrod-Domar model focused on agriculture and irrigation (Bhakra Nangal, Damodar). 2nd Plan (1956-61): PC Mahalanobis model focused on heavy industrialization (Bhilai, Durgapur, Rourkela steel plants).',
        bodyTe: '1వ ప్రణాళిక: హారోడ్-డోమర్ మోడల్ (వ్యవసాయం). 2వ ప్రణాళిక: పి.సి. మహలనోబిస్ మోడల్ (భారీ పరిశ్రమలు, ఉక్కు కర్మాగారాలు).',
        tag: 'Planning Commission of India'
      },
      {
        title: 'Plan Holidays & Green Revolution',
        titleTe: 'ప్లాన్ హాలిడేస్ & హరిత విప్లవం',
        body: 'Following the 1962 Sino-Indian and 1965 Indo-Pak wars and consecutive droughts, 3 Annual Plans (Plan Holidays 1966-69) were launched. High Yield Variety (HYV) seeds and Norman Borlaug / MS Swaminathan led the Green Revolution.',
        bodyTe: '1966-69 వార్షిక ప్రణాళికల (ప్లాన్ హాలిడేస్) సమయంలో ఎం.ఎస్. స్వామినాథన్ ఆధ్వర్యంలో హరిత విప్లవం ప్రారంభమైంది.',
        tag: 'Green Revolution in India'
      },
      {
        title: '1991 LPG Reforms & NITI Aayog',
        titleTe: '1991 LPG సంస్కరణలు & నీతి ఆయోగ్',
        body: 'Under PM PV Narasimha Rao and Finance Minister Dr. Manmohan Singh, LPG reforms ended the License Raj. On 1 Jan 2015, NITI Aayog replaced the Planning Commission as a think-tank promoting cooperative federalism.',
        bodyTe: 'పి.వి. నరసింహారావు, డాక్టర్ మన్మోహన్ సింగ్ ఆధ్వర్యంలో లైసెన్స్ రాజ్ రద్దు. 2015 జనవరి 1న ప్రణాళికా సంఘం స్థానంలో నీతి ఆయోగ్ ఏర్పాటు.',
        tag: 'NITI Aayog (1 Jan 2015)'
      }
    ],
    compareTable: {
      leftCol: 'Plan / Landmark',
      leftColTe: 'ప్రణాళిక / మైలురాయి',
      rightCol: 'Core Focus & Economic Architect',
      rightColTe: 'ప్రధాన లక్ష్యం & రూపకర్త',
      rows: [
        ['1st Plan (1951–56)', 'Harrod-Domar Model · Agriculture, Irrigation & Price Stability'],
        ['2nd Plan (1956–61)', 'PC Mahalanobis Model · Rapid Heavy Industrialization & Public Sector'],
        ['5th Plan (1974–79)', 'Garibi Hatao (Poverty Eradication) & Self Reliance (Target 4.4%)'],
        ['1991 LPG Reforms', 'Rao-Manmohan Model · Liberalization, Privatization, Globalization'],
        ['NITI Aayog (2015)', 'National Institution for Transforming India · Chaired by Prime Minister']
      ]
    },
    mnemonic: '1st Plan = Harrod (Agriculture), 2nd Plan = Mahalanobis (Industry), NITI = Jan 1, 2015.',
    quiz: [
      {
        question: 'The Second Five-Year Plan of India was based on which economic model?',
        options: ['Harrod-Domar Model', 'PC Mahalanobis Model', 'Gadgil Formula', 'Solow Model'],
        answer: 1,
        explain: 'The Second Five-Year Plan (1956–61) was drafted under the leadership of statistician Prasanta Chandra Mahalanobis.'
      },
      {
        question: 'When was NITI Aayog officially constituted replacing the Planning Commission?',
        options: ['15 August 2014', '1 January 2015', '1 April 2015', '26 January 2015'],
        answer: 1,
        explain: 'NITI Aayog was established on 1 January 2015 via a Cabinet resolution to serve as a policy think-tank.'
      }
    ]
  },

  {
    id: 'economics-budget-taxation',
    subject: 'Economics',
    subjectId: 'economics',
    title: 'Union Budget, Fiscal Policy & Taxation (GST)',
    titleTe: 'యూనియన్ బడ్జెట్, ద్రవ్య విధానం & పన్నులు (GST)',
    era: 'Article 112 (Annual Financial Statement) & 101st Amendment',
    badge: 'High Yield · SSC Repeat',
    heroHook: 'Why is the term "Budget" never mentioned in the Indian Constitution?',
    heroHookTe: 'భారత రాజ్యాంగంలో "బడ్జెట్" అనే పదం ఎక్కడా ఎందుకు ఉపయోగించబడలేదు?',
    infographicType: 'budget-deficit',
    infographicCaption: 'Budget Architecture (Revenue vs Capital Accounts) and Deficit Metrics (Fiscal, Revenue, Primary).',
    storyCards: [
      {
        title: 'Article 112: Annual Financial Statement',
        titleTe: 'ఆర్టికల్ 112: వార్షిక ఆర్థిక ప్రకటన',
        body: 'The word "Budget" does not appear in the Constitution; Article 112 refers to it as the "Annual Financial Statement", showing estimated receipts and expenditures of the Government of India for that financial year (1 April to 31 March).',
        bodyTe: 'రాజ్యాంగంలో బడ్జెట్ అనే పదం లేదు; ఆర్టికల్ 112 ప్రకారం దీనిని "వార్షిక ఆర్థిక ప్రకటన" అని పిలుస్తారు (ఏప్రిల్ 1 నుండి మార్చి 31 వరకు).',
        tag: 'Article 112'
      },
      {
        title: 'Revenue Deficit vs Fiscal Deficit',
        titleTe: 'రెవెన్యూ లోటు vs ద్రవ్య లోటు',
        body: 'Fiscal Deficit = Total Expenditure - Total Receipts excluding borrowings. It represents the total borrowing requirements of the government. Primary Deficit = Fiscal Deficit - Interest Payments.',
        bodyTe: 'ద్రవ్య లోటు (Fiscal Deficit) = మొత్తం వ్యయం - రుణాలు మినహాయించిన రాబడులు. ఇది ప్రభుత్వం చేయాల్సిన మొత్తం రుణాలను సూచిస్తుంది.',
        tag: 'FRBM Act 2003'
      },
      {
        title: 'Goods and Services Tax (GST · 101st Amendment)',
        titleTe: 'వస్తు మరియు సేవల పన్ను (GST)',
        body: 'Implemented on 1 July 2017 via 101st Constitutional Amendment Act (Article 279A creates GST Council chaired by Union Finance Minister). Subsumed 17 central and state indirect taxes.',
        bodyTe: '101వ రాజ్యాంగ సవరణ ద్వారా 2017 జూలై 1న అమలులోకి వచ్చింది. ఆర్టికల్ 279A ప్రకారం కేంద్ర ఆర్థిక మంత్రి అధ్యక్షతన GST కౌన్సిల్ ఏర్పడింది.',
        tag: '101st Amendment (1 July 2017)'
      }
    ],
    compareTable: {
      leftCol: 'Deficit / Tax Metric',
      leftColTe: 'లోటు / పన్ను మెట్రిక్',
      rightCol: 'Exact Formula & Significance',
      rightColTe: 'సూత్రం & ప్రాముఖ్యత',
      rows: [
        ['Fiscal Deficit', 'Total Expenditure – (Revenue Receipts + Non-debt Capital Receipts)'],
        ['Primary Deficit', 'Fiscal Deficit – Interest Payments (Borrowing needed for current year expenses)'],
        ['Revenue Deficit', 'Revenue Expenditure – Revenue Receipts'],
        ['GST Council (Art 279A)', 'Chaired by Union Finance Minister; 3/4th majority required for decisions'],
        ['Direct Tax vs Indirect Tax', 'Income/Corporate Tax (progressive, non-transferable) vs GST (regressive, transferable)']
      ]
    },
    mnemonic: 'Primary = Fiscal minus Interest. GST = 101st Amendment on 1 July 2017.',
    quiz: [
      {
        question: 'Under which Article of the Constitution is the Annual Financial Statement (Budget) presented?',
        options: ['Article 110', 'Article 112', 'Article 114', 'Article 280'],
        answer: 1,
        explain: 'Article 112 requires the President to lay before Parliament the Annual Financial Statement for every financial year.'
      },
      {
        question: 'Which Constitutional Amendment Act introduced the Goods and Services Tax (GST) in India?',
        options: ['99th Amendment', '100th Amendment', '101st Amendment', '103rd Amendment'],
        answer: 2,
        explain: 'The 101st Constitutional Amendment Act 2016 paved the way for the nationwide rollout of GST from 1 July 2017.'
      }
    ]
  },

  // Subject 6: Art & Culture
  {
    id: 'culture-unesco-monuments',
    subject: 'Art & Culture',
    subjectId: 'culture',
    title: 'UNESCO World Heritage Sites & Monuments of India',
    titleTe: 'UNESCO ప్రపంచ వారసత్వ ప్రదేశాలు & కట్టడాలు',
    era: 'Ajanta Caves to Santiniketan & Sacred Ensembles',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How does India rank globally with 42+ UNESCO World Heritage Sites spanning rock-cut caves, sun temples, and living heritage?',
    heroHookTe: '42కి పైగా యునెస్కో ప్రపంచ వారసత్వ సంపదలతో భారతదేశం ప్రపంచంలోనే ప్రముఖ స్థానంలో ఎలా నిలిచింది?',
    infographicType: 'unesco-map',
    infographicCaption: 'Regional Distribution of UNESCO World Heritage Sites in India.',
    storyCards: [
      {
        title: 'The First 4 Sites in 1983',
        titleTe: '1983లో గుర్తింపు పొందిన మొదటి 4 ప్రదేశాలు',
        body: 'India’s first sites inscribed in 1983 were Ajanta Caves, Ellora Caves, Agra Fort, and the Taj Mahal. Ellora Cave 16 houses the monolithic Kailash Temple carved top-to-bottom from a single rock by Rashtrakuta King Krishna I.',
        bodyTe: '1983లో భారతదేశం నుండి అజంతా గుహలు, ఎల్లోరా గుహలు, ఆగ్రా కోట, తాజ్ మహల్ మొదటిసారి యునెస్కో జాబితాలో చేరాయి.',
        tag: 'UNESCO 1983'
      },
      {
        title: 'Sun Temple Konark & Chola Temples',
        titleTe: 'కోణార్క్ సూర్య దేవాలయం & చోళ ఆలయాలు',
        body: 'Konark Sun Temple (Black Pagoda) built by Eastern Ganga King Narasimhadeva I features 24 carved chariot wheels acting as sundials. Great Living Chola Temples include Brihadisvara at Thanjavur (built by Rajaraja I).',
        bodyTe: 'కోణార్క్ సూర్య దేవాలయం (బ్లాక్ పగోడా) 24 రథ చక్రాలతో నిర్మించబడింది. తంజావూరులోని బృహదీశ్వరాలయం రాజరాజ చోళునిచే నిర్మించబడింది.',
        tag: 'Dravida & Kalinga Architecture'
      },
      {
        title: 'Recent Inscriptions (2021-2023)',
        titleTe: 'ఇటీవలి యునెస్కో గుర్తింపులు',
        body: 'Ramappa Temple (Kakatiya, Telangana) and Dholavira (Indus, Gujarat) in 2021. Santiniketan (Rabindranath Tagore, West Bengal) and Sacred Ensembles of the Hoysalas (Belur, Halebidu, Somanathapura) in 2023.',
        bodyTe: 'రామప్ప దేవాలయం (తెలంగాణ), ధోలవిరా (2021), శాంతినికేతన్ మరియు హోయసల దేవాలయాలు (2023) జాబితాలో చేర్చబడ్డాయి.',
        tag: 'UNESCO 2021-2023'
      }
    ],
    compareTable: {
      leftCol: 'UNESCO World Heritage Site',
      leftColTe: 'యునెస్కో వారసత్వ ప్రదేశం',
      rightCol: 'State & Distinct Architectural Identity',
      rightColTe: 'రాష్ట్రం & విశిష్ట వాస్తు శైలి',
      rows: [
        ['Ajanta & Ellora Caves', 'Maharashtra · Rock-cut Buddhist/Hindu/Jain caves; Kailash temple (Cave 16)'],
        ['Konark Sun Temple', 'Odisha · 24 carved wheels as accurate sundials, 7 horses'],
        ['Brihadisvara Temple', 'Tamil Nadu · Thanjavur; granite Vimana (66m), single granite capstone (80t)'],
        ['Ramappa Temple', 'Telangana · Kakatiya era (1213 CE); built with floating bricks'],
        ['Hoysala Ensembles', 'Karnataka · Belur, Halebidu & Somanathapura; star-shaped (stellate) plans']
      ]
    },
    mnemonic: 'First 4 (1983): A-E-A-T: Ajanta, Ellora, Agra Fort, Taj Mahal.',
    quiz: [
      {
        question: 'Which rock-cut temple in Ellora Cave 16 was carved out of a single monolithic rock from top to bottom?',
        options: ['Brihadisvara Temple', 'Kailash Temple', 'Shore Temple', 'Sun Temple'],
        answer: 1,
        explain: 'The monolithic Kailash Temple (Cave 16) at Ellora was carved out of a single basalt cliff face under Rashtrakuta King Krishna I.'
      },
      {
        question: 'Ramappa Temple, inscribed as a UNESCO World Heritage site in 2021, is located in which state?',
        options: ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu'],
        answer: 1,
        explain: 'The Rudreshwara (Ramappa) Temple at Palampet in Mulugu district of Telangana was built in 1213 CE during the Kakatiya period.'
      }
    ]
  },

  // Subject 7: Static GK
  {
    id: 'gk-space-defense',
    subject: 'Static GK',
    subjectId: 'static-gk',
    title: 'Space Exploration (ISRO) & Defense Systems (DRDO)',
    titleTe: 'అంతరిక్ష పరిశోధన (ISRO) & రక్షణ వ్యవస్థలు (DRDO)',
    era: '1969 to Chandrayaan-3, Aditya-L1 & Integrated Guided Missiles',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'How did India become the first country to land near the lunar south pole and develop the indigenous IGMDP missile shield?',
    heroHookTe: 'చంద్రుని దక్షిణ ధ్రువంపై దిగిన మొదటి దేశంగా మరియు స్వదేశీ క్షిపణి రక్షణ వ్యవస్థను భారత్ ఎలా నిర్మించింది?',
    infographicType: 'space-defense',
    infographicCaption: 'ISRO Launch Vehicles (PSLV vs GSLV) and DRDO PATNA Missile Systems.',
    storyCards: [
      {
        title: 'ISRO & Major Space Milestones',
        titleTe: 'ఇస్రో & ప్రధాన అంతరిక్ష మైలురాళ్ళు',
        body: 'Founded on 15 August 1969 by Dr. Vikram Sarabhai. First satellite Aryabhata (1975 launched by Soviet Union). Chandrayaan-1 (2008 detected water on Moon). Chandrayaan-3 (23 August 2023 soft-landed near Moon south pole — National Space Day).',
        bodyTe: '1969 ఆగస్టు 15న డాక్టర్ విక్రమ్ సారాభాయ్ స్థాపించారు. 2023 ఆగస్టు 23న చంద్రయాన్-3 చంద్రుని దక్షిణ ధ్రువంపై విజయవంతంగా దిగింది (జాతీయ అంతరిక్ష దినోత్సవం).',
        tag: 'Department of Space'
      },
      {
        title: 'Launch Vehicles: PSLV, GSLV & LVM3',
        titleTe: 'లాంచ్ వెహికల్స్: PSLV, GSLV & LVM3',
        body: 'PSLV (Polar Satellite Launch Vehicle, known as ISRO’s workhorse, 4 stages: Solid-Liquid-Solid-Liquid). GSLV Mk III / LVM3 (uses indigenous cryogenic upper stage CE-20, carried Chandrayaan-2 and 3).',
        bodyTe: 'PSLVని ఇస్రో వర్క్‌హార్స్ అంటారు (4 దశలు). LVM3 స్వదేశీ క్రయోజెనిక్ ఇంజిన్‌ను ఉపయోగిస్తుంది మరియు చంద్రయాన్-3ని కక్ష్యలోకి చేర్చింది.',
        tag: 'Satish Dhawan Space Centre (Sriharikota)'
      },
      {
        title: 'DRDO & Integrated Guided Missile Program (IGMDP)',
        titleTe: 'DRDO & ఇంటిగ్రేటెడ్ గైడెడ్ మిస్సైల్ ప్రోగ్రామ్',
        body: 'DRDO founded in 1958. Dr. APJ Abdul Kalam spearheaded IGMDP (1983) developing 5 core missiles: P-A-T-N-A (Prithvi, Agni, Trishul, Nag, Akash). Nag is a 3rd-generation anti-tank fire-and-forget missile (Helina is air-launched).',
        bodyTe: '1983లో డాక్టర్ ఏపీజే అబ్దుల్ కలాం ఆధ్వర్యంలో పట్నా (PATNA - పృథ్వి, అగ్ని, త్రిశూల్, నాగ్, ఆకాష్) క్షిపణుల అభివృద్ధి జరిగింది.',
        tag: 'DRDO (1958) · Dr. APJ Abdul Kalam'
      }
    ],
    compareTable: {
      leftCol: 'Missile / Mission',
      leftColTe: 'క్షిపణి / మిషన్',
      rightCol: 'Type, Range & Distinct Feature',
      rightColTe: 'రకం, పరిధి & ప్రత్యేక ఫీచర్',
      rows: [
        ['Prithvi (P)', 'Surface-to-Surface short range ballistic missile (SRBM)'],
        ['Agni (A)', 'Surface-to-Surface intermediate to ICBM (Agni-V range 5,000+ km)'],
        ['Trishul (T)', 'Short-range surface-to-air missile (Quick reaction)'],
        ['Nag (N)', 'Anti-tank "fire-and-forget" guided missile (Helina is helicopter variant)'],
        ['Akash (A)', 'Medium-range surface-to-air missile with Rajendra radar system'],
        ['Chandrayaan-3', 'Landed at "Shiv Shakti Point" near lunar south pole on 23 August 2023']
      ]
    },
    mnemonic: 'DRDO Missiles = PATNA: Prithvi, Agni, Trishul, Nag, Akash. Space Day = 23 August.',
    quiz: [
      {
        question: 'Which date is officially declared as "National Space Day" in India to commemorate the landing of Chandrayaan-3?',
        options: ['15 August', '23 August', '2 October', '14 July'],
        answer: 1,
        explain: 'Prime Minister Narendra Modi designated August 23 as National Space Day to mark the successful landing of Chandrayaan-3’s Vikram lander.'
      },
      {
        question: 'Which of the following DRDO missiles developed under IGMDP is a "fire-and-forget" anti-tank missile?',
        options: ['Prithvi', 'Akash', 'Nag', 'Trishul'],
        answer: 2,
        explain: 'Nag is a third-generation fire-and-forget anti-tank guided missile with an imaging infrared (IIR) seeker.'
      }
    ]
  },

  {
    id: 'gk-awards-honours',
    subject: 'Static GK',
    subjectId: 'static-gk',
    title: 'Civilian & Gallantry Awards of India',
    titleTe: 'భారతదేశ పౌర మరియు శౌర్య పురస్కారాలు',
    era: '1954 to Present · Bharat Ratna to Param Vir Chakra',
    badge: 'High Yield · SSC Must-Know',
    heroHook: 'Who were the first recipients of the Bharat Ratna in 1954 and how are gallantry awards categorized in war vs peace?',
    heroHookTe: '1954లో భారతరత్న పొందిన తొలి ప్రముఖులు ఎవరు, యుద్ధ మరియు శాంతి కాలపు శౌర్య పురస్కారాలు ఎలా విభజించబడ్డాయి?',
    infographicType: 'awards-hierarchy',
    infographicCaption: 'Civilian Awards Hierarchy (Bharat Ratna, Padma) vs Gallantry Awards (War vs Peace).',
    storyCards: [
      {
        title: 'Bharat Ratna: Highest Civilian Award',
        titleTe: 'భారతరత్న: అత్యున్నత పౌర పురస్కారం',
        body: 'Instituted on 2 January 1954 by President Rajendra Prasad. Peepal-leaf shaped bronze medallion with Sun emblem and "Bharat Ratna" in Devanagari. First recipients (1954): C. Rajagopalachari, Sarvepalli Radhakrishnan, and C.V. Raman.',
        bodyTe: '1954లో ప్రవేశపెట్టబడింది. రావి ఆకు ఆకారంలో ఉంటుంది. తొలి గ్రహీతలు: సి. రాజగోపాలాచారి, సర్వేపల్లి రాధాకృష్ణన్, సి.వి. రామన్.',
        tag: 'Highest Civilian Award'
      },
      {
        title: 'Padma Awards (Vibhushan, Bhushan, Shri)',
        titleTe: 'పద్మ పురస్కారాలు (విభూషణ్, భూషణ్, శ్రీ)',
        body: 'Announced on Republic Day eve. Padma Vibhushan (exceptional and distinguished service), Padma Bhushan (distinguished service of high order), Padma Shri (distinguished service).',
        bodyTe: 'ప్రతి సంవత్సరం గణతంత్ర దినోత్సవం సందర్భంగా ప్రకటిస్తారు: పద్మవిభూషణ్ (రెండవ అత్యున్నత), పద్మభూషణ్, పద్మశ్రీ.',
        tag: 'Ministry of Home Affairs'
      },
      {
        title: 'Gallantry Awards: War vs Peace Time',
        titleTe: 'శౌర్య పురస్కారాలు: యుద్ధ vs శాంతి కాలం',
        body: 'War-time: Param Vir Chakra (PVC - highest military honour; first recipient Major Somnath Sharma), Maha Vir Chakra (MVC), Vir Chakra (VrC). Peace-time: Ashoka Chakra (highest peacetime), Kirti Chakra, Shaurya Chakra.',
        bodyTe: 'యుద్ధ సమయం: పరమ వీర చక్ర (తొలి గ్రహీత మేజర్ సోమనాథ్ శర్మ), మహా వీర చక్ర, వీర చక్ర. శాంతి సమయం: అశోక చక్ర, కీర్తి చక్ర, శౌర్య చక్ర.',
        tag: 'Armed Forces of India'
      }
    ],
    compareTable: {
      leftCol: 'Award Category',
      leftColTe: 'పురస్కార విభాగం',
      rightCol: 'Highest Honour & Crucial Exam Milestone',
      rightColTe: 'అత్యున్నత పురస్కారం & ముఖ్యాంశాలు',
      rows: [
        ['Highest Civilian Award', 'Bharat Ratna (1954) · First Foreigner: Khan Abdul Ghaffar Khan (1987)'],
        ['Second Civilian Award', 'Padma Vibhushan · Instituted 1954'],
        ['Highest War-time Gallantry', 'Param Vir Chakra (PVC) · First: Major Somnath Sharma (1947 Battle of Badgam)'],
        ['Highest Peace-time Gallantry', 'Ashoka Chakra · Equivalent to PVC during peace-time operations'],
        ['Sports Highest Honour', 'Major Dhyan Chand Khel Ratna Award (formerly Rajiv Gandhi Khel Ratna)']
      ]
    },
    mnemonic: 'First 3 Bharat Ratna (1954) = 3 R’s: Rajagopalachari, Radhakrishnan, Raman.',
    quiz: [
      {
        question: 'Who was the first non-Indian (foreigner) to be conferred the Bharat Ratna award?',
        options: ['Nelson Mandela', 'Khan Abdul Ghaffar Khan', 'Mother Teresa', 'Martin Luther King Jr.'],
        answer: 1,
        explain: 'Frontier Gandhi, Khan Abdul Ghaffar Khan (Pakistan), was the first foreigner awarded the Bharat Ratna in 1987 (Nelson Mandela received it in 1990).'
      },
      {
        question: 'Who was the first recipient of India’s highest wartime gallantry medal, the Param Vir Chakra?',
        options: ['Captain Vikram Batra', 'Major Somnath Sharma', 'Subedar Joginder Singh', 'Naik Jadunath Singh'],
        answer: 1,
        explain: 'Major Somnath Sharma of the Kumaon Regiment was posthumously awarded the first Param Vir Chakra for supreme sacrifice during the Battle of Badgam in 1947.'
      }
    ]
  }
];

// Combine all 28 topics
const allTopics = [...existingTopics, ...additionalTopics];

// Define 7 Subjects metadata
const sevenSubjects = [
  {
    id: 'history',
    subjectKey: 'History',
    num: '01',
    title: 'History of India',
    titleTe: 'భారతదేశ చరిత్ర',
    iconName: 'Landmark',
    accent: '#d97706',
    bgLight: 'rgba(217, 119, 6, 0.08)',
    borderGlow: 'rgba(217, 119, 6, 0.25)',
    era: 'Ancient · Medieval · Modern',
    weight: '16–20% SSC Weight',
    desc: 'Indus Valley Civilisation, Vedic Age, Mauryan & Gupta Empires, Delhi Sultanate, Mughals, and 1857–1947 Freedom Struggle.',
    descTe: 'సింధు నాగరికత, వేద యుగం, మౌర్య & గుప్త సామ్రాజ్యాలు, ఢిల్లీ సుల్తానేట్ మరియు 1857-1947 స్వాతంత్ర్య పోరాటం.',
    highlights: ['Citadel & Great Bath Grid', 'Ashokan Rock Edicts', 'Gandhian Mass Movements']
  },
  {
    id: 'geography',
    subjectKey: 'Geography',
    num: '02',
    title: 'Geography of India',
    titleTe: 'భారతదేశ భౌగోళిక శాస్త్రం',
    iconName: 'Compass',
    accent: '#0284c7',
    bgLight: 'rgba(2, 132, 199, 0.08)',
    borderGlow: 'rgba(2, 132, 199, 0.25)',
    era: 'Physiography · Drainage · Climate',
    weight: '14–18% SSC Weight',
    desc: 'Himalayan & Peninsular river systems, mountain passes & strategic frontiers, soils, monsoons, and national parks.',
    descTe: 'హిమాలయ & ద్వీపకల్ప నదులు, పర్వత కనుమలు, నేలలు, రుతుపవనాలు మరియు జాతీయ పార్కులు.',
    highlights: ['Himalayan vs Peninsular Rivers', 'Passes & Frontiers', 'Soil Classification & Regur']
  },
  {
    id: 'polity',
    subjectKey: 'Indian Polity & Constitution',
    num: '03',
    title: 'Indian Polity & Constitution',
    titleTe: 'భారత రాజ్యాంగం & రాజకీయ వ్యవస్థ',
    iconName: 'Scale',
    accent: '#10b981',
    bgLight: 'rgba(16, 185, 129, 0.08)',
    borderGlow: 'rgba(16, 185, 129, 0.25)',
    era: 'Constituent Assembly · Articles 1 to 395',
    weight: '15–20% SSC Weight',
    desc: 'Preamble, Fundamental Rights, 5 Constitutional Writs, DPSP, Union Executive, Parliament, and Constitutional Bodies.',
    descTe: 'రాజ్యాంగ పీఠిక, ప్రాథమిక హక్కులు, 5 రిట్స్, ఆదేశిక సూత్రాలు, పార్లమెంట్ మరియు ఉన్నత రాజ్యాంగ సంస్థలు.',
    highlights: ['Articles 12–35 Fundamental Rights', 'The 5 Constitutional Writs', 'Constitutional Bodies & Tenure']
  },
  {
    id: 'economics',
    subjectKey: 'Economics',
    num: '04',
    title: 'Indian Economy & Macroeconomics',
    titleTe: 'భారత ఆర్థిక శాస్త్రం',
    iconName: 'TrendingUp',
    accent: '#6366f1',
    bgLight: 'rgba(99, 102, 241, 0.08)',
    borderGlow: 'rgba(99, 102, 241, 0.25)',
    era: 'Macroeconomics · Financial Architecture',
    weight: '10–14% SSC Weight',
    desc: 'RBI monetary policy tools (Repo, Reverse Repo, CRR, SLR), National Income & GDP, Five-Year Plans, and Union Budget.',
    descTe: 'రిజర్వ్ బ్యాంక్ ద్రవ్య విధాన సాధనాలు, జాతీయ ఆదాయం, GDP, పంచవర్ష ప్రణాళికలు మరియు యూనియన్ బడ్జెట్.',
    highlights: ['RBI Repo & Reverse Repo', 'GDP, GNP & Real vs Nominal', 'Five-Year Plans & 1991 LPG Reforms']
  },
  {
    id: 'science',
    subjectKey: 'General Science',
    num: '05',
    title: 'General Science (PCB)',
    titleTe: 'సాధారణ విజ్ఞాన శాస్త్రం',
    iconName: 'Atom',
    accent: '#ec4899',
    bgLight: 'rgba(236, 72, 153, 0.08)',
    borderGlow: 'rgba(236, 72, 153, 0.25)',
    era: 'Biology · Physics · Chemistry',
    weight: '16–22% SSC Weight',
    desc: 'Cell biology & organelles, Newton laws of motion, gravitation, optics & reflection, human nutrition, and vitamin deficiencies.',
    descTe: 'కణ జీవశాస్త్రం, న్యూటన్ నియమాలు, గురుత్వాకర్షణ, కాంతి శాస్త్రం మరియు విటమిన్ లోప వ్యాధులు.',
    highlights: ['Cell Organelles & ATP Powerhouse', 'Newtonian Laws & Optics', 'Vitamins & Deficiency Diseases']
  },
  {
    id: 'culture',
    subjectKey: 'Art & Culture',
    num: '06',
    title: 'Indian Art & Culture',
    titleTe: 'భారతీయ కళలు మరియు సంస్కృతి',
    iconName: 'Palette',
    accent: '#f59e0b',
    bgLight: 'rgba(245, 158, 11, 0.08)',
    borderGlow: 'rgba(245, 158, 11, 0.25)',
    era: 'Classical & Folk Traditions · Architecture',
    weight: '12–16% SSC Weight',
    desc: '8 Classical dances recognized by Sangeet Natak Akademi, temple architectural styles (Nagara, Dravida, Vesara), and UNESCO heritage.',
    descTe: '8 శాస్త్రీయ నృత్యాలు, ఆలయ వాస్తుశిల్పం (నాగర, ద్రావిడ, వేసర) మరియు UNESCO ప్రపంచ వారసత్వ ప్రదేశాలు.',
    highlights: ['8 Classical Dance Traditions', 'Nagara vs Dravida Architecture', 'UNESCO World Heritage Marvels']
  },
  {
    id: 'static-gk',
    subjectKey: 'Static GK',
    num: '07',
    title: 'Static GK & Global Affairs',
    titleTe: 'స్టాటిక్ జనరల్ నాలెడ్జ్ & అంతర్జాతీయ వ్యవహారాలు',
    iconName: 'Globe2',
    accent: '#0ea5e9',
    bgLight: 'rgba(14, 165, 233, 0.08)',
    borderGlow: 'rgba(14, 165, 233, 0.25)',
    era: 'Organizations · Defense · Awards · Sports',
    weight: '14–18% SSC Weight',
    desc: 'United Nations & international organizations, ISRO satellite launches, DRDO missile systems, sports cups, and national awards.',
    descTe: 'ఐక్యరాజ్యసమితి మరియు అంతర్జాతీయ సంస్థలు, ఇస్రో ఉపగ్రహాలు, రక్షణ క్షిపణులు, క్రీడా ట్రోఫీలు మరియు జాతీయ పురస్కారాలు.',
    highlights: ['UN Headquarters & Bretton Woods', 'ISRO PSLV/GSLV & DRDO Missiles', 'Bharat Ratna & Sports Trophies']
  }
];

const fileContent = `// ==============================================================
// RIZVEDHA COMPREHENSIVE GENERAL AWARENESS VISUAL CURRICULUM
// 7 Core Subjects & 28 High-Yield Visual Modules
// ==============================================================

export const SEVEN_SUBJECTS = ${JSON.stringify(sevenSubjects, null, 2)};

export const LEARN_TOPICS = ${JSON.stringify(allTopics, null, 2)};
`;

fs.writeFileSync(path.resolve('src/learnCurriculum.js'), fileContent, 'utf-8');
console.log('Successfully written', allTopics.length, 'topics across 7 subjects into src/learnCurriculum.js');

