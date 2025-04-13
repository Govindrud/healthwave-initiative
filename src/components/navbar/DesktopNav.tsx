
import React from "react";
import { Link, Location, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { ServicesDropdown } from "./ServicesDropdown";
import { ActivitiesDropdown } from "./ActivitiesDropdown";
import { SpiritualityDropdown } from "./SpiritualityDropdown";
import ThemeToggle from "../ThemeToggle";
import Logo from "@/components/Logo";
import { MainMenuDropdown } from "./MainMenuDropdown";

interface DesktopNavProps {
  location: Location;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ location }) => {
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  // Categorized primary menu items
  const primaryMenuItems = [
    { label: "Home", action: () => scrollToSection("hero") },
    { label: "About", action: () => scrollToSection("about") },
    { label: "Solutions", action: () => scrollToSection("solutions") },
    { label: "Products", to: "/products" },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Logo size="md" variant="full" className="mr-4 lg:mr-6" />
        
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {/* Primary navigation links (always visible on desktop) */}
          {primaryMenuItems.map((item, index) => (
            <NavLink 
              key={index}
              to={item.to} 
              onClick={item.action}
              className="text-xs lg:text-sm whitespace-nowrap"
            >
              {item.label}
            </NavLink>
          ))}

          {/* Dropdown menus */}
          <ServicesDropdown />
          <ActivitiesDropdown />
          <SpiritualityDropdown />
          
          {/* More menu for additional items */}
          <MainMenuDropdown scrollToSection={scrollToSection} />
        </nav>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
        <ThemeToggle />

        <Link to="/admin-login">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 hidden sm:inline-flex">
            Admin
          </Button>
        </Link>
        
        <Link to="/doctors" className="hidden sm:block">
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 md:px-4 hover:shadow-md transition-all text-xs lg:text-sm"
          >
            Book Consultation
          </Button>
        </Link>
        
        <Link to="/cart" className="relative">
          <ShoppingCart size={22} className="text-foreground/80 hover:text-foreground" />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </Link>
      </div>
    </div>
  );
};
