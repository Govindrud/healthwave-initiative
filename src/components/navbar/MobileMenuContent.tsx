
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileDropdown } from "./MobileDropdown";
import { motion } from "framer-motion";

interface MobileMenuContentProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage: boolean;
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({ 
  isOpen, 
  onClose,
  isHomePage 
}) => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    onClose();
    
    if (isHomePage) {
      // If we're on the home page, scroll to the section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to home page with hash
      navigate(`/#${id}`);
    }
  };

  const mobileNavLinkClass = "text-foreground hover:text-meant-600 transition-colors px-4 py-3 rounded-md text-sm font-medium";

  if (!isOpen) return null;

  return (
    <motion.div 
      className="mobile-menu-container absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <nav className="flex flex-col space-y-1">
        <button
          onClick={() => scrollToSection("hero")}
          className={mobileNavLinkClass}
        >
          Home
        </button>
        
        <button
          onClick={() => scrollToSection("about")}
          className={mobileNavLinkClass}
        >
          About
        </button>
        
        <MobileDropdown title="Services">
          <Link to="/services" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>All Services</Link>
          <Link to="/doctors" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Doctor Consultations</Link>
          <Link to="/student-psychologists" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Student Psychologists</Link>
          <Link to="/webinars" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Mental Health Webinars</Link>
          <Link to="/corporate-plans" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Corporate Plans</Link>
          <Link to="/corporate-certification" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Stress-Free Certification</Link>
        </MobileDropdown>
        
        <button
          onClick={() => scrollToSection("solutions")}
          className={mobileNavLinkClass}
        >
          Solutions
        </button>
        
        <MobileDropdown title="Activities">
          <Link to="/adventures" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Stress-Free Adventures</Link>
          <Link to="/games" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Mental Health Games</Link>
        </MobileDropdown>
        
        <Link 
          to="/products" 
          className={mobileNavLinkClass}
          onClick={onClose}
        >
          Products
        </Link>
        
        <MobileDropdown title="Spirituality">
          <Link to="/spirituality" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Spiritual Wellness</Link>
          <Link to="/spirituality-new" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Spiritual Services</Link>
          <Link to="/spirituality-new?tab=gurus" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Guru Consultations</Link>
          <Link to="/spirituality-new?tab=travel" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Spiritual Travel</Link>
          <Link to="/spirituality-new?tab=yoga" className={`block pl-4 py-3 ${mobileNavLinkClass}`}>Bhakti Yoga</Link>
        </MobileDropdown>
        
        <Link 
          to="/surender"
          className={mobileNavLinkClass}
          onClick={onClose}
        >
          Surender
        </Link>

        <Link 
          to="/de-addiction"
          className={mobileNavLinkClass}
          onClick={onClose}
        >
          De-addiction
        </Link>
        
        <button
          onClick={() => scrollToSection("problem")}
          className={mobileNavLinkClass}
        >
          Contribute
        </button>
        
        <button
          onClick={() => scrollToSection("contact")}
          className={mobileNavLinkClass}
        >
          Contact
        </button>
        
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
