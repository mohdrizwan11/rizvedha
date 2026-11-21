export type ExplorerMeta = {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  accent: string;
  subject: "Geography" | "History" | "Culture" | "India" | "World";
  count: number;
  icon: string;
  hasMap?: boolean;
};

/** The 33 static-GK libraries, grouped the way SSC aspirants revise them. */
export const EXPLORERS: ExplorerMeta[] = [
  // Geography & nature
  { slug: "rivers", title: "Rivers of India", desc: "Trace India's major rivers — origin, course, tributaries and drainage.", tag: "Map", accent: "#2C5F8A", subject: "Geography", count: 27, icon: "Waves", hasMap: true },
  { slug: "physical-india", title: "Physical India", desc: "Passes, peaks, mines, ports, dams and waterfalls on one map.", tag: "Study edition", accent: "#5d4037", subject: "Geography", count: 107, icon: "Mountain", hasMap: true },
  { slug: "national-parks", title: "National Parks", desc: "104 parks with species, rivers, tiger reserves and heritage status.", tag: "Study edition", accent: "#16a34a", subject: "Geography", count: 104, icon: "Trees", hasMap: true },
  { slug: "crops", title: "Crops & Agriculture", desc: "Kharif, rabi and plantation belts plus agro-climatic regions.", tag: "Map", accent: "#4d7c0f", subject: "Geography", count: 61, icon: "Sprout", hasMap: true },
  { slug: "soils", title: "Soil Types", desc: "Alluvial, black, red and laterite soils with conservation examples.", tag: "Map", accent: "#78350f", subject: "Geography", count: 52, icon: "Layers", hasMap: true },
  { slug: "lakes", title: "Lakes of India", desc: "Freshwater, saline and man-made lakes, state by state.", tag: "Map", accent: "#0369a1", subject: "Geography", count: 40, icon: "Droplets", hasMap: true },
  { slug: "biosphere-reserves", title: "Biosphere Reserves", desc: "India's 18 biosphere reserves and the UNESCO world network.", tag: "Map", accent: "#15803d", subject: "Geography", count: 18, icon: "Leaf", hasMap: true },
  { slug: "mountain-peaks", title: "Mountain Peaks", desc: "62 famous world peaks with ranges, heights and first ascents.", tag: "World map", accent: "#475569", subject: "Geography", count: 30, icon: "MountainSnow", hasMap: true },

  // History & culture
  { slug: "temples", title: "Temples of India", desc: "Famous temples by state, deity and architectural style.", tag: "Static GK", accent: "#9a3412", subject: "Culture", count: 38, icon: "Landmark", hasMap: true },
  { slug: "festivals", title: "Festivals of India", desc: "108 festivals and fairs, including North-East tribal festivals.", tag: "Study edition", accent: "#db2777", subject: "Culture", count: 108, icon: "PartyPopper", hasMap: true },
  { slug: "dances", title: "Dances of India", desc: "86 classical, folk and tribal dances with exponents and festivals.", tag: "Study edition", accent: "#7c3aed", subject: "Culture", count: 86, icon: "PersonStanding", hasMap: true },
  { slug: "music", title: "Music of India", desc: "60 gharanas, folk traditions, instruments, maestros and honours.", tag: "Study edition", accent: "#0891b2", subject: "Culture", count: 60, icon: "Music", hasMap: true },
  { slug: "tribes", title: "Tribes of India", desc: "Major tribes mapped to states, regions and dress traditions.", tag: "Static GK", accent: "#a16207", subject: "Culture", count: 52, icon: "Users", hasMap: true },
  { slug: "gi-tags", title: "GI Tags", desc: "Geographical Indication products matched to their states.", tag: "Static GK", accent: "#be123c", subject: "Culture", count: 44, icon: "BadgeCheck", hasMap: true },
  { slug: "ancient-dynasties", title: "Ancient Dynasties", desc: "From the 16 Mahajanapadas — capitals, rulers and a timeline.", tag: "History map", accent: "#92400e", subject: "History", count: 63, icon: "Crown", hasMap: true },
  { slug: "medieval-empires", title: "Medieval Empires", desc: "44 empires and kingdoms with power centres, periods and rulers.", tag: "History map", accent: "#7f1d1d", subject: "History", count: 44, icon: "Castle", hasMap: true },
  { slug: "freedom-movement", title: "Freedom Movement", desc: "1857 to 1947 — events and Congress sessions on the map.", tag: "History map", accent: "#c2410c", subject: "History", count: 49, icon: "Flag", hasMap: true },
  { slug: "monuments", title: "Historical Monuments", desc: "45 monuments with builder, style and UNESCO status.", tag: "History map", accent: "#a16207", subject: "History", count: 45, icon: "Building2", hasMap: true },
  { slug: "art-culture", title: "Art & Culture", desc: "Paintings, puppetry, folk theatre, embroidery and sculpture schools.", tag: "Study edition", accent: "#c2185b", subject: "Culture", count: 75, icon: "Palette", hasMap: true },
  { slug: "battles-treaties", title: "Battles & Treaties", desc: "Kalinga to Kargil — battles, treaties, years and results.", tag: "Study edition", accent: "#b71c1c", subject: "History", count: 50, icon: "Swords", hasMap: true },

  // India & infrastructure
  { slug: "waterways", title: "National Waterways", desc: "India's national waterways and the states they pass through.", tag: "Map", accent: "#0e7490", subject: "India", count: 12, icon: "Ship", hasMap: true },
  { slug: "power-plants", title: "Power Plants", desc: "Thermal, hydro, nuclear and solar plants, mapped and drilled.", tag: "Study edition", accent: "#ca8a04", subject: "India", count: 130, icon: "Zap", hasMap: true },
  { slug: "railway-zones", title: "Railway Zones", desc: "Railway zones matched to headquarters and regions.", tag: "Map", accent: "#b91c1c", subject: "India", count: 18, icon: "TrainFront", hasMap: true },
  { slug: "cm-governors", title: "CMs & Governors", desc: "Chief Ministers and Governors of every state.", tag: "Static GK", accent: "#4f46e5", subject: "India", count: 36, icon: "UserCog", hasMap: true },
  { slug: "highways", title: "Highways", desc: "National highways and the cities they connect.", tag: "Map", accent: "#15803d", subject: "India", count: 12, icon: "Route" },
  { slug: "india-basics", title: "India Basics", desc: "Capitals, High Courts, national symbols and Census 2011.", tag: "Study edition", accent: "#ef6c00", subject: "India", count: 64, icon: "MapPin", hasMap: true },
  { slug: "space-defence", title: "Space & Defence", desc: "ISRO centres, commands, ranges, missions and missiles.", tag: "Study edition", accent: "#1565c0", subject: "India", count: 62, icon: "Rocket", hasMap: true },

  // World, sports & awards
  { slug: "sports", title: "Sports", desc: "Stadiums, tournaments, trophies, terms and governing bodies.", tag: "Study edition", accent: "#b45309", subject: "World", count: 36, icon: "Trophy", hasMap: true },
  { slug: "awards-honours", title: "Awards & Honours", desc: "Civilian, gallantry, sports, literary, film and science awards.", tag: "Study edition", accent: "#b8860b", subject: "World", count: 41, icon: "Medal", hasMap: true },
  { slug: "books-authors", title: "Books & Authors", desc: "121 books from ancient texts to Booker winners.", tag: "Study edition", accent: "#795548", subject: "World", count: 121, icon: "BookOpen", hasMap: true },
  { slug: "world-gk", title: "World GK", desc: "Organisations, capitals, straits, canals and deserts.", tag: "Study edition", accent: "#00838f", subject: "World", count: 124, icon: "Globe2", hasMap: true },
  { slug: "science-facts", title: "Science Facts", desc: "Inventions, SI units, instruments and branches of science.", tag: "Study edition", accent: "#2e7d32", subject: "World", count: 117, icon: "FlaskConical" },
  { slug: "quick-facts", title: "Quick Facts", desc: "Important days, firsts, nicknames, HQs, founders and committees.", tag: "Study edition", accent: "#f57f17", subject: "World", count: 134, icon: "Sparkles" },
];

