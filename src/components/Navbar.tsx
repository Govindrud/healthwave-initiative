
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-meant-600 to-meant-800">
            MeantToHelp
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "About", "Solutions", "Contribute", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              {item}
            </a>
          ))}
          <Button className="bg-meant-600 hover:bg-meant-700 text-white rounded-full px-6 hover:shadow-md transition-all">
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
              {["Home", "About", "Solutions", "Contribute", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button 
                className="bg-meant-600 hover:bg-meant-700 text-white rounded-full hover:shadow-md transition-all"
                onClick={() => {
                  document.getElementById('problem')?.scrollIntoView();
                  setIsMobileMenuOpen(false);
                }}
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
