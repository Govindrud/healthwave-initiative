
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileNavigation } from "./MobileNavigation";

interface MobileMenuContentProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  isOpen,
  onClose,
  scrollToSection
}) => {
  return (
    <motion.div
      className="fixed inset-0 top-[56px] z-50 bg-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-56px)] bg-white mobile-menu-container">
        <MobileNavigation onClose={onClose} scrollToSection={scrollToSection} />
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <Link to="/spirituality" className="w-full block mb-3">
            <button className="w-full py-3 px-4 bg-meant-600 text-white rounded-md font-medium">
              Spiritual Services
            </button>
          </Link>
          
          <Link to="/doctors" className="w-full">
            <button className="w-full py-3 px-4 bg-meant-600 text-white rounded-md font-medium">
              Book Consultation
            </button>
          </Link>
          
          <Link to="/admin-login" className="w-full mt-3">
            <button className="w-full py-3 px-4 border border-meant-600 text-meant-600 rounded-md font-medium">
              Admin Login
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
