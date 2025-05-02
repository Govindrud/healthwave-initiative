
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
  const [initializationAttempted, setInitializationAttempted] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        setInitializationAttempted(true);
        const success = initializeAIServices();
        setIsInitialized(success);
        
        if (success) {
          console.log('AI services initialized successfully');
        } else {
          console.warn('AI services initialization returned false');
          toast.warning('AI services initialization was incomplete. Some features may have limited functionality.');
        }
      } catch (error) {
        console.error('Failed to initialize AI services:', error);
        toast.error('Failed to initialize AI services. Some features may not work properly.');
        setIsInitialized(false);
      }
    };

    if (!initializationAttempted) {
      initialize();
    }
  }, [initializationAttempted]);

  // Value to be provided to consumers
  const value: AIContextType = {
    isInitialized,
    personaId,
    setPersonaId
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};

export default AIProvider;
