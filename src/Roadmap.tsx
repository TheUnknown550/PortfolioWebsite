import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactModal from "react-modal";
import Button from "./components/Button";
import Badge from "./components/Badge";

interface RoadmapEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  skills?: string[];
}

interface RoadmapProps {
  theme?: "light" | "dark";
}

const categories = [
  { value: "education", label: "Education", icon: "🎓" },
  { value: "award", label: "Awards", icon: "🏆" },
  { value: "achievement", label: "Achievements", icon: "🥇" },
  { value: "project", label: "Projects", icon: "🚀" },
  { value: "competition", label: "Competitions", icon: "🏅" },
  { value: "workshop", label: "Workshops", icon: "🎯" },
  { value: "mentorship", label: "Mentorship", icon: "🤝" },
  { value: "work", label: "Work Experience", icon: "💼" },
  { value: "volunteer", label: "Volunteer", icon: "👥" },
  { value: "skill", label: "Skills", icon: "🛠️" },
  { value: "experience", label: "Experience", icon: "�" }
];

const getCategoryInfo = (cat: string) => 
  categories.find(c => c.value === cat) || { label: cat, icon: "📋" };

const categoryColor = (cat: string, theme: string) => {
  const colors: Record<string, string> = {
    education: theme === "dark" ? "bg-blue-600/20 text-blue-300 border-blue-600/30" : "bg-blue-100 text-blue-700 border-blue-200",
    award: theme === "dark" ? "bg-yellow-600/20 text-yellow-300 border-yellow-600/30" : "bg-yellow-100 text-yellow-700 border-yellow-200",
    achievement: theme === "dark" ? "bg-green-600/20 text-green-300 border-green-600/30" : "bg-green-100 text-green-700 border-green-200",
    project: theme === "dark" ? "bg-purple-600/20 text-purple-300 border-purple-600/30" : "bg-purple-100 text-purple-700 border-purple-200",
    competition: theme === "dark" ? "bg-orange-600/20 text-orange-300 border-orange-600/30" : "bg-orange-100 text-orange-700 border-orange-200",
    workshop: theme === "dark" ? "bg-cyan-600/20 text-cyan-300 border-cyan-600/30" : "bg-cyan-100 text-cyan-700 border-cyan-200",
    mentorship: theme === "dark" ? "bg-emerald-600/20 text-emerald-300 border-emerald-600/30" : "bg-emerald-100 text-emerald-700 border-emerald-200",
    work: theme === "dark" ? "bg-slate-600/20 text-slate-300 border-slate-600/30" : "bg-slate-100 text-slate-700 border-slate-200",
    volunteer: theme === "dark" ? "bg-pink-600/20 text-pink-300 border-pink-600/30" : "bg-pink-100 text-pink-700 border-pink-200",
    skill: theme === "dark" ? "bg-indigo-600/20 text-indigo-300 border-indigo-600/30" : "bg-indigo-100 text-indigo-700 border-indigo-200",
    experience: theme === "dark" ? "bg-teal-600/20 text-teal-300 border-teal-600/30" : "bg-teal-100 text-teal-700 border-teal-200"
  };
  return colors[cat] || (theme === "dark" ? "bg-gray-600/20 text-gray-300 border-gray-600/30" : "bg-gray-100 text-gray-700 border-gray-200");
};

