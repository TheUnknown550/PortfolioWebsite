import React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => (
  <section className={`mb-8 ${className}`}>
    {title && (
      <h2 className="text-xl font-semibold text-purple-700 mb-2 border-b border-purple-200 pb-1">
        {title}
      </h2>
    )}
    <div>{children}</div>
  </section>
);

export default Section;
