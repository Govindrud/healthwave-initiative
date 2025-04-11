
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MobileDropdownProps {
  title: string;
  children: React.ReactNode;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const mobileNavLinkClass = "text-foreground hover:text-meant-600 transition-colors px-4 py-3 rounded-md text-sm font-medium flex items-center";

  return (
    <div className="relative">
      <button 
        className={`${mobileNavLinkClass} justify-between w-full`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-meant-100 pl-2">
          {children}
        </div>
      )}
    </div>
  );
};
