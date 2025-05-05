
import React from "react";
import { Link } from "react-router-dom";

interface MobileNavItemProps {
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, children, onClick }) => {
  const baseClass = "flex items-center py-2 px-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors";
  
  if (to) {
    return (
      <Link to={to} className={baseClass} onClick={onClick}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={baseClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default MobileNavItem;
