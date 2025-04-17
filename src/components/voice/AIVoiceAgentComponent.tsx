
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, RotateCcw, Brain } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { useEmotionDetection } from "@/hooks/use-emotion-detection";
import { toast } from "sonner";

// Import our new components
import APIKeyInput from "./APIKeyInput";
import ConversationArea from "./ConversationArea";
import EmotionDetectionArea from "./EmotionDetectionArea";
import VoiceControls from "./VoiceControls";
import VoiceAssistantHelp from "./VoiceAssistantHelp";

const AIVoiceAgentComponent: React.FC = () => {
  const {
    messages,
    isListening,
    isSpeaking,
    volume,
    toggleListening,
    stopSpeaking,
    adjustVolume,
    resetConversation,
  } = useVoiceAssistant();

  const {
    detectEmotion,
    initializeModel,
    isLoading: isEmotionLoading,
    modelLoaded,
    emotions,
  } = useEmotionDetection();

  const [emotionEnabled, setEmotionEnabled] = useState(false);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('');

  useEffect(() => {
    if (emotionEnabled && !modelLoaded) {
      initializeModel();
    }
  }, [emotionEnabled, modelLoaded, initializeModel]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (emotionEnabled && lastMessage?.role === 'user') {
      detectEmotion(lastMessage.content);
    }
  }, [messages, emotionEnabled, detectEmotion]);

  const toggleEmotionDetection = async () => {
    if (!emotionEnabled) {
      await initializeModel();
    }
    setEmotionEnabled(!emotionEnabled);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {!elevenLabsApiKey && (
          <APIKeyInput 
            value={elevenLabsApiKey} 
            onChange={setElevenLabsApiKey} 
          />
        )}

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">AI Voice Therapy Assistant</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Speak freely about what's on your mind. Our AI voice assistant with emotion detection is designed to help you 
              talk through your thoughts and feelings, providing a judgment-free space for stress relief.
            </p>
          </div>
          
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
                disabled={isEmotionLoading}
              >
                <Brain className="mr-2 h-4 w-4" />
                {emotionEnabled ? "Disable" : "Enable"} Emotion Detection
              </Button>
            </div>
          </div>
          
          <VoiceAssistantHelp emotionEnabled={emotionEnabled} />
        </div>
      </div>
    </section>
  );
};

export default AIVoiceAgentComponent;
