import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactModal from "react-modal";
import Badge from "./components/Badge";
import Button from "./components/Button";
import { getProjects } from "./utils/dataLoader";

interface Project {
  title: string;
  years: string | number;
  date?: string; // YYYY-MM-DD format like roadmap
  description: string;
  skills?: string[];
  // Optional modal fields
  images?: string[];
  links?: {
    title?: string;
    name?: string;
    url: string;
    type?: 'website' | 'github' | 'demo' | 'video' | 'document' | 'other';
  }[];
  sections?: {
    title: string;
    content: string;
  }[];
  tags?: string[];
  achievements?: string[];
  duration?: string;
  team?: (string | {
    name: string;
    role: string;
    responsibilities?: string;
  })[];
  technologies?: string[];
}

interface ProjectsProps {
  theme: "light" | "dark";
}

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'importance'>('importance');
  const [reverse, setReverse] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  // For importance, use the order in the JSON file (default)
  const [originalOrder, setOriginalOrder] = useState<Project[]>([]);

  // Function to get appropriate icon based on project title/content
  const getProjectIcon = (title: string, index: number) => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes('.com')) {
      return '🌐';
    }

    if (titleLower.includes('mcxstudios')) {
      return '🎮';
    } 
    // AI/Medical projects
    if (titleLower.includes('cardiac') || titleLower.includes('cs-m') || titleLower.includes('heart')) {
      return '❤️';
    }
    if (titleLower.includes('physical therapy') || titleLower.includes('i-thanke')) {
      return '🏥';
    }
    if (titleLower.includes('intel') && titleLower.includes('ai')) {
      return '🧠';
    }
    if (titleLower.includes('microsoft') && titleLower.includes('imagine')) {
      return '💻';
    }
    
    // Robotics projects
    if (titleLower.includes('ftc') || titleLower.includes('tech challenge') || titleLower.includes('medusa') || titleLower.includes('astraeus')) {
      return '🤖';
    }
    
    // Learning/Workshop/Mentorship
    if (titleLower.includes('workshop') && titleLower.includes('india')) {
      return '🌍';
    }
    if (titleLower.includes('mentorship') && titleLower.includes('intel')) {
      return '💻';
    }
    if (titleLower.includes('mentorship') && titleLower.includes('microsoft')) {
      return '💼';
    }
    if (titleLower.includes('workshop') || titleLower.includes('mentorship')) {
      return '📚';
    }
    
    // Work/Education
    if (titleLower.includes('internship') || titleLower.includes('tlic') || titleLower.includes('iot')) {
      return '⚙️';
    }
    if (titleLower.includes('teacher') || titleLower.includes('assistant') || titleLower.includes('ta')) {
      return '👨‍🏫';
    }
    
    // Default icons for any remaining projects
    const defaultIcons = ['💻', '⚡', '🛠️', '🚀', '🔬', '⭐', '🎯', '💡', '🔧', '📱'];
    return defaultIcons[index % defaultIcons.length];
  };

  useEffect(() => {
    setLoading(true);
    getProjects()
      .then(data => {
        setProjects(data);
        setOriginalOrder(data);
      })
      .catch((error) => {
        console.error('Error loading projects data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  function parseProjectDate(project: Project): Date {
    // Use the date field if available (YYYY-MM-DD format)
    if (project.date) {
      return new Date(project.date);
    }
    
    // Fallback to parsing years field
    if (!project.years) return new Date(0);
    
    // Convert to string if it's not already
    const yearString = typeof project.years === 'string' ? project.years : project.years.toString();
    
    // Try to get the latest year in the range
    const match = yearString.match(/(\d{4})(?!.*\d{4})/);
    const year = match ? parseInt(match[1], 10) : 0;
    
    // Return date with year only (using January 1st as default)
    return year > 0 ? new Date(year, 0, 1) : new Date(0);
  }

  // Modal functions
  const openModal = (project: Project) => {
    setModalProject(project);
    setModalImgIdx(0);
    setModalOpen(true);
  };

  const getLinkIcon = (type?: string) => {
    switch (type) {
      case 'github': return '📁';
      case 'demo': return '🚀';
      case 'video': return '🎥';
      case 'website': return '🌐';
      case 'document': return '📄';
      default: return '🔗';
    }
  };

  let sortedProjects = [...projects];
  if (sortBy === 'date') {
    sortedProjects.sort((a, b) => parseProjectDate(b).getTime() - parseProjectDate(a).getTime());
  } else if (sortBy === 'title') {
    sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'importance') {
    // Use the original order from JSON
    sortedProjects = [...originalOrder];
  }
  if (reverse) sortedProjects.reverse();

  // Filter by search query
  const filteredProjects = sortedProjects.filter(project => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      (project.years && project.years.toString().toLowerCase().includes(searchLower)) ||
      (project.date && project.date.toLowerCase().includes(searchLower)) ||
      (project.skills && project.skills.some(skill => 
        skill.toLowerCase().includes(searchLower)
      ))
    );
  });

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
                {/* Search and Sort Controls */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
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

                  {/* Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center lg:flex-1">
                    <span className={`text-sm font-medium whitespace-nowrap ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Search:
                    </span>
                    <div className="relative flex-1 w-full lg:max-w-md">
                      <input
                        type="text"
                        placeholder="Search projects, skills, or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full px-4 py-2 pl-10 rounded-lg text-sm border transition-colors ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-400 focus:border-blue-400"
                            : "bg-white text-gray-700 border-gray-300 placeholder-gray-500 focus:border-blue-400"
                        } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                      />
                      <svg 
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full ${
                            theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                          } transition-colors`}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Toggle Skills and View Controls */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
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

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <span className={`text-sm font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Compact View
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={compactView}
                        onChange={() => setCompactView(v => !v)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                        compactView
                          ? (theme === "dark" ? "bg-purple-600" : "bg-purple-500")
                          : (theme === "dark" ? "bg-gray-600" : "bg-gray-300")
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                          compactView ? "translate-x-6" : "translate-x-1"
                        } mt-1`} />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Results Counter */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 text-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span className="text-sm">
                Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} 
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
            </motion.div>
          )}

          {/* Projects Grid */}
          <div className={compactView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-8"}>
            {loading ? (
              // Loading Skeletons
              Array.from({ length: 4 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`animate-pulse ${
                    compactView 
                      ? `p-4 rounded-xl ${
                          theme === "dark"
                            ? "bg-gray-800/50 border border-gray-700"
                            : "bg-white border border-gray-200 shadow-lg"
                        }`
                      : `p-8 rounded-2xl ${
                          theme === "dark"
                            ? "bg-gray-800/50 border border-gray-700"
                            : "bg-white border border-gray-200 shadow-lg"
                        }`
                  }`}
                >
                  {compactView ? (
                    <div className="space-y-2">
                      <div className={`h-5 w-3/4 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                      <div className={`h-3 w-1/2 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                    </div>
                  ) : (
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
                  )}
                </motion.div>
              ))
            ) : compactView ? (
              // Compact Project Cards
              filteredProjects.map((proj, idx) => (
                <motion.div
                  key={`${proj.title}-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                  onClick={() => openModal(proj)}
                  className={`group p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-800/60 border border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                      : "bg-white border border-gray-200 hover:border-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20"
                        : "bg-gradient-to-br from-purple-100 to-blue-100"
                    }`}>
                      <span className="text-lg">
                        {getProjectIcon(proj.title, idx)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`text-sm font-bold truncate group-hover:text-purple-500 transition-colors ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {proj.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded inline-block ${
                    theme === "dark" 
                      ? "bg-gray-700 text-gray-300" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {proj.years}
                  </span>
                </motion.div>
              ))
            ) : (
              // Detailed Project Cards
              filteredProjects.map((proj, idx) => (
                <motion.div
                  key={`${proj.title}-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  onClick={() => openModal(proj)}
                  className={`group p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-[1.02] border-l-4 cursor-pointer ${
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
                          {getProjectIcon(proj.title, idx)}
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

      {/* Project Modal */}
      {modalProject && (
        <ReactModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          className={`fixed inset-4 rounded-lg shadow-xl overflow-hidden z-50 max-w-4xl mx-auto my-8 ${
            theme === "dark" 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          }`}
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40"
        >
          <div className="flex flex-col h-full">
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              theme === "dark" 
                ? "border-gray-700" 
                : "border-gray-200"
            }`}>
              <div>
                <h2 className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {modalProject.title}
                </h2>
                {modalProject.duration && (
                  <p className={`mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Duration: {modalProject.duration}
                  </p>
                )}
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className={`text-2xl transition-colors ${
                  theme === "dark" 
                    ? "text-gray-400 hover:text-gray-200" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Images Gallery */}
              {modalProject.images && modalProject.images.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <img
                      src={modalProject.images[modalImgIdx]}
                      alt={`${modalProject.title} - Image ${modalImgIdx + 1}`}
                      className="w-full max-h-96 object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
                    />
                    {modalProject.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setModalImgIdx(prev => 
                            prev === 0 ? modalProject.images!.length - 1 : prev - 1
                          )}
                          className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                            theme === "dark" 
                              ? "bg-gray-900 bg-opacity-70 text-white hover:bg-opacity-90" 
                              : "bg-white bg-opacity-70 text-gray-900 hover:bg-opacity-90"
                          }`}
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setModalImgIdx(prev => 
                            prev === modalProject.images!.length - 1 ? 0 : prev + 1
                          )}
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                            theme === "dark" 
                              ? "bg-gray-900 bg-opacity-70 text-white hover:bg-opacity-90" 
                              : "bg-white bg-opacity-70 text-gray-900 hover:bg-opacity-90"
                          }`}
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>
                  {modalProject.images.length > 1 && (
                    <div className="flex justify-center mt-3 space-x-2">
                      {modalProject.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setModalImgIdx(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === modalImgIdx 
                              ? (theme === "dark" ? "bg-blue-400" : "bg-blue-600")
                              : (theme === "dark" ? "bg-gray-600" : "bg-gray-300")
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <p className={`leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  {modalProject.description}
                </p>
              </div>

              {/* Technologies */}
              {modalProject.technologies && modalProject.technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm ${
                          theme === "dark" 
                            ? "bg-blue-900 text-blue-200" 
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {modalProject.skills && modalProject.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.skills.map((skill, idx) => (
                      <Badge key={idx} theme={theme}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {modalProject.tags && modalProject.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm ${
                          theme === "dark" 
                            ? "bg-gray-700 text-gray-200" 
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Team */}
              {modalProject.team && modalProject.team.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Team Members
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {modalProject.team.map((member, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                      }`}>
                        <div className="flex items-start space-x-2">
                          <span className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>👤</span>
                          <div className="flex-1">
                            {typeof member === 'string' ? (
                              <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{member}</span>
                            ) : (
                              <>
                                <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                  {member.name}
                                </div>
                                <div className={`text-sm ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                                  {member.role}
                                </div>
                                {member.responsibilities && (
                                  <div className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    {member.responsibilities}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {modalProject.achievements && modalProject.achievements.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Key Achievements
                  </h3>
                  <ul className="space-y-2">
                    {modalProject.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className={`mt-1 ${
                          theme === "dark" ? "text-green-400" : "text-green-600"
                        }`}>🏆</span>
                        <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom Sections */}
              {modalProject.sections && modalProject.sections.length > 0 && (
                <div className="mb-6">
                  {modalProject.sections.map((section, idx) => (
                    <div key={idx} className="mb-6">
                      <h3 className={`text-lg font-semibold mb-3 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {section.title}
                      </h3>
                      <div className={`leading-relaxed whitespace-pre-line ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Links */}
              {modalProject.links && modalProject.links.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Project Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {modalProject.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          theme === "dark" 
                            ? "bg-gray-700 hover:bg-gray-600" 
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-xl">{getLinkIcon(link.type)}</span>
                        <span className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          {link.title || link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Projects;
