
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Info, RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVoiceAssistant } from "@/hooks/use-voice-assistant";

const AIVoiceAgentComponent: React.FC = () => {
  const {
    messages,
    isListening,
    isSpeaking,
    volume,
    toggleListening,
    stopSpeaking,
    adjustVolume,
    resetConversation
  } = useVoiceAssistant();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">AI Voice Therapy Assistant</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Speak freely about what's on your mind. Our AI voice assistant is designed to help you 
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

                {/* Voice controls */}
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
          
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">How to use the Voice Assistant</h3>
            <ul className="list-disc pl-5 space-y-2 text-blue-700">
              <li>Click the "Start Speaking" button and allow microphone access</li>
              <li>Speak naturally about how you're feeling or what's on your mind</li>
              <li>The assistant will listen and respond with supportive guidance</li>
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
