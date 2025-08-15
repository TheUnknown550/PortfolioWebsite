import React from "react";
import ReactModal from "react-modal";
import Badge from "./Badge";

interface Project {
  title: string;
  years: string | number;
  date?: string;
  description: string;
  skills?: string[];
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

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  theme: "light" | "dark";
  modalImgIdx: number;
  setModalImgIdx: (idx: number | ((prev: number) => number)) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  theme,
  modalImgIdx,
  setModalImgIdx
}) => {
  if (!project) return null;

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

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Project Details"
      className={`modal-content ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              {project.title}
            </h2>
            <p className={`text-sm mt-1 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              {project.years} {project.duration && `• ${project.duration}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              theme === "dark" 
                ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Images Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-6">
              <div className="relative">
                <img
                  src={project.images[modalImgIdx]}
                  alt={`${project.title} - Image ${modalImgIdx + 1}`}
                  className="w-full max-h-96 object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
                />
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setModalImgIdx(prev => 
                        prev === 0 ? project.images!.length - 1 : prev - 1
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
                        prev === project.images!.length - 1 ? 0 : prev + 1
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
              {project.images.length > 1 && (
                <div className="flex justify-center mt-3 space-x-2">
                  {project.images.map((_, idx) => (
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
            <p className={`text-base leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              {project.description}
            </p>
          </div>

          {/* Duration */}
          {project.duration && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Duration
              </h3>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {project.duration}
              </p>
            </div>
          )}

          {/* Skills */}
          {project.skills && project.skills.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <Badge key={idx} theme={theme}>{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Technologies Used
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {project.technologies.map((tech, idx) => (
                  <div key={idx} className={`flex items-center space-x-2 p-2 rounded ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                  }`}>
                    <span className="text-sm">⚡</span>
                    <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={`px-2 py-1 text-xs rounded-full ${
                    theme === "dark" 
                      ? "bg-blue-900 text-blue-300" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sections */}
          {project.sections && project.sections.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Project Details
              </h3>
              <div className="space-y-6">
                {project.sections.map((section, idx) => (
                  <div key={idx}>
                    <h4 className={`text-md font-medium mb-2 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}>
                      {section.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          {project.team && project.team.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Team Members
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.team.map((member, idx) => (
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
          {project.achievements && project.achievements.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Key Achievements
              </h3>
              <ul className="space-y-2">
                {project.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>🏆</span>
                    <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Project Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.links.map((link, idx) => (
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
  );
};

export default ProjectModal;
