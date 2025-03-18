
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo size="md" variant="full" />

        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
          >
            About
          </button>
          <Link to="/services" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
            Services
          </Link>
          <button
            onClick={() => scrollToSection("solutions")}
            className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
          >
            Solutions
          </button>
          <Link to="/products" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
            Products
          </Link>
          <button
            onClick={() => scrollToSection("problem")}
            className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
          >
            Contribute
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
          >
            Contact
          </button>

          <Link to="/admin">
            <Button variant="outline" size="sm" className="text-meant-600 border-meant-600 hover:bg-meant-50">
              Admin
            </Button>
          </Link>
          <Button 
            size="sm"
            className="bg-meant-600 hover:bg-meant-700 text-white rounded-full px-4 hover:shadow-md transition-all"
            onClick={() => scrollToSection("problem")}
          >
            Share Your Problem
          </Button>
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} className="text-foreground/80 hover:text-foreground" />
            <span className="absolute -top-1 -right-1 bg-meant-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </Link>
        </nav>

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
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass md:hidden py-4 px-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
              >
                About
              </button>
              <Link 
                to="/services" 
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <button
                onClick={() => scrollToSection("solutions")}
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
              >
                Solutions
              </button>
              <Link 
                to="/products" 
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <button
                onClick={() => scrollToSection("problem")}
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
              >
                Contribute
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </button>
              <div className="pt-2">
                <Link to="/admin" className="block px-4 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="text-meant-600 border-meant-600 hover:bg-meant-50 w-full">
                    Admin
                  </Button>
                </Link>
              </div>
              <Button 
                className="bg-meant-600 hover:bg-meant-700 text-white rounded-full hover:shadow-md transition-all"
                onClick={() => scrollToSection("problem")}
              >
                Share Your Problem
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
