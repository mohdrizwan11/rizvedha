// AUTO-GENERATED from the PARMAR SSC book index. Do not edit by hand.

export type ChapterMeta = { id: string; num: number; title: string; pages: [number, number] };

export type ModuleMeta = { key: string; title: string; subject: string; accent: string; chapters: ChapterMeta[] };

export type SubjectMeta = { key: string; title: string; icon: string; accent: string; blurb: string; modules: string[] };


export const SUBJECTS: SubjectMeta[] = [
  {
    "key": "geography",
    "title": "Geography",
    "icon": "Globe2",
    "accent": "#0e7490",
    "blurb": "Earth, atmosphere, rivers, soils, minerals and India's map.",
    "modules": [
      "geo"
    ]
  },
  {
    "key": "history",
    "title": "History",
    "icon": "Landmark",
    "accent": "#b45309",
    "blurb": "Stone Age to 1947 — civilisations, empires and the freedom struggle.",
    "modules": [
      "ancient",
      "medieval",
      "modern"
    ]
  },
  {
    "key": "polity",
    "title": "Polity",
    "icon": "Scale",
    "accent": "#4338ca",
    "blurb": "Constitution, Parliament, courts, bodies and important laws.",
    "modules": [
      "polity"
    ]
  },
  {
    "key": "economy",
    "title": "Economics",
    "icon": "TrendingUp",
    "accent": "#047857",
    "blurb": "Budget, banking, inflation, plans and economic institutions.",
    "modules": [
      "economy"
    ]
  },
  {
    "key": "physics",
    "title": "Physics",
    "icon": "Atom",
    "accent": "#7c3aed",
    "blurb": "Motion, optics, electricity and magnetism with formulas.",
    "modules": [
      "physics"
    ]
  },
  {
    "key": "chemistry",
    "title": "Chemistry",
    "icon": "FlaskConical",
    "accent": "#be123c",
    "blurb": "Matter, atoms, reactions, acids, bases and carbon compounds.",
    "modules": [
      "chemistry"
    ]
  },
  {
    "key": "biology",
    "title": "Biology",
    "icon": "Dna",
    "accent": "#15803d",
    "blurb": "Cell, tissues, body systems, diseases and heredity.",
    "modules": [
      "biology"
    ]
  },
  {
    "key": "environment",
    "title": "Environment",
    "icon": "Leaf",
    "accent": "#166534",
    "blurb": "Ecosystems, energy flow, cycles, conventions and parks.",
    "modules": [
      "environment"
    ]
  },
  {
    "key": "staticgk",
    "title": "Static GK",
    "icon": "Sparkles",
    "accent": "#a21caf",
    "blurb": "Dances, festivals, days, books, sports, organisations and awards.",
    "modules": [
      "staticgk"
    ]
  }
];


