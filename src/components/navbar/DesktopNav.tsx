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

  return (
    <nav className="hidden md:flex items-center space-x-6 w-full justify-between">
      <div className="flex items-center space-x-6">
        <Logo size="md" variant="full" />
        <NavLink onClick={() => scrollToSection("hero")}>
          Home
        </NavLink>
        
        <NavLink onClick={() => scrollToSection("about")}>
          About
        </NavLink>
        
        <ServicesDropdown />
        
        <NavLink onClick={() => scrollToSection("solutions")}>
          Solutions
        </NavLink>
        
        <ActivitiesDropdown />
        
        <NavLink to="/products">
          Products
        </NavLink>
        
        <SpiritualityDropdown />

        <NavLink to="/surender">
          Surender
        </NavLink>

        <NavLink to="/de-addiction">
          De-addiction
        </NavLink>
        
        <NavLink onClick={() => scrollToSection("problem")}>
          Contribute
        </NavLink>
        
        <NavLink onClick={() => scrollToSection("contact")}>
          Contact
        </NavLink>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        <Link to="/admin-login">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Admin
          </Button>
        </Link>
        
        <Link to="/doctors">
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 hover:shadow-md transition-all"
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
    </nav>
  );
};
