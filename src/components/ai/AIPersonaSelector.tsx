
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppConfig from '@/config/app-config';

interface AIPersonaSelectorProps {
  activePersonaId: string;
  onPersonaChange: (id: string) => void;
}

const AIPersonaSelector: React.FC<AIPersonaSelectorProps> = ({ activePersonaId, onPersonaChange }) => {
  const personas = AppConfig.ai.personas;
  
  return (
    <Tabs defaultValue={activePersonaId} className="mb-4">
      <TabsList className="grid grid-cols-4">
        {personas.map(persona => (
          <TabsTrigger 
            key={persona.id} 
            value={persona.id}
            onClick={() => onPersonaChange(persona.id)}
          >
            {persona.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default AIPersonaSelector;
