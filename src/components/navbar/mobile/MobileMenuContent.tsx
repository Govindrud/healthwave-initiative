
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileNavigation } from "./MobileNavigation";
import { ShoppingCart, User } from "lucide-react";

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
      className="fixed inset-0 top-[70px] z-50 bg-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-70px)] bg-white mobile-menu-container">
        <MobileNavigation onClose={onClose} scrollToSection={scrollToSection} />
        
        <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
          <Link to="/cart" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
            <ShoppingCart size={20} className="mr-3" />
            <span>Cart</span>
            <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
          </Link>
          
          <Link to="/admin-login" className="flex items-center p-3 hover:bg-gray-100 rounded-md">
            <User size={20} className="mr-3" />
            <span>Admin Login</span>
          </Link>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
          <Link to="/doctors" className="w-full">
            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
              Book Consultation
            </button>
          </Link>
          
          <Link to="/spirituality" className="w-full">
            <button className="w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors">
              Spiritual Services
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
