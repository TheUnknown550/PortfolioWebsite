
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import Section from "./components/Section";
import Badge from "./components/Badge";
import ProfilePhoto from "./components/ProfilePhoto";
import Button from "./components/Button";

interface Project {
  title: string;
  years: string;
  description: string;
  skills?: string[];
}

interface Honor {
  title: string;
  year: number;
  link?: string;
  image?: string;
  images?: string[];
  eventDescription?: string;
  myExperience?: string;
}

interface ProfileData {
  name: string;
  bio: string;
  education: { institution: string; program: string; year: number; gpa: number }[];
  skills: { hard: string[]; soft: string[]; languages: string[] };
  honors: Honor[];
  projects: Project[];
}

interface PortfolioLandingProps {
  theme?: "light" | "dark";
}

const PortfolioLanding: React.FC<PortfolioLandingProps> = ({ theme = "light" }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  // Modal state for honors
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHonor, setModalHonor] = useState<Honor | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const roles = [
    "AI Developer 🤖",
    "Engineering Student & Innovator 🚀", 
    "Full-Stack Developer 💻",
    "Tech Entrepreneur 🚀",
    "IoT Developer 📡"
  ];

  // Typewriter effect
  useEffect(() => {
    let currentCharIndex = 0;
    let isDeleting = false;
    
    const typeWriter = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        setTypedText(currentRole.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        setTypedText(currentRole.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentRole.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        }
      }
    };

    const interval = setInterval(typeWriter, isDeleting ? 50 : 100);
    return () => clearInterval(interval);
  }, [currentRoleIndex]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setProfile(data.profile));
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <motion.div 
            className={`w-20 h-20 rounded-full border-4 ${
              theme === "dark" ? "border-sky-500/30" : "border-blue-500/30"
            } border-t-transparent`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💫
            </motion.span>
          </div>
        </div>
      </div>
    );
  }

  const skillTabs = [
    { name: "Technical", icon: "💻", skills: profile.skills.hard },
    { name: "Soft Skills", icon: "🧠", skills: profile.skills.soft },
    { name: "Languages", icon: "🌍", skills: profile.skills.languages }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          theme === "dark" 
            ? "bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900" 
            : "bg-gradient-to-br from-blue-50 via-white to-sky-100"
        }`}>
          {/* Floating Elements */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                theme === "dark" ? "bg-sky-400/20" : "bg-blue-400/20"
              }`}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                    theme === "dark" 
                      ? "bg-sky-900/30 text-sky-300 border border-sky-700/50" 
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⭐
                  </motion.span>
                  Welcome to my portfolio
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Hi, I'm{" "}
                  <span className={`bg-gradient-to-r ${
                    theme === "dark" 
                      ? "from-sky-400 to-blue-400" 
                      : "from-blue-600 to-sky-600"
                  } bg-clip-text text-transparent`}>
                    {profile.name}
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8"
                >
                  <div className={`text-xl sm:text-2xl mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                    I'm a{" "}
                    <span className={`font-semibold min-h-[1.5em] inline-block ${
                      theme === "dark" ? "text-sky-300" : "text-blue-600"
                    }`}>
                      {typedText}
                      <motion.span 
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        |
                      </motion.span>
                    </span>
                  </div>
                  <p className={`text-lg leading-relaxed max-w-2xl ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {profile.bio}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    variant="primary" 
                    theme={theme} 
                    className="group relative overflow-hidden"
                    onClick={() => navigate('/projects')}
                  >
                    <span className="relative z-10">View My Work</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                  <Button 
                    variant="outline" 
                    theme={theme}
                    onClick={() => {
                      // For now, show an alert - we can add CV file later
                      alert("CV download will be available soon! For now, please contact me directly.");
                    }}
                  >
                    Download CV 📄
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Column - Profile Photo */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Animated Rings */}
                  <motion.div
                    className={`absolute inset-0 rounded-full border-4 ${
                      theme === "dark" ? "border-sky-400/30" : "border-blue-400/30"
                    }`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transform: "scale(1.1)" }}
                  />
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${
                      theme === "dark" ? "border-blue-400/20" : "border-sky-400/20"
                    }`}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ transform: "scale(1.2)" }}
                  />
                  
                  <div className={`relative rounded-full p-2 ${
                    theme === "dark" 
                      ? "bg-gradient-to-br from-sky-500/20 to-blue-500/20" 
                      : "bg-gradient-to-br from-blue-100 to-sky-100"
                  } shadow-2xl`}>
                    <ProfilePhoto
                      src="/profile.png"
                      alt={profile.name}
                      className="w-64 h-64 sm:w-80 sm:h-80 rounded-full shadow-xl"
                    />
                  </div>

                  {/* Floating Skills */}
                  {["AI/ML", "React", "Python", "IoT"].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className={`absolute ${
                        index === 0 ? "-top-4 -right-4" :
                        index === 1 ? "-bottom-4 -left-4" :
                        index === 2 ? "top-1/4 -left-8" :
                        "bottom-1/4 -right-8"
                      }`}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 2 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Badge theme={theme} className="text-xs font-medium shadow-lg">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <Section className="py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl sm:text-5xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Skills & Expertise
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                A comprehensive toolkit for modern development and infrastructure
              </p>
            </motion.div>

            {/* Skill Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {skillTabs.map((tab, index) => (
                <motion.button
                  key={tab.name}
                  onClick={() => setActiveSkillTab(index)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSkillTab === index
                      ? theme === "dark"
                        ? "bg-sky-600 text-white shadow-lg shadow-sky-500/25"
                        : "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </motion.button>
              ))}
            </div>

            {/* Skills Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {skillTabs[activeSkillTab].skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gray-800/50 border border-gray-700 hover:border-sky-500/50"
                        : "bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className={`font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}>
                      {skill}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Section>

        {/* Education & Experience Section */}
        <Section className="py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <span className="text-2xl">🎓</span>
                Education
              </h3>
              {profile.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="mb-6 last:mb-0"
                >
                  <div className={`font-semibold text-lg ${
                    theme === "dark" ? "text-sky-300" : "text-blue-600"
                  }`}>
                    {edu.institution}
                  </div>
                  <div className={`text-base mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}>
                    {edu.program}
                  </div>
                  <div className={`text-sm flex gap-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <span>📅 {edu.year}</span>
                    <span>📊 GPA: {edu.gpa}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <span className="text-2xl">💼</span>
                Key Projects
              </h3>
              {profile.projects.slice(0, 3).map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="mb-6 last:mb-0"
                >
                  <div className={`font-semibold text-lg ${
                    theme === "dark" ? "text-sky-300" : "text-blue-600"
                  }`}>
                    {project.title}
                  </div>
                  <div className={`text-sm mb-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {project.years}
                  </div>
                  <div className={`text-base mb-3 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}>
                    {project.description}
                  </div>
                  {project.skills && (
                    <div className="flex flex-wrap gap-2">
                      {project.skills.slice(0, 3).map((skill, idx) => (
                        <Badge 
                          key={idx} 
                          theme={theme}
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Honors Section */}
        <Section className="py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 flex items-center justify-center gap-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <span className="text-3xl">🏆</span>
                Honors & Awards
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {profile.honors.map((honor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700 hover:border-yellow-500/50"
                      : "bg-white border border-gray-200 hover:border-yellow-300 shadow-sm hover:shadow-md"
                  }`}
                  onClick={() => {
                    setModalHonor(honor);
                    setModalImgIdx(0);
                    setModalOpen(true);
                  }}
                >
                  <div className="flex items-start gap-4">
                    {honor.images && honor.images.length > 0 && (
                      <img 
                        src={honor.images[0]} 
                        alt={honor.title} 
                        className="w-12 h-12 object-cover rounded-lg" 
                      />
                    )}
                    <div className="flex-1">
                      <div className={`font-semibold ${
                        theme === "dark" ? "text-yellow-300" : "text-yellow-600"
                      }`}>
                        {honor.title}
                      </div>
                      <div className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {honor.year}
                      </div>
                      <div className={`text-xs mt-2 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-600"
                      }`}>
                        Click to view details
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* View All Awards Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button
                variant="outline"
                theme={theme}
                onClick={() => navigate('/honors')}
                className="px-6 py-3"
              >
                View All Awards 🏆
              </Button>
            </motion.div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`max-w-4xl mx-auto text-center p-12 rounded-2xl ${
              theme === "dark"
                ? "bg-gradient-to-br from-sky-900/50 to-blue-900/50 border border-sky-700/50"
                : "bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200"
            }`}
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Let's Build Something Amazing Together
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Ready to transform your ideas into scalable, robust solutions? Let's discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                theme={theme} 
                className="text-lg px-8 py-4"
                onClick={() => setContactModalOpen(true)}
              >
                Get In Touch 📧
              </Button>
              <Button 
                variant="outline" 
                theme={theme} 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/projects')}
              >
                View All Projects 🚀
              </Button>
            </div>
          </motion.div>
        </Section>
      </div>

      {/* Honor Modal - Using same style as HonorsAwards page */}
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
                    <span className="text-lg">🏆</span>
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

      {/* Modern Contact Modal */}
      <ReactModal
        isOpen={contactModalOpen}
        onRequestClose={() => setContactModalOpen(false)}
        style={{
          overlay: { 
            backgroundColor: "rgba(0,0,0,0.8)", 
            zIndex: 70, 
            backdropFilter: "blur(10px)"
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
            maxWidth: "600px", 
            maxHeight: "90vh",
            width: "100%",
            border: "none", 
            overflow: "hidden",
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            boxShadow: theme === 'dark' 
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.2)" 
              : "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)",
          }
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full h-full max-h-[90vh] overflow-auto"
        >
          {/* Modal Header */}
          <div className={`sticky top-0 z-10 px-6 py-4 border-b backdrop-blur-lg ${
            theme === "dark"
              ? "bg-gray-900/90 border-gray-700"
              : "bg-white/90 border-gray-200"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                    : "bg-gradient-to-br from-blue-100 to-purple-100"
                }`}>
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Get In Touch
                  </h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Let's discuss your next project
                  </p>
                </div>
              </div>
              
              <Button
                variant="icon"
                theme={theme}
                onClick={() => setContactModalOpen(false)}
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
          <div className="p-6">
            {/* Contact Info Cards */}
            <div className="grid gap-4 mb-6">
              <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                  : "bg-gray-50 border-gray-200 hover:border-blue-300"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                  }`}>
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      Email
                    </h4>
                    <a 
                      href="mailto:mattcosh06@gmail.com"
                      className={`text-sm hover:underline ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      mattcosh06@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                  : "bg-gray-50 border-gray-200 hover:border-purple-300"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
                  }`}>
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      LinkedIn
                    </h4>
                    <a 
                      href="https://www.linkedin.com/in/matt-cosh-a55125269/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm hover:underline ${
                        theme === "dark" ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      Connect with me
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700 hover:border-green-500/50"
                  : "bg-gray-50 border-gray-200 hover:border-green-300"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    theme === "dark" ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      GitHub
                    </h4>
                    <a 
                      href="https://github.com/TheUnknown550"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm hover:underline ${
                        theme === "dark" ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      View my projects
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="space-y-4">
              <h4 className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Let's connect!
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  theme={theme}
                  onClick={() => {
                    window.open('mailto:mattcosh06@gmail.com?subject=Project Inquiry&body=Hi Matt,%0D%0A%0D%0AI would like to discuss a project with you.%0D%0A%0D%0ABest regards,');
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </Button>
                
                <Button
                  variant="outline"
                  theme={theme}
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/matt-cosh-a55125269/', '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>

              <p className={`text-xs text-center pt-2 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}>
                I typically respond within 24 hours
              </p>
            </div>
          </div>
        </motion.div>
      </ReactModal>
    </div>
  );
};

export default PortfolioLanding;
