
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
  const baseClass = "block w-full text-left text-foreground hover:text-primary transition-colors px-4 py-2.5 rounded-md text-base font-medium";
  
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
      className={`${baseClass} ${className} w-full text-left`}
    >
      {children}
    </button>
  );
};
