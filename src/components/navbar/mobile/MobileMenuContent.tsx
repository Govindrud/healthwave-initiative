
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileDropdown } from "../MobileDropdown";
import { 
  Heart, Shield, BookOpen, Building, Video, Users, 
  Activity, GraduationCap, Award, MapPin, Search, ShoppingBag
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { 
  spiritualityItems, 
  servicesItems, 
  activitiesItems, 
  mainMenuItems 
} from "@/config/navigation";

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
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute top-0 right-0 w-full sm:w-80 h-full bg-white overflow-y-auto z-10"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <ThemeToggle />
        </div>

        <nav className="p-4 space-y-1">
          <Link
            to="/"
            className="flex items-center px-4 py-3 hover:bg-accent rounded-md text-base font-medium"
            onClick={onClose}
          >
            Home
          </Link>

          <MobileDropdown title="Services">
            {servicesItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-start p-3 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                {item.icon && <item.icon className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />}
                <div>
                  <div className="font-medium">{item.title}</div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </MobileDropdown>

          <MobileDropdown title="Products">
            <Link
              to="/products"
              className="flex items-start p-3 hover:bg-accent rounded-md"
              onClick={onClose}
            >
              <ShoppingBag className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
              <div>
                <div className="font-medium">All Products</div>
                <p className="text-xs text-muted-foreground">Browse our mental health products</p>
              </div>
            </Link>
            <Link
              to="/products?category=books"
              className="flex items-start p-3 hover:bg-accent rounded-md"
              onClick={onClose}
            >
              <BookOpen className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
              <div>
                <div className="font-medium">Self-Help Books</div>
                <p className="text-xs text-muted-foreground">Recommended reading for mental wellness</p>
              </div>
            </Link>
          </MobileDropdown>

          <MobileDropdown title="Activities">
            {activitiesItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-start p-3 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                {item.icon ? (
                  <item.icon className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
                ) : (
                  <Activity className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
                )}
                <div>
                  <div className="font-medium">{item.title}</div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </MobileDropdown>

          <MobileDropdown title="Spirituality">
            {spiritualityItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-start p-3 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                <item.icon className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </MobileDropdown>

          <MobileDropdown title="Corporate">
            <Link
              to="/corporate-plans"
              className="flex items-start p-3 hover:bg-accent rounded-md"
              onClick={onClose}
            >
              <Building className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
              <div>
                <div className="font-medium">Corporate Plans</div>
                <p className="text-xs text-muted-foreground">Mental health solutions for organizations</p>
              </div>
            </Link>
            <Link
              to="/corporate-certification"
              className="flex items-start p-3 hover:bg-accent rounded-md"
              onClick={onClose}
            >
              <Award className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
              <div>
                <div className="font-medium">Corporate Certification</div>
                <p className="text-xs text-muted-foreground">Certify your workplace as stress-free</p>
              </div>
            </Link>
          </MobileDropdown>

          <MobileDropdown title="Help & Support">
            {mainMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-start p-3 hover:bg-accent rounded-md"
                onClick={onClose}
              >
                <item.icon className="h-5 w-5 text-meant-600 mt-0.5 mr-3" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </MobileDropdown>

          <Link
            to="/partners"
            className="flex items-center px-4 py-3 hover:bg-accent rounded-md text-base font-medium"
            onClick={onClose}
          >
            Partners
          </Link>

          <Link
            to="/about"
            className="flex items-center px-4 py-3 hover:bg-accent rounded-md text-base font-medium"
            onClick={onClose}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="flex items-center px-4 py-3 hover:bg-accent rounded-md text-base font-medium"
            onClick={onClose}
          >
            Contact
          </Link>
          
          <Link
            to="/documentation"
            className="flex items-center px-4 py-3 hover:bg-accent rounded-md text-base font-medium"
            onClick={onClose}
          >
            Documentation
          </Link>
        </nav>

        <div className="p-4 border-t">
          <div className="flex justify-between">
            <Link
              to="/login"
              className="flex-1 px-4 py-2 text-center rounded-md border border-gray-200 font-medium text-meant-600 hover:bg-accent mr-2"
              onClick={onClose}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 px-4 py-2 text-center rounded-md bg-meant-600 text-white hover:bg-meant-700"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
