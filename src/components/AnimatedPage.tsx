import React from "react";

interface AnimatedPageProps {
  children: React.ReactNode;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  return (
    <div className="animate-fadeInSlideUp min-h-[60vh]">
      {children}
    </div>
  );
};

export default AnimatedPage;
