
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactModal from "react-modal";
import Button from "./components/Button";
import { getHonors } from "./utils/dataLoader";

interface Honor {
  title: string;
  year: number;
  link?: string;
  images?: string[];
  eventDescription?: string;
  myExperience?: string;
}

interface HonorsAwardsProps {
  theme: "light" | "dark";
}

// Function to get appropriate icon based on award title
const getAwardIcon = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('intel')) return '🧠'; // Brain for AI/Intel
  if (lowerTitle.includes('microsoft')) return '💻'; // Computer for Microsoft
  if (lowerTitle.includes('regeneron') || lowerTitle.includes('isef')) return '🔬'; // Science for ISEF
  if (lowerTitle.includes('apicta') || lowerTitle.includes('ict')) return '📱'; // Mobile for ICT
  if (lowerTitle.includes('science') || lowerTitle.includes('tysf')) return '⚗️'; // Chemistry for science
  if (lowerTitle.includes('prime minister')) return '🎯'; // Target for PM award
  if (lowerTitle.includes('hackathon') || lowerTitle.includes('medchic')) return '⚡'; // Lightning for hackathon
  if (lowerTitle.includes('cabling') || lowerTitle.includes('interlink')) return '🔌'; // Plug for cabling
  if (lowerTitle.includes('robotics') || lowerTitle.includes('ftc')) return '🤖'; // Robot for FTC
  if (lowerTitle.includes('gold') || lowerTitle.includes('first place')) return '🥇'; // Gold medal
  if (lowerTitle.includes('runner') || lowerTitle.includes('second')) return '🥈'; // Silver medal
  if (lowerTitle.includes('finalist') || lowerTitle.includes('third')) return '🥉'; // Bronze medal
  
  return '🏆'; // Default trophy
};

