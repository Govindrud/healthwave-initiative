
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { DesktopNav } from "@/components/navbar/DesktopNav";
import RegionSelector from "@/components/region/RegionSelector";
import { MobileNav } from "@/components/navbar/MobileNav";

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
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Always visible logo */}
          <Link to="/" className="flex items-center justify-center">
            <Logo size="md" variant="full" />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <MobileNav location={location} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
