
import React from "react";
import { Location, useNavigate } from "react-router-dom";
import { CartIcon } from "./mobile/CartIcon";
import { HamburgerButton } from "./mobile/HamburgerButton";
import MobileMenuContent from "./MobileMenuContent";
import ThemeToggle from "../ThemeToggle";
import Logo from "../Logo";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileNavProps {
  location: Location;
}

const MobileNav: React.FC<MobileNavProps> = ({ location }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      // If already on home page, scroll to hero section
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home page
      navigate("/#hero");
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-0" ref={menuRef}>
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <Logo size="md" variant="full" asLink={false} />
      </div>
      
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <CartIcon itemCount={2} />
        
        <HamburgerButton 
          isOpen={isMobileMenuOpen}
          onClick={toggleMenu}
        />

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
      </div>
    </div>
  );
};

export default MobileNav;
