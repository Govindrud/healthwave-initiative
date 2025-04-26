
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileDropdownProps {
  title: string;
  children: React.ReactNode;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const mobileNavLinkClass = "text-foreground hover:text-primary transition-colors px-4 py-3 rounded-md text-base font-medium flex items-center";

  return (
    <div className="relative border-b border-gray-100 last:border-0"> 
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
            className="bg-gray-50 rounded-md overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1 pl-4 border-l-2 border-primary/20 ml-4 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
