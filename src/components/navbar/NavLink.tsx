
import React from "react";

interface NavLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  to?: string;
  isActive?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  children, 
  onClick, 
  className = "",
  to,
  isActive
}) => {
  const baseClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium text-center";
  const activeClass = isActive ? "text-foreground font-semibold" : "";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${activeClass} ${className}`}
    >
      {children}
    </button>
  );
};
