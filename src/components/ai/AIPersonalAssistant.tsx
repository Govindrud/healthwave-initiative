
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SendHorizonal, Bot, User, Mic, MicOff, MessageCircle, Volume, VolumeOff } from "lucide-react";
import { useAI } from '@/hooks/use-ai';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type MessageType = {
  role: "user" | "assistant";
  content: string;
  sentiment?: string;
};

type PersonaType = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  style: string;
};

const personas: PersonaType[] = [
  {
    id: "therapist",
    name: "Dr. Sarah",
    description: "Trained therapist with a focus on cognitive behavioral therapy",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=256&h=256&fit=crop",
    style: "bg-teal-50 border-teal-200"
  },
  {
    id: "coach",
    name: "Coach Michael",
    description: "Motivational coach focused on achieving goals",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=256&h=256&fit=crop",
    style: "bg-blue-50 border-blue-200" 
  },
  {
    id: "friend",
    name: "Alex",
    description: "Supportive friend for casual conversation and emotional support",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&fit=crop",
    style: "bg-purple-50 border-purple-200"
  },
  {
    id: "meditation",
    name: "Zen Guide Maya",
    description: "Mindfulness and meditation guide for spiritual wellness",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop",
    style: "bg-amber-50 border-amber-200"
  }
];

const AIPersonalAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: "assistant",
      content: "Hi, I'm your personal mental health assistant. How are you feeling today?",
    },
  ]);
  const [selectedPersona, setSelectedPersona] = useState<string>("therapist");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { analyzeUserText } = useAI();
  
  // SpeechRecognition setup
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  
  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        toast.error("Speech recognition error. Please try again.");
        setIsListening(false);
      };
    }
    
    synthRef.current = window.speechSynthesis;
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: MessageType = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Analyze sentiment if possible
      let sentiment = undefined;
      try {
        const analysis = await analyzeUserText(text);
        sentiment = analysis?.sentiment;
      } catch (error) {
        console.error("Error analyzing text:", error);
      }
      
      // Get current persona
      const persona = personas.find(p => p.id === selectedPersona) || personas[0];
      
      // Generate response based on persona and sentiment
      setTimeout(() => {
        const response = generatePersonaResponse(text, persona.id, sentiment);
        
        const assistantMessage: MessageType = { 
          role: "assistant", 
          content: response,
          sentiment 
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
        
        // Speak the response if enabled
        if (isSpeaking) {
          speakText(response);
        }
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };
  
  // Generate response based on persona
  const generatePersonaResponse = (userMessage: string, persona: string, sentiment?: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Basic response templates based on personas
    const responses: Record<string, string[]> = {
      therapist: [
        "I notice you mentioned feeling [emotion]. Can you tell me more about what triggered these feelings?",
        "That sounds challenging. Have you tried any coping strategies for this situation?",
        "I'm here to support you. Let's explore how this situation is affecting your daily life.",
        "Your feelings are valid. Would it help to discuss some ways to manage these emotions?",
        "Thank you for sharing. Have you noticed any patterns when these feelings arise?"
      ],
      coach: [
        "I hear your concerns. What specific goal would you like to work towards to address this?",
        "You've got this! Let's break this down into smaller, achievable steps.",
        "That's a common challenge. What's one small action you could take today?",
        "I believe in your ability to overcome this. What strengths can you draw on?",
        "Progress takes time. Let's focus on what you can control right now."
      ],
      friend: [
        "That sounds tough. I'm here for you if you need to vent more about it.",
        "I get what you mean. How are you handling everything right now?",
        "Thanks for sharing that with me. Is there anything I can do to help?",
        "I'm sorry you're going through this. Would talking more about it help?",
        "I'm always here to listen. No judgment, just support."
      ],
      meditation: [
        "Take a deep breath with me. Let's focus on the present moment together.",
        "Notice your feelings without judgment. How does your body respond to these thoughts?",
        "Let's practice a quick grounding exercise. Can you name five things you can see right now?",
        "Your mind is like the sky, and these thoughts are just passing clouds.",
        "Remember that all emotions are temporary, like waves that rise and fall."
      ]
    };
    
    // Select appropriate response template
    const personaResponses = responses[persona] || responses.friend;
    let responseTemplate = personaResponses[Math.floor(Math.random() * personaResponses.length)];
    
    // Customize based on detected emotion/keywords
    if (sentiment === "negative" || lowerMessage.includes("sad") || lowerMessage.includes("depress") || lowerMessage.includes("anxious")) {
      responseTemplate = responseTemplate.replace("[emotion]", "down");
    } else if (sentiment === "positive" || lowerMessage.includes("happy") || lowerMessage.includes("great") || lowerMessage.includes("good")) {
      responseTemplate = responseTemplate.replace("[emotion]", "positive");
    } else {
      responseTemplate = responseTemplate.replace("[emotion]", "this way");
    }
    
    // Customize for specific concerns
    if (lowerMessage.includes("sleep")) {
      return `I understand sleep issues can be very challenging. Have you established a consistent bedtime routine? Sometimes small changes like reducing screen time before bed or practicing relaxation techniques can make a big difference.`;
    } else if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelm")) {
      return `It sounds like you're feeling overwhelmed. Let's take a step back and focus on what's within your control right now. Perhaps we could break down your concerns into smaller, more manageable parts?`;
    } else if (lowerMessage.includes("family") || lowerMessage.includes("relationship")) {
      return `Relationships can be complex. How do you feel these interactions are impacting your wellbeing? Sometimes improving communication techniques can help bridge understanding.`;
    }
    
    return responseTemplate;
  };
  
  // Toggle speech recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info("Listening... Speak now");
    }
  };
  
  // Speak text aloud
  const speakText = (text: string) => {
    if (!synthRef.current) {
      toast.error("Text-to-speech is not supported in your browser.");
      return;
    }
    
    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on persona
    const voices = synthRef.current.getVoices();
    if (voices.length > 0) {
      // Try to find appropriate voice based on persona
      let voiceIndex = 0;
      
      switch (selectedPersona) {
        case 'therapist':
          // Find a female voice
          voiceIndex = voices.findIndex(v => v.name.includes('Female') || v.name.includes('female'));
          break;
        case 'coach':
          // Find a male voice
          voiceIndex = voices.findIndex(v => v.name.includes('Male') || v.name.includes('male'));
          break;
        case 'friend':
          // Find a younger sounding voice
          voiceIndex = voices.findIndex(v => v.name.includes('Google') || v.name.includes('Natural'));
          break;
        case 'meditation':
          // Find a calm sounding voice
          voiceIndex = voices.findIndex(v => v.name.includes('Calm') || v.name.includes('Samantha'));
          break;
      }
      
      // Use found voice or default to first voice
      utterance.voice = voices[voiceIndex > 0 ? voiceIndex : 0];
    }
    
    synthRef.current.speak(utterance);
  };
  
  // Toggle speech
  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    
    if (isSpeaking) {
      // Turn off speech
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
      toast.info("Voice responses turned off");
    } else {
      toast.success("Voice responses turned on");
      
      // Speak the last assistant message as confirmation
      const lastAssistantMsg = [...messages].reverse().find(m => m.role === "assistant");
      if (lastAssistantMsg) {
        speakText(lastAssistantMsg.content);
      }
    }
  };

  return (
    <section id="ai-assistant" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">AI Personal Mental Health Assistant</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chat with an AI assistant designed to support your mental wellbeing. Choose from different support personas based on what you need right now. 
              While not a replacement for professional help, our AI can provide guidance, reflection, and coping strategies.
            </p>
          </div>
          
          <Tabs defaultValue="chat" className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="personas">
                <User className="mr-2 h-4 w-4" />
                Choose Assistant
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={personas.find(p => p.id === selectedPersona)?.avatar} />
                        <AvatarFallback>{personas.find(p => p.id === selectedPersona)?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {personas.find(p => p.id === selectedPersona)?.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {personas.find(p => p.id === selectedPersona)?.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={toggleSpeaking}
                        title={isSpeaking ? "Turn off voice responses" : "Turn on voice responses"}
                      >
                        {isSpeaking ? <Volume className="h-4 w-4" /> : <VolumeOff className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={toggleListening}
                        disabled={isLoading}
                        title={isListening ? "Stop listening" : "Start voice input"}
                        className={isListening ? "bg-meant-600 text-white hover:bg-meant-700" : ""}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] mb-4 overflow-y-auto pt-4 space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-meant-600 text-white rounded-br-none"
                              : `bg-white border shadow-sm rounded-bl-none ${personas.find(p => p.id === selectedPersona)?.style || "border-gray-200"}`
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {msg.role === "assistant" ? (
                              <>
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={personas.find(p => p.id === selectedPersona)?.avatar} />
                                  <AvatarFallback><Bot className="h-3 w-3" /></AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-semibold">
                                  {personas.find(p => p.id === selectedPersona)?.name || "AI Assistant"}
                                </span>
                              </>
                            ) : (
                              <>
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-semibold">You</span>
                              </>
                            )}
                            {msg.sentiment && (
                              <Badge 
                                variant="outline" 
                                className={`ml-1 text-xs ${
                                  msg.sentiment === "positive" ? "bg-green-50 text-green-700 border-green-200" : 
                                  msg.sentiment === "negative" ? "bg-red-50 text-red-700 border-red-200" : 
                                  "bg-gray-50 text-gray-700 border-gray-200"
                                }`}
                              >
                                {msg.sentiment}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className={`bg-white border shadow-sm px-4 py-3 rounded-lg rounded-bl-none ${personas.find(p => p.id === selectedPersona)?.style || "border-gray-200"} max-w-[80%]`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={personas.find(p => p.id === selectedPersona)?.avatar} />
                              <AvatarFallback><Bot className="h-3 w-3" /></AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-semibold">
                              {personas.find(p => p.id === selectedPersona)?.name || "AI Assistant"}
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-meant-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                              <div className="w-2 h-2 bg-meant-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                              <div className="w-2 h-2 bg-meant-600 rounded-full animate-bounce"></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder={isListening ? "Listening... speak now" : "Type your message..."}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isLoading) {
                          handleSendMessage();
                        }
                      }}
                      disabled={isLoading || isListening}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => handleSendMessage()} 
                      disabled={isLoading || !input.trim()}
                      className="bg-meant-600 hover:bg-meant-700"
                    >
                      <SendHorizonal className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="personas">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {personas.map((persona) => (
                  <Card 
                    key={persona.id} 
                    className={`cursor-pointer transition-all ${selectedPersona === persona.id ? 'ring-2 ring-meant-600 shadow-lg' : 'hover:shadow-md'}`}
                    onClick={() => setSelectedPersona(persona.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={persona.avatar} />
                          <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{persona.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{persona.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              This AI assistant is designed to provide support but is not a substitute for professional help.
              If you're experiencing a crisis, please contact a mental health professional or
              call a crisis helpline immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPersonalAssistant;
