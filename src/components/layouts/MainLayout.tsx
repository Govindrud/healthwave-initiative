
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';

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
  useEffect(() => {
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

  // Log when layout is rendered
  useEffect(() => {
    console.log("MainLayout rendered");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <Toaster position="top-center" richColors />
      <main className="flex-grow pt-16">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
