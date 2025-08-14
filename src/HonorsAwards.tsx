
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

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

const HonorsAwards: React.FC<HonorsAwardsProps> = ({ theme }) => {
  const [honors, setHonors] = useState<Honor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHonor, setModalHonor] = useState<Honor | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => setHonors(data.profile.honors));
  }, []);

    return (
      <div className={
        (theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100") +
        " min-h-[60vh] py-10 px-2 sm:px-6 flex flex-col items-center justify-center w-full"
      }>
        <div className="max-w-3xl w-full mx-auto">
          <h2 className={theme === "dark" ? "text-3xl font-bold text-sky-300 drop-shadow mb-8" : "text-3xl font-bold text-sky-700 drop-shadow mb-8"}>Honors & Awards</h2>
          <div className="w-full flex flex-col gap-6">
            {honors.map((honor, idx) => (
              <button
                key={idx}
                onClick={() => { setModalHonor(honor); setModalOpen(true); setModalImgIdx(0); }}
                className={
                  (theme === "dark"
                    ? "bg-gray-800/90 border-l-8 border-sky-700"
                    : "bg-white/90 border-l-8 border-sky-400") +
                  " rounded-xl shadow-xl flex items-center min-h-[110px] group transition-transform duration-300 hover:scale-[1.025] animate-fadeInSlideUp focus:outline-none px-4 py-3 sm:px-6 sm:py-4"
                }
                style={{ cursor: "pointer", animationDelay: `${idx * 80}ms` }}
              >
                {/* Image left */}
                <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 mr-4">
                  {honor.images && honor.images[0] ? (
                    <img
                      src={honor.images[0]}
                      alt={honor.title}
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-lg shadow group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                {/* Info right */}
                <div className="flex flex-col flex-1 items-start justify-center min-h-[80px]">
                  <span className={theme === "dark" ? "text-lg font-bold text-sky-200 mb-1 text-left" : "text-lg font-bold text-sky-700 mb-1 text-left"}>{honor.title}</span>
                  <span className="text-xs text-gray-400 font-mono mb-1">{honor.year}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Card fade/slide animation */}
        <style>{`
          .animate-fadeInSlideUp {
            animation: fadeInSlideUp 0.7s cubic-bezier(.4,1.4,.6,1) both;
          }
        `}</style>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.3)", zIndex: 50 },
          content: {
            top: "50%", left: "50%", right: "auto", bottom: "auto",
            marginRight: "-50%", transform: "translate(-50%, -50%)",
            borderRadius: "1rem", padding: "0", maxWidth: 800, width: "95%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)", border: "none", overflow: "visible"
          }
        }}
        ariaHideApp={false}
      >
        {modalHonor && (
          <div className="flex flex-col md:flex-row w-full">
            {/* Images section */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
              {modalHonor.images && modalHonor.images.length > 0 && (
                <div className="relative w-full flex justify-center items-center" style={{ minHeight: 280 }}>
                  <button
                    onClick={e => { e.stopPropagation(); setModalImgIdx(idx => (idx - 1 + modalHonor.images!.length) % modalHonor.images!.length); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 shadow focus:outline-none"
                    style={{ zIndex: 2 }}
                    aria-label="Previous image"
                    disabled={modalHonor.images.length < 2}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <img
                    src={modalHonor.images[modalImgIdx]}
                    alt={modalHonor.title + ' image'}
                    className="w-full max-w-xs sm:max-w-md md:max-w-full h-60 sm:h-72 md:h-96 object-contain rounded-lg shadow border"
                    loading="lazy"
                  />
                  <button
                    onClick={e => { e.stopPropagation(); setModalImgIdx(idx => (idx + 1) % modalHonor.images!.length); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 shadow focus:outline-none"
                    style={{ zIndex: 2 }}
                    aria-label="Next image"
                    disabled={modalHonor.images.length < 2}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </div>
            {/* Info section */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
              <h3 className="text-lg font-bold mb-2 text-center">{modalHonor.title}</h3>
              <span className="text-xs text-gray-400 mb-2">{modalHonor.year}</span>
              {modalHonor.eventDescription && (
                <p className="mb-2 text-sm text-center text-black"><b>About the event:</b> {modalHonor.eventDescription}</p>
              )}
              {modalHonor.myExperience && (
                <p className="mb-2 text-sm text-center text-black"><b>My experience:</b> {modalHonor.myExperience}</p>
              )}
              {modalHonor.link && (
                <a
                  href={modalHonor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition mb-2"
                >
                  {modalHonor.link.includes('facebook.com/watch') ? 'Watch Event Video' : 'Visit Event Website'}
                </a>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className="mt-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default HonorsAwards;
