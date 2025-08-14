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
  const [loading, setLoading] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'importance'>('importance');
  const [reverse, setReverse] = useState(false);

  // For importance, use the order in the JSON file (default)
  const [originalOrder, setOriginalOrder] = useState<Project[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        setProjects(data.profile.projects);
        setOriginalOrder(data.profile.projects);
      })
      .finally(() => setLoading(false));
  }, []);

  function parseYearRange(years?: string) {
    if (!years) return 0;
    // Try to get the latest year in the range
    const match = years.match(/(\d{4})(?!.*\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
  }

  let sortedProjects = [...projects];
  if (sortBy === 'date') {
    sortedProjects.sort((a, b) => parseYearRange(b.years) - parseYearRange(a.years));
  } else if (sortBy === 'title') {
    sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'importance') {
    // Use the original order from JSON
    sortedProjects = [...originalOrder];
  }
  if (reverse) sortedProjects.reverse();

  return (
  <div className={
    (theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
      : "bg-gradient-to-br from-blue-50 via-white to-blue-100") +
    " min-h-[60vh] py-10 px-2 sm:px-6 flex flex-col items-center justify-center w-full"
  }>
    <div className="max-w-3xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h2 className={theme === "dark" ? "text-3xl font-bold text-sky-300 drop-shadow" : "text-3xl font-bold text-sky-700 drop-shadow"}>Projects & Experience</h2>
        <div className="flex flex-row gap-3 items-center">
          <div className={
            (theme === "dark"
              ? "bg-gray-800 border border-sky-700"
              : "bg-white border border-sky-300") +
            " rounded-xl px-4 py-2 flex flex-row items-center gap-3 shadow-md transition-all duration-300"
          }>
            <span className={theme === "dark" ? "text-sky-300 font-semibold" : "text-sky-700 font-semibold"}>
              <svg className="inline w-5 h-5 mr-1 -mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
              Sort:
            </span>
            <select
              className={
                (theme === "dark"
                  ? "bg-gray-900 text-sky-200 border-sky-700"
                  : "bg-blue-50 text-sky-700 border-sky-300") +
                " rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border"
              }
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'date' | 'title' | 'importance')}
            >
              <option value="date">Date (Newest)</option>
              <option value="title">Title (A-Z)</option>
              <option value="importance">Default</option>
            </select>
            <button
              className={
                "ml-2 px-2 py-1 rounded-full border flex items-center transition-all duration-200 " +
                (reverse
                  ? (theme === "dark" ? "bg-sky-700 text-white border-sky-700" : "bg-sky-400 text-white border-sky-400")
                  : (theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-700" : "bg-gray-200 text-gray-700 border-gray-200"))
              }
              onClick={() => setReverse(r => !r)}
              title="Reverse order"
            >
              <svg className={"w-4 h-4 mr-1 transition-transform duration-200 " + (reverse ? "rotate-180" : "")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              {reverse ? 'Reverse' : 'Normal'}
            </button>
          </div>
        </div>
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
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className={
                (theme === "dark"
                  ? "bg-gray-800/90 border-l-8 border-sky-700"
                  : "bg-white/90 border-l-8 border-sky-400") +
                " rounded-xl p-6 shadow-xl flex flex-col gap-2 animate-pulse"
              }
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                <div className={theme === "dark" ? "bg-sky-900 h-6 w-40 mb-2 rounded" : "bg-sky-200 h-6 w-40 mb-2 rounded"}></div>
                <div className="bg-gray-300 dark:bg-gray-600 h-4 w-20 rounded" />
              </div>
              <div className={theme === "dark" ? "bg-gray-700 h-4 w-full mb-2 rounded" : "bg-gray-200 h-4 w-full mb-2 rounded"}></div>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={theme === "dark" ? "bg-sky-900 h-5 w-16 rounded" : "bg-sky-200 h-5 w-16 rounded"}></div>
                ))}
              </div>
            </div>
          ))
        ) : (
          sortedProjects.map((proj, idx) => (
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
          ))
        )}
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
