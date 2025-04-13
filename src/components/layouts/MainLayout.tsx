
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // Update page title if provided
    if (title) {
      document.title = `${title} | MeantToHelp`;
    } else {
      document.title = "MeantToHelp - Mental Health Support";
    }
    
    // Check for hash in URL and scroll to that section
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(id);
      
      if (element) {
        // Wait a bit for the page to render completely
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [location, title]);

  return (
    <PageTransition>
      <motion.div 
        className="min-h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main 
            key={location.pathname}
            className="flex-grow pt-24 md:pt-28 w-full overflow-x-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </motion.div>
    </PageTransition>
  );
};

export default MainLayout;
