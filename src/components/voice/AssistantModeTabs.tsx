
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Bot } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ConversationArea from "./ConversationArea";
import EmotionDetectionArea from "./EmotionDetectionArea";
import VoiceControls from "./VoiceControls";
import AgentConversationInterface from "./AgentConversationInterface";
import EmotionDetectionToggle from "./EmotionDetectionToggle";
import { VoiceMessageType } from "@/hooks/use-voice-assistant";

interface AssistantModeTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  elevenLabsApiKey: string;
  elevenLabsAgentId: string;
  messages: VoiceMessageType[];
  emotionEnabled: boolean;
  emotions: { label: string; score: number }[];
  isEmotionLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  volume: number;
  toggleListening: () => void;
  stopSpeaking: () => void;
  adjustVolume: (volume: number) => void;
  resetConversation: () => void;
  apiKeyConfigured: boolean;
  toggleEmotionDetection: () => void;
  browserSupportsEmotionDetection: boolean;
}

const AssistantModeTabs: React.FC<AssistantModeTabsProps> = ({
  activeTab,
  setActiveTab,
  elevenLabsApiKey,
  elevenLabsAgentId,
  messages,
  emotionEnabled,
  emotions,
  isEmotionLoading,
  isListening,
  isSpeaking,
  volume,
  toggleListening,
  stopSpeaking,
  adjustVolume,
  resetConversation,
  apiKeyConfigured,
  toggleEmotionDetection,
  browserSupportsEmotionDetection,
}) => {
  return (
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
                      <p>
                        This AI voice assistant is designed to provide immediate support through conversation.
                        Speak naturally as if talking to a friend. Your conversation stays private and is not stored.
                      </p>
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
          <EmotionDetectionToggle
            emotionEnabled={emotionEnabled}
            toggleEmotionDetection={toggleEmotionDetection}
            isEmotionLoading={isEmotionLoading}
            apiKeyConfigured={apiKeyConfigured}
            browserSupportsEmotionDetection={browserSupportsEmotionDetection}
          />
        </div>
      </TabsContent>

      <TabsContent value="agent">
        <AgentConversationInterface
          apiKey={elevenLabsApiKey}
          agentId={elevenLabsAgentId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AssistantModeTabs;