export const EXPLORER_SUBJECTS = ["Geography", "History", "Culture", "India", "World"] as const;

/* Which picture each library gets. Chosen per subject, not one map for all. */
export type VisualKind = "river" | "link" | "places" | "states" | "timeline" | "bars" | "mosaic";

const VISUALS: Record<string, VisualKind> = {
  rivers: "river",
  highways: "link",
  waterways: "link",
  dances: "states",
  festivals: "states",
  "art-culture": "states",
  crops: "states",
  soils: "states",
  tribes: "states",
  "gi-tags": "states",
  "cm-governors": "states",
  "railway-zones": "states",
  "biosphere-reserves": "states",
  music: "states",
  temples: "states",
  sports: "states",
  "ancient-dynasties": "timeline",
  "medieval-empires": "timeline",
  "freedom-movement": "timeline",
  "battles-treaties": "timeline",
  "awards-honours": "timeline",
  "science-facts": "timeline",
  "world-gk": "timeline",
  "mountain-peaks": "bars",
  "power-plants": "bars",
  "books-authors": "mosaic",
  "quick-facts": "mosaic",
};

const METRICS: Record<string, string> = {
  "mountain-peaks": "elev",
  "power-plants": "cap",
};

export const visualOf = (m: ExplorerMeta): VisualKind =>
  VISUALS[m.slug] || (m.hasMap ? "places" : "mosaic");

