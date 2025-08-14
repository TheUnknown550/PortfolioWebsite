import ReactModal from "react-modal";
// Modal styles for center popup
const modalStyles = {
  overlay: { backgroundColor: "rgba(0,0,0,0.3)", zIndex: 50 },
  content: {
    top: "50%", left: "50%", right: "auto", bottom: "auto",
    marginRight: "-50%", transform: "translate(-50%, -50%)",
    borderRadius: "1rem", padding: "2rem", maxWidth: 480, width: "90%",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)", border: "none"
  }
};

import React, { useEffect, useState } from "react";
import Badge from "./components/Badge";


// Expanded categories to match all possible roadmap categories in data.json
const categories = [
  { label: "Education", value: "education", color: "bg-emerald-100 text-emerald-700", darkColor: "bg-emerald-900 text-emerald-200" },
  { label: "Award", value: "award", color: "bg-yellow-100 text-yellow-700", darkColor: "bg-yellow-900 text-yellow-200" },
  { label: "Competition", value: "competition", color: "bg-pink-100 text-pink-700", darkColor: "bg-pink-900 text-pink-200" },
  { label: "Project", value: "project", color: "bg-sky-100 text-sky-700", darkColor: "bg-sky-900 text-sky-200" },
  { label: "Mentorship", value: "mentorship", color: "bg-purple-100 text-purple-700", darkColor: "bg-purple-900 text-purple-200" },
  { label: "Workshop", value: "workshop", color: "bg-indigo-100 text-indigo-700", darkColor: "bg-indigo-900 text-indigo-200" },
  { label: "Work Experience", value: "work", color: "bg-orange-100 text-orange-700", darkColor: "bg-orange-900 text-orange-200" }
];

// Helper to get label for unknown categories
const getCategoryLabel = (cat: string) => {
  const found = categories.find(c => c.value === cat);
  if (found) return found.label;
  // Fallback: Capitalize first letter
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};

const categoryColor = (cat: string, theme: string) => {
  const found = categories.find(c => c.value === cat);
  if (!found) return theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700";
  return theme === "dark" ? found.darkColor : found.color;
};

interface RoadmapEvent {
  title: string;
  date: string;
  category: string;
  skills?: string[];
  description?: string;
  experience?: string;
  link?: string;
}


interface RoadmapProps {
  theme?: "light" | "dark";
}


