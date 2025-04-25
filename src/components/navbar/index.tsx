
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { DesktopNav } from "@/components/navbar/DesktopNav";
import RegionSelector from "@/components/region/RegionSelector";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isOpen 
          ? "bg-white/95 backdrop-blur-sm shadow-md dark:bg-gray-900/95" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center justify-center relative z-10">
            <Logo size="md" variant="full" />
          </Link>

          <div className="hidden md:block w-full">
            <DesktopNav location={location} />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <RegionSelector variant="minimal" />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative z-10"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu with improved animation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t bg-white dark:bg-gray-900 page-transition-enter shadow-md">
            <nav className="flex flex-col space-y-1">
              <Link to="/" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                Home
              </Link>
              <Link to="/services" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                Services
              </Link>
              <Link to="/products" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                Products
              </Link>
              <Link to="/doctors" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                Doctors
              </Link>
              <Link to="/spirituality" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                Spirituality
              </Link>
              <Link to="/corporate-plans" className="px-4 py-3 text-meant-600 font-medium hover:bg-meant-50 dark:hover:bg-meant-900/20 rounded-md transition-colors">
                Corporate
              </Link>
              <Link to="/admin-login" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                Admin
              </Link>
              <div className="pt-2 pb-1 px-4">
                <Button 
                  className="w-full bg-meant-600 hover:bg-meant-700 text-white"
                  size="sm"
                >
                  Book Consultation
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
