
import React from "react";
import { Location, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartIcon } from "./CartIcon";
import { HamburgerButton } from "./HamburgerButton";
import MobileMenuContent from "./MobileMenuContent";
import ThemeToggle from "../../ThemeToggle";

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
    // Restore body scroll when menu closes due to route change
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
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
    
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
    <div className="flex items-center justify-between w-full px-0" ref={menuRef}>
      <Link to="/" className="flex items-center">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-meant-600 to-meant-800">
          <span className="font-extrabold">Meant</span>ToHelp
        </span>
      </Link>
      
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
