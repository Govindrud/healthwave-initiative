
import React from "react";
import { Location } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartIcon } from "./CartIcon";
import { HamburgerButton } from "./HamburgerButton";
import { MobileMenuContent } from "./MobileMenuContent";

interface MobileNavProps {
  location: Location;
}

export const MobileNav: React.FC<MobileNavProps> = ({ location }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isHomePage = location.pathname === "/";
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

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex items-center space-x-2 md:hidden z-50" ref={menuRef}>
      <CartIcon />
      <HamburgerButton isOpen={isMobileMenuOpen} onClick={toggleMenu} />
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuContent 
            isOpen={isMobileMenuOpen} 
            onClose={closeMenu} 
            isHomePage={isHomePage} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
