
import React from "react";
import { Link } from "react-router-dom";
import { MobileDropdown } from "../MobileDropdown";
import { MobileNavItem } from "./MobileNavItem";
import { servicesItems, activitiesItems, spiritualityItems } from "@/config/navigation";

interface MobileNavigationProps {
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  onClose, 
  scrollToSection 
}) => {
  return (
    <nav className="flex flex-col space-y-1 rounded-lg overflow-hidden">
      <MobileNavItem to="/products" onClick={onClose}>
        Products
      </MobileNavItem>
      
      <MobileNavItem to="/doctors" onClick={onClose}>
        Doctors
      </MobileNavItem>
      
      <MobileDropdown title="Services">
        {servicesItems.map((item, index) => (
          <MobileNavItem 
            key={`service-${index}`} 
            to={item.href} 
            onClick={onClose}
          >
            {item.title}
          </MobileNavItem>
        ))}
      </MobileDropdown>
      
      <MobileDropdown title="Activities">
        {activitiesItems.map((item, index) => (
          <MobileNavItem 
            key={`activity-${index}`} 
            to={item.href} 
            onClick={onClose}
          >
            {item.title}
          </MobileNavItem>
        ))}
      </MobileDropdown>
      
      <MobileDropdown title="Spirituality">
        {spiritualityItems.map((item, index) => (
          <MobileNavItem 
            key={`spiritual-${index}`} 
            to={item.href} 
            onClick={onClose}
          >
            {item.title}
          </MobileNavItem>
        ))}
      </MobileDropdown>
      
      <MobileNavItem to="/corporate-plans" onClick={onClose}>
        Corporate Plans
      </MobileNavItem>
      
      <MobileNavItem 
        onClick={() => {
          scrollToSection("about");
          onClose();
        }}
      >
        About Us
      </MobileNavItem>
      
      <MobileNavItem 
        onClick={() => {
          scrollToSection("contact");
          onClose();
        }}
      >
        Contact
      </MobileNavItem>
    </nav>
  );
};
