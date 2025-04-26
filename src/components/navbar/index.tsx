
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { DesktopNav } from "@/components/navbar/DesktopNav";
import RegionSelector from "@/components/region/RegionSelector";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Navigation links for mobile menu
  const mobileNavLinks = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/services" },
    { title: "Products", path: "/products" },
    { title: "Doctors", path: "/doctors" },
    { title: "Spirituality", path: "/spirituality" },
    { title: "Corporate", path: "/corporate-plans" },
    { title: "Admin", path: "/admin-login" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center justify-center">
            <Logo size="md" variant="full" />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <DesktopNav location={location} />
            <div className="flex items-center space-x-2">
              <RegionSelector variant="minimal" />
              <Link to="/admin-login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <RegionSelector variant="minimal" />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Improved Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-2">
              {mobileNavLinks.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path} 
                  className="px-4 py-3 hover:bg-gray-100 rounded-md text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
