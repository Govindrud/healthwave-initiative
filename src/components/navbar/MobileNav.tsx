
import React from "react";
import { Link, Location, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileDropdown } from "./MobileDropdown";

interface MobileNavProps {
  location: Location;
}

export const MobileNav: React.FC<MobileNavProps> = ({ location }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  
  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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

  const mobileNavLinkClass = "text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium text-center";

  return (
    <div className="flex items-center space-x-2 md:hidden">
      <Link to="/cart" className="relative mr-2">
        <ShoppingCart size={22} className="text-foreground/80" />
        <span className="absolute -top-1 -right-1 bg-meant-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          2
        </span>
      </Link>
      
      <button
        className="text-foreground"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 glass md:hidden py-4 px-4 animate-fade-in z-50 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-2">
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
              <Link to="/services" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>All Services</Link>
              <Link to="/doctors" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Doctor Consultations</Link>
              <Link to="/student-psychologists" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Student Psychologists</Link>
              <Link to="/webinars" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Mental Health Webinars</Link>
              <Link to="/corporate-plans" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Corporate Plans</Link>
              <Link to="/corporate-certification" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Stress-Free Certification</Link>
            </MobileDropdown>
            
            <button
              onClick={() => scrollToSection("solutions")}
              className={mobileNavLinkClass}
            >
              Solutions
            </button>
            
            <MobileDropdown title="Activities">
              <Link to="/adventures" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Stress-Free Adventures</Link>
              <Link to="/games" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Mental Health Games</Link>
            </MobileDropdown>
            
            <Link 
              to="/products" 
              className={mobileNavLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            
            <MobileDropdown title="Spirituality">
              <Link to="/spirituality" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Spiritual Wellness</Link>
              <Link to="/spirituality-new" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Spiritual Services</Link>
              <Link to="/spirituality-new?tab=gurus" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Guru Consultations</Link>
              <Link to="/spirituality-new?tab=travel" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Spiritual Travel</Link>
              <Link to="/spirituality-new?tab=yoga" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Bhakti Yoga</Link>
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
                className="bg-meant-600 hover:bg-meant-700 text-white rounded-full hover:shadow-md transition-all w-full"
              >
                Book Consultation
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};