const Roadmap: React.FC<RoadmapProps> = ({ theme = "light" }) => {
  const [events, setEvents] = useState<RoadmapEvent[]>([]);
  const [selected, setSelected] = useState(categories.map(c => c.value));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState<RoadmapEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        setEvents(data.roadmap || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Helper function to parse dates and sort chronologically (most recent first)
  const sortEventsByDate = (events: RoadmapEvent[]) => {
    return events.sort((a, b) => {
      // Parse dates - handle various formats like "2023", "March 2023", "2023-03", etc.
      const parseDate = (dateStr: string): Date => {
        // Try different date parsing approaches
        if (/^\d{4}$/.test(dateStr)) {
          // Just year: "2023"
          return new Date(parseInt(dateStr), 11, 31); // December 31st of that year
        } else if (/^\d{4}-\d{2}$/.test(dateStr)) {
          // Year-month: "2023-03"
          const [year, month] = dateStr.split('-');
          return new Date(parseInt(year), parseInt(month) - 1, 31);
        } else {
          // Try to parse as regular date
          const date = new Date(dateStr);
          return isNaN(date.getTime()) ? new Date(0) : date;
        }
      };

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      
      // Sort in descending order (most recent first)
      return dateB.getTime() - dateA.getTime();
    });
  };

  const filtered = sortEventsByDate(events.filter(e => selected.includes(e.category)));

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
    }`}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-green-400/10 to-blue-400/10 blur-xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className={`bg-gradient-to-r ${
              theme === "dark"
                ? "from-blue-400 via-purple-400 to-green-400"
                : "from-blue-600 via-purple-500 to-green-600"
            } bg-clip-text text-transparent`}>
              My Journey
            </span>
          </h1>
          
          <p className={`text-sm sm:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto px-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            <span className="hidden sm:inline">A timeline of my professional growth, achievements, and learning experiences</span>
            <span className="sm:hidden">Professional growth and achievements timeline</span>
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-12"
          >
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
              theme === "dark" ? "border-blue-400" : "border-blue-600"
            }`} />
          </motion.div>
        ) : (
          <>
            {/* Filter Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 lg:mb-12"
            >
              <div className={`p-6 rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-800/40 backdrop-blur-lg border border-gray-700"
                  : "bg-white/40 backdrop-blur-lg border border-gray-200"
              }`}>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {categories.map((category) => {
                    const isSelected = selected.includes(category.value);
                    return (
                      <Button
                        key={category.value}
                        onClick={() => {
                          setSelected(prev => 
                            isSelected 
                              ? prev.filter(c => c !== category.value)
                              : [...prev, category.value]
                          );
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium border-2 transform ${
                          isSelected
                            ? theme === "dark"
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-400 shadow-xl shadow-blue-500/50 scale-105 ring-2 ring-blue-400/50"
                              : "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-400 shadow-xl shadow-blue-500/50 scale-105 ring-2 ring-blue-400/50"
                            : theme === "dark"
                              ? "bg-gray-800/60 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500 hover:scale-102 hover:shadow-lg"
                              : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-white hover:border-gray-400 hover:scale-102 hover:shadow-lg"
                        }`}
                      >
                        <span>{category.icon}</span>
                        <span className="hidden sm:inline">{category.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    No events match your current filters
                  </p>
                </div>
              ) : (
                <div className="space-y-8 lg:space-y-12 relative">
                  {/* Timeline Line */}
                  <div className={`absolute left-4 lg:left-8 top-0 bottom-0 w-0.5 ${
                    theme === "dark" 
                      ? "bg-gradient-to-b from-blue-400 via-purple-400 to-green-400" 
                      : "bg-gradient-to-b from-blue-600 via-purple-500 to-green-600"
                  }`} />
                  
                  {filtered.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative pl-12 lg:pl-16"
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-2 lg:left-6 top-6 w-4 h-4 rounded-full border-2 ${
                        theme === "dark"
                          ? "bg-gray-900 border-blue-400"
                          : "bg-white border-blue-600"
                      }`} />
                      
                      {/* Event Card */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gray-800/60 backdrop-blur-lg border border-gray-700 hover:bg-gray-800/80 hover:shadow-xl hover:shadow-blue-500/10"
                            : "bg-white/60 backdrop-blur-lg border border-gray-200 hover:bg-white/80 hover:shadow-xl hover:shadow-blue-500/10"
                        }`}
                        onClick={() => {
                          setModalEvent(event);
                          setModalOpen(true);
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className={`text-lg lg:text-xl font-bold mb-2 ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                              {event.title}
                            </h3>
                            <p className={`text-sm ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {event.date}
                            </p>
                          </div>
                          
                          <Badge className={categoryColor(event.category, theme)}>
                            <span className="mr-1">{getCategoryInfo(event.category).icon}</span>
                            {getCategoryInfo(event.category).label}
                          </Badge>
                        </div>
                        
                        <p className={`text-sm lg:text-base mb-4 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {event.description}
                        </p>
                        
                        {event.skills && event.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {event.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span
                                key={`${event.id}-skill-${skillIndex}`}
                                className={`px-3 py-1 text-xs rounded-full ${
                                  theme === "dark"
                                    ? "bg-blue-600/20 text-blue-300 border border-blue-600/30"
                                    : "bg-blue-100 text-blue-700 border border-blue-200"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                            {event.skills.length > 3 && (
                              <span className={`px-3 py-1 text-xs rounded-full ${
                                theme === "dark" ? "text-gray-400" : "text-gray-600"
                              }`}>
                                +{event.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* Modal */}
        <ReactModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          appElement={document.getElementById('root') || undefined}
          className={`fixed inset-4 lg:inset-20 rounded-2xl p-6 lg:p-8 overflow-auto ${
            theme === "dark"
              ? "bg-gray-900 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          {modalEvent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {modalEvent.title}
                  </h2>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {modalEvent.date}
                  </p>
                </div>
                
                <Button
                  onClick={() => setModalOpen(false)}
                  className={`p-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  ✕
                </Button>
              </div>
              
              <div className="flex-1 space-y-6">
                <div>
                  <Badge className={categoryColor(modalEvent.category, theme)}>
                    <span className="mr-1">{getCategoryInfo(modalEvent.category).icon}</span>
                    {getCategoryInfo(modalEvent.category).label}
                  </Badge>
                </div>
                
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Description
                  </h3>
                  <p className={`text-sm lg:text-base ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {modalEvent.description}
                  </p>
                </div>
                
                {modalEvent.skills && modalEvent.skills.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {modalEvent.skills.map((skill, index) => (
                        <span
                          key={`modal-${modalEvent.id}-skill-${index}`}
                          className={`px-3 py-2 text-sm rounded-lg ${
                            theme === "dark"
                              ? "bg-blue-600/20 text-blue-300 border border-blue-600/30"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </ReactModal>
      </div>
    </div>
  );
};

export default Roadmap;
