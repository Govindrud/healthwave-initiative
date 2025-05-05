
import React from "react";
import { Link } from "react-router-dom";
import { MobileDropdown } from "../MobileDropdown";
import { MobileNavItem } from "./MobileNavItem";
import { 
  servicesItems, 
  activitiesItems, 
  spiritualityItems, 
  mainMenuItems,
  productItems,
  aiItems,
  aboutItems
} from "@/config/navigation";

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
      <MobileNavItem to="/" onClick={onClose} className="font-medium">
        Home
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
        <MobileNavItem 
          to="/services" 
          onClick={onClose}
          className="mt-2 text-meant-700 font-medium"
        >
          View All Services
        </MobileNavItem>
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
        <MobileNavItem 
          to="/activities" 
          onClick={onClose}
          className="mt-2 text-meant-700 font-medium"
        >
          View All Activities
        </MobileNavItem>
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
        <MobileNavItem 
          to="/spirituality" 
          onClick={onClose}
          className="mt-2 text-meant-700 font-medium"
        >
          View Spiritual Services
        </MobileNavItem>
      </MobileDropdown>
      
      <MobileDropdown title="Products">
        {productItems.map((item, index) => (
          <MobileNavItem 
            key={`product-${index}`} 
            to={item.href} 
            onClick={onClose}
          >
            {item.title}
          </MobileNavItem>
        ))}
        <MobileNavItem 
          to="/cart" 
          onClick={onClose}
          className="mt-2 text-meant-700 font-medium"
        >
          View Cart
        </MobileNavItem>
      </MobileDropdown>
      
      <MobileDropdown title="AI Assistance">
        {aiItems.map((item, index) => (
          <MobileNavItem 
            key={`ai-${index}`} 
            to={item.href} 
            onClick={onClose}
          >
            {item.title}
          </MobileNavItem>
        ))}
      </MobileDropdown>
      
      <MobileDropdown title="Help & Support">
        {mainMenuItems.map((item, index) => (
          <MobileNavItem 
            key={`main-${index}`} 
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
      
      <MobileDropdown title="About">
        {aboutItems.map((item, index) => (
          <MobileNavItem 
            key={`about-${index}`} 
            to={item.href} 
            onClick={onClose}
          >
            {item.title}
          </MobileNavItem>
        ))}
        <MobileNavItem 
          onClick={() => {
            scrollToSection("contact");
            onClose();
          }}
        >
          Contact Us
        </MobileNavItem>
      </MobileDropdown>
    </nav>
  );
};
