
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/hooks/useFetch';
import { RegionProvider } from '@/context/RegionContext';
import { AuthProvider } from '@/hooks/useAuth';
import { AIProvider } from '@/providers/AIProvider';
import ScrollToTop from '@/components/ScrollToTop';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegionProvider>
        <AuthProvider>
          <AIProvider>
            <Router>
              <ScrollToTop />
              <Toaster position="top-center" richColors />
              {children}
            </Router>
          </AIProvider>
        </AuthProvider>
      </RegionProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
