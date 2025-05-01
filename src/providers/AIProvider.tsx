
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeAIServices } from '@/utils/ai-integration';
import { toast } from 'sonner';

interface AIContextType {
  isInitialized: boolean;
  personaId: string;
  setPersonaId: (id: string) => void;
}

export const AIContext = createContext<AIContextType>({
  isInitialized: false,
  personaId: 'therapist',
  setPersonaId: () => {}
});

export const useAIContext = () => useContext(AIContext);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [personaId, setPersonaId] = useState('therapist');

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
    <AIContext.Provider value={{ isInitialized, personaId, setPersonaId }}>
      {children}
    </AIContext.Provider>
  );
};

export default AIProvider;
