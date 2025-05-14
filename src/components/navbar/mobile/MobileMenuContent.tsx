
import React from "react";
import { motion } from "framer-motion";
import UserProfileSection from "./UserProfileSection";
import MainNavLinks from "./MainNavLinks";
import AccountNavLinks from "./AccountNavLinks";

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
        <UserProfileSection onClose={onClose} />
        <MainNavLinks onClose={onClose} />
        <AccountNavLinks onClose={onClose} />
      </div>
    </motion.div>
  );
};

export default MobileMenuContent;
