import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Info, RotateCcw, Brain } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { useEmotionDetection } from "@/hooks/use-emotion-detection";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const EmotionBadge = ({ emotion }: { emotion: { label: string; score: number } }) => {
  const getColorForEmotion = (emotion: string) => {
    const emotionColors: Record<string, string> = {
      joy: "bg-green-100 text-green-800",
      sadness: "bg-blue-100 text-blue-800",
      anger: "bg-red-100 text-red-800",
      fear: "bg-purple-100 text-purple-800",
      surprise: "bg-yellow-100 text-yellow-800",
      disgust: "bg-orange-100 text-orange-800",
      neutral: "bg-gray-100 text-gray-800",
      approval: "bg-teal-100 text-teal-800",
      disapproval: "bg-rose-100 text-rose-800",
      admiration: "bg-indigo-100 text-indigo-800",
      optimism: "bg-emerald-100 text-emerald-800",
      disappointment: "bg-amber-100 text-amber-800",
      love: "bg-pink-100 text-pink-800",
      caring: "bg-cyan-100 text-cyan-800",
    };
    return emotionColors[emotion.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const percentage = Math.round(emotion.score * 100);
  const colorClass = getColorForEmotion(emotion.label);
  
  return (
    <Badge variant="outline" className={`${colorClass} font-medium`}>
      {emotion.label}: {percentage}%
    </Badge>
  );
};

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
    addMessage,
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

  const renderApiKeyInput = () => (
    <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
      <Label htmlFor="elevenlabs-api-key">ElevenLabs API Key</Label>
      <div className="flex items-center space-x-2 mt-2">
        <Input 
          id="elevenlabs-api-key"
          type="password"
          placeholder="Enter your ElevenLabs API key"
          value={elevenLabsApiKey}
          onChange={(e) => setElevenLabsApiKey(e.target.value)}
        />
        <Button variant="default" onClick={() => toast.success('API Key saved')}>
          Save
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        You can get your API key from the ElevenLabs dashboard
      </p>
    </div>
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {!elevenLabsApiKey && renderApiKeyInput()}

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
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-md bg-gray-50">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          msg.role === "user"
                            ? "bg-meant-600 text-white rounded-tr-none"
                            : "bg-gray-200 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        <div className="mb-1 text-xs font-semibold">
                          {msg.role === "user" ? "You" : "AI Assistant"}
                        </div>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {emotionEnabled && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Brain className="h-4 w-4 mr-2 text-meant-600" />
                      <h3 className="text-sm font-medium">Detected Emotions</h3>
                      {isEmotionLoading && (
                        <div className="ml-2 text-xs text-gray-500">Analyzing...</div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {emotions.slice(0, 3).map((emotion, index) => (
                        <EmotionBadge key={index} emotion={emotion} />
                      ))}
                      {emotions.length === 0 && !isEmotionLoading && (
                        <span className="text-sm text-gray-500">No emotions detected yet</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-100 rounded-md">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={toggleListening}
                      variant={isListening ? "destructive" : "default"}
                      className={isListening ? "bg-red-500" : "bg-meant-600"}
                      size="lg"
                    >
                      {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                      {isListening ? "Stop" : "Start"} Speaking
                    </Button>
                    
                    {isListening && (
                      <div className="animate-pulse text-sm text-red-500">
                        Listening...
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => adjustVolume(0)}
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        <VolumeX size={18} />
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => adjustVolume(parseFloat(e.target.value))}
                        className="w-24 h-2 mx-2"
                      />
                      <button 
                        onClick={() => adjustVolume(1)}
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                    
                    {isSpeaking && (
                      <Button 
                        onClick={stopSpeaking} 
                        variant="outline" 
                        size="sm"
                      >
                        <VolumeX className="mr-2 h-4 w-4" />
                        Stop Audio
                      </Button>
                    )}
                  </div>
                </div>
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
          
          <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">How to use the Voice Assistant</h3>
            <ul className="list-disc pl-5 space-y-2 text-blue-700">
              <li>Click the "Start Speaking" button and allow microphone access</li>
              <li>Speak naturally about how you're feeling or what's on your mind</li>
              <li>The assistant will listen and respond with supportive guidance</li>
              {emotionEnabled && <li>Your emotions will be analyzed to provide more tailored responses</li>}
              <li>You can adjust the volume or stop the assistant from speaking at any time</li>
              <li>Click "Stop" when you're done with the conversation</li>
            </ul>
            <p className="mt-4 text-sm text-blue-600">
              <strong>Note:</strong> This is a supportive tool and not a replacement for professional mental health care. 
              If you're experiencing a crisis, please contact a mental health professional or crisis hotline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIVoiceAgentComponent;
