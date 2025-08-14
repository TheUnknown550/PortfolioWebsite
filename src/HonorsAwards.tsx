
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
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHonor, setModalHonor] = useState<Honor | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  
  // Sorting state
  const [sortBy, setSortBy] = useState<'year' | 'title' | 'importance'>('importance');
  const [reverse, setReverse] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<Honor[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        setHonors(data.profile.honors);
        setOriginalOrder(data.profile.honors);
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

    return (
      <div className={
        (theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100") +
        " min-h-[60vh] py-10 px-2 sm:px-6 flex flex-col items-center justify-center w-full"
      }>
        <div className="max-w-3xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h2 className={theme === "dark" ? "text-3xl font-bold text-sky-300 drop-shadow" : "text-3xl font-bold text-sky-700 drop-shadow"}>Honors & Awards</h2>
            <div className="flex flex-row gap-3 items-center">
              <div className={
                (theme === "dark"
                  ? "bg-gray-800 border border-sky-700"
                  : "bg-white border border-sky-300") +
                " rounded-xl px-4 py-2 flex flex-row items-center gap-3 shadow-md transition-all duration-300"
              }>
                <span className={theme === "dark" ? "text-sky-300 font-semibold" : "text-sky-700 font-semibold"}>
                  <svg className="inline w-5 h-5 mr-1 -mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
                  Sort:
                </span>
                <select
                  className={
                    (theme === "dark"
                      ? "bg-gray-900 text-sky-200 border-sky-700"
                      : "bg-blue-50 text-sky-700 border-sky-300") +
                    " rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 border"
                  }
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'year' | 'title' | 'importance')}
                >
                  <option value="year">Year (Newest)</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="importance">Default</option>
                </select>
                <button
                  className={
                    "ml-2 px-2 py-1 rounded-full border flex items-center transition-all duration-200 " +
                    (reverse
                      ? (theme === "dark" ? "bg-sky-700 text-white border-sky-700" : "bg-sky-400 text-white border-sky-400")
                      : (theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-700" : "bg-gray-200 text-gray-700 border-gray-200"))
                  }
                  onClick={() => setReverse(r => !r)}
                  title="Reverse order"
                >
                  <svg className={"w-4 h-4 mr-1 transition-transform duration-200 " + (reverse ? "rotate-180" : "")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  {reverse ? 'Reverse' : 'Normal'}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className={
                    (theme === "dark"
                      ? "bg-gray-800/90 border-l-8 border-sky-700"
                      : "bg-white/90 border-l-8 border-sky-400") +
                    " rounded-xl shadow-xl flex items-center min-h-[110px] animate-pulse px-4 py-3 sm:px-6 sm:py-4"
                  }
                >
                  <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 mr-4">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  </div>
                  <div className="flex flex-col flex-1 items-start justify-center min-h-[80px]">
                    <div className={theme === "dark" ? "bg-sky-900 h-5 w-32 mb-2 rounded" : "bg-sky-200 h-5 w-32 mb-2 rounded"}></div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-3 w-16 rounded" />
                  </div>
                </div>
              ))
            ) : (
              sortedHonors.map((honor, idx) => (
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
                  {/* Only show first image in card */}
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
              ))
            )}
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
          overlay: { backgroundColor: "rgba(0,0,0,0.7)", zIndex: 60, transition: 'background 0.3s' },
          content: {
            top: "50%", left: "50%", right: "auto", bottom: "auto",
            marginRight: "-50%", transform: "translate(-50%, -50%)",
            borderRadius: "1rem", padding: "0", maxWidth: 900, width: "98%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)", border: "none", overflow: "visible",
            background: theme === 'dark' ? '#181f2a' : '#fff',
            transition: 'background 0.3s',
          }
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={() => {
          setTimeout(() => {
            const el = document.getElementById('gallery-modal-img');
            if (el) el.focus();
          }, 100);
        }}
      >
        {modalHonor && (
          <div className="flex flex-col md:flex-row w-full animate-fadeInSlideUp" tabIndex={-1}
            onKeyDown={e => {
              if (e.key === 'ArrowLeft') setModalImgIdx(idx => (idx - 1 + (modalHonor.images?.length || 1)) % (modalHonor.images?.length || 1));
              if (e.key === 'ArrowRight') setModalImgIdx(idx => (idx + 1) % (modalHonor.images?.length || 1));
              if (e.key === 'Escape') setModalOpen(false);
            }}
          >
            {/* Images section */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
              {modalHonor.images && modalHonor.images.length > 0 && (
                <>
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
                      id="gallery-modal-img"
                      src={modalHonor.images[modalImgIdx]}
                      alt={modalHonor.title + ' image'}
                      className="w-full max-w-xs sm:max-w-md md:max-w-full h-60 sm:h-72 md:h-96 object-contain rounded-lg shadow border outline-none cursor-zoom-in"
                      loading="lazy"
                      tabIndex={0}
                      style={{ transition: 'opacity 0.3s, transform 0.3s' }}
                      onClick={() => setZoomOpen(true)}
                      onTouchStart={e => (e.currentTarget as any)._swipeX = e.touches[0].clientX}
                      onTouchEnd={e => {
                        const startX = (e.currentTarget as any)._swipeX;
                        const endX = e.changedTouches[0].clientX;
                        if (startX !== undefined && Math.abs(endX - startX) > 40) {
                          if (endX < startX) setModalImgIdx(idx => (idx + 1) % modalHonor.images!.length);
                          else setModalImgIdx(idx => (idx - 1 + modalHonor.images!.length) % modalHonor.images!.length);
                        }
                      }}
                    />
                    {/* Image counter */}
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded shadow">
                      {modalImgIdx + 1} / {modalHonor.images.length}
                    </span>
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
                  {/* Thumbnails row */}
                  <div className="flex gap-2 mt-4 justify-center w-full flex-wrap">
                    {modalHonor.images.map((img, thumbIdx) => (
                      <img
                        key={thumbIdx}
                        src={img}
                        alt={modalHonor.title + ' thumbnail'}
                        className={
                          "h-12 w-12 object-cover rounded border cursor-pointer transition-all duration-200 " +
                          (thumbIdx === modalImgIdx ? "border-sky-500 ring-2 ring-sky-400" : "border-gray-300 hover:border-sky-400")
                        }
                        style={{ opacity: thumbIdx === modalImgIdx ? 1 : 0.7 }}
                        onClick={() => setModalImgIdx(thumbIdx)}
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setModalImgIdx(thumbIdx); } }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* Info section */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
              <h3 className={
                `text-lg font-bold mb-2 text-center ` +
                (theme === 'dark' ? 'text-sky-200' : 'text-sky-700')
              }>{modalHonor.title}</h3>
              <span className="text-xs text-gray-400 mb-2">{modalHonor.year}</span>
              {modalHonor.eventDescription && (
                <p className={
                  `mb-2 text-sm text-center ` +
                  (theme === 'dark' ? 'text-sky-200' : 'text-sky-700')
                }><b>About the event:</b> {modalHonor.eventDescription}</p>
              )}
              {modalHonor.myExperience && (
                <p className={
                  `mb-2 text-sm text-center ` +
                  (theme === 'dark' ? 'text-sky-200' : 'text-sky-700')
                }><b>My experience:</b> {modalHonor.myExperience}</p>
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
            {/* Zoomed lightbox modal */}
            {typeof window !== 'undefined' && window.document && modalHonor.images && modalHonor.images.length > 0 && (
              zoomOpen && (
                <ReactModal
                  isOpen={zoomOpen}
                  onRequestClose={() => setZoomOpen(false)}
                  style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.95)", zIndex: 70 },
                    content: {
                      top: "50%", left: "50%", right: "auto", bottom: "auto",
                      marginRight: "-50%", transform: "translate(-50%, -50%)",
                      borderRadius: "1rem", padding: 0, maxWidth: 1200, width: "98%",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.35)", border: "none", background: 'transparent', overflow: 'visible',
                    }
                  }}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick={true}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <img
                      src={modalHonor.images[modalImgIdx]}
                      alt={modalHonor.title + ' zoomed'}
                      className="max-h-[80vh] w-auto rounded-lg shadow-2xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-900"
                      style={{ transition: 'opacity 0.3s, transform 0.3s' }}
                    />
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => setModalImgIdx(idx => (idx - 1 + modalHonor.images!.length) % modalHonor.images!.length)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                        aria-label="Previous image"
                        disabled={modalHonor.images.length < 2}
                      >
                        &#8592;
                      </button>
                      <button
                        onClick={() => setZoomOpen(false)}
                        className="px-4 py-2 bg-sky-500 text-white rounded-full text-lg font-bold hover:bg-sky-600"
                        aria-label="Close zoom"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => setModalImgIdx(idx => (idx + 1) % modalHonor.images!.length)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                        aria-label="Next image"
                        disabled={modalHonor.images.length < 2}
                      >
                        &#8594;
                      </button>
                    </div>
                    <span className="mt-2 text-white text-xs bg-black/60 px-2 py-1 rounded">{modalImgIdx + 1} / {modalHonor.images.length}</span>
                  </div>
                </ReactModal>
              )
            )}
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default HonorsAwards;
