
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import AIPersonalAssistantComponent from '@/components/ai/AIPersonalAssistant';
import { AIProvider } from '@/providers/AIProvider';

const AIPersonalAssistantPage = () => {
  useEffect(() => {
    document.title = "AI Personal Assistant | MeantToHelp";
  }, []);

  return (
    <AIProvider>
      <MainLayout title="AI Personal Assistant">
        <AIPersonalAssistantComponent />
      </MainLayout>
    </AIProvider>
  );
};

export default AIPersonalAssistantPage;
