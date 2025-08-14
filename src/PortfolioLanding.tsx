
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
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // If no contact section, we can open a contact modal or navigate
                    alert("Contact form coming soon! Please email me directly for now.");
                  }
                }}
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

      {/* Honor Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        appElement={document.getElementById('root') || undefined}
      >
        {modalHonor && (
          <div className="text-white">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {modalHonor.title}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-2xl p-2"
              >
                ×
              </button>
            </div>

            {/* Content Grid: Images Left, Text Right */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Images */}
              {modalHonor.images && modalHonor.images.length > 0 && (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={modalHonor.images[modalImgIdx]}
                      alt={`${modalHonor.title} - Image ${modalImgIdx + 1}`}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    {modalHonor.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setModalImgIdx(Math.max(0, modalImgIdx - 1))}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          disabled={modalImgIdx === 0}
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setModalImgIdx(Math.min(modalHonor.images!.length - 1, modalImgIdx + 1))}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          disabled={modalImgIdx === modalHonor.images.length - 1}
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>
                  {modalHonor.images.length > 1 && (
                    <div className="flex justify-center space-x-2">
                      {modalHonor.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setModalImgIdx(idx)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            idx === modalImgIdx ? 'bg-purple-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Right Column - Text Content */}
              <div className="space-y-6">
                {/* Event Description */}
                {modalHonor.eventDescription && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-purple-300">Event Description</h3>
                    <p className="text-gray-300 leading-relaxed">{modalHonor.eventDescription}</p>
                  </div>
                )}

                {/* My Experience */}
                {modalHonor.myExperience && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-300">My Experience</h3>
                    <p className="text-gray-300 leading-relaxed">{modalHonor.myExperience}</p>
                  </div>
                )}

                {/* Year Badge */}
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    {modalHonor.year}
                  </span>
                </div>

                {/* Link */}
                {modalHonor.link && (
                  <div className="pt-4 border-t border-purple-500/30">
                    <a
                      href={modalHonor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span>Learn More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default PortfolioLanding;
