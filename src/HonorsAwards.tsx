
import React, { useEffect, useState } from "react";

interface Honor {
  title: string;
  year: number;
  link?: string;
  image?: string;
}

interface HonorsAwardsProps {
  theme: "light" | "dark";
}

const HonorsAwards: React.FC<HonorsAwardsProps> = ({ theme }) => {
  const [honors, setHonors] = useState<Honor[]>([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then(res => res.json())
      .then(data => setHonors(data.profile.honors));
  }, []);

  return (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className={theme === "dark" ? "text-2xl font-bold text-sky-300 mb-6" : "text-2xl font-bold text-purple-800 mb-6"}>Honors & Awards</h2>
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {honors.map((honor, idx) => (
          <a
            key={idx}
            href={honor.link}
            target="_blank"
            rel="noopener noreferrer"
            className={
              (theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-sky-100") +
              " rounded-xl p-3 sm:p-4 shadow flex flex-col items-center transition-colors duration-200 group min-h-[180px]"
            }
          >
            {honor.image && (
              <img
                src={honor.image}
                alt={honor.title}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2 sm:mb-3 rounded-lg shadow group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            )}
            <span className="text-base font-semibold text-center mb-1 line-clamp-2">{honor.title}</span>
            <span className="text-xs text-gray-400">{honor.year}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HonorsAwards;