export const MODULES: ModuleMeta[] = [
  {
    "key": "geo",
    "title": "Geography",
    "subject": "geography",
    "accent": "#0e7490",
    "chapters": [
      {
        "id": "geo-01",
        "num": 1,
        "title": "Solar System",
        "pages": [
          1,
          5
        ]
      },
      {
        "id": "geo-02",
        "num": 2,
        "title": "Longitude and Latitude",
        "pages": [
          6,
          9
        ]
      },
      {
        "id": "geo-03",
        "num": 3,
        "title": "Earth's Interior and Plate Tectonics",
        "pages": [
          10,
          12
        ]
      },
      {
        "id": "geo-04",
        "num": 4,
        "title": "Rocks, Continents and Oceans",
        "pages": [
          13,
          16
        ]
      },
      {
        "id": "geo-05",
        "num": 5,
        "title": "Geomorphology",
        "pages": [
          17,
          18
        ]
      },
      {
        "id": "geo-06",
        "num": 6,
        "title": "Landforms",
        "pages": [
          19,
          24
        ]
      },
      {
        "id": "geo-07",
        "num": 7,
        "title": "Atmosphere",
        "pages": [
          25,
          28
        ]
      },
      {
        "id": "geo-08",
        "num": 8,
        "title": "Wind, Ocean Current and Cyclone",
        "pages": [
          29,
          32
        ]
      },
      {
        "id": "geo-09",
        "num": 9,
        "title": "India and its Location",
        "pages": [
          33,
          36
        ]
      },
      {
        "id": "geo-10",
        "num": 10,
        "title": "Himalayas",
        "pages": [
          37,
          40
        ]
      },
      {
        "id": "geo-11",
        "num": 11,
        "title": "Peninsular Plateau",
        "pages": [
          41,
          43
        ]
      },
      {
        "id": "geo-12",
        "num": 12,
        "title": "Northern Plains and Islands",
        "pages": [
          44,
          47
        ]
      },
      {
        "id": "geo-13",
        "num": 13,
        "title": "Himalayan River System",
        "pages": [
          48,
          51
        ]
      },
      {
        "id": "geo-14",
        "num": 14,
        "title": "Peninsular Rivers",
        "pages": [
          52,
          53
        ]
      },
      {
        "id": "geo-15",
        "num": 15,
        "title": "Dams, Lakes and Waterfall",
        "pages": [
          54,
          57
        ]
      },
      {
        "id": "geo-16",
        "num": 16,
        "title": "Monsoon",
        "pages": [
          58,
          60
        ]
      },
      {
        "id": "geo-17",
        "num": 17,
        "title": "Forest and Grassland",
        "pages": [
          61,
          63
        ]
      },
      {
        "id": "geo-18",
        "num": 18,
        "title": "Soil",
        "pages": [
          64,
          66
        ]
      },
      {
        "id": "geo-19",
        "num": 19,
        "title": "Agriculture",
        "pages": [
          67,
          70
        ]
      },
      {
        "id": "geo-20",
        "num": 20,
        "title": "Minerals",
        "pages": [
          71,
          75
        ]
      },
      {
        "id": "geo-21",
        "num": 21,
        "title": "World Map",
        "pages": [
          76,
          83
        ]
      },
      {
        "id": "geo-22",
        "num": 22,
        "title": "Human Geography",
        "pages": [
          84,
          86
        ]
      },
      {
        "id": "geo-23",
        "num": 23,
        "title": "Transport",
        "pages": [
          87,
          89
        ]
      }
    ]
  },
  {
    "key": "ancient",
    "title": "Ancient History",
    "subject": "history",
    "accent": "#b45309",
    "chapters": [
      {
        "id": "ancient-01",
        "num": 1,
        "title": "Stone Age",
        "pages": [
          90,
          91
        ]
      },
      {
        "id": "ancient-02",
        "num": 2,
        "title": "Indus Valley Civilization",
        "pages": [
          92,
          95
        ]
      },
      {
        "id": "ancient-03",
        "num": 3,
        "title": "Vedic Age",
        "pages": [
          96,
          99
        ]
      },
      {
        "id": "ancient-04",
        "num": 4,
        "title": "Sangam Age",
        "pages": [
          100,
          101
        ]
      },
      {
        "id": "ancient-05",
        "num": 5,
        "title": "Jainism and Buddhism",
        "pages": [
          102,
          106
        ]
      },
      {
        "id": "ancient-06",
        "num": 6,
        "title": "Mahajanapadas",
        "pages": [
          107,
          108
        ]
      },
      {
        "id": "ancient-07",
        "num": 7,
        "title": "Maurya Dynasty",
        "pages": [
          109,
          112
        ]
      }
    ]
  },
  {
    "key": "medieval",
    "title": "Medieval History",
    "subject": "history",
    "accent": "#c2410c",
    "chapters": [
      {
        "id": "medieval-01",
        "num": 1,
        "title": "Post-Maurya Dynasties",
        "pages": [
          113,
          115
        ]
      },
      {
        "id": "medieval-02",
        "num": 2,
        "title": "Gupta Dynasty",
        "pages": [
          116,
          118
        ]
      },
      {
        "id": "medieval-03",
        "num": 3,
        "title": "Post-Gupta Dynasties",
        "pages": [
          119,
          124
        ]
      },
      {
        "id": "medieval-04",
        "num": 4,
        "title": "Tripartite Struggle and Cholas",
        "pages": [
          125,
          130
        ]
      },
      {
        "id": "medieval-05",
        "num": 5,
        "title": "Delhi Sultanate",
        "pages": [
          131,
          137
        ]
      },
      {
        "id": "medieval-06",
        "num": 6,
        "title": "Vijayanagara and Bahmani Kingdom",
        "pages": [
          138,
          141
        ]
      },
      {
        "id": "medieval-07",
        "num": 7,
        "title": "The Mughal Empire",
        "pages": [
          142,
          148
        ]
      },
      {
        "id": "medieval-08",
        "num": 8,
        "title": "Marathas",
        "pages": [
          149,
          151
        ]
      },
      {
        "id": "medieval-09",
        "num": 9,
        "title": "Bhakti and Sufi Movements",
        "pages": [
          152,
          154
        ]
      }
    ]
  },
  {
    "key": "modern",
    "title": "Modern History",
    "subject": "history",
    "accent": "#a16207",
    "chapters": [
      {
        "id": "modern-01",
        "num": 1,
        "title": "Advent of Europeans",
        "pages": [
          155,
          158
        ]
      },
      {
        "id": "modern-02",
        "num": 2,
        "title": "Socio Religious Reforms",
        "pages": [
          159,
          161
        ]
      },
      {
        "id": "modern-03",
        "num": 3,
        "title": "Revolt of 1857",
        "pages": [
          162,
          166
        ]
      },
      {
        "id": "modern-04",
        "num": 4,
        "title": "Indian National Congress",
        "pages": [
          167,
          168
        ]
      },
      {
        "id": "modern-05",
        "num": 5,
        "title": "Bengal Partition",
        "pages": [
          169,
          172
        ]
      },
      {
        "id": "modern-06",
        "num": 6,
        "title": "Gandhian Era",
        "pages": [
          173,
          175
        ]
      },
      {
        "id": "modern-07",
        "num": 7,
        "title": "CDM and Simon Commission",
        "pages": [
          176,
          179
        ]
      },
      {
        "id": "modern-08",
        "num": 8,
        "title": "Quit India Movement",
        "pages": [
          180,
          184
        ]
      },
      {
        "id": "modern-09",
        "num": 9,
        "title": "Governor-General and Viceroy",
        "pages": [
          185,
          186
        ]
      }
    ]
  },
  {
    "key": "polity",
    "title": "Polity",
    "subject": "polity",
    "accent": "#4338ca",
    "chapters": [
      {
        "id": "polity-01",
        "num": 1,
        "title": "Making of Constitution",
        "pages": [
          187,
          189
        ]
      },
      {
        "id": "polity-02",
        "num": 2,
        "title": "Salient Features of the Constitution",
        "pages": [
          190,
          191
        ]
      },
      {
        "id": "polity-03",
        "num": 3,
        "title": "Preamble",
        "pages": [
          192,
          193
        ]
      },
      {
        "id": "polity-04",
        "num": 4,
        "title": "Part 1 and Part 2 of the Constitution",
        "pages": [
          194,
          197
        ]
      },
      {
        "id": "polity-05",
        "num": 5,
        "title": "Fundamental Rights",
        "pages": [
          198,
          202
        ]
      },
      {
        "id": "polity-06",
        "num": 6,
        "title": "DPSP and Fundamental Duties",
        "pages": [
          203,
          205
        ]
      },
      {
        "id": "polity-07",
        "num": 7,
        "title": "President and Vice President of India",
        "pages": [
          206,
          209
        ]
      },
      {
        "id": "polity-08",
        "num": 8,
        "title": "Prime Minister and Council of Ministers",
        "pages": [
          210,
          211
        ]
      },
      {
        "id": "polity-09",
        "num": 9,
        "title": "Parliament",
        "pages": [
          212,
          219
        ]
      },
      {
        "id": "polity-10",
        "num": 10,
        "title": "State Legislature",
        "pages": [
          220,
          223
        ]
      },
      {
        "id": "polity-11",
        "num": 11,
        "title": "Centre-State Relations",
        "pages": [
          224,
          225
        ]
      },
      {
        "id": "polity-12",
        "num": 12,
        "title": "Emergency and Constitutional Amendment",
        "pages": [
          226,
          228
        ]
      },
      {
        "id": "polity-13",
        "num": 13,
        "title": "Supreme Court and High Court",
        "pages": [
          229,
          233
        ]
      },
      {
        "id": "polity-14",
        "num": 14,
        "title": "Local Government",
        "pages": [
          234,
          236
        ]
      },
      {
        "id": "polity-15",
        "num": 15,
        "title": "Constitutional and Non-Constitutional Bodies",
        "pages": [
          237,
          240
        ]
      },
      {
        "id": "polity-16",
        "num": 16,
        "title": "New Criminal Laws 2023",
        "pages": [
          241,
          242
        ]
      },
      {
        "id": "polity-17",
        "num": 17,
        "title": "Important Acts",
        "pages": [
          243,
          245
        ]
      },
      {
        "id": "polity-18",
        "num": 18,
        "title": "Sources of the Indian Constitution",
        "pages": [
          246,
          246
        ]
      },
      {
        "id": "polity-19",
        "num": 19,
        "title": "Noteworthy Points",
        "pages": [
          247,
          247
        ]
      }
    ]
  },
  {
    "key": "economy",
    "title": "Economics",
    "subject": "economy",
    "accent": "#047857",
    "chapters": [
      {
        "id": "economy-01",
        "num": 1,
        "title": "Basics of Economy",
        "pages": [
          248,
          250
        ]
      },
      {
        "id": "economy-02",
        "num": 2,
        "title": "Microeconomics",
        "pages": [
          251,
          256
        ]
      },
      {
        "id": "economy-03",
        "num": 3,
        "title": "National Income",
        "pages": [
          257,
          260
        ]
      },
      {
        "id": "economy-04",
        "num": 4,
        "title": "Budget and Taxation",
        "pages": [
          261,
          265
        ]
      },
      {
        "id": "economy-05",
        "num": 5,
        "title": "Inflation and Unemployment",
        "pages": [
          266,
          269
        ]
      },
      {
        "id": "economy-06",
        "num": 6,
        "title": "Banking: Part 1",
        "pages": [
          270,
          273
        ]
      },
      {
        "id": "economy-07",
        "num": 7,
        "title": "Monetary Policy",
        "pages": [
          274,
          275
        ]
      },
      {
        "id": "economy-08",
        "num": 8,
        "title": "Banking: Part 2",
        "pages": [
          276,
          279
        ]
      },
      {
        "id": "economy-09",
        "num": 9,
        "title": "Poverty and Balance of Payment",
        "pages": [
          280,
          285
        ]
      },
      {
        "id": "economy-10",
        "num": 10,
        "title": "Five Year Plan and Industrial Policy Resolution",
        "pages": [
          286,
          291
        ]
      },
      {
        "id": "economy-11",
        "num": 11,
        "title": "Indices, Reports, International Institutions & Key Concepts",
        "pages": [
          292,
          294
        ]
      }
    ]
  },
  {
    "key": "physics",
    "title": "Physics",
    "subject": "physics",
    "accent": "#7c3aed",
    "chapters": [
      {
        "id": "physics-01",
        "num": 1,
        "title": "Motion",
        "pages": [
          295,
          297
        ]
      },
      {
        "id": "physics-02",
        "num": 2,
        "title": "Force and Laws of Motion",
        "pages": [
          298,
          300
        ]
      },
      {
        "id": "physics-03",
        "num": 3,
        "title": "Gravitation and Work Done",
        "pages": [
          301,
          304
        ]
      },
      {
        "id": "physics-04",
        "num": 4,
        "title": "Sound",
        "pages": [
          305,
          307
        ]
      },
      {
        "id": "physics-05",
        "num": 5,
        "title": "Reflection and Refraction",
        "pages": [
          308,
          313
        ]
      },
      {
        "id": "physics-06",
        "num": 6,
        "title": "Human Eye and Vision",
        "pages": [
          314,
          317
        ]
      },
      {
        "id": "physics-07",
        "num": 7,
        "title": "Electricity",
        "pages": [
          318,
          321
        ]
      },
      {
        "id": "physics-08",
        "num": 8,
        "title": "Magnetic Effect of Electric Current",
        "pages": [
          322,
          324
        ]
      }
    ]
  },
  {
    "key": "chemistry",
    "title": "Chemistry",
    "subject": "chemistry",
    "accent": "#be123c",
    "chapters": [
      {
        "id": "chemistry-01",
        "num": 1,
        "title": "Matter",
        "pages": [
          325,
          330
        ]
      },
      {
        "id": "chemistry-02",
        "num": 2,
        "title": "Atom and its Structure",
        "pages": [
          331,
          335
        ]
      },
      {
        "id": "chemistry-03",
        "num": 3,
        "title": "Periodic Table",
        "pages": [
          336,
          340
        ]
      },
      {
        "id": "chemistry-04",
        "num": 4,
        "title": "Chemical Reactions",
        "pages": [
          341,
          343
        ]
      },
      {
        "id": "chemistry-05",
        "num": 5,
        "title": "Metals and Non-Metals",
        "pages": [
          344,
          348
        ]
      },
      {
        "id": "chemistry-06",
        "num": 6,
        "title": "Acid, Base and Salt",
        "pages": [
          349,
          352
        ]
      },
      {
        "id": "chemistry-07",
        "num": 7,
        "title": "Carbon and its Compounds",
        "pages": [
          353,
          358
        ]
      }
    ]
  },
  {
    "key": "biology",
    "title": "Biology",
    "subject": "biology",
    "accent": "#15803d",
    "chapters": [
      {
        "id": "biology-01",
        "num": 1,
        "title": "Cell",
        "pages": [
          359,
          366
        ]
      },
      {
        "id": "biology-02",
        "num": 2,
        "title": "Plant Tissue and Animal Tissue",
        "pages": [
          367,
          373
        ]
      },
      {
        "id": "biology-03",
        "num": 3,
        "title": "Plant and Animal Kingdom",
        "pages": [
          374,
          382
        ]
      },
      {
        "id": "biology-04",
        "num": 4,
        "title": "Nervous System",
        "pages": [
          383,
          385
        ]
      },
      {
        "id": "biology-05",
        "num": 5,
        "title": "Hormones and Plant Movement",
        "pages": [
          386,
          388
        ]
      },
      {
        "id": "biology-06",
        "num": 6,
        "title": "Reproduction",
        "pages": [
          389,
          393
        ]
      },
      {
        "id": "biology-07",
        "num": 7,
        "title": "Digestion and Respiration",
        "pages": [
          394,
          397
        ]
      },
      {
        "id": "biology-08",
        "num": 8,
        "title": "Circulatory and Excretory System",
        "pages": [
          398,
          401
        ]
      },
      {
        "id": "biology-09",
        "num": 9,
        "title": "Diseases",
        "pages": [
          402,
          407
        ]
      },
      {
        "id": "biology-10",
        "num": 10,
        "title": "Nutrients",
        "pages": [
          408,
          411
        ]
      },
      {
        "id": "biology-11",
        "num": 11,
        "title": "Heredity and Evolution",
        "pages": [
          412,
          415
        ]
      }
    ]
  },
  {
    "key": "environment",
    "title": "Environment",
    "subject": "environment",
    "accent": "#166534",
    "chapters": [
      {
        "id": "environment-01",
        "num": 1,
        "title": "Basics of Environmental Sciences",
        "pages": [
          416,
          417
        ]
      },
      {
        "id": "environment-02",
        "num": 2,
        "title": "Ecosystem",
        "pages": [
          418,
          420
        ]
      },
      {
        "id": "environment-03",
        "num": 3,
        "title": "Trophic Dynamics and Energy Transfer",
        "pages": [
          421,
          422
        ]
      },
      {
        "id": "environment-04",
        "num": 4,
        "title": "Biogeochemical Cycles",
        "pages": [
          423,
          423
        ]
      },
      {
        "id": "environment-05",
        "num": 5,
        "title": "Environmental Conventions",
        "pages": [
          424,
          424
        ]
      },
      {
        "id": "environment-06",
        "num": 6,
        "title": "National Parks",
        "pages": [
          425,
          428
        ]
      }
    ]
  },
  {
    "key": "staticgk",
    "title": "Static GK",
    "subject": "staticgk",
    "accent": "#a21caf",
    "chapters": [
      {
        "id": "staticgk-01",
        "num": 1,
        "title": "Music and Paintings",
        "pages": [
          429,
          439
        ]
      },
      {
        "id": "staticgk-02",
        "num": 2,
        "title": "Classical Dance",
        "pages": [
          440,
          443
        ]
      },
      {
        "id": "staticgk-03",
        "num": 3,
        "title": "Folk Dances of India",
        "pages": [
          444,
          458
        ]
      },
      {
        "id": "staticgk-04",
        "num": 4,
        "title": "Festivals of India",
        "pages": [
          459,
          473
        ]
      },
      {
        "id": "staticgk-05",
        "num": 5,
        "title": "Census",
        "pages": [
          474,
          476
        ]
      },
      {
        "id": "staticgk-06",
        "num": 6,
        "title": "Important Days",
        "pages": [
          477,
          479
        ]
      },
      {
        "id": "staticgk-07",
        "num": 7,
        "title": "Books and Authors",
        "pages": [
          480,
          487
        ]
      },
      {
        "id": "staticgk-08",
        "num": 8,
        "title": "Sports",
        "pages": [
          488,
          497
        ]
      },
      {
        "id": "staticgk-09",
        "num": 9,
        "title": "International Organisations",
        "pages": [
          498,
          502
        ]
      },
      {
        "id": "staticgk-10",
        "num": 10,
        "title": "National Organisations",
        "pages": [
          503,
          504
        ]
      },
      {
        "id": "staticgk-11",
        "num": 11,
        "title": "Awards and Honours",
        "pages": [
          505,
          509
        ]
      }
    ]
  }
];


export const ALL_CHAPTERS = MODULES.flatMap((m) =>
  m.chapters.map((c) => ({ ...c, module: m.key, moduleTitle: m.title, subject: m.subject, accent: m.accent })),
);

export const chapterById = (id: string) => ALL_CHAPTERS.find((c) => c.id === id);

export const subjectByKey = (key: string) => SUBJECTS.find((s) => s.key === key);

export const modulesOfSubject = (key: string) => MODULES.filter((m) => m.subject === key);

export const TOTAL_CHAPTERS = ALL_CHAPTERS.length;
