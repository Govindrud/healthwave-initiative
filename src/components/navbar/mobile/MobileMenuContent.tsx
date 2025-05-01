
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { servicesItems, spiritualityItems, activitiesItems, mainMenuItems, aiItems } from "@/config/navigation";

interface MobileMenuContentProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  isOpen,
  onClose,
  scrollToSection,
}) => {
  // Animation variants for the menu
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  // Navigation sections
  const navSections = [
    { title: "Main", items: mainMenuItems },
    { title: "Services", items: servicesItems },
    { title: "AI Assistants", items: aiItems },
    { title: "Spirituality", items: spiritualityItems },
    { title: "Activities", items: activitiesItems }
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="exit"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="w-4/5 max-w-md bg-white h-full overflow-y-auto shadow-xl"
        variants={menuVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="py-2 px-4">
          <Link
            to="/"
            className="block py-3 text-meant-800 font-medium hover:text-meant-600"
            onClick={onClose}
          >
            Home
          </Link>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
          {navSections.map((section) => (
            <div key={section.title} className="py-2 px-4 border-t">
              <h3 className="font-medium text-gray-500 text-sm mb-2 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block py-2 px-2 rounded-md text-meant-800 hover:bg-meant-50"
                    onClick={onClose}
                  >
                    <div className="flex items-center">
                      {item.icon && <item.icon className="h-5 w-5 mr-2 text-meant-600" />}
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="py-2 px-4 border-t">
          <Link
            to="/documentation"
            className="block py-3 text-meant-800 font-medium hover:text-meant-600"
            onClick={onClose}
          >
            Documentation
          </Link>
          <Link
            to="/about"
            className="block py-3 text-meant-800 font-medium hover:text-meant-600"
            onClick={onClose}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-3 text-meant-800 font-medium hover:text-meant-600"
            onClick={onClose}
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
