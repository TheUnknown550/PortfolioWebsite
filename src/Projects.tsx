import React, { useEffect, useState } from "react";
import Badge from "./components/Badge";

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
  <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className={theme === "dark" ? "text-2xl font-bold text-sky-300" : "text-2xl font-bold text-purple-800"}>Projects</h2>
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
      <div className="w-full space-y-6">
        {projects.map((proj, idx) => (
          <div key={idx} className={theme === "dark" ? "bg-gray-800 rounded-xl p-6 shadow" : "bg-white rounded-xl p-6 shadow"}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-lg font-semibold mb-1 md:mb-0">{proj.title}</h3>
              <span className="text-xs text-gray-400">{proj.years}</span>
            </div>
            <p className="mb-2 text-sm">{proj.description}</p>
            {showSkills && proj.skills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
