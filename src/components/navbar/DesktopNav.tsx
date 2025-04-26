
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
import { useAuth } from "@/context/AuthContext";
import { AdminMenu } from "@/components/admin/AdminMenu";

interface DesktopNavProps {
  location: Location;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ location }) => {
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

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

  const primaryMenuItems = [
    { label: "Home", action: () => scrollToSection("hero") },
    { label: "About", action: () => scrollToSection("about") },
    { label: "Products", to: "/products" },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <div className="flex items-center justify-between w-full h-16 px-4">
      <div className="flex items-center gap-6">
        <Link to="/" className="shrink-0">
          <Logo size="md" variant="full" />
        </Link>
        
        <nav className="flex items-center">
          <div className="flex items-center gap-1">
            {primaryMenuItems.map((item, index) => (
              <NavLink 
                key={index}
                to={item.to} 
                onClick={item.action}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1 ml-1">
            <ServicesDropdown />
            <ActivitiesDropdown />
            <SpiritualityDropdown />
            <MainMenuDropdown scrollToSection={scrollToSection} />
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        {isAuthenticated ? (
          <AdminMenu />
        ) : (
          <Link to="/login">
            <Button 
              variant="outline" 
              size="sm"
              className="font-medium"
            >
              Login
            </Button>
          </Link>
        )}
        
        <Link to="/doctors" className="hidden sm:block">
          <Button 
            size="sm"
            className="bg-meant-600 hover:bg-meant-700 text-white font-medium"
          >
            Book Consultation
          </Button>
        </Link>
        
        <Link to="/cart" className="relative">
          <ShoppingCart size={20} className="text-foreground/80 hover:text-foreground transition-colors" />
          <span className="absolute -top-1 -right-1 bg-meant-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
