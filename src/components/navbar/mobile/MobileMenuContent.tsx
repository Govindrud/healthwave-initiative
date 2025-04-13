
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileDropdown } from "../MobileDropdown";
import { MobileNavItem } from "./MobileNavItem";
import { motion } from "framer-motion";

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
  if (!isOpen) return null;

  const handleNavClick = (handler: () => void) => {
    handler();
    onClose();
  };

  return (
    <motion.div 
      className="fixed top-[4.5rem] right-0 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50 border border-gray-200 max-h-[80vh] overflow-y-auto"
      initial={{ opacity: 0, y: -10, x: 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -10, x: 10 }}
      transition={{ duration: 0.2 }}
      style={{ marginRight: '1rem' }}
    >
      <nav className="flex flex-col space-y-1 p-2">
        <MobileNavItem onClick={() => handleNavClick(() => scrollToSection("hero"))}>
          Home
        </MobileNavItem>
        
        <MobileNavItem onClick={() => handleNavClick(() => scrollToSection("about"))}>
          About
        </MobileNavItem>
        
        <MobileDropdown title="Services">
          <Link to="/services" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">All Services</Link>
          <Link to="/doctors" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Doctor Consultations</Link>
          <Link to="/student-psychologists" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Student Psychologists</Link>
          <Link to="/webinars" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Mental Health Webinars</Link>
          <Link to="/corporate-plans" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Corporate Plans</Link>
          <Link to="/corporate-certification" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Stress-Free Certification</Link>
        </MobileDropdown>
        
        <MobileNavItem onClick={() => handleNavClick(() => scrollToSection("solutions"))}>
          Solutions
        </MobileNavItem>
        
        <MobileDropdown title="Activities">
          <Link to="/adventures" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Stress-Free Adventures</Link>
          <Link to="/games" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Mental Health Games</Link>
        </MobileDropdown>
        
        <MobileNavItem to="/products" onClick={onClose}>
          Products
        </MobileNavItem>
        
        <MobileDropdown title="Spirituality">
          <Link to="/spirituality" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Spiritual Wellness</Link>
          <Link to="/spirituality-new" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Spiritual Services</Link>
          <Link to="/spirituality-new?tab=gurus" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Guru Consultations</Link>
          <Link to="/spirituality-new?tab=travel" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Spiritual Travel</Link>
          <Link to="/spirituality-new?tab=yoga" className="block pl-4 py-3 text-foreground hover:text-meant-600 transition-colors text-sm font-medium">Bhakti Yoga</Link>
        </MobileDropdown>
        
        <MobileNavItem to="/surender" onClick={onClose}>
          Surender
        </MobileNavItem>

        <MobileNavItem to="/de-addiction" onClick={onClose}>
          De-addiction
        </MobileNavItem>
        
        <MobileNavItem onClick={() => handleNavClick(() => scrollToSection("problem"))}>
          Contribute
        </MobileNavItem>
        
        <MobileNavItem onClick={() => handleNavClick(() => scrollToSection("contact"))}>
          Contact
        </MobileNavItem>
        
        <div className="pt-2">
          <Link 
            to="/admin-login" 
            className="block px-4 py-2" 
            onClick={onClose}
          >
            <Button variant="outline" className="text-meant-600 border-meant-600 hover:bg-meant-50 w-full">
              Admin
            </Button>
          </Link>
        </div>
        
        <Link to="/doctors" onClick={onClose}>
          <Button 
            className="bg-meant-600 hover:bg-meant-700 text-white rounded-full hover:shadow-md transition-all w-full mt-2"
          >
            Book Consultation
          </Button>
        </Link>
      </nav>
    </motion.div>
  );
};
