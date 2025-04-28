
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Home, 
  Settings, 
  LogOut, 
  User, 
  ShoppingBag, 
  Phone, 
  Users, 
  MoveRight,
  CalendarCheck,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileDropdown } from "./MobileDropdown";
import RegionSelector from "@/components/region/RegionSelector";
import { motion } from "framer-motion";

interface MobileMenuContentProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({ 
  isOpen, 
  onClose,
  scrollToSection 
}) => {
  const { isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    onClose();
  };
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-lg z-50 overflow-y-auto"
    >
      <div className="flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-xl">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <span className="sr-only">Close menu</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* User profile or login/signup */}
        <div className="p-4 border-b">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">User</p>
                <p className="text-sm text-muted-foreground">user@example.com</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild onClick={onClose}>
                <Link to="/login">Log In</Link>
              </Button>
              <Button variant="outline" asChild onClick={onClose}>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Language & Currency selector */}
        <div className="p-4 border-b">
          <p className="text-sm font-medium mb-3 text-muted-foreground flex items-center">
            <Globe size={16} className="mr-2" />
            Region & Language
          </p>
          <RegionSelector variant="full" />
        </div>

        {/* Main navigation links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2">
            <Link 
              to="/" 
              className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
              onClick={onClose}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <MobileDropdown title="Services">
              <Link 
                to="/doctors" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Doctor Consultations
              </Link>
              <Link 
                to="/spirituality" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Spiritual Guidance
              </Link>
              <Link 
                to="/student-psychologists" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Student Psychologists
              </Link>
              <Link 
                to="/activities" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Wellness Activities
              </Link>
              <Link 
                to="/de-addiction" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Addiction Recovery
              </Link>
              <Link 
                to="/services" 
                className="block py-2 px-2 rounded hover:bg-gray-50 font-medium text-meant-700 mt-2" 
                onClick={onClose}
              >
                <div className="flex items-center gap-1">
                  <span>View All Services</span>
                  <MoveRight size={16} />
                </div>
              </Link>
            </MobileDropdown>
            
            <MobileDropdown title="Products">
              <Link 
                to="/products" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                All Products
              </Link>
              <Link 
                to="/products?category=books" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Self-Help Books
              </Link>
              <Link 
                to="/products?category=meditation" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Meditation Tools
              </Link>
              <Link 
                to="/products?category=aromatherapy" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Aromatherapy
              </Link>
              <Link 
                to="/cart" 
                className="block py-2 px-2 rounded hover:bg-gray-50 font-medium text-meant-700 mt-2" 
                onClick={onClose}
              >
                <div className="flex items-center gap-1">
                  <span>View Cart</span>
                  <ShoppingBag size={16} />
                </div>
              </Link>
            </MobileDropdown>
            
            <MobileDropdown title="Corporate">
              <Link 
                to="/corporate-plans" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Corporate Wellness Plans
              </Link>
              <Link 
                to="/corporate-plans#assistance" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Employee Assistance
              </Link>
              <Link 
                to="/corporate-certification" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Corporate Certifications
              </Link>
              <Link 
                to="/webinars" 
                className="block py-2 px-2 rounded hover:bg-gray-50" 
                onClick={onClose}
              >
                Workshops & Webinars
              </Link>
            </MobileDropdown>
            
            <Link 
              to="/about" 
              className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
              onClick={onClose}
            >
              <Users size={20} />
              <span>About</span>
            </Link>
            
            <Link 
              to="/partners" 
              className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
              onClick={onClose}
            >
              <Users size={20} />
              <span>Partners</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
              onClick={onClose}
            >
              <Phone size={20} />
              <span>Contact</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <div className="my-2 border-t"></div>
                <p className="px-4 py-1 text-xs text-muted-foreground">Account</p>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
                  onClick={onClose}
                >
                  <User size={20} />
                  <span>My Profile</span>
                </Link>
                <Link 
                  to="/my-bookings" 
                  className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
                  onClick={onClose}
                >
                  <CalendarCheck size={20} />
                  <span>My Bookings</span>
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
                  onClick={onClose}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
                <button 
                  className="flex w-full items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenuContent;
