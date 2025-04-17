
import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import AIVoiceAgentComponent from "@/components/voice/AIVoiceAgentComponent";

const AIVoiceAgent = () => {
  useEffect(() => {
    document.title = "AI Voice Agent | MeantToHelp";
  }, []);

  return (
    <MainLayout title="AI Voice Assistant">
      <AIVoiceAgentComponent />
    </MainLayout>
  );
};

export default AIVoiceAgent;
