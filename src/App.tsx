import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import SubjectPage from "./pages/SubjectPage";
import ChapterPage from "./pages/Chapter";
import Explore from "./pages/Explore";
import ExplorerDetail from "./pages/ExplorerDetail";
import Visuals from "./pages/Visuals";
import VisualDetail from "./pages/VisualDetail";
import Games from "./pages/games/Games";
import RapidFire from "./pages/games/RapidFire";
import Bluff from "./pages/games/Bluff";
import Match from "./pages/games/Match";
import Sprint from "./pages/games/Sprint";
import Progress from "./pages/Progress";
import Account from "./pages/Account";
import About from "./pages/About";
import SearchPage from "./pages/SearchPage";
import Bookmarks from "./pages/Bookmarks";
import { recordHit } from "./lib/analytics";

function Analytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    void recordHit(pathname);
  }, [pathname]);
  return null;
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollTop />
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:id" element={<ChapterPage />} />
        <Route path="/subject/:subject" element={<SubjectPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:slug" element={<ExplorerDetail />} />
        <Route path="/visuals" element={<Visuals />} />
        <Route path="/visuals/:slug" element={<VisualDetail />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/rapid" element={<RapidFire />} />
        <Route path="/games/bluff" element={<Bluff />} />
        <Route path="/games/match" element={<Match />} />
        <Route path="/games/sprint" element={<Sprint />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="*" element={<div className="page empty"><h1>Lost in the syllabus</h1><a className="btn" href="/">Go home</a></div>} />
      </Routes>
    </Layout>
  );
}
