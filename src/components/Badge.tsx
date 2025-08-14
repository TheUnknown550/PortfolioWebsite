import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = "bg-purple-100 text-purple-800" }) => (
  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-2 mb-2 ${color}`}>{children}</span>
);

export default Badge;
