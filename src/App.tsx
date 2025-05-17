
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '@/routes';
import AppProviders from '@/providers/AppProviders';

const App: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Global handler for hash fragments in URLs
    if (location.hash) {
      const id = location.hash.replace('#', '');
      
      // Small delay to ensure the page has fully rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
    
    console.log("App component rendered");
  }, [location]);
  
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
