
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Home, Info, Phone, BookOpen, Activity, Brain, 
         HeartPulse, Users, ScrollText, ShoppingCart } from 'lucide-react';

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
  const menuItems = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
    { label: 'About', icon: <Info className="w-5 h-5" />, path: '/about' },
    { label: 'Services', icon: <HeartPulse className="w-5 h-5" />, path: '/services' },
    { label: 'Activities', icon: <Activity className="w-5 h-5" />, path: '/activities' },
    { label: 'Doctors', icon: <Users className="w-5 h-5" />, path: '/doctors' },
    { label: 'Products', icon: <ShoppingCart className="w-5 h-5" />, path: '/products' },
    { label: 'Spirituality', icon: <Brain className="w-5 h-5" />, path: '/spirituality' },
    { label: 'Documentation', icon: <ScrollText className="w-5 h-5" />, path: '/documentation' },
    { label: 'Contact', icon: <Phone className="w-5 h-5" />, path: '/contact' },
  ];

  const containerVariants = {
    hidden: { 
      x: "100%", 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      } 
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl flex flex-col overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 py-5 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <motion.li key={i} custom={i} variants={itemVariants}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-4 text-meant-600">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <Link
              to="/login"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-meant-600 text-white rounded-md text-center font-medium hover:bg-meant-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-meant-600 text-meant-600 rounded-md text-center font-medium hover:bg-meant-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenuContent;
