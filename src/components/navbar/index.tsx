
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DesktopNav } from "@/components/navbar/DesktopNav";
import { MobileNav } from "@/components/navbar/MobileNav";
import { useIsPlatform } from "@/hooks/use-mobile"; 

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { isMobile } = useIsPlatform();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);

    // Check for mobile viewport
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    // Initial check
    checkMobile();
    
    // Set up event listener for resize
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Force mobile view on mobile browsers and small viewports
  const showMobileNav = isMobileView || isMobile;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {showMobileNav ? (
            <MobileNav location={location} />
          ) : (
            <div className="w-full">
              <DesktopNav location={location} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
