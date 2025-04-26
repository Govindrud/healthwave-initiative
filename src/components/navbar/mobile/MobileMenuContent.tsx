
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { MobileDropdown } from "../MobileDropdown";
import { servicesItems, spiritualityItems, activitiesItems, mainMenuItems } from "@/config/navigation";

interface MobileMenuContentProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  isOpen,
  onClose,
  scrollToSection,
}) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.25 }}
      className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white shadow-xl z-50 pb-safe pt-safe mobile-menu-container flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        <nav className="flex flex-col">
          {/* Primary Navigation */}
          <div className="p-4">
            <Link to="/" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 text-base font-medium" onClick={onClose}>
              Home
            </Link>
            <Link to="#about" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 text-base font-medium" 
              onClick={() => { scrollToSection("about"); onClose(); }}>
              About
            </Link>
            <Link to="/products" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 text-base font-medium" onClick={onClose}>
              Products
            </Link>
            <Link to="#contact" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 text-base font-medium"
              onClick={() => { scrollToSection("contact"); onClose(); }}>
              Contact
            </Link>
          </div>
          
          {/* Dropdowns */}
          <div className="border-t border-gray-100">
            <MobileDropdown title="Services">
              {servicesItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="flex items-center py-2 text-sm hover:text-meant-600"
                  onClick={onClose}
                >
                  <ChevronRight size={16} className="mr-1 text-meant-600" />
                  {item.title}
                </Link>
              ))}
            </MobileDropdown>
            
            <MobileDropdown title="Activities">
              {activitiesItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="flex items-center py-2 text-sm hover:text-meant-600"
                  onClick={onClose}
                >
                  <ChevronRight size={16} className="mr-1 text-meant-600" />
                  {item.title}
                </Link>
              ))}
              <Link
                to="/activities"
                className="flex items-center py-2 text-sm font-medium text-meant-600"
                onClick={onClose}
              >
                <ChevronRight size={16} className="mr-1" />
                View All Activities
              </Link>
            </MobileDropdown>
            
            <MobileDropdown title="Spirituality">
              {spiritualityItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="flex items-center py-2 text-sm hover:text-meant-600"
                  onClick={onClose}
                >
                  <ChevronRight size={16} className="mr-1 text-meant-600" />
                  {item.title}
                </Link>
              ))}
              <Link
                to="/spirituality-services"
                className="flex items-center py-2 text-sm font-medium text-meant-600"
                onClick={onClose}
              >
                <ChevronRight size={16} className="mr-1" />
                View All Spiritual Services
              </Link>
            </MobileDropdown>
            
            <MobileDropdown title="Help & Support">
              {mainMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="flex items-center py-2 text-sm hover:text-meant-600"
                  onClick={onClose}
                >
                  <ChevronRight size={16} className="mr-1 text-meant-600" />
                  {item.title}
                </Link>
              ))}
            </MobileDropdown>
          </div>
        </nav>
      </div>
      
      <div className="border-t border-gray-100 p-4 space-y-4">
        <Link 
          to="/login" 
          className="block w-full py-3 px-4 bg-white border border-gray-300 text-center rounded-md font-medium hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          Login
        </Link>
        <Link 
          to="/doctors" 
          className="block w-full py-3 px-4 bg-meant-600 text-white text-center rounded-md font-medium hover:bg-meant-700 transition-colors"
          onClick={onClose}
        >
          Book Consultation
        </Link>
      </div>
    </motion.div>
  );
};
