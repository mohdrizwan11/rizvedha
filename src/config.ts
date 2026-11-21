/* ------------------------------------------------------------------
   One place for every name, link and contact detail.
   Change these values here — nothing else needs editing anywhere in
   the codebase.
------------------------------------------------------------------- */

export const BRAND = {
  name: "Riz Vedha",
  /** two letters in the square logo mark */
  mark: "RV",
  tagline: "Visual GS · SSC CGL",
  /** short line used on the home hero and the footer */
  promise: "The whole GS syllabus as pictures, cards and drills.",
  version: "2.0",
  author: "Mohammad Rizwan",
  year: new Date().getFullYear(),
};

export const LINKS = {
  /* public repo — powers "Star on GitHub" */
  github: "https://github.com/mohdrizwan11/rizvedha",
  /* where feedback lands */
  feedback: "mailto:kotnurumohammadrizwan@gmail.com?subject=Riz%20Vedha%20feedback",
  /* direct contact */
  support: "mailto:kotnurumohammadrizwan@gmail.com?subject=Riz%20Vedha%20support",
  discussions: null as string | null,
  /* the live domain, once deployed */
  site: "https://rizvedha.vercel.app",
  /* shown as the reply-to line in the About page */
  email: "kotnurumohammadrizwan@gmail.com",
};

export const ABOUT = {
  heading: "With respectful thanks to Parmar Sir",
  badge: "Source & inspiration",
  body: [
    "Every chapter, fact and page reference here comes from Parmar SSC Fatman GK/GS (English, 2nd edition, 2026) by Parmar Sir. This app is a visual way to revise his book — not a substitute for it.",
    "His chapter framing and the way he arranges static GK are the backbone of this syllabus. The diagrams, maps and games were built to make the same material easier to see, say and remember.",
    "Compiled for personal study. Not affiliated with the Staff Selection Commission or the book's publishers.",
  ],
};

/** Stats shown in the footer / about page. */
export const FACTS = {
  chapters: 121,
  facts: 15991,
  libraries: 33,
  diagrams: 12,
  games: 4,
};

export const GITHUB_STAR_URL = LINKS.github;
