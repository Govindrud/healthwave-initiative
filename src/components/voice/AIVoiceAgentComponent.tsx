
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { useEmotionDetection } from "@/hooks/use-emotion-detection";
import ApiKeyConfiguration from "./ApiKeyConfiguration";
import AssistantModeTabs from "./AssistantModeTabs";
import VoiceAssistantHelp from "./VoiceAssistantHelp";

const AIVoiceAgentComponent: React.FC = () => {
  // Check for stored API key and agent ID on component mount
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(() => {
    const storedKey = localStorage.getItem("elevenlabs-api-key");
    return storedKey || "";
  });

  const [elevenLabsAgentId, setElevenLabsAgentId] = useState(() => {
    const storedAgentId = localStorage.getItem("elevenlabs-agent-id");
    return storedAgentId || "0iVgYogaiePekeUt2C1h"; // Default to provided agent ID
  });

  const [apiKeyConfigured, setApiKeyConfigured] = useState(Boolean(elevenLabsApiKey));
  const [browserSupportsEmotionDetection, setBrowserSupportsEmotionDetection] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [emotionEnabled, setEmotionEnabled] = useState(false);

  // Check browser compatibility for WebGPU or WebAssembly
  useEffect(() => {
    const checkBrowserCompatibility = async () => {
      // Check if browser supports WebGPU or WebAssembly
      if (!("webgpu" in navigator) && typeof WebAssembly === "undefined") {
        setBrowserSupportsEmotionDetection(false);
        toast.warning("Your browser doesn't support features needed for emotion detection");
      }
    };

    checkBrowserCompatibility();
  }, []);

  // Only initialize voice assistant when API key is configured
  const {
    messages,
    isListening,
    isSpeaking,
    volume,
    agentMode,
    toggleListening,
    stopSpeaking,
    adjustVolume,
    resetConversation,
  } = useVoiceAssistant({
    elevenLabsApiKey: elevenLabsApiKey,
    agentId: elevenLabsAgentId,
  });

  const {
    detectEmotion,
    initializeModel,
    isLoading: isEmotionLoading,
    modelLoaded,
    emotions,
  } = useEmotionDetection();

  useEffect(() => {
    if (emotionEnabled && !modelLoaded && browserSupportsEmotionDetection) {
      initializeModel().catch((error) => {
        console.error("Error initializing emotion model:", error);
        toast.error("Failed to initialize emotion detection model. This feature may not be available on your browser.");
        setEmotionEnabled(false);
      });
    }
  }, [emotionEnabled, modelLoaded, initializeModel, browserSupportsEmotionDetection]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (emotionEnabled && lastMessage?.role === "user") {
      detectEmotion(lastMessage.content).catch((error) => {
        console.error("Error detecting emotion:", error);
      });
    }
  }, [messages, emotionEnabled, detectEmotion]);

  const toggleEmotionDetection = async () => {
    if (!browserSupportsEmotionDetection) {
      toast.error("Emotion detection is not supported in your browser. Please try a browser that supports WebGPU or WebAssembly.");
      return;
    }

    if (!emotionEnabled) {
      try {
        await initializeModel();
        setEmotionEnabled(true);
      } catch (error) {
        console.error("Failed to enable emotion detection:", error);
        toast.error("Could not enable emotion detection. Your browser may not support this feature.");
      }
    } else {
      setEmotionEnabled(false);
    }
  };

  const handleApiKeySave = () => {
    setApiKeyConfigured(true);
    localStorage.setItem("elevenlabs-agent-id", elevenLabsAgentId);
    // Force reload the component with the new API key
    resetConversation();
    toast.success("Settings saved successfully!");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ApiKeyConfiguration
          elevenLabsApiKey={elevenLabsApiKey}
          elevenLabsAgentId={elevenLabsAgentId}
          setElevenLabsApiKey={setElevenLabsApiKey}
          setElevenLabsAgentId={setElevenLabsAgentId}
          onSave={handleApiKeySave}
          apiKeyConfigured={apiKeyConfigured}
          setApiKeyConfigured={setApiKeyConfigured}
          agentMode={agentMode}
        />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">AI Voice Therapy Assistant</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Speak freely about what's on your mind. Our AI voice assistant with emotion detection is designed to help you
              talk through your thoughts and feelings, providing a judgment-free space for stress relief.
            </p>
          </div>

          {apiKeyConfigured && (
            <AssistantModeTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              elevenLabsApiKey={elevenLabsApiKey}
              elevenLabsAgentId={elevenLabsAgentId}
              messages={messages}
              emotionEnabled={emotionEnabled}
              emotions={emotions}
              isEmotionLoading={isEmotionLoading}
              isListening={isListening}
              isSpeaking={isSpeaking}
              volume={volume}
              toggleListening={toggleListening}
              stopSpeaking={stopSpeaking}
              adjustVolume={adjustVolume}
              resetConversation={resetConversation}
              apiKeyConfigured={apiKeyConfigured}
              toggleEmotionDetection={toggleEmotionDetection}
              browserSupportsEmotionDetection={browserSupportsEmotionDetection}
            />
          )}

          <VoiceAssistantHelp emotionEnabled={emotionEnabled} />
        </div>
      </div>
    </section>
  );
};

export default AIVoiceAgentComponent;
