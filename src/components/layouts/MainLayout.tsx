
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useLocation } from "react-router-dom";

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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default MainLayout;
