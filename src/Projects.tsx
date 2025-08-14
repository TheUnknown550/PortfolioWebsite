import React, { useEffect, useState } from "react";
import Badge from "./components/Badge";
// Accent color for project cards
const accent = {
  light: "bg-sky-400",
  dark: "bg-sky-700"
};

interface Project {
  title: string;
  years: string;
  description: string;
  skills?: string[];
}

interface ProjectsProps {
  theme: "light" | "dark";
}

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showSkills, setShowSkills] = useState(true);

  useEffect(() => {
    fetch("/src/data.json")
      .then(res => res.json())
      .then(data => setProjects(data.profile.projects));
  }, []);

  return (
  <div className={
    (theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
      : "bg-gradient-to-br from-blue-50 via-white to-blue-100") +
    " min-h-[60vh] py-10 px-2 sm:px-6 flex flex-col items-center justify-center w-full"
  }>
    <div className="max-w-3xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h2 className={theme === "dark" ? "text-3xl font-bold text-sky-300 drop-shadow" : "text-3xl font-bold text-sky-700 drop-shadow"}>Projects</h2>
        {/* Styled switch for Show Skills */}
        <label className="flex items-center gap-3 cursor-pointer select-none self-end md:self-auto">
          <span className={theme === "dark" ? "text-gray-200 text-sm" : "text-gray-700 text-sm"}>Show Skills</span>
          <span className="relative inline-block w-11 h-6 align-middle select-none">
            <input
              type="checkbox"
              checked={showSkills}
              onChange={() => setShowSkills(v => !v)}
              className="sr-only peer"
            />
            <span
              className={
                `absolute left-0 top-0 w-11 h-6 rounded-full transition-colors duration-300 ` +
                (showSkills
                  ? (theme === "dark" ? "bg-sky-600" : "bg-sky-400")
                  : (theme === "dark" ? "bg-gray-700" : "bg-gray-300"))
              }
            ></span>
            <span
              className={
                `absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ` +
                (showSkills ? "translate-x-5" : "")
              }
            ></span>
          </span>
        </label>
      </div>
      <div className="w-full space-y-8">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className={
              (theme === "dark"
                ? "bg-gray-800/90 border-l-8 border-sky-700"
                : "bg-white/90 border-l-8 border-sky-400") +
              " rounded-xl p-6 shadow-xl flex flex-col gap-2 relative group transition-transform duration-300 hover:scale-[1.025] animate-fadeInSlideUp"
            }
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
              <h3 className={theme === "dark" ? "text-lg font-bold text-sky-200" : "text-lg font-bold text-sky-700"}>{proj.title}</h3>
              <span className="text-xs text-gray-400 font-mono">{proj.years}</span>
            </div>
            <p className={theme === "dark" ? "mb-2 text-gray-200 text-sm" : "mb-2 text-gray-700 text-sm"}>{proj.description}</p>
            {showSkills && proj.skills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    {/* Card fade/slide animation */}
    <style>{`
      .animate-fadeInSlideUp {
        animation: fadeInSlideUp 0.7s cubic-bezier(.4,1.4,.6,1) both;
      }
    `}</style>
  </div>
  );
};

export default Projects;
