
import React from "react";
import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="flex flex-col items-center justify-center p-2 rounded-md border border-gray-300 bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={onClick}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
      style={{ width: '40px', height: '40px' }}
    >
      <motion.div 
        className="w-5 h-0.5 bg-gray-700 dark:bg-gray-300 mb-1"
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
        className="w-5 h-0.5 bg-gray-700 dark:bg-gray-300"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
        className="w-5 h-0.5 bg-gray-700 dark:bg-gray-300 mt-1"
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
};
