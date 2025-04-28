
import React from "react";
import { Location, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartIcon } from "./mobile/CartIcon";
import { HamburgerButton } from "./mobile/HamburgerButton";
import { MobileMenuContent } from "./mobile/MobileMenuContent";
import ThemeToggle from "../ThemeToggle";
import Logo from "../Logo";
import RegionSelector from "@/components/region/RegionSelector";

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
    document.body.style.overflow = "auto";
  }, [location]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "auto";
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
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
    
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
    <div className="flex items-center justify-between w-full px-0" ref={menuRef}>
      <Logo size="md" variant="full" />
      
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <CartIcon itemCount={2} />
        
        <HamburgerButton 
          isOpen={isMobileMenuOpen}
          onClick={toggleMenu}
        />

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenuContent 
              isOpen={isMobileMenuOpen}
              onClose={() => {
                setIsMobileMenuOpen(false);
                document.body.style.overflow = "auto";
              }}
              scrollToSection={scrollToSection}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileNav;
