import React from "react";
import { motion } from "framer-motion";
import ReactModal from "react-modal";
import Button from "./components/Button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, theme = "light" }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
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
              onClick={onClose}
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
  );
};

export default ContactModal;
