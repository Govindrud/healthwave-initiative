
import React from "react";
import { Link } from "react-router-dom";
import { MobileNavItem } from "./MobileNavItem";
import { MobileDropdown } from "../MobileDropdown";
import { Sparkles, Brain, Users, Book, Calendar } from "lucide-react";

interface MobileNavigationProps {
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  onClose,
  scrollToSection
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <MobileNavItem to="/" onClick={onClose}>Home</MobileNavItem>
      
      <MobileDropdown title="Services">
        <MobileNavItem to="/services" onClick={onClose}>All Services</MobileNavItem>
        <MobileNavItem to="/voice-therapy" onClick={onClose}>Voice Therapy</MobileNavItem>
        <MobileNavItem to="/ai-voice-agent" onClick={onClose}>AI Voice Agent</MobileNavItem>
        <MobileNavItem to="/ease-of-living" onClick={onClose}>Ease of Living</MobileNavItem>
        <MobileNavItem to="/anger-management" onClick={onClose}>Anger Management</MobileNavItem>
      </MobileDropdown>
      
      <MobileDropdown title="Products">
        <MobileNavItem to="/products" onClick={onClose}>All Products</MobileNavItem>
        <MobileNavItem to="/products?category=meditation" onClick={onClose}>Meditation Aids</MobileNavItem>
        <MobileNavItem to="/products?category=sleep" onClick={onClose}>Sleep Aids</MobileNavItem>
        <MobileNavItem to="/products?category=selfcare" onClick={onClose}>Self-Care</MobileNavItem>
      </MobileDropdown>
      
      <MobileNavItem to="/doctors" onClick={onClose}>Doctors</MobileNavItem>
      
      <MobileDropdown title="Spirituality">
        <MobileNavItem to="/spirituality" onClick={onClose}>Overview</MobileNavItem>
        <MobileNavItem to="/spirituality-services" onClick={onClose}>Services</MobileNavItem>
        <MobileNavItem to="/surender" onClick={onClose}>Surender</MobileNavItem>
      </MobileDropdown>
      
      <MobileNavItem to="/corporate-plans" onClick={onClose}>Corporate</MobileNavItem>
      
      <MobileDropdown title="Activities">
        <MobileNavItem to="/activities" onClick={onClose}>All Activities</MobileNavItem>
        <MobileNavItem to="/adventures" onClick={onClose}>Adventures</MobileNavItem>
        <MobileNavItem to="/games" onClick={onClose}>Games</MobileNavItem>
      </MobileDropdown>
      
      <MobileNavItem onClick={() => { scrollToSection("about"); onClose(); }}>About Us</MobileNavItem>
      <MobileNavItem onClick={() => { scrollToSection("contact"); onClose(); }}>Contact</MobileNavItem>
    </div>
  );
};
