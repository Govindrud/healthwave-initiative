
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin, Youtube, Heart } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    if (window.location.pathname === '/') {
      // If on home page, scroll to section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home page with hash
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="bg-card border-t dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo size="lg" variant="full" />
            <p className="mt-4 text-muted-foreground dark:text-gray-400">
              Empowering individuals through innovative mental health solutions.
              Our mission is to make mental wellness accessible to everyone.
            </p>
            <div className="flex space-x-4 mt-6">
              {[Twitter, Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-meant-50 dark:bg-gray-800 flex items-center justify-center text-meant-600 dark:text-meant-400 hover:bg-meant-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={`Social media link ${i+1}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("solutions")}
                  className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors text-left"
                >
                  Our Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link to="/surender" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Surender
                </Link>
              </li>
              <li>
                <Link to="/de-addiction" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  De-addiction
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/admin-login" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/hosting" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Hosting Guide
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Mental Health Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/spirituality" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Spiritual Resources
                </Link>
              </li>
              <li>
                <Link to="/corporate-certification" className="text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
                  Corporate Certification
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Newsletter</h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on mental health resources.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-meant-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-meant-600 hover:bg-meant-700 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground dark:text-gray-400">
            © {new Date().getFullYear()} MeantToHelp. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-muted-foreground dark:text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>for mental wellness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
