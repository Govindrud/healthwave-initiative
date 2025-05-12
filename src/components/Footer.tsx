import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin, Youtube, Heart, Phone, Mail, MapPin, BookOpen } from "lucide-react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Link to="/">
              <Logo size="lg" variant="full" />
            </Link>
            <p className="mt-4 text-muted-foreground">
              Empowering individuals through innovative mental health solutions.
              Our mission is to make mental wellness accessible to everyone.
            </p>
            <div className="flex space-x-4 mt-6">
              {[Twitter, Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-meant-50 flex items-center justify-center text-meant-600 hover:bg-meant-100 transition-colors"
                  aria-label={`Social media link ${i+1}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/surender" className="text-muted-foreground hover:text-foreground transition-colors">
                  Surender
                </Link>
              </li>
              <li>
                <Link to="/de-addiction" className="text-muted-foreground hover:text-foreground transition-colors">
                  De-addiction
                </Link>
              </li>
              <li>
                <Link to="/spirituality" className="text-muted-foreground hover:text-foreground transition-colors">
                  Spiritual Resources
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Doctor Consultations
                </Link>
              </li>
              <li>
                <Link to="/student-psychologists" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student Psychologists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Corporate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/corporate-plans" className="text-muted-foreground hover:text-foreground transition-colors">
                  Corporate Plans
                </Link>
              </li>
              <li>
                <Link to="/corporate-certification" className="text-muted-foreground hover:text-foreground transition-colors">
                  Corporate Certification
                </Link>
              </li>
              <li>
                <Link to="/webinars" className="text-muted-foreground hover:text-foreground transition-colors">
                  Webinars
                </Link>
              </li>
              <li>
                <Link to="/admin-login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-meant-600 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Mental Health Street<br />
                  Wellness City, WC 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-meant-600 flex-shrink-0" />
                <span className="text-muted-foreground">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-meant-600 flex-shrink-0" />
                <span className="text-muted-foreground">support@meanttohelp.com</span>
              </li>
              <li className="flex items-center">
                <BookOpen className="mr-3 h-5 w-5 text-meant-600 flex-shrink-0" />
                <Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Technical Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} MeantToHelp. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-muted-foreground">
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
