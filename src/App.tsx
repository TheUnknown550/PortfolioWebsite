import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PortfolioLanding from "./PortfolioLanding";
import Roadmap from "./Roadmap";
import Projects from "./Projects";
import HonorsAwards from "./HonorsAwards";
import ThemeToggle from "./components/ThemeToggle";
import MobileNav from "./components/MobileNav";
import AnimatedPage from "./components/AnimatedPage";
import ContactModal from "./ContactModal";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  // Bounce logic for Contact Me button
  useEffect(() => {
    let count = 0;
    let bounceTimeout: any = null;
    let bounceInterval: any = null;
    function bounce() {
      const btn = document.getElementById('contact-bounce-btn');
      if (btn) {
        btn.style.animation = 'bounce-few 1s 1';
        bounceTimeout = setTimeout(() => { btn.style.animation = ''; }, 1100);
      }
      count++;
      if (count < 3) bounceTimeout = setTimeout(bounce, 2000);
    }
    bounceInterval = setInterval(() => {
      count = 0;
      bounce();
    }, 150000);
    return () => {
      if (bounceTimeout) clearTimeout(bounceTimeout);
      if (bounceInterval) clearInterval(bounceInterval);
    };
  }, []);
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
            }>Projects & Experience</Link>
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
        {/* Floating Contact Me button (global, fixed on all pages) */}
        <button
          onClick={() => setContactOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-full shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
          aria-label="Open contact options"
          tabIndex={0}
          style={{
            animation: 'bounce-few 1s 3',
            animationDelay: '0s',
            animationIterationCount: '3',
            animationPlayState: 'paused',
          }}
          onMouseEnter={e => {
            // Bounce on hover
            e.currentTarget.style.animation = 'bounce-few 1s 1';
          }}
          onAnimationEnd={e => {
            // Reset animation after hover
            e.currentTarget.style.animation = '';
          }}
          id="contact-bounce-btn"
        >
          Contact Me
        </button>
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} theme={theme} />
        {/* Custom bounce animation injected below */}
        <style>{`
          @keyframes bounce-few {
            0%, 100% { transform: translateY(0); }
            20% { transform: translateY(-20%); }
            40% { transform: translateY(0); }
            60% { transform: translateY(-10%); }
            80% { transform: translateY(0); }
          }
        `}</style>
        <main className="pt-8 pb-16 px-2 md:px-0">
          <Routes>
            <Route path="/" element={<AnimatedPage><PortfolioLanding theme={theme} /></AnimatedPage>} />
            <Route path="/projects" element={<AnimatedPage><Projects theme={theme} /></AnimatedPage>} />
            <Route path="/honors" element={<AnimatedPage><HonorsAwards theme={theme} /></AnimatedPage>} />
            <Route path="/roadmap" element={<AnimatedPage><Roadmap theme={theme} /></AnimatedPage>} />
          </Routes>
          {/* Global lively page animation */}
          <style>{`
            @keyframes fadeInSlideUp {
              0% { opacity: 0; transform: translateY(40px) scale(0.98); }
              60% { opacity: 1; transform: translateY(-8px) scale(1.01); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fadeInSlideUp {
              animation: fadeInSlideUp 0.7s cubic-bezier(.4,1.4,.6,1) both;
            }
          `}</style>
        <footer className="w-full text-center text-xs text-gray-400 py-4 mt-8">
          &copy; {new Date().getFullYear()} mattcosh.com. All rights reserved.
        </footer>
        </main>
      </div>
    </Router>
  );
};

export default App;
