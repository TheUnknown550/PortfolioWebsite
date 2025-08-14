import React from "react";
import { Link, useLocation } from "react-router-dom";

interface AnimatedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, children, className = "", onClick }) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      onClick={onClick}
      className={
        className +
        (location.pathname === to
          ? " animate-tabPop "
          : "")
      }
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
