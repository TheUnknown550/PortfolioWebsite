import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatedLink from "./AnimatedLink";
import Button from "./Button";

interface MobileNavProps {
  theme: "light" | "dark";
  onNavigate?: (targetPath: string) => void;
}

const navLinks = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/projects", label: "Projects", icon: "💼" },
  { to: "/honors", label: "Awards", icon: "🏆" },
  { to: "/roadmap", label: "Journey", icon: "🗺️" },
];

const MobileNav: React.FC<MobileNavProps> = ({ theme, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (open && !target.closest('.mobile-nav-container')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="md:hidden relative mobile-nav-container">
      {/* Hamburger Menu Button */}
      <Button
        variant="icon"
        theme={theme}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation menu"
        className={`relative z-50 transition-all duration-300 ${open ? 'scale-110' : ''}`}
      >
        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            open ? 'rotate-45 translate-y-0.5' : 'translate-y-0 mb-1'
          }`}></span>
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            open ? 'opacity-0' : 'opacity-100 mb-1'
          }`}></span>
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            open ? '-rotate-45 -translate-y-0.5' : 'translate-y-0'
          }`}></span>
        </div>
      </Button>

      {/* Mobile Menu Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={() => setOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`
            fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50
            transform transition-transform duration-300 ease-out
            ${theme === "dark" 
              ? "bg-gray-900 border-l border-gray-700" 
              : "bg-white border-l border-blue-200"
            }
            shadow-2xl
          `}>
            {/* Header */}
            <div className={`p-4 pt-6 pb-4 border-b ${
              theme === "dark" 
                ? "border-gray-700 bg-gray-800" 
                : "border-gray-200 bg-gray-100"
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  Navigation
                </h2>
                <Button
                  variant="icon"
                  theme={theme}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="hover:rotate-90 transition-transform duration-200 ml-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className={`flex flex-col p-4 space-y-2 ${
              theme === "dark" ? "bg-gray-850" : "bg-gray-50"
            }`}>
              {navLinks.map((link) => (
                <AnimatedLink
                  key={link.to}
                  to={link.to}
                  onClick={() => {
                    onNavigate?.(link.to);
                    setOpen(false);
                  }}
                  className={`
                    group flex items-center gap-4 px-4 py-4 rounded-xl
                    transition-all duration-200 transform hover:scale-[1.02]
                    ${location.pathname === link.to
                      ? theme === "dark" 
                        ? "bg-sky-800 text-sky-100 border-l-4 border-sky-400 shadow-lg" 
                        : "bg-sky-200 text-sky-900 border-l-4 border-sky-600 shadow-lg"
                      : theme === "dark"
                        ? "hover:bg-gray-700 text-white hover:text-sky-200 bg-gray-800"
                        : "hover:bg-blue-100 text-gray-900 hover:text-blue-900 bg-white shadow-sm"
                    }
                  `}

                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className={`text-base font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>{link.label}</span>
                    <span className={`text-xs font-medium ${
                      location.pathname === link.to 
                        ? theme === "dark" ? 'text-sky-200' : 'text-sky-800'
                        : theme === "dark" ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {link.to === "/" ? "Welcome home" :
                       link.to === "/projects" ? "My work & experience" :
                       link.to === "/honors" ? "Achievements & recognition" :
                       "My learning path"}
                    </span>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </AnimatedLink>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNav;