export const metricOf = (m: ExplorerMeta): string | undefined => METRICS[m.slug];


const loaders = import.meta.glob("../data/datasets/*.json") as Record<string, () => Promise<{ default: any }>>;

/** glob keys differ between bundlers ("../data/…" vs "/src/data/…"), so match on the tail */
function loaderFor(slug: string) {
  const direct = loaders[`../data/datasets/${slug}.json`];
  if (direct) return direct;
  const tail = `/datasets/${slug}.json`;
  const hit = Object.entries(loaders).find(([k]) => k.endsWith(tail));
  return hit?.[1];
}

export type Entry = {
  name: string;
  hindi?: string;
  primary: string;
  secondary: string[];
  fact: string;
  factHi?: string;
  lat?: number;
  lng?: number;
  raw: any;
};

const first = (...vals: any[]) => vals.find((v) => typeof v === "string" && v.trim().length > 0) || "";

export function normaliseEntry(it: any): Entry {
  const secondary = [it.yr, it.tag, it.ty, it.tr, it.kd, it.arch, it.deity, it.ft, it.ex, it.by, it.hq, it.est, it.cap, it.fuelType]
    .filter((v) => typeof v === "string" && v.trim())
    .slice(0, 3) as string[];
  return {
    name: first(it.n, it.name, "Untitled"),
    hindi: it.h || undefined,
    primary: first(it.st, it.s, it.sub, it.cat, it.c, ""),
    secondary,
    fact: first(it.fact, it.pts?.[0]?.[0], it.tag, it.d, ""),
    factHi: it.facth || undefined,
    lat: typeof it.lat === "number" ? it.lat : typeof it.olat === "number" ? it.olat : undefined,
    lng: typeof it.lng === "number" ? it.lng : typeof it.olng === "number" ? it.olng : undefined,
    raw: it,
  };
}

export async function loadExplorer(slug: string) {
  const loader = loaderFor(slug);
  if (!loader) throw new Error(`Unknown explorer ${slug}`);
  const mod = await loader();
  const data = mod.default ?? mod;
  const items: any[] = data.items || data.arrayName || [];
  return {
    data,
    entries: items.map(normaliseEntry).filter((e) => e.name),
    notes: (data.notes || []) as { id: string; t: string[]; sub?: string[]; cols?: string[][]; rows?: any[][] }[],
    mcq: (data.mcq || []) as { t?: string; q: string[]; o: string[][]; e?: string[] }[],
  };
}

export const explorerBySlug = (slug: string) => EXPLORERS.find((e) => e.slug === slug);
