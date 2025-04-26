import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileNavigation } from "./MobileNavigation";
import { ShoppingCart, User, Home, Phone, Globe } from "lucide-react";
import RegionSelector from "@/components/region/RegionSelector";
import Logo from "@/components/Logo";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
  return (
    <motion.div className="fixed inset-0 top-[60px] z-50 bg-white">
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-60px)] bg-white mobile-menu-container">
        <div className="mb-4 flex justify-center">
          <Logo size="md" variant="full" />
        </div>
      
        <div className="mb-4 flex justify-center">
          <RegionSelector variant="full" />
        </div>
        
        <div className="mb-6">
          <MobileNavigation onClose={onClose} scrollToSection={scrollToSection} />
        </div>
        
        <div className="pt-4 mb-6 border-t border-gray-200 space-y-3">
          <Link to="/cart" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={onClose}>
            <ShoppingCart size={20} className="mr-3 text-primary" />
            <span>Cart</span>
            <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
          </Link>
          
          <Link to="/login" className="flex items-center p-3 hover:bg-gray-100 rounded-md" onClick={onClose}>
            <User size={20} className="mr-3 text-primary" />
            <span>Login</span>
          </Link>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
          <Link to="/doctors" className="w-full" onClick={onClose}>
            <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-md font-medium transition-colors">
              Book Consultation
            </button>
          </Link>
          
          <Link to="/spirituality" className="w-full" onClick={onClose}>
            <button className="w-full py-3 px-4 border border-primary text-primary rounded-md font-medium hover:bg-primary/5 transition-colors">
              Spiritual Services
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
