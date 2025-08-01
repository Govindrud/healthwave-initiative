
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { VoiceMessageType } from "@/hooks/use-voice-assistant";
import { useElevenLabsVoice } from "@/hooks/use-eleven-labs-voice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AgentConversationInterfaceProps {
  apiKey: string;
  agentId: string;
  onClose?: () => void;
}

const AgentConversationInterface: React.FC<AgentConversationInterfaceProps> = ({
  apiKey, 
  agentId,
  onClose
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [messages, setMessages] = useState<VoiceMessageType[]>([
    {
      role: "assistant",
      content: "Hello! I'm your ElevenLabs AI assistant. How can I help you today?",
    }
  ]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize ElevenLabs voice
  const { 
    getSignedAgentUrl, 
    interactWithAgent,
    synthesizeSpeech,
    isLoading 
  } = useElevenLabsVoice(apiKey, { agentId });

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        handleUserMessage(transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event);
        toast.error("There was an error with the speech recognition");
        setIsListening(false);
      };
    } else {
      toast.error("Speech recognition is not supported by your browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Connect to agent
  useEffect(() => {
    const connectToAgent = async () => {
      setConnecting(true);
      try {
        const signedUrl = await getSignedAgentUrl();
        if (signedUrl) {
          setConnected(true);
          // In a real implementation, you would establish a WebSocket connection here
          toast.success("Connected to AI agent");
          
          // Speak the welcome message
          const welcomeMessage = messages[0].content;
          speakText(welcomeMessage);
        }
      } catch (error) {
        console.error("Error connecting to agent:", error);
        toast.error("Failed to connect to AI agent");
      } finally {
        setConnecting(false);
      }
    };

    if (apiKey && agentId) {
      connectToAgent();
    }
  }, [apiKey, agentId, getSignedAgentUrl, messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        toast.success("Listening... Speak now");
      } catch (err) {
        console.error("Error starting speech recognition", err);
        toast.error("Failed to start listening. Please try again.");
      }
    }
  };

  const handleUserMessage = async (text: string) => {
    // Add user message
    const userMessage: VoiceMessageType = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    
    // Stop listening while processing
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    // Get response from agent
    const response = await interactWithAgent(text);
    
    if (response) {
      const assistantMessage: VoiceMessageType = { 
        role: "assistant", 
        content: response.text 
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      if (response.audioUrl) {
        playAudio(response.audioUrl);
      }
    } else {
      // Fallback if agent interaction failed
      const fallbackMessage = "I'm sorry, I couldn't process that request. Would you like to try again?";
      setMessages((prev) => [...prev, { role: "assistant", content: fallbackMessage }]);
      
      const audioUrl = await synthesizeSpeech(fallbackMessage);
      if (audioUrl) {
        playAudio(audioUrl);
      }
    }
  };

  const speakText = async (text: string) => {
    const audioUrl = await synthesizeSpeech(text);
    if (audioUrl) {
      playAudio(audioUrl);
    }
  };

  const playAudio = (audioUrl: string) => {
    setIsSpeaking(true);
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.volume = volume;
    audio.onended = () => setIsSpeaking(false);
    audio.play();
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
    }
  };

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="bg-meant-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-white/20">
            <AvatarImage src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
            <AvatarFallback className="text-white">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">ElevenLabs AI Assistant</span>
            <span className="text-xs opacity-80">
              {connecting ? "Connecting..." : connected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
        <Badge variant="outline" className="bg-white/10 text-white border-white/20">
          Agent Mode
        </Badge>
      </div>
      <CardContent className="p-0">
        <div className="h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
            <div className="flex items-center justify-between gap-4">
              <Button
                onClick={toggleListening}
                variant={isListening ? "destructive" : "default"}
                className={`${isListening ? "bg-red-500" : "bg-meant-600"} flex-1`}
                disabled={isLoading || !connected}
              >
                {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                {isListening ? "Stop" : "Start"} Speaking
              </Button>
              
              <div className="flex items-center gap-2">
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
                  className="w-20 h-2"
                />
                <button 
                  onClick={() => adjustVolume(1)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <Volume2 size={18} />
                </button>
                
                {isSpeaking && (
                  <Button 
                    onClick={stopSpeaking} 
                    variant="outline" 
                    size="sm"
                  >
                    <VolumeX className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
            
            {isListening && (
              <div className="mt-2 animate-pulse text-sm text-red-500">
                Listening to you...
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentConversationInterface;
