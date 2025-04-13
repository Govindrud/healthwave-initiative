
import React from "react";
import { Link } from "react-router-dom";

interface MobileNavItemProps {
  to?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const MobileNavItem: React.FC<MobileNavItemProps> = ({
  to,
  onClick,
  className = "",
  children
}) => {
  const baseClass = "text-foreground hover:text-meant-600 transition-colors px-4 py-3 rounded-md text-sm font-medium";
  
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
