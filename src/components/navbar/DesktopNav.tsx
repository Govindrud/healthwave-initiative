
import React from "react";
import { Location, Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavSection } from "./navigation/NavSection";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { ShoppingBag, User } from "lucide-react";
import { 
  servicesItems, 
  activitiesItems, 
  spiritualityItems, 
  mainMenuItems,
  productItems,
  aiItems,
  aboutItems
} from "@/config/navigation";
import ThemeToggle from "../ThemeToggle";
import RegionSelector from "@/components/region/RegionSelector";
import CartBadge from "@/components/cart/CartBadge";

interface DesktopNavProps {
  location: Location;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ location }) => {
  const { isAuthenticated } = useAuth();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      // If already on home page, scroll to hero section
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home page with hash
      navigate("/#hero");
    }
  };

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
        <div className="mr-6 cursor-pointer" onClick={handleLogoClick}>
          <Logo size="md" variant="full" asLink={false} />
        </div>

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
              title="Products" 
              items={productItems} 
            />
            <NavSection 
              title="AI Assistance" 
              items={aiItems} 
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
              items={aboutItems} 
            />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-4">
        <RegionSelector />
        <ThemeToggle />

        <CartBadge />

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
