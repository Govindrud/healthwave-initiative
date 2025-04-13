
import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  children, 
  onClick, 
  to,
  className = ""
}) => {
  const baseClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium text-center";
  
  // If "to" is provided, render a Link, otherwise render a button
  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClass} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  );
};
