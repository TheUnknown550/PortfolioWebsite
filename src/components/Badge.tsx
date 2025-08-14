import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  theme?: "light" | "dark";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color, 
  theme = "light", 
  className = "" 
}) => {
  const defaultColor = theme === "dark" ? "bg-sky-900 text-sky-200" : "bg-sky-100 text-sky-700";
  const finalColor = color || defaultColor;
  
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-2 mb-2 ${finalColor} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
