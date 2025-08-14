
import React, { useEffect, useState } from "react";
import ContactModal from "./ContactModal";
import Section from "./components/Section";
import Badge from "./components/Badge";
import ProfilePhoto from "./components/ProfilePhoto";

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
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setProfile(data.profile));
  }, []);

  if (!profile) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
  <div className={
      theme === "dark"
        ? "flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen px-4 sm:px-6"
        : "flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen px-4 sm:px-6"
    }>
      <style>{`
        @keyframes bounce-few {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-20%); }
          40% { transform: translateY(0); }
          60% { transform: translateY(-10%); }
          80% { transform: translateY(0); }
        }
      `}</style>
      {/* Script to trigger bounce every 2.5 minutes, 3 times */}
      <script dangerouslySetInnerHTML={{__html: `
        (function bounceContactBtn() {
          let count = 0;
          function bounce() {
            const btn = document.getElementById('contact-bounce-btn');
            if (btn) {
              btn.style.animation = 'bounce-few 1s 1';
              setTimeout(() => { btn.style.animation = ''; }, 1100);
            }
            count++;
            if (count < 3) setTimeout(bounce, 2000);
          }
          setInterval(() => {
            count = 0;
            bounce();
          }, 150000); // 2.5 minutes
        })();
      `}} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} theme={theme} />

      <div className={
        theme === "dark"
              ? "max-w-2xl w-full bg-gray-900/90 rounded-2xl shadow-xl p-8 mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center border border-gray-700"
          : "max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl p-8 mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center border border-blue-100"
      }>
        <ProfilePhoto src="/profile.png" alt={profile.name} className="mb-4 sm:mb-0" />
        <div className="flex flex-col items-center sm:items-start w-full">
          <h1 className={
            theme === "dark"
              ? "text-3xl font-bold mb-2 text-sky-300 drop-shadow text-center sm:text-left"
              : "text-3xl font-bold mb-2 text-sky-700 drop-shadow text-center sm:text-left"
          }>{profile.name}</h1>
          <p className={theme === "dark" ? "mb-4 text-gray-200 text-center sm:text-left" : "mb-4 text-gray-600 text-center sm:text-left"}>{profile.bio}</p>
          <a href="/roadmap" className={
            theme === "dark"
              ? "inline-block px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-800 transition shadow"
              : "inline-block px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500 transition shadow"
          }>View My Roadmap</a>
        </div>
      </div>
      <div className={
        theme === "dark"
          ? "max-w-2xl w-full bg-gray-900/90 rounded-2xl shadow-xl p-8 border border-gray-700 mx-auto"
          : "max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100 mx-auto"
      }>
        <Section title="Education">
          {profile.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className={theme === "dark" ? "font-semibold text-sky-300" : "font-semibold text-sky-700"}>{edu.institution}</div>
              <div className={theme === "dark" ? "text-gray-200 text-sm" : "text-gray-600 text-sm"}>{edu.program}</div>
              <div className={theme === "dark" ? "text-xs text-gray-400" : "text-xs text-gray-400"}>Year: {edu.year} | GPA: {edu.gpa}</div>
            </div>
          ))}
        </Section>
        <Section title="Skills">
          <div className="mb-2">
            <div className={theme === "dark" ? "font-semibold text-sky-300 mb-1" : "font-semibold text-sky-700 mb-1"}>Hard Skills</div>
            {profile.skills.hard.map((skill, i) => (
              <Badge key={i} color={theme === "dark" ? "bg-sky-900 text-sky-200" : "bg-sky-100 text-sky-700"}>{skill}</Badge>
            ))}
          </div>
          <div className="mb-2">
            <div className={theme === "dark" ? "font-semibold text-sky-300 mb-1" : "font-semibold text-sky-700 mb-1"}>Soft Skills</div>
            {profile.skills.soft.map((skill, i) => (
              <Badge key={i} color={theme === "dark" ? "bg-blue-900 text-blue-200" : "bg-blue-50 text-blue-600"}>{skill}</Badge>
            ))}
          </div>
          <div>
            <div className={theme === "dark" ? "font-semibold text-sky-300 mb-1" : "font-semibold text-sky-700 mb-1"}>Languages</div>
            {profile.skills.languages.map((lang, i) => (
              <Badge key={i} color={theme === "dark" ? "bg-green-900 text-green-200" : "bg-green-50 text-green-600"}>{lang}</Badge>
            ))}
          </div>
        </Section>
        <Section title="Honors & Awards">
          <ul className={theme === "dark" ? "list-none text-gray-200" : "list-none text-gray-600"}>
            {profile.honors.map((honor, i) => (
              <li key={i} className="flex items-center gap-3 mb-2">
                {honor.image && (
                  <img src={honor.image} alt={honor.title} className="w-8 h-8 object-contain rounded" />
                )}
                {honor.link ? (
                  <a href={honor.link} target="_blank" rel="noopener noreferrer" className={theme === "dark" ? "text-sky-300 hover:underline" : "text-sky-700 hover:underline"}>
                    {honor.title} <span className="text-xs text-gray-400">[{honor.year}]</span>
                  </a>
                ) : (
                  <span>{honor.title} <span className="text-xs text-gray-400">[{honor.year}]</span></span>
                )}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Projects & Experiences">
          {profile.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className={theme === "dark" ? "font-semibold text-sky-300" : "font-semibold text-sky-700"}>{proj.title} <span className="text-xs text-gray-400">[{proj.years}]</span></div>
              <div className={theme === "dark" ? "text-gray-200 text-sm" : "text-gray-600 text-sm"}>{proj.description}</div>
              {proj.skills && proj.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-400 mr-2">Hard Skills:</span>
                  {proj.skills.map((skill: string, idx: number) => (
                    <Badge key={idx} color={theme === "dark" ? "bg-sky-900 text-sky-200" : "bg-sky-100 text-sky-700"}>{skill}</Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default PortfolioLanding;
