
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface MobileNavItemProps {
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MobileNavItem: React.FC<MobileNavItemProps> = ({ 
  to, 
  children, 
  onClick,
  className = ""
}) => {
  const { t } = useTranslation();
  const baseClass = "flex items-center py-2 px-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors";
  const combinedClass = `${baseClass} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={combinedClass} onClick={onClick}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={combinedClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default MobileNavItem;
