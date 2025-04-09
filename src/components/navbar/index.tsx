
import React from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import Logo from "../Logo";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {isMobile ? <MobileNav location={location} /> : <DesktopNav location={location} />}
      </div>
    </header>
  );
};

export default Navbar;
