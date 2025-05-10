
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  User,
  BookOpen,
  Heart,
  Settings,
  Phone,
  ShoppingBag,
  Building,
  MessageSquare
} from "lucide-react";

interface MobileMenuContentProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

const MobileMenuContent: React.FC<MobileMenuContentProps> = ({ isOpen, onClose, scrollToSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-screen w-full bg-white dark:bg-gray-900 z-50 pt-20 pb-6 px-4 overflow-y-auto"
    >
      <div className="grid gap-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Navigation</h3>
          <div className="grid gap-2">
            <Link to="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <HomeIcon className="h-5 w-5 text-meant-600" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Building className="h-5 w-5 text-meant-600" />
              <span>About</span>
            </Link>
            <Link to="/services" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Heart className="h-5 w-5 text-meant-600" />
              <span>Services</span>
            </Link>
            <Link to="/products" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <ShoppingBag className="h-5 w-5 text-meant-600" />
              <span>Products</span>
            </Link>
            <Link to="/whatsapp-services" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <MessageSquare className="h-5 w-5 text-meant-600" />
              <span>WhatsApp Services</span>
            </Link>
            <Link to="/contact" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Phone className="h-5 w-5 text-meant-600" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account</h3>
          <div className="grid gap-2">
            <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <User className="h-5 w-5 text-meant-600" />
              <span>Profile</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Settings className="h-5 w-5 text-meant-600" />
              <span>Settings</span>
            </Link>
            <Link to="/documentation" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <BookOpen className="h-5 w-5 text-meant-600" />
              <span>Documentation</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenuContent;