const Roadmap: React.FC<RoadmapProps> = ({ theme = "light" }) => {
  const [events, setEvents] = useState<RoadmapEvent[]>([]);
  const [selected, setSelected] = useState(categories.map(c => c.value));
  const [showSkills, setShowSkills] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState<RoadmapEvent | null>(null);

  useEffect(() => {
  fetch("/data.json")
      .then(res => res.json())
      .then(data => setEvents(data.roadmap));
  }, []);

  const filtered = events.filter(e => selected.includes(e.category));

  // Loading skeletons for roadmap
  if (!events || events.length === 0) {
    return (
      <div className={
        theme === "dark"
          ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4 sm:px-6 flex flex-col items-center justify-center"
          : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 flex flex-col items-center justify-center"
      }>
        <div className={
          (theme === "dark"
            ? "max-w-6xl w-full mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700/90 rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-700 "
            : "max-w-6xl w-full mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100/80 rounded-3xl shadow-2xl p-6 md:p-12 border border-blue-100 ") +
          " relative"
        }>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-4 z-20 relative">
            <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-2" />
            <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
            {categories.map((cat, i) => (
              <span key={i} className="h-8 w-28 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
          <div className="relative min-h-[40rem] max-h-[60rem] overflow-y-auto space-y-10 px-2 md:px-8 pb-8 z-10 pt-32 md:pt-0">
            {/* Timeline vertical line skeleton */}
            <div className="hidden md:block absolute left-8 top-0 h-full w-1 z-0 bg-gradient-to-b from-sky-200 via-blue-100 to-sky-200/60 dark:from-sky-900 dark:via-gray-700 dark:to-sky-900/60" style={{ borderRadius: '0.5rem' }}></div>
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="relative pl-12 py-6 rounded-xl shadow z-10 w-full mb-4">
                <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-sky-200 dark:bg-sky-900 animate-pulse" />
                <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-800 mb-2 animate-pulse" />
                <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-700 mb-2 animate-pulse" />
                <div className="flex gap-2 mt-2">
                  {[...Array(3)].map((_, j) => (
                    <span key={j} className="h-6 w-16 rounded bg-sky-100 dark:bg-sky-900 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={
      theme === "dark"
        ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4 sm:px-6 flex flex-col items-center justify-center"
        : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 flex flex-col items-center justify-center"
    }>
      <div className={
        (theme === "dark"
          ? "max-w-6xl w-full mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700/90 rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-700 "
          : "max-w-6xl w-full mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100/80 rounded-3xl shadow-2xl p-6 md:p-12 border border-blue-100 ") +
        " relative"
      }>
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-4 z-20 relative">
          <h2 className={
            theme === "dark"
              ? "text-2xl font-bold text-sky-300"
              : "text-2xl font-bold text-purple-800"
          }>My Roadmap</h2>
          {/* Styled switch for Show Hard Skills */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className={theme === "dark" ? "text-gray-200 text-sm" : "text-gray-700 text-sm"}>Show Hard Skills</span>
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
  <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
    {categories.map(cat => (
      <label
        key={cat.value}
        className={
          (theme === "dark"
            ? "flex items-center gap-2 text-gray-200"
            : "flex items-center gap-2 text-gray-700") +
          " px-3 py-2 rounded-lg shadow-sm border cursor-pointer transition-all duration-200 " +
          (selected.includes(cat.value)
            ? (theme === "dark"
                ? "bg-sky-900 border-sky-700 scale-105"
                : "bg-sky-100 border-sky-400 scale-105")
            : (theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"))
        }
      >
        <input
          type="checkbox"
          checked={selected.includes(cat.value)}
          onChange={() => setSelected(selected => selected.includes(cat.value) ? selected.filter(v => v !== cat.value) : [...selected, cat.value])}
          className="accent-sky-500 w-4 h-4 rounded focus:ring-2 focus:ring-sky-400"
        />
        <span className="font-semibold text-sm">{cat.label}</span>
      </label>
    ))}
  </div>
  <div className="relative min-h-[40rem] max-h-[60rem] overflow-y-auto space-y-10 px-2 md:px-8 pb-8 z-10 pt-32 md:pt-0">
          {/* Timeline vertical line */}
          <div className={
            "hidden md:block absolute left-8 top-0 h-full w-1 z-0 " +
            (theme === "dark" ? "bg-gradient-to-b from-sky-900 via-gray-700 to-sky-900/60" : "bg-gradient-to-b from-sky-200 via-blue-100 to-sky-200/60")
          } style={{ borderRadius: '0.5rem' }}></div>
          {filtered.length > 0 ? (
            filtered
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event, idx) => (
                <button
                  key={idx}
                  className={
                    "relative pl-12 py-6 rounded-xl shadow transition-all duration-300 z-10 w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 " +
                    (theme === "dark"
                      ? "bg-gray-900/70 hover:bg-gray-800/90 border border-gray-800"
                      : "bg-white/80 hover:bg-blue-50 border border-blue-100")
                  }
                  onClick={() => { setModalEvent(event); setModalOpen(true); }}
                  tabIndex={0}
                >
                  <div className={
                    "absolute left-4 top-8 w-4 h-4 rounded-full border-2 shadow-lg z-20 " +
                    (theme === "dark" ? "bg-sky-900 border-sky-700" : "bg-sky-200 border-sky-400")
                  }></div>
                  <div className={"font-semibold flex items-center gap-2 mb-1"}>
                    <span className={"px-2 py-1 rounded-full text-xs font-semibold shadow-sm " + categoryColor(event.category, theme)}>
                      {getCategoryLabel(event.category)}
                    </span>
                    <span className={theme === "dark" ? "text-sky-200" : "text-sky-700"}>{event.title}</span>
                  </div>
                  <div className={theme === "dark" ? "text-gray-400 text-xs mb-2" : "text-gray-500 text-xs mb-2"}>{new Date(event.date).toLocaleDateString()}</div>
                  {showSkills && event.skills && event.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-400 mr-2">Hard Skills:</span>
                      {event.skills.map((skill: string, i: number) => (
                        <Badge key={i} color={theme === "dark" ? "bg-sky-900 text-sky-200" : "bg-sky-100 text-sky-700"}>{skill}</Badge>
                      ))}
                    </div>
                  )}
                </button>
              ))
          ) : (
            <div className={theme === "dark" ? "flex items-center justify-center h-full text-gray-400" : "flex items-center justify-center h-full text-gray-500"}>No events in selected categories.</div>
          )}
        </div>
        {/* Modal for event details */}
        <ReactModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={modalStyles}
          ariaHideApp={false}
        >
          {modalEvent ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={"px-2 py-1 rounded-full text-xs font-semibold shadow-sm " + categoryColor(modalEvent.category, theme)}>
                  {getCategoryLabel(modalEvent.category)}
                </span>
                <span className={theme === "dark" ? "text-sky-200 font-bold text-lg" : "text-sky-700 font-bold text-lg"}>{modalEvent.title}</span>
              </div>
              <div className={theme === "dark" ? "text-gray-400 text-xs mb-2" : "text-gray-500 text-xs mb-2"}>{new Date(modalEvent.date).toLocaleDateString()}</div>
              {modalEvent.skills && modalEvent.skills.length > 0 && (
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-400 mr-2">Hard Skills:</span>
                  {modalEvent.skills.map((skill: string, i: number) => (
                    <Badge key={i} color={theme === "dark" ? "bg-sky-900 text-sky-200" : "bg-sky-100 text-sky-700"}>{skill}</Badge>
                  ))}
                </div>
              )}
              {modalEvent.description && (
                <div className={theme === "dark" ? "text-gray-200 mb-2" : "text-gray-700 mb-2"}>{modalEvent.description}</div>
              )}
              {modalEvent.experience && (
                <div className={theme === "dark" ? "text-gray-300 italic" : "text-gray-600 italic"}>{modalEvent.experience}</div>
              )}
              {modalEvent.link && (
                <a
                  href={modalEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 mb-2 px-4 py-2 rounded bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition"
                >
                  View Related Video / Article
                </a>
              )}
              <button
                className={"mt-2 px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition w-full"}
                onClick={() => setModalOpen(false)}
              >Close</button>
            </div>
          ) : null}

        </ReactModal>
      </div>
    </div>
  );
}

export default Roadmap;
