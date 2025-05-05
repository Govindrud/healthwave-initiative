
import React from "react";
import { Location, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavSection } from "./navigation/NavSection";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { ShoppingBag, User } from "lucide-react";
import { servicesItems, activitiesItems, spiritualityItems, mainMenuItems } from "@/config/navigation";
import ThemeToggle from "../ThemeToggle";
import RegionSelector from "@/components/region/RegionSelector";

interface DesktopNavProps {
  location: Location;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ location }) => {
  const { isAuthenticated } = useAuth();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="mr-6">
          <Logo size="md" variant="full" />
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="space-x-2">
            <NavSection 
              title="Services" 
              items={servicesItems} 
            />
            <NavSection 
              title="Activities" 
              items={activitiesItems} 
            />
            <NavSection 
              title="Spirituality" 
              items={spiritualityItems} 
            />
            <NavSection 
              title="Help & Support" 
              items={mainMenuItems} 
            />
            <NavSection 
              title="Corporate" 
              items={[{
                title: "Corporate Plans",
                href: "/corporate-plans",
                description: "Wellness solutions for organizations",
              }]} 
              isLink={true}
            />
            <NavSection 
              title="About" 
              items={[{
                title: "About Us",
                href: "/about",
                description: "Learn more about our mission",
              }]} 
              isLink={true}
            />
            <NavSection 
              title="Contact" 
              items={[{
                title: "Contact Us",
                href: "/contact",
                description: "Get in touch with our team",
              }]} 
              isLink={true}
            />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-4">
        <RegionSelector />
        <ThemeToggle />

        <Link to="/cart" className="relative">
          <ShoppingBag className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-meant-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </Link>

        {isAuthenticated ? (
          <Link to="/profile">
            <div className="flex items-center space-x-1">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Profile</span>
            </div>
          </Link>
        ) : (
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
