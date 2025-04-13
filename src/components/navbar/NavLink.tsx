
import React from "react";

interface NavLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  children, 
  onClick, 
  className = ""
}) => {
  const baseClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium text-center";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  );
};
