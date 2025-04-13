
import React from "react";
import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="hamburger-button text-foreground p-2 rounded-md hover:bg-accent flex flex-col items-center justify-center shadow-md border border-meant-200"
      onClick={onClick}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
      style={{ 
        width: '40px', 
        height: '40px', 
        background: isOpen ? 'rgba(2, 132, 199, 0.2)' : 'rgba(255, 255, 255, 0.9)',
        zIndex: 100
      }}
    >
      <motion.div 
        className="hamburger-line mb-1 bg-meant-700"
        style={{ width: '20px', height: '2px' }}
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
        className="hamburger-line bg-meant-700"
        style={{ width: '20px', height: '2px' }}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
        className="hamburger-line mt-1 bg-meant-700"
        style={{ width: '20px', height: '2px' }}
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
};