const HonorsAwards: React.FC<HonorsAwardsProps> = ({ theme }) => {
  const [honors, setHonors] = useState<Honor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHonor, setModalHonor] = useState<Honor | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sorting state
  const [sortBy, setSortBy] = useState<'year' | 'title' | 'importance'>('importance');
  const [reverse, setReverse] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<Honor[]>([]);

  useEffect(() => {
    setLoading(true);
    getHonors()
      .then(data => {
        setHonors(data);
        setOriginalOrder(data);
      })
      .catch((error) => {
        console.error('Error loading honors data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Sorting logic
  let sortedHonors = [...honors];
  if (sortBy === 'year') {
    sortedHonors.sort((a, b) => b.year - a.year);
  } else if (sortBy === 'title') {
    sortedHonors.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'importance') {
    // Use the original order from JSON
    sortedHonors = [...originalOrder];
  }
  if (reverse) sortedHonors.reverse();

  // Filter by search query
  const filteredHonors = sortedHonors.filter(honor => {
    const searchLower = searchQuery.toLowerCase();
    return (
      honor.title.toLowerCase().includes(searchLower) ||
      honor.year.toString().includes(searchLower) ||
      (honor.eventDescription && honor.eventDescription.toLowerCase().includes(searchLower)) ||
      (honor.myExperience && honor.myExperience.toLowerCase().includes(searchLower))
    );
  });

  const openModal = (honor: Honor) => {
    setModalHonor(honor);
    setModalImgIdx(0);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          theme === "dark" 
            ? "bg-gradient-to-br from-gray-900 via-slate-900 to-amber-900" 
            : "bg-gradient-to-br from-yellow-50 via-white to-orange-50"
        }`}>
          {/* Floating Trophy Elements */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute text-2xl ${
                theme === "dark" ? "text-yellow-400/20" : "text-yellow-500/20"
              }`}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              {['🏆', '🥇', '⭐', '🎖️', '👑'][i % 5]}
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
                  ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700/50" 
                  : "bg-yellow-100 text-yellow-700 border border-yellow-200"
              }`}
            >
              <span className="text-lg sm:text-xl">�</span>
              <span className="hidden sm:inline">Recognition & Achievements</span>
              <span className="sm:hidden">Awards</span>
            </motion.div>
            
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <span className="block sm:inline">Honors &{" "}</span>
              <span className={`bg-gradient-to-r ${
                theme === "dark" 
                  ? "from-yellow-400 to-orange-400" 
                  : "from-yellow-600 to-orange-600"
              } bg-clip-text text-transparent`}>
                Awards
              </span>
            </h1>
            
            <p className={`text-sm sm:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto px-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              <span className="hidden sm:inline">Recognition for excellence, innovation, and contributions to the field</span>
              <span className="sm:hidden">Professional recognition and achievements</span>
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
                            ? "bg-gray-700 text-gray-200 border-gray-600 focus:border-yellow-400"
                            : "bg-white text-gray-700 border-gray-300 focus:border-yellow-400"
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as 'year' | 'title' | 'importance')}
                      >
                        <option value="importance">Importance</option>
                        <option value="year">Year (Latest)</option>
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
                        placeholder="Search awards, year, or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full px-4 py-2 pl-10 rounded-lg text-sm border transition-colors ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-400 focus:border-yellow-400"
                            : "bg-white text-gray-700 border-gray-300 placeholder-gray-500 focus:border-yellow-400"
                        } focus:outline-none focus:ring-2 focus:ring-yellow-400/20`}
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
                Found {filteredHonors.length} award{filteredHonors.length !== 1 ? 's' : ''} 
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
            </motion.div>
          )}

          {/* Awards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loading ? (
              // Loading Skeletons
              Array.from({ length: 6 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl animate-pulse ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-lg"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`h-8 w-8 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                      <div className={`h-4 w-16 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                    </div>
                    <div className={`h-6 w-3/4 rounded ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`} />
                    <div className={`h-16 w-full rounded ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`} />
                  </div>
                </motion.div>
              ))
            ) : (
              // Award Cards
              filteredHonors.map((honor, idx) => (
                <motion.div
                  key={`${honor.title}-${honor.year}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className={`group p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer relative ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10"
                      : "bg-white border border-gray-200 hover:border-yellow-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10"
                  }`}
                  onClick={() => openModal(honor)}
                >
                  {/* Award Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 sm:p-3 rounded-full ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
                        : "bg-gradient-to-br from-yellow-100 to-orange-100"
                    }`}>
                      <span className="text-xl sm:text-2xl">
                        {getAwardIcon(honor.title)}
                      </span>
                    </div>
                    <span className={`text-xs sm:text-sm font-mono px-2 py-1 rounded ${
                      theme === "dark" 
                        ? "bg-gray-700 text-gray-300" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {honor.year}
                    </span>
                  </div>

                  {/* Award Title */}
                  <h3 className={`text-base sm:text-lg font-bold mb-3 group-hover:text-yellow-500 transition-colors break-words ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {honor.title}
                  </h3>

                  {/* Award Description Preview */}
                  {honor.eventDescription && (
                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`} style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {honor.eventDescription}
                    </p>
                  )}

                  {/* View Details Button */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      theme={theme}
                      size="sm"
                      className="group-hover:bg-yellow-500/10 group-hover:text-yellow-500"
                    >
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">Details</span>
                    </Button>
                    
                    {honor.images && honor.images.length > 0 && (
                      <div className={`flex items-center gap-1 text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {honor.images.length}
                      </div>
                    )}
                  </div>

                  {/* External Link Indicator */}
                  {honor.link && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Stats Section */}
          {!loading && sortedHonors.length > 0 && (
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
                  {sortedHonors.length} Awards & Recognitions
                </span>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-400"></div>
                <span className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-yellow-300" : "text-yellow-600"
                }`}>
                  Professional Excellence
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {/* Modern Award Detail Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: { 
            backgroundColor: "rgba(0,0,0,0.8)", 
            zIndex: 60, 
            backdropFilter: "blur(8px)"
          },
          content: {
            top: "50%", 
            left: "50%", 
            right: "auto", 
            bottom: "auto",
            marginRight: "-50%", 
            transform: "translate(-50%, -50%)",
            borderRadius: "1.5rem", 
            padding: "0", 
            maxWidth: "90vw", 
            maxHeight: "90vh",
            width: "100%",
            border: "none", 
            overflow: "hidden",
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            boxShadow: theme === 'dark' 
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.8)" 
              : "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          }
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        {modalHonor && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full max-h-[90vh] overflow-auto"
          >
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 px-4 sm:px-6 py-4 border-b backdrop-blur-lg ${
              theme === "dark"
                ? "bg-gray-900/90 border-gray-700"
                : "bg-white/90 border-gray-200"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
                      : "bg-gradient-to-br from-yellow-100 to-orange-100"
                  }`}>
                    <span className="text-lg">{getAwardIcon(modalHonor.title)}</span>
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {modalHonor.title}
                    </h3>
                    <p className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {modalHonor.year}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="icon"
                  theme={theme}
                  onClick={() => setModalOpen(false)}
                  className="flex-shrink-0"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Images Gallery */}
                {modalHonor.images && modalHonor.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                        <img
                          src={modalHonor.images[modalImgIdx]}
                          alt={`${modalHonor.title} - Image ${modalImgIdx + 1}`}
                          className="w-full h-full object-contain cursor-zoom-in transition-transform hover:scale-105"
                          onClick={() => setZoomOpen(true)}
                        />
                      </div>
                      
                      {modalHonor.images.length > 1 && (
                        <>
                          <Button
                            variant="icon"
                            theme={theme}
                            onClick={() => setModalImgIdx(idx => (idx - 1 + modalHonor.images!.length) % modalHonor.images!.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-none"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </Button>
                          
                          <Button
                            variant="icon"
                            theme={theme}
                            onClick={() => setModalImgIdx(idx => (idx + 1) % modalHonor.images!.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-none"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Button>
                        </>
                      )}
                      
                      {modalHonor.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {modalImgIdx + 1} / {modalHonor.images.length}
                        </div>
                      )}
                    </div>
                    
                    {/* Thumbnails */}
                    {modalHonor.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {modalHonor.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setModalImgIdx(idx)}
                            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                              idx === modalImgIdx
                                ? "border-yellow-500 ring-2 ring-yellow-500/20"
                                : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Award Details */}
                <div className="space-y-6">
                  {/* Description */}
                  {modalHonor.eventDescription && (
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 uppercase tracking-wide ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        About the Event
                      </h4>
                      <p className={`text-sm leading-relaxed ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {modalHonor.eventDescription}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {modalHonor.myExperience && (
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 uppercase tracking-wide ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        My Experience
                      </h4>
                      <p className={`text-sm leading-relaxed ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {modalHonor.myExperience}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {modalHonor.link && (
                      <Button
                        variant="primary"
                        theme={theme}
                        onClick={() => window.open(modalHonor.link, '_blank', 'noopener,noreferrer')}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {modalHonor.link.includes('facebook.com/watch') ? 'Watch Video' : 'Visit Website'}
                      </Button>
                    )}
                    
                    <Button
                      variant="secondary"
                      theme={theme}
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </ReactModal>

      {/* Fullscreen Image Zoom Modal */}
      {modalHonor?.images && modalHonor.images.length > 0 && (
        <ReactModal
          isOpen={zoomOpen}
          onRequestClose={() => setZoomOpen(false)}
          style={{
            overlay: { 
              backgroundColor: "rgba(0,0,0,0.95)", 
              zIndex: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            content: {
              position: "relative",
              top: "auto",
              left: "auto",
              right: "auto",
              bottom: "auto",
              margin: 0,
              border: "none",
              background: "transparent",
              padding: "2rem",
              borderRadius: 0,
              overflow: "visible",
              maxWidth: "95vw",
              maxHeight: "95vh"
            }
          }}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative flex flex-col items-center"
          >
            <img
              src={modalHonor.images[modalImgIdx]}
              alt={`${modalHonor.title} - Fullscreen`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            <div className="flex items-center gap-4 mt-6">
              {modalHonor.images.length > 1 && (
                <Button
                  variant="icon"
                  theme="dark"
                  onClick={() => setModalImgIdx(idx => (idx - 1 + modalHonor.images!.length) % modalHonor.images!.length)}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
              )}
              
              <Button
                variant="primary"
                theme="dark"
                onClick={() => setZoomOpen(false)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                Close
              </Button>
              
              {modalHonor.images.length > 1 && (
                <Button
                  variant="icon"
                  theme="dark"
                  onClick={() => setModalImgIdx(idx => (idx + 1) % modalHonor.images!.length)}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              )}
            </div>
            
            {modalHonor.images.length > 1 && (
              <div className="mt-2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                {modalImgIdx + 1} / {modalHonor.images.length}
              </div>
            )}
          </motion.div>
        </ReactModal>
      )}
    </div>
  );
};

export default HonorsAwards;
