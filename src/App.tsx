
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PortfolioLanding from "./PortfolioLanding";
import Roadmap from "./Roadmap";
import Projects from "./Projects";
import HonorsAwards from "./HonorsAwards";

import ThemeToggle from "./components/ThemeToggle";
import MobileNav from "./components/MobileNav";


const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <Router>
      <div className={
        theme === "dark"
          ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900"
      }>
        <nav className={
          theme === "dark"
            ? "bg-gray-900/90 shadow-md py-4 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-10 border-b border-gray-700"
            : "bg-white/90 shadow-md py-4 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-10 border-b border-blue-100"
        }>
          <Link to="/" className={
            theme === "dark"
              ? "text-2xl font-bold text-sky-300 tracking-tight drop-shadow"
              : "text-2xl font-bold text-sky-600 tracking-tight drop-shadow"
          }>mattcosh.com</Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={
              theme === "dark"
                ? "text-sky-300 hover:text-sky-100 font-medium"
                : "text-sky-600 hover:text-sky-800 font-medium"
            }>Home</Link>
            <Link to="/projects" className={
              theme === "dark"
                ? "text-sky-300 hover:text-sky-100 font-medium"
                : "text-sky-600 hover:text-sky-800 font-medium"
            }>Projects</Link>
            <Link to="/honors" className={
              theme === "dark"
                ? "text-sky-300 hover:text-sky-100 font-medium"
                : "text-sky-600 hover:text-sky-800 font-medium"
            }>Honors & Awards</Link>
            <Link to="/roadmap" className={
              theme === "dark"
                ? "text-sky-300 hover:text-sky-100 font-medium"
                : "text-sky-600 hover:text-sky-800 font-medium"
            }>Roadmap</Link>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          {/* Mobile nav */}
          <MobileNav theme={theme} toggleTheme={toggleTheme} />
        </nav>
        <main className="pt-8 pb-16 px-2 md:px-0">
          <Routes>
            <Route path="/" element={<PortfolioLanding theme={theme} />} />
            <Route path="/projects" element={<Projects theme={theme} />} />
            <Route path="/honors" element={<HonorsAwards theme={theme} />} />
            <Route path="/roadmap" element={<Roadmap theme={theme} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
