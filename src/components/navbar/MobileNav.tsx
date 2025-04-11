
import React from "react";
import { Link, Location, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileDropdown } from "./MobileDropdown";
import { motion, AnimatePresence } from "framer-motion";

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

  const mobileNavLinkClass = "text-foreground hover:text-meant-600 transition-colors px-4 py-3 rounded-md text-sm font-medium";

  return (
    <div className="flex items-center space-x-2 md:hidden" ref={menuRef}>
      <Link to="/cart" className="relative mr-2">
        <ShoppingCart size={22} className="text-foreground" />
        <span className="absolute -top-1 -right-1 bg-meant-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          2
        </span>
      </Link>
      
      <button
        className="hamburger-button text-foreground p-2 rounded-md hover:bg-accent flex items-center justify-center"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <motion.div 
          className={`hamburger-line mb-1 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
          animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div 
          className={`hamburger-line ${isMobileMenuOpen ? 'opacity-0' : ''}`}
          animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div 
          className={`hamburger-line mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
          animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-container absolute top-full left-0 right-0 bg-white border-t border-b border-border md:hidden py-4 px-4 shadow-md z-50 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => scrollToSection("hero")}
                className={mobileNavLinkClass}
              >
                Home
              </button>
              
              <button
                onClick={() => scrollToSection("about")}
                className={mobileNavLinkClass}
              >
                About
              </button>
              
              <MobileDropdown title="Services">
                <Link to="/services" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>All Services</Link>
                <Link to="/doctors" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Doctor Consultations</Link>
                <Link to="/student-psychologists" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Student Psychologists</Link>
                <Link to="/webinars" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Mental Health Webinars</Link>
                <Link to="/corporate-plans" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Corporate Plans</Link>
                <Link to="/corporate-certification" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Stress-Free Certification</Link>
              </MobileDropdown>
              
              <button
                onClick={() => scrollToSection("solutions")}
                className={mobileNavLinkClass}
              >
                Solutions
              </button>
              
              <MobileDropdown title="Activities">
                <Link to="/adventures" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Stress-Free Adventures</Link>
                <Link to="/games" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Mental Health Games</Link>
              </MobileDropdown>
              
              <Link 
                to="/products" 
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              
              <MobileDropdown title="Spirituality">
                <Link to="/spirituality" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Spiritual Wellness</Link>
                <Link to="/spirituality-new" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Spiritual Services</Link>
                <Link to="/spirituality-new?tab=gurus" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Guru Consultations</Link>
                <Link to="/spirituality-new?tab=travel" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Spiritual Travel</Link>
                <Link to="/spirituality-new?tab=yoga" className={`block pl-4 py-3 ${mobileNavLinkClass}`} onClick={() => setIsMobileMenuOpen(false)}>Bhakti Yoga</Link>
              </MobileDropdown>
              
              <Link 
                to="/surender"
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Surender
              </Link>

              <Link 
                to="/de-addiction"
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                De-addiction
              </Link>
              
              <button
                onClick={() => scrollToSection("problem")}
                className={mobileNavLinkClass}
              >
                Contribute
              </button>
              
              <button
                onClick={() => scrollToSection("contact")}
                className={mobileNavLinkClass}
              >
                Contact
              </button>
              
              <div className="pt-2">
                <Link 
                  to="/admin-login" 
                  className="block px-4 py-2" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="text-meant-600 border-meant-600 hover:bg-meant-50 w-full">
                    Admin
                  </Button>
                </Link>
              </div>
              
              <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  className="bg-meant-600 hover:bg-meant-700 text-white rounded-full hover:shadow-md transition-all w-full mt-2"
                >
                  Book Consultation
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
