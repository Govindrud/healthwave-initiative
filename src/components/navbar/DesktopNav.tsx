
import React from "react";
import { Link, Location, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { ServicesDropdown } from "./ServicesDropdown";
import { ActivitiesDropdown } from "./ActivitiesDropdown";
import { SpiritualityDropdown } from "./SpiritualityDropdown";

interface DesktopNavProps {
  location: Location;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ location }) => {
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
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

  return (
    <nav className="hidden md:flex items-center space-x-6">
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

      <Link to="/admin-login">
        <Button variant="outline" size="sm" className="text-meant-600 border-meant-600 hover:bg-meant-50">
          Admin
        </Button>
      </Link>
      
      <Link to="/doctors">
        <Button 
          size="sm"
          className="bg-meant-600 hover:bg-meant-700 text-white rounded-full px-4 hover:shadow-md transition-all"
        >
          Book Consultation
        </Button>
      </Link>
      
      <Link to="/cart" className="relative">
        <ShoppingCart size={22} className="text-foreground/80 hover:text-foreground" />
        <span className="absolute -top-1 -right-1 bg-meant-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          2
        </span>
      </Link>
    </nav>
  );
};
