import React, { useState } from "react";
import AnimatedLink from "./AnimatedLink";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

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

  return (
    <div className="md:hidden relative">
      <Button
        variant="icon"
        theme={theme}
        onClick={() => setOpen(o => !o)}
        aria-label="Open navigation menu"
      >
        <span className="block w-6 h-0.5 bg-current mb-1"></span>
        <span className="block w-6 h-0.5 bg-current mb-1"></span>
        <span className="block w-6 h-0.5 bg-current"></span>
      </Button>
      {open && (
        <div className={
          (theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-blue-100") +
          " absolute right-0 mt-2 w-48 rounded-xl shadow-lg border z-50 flex flex-col"
        }>
          {navLinks.map(link => (
            <AnimatedLink
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
            </AnimatedLink>
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
