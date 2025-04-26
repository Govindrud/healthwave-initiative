
import React from "react";
import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <button
      className="relative w-10 h-10 flex flex-col justify-center items-center rounded-md focus:outline-none"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="w-8 h-8 flex flex-col justify-center items-center">
        <motion.span
          className="w-6 h-0.5 bg-primary rounded-full block transition-all"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 2 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-primary rounded-full block my-1.5 transition-all"
          animate={{
            opacity: isOpen ? 0 : 1,
            width: isOpen ? 0 : 24,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-primary rounded-full block transition-all"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -2 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </button>
  );
};
