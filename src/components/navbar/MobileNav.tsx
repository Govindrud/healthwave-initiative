
import React from "react";
import { Location, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartIcon } from "./mobile/CartIcon";
import { HamburgerButton } from "./mobile/HamburgerButton";
import { MobileMenuContent } from "./mobile/MobileMenuContent";
import ThemeToggle from "../ThemeToggle";

interface MobileNavProps {
  location: Location;
}

export const MobileNav: React.FC<MobileNavProps> = ({ location }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const menuRef = React.useRef<HTMLDivElement>(null);
  
  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
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
    <div className="flex items-center space-x-2 md:hidden" ref={menuRef}>
      <ThemeToggle />
      <CartIcon itemCount={2} />
      
      <HamburgerButton 
        isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuContent 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            scrollToSection={scrollToSection}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
