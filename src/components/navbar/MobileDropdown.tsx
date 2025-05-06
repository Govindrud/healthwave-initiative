
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MobileDropdownProps {
  title: string;
  children: React.ReactNode;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full py-3 px-4 text-left font-medium"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      <div className={`px-4 pb-3 space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
};
