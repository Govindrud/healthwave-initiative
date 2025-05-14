
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileDropdownProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({ 
  title, 
  children,
  initiallyOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full py-3 px-4 text-left font-medium text-foreground"
      >
        <span>{title}</span>
        {isOpen ? 
          <ChevronUp size={18} className="text-meant-600" /> : 
          <ChevronDown size={18} className="text-meant-600" />
        }
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
