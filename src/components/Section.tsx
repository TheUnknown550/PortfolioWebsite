import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-purple-700 mb-2 border-b border-purple-200 pb-1">{title}</h2>
    <div>{children}</div>
  </section>
);

export default Section;
