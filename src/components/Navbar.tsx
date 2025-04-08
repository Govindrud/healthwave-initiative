
import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();

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

  // Close mobile menu when route changes
  useEffect(() => {
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
      window.location.href = `/#${id}`;
    }
  };

  const navLinkClass = "text-foreground/80 hover:text-foreground transition-colors text-sm font-medium text-center";
  const mobileNavLinkClass = "text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-md text-sm font-medium text-center";

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

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
            className={navLinkClass}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={navLinkClass}
          >
            About
          </button>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${navLinkClass} bg-transparent p-0`}>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem
                      href="/services"
                      title="All Services"
                      className="hover:bg-meant-50"
                    >
                      Browse our complete range of mental health services
                    </ListItem>
                    <ListItem
                      href="/doctors"
                      title="Doctor Consultations" 
                      className="hover:bg-meant-50"
                    >
                      Connect with experienced mental health professionals
                    </ListItem>
                    <ListItem
                      href="/student-psychologists"
                      title="Student Psychologists"
                      className="hover:bg-meant-50"
                    >
                      Affordable counseling with supervised students
                    </ListItem>
                    <ListItem
                      href="/webinars"
                      title="Mental Health Webinars"
                      className="hover:bg-meant-50"
                    >
                      Join expert-led online sessions and workshops
                    </ListItem>
                    <ListItem
                      href="/corporate-plans"
                      title="Corporate Mental Health"
                      className="hover:bg-meant-50"
                    >
                      Solutions for businesses and organizations
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <button
            onClick={() => scrollToSection("solutions")}
            className={navLinkClass}
          >
            Solutions
          </button>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${navLinkClass} bg-transparent p-0`}>Activities</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem
                      href="/adventures"
                      title="Stress-Free Adventures" 
                      className="hover:bg-meant-50"
                    >
                      Enjoy therapeutic outdoor activities and retreats
                    </ListItem>
                    <ListItem
                      href="/games"
                      title="Mental Health Games"
                      className="hover:bg-meant-50"
                    >
                      Fun activities designed to boost mood and reduce stress
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/products" className={navLinkClass}>
            Products
          </Link>
          <Link to="/spirituality" className={navLinkClass}>
            Spirituality
          </Link>
          <button
            onClick={() => scrollToSection("problem")}
            className={navLinkClass}
          >
            Contribute
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={navLinkClass}
          >
            Contact
          </button>

          <Link to="/admin-login">
            <Button variant="outline" size="sm" className="text-meant-600 border-meant-600 hover:bg-meant-50">
              Admin
            </Button>
          </Link>
          <Link to="/doctors">
            <Button 
              size="sm"
              className="bg-meant-600 hover:bg-meant-700 text-white rounded-full px-4 hover:shadow-md transition-all"
            >
              Book Consultation
            </Button>
          </Link>
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
              
              {/* Services dropdown */}
              <div className="relative">
                <div className={`${mobileNavLinkClass} flex justify-between items-center`}>
                  <span>Services</span>
                  <ChevronDown size={16} />
                </div>
                <div className="ml-4 mt-1 space-y-1">
                  <Link to="/services" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>All Services</Link>
                  <Link to="/doctors" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Doctor Consultations</Link>
                  <Link to="/student-psychologists" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Student Psychologists</Link>
                  <Link to="/webinars" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Mental Health Webinars</Link>
                  <Link to="/corporate-plans" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Corporate Plans</Link>
                </div>
              </div>
              
              <button
                onClick={() => scrollToSection("solutions")}
                className={mobileNavLinkClass}
              >
                Solutions
              </button>
              
              {/* Activities dropdown */}
              <div className="relative">
                <div className={`${mobileNavLinkClass} flex justify-between items-center`}>
                  <span>Activities</span>
                  <ChevronDown size={16} />
                </div>
                <div className="ml-4 mt-1 space-y-1">
                  <Link to="/adventures" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Stress-Free Adventures</Link>
                  <Link to="/games" className={`block pl-4 py-2 ${mobileNavLinkClass}`}>Mental Health Games</Link>
                </div>
              </div>
              
              <Link 
                to="/products" 
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/spirituality" 
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Spirituality
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
    </header>
  );
};

export default Navbar;
