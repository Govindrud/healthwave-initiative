
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileDropdownProps {
  title: string;
  children: React.ReactNode;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const mobileNavLinkClass = "text-foreground hover:text-meant-600 transition-colors px-4 py-3 rounded-md text-sm font-medium flex items-center";

  return (
    <div className="relative bg-white">
      <button 
        className={`${mobileNavLinkClass} justify-between w-full`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`dropdown-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id={`dropdown-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-2 bg-blue-50 shadow-md rounded-md overflow-hidden z-10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
