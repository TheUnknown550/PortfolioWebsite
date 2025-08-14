import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface MobileNavProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/honors", label: "Honors & Awards" },
  { to: "/roadmap", label: "Roadmap" },
];

const MobileNav: React.FC<MobileNavProps> = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden relative">
      <button
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
        onClick={() => setOpen(o => !o)}
        aria-label="Open navigation menu"
      >
        <span className="block w-6 h-0.5 bg-current mb-1"></span>
        <span className="block w-6 h-0.5 bg-current mb-1"></span>
        <span className="block w-6 h-0.5 bg-current"></span>
      </button>
      {open && (
        <div className={
          (theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-blue-100") +
          " absolute right-0 mt-2 w-48 rounded-xl shadow-lg border z-50 flex flex-col"
        }>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={
                (location.pathname === link.to
                  ? (theme === "dark" ? "bg-sky-800 text-sky-200" : "bg-sky-100 text-sky-700")
                  : "") +
                " px-6 py-3 text-base font-medium rounded-xl hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
