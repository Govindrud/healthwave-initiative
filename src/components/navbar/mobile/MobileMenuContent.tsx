
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { servicesItems, spiritualityItems, activitiesItems } from "@/config/navigation";

interface MobileMenuContentProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  isOpen,
  onClose,
  scrollToSection,
}) => {
  const { isAuthenticated, user, logout } = useAuth();

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white dark:bg-gray-900 z-50 shadow-xl overflow-y-auto"
    >
      <div className="flex flex-col h-full pt-16 pb-6 px-6">
        {/* Close button at the top */}
        <button
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* User info if authenticated */}
        {isAuthenticated && user && (
          <div className="border-b pb-4 mb-4">
            <p className="font-medium">Welcome, {user.displayName || "User"}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        )}

        {/* Main navigation links */}
        <nav className="flex-grow">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-meant-600"
                onClick={onClose}
              >
                Home
              </Link>
            </li>

            <li className="border-t pt-2">
              <span className="text-sm font-medium uppercase text-gray-500">Services</span>
              <ul className="mt-1 ml-4 space-y-2">
                {servicesItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      className="block py-1 hover:text-meant-600"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                to="/products"
                className="block py-2 hover:text-meant-600"
                onClick={onClose}
              >
                Products
              </Link>
            </li>

            <li className="border-t pt-2">
              <span className="text-sm font-medium uppercase text-gray-500">Spirituality</span>
              <ul className="mt-1 ml-4 space-y-2">
                {spiritualityItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      className="block py-1 hover:text-meant-600"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="border-t pt-2">
              <span className="text-sm font-medium uppercase text-gray-500">Activities</span>
              <ul className="mt-1 ml-4 space-y-2">
                {activitiesItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      className="block py-1 hover:text-meant-600"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                to="/ai-personal-assistant"
                className="block py-2 hover:text-meant-600"
                onClick={onClose}
              >
                AI Assistant
              </Link>
            </li>

            <li>
              <Link
                to="/ai-voice-agent"
                className="block py-2 hover:text-meant-600"
                onClick={onClose}
              >
                Voice Agent
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="block py-2 hover:text-meant-600"
                onClick={onClose}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="block py-2 hover:text-meant-600"
                onClick={onClose}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Authentication links */}
        <div className="mt-6 pt-4 border-t">
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link
                to="/my-bookings"
                className="block w-full py-2 text-center bg-meant-50 text-meant-600 rounded-md"
                onClick={onClose}
              >
                My Bookings
              </Link>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="block w-full py-2 text-center bg-gray-100 text-gray-700 rounded-md"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="block w-full py-2 text-center bg-meant-600 text-white rounded-md"
                onClick={onClose}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block w-full py-2 text-center bg-white text-meant-600 border border-meant-600 rounded-md"
                onClick={onClose}
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenuContent;
