import React from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, theme = "light" }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className={
          (theme === "dark"
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-white text-gray-900 border-blue-200") +
          " rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-slideUp outline-none border"
        }
        onClick={e => e.stopPropagation()}
        tabIndex={0}
        aria-label="Contact options"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-400 hover:text-sky-500 focus:outline-none"
          aria-label="Close contact modal"
        >
          ×
        </button>
        <h2 id="contact-modal-title" className="text-2xl font-bold mb-4 text-center">Contact Me</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span role="img" aria-label="Email" className="text-xl">📧</span>
            <a href="mailto:mattcosh06@gmail.com" className="underline hover:text-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400" tabIndex={0}>mattcosh06@gmail.com</a>
          </div>
          <div className="flex items-center gap-3">
            <span role="img" aria-label="LinkedIn" className="text-xl">💼</span>
            <a href="https://www.linkedin.com/in/matt-cosh-a55125269/" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400" tabIndex={0}>linkedin.com/in/matt-cosh-a55125269</a>
          </div>
          <div className="flex items-center gap-3">
            <span role="img" aria-label="GitHub" className="text-xl">🐙</span>
            <a href="https://github.com/TheUnknown550" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400" tabIndex={0}>github.com/TheUnknown550</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-center text-gray-400">All links are keyboard accessible.</div>
      </div>
    </div>
  );
};

export default ContactModal;
