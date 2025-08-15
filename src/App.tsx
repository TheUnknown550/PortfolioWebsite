import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import PortfolioLanding from "./PortfolioLanding";
import Roadmap from "./Roadmap";
import Projects from "./Projects";
import HonorsAwards from "./HonorsAwards";
import ThemeToggle from "./components/ThemeToggle";
import MobileNav from "./components/MobileNav";
import AnimatedPage from "./components/AnimatedPage";
import ContactModal from "./ContactModal";
import Button from "./components/Button";
import ScrollToTop from "./components/ScrollToTop";

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

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <Router>
      <AppContent theme={theme} toggleTheme={toggleTheme} contactOpen={contactOpen} setContactOpen={setContactOpen} />
    </Router>
  );
};

const AppContent: React.FC<{
  theme: "light" | "dark";
  toggleTheme: () => void;
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
}> = ({ theme, toggleTheme, contactOpen, setContactOpen }) => {
  const location = useLocation();

  // Function to handle navigation with scroll to top
  const handleNavigation = (targetPath: string) => {
    if (location.pathname === targetPath) {
      // If clicking the same page, scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    // React Router will handle the navigation automatically via Link
  };

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

  return (
      <div className={
        theme === "dark"
          ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900"
      }>
        <ScrollToTop />
        <nav className={`
          sticky top-0 z-50 backdrop-blur-lg transition-all duration-300
          ${theme === "dark"
            ? "bg-gray-900/90 border-b border-gray-700 shadow-lg shadow-gray-900/20"
            : "bg-white/90 border-b border-blue-100 shadow-lg shadow-blue-500/10"
          }
        `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Brand */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={"/profile.png"}
                    alt="Profile"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-sky-400 shadow-md object-cover bg-white transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: theme === "dark" ? '#1e293b' : '#fff' }}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                    theme === "dark" ? "bg-green-400 border-gray-900" : "bg-green-400 border-white"
                  }`}></div>
                </div>
                <Link 
                  to="/" 
                  onClick={() => handleNavigation("/")}
                  className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-sky-300 hover:text-sky-100"
                      : "text-sky-600 hover:text-sky-800"
                  }`}
                >
                  mattcosh.com
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {[
                  { to: "/", label: "Home", icon: "🏠" },
                  { to: "/projects", label: "Projects", icon: "💼" },
                  { to: "/honors", label: "Awards", icon: "🏆" },
                  { to: "/roadmap", label: "Journey", icon: "🗺️" }
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => handleNavigation(link.to)}
                    className={`
                      group relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105
                      ${location.pathname === link.to
                        ? theme === "dark"
                          ? "bg-sky-900/50 text-sky-200"
                          : "bg-sky-100 text-sky-700"
                        : theme === "dark"
                          ? "text-gray-300 hover:text-sky-300 hover:bg-gray-800/50"
                          : "text-gray-700 hover:text-sky-700 hover:bg-blue-50"
                      }
                    `}
                  >
                    <span className="hidden lg:inline mr-2 group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                    {link.label}
                    {location.pathname === link.to && (
                      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        theme === "dark" ? "bg-sky-400" : "bg-sky-600"
                      }`}></div>
                    )}
                  </Link>
                ))}
                <div className="ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
                  <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
              </div>

              {/* Mobile Navigation & Theme Toggle */}
              <div className="md:hidden flex items-center gap-3">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <MobileNav theme={theme} onNavigate={handleNavigation} />
              </div>
            </div>
          </div>
        </nav>
        {/* Floating Contact Button - Responsive positioning */}
        <Button
          onClick={() => setContactOpen(true)}
          variant="primary"
          size="lg"
          theme={theme}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-40 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          aria-label="Open contact options"
          tabIndex={0}
          style={{
            animation: 'bounce-few 1s 3',
            animationDelay: '0s',
            animationIterationCount: '3',
            animationPlayState: 'paused',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.animation = 'bounce-few 1s 1';
          }}
          onAnimationEnd={e => {
            e.currentTarget.style.animation = '';
          }}
          id="contact-bounce-btn"
        >
          <span className="hidden sm:inline">Contact Me</span>
          <span className="sm:hidden">📧</span>
        </Button>
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
        <main className="relative">
          <Routes>
            <Route path="/" element={<AnimatedPage><PortfolioLanding theme={theme} /></AnimatedPage>} />
            <Route path="/projects" element={<AnimatedPage><Projects theme={theme} /></AnimatedPage>} />
            <Route path="/honors" element={<AnimatedPage><HonorsAwards theme={theme} /></AnimatedPage>} />
            <Route path="/roadmap" element={<AnimatedPage><Roadmap theme={theme} /></AnimatedPage>} />
          </Routes>
          
          {/* Global Animations */}
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
          
          {/* Footer */}
          <footer className={`w-full text-center py-8 mt-16 border-t ${
            theme === "dark" 
              ? "border-gray-700 bg-gray-900/50 text-gray-400" 
              : "border-gray-200 bg-white/50 text-gray-500"
          }`}>
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} mattcosh.com. All rights reserved.
              </p>
              <p className="text-xs mt-2 opacity-70">
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
          </footer>
        </main>
      </div>
    );
};

export default App;
