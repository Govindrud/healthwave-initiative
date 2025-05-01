
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Mic, MicOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAI } from '@/hooks/use-ai';

// Assistant personas definition
const assistantPersonas = [
  { 
    id: "therapist", 
    name: "Dr. Emily", 
    role: "Therapist",
    description: "Compassionate therapist specialized in cognitive behavioral therapy",
    greeting: "Hi, I'm Dr. Emily. I'm here to provide a safe space for you to explore your thoughts and feelings. How are you doing today?",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Emily&backgroundColor=b6e3f4"
  },
  { 
    id: "coach", 
    name: "Coach Mike", 
    role: "Life Coach",
    description: "Motivational life coach focused on goals and personal development",
    greeting: "Hey there! Coach Mike here. Ready to work on achieving your goals and becoming your best self? What's on your mind today?",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Mike&backgroundColor=d1f4d9"
  },
  { 
    id: "mindful", 
    name: "Serena", 
    role: "Mindfulness Guide",
    description: "Mindfulness and meditation guide for stress reduction",
    greeting: "Welcome. I'm Serena, your guide to mindfulness practice. Let's take a moment to center ourselves. How is your present moment?",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Serena&backgroundColor=f8e3fd"
  },
  { 
    id: "friend", 
    name: "Alex", 
    role: "Supportive Friend",
    description: "Non-judgmental supportive friend for casual conversations",
    greeting: "Hey! I'm Alex. Sometimes you just need someone to talk to, and I'm here for that. What's going on in your world?",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Alex&backgroundColor=fde2dd"
  }
];

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIPersonalAssistant: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState(assistantPersonas[0]);
  const [messages, setMessages] = useState<Message[]>([
    { text: selectedPersona.greeting, sender: 'assistant', timestamp: new Date() }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { analyzeUserText, isAnalyzingText } = useAI();
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Reset conversation when persona changes
  useEffect(() => {
    setMessages([
      { text: selectedPersona.greeting, sender: 'assistant', timestamp: new Date() }
    ]);
  }, [selectedPersona]);

  // Handle speech recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }
    
    setIsListening(true);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsListening(false);
      
      // Automatically send message if it's longer than 3 words
      const wordCount = transcript.trim().split(/\s+/).length;
      if (wordCount > 3) {
        handleSendMessage(transcript);
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast.error("There was an error with the speech recognition");
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  // Generate AI response based on persona
  const generateResponse = async (userMessage: string) => {
    setIsProcessing(true);
    
    try {
      // Use analyzeUserText from useAI hook to get sentiment analysis
      const analysis = await analyzeUserText(userMessage);
      
      let response = '';
      
      // Generate different responses based on persona and sentiment
      switch (selectedPersona.id) {
        case 'therapist':
          if (analysis?.sentiment === 'negative') {
            response = "I notice that seems challenging for you. Can you tell me more about what you're experiencing?";
          } else if (analysis?.sentiment === 'positive') {
            response = "I'm glad to hear that positive aspect. How does that make you feel overall?";
          } else {
            response = "Thank you for sharing that. Could you elaborate on how this has been affecting you lately?";
          }
          break;
          
        case 'coach':
          if (analysis?.sentiment === 'negative') {
            response = "I hear your frustration. Let's think about what steps we could take to address this situation.";
          } else if (analysis?.sentiment === 'positive') {
            response = "That's great progress! How can we build on this momentum to reach your next goal?";
          } else {
            response = "Let's explore this further. What would be your ideal outcome in this situation?";
          }
          break;
          
        case 'mindful':
          if (analysis?.sentiment === 'negative') {
            response = "Let's pause and acknowledge these feelings without judgment. How does this emotion feel in your body right now?";
          } else if (analysis?.sentiment === 'positive') {
            response = "Take a moment to fully savor this positive experience. What sensations do you notice when you focus on it?";
          } else {
            response = "Let's take a deep breath together and observe what arises when we sit with this thought.";
          }
          break;
          
        case 'friend':
          if (analysis?.sentiment === 'negative') {
            response = "That sounds tough. I'm here for you - do you want to talk more about it or would a distraction help?";
          } else if (analysis?.sentiment === 'positive') {
            response = "That's awesome! Tell me more - I want to hear all about it.";
          } else {
            response = "Interesting! What else has been going on with you lately?";
          }
          break;
          
        default:
          response = "Thank you for sharing that. Tell me more about what's on your mind.";
      }
      
      // Add some variation to prevent repetitive responses
      const variations = [
        `${response}`,
        `I understand. ${response}`,
        `${response} I'm listening.`,
        `${response} Please continue.`
      ];
      
      return variations[Math.floor(Math.random() * variations.length)];
      
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble processing that right now. Could you rephrase or try again in a moment?";
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async (text = userInput) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = { text, sender: 'user' as const, timestamp: new Date() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setUserInput('');
    
    // Generate response with slight delay for realism
    setTimeout(async () => {
      const response = await generateResponse(text);
      setMessages(prevMessages => [
        ...prevMessages, 
        { text: response, sender: 'assistant', timestamp: new Date() }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <img 
              src={selectedPersona.avatar} 
              alt={selectedPersona.name} 
              className="w-10 h-10 rounded-full" 
            />
            <div>
              <span>{selectedPersona.name}</span>
              <span className="text-sm text-gray-500 block">{selectedPersona.role}</span>
            </div>
          </CardTitle>
          <CardDescription>
            {selectedPersona.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue={selectedPersona.id} className="mb-4">
            <TabsList className="grid grid-cols-4">
              {assistantPersonas.map(persona => (
                <TabsTrigger 
                  key={persona.id} 
                  value={persona.id}
                  onClick={() => setSelectedPersona(persona)}
                >
                  {persona.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="bg-slate-50 rounded-md border h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'assistant' 
                      ? 'bg-white border border-slate-200' 
                      : 'bg-meant-600 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => startListening()} 
              disabled={isListening}
            >
              {isListening ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Input 
              placeholder="Type your message..." 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)} 
              onKeyDown={handleKeyPress}
              disabled={isListening}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage()} 
              disabled={!userInput.trim() || isProcessing}
            >
              {isProcessing ? <div className="w-5 h-5 animate-spin border-2 border-white border-t-transparent rounded-full" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
          <div className="w-full mt-4">
            <Button variant="outline" className="w-full" onClick={() => window.location.href="/ai-voice-agent"}>
              Try Voice Assistant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIPersonalAssistant;
