
import React from "react";
import { MobileDropdown } from "../MobileDropdown";
import { MobileNavItem } from "./MobileNavItem";
import { servicesItems, spiritualityItems, activitiesItems, mainMenuItems } from "@/config/navigation";

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
      <MobileNavItem onClick={() => scrollToSection("hero")}>Home</MobileNavItem>
      <MobileNavItem onClick={() => scrollToSection("about")}>About</MobileNavItem>
      <MobileNavItem onClick={() => scrollToSection("solutions")}>Solutions</MobileNavItem>
      <MobileNavItem to="/products">Products</MobileNavItem>
      
      <MobileDropdown title="Services">
        {servicesItems.map(item => (
          <MobileNavItem key={item.title} to={item.href}>
            {item.title}
          </MobileNavItem>
        ))}
      </MobileDropdown>
      
      <MobileDropdown title="Activities">
        {activitiesItems.map(item => (
          <MobileNavItem key={item.title} to={item.href}>
            {item.title}
          </MobileNavItem>
        ))}
      </MobileDropdown>
      
      <MobileDropdown title="Spirituality">
        {spiritualityItems.map(item => (
          <MobileNavItem key={item.title} to={item.href}>
            {item.title}
          </MobileNavItem>
        ))}
      </MobileDropdown>
      
      {mainMenuItems.map(item => (
        <MobileNavItem key={item.title} to={item.href}>
          {item.title}
        </MobileNavItem>
      ))}
      
      <MobileNavItem onClick={() => scrollToSection("problem")}>Contribute</MobileNavItem>
      <MobileNavItem onClick={() => scrollToSection("contact")}>Contact</MobileNavItem>
    </div>
  );
};
