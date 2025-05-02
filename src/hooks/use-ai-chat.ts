
import { useState, useCallback, useEffect } from 'react';
import { aiService, AITextRequest } from '@/services/ai-service';
import { toast } from 'sonner';

export interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface AIPersona {
  id: string;
  name: string;
  role: string;
  description: string;
  greeting: string;
  avatar: string;
}

// Assistant personas definition
const assistantPersonas: AIPersona[] = [
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

export function useAIChat() {
  const [selectedPersona, setSelectedPersona] = useState(assistantPersonas[0]);
  const [messages, setMessages] = useState<Message[]>([
    { text: assistantPersonas[0].greeting, sender: 'assistant', timestamp: new Date() }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Reset conversation when persona changes
  useEffect(() => {
    setMessages([
      { text: selectedPersona.greeting, sender: 'assistant', timestamp: new Date() }
    ]);
  }, [selectedPersona]);

  // Handle speech recognition
  const startListening = useCallback(() => {
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
  }, []);

  // Generate AI response based on persona
  const generateResponse = async (userMessage: string) => {
    setIsProcessing(true);
    
    try {
      // Use analyzeText from aiService
      const request: AITextRequest = {
        text: userMessage,
        personaId: selectedPersona.id
      };
      
      const analysis = await aiService.analyzeText(request);
      
      let response = '';
      
      // Generate different responses based on persona and sentiment
      switch (selectedPersona.id) {
        case 'therapist':
          if (analysis.sentiment === 'negative') {
            response = "I notice that seems challenging for you. Can you tell me more about what you're experiencing?";
          } else if (analysis.sentiment === 'positive') {
            response = "I'm glad to hear that positive aspect. How does that make you feel overall?";
          } else {
            response = "Thank you for sharing that. Could you elaborate on how this has been affecting you lately?";
          }
          break;
          
        case 'coach':
          if (analysis.sentiment === 'negative') {
            response = "I hear your frustration. Let's think about what steps we could take to address this situation.";
          } else if (analysis.sentiment === 'positive') {
            response = "That's great progress! How can we build on this momentum to reach your next goal?";
          } else {
            response = "Let's explore this further. What would be your ideal outcome in this situation?";
          }
          break;
          
        case 'mindful':
          if (analysis.sentiment === 'negative') {
            response = "Let's pause and acknowledge these feelings without judgment. How does this emotion feel in your body right now?";
          } else if (analysis.sentiment === 'positive') {
            response = "Take a moment to fully savor this positive experience. What sensations do you notice when you focus on it?";
          } else {
            response = "Let's take a deep breath together and observe what arises when we sit with this thought.";
          }
          break;
          
        case 'friend':
          if (analysis.sentiment === 'negative') {
            response = "That sounds tough. I'm here for you - do you want to talk more about it or would a distraction help?";
          } else if (analysis.sentiment === 'positive') {
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
  
  const changePersona = (personaId: string) => {
    const persona = assistantPersonas.find(p => p.id === personaId) || assistantPersonas[0];
    setSelectedPersona(persona);
  };

  return {
    personaId: selectedPersona.id,
    selectedPersona,
    messages,
    userInput,
    setUserInput,
    isProcessing,
    isListening,
    allPersonas: assistantPersonas,
    handleSendMessage,
    startListening,
    changePersona
  };
}

export default useAIChat;
