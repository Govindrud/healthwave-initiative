
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import usePageScrolling from '@/hooks/use-scroll';

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
  // Since MainLayout is used inside Routes, it's safe to use router hooks here
  usePageScrolling();
  
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
    
    console.log("MainLayout rendered with title:", title);
  }, [title, description]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <Toaster position="top-center" richColors />
      <main className="flex-grow pt-16 w-full">
        <ErrorBoundary>
          <div className="w-full overflow-x-hidden">
            {children}
          </div>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
