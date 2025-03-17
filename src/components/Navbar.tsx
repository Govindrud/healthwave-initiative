
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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

        <nav className="hidden md:flex items-center space-x-8">
          {[
            { text: "Home", id: "hero" },
            { text: "About", id: "about" },
            { text: "Solutions", id: "solutions" },
            { text: "Contribute", id: "problem" },
            { text: "Contact", id: "contact" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              {item.text}
            </button>
          ))}
          <Link to="/admin">
            <Button variant="outline" className="text-meant-600 border-meant-600 hover:bg-meant-50">
              Admin
            </Button>
          </Link>
          <Button 
            className="bg-meant-600 hover:bg-meant-700 text-white rounded-full px-6 hover:shadow-md transition-all"
            onClick={() => scrollToSection("problem")}
          >
            Share Your Problem
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass md:hidden py-4 px-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {[
                { text: "Home", id: "hero" },
                { text: "About", id: "about" },
                { text: "Solutions", id: "solutions" },
                { text: "Contribute", id: "problem" },
                { text: "Contact", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
                >
                  {item.text}
                </button>
              ))}
              <Link to="/admin" className="px-4 py-2">
                <Button variant="outline" className="text-meant-600 border-meant-600 hover:bg-meant-50 w-full">
                  Admin
                </Button>
              </Link>
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
