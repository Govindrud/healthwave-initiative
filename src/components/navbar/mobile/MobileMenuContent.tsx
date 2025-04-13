
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileDropdown } from "../MobileDropdown";
import { MobileNavItem } from "./MobileNavItem";

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
      className="fixed inset-0 top-[56px] z-50 bg-background"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-56px)]">
        <div className="flex flex-col space-y-1">
          <MobileNavItem onClick={() => scrollToSection("hero")}>Home</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection("about")}>About</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection("solutions")}>Solutions</MobileNavItem>
          <MobileNavItem to="/products">Products</MobileNavItem>
          
          <MobileDropdown title="Services">
            <MobileNavItem to="/doctors">Doctor Consultations</MobileNavItem>
            <MobileNavItem to="/student-psychologists">Student Psychologists</MobileNavItem>
            <MobileNavItem to="/webinars">Mental Health Webinars</MobileNavItem>
            <MobileNavItem to="/corporate-plans">Corporate Plans</MobileNavItem>
            <MobileNavItem to="/corporate-certification">Stress-Free Certification</MobileNavItem>
            <MobileNavItem to="/services">All Services</MobileNavItem>
          </MobileDropdown>
          
          <MobileDropdown title="Activities">
            <MobileNavItem to="/adventures">Stress-Free Adventures</MobileNavItem>
            <MobileNavItem to="/games">Mental Health Games</MobileNavItem>
          </MobileDropdown>
          
          <MobileDropdown title="Spirituality">
            <MobileNavItem to="/spirituality">Spiritual Wellness</MobileNavItem>
            <MobileNavItem to="/spirituality-new">Spiritual Services</MobileNavItem>
            <MobileNavItem to="/spirituality-new?tab=gurus">Guru Consultations</MobileNavItem>
            <MobileNavItem to="/spirituality-new?tab=travel">Spiritual Travel</MobileNavItem>
            <MobileNavItem to="/spirituality-new?tab=video">Video Consultations</MobileNavItem>
            <MobileNavItem to="/spirituality-new?tab=yoga">Bhakti Yoga</MobileNavItem>
          </MobileDropdown>
          
          <MobileNavItem to="/surender">Surender</MobileNavItem>
          <MobileNavItem to="/de-addiction">De-addiction</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection("problem")}>Contribute</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection("contact")}>Contact</MobileNavItem>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
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
      </div>
    </motion.div>
  );
};
