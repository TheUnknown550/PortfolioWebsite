import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Badge from "./components/Badge";
import Button from "./components/Button";

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          theme === "dark" 
            ? "bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900" 
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}>
          {/* Floating Code Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute text-2xl ${
                theme === "dark" ? "text-blue-400/20" : "text-blue-500/20"
              }`}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, -10, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              {['💻', '⚡', '🔧', '🛠️', '🚀', '💡'][i % 6]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 ${
                theme === "dark" 
                  ? "bg-blue-900/30 text-blue-300 border border-blue-700/50" 
                  : "bg-blue-100 text-blue-700 border border-blue-200"
              }`}
            >
              <span className="text-lg sm:text-xl">💻</span>
              <span className="hidden sm:inline">Professional Experience</span>
              <span className="sm:hidden">Experience</span>
            </motion.div>
            
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <span className="block sm:inline">Projects &{" "}</span>
              <span className={`bg-gradient-to-r ${
                theme === "dark" 
                  ? "from-blue-400 to-indigo-400" 
                  : "from-blue-600 to-indigo-600"
              } bg-clip-text text-transparent`}>
                Experience
              </span>
            </h1>
            
            <p className={`text-sm sm:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto px-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              <span className="hidden sm:inline">A showcase of my professional work, technical achievements, and hands-on experience with cutting-edge technologies</span>
              <span className="sm:hidden">Professional work and technical achievements</span>
            </p>
          </motion.div>

          {/* Controls Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-lg ${
              theme === "dark"
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/70 border border-gray-200 shadow-lg"
            }`}>
              <div className="flex flex-col gap-4">
                {/* Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                  <span className={`text-sm font-medium whitespace-nowrap ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Sort by:
                  </span>
                  <div className="flex gap-2 items-center w-full sm:w-auto">
                    <select
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors flex-1 sm:flex-none min-w-0 ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-400"
                          : "bg-white text-gray-700 border-gray-300 focus:border-blue-400"
                      } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as 'date' | 'title' | 'importance')}
                    >
                      <option value="importance">Importance</option>
                      <option value="date">Date (Latest)</option>
                      <option value="title">Title (A-Z)</option>
                    </select>
                    
                    <Button
                      variant="icon"
                      theme={theme}
                      onClick={() => setReverse(r => !r)}
                      className={`transition-transform duration-200 flex-shrink-0 ${reverse ? 'rotate-180' : ''}`}
                      title={reverse ? 'Normal order' : 'Reverse order'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Toggle Skills */}
                <div className="flex items-center justify-between sm:justify-start pt-2 border-t border-gray-200 dark:border-gray-700">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <span className={`text-sm font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Show Skills
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={showSkills}
                        onChange={() => setShowSkills(v => !v)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                        showSkills
                          ? (theme === "dark" ? "bg-blue-600" : "bg-blue-500")
                          : (theme === "dark" ? "bg-gray-600" : "bg-gray-300")
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                          showSkills ? "translate-x-6" : "translate-x-1"
                        } mt-1`} />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {loading ? (
              // Loading Skeletons
              Array.from({ length: 4 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-8 rounded-2xl animate-pulse ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-lg"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`h-6 w-48 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                      <div className={`h-4 w-20 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                    </div>
                    <div className="space-y-2">
                      <div className={`h-4 w-full rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                      <div className={`h-4 w-3/4 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`h-6 w-16 rounded-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        }`} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Project Cards
              sortedProjects.map((proj, idx) => (
                <motion.div
                  key={`${proj.title}-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className={`group p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-[1.02] border-l-4 ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700 border-l-blue-500 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10"
                      : "bg-white border border-gray-200 border-l-blue-500 hover:border-blue-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
                  }`}
                >
                  {/* Project Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20"
                          : "bg-gradient-to-br from-blue-100 to-indigo-100"
                      }`}>
                        <span className="text-xl sm:text-2xl">
                          {idx === 0 ? '🚀' : idx === 1 ? '⚡' : idx === 2 ? '🛠️' : '💻'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-lg sm:text-xl font-bold mb-1 group-hover:text-blue-500 transition-colors break-words ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          {proj.title}
                        </h3>
                        <span className={`text-xs sm:text-sm font-mono px-2 py-1 rounded inline-block ${
                          theme === "dark" 
                            ? "bg-gray-700 text-gray-300" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {proj.years}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className={`text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {proj.description}
                  </p>

                  {/* Skills Section */}
                  {showSkills && proj.skills && proj.skills.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <h4 className={`text-sm font-semibold ${
                        theme === "dark" ? "text-blue-300" : "text-blue-600"
                      }`}>
                        Technologies & Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {proj.skills.map((skill, skillIdx) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIdx * 0.05 }}
                          >
                            <Badge theme={theme}>
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Project Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Professional Experience
                    </div>
                    <Button
                      variant="ghost"
                      theme={theme}
                      size="sm"
                      className="group-hover:bg-blue-500/10 group-hover:text-blue-500 self-start sm:self-auto"
                    >
                      <span className="hidden sm:inline">Learn More</span>
                      <span className="sm:hidden">Details</span>
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Stats Section */}
          {!loading && sortedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 sm:mt-12 lg:mt-16 text-center"
            >
              <div className={`inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 rounded-full ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-white/70 border border-gray-200 shadow-lg"
              }`}>
                <span className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {sortedProjects.length} Projects & Experiences
                </span>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-400"></div>
                <span className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-blue-300" : "text-blue-600"
                }`}>
                  Professional Portfolio
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
