import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const [showInitialPulse, setShowInitialPulse] = useState(true);

  useEffect(() => {
    // Show subtle pulse for 3 seconds on first load
    const timer = setTimeout(() => {
      setShowInitialPulse(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="theme-tooltip" data-tooltip={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="sm"
        theme={theme}
        className={`ml-4 relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 border hover:scale-[1.02] theme-float theme-transition ${
          showInitialPulse ? "welcome-attention" : ""
        } ${
          theme === "light" 
            ? "theme-toggle-light hover:border-sky-400" 
            : "theme-toggle-dark hover:border-slate-400"
        }`}
        aria-label={`Toggle to ${theme === "light" ? "dark" : "light"} theme`}
        leftIcon={
          <div className="relative w-5 h-5">
            {/* Sun icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`w-5 h-5 absolute transition-all duration-300 transform ${
                theme === "light" 
                  ? "opacity-100 rotate-0 scale-100" 
                  : "opacity-0 -rotate-90 scale-90"
              }`} 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
            {/* Moon icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`w-5 h-5 absolute transition-all duration-300 transform ${
                theme === "dark" 
                  ? "opacity-100 rotate-0 scale-100" 
                  : "opacity-0 rotate-90 scale-90"
              }`} 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
            </svg>
          </div>
        }
        rightIcon={
          <div className="text-sm transition-all duration-200 group-hover:scale-105 opacity-60 group-hover:opacity-100">
            {theme === "light" ? "☀️" : "🌙"}
          </div>
        }
      >
        <span className="font-medium transition-all duration-200 group-hover:font-semibold px-1 text-sm">
          {theme === "light" ? "Light" : "Dark"}
        </span>
        {/* Subtle background highlight */}
        <div className={`absolute inset-0 rounded transition-all duration-300 ${
          theme === "light" 
            ? "bg-gradient-to-br from-sky-100/20 via-blue-50/15 to-sky-200/20 group-hover:from-sky-200/30 group-hover:via-blue-100/25 group-hover:to-sky-300/30" 
            : "bg-gradient-to-br from-slate-700/20 via-gray-600/15 to-slate-800/20 group-hover:from-slate-600/30 group-hover:via-gray-500/25 group-hover:to-slate-700/30"
        } -z-10 opacity-0 group-hover:opacity-100`}></div>
      </Button>
    </div>
  );
};

export default ThemeToggle;
