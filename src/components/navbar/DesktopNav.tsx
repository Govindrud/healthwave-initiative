
import React from "react";
import { Link, Location, useNavigate } from "react-router-dom";
import { ShoppingCart, Users, FileText, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { ServicesDropdown } from "./ServicesDropdown";
import { ActivitiesDropdown } from "./ActivitiesDropdown";
import { SpiritualityDropdown } from "./SpiritualityDropdown";
import ThemeToggle from "../ThemeToggle";
import Logo from "@/components/Logo";
import { MainMenuDropdown } from "./MainMenuDropdown";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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

  // Categorized primary menu items
  const primaryMenuItems = [
    { label: "Home", action: () => scrollToSection("hero") },
    { label: "About", action: () => scrollToSection("about") },
    { label: "Products", to: "/products" },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Logo size="md" variant="full" className="mr-4" />
        
        <nav className="hidden md:flex items-center space-x-1">
          {/* Primary navigation links (always visible on desktop) */}
          {primaryMenuItems.map((item, index) => (
            <NavLink 
              key={index}
              to={item.to} 
              onClick={item.action}
              className="text-xs lg:text-sm whitespace-nowrap px-2 py-2"
            >
              {item.label}
            </NavLink>
          ))}

          {/* Dropdown menus with appropriate spacing */}
          <div className="flex items-center space-x-1">
            <ServicesDropdown />
            <ActivitiesDropdown />
            <SpiritualityDropdown />
            <MainMenuDropdown scrollToSection={scrollToSection} />
          </div>
        </nav>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        <ThemeToggle />
        
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <Link to="/admin-dashboard">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
              >
                <Home size={16} />
                <span>Admin Dashboard</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Users size={16} />
                  <span className="hidden sm:inline">Admin</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 z-50" 
                sideOffset={4}
              >
                <DropdownMenuLabel>Admin Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/admin" className="flex items-center gap-2 w-full">
                    <FileText size={16} />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-red-500 cursor-pointer"
                >
                  <span className="flex items-center gap-2 w-full">Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link to="/admin-login">
            <Button variant="outline" size="sm" className="text-meant-600 border-meant-600 hover:bg-meant-50">
              Login
            </Button>
          </Link>
        )}
        
        <Link to="/doctors" className="hidden sm:block">
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 md:px-4 hover:shadow-md transition-all text-xs lg:text-sm"
          >
            Book Consultation
          </Button>
        </Link>
        
        <Link to="/cart" className="relative">
          <ShoppingCart size={20} className="text-foreground/80 hover:text-foreground" />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
