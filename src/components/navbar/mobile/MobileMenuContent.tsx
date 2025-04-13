
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileNavItem } from "./MobileNavItem";
import { MobileDropdown } from "../MobileDropdown";

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
      className="fixed top-[4.5rem] left-0 right-0 bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800 
               py-4 px-4 shadow-lg z-50 max-h-[80vh] overflow-y-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <nav className="flex flex-col space-y-1">
        <MobileNavItem onClick={() => scrollToSection("hero")}>
          Home
        </MobileNavItem>
        
        <MobileNavItem onClick={() => scrollToSection("about")}>
          About
        </MobileNavItem>
        
        <MobileDropdown title="Services">
          <MobileNavItem to="/services">All Services</MobileNavItem>
          <MobileNavItem to="/doctors">Book Consultation</MobileNavItem>
          <MobileNavItem to="/corporate-plans">Corporate Plans</MobileNavItem>
          <MobileNavItem to="/hosting">Hosting</MobileNavItem>
        </MobileDropdown>
        
        <MobileNavItem onClick={() => scrollToSection("solutions")}>
          Solutions
        </MobileNavItem>
        
        <MobileDropdown title="Activities">
          <MobileNavItem to="/adventures">Adventures</MobileNavItem>
          <MobileNavItem to="/games">Games</MobileNavItem>
          <MobileNavItem to="/webinars">Webinars</MobileNavItem>
          <MobileNavItem to="/student-psychologists">Student Psychologists</MobileNavItem>
        </MobileDropdown>
        
        <MobileNavItem to="/products">
          Products
        </MobileNavItem>
        
        <MobileDropdown title="Spirituality">
          <MobileNavItem to="/spirituality">Spiritual Guidance</MobileNavItem>
          <MobileNavItem to="/spirituality-new">New Experience</MobileNavItem>
        </MobileDropdown>

        <MobileNavItem to="/surender">
          Surender
        </MobileNavItem>

        <MobileNavItem to="/de-addiction">
          De-addiction
        </MobileNavItem>
        
        <MobileNavItem onClick={() => scrollToSection("problem")}>
          Contribute
        </MobileNavItem>
        
        <MobileNavItem onClick={() => scrollToSection("contact")}>
          Contact
        </MobileNavItem>

        <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
          <Link 
            to="/doctors" 
            className="block w-full py-2.5 px-4 bg-meant-600 hover:bg-meant-700 text-white text-center rounded-md font-medium"
            onClick={onClose}
          >
            Book Consultation
          </Link>
          
          <Link 
            to="/admin-login" 
            className="block w-full mt-2 py-2 px-4 text-meant-600 dark:text-meant-400 border border-meant-600 dark:border-meant-400 text-center rounded-md font-medium"
            onClick={onClose}
          >
            Admin Login
          </Link>
        </div>
      </nav>
    </motion.div>
  );
};
