
import React, { createContext, useEffect } from 'react';
import { initializeAIServices } from '@/utils/ai-integration';
import { toast } from 'sonner';

interface AIContextType {
  isInitialized: boolean;
}

export const AIContext = createContext<AIContextType>({ isInitialized: false });

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const success = initializeAIServices();
        setIsInitialized(success);
        
        if (success) {
          console.log('AI services initialized successfully');
        }
      } catch (error) {
        console.error('Failed to initialize AI services:', error);
        toast.error('Failed to initialize AI services. Some features may not work properly.');
      }
    };

    initialize();
  }, []);

  return (
    <AIContext.Provider value={{ isInitialized }}>
      {children}
    </AIContext.Provider>
  );
};

export default AIProvider;
