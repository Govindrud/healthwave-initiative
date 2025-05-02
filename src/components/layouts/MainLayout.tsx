
import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title = "MeantToHelp - Mental Health Support",
  description = "MeantToHelp provides mental health support services, therapy resources, and wellness guidance." 
}) => {
  // Set document title when provided
  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
    
    // Add meta description if it doesn't exist
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Toaster position="top-center" richColors />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
