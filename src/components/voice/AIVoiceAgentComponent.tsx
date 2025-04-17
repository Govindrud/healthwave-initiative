
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, RotateCcw, Brain, Bot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { useEmotionDetection } from "@/hooks/use-emotion-detection";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our components
import APIKeyInput from "./APIKeyInput";
import ConversationArea from "./ConversationArea";
import EmotionDetectionArea from "./EmotionDetectionArea";
import VoiceControls from "./VoiceControls";
import VoiceAssistantHelp from "./VoiceAssistantHelp";
import AgentConversationInterface from "./AgentConversationInterface";

const AIVoiceAgentComponent: React.FC = () => {
  // Check for stored API key and agent ID on component mount
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(() => {
    const storedKey = localStorage.getItem("elevenlabs-api-key");
    return storedKey || '';
  });
  
  const [elevenLabsAgentId, setElevenLabsAgentId] = useState(() => {
    const storedAgentId = localStorage.getItem("elevenlabs-agent-id");
    return storedAgentId || '0iVgYogaiePekeUt2C1h'; // Default to provided agent ID
  });
  
  const [apiKeyConfigured, setApiKeyConfigured] = useState(Boolean(elevenLabsApiKey));
  const [browserSupportsEmotionDetection, setBrowserSupportsEmotionDetection] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("basic");
  
  // Check browser compatibility for WebGPU or WebAssembly
  useEffect(() => {
    const checkBrowserCompatibility = async () => {
      // Check if browser supports WebGPU or WebAssembly
      if (!('webgpu' in navigator) && typeof WebAssembly === 'undefined') {
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
    agentId: elevenLabsAgentId
  });

  const {
    detectEmotion,
    initializeModel,
    isLoading: isEmotionLoading,
    modelLoaded,
    emotions,
  } = useEmotionDetection();

  const [emotionEnabled, setEmotionEnabled] = useState(false);

  useEffect(() => {
    if (emotionEnabled && !modelLoaded && browserSupportsEmotionDetection) {
      initializeModel().catch(error => {
        console.error("Error initializing emotion model:", error);
        toast.error("Failed to initialize emotion detection model. This feature may not be available on your browser.");
        setEmotionEnabled(false);
      });
    }
  }, [emotionEnabled, modelLoaded, initializeModel, browserSupportsEmotionDetection]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (emotionEnabled && lastMessage?.role === 'user') {
      detectEmotion(lastMessage.content).catch(error => {
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
        {!apiKeyConfigured ? (
          <div className="mb-6 space-y-4">
            <APIKeyInput 
              value={elevenLabsApiKey} 
              onChange={setElevenLabsApiKey}
              onSave={handleApiKeySave}
            />
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <label htmlFor="agent-id" className="block text-gray-700 font-medium mb-2">
                ElevenLabs Agent ID
              </label>
              <input 
                id="agent-id"
                type="text"
                value={elevenLabsAgentId}
                onChange={(e) => setElevenLabsAgentId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-meant-500"
                placeholder="Enter your ElevenLabs Agent ID"
              />
              <p className="text-xs text-gray-500 mt-2">
                Using ElevenLabs Agents enables more advanced conversation capabilities.
                Default: 0iVgYogaiePekeUt2C1h
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-green-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              ElevenLabs API Key configured
              {agentMode && <span className="ml-2 text-amber-600">(Agent Mode)</span>}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setApiKeyConfigured(false);
              }}
            >
              Change API Keys
            </Button>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">AI Voice Therapy Assistant</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Speak freely about what's on your mind. Our AI voice assistant with emotion detection is designed to help you 
              talk through your thoughts and feelings, providing a judgment-free space for stress relief.
            </p>
          </div>
          
          {apiKeyConfigured && (
            <Tabs 
              defaultValue="basic" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full mb-8"
            >
              <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
                <TabsTrigger value="basic">
                  <span className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>Basic Mode</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="agent">
                  <span className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span>Agent Mode</span>
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Voice Conversation</span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={resetConversation}
                          title="Reset conversation"
                        >
                          <RotateCcw className="h-4 w-4" />
                          <span className="sr-only">Reset conversation</span>
                        </Button>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Info className="h-4 w-4" />
                                <span className="sr-only">Information</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>This AI voice assistant is designed to provide immediate support through conversation. 
                                Speak naturally as if talking to a friend. Your conversation stays private and is not stored.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col h-[400px]">
                      <ConversationArea messages={messages} />

                      {emotionEnabled && (
                        <EmotionDetectionArea 
                          emotions={emotions} 
                          isLoading={isEmotionLoading} 
                        />
                      )}

                      <VoiceControls 
                        isListening={isListening}
                        isSpeaking={isSpeaking}
                        volume={volume}
                        toggleListening={toggleListening}
                        stopSpeaking={stopSpeaking}
                        adjustVolume={adjustVolume}
                        disabled={!apiKeyConfigured}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-8 flex gap-4">
                  <div className="flex-1">
                    <Button 
                      onClick={toggleEmotionDetection}
                      variant={emotionEnabled ? "default" : "outline"}
                      className="w-full"
                      disabled={isEmotionLoading || !apiKeyConfigured || !browserSupportsEmotionDetection}
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      {emotionEnabled ? "Disable" : "Enable"} Emotion Detection
                      {!browserSupportsEmotionDetection && " (Not Supported)"}
                    </Button>
                    {!browserSupportsEmotionDetection && (
                      <p className="text-xs text-amber-600 mt-1">
                        Your browser doesn't support emotion detection. Please try a modern browser that supports WebGPU or WebAssembly.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="agent">
                <AgentConversationInterface 
                  apiKey={elevenLabsApiKey} 
                  agentId={elevenLabsAgentId} 
                />
              </TabsContent>
            </Tabs>
          )}
          
          <VoiceAssistantHelp emotionEnabled={emotionEnabled} />
        </div>
      </div>
    </section>
  );
};

export default AIVoiceAgentComponent;
