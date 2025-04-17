
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

export type VoiceMessageType = {
  role: "user" | "assistant";
  content: string;
};

export type VoiceAssistantOptions = {
  initialMessages?: VoiceMessageType[];
  initialVolume?: number;
};

export const useVoiceAssistant = (options?: VoiceAssistantOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<VoiceMessageType[]>(
    options?.initialMessages || [
      {
        role: "assistant",
        content: "Hi, I'm your mental health voice assistant. How are you feeling today?",
      },
    ]
  );
  const [volume, setVolume] = useState(options?.initialVolume || 0.8);
  
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesLoadedRef = useRef<boolean>(false);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        handleUserMessage(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event);
        toast.error("There was an error with the speech recognition");
        setIsListening(false);
      };

      // Make sure we get all available voices
      if (window.speechSynthesis) {
        // Load available voices
        const loadVoices = () => {
          voicesLoadedRef.current = true;
        };

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Initial load attempt
        loadVoices();
      }
    } else {
      toast.error("Speech recognition is not supported by your browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      toast.info("Listening paused");
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        toast.success("Listening... Speak now");
      } catch (err) {
        console.error("Error starting speech recognition", err);
        toast.error("Failed to start listening. Please try again.");
        
        // Try restarting recognition if it failed
        try {
          recognitionRef.current = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'en-US';
          
          recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            handleUserMessage(transcript);
          };
          
          recognitionRef.current.start();
          setIsListening(true);
          toast.success("Listening... Speak now");
        } catch (retryErr) {
          toast.error("Could not start speech recognition. Please refresh the page and try again.");
        }
      }
    }
  };

  const handleUserMessage = (text: string) => {
    // Add user message
    const userMessage: VoiceMessageType = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    
    // Generate AI response
    generateAIResponse(text);
  };

  const generateAIResponse = (userMessage: string) => {
    // Simulate AI response generation
    const responses = [
      "I hear that you're feeling stressed. Can you tell me more about what's on your mind?",
      "It sounds like you've been going through a lot. Remember that it's okay to take breaks and prioritize your mental health.",
      "I understand. Sometimes talking about our feelings helps release some of that stress. What do you think might help you feel better right now?",
      "That's completely valid. Many people experience similar feelings. Would it help to try a brief breathing exercise together?",
      "Thank you for sharing that with me. It takes courage to speak about your feelings. Is there a specific aspect of this situation that's most challenging for you?",
      "I'm here to listen. Would you like to explore some coping strategies that might help with what you're experiencing?",
    ];

    // Consider the content of user message to provide more relevant responses
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = "";

    if (lowerCaseMessage.includes("anxious") || lowerCaseMessage.includes("anxiety")) {
      response = "Anxiety can be challenging to deal with. Let's focus on grounding techniques - can you name five things you can see around you right now?";
    } else if (lowerCaseMessage.includes("sad") || lowerCaseMessage.includes("depress")) {
      response = "I'm sorry you're feeling this way. Depression and sadness can be very difficult. Have you been able to connect with supportive people in your life recently?";
    } else if (lowerCaseMessage.includes("overwhelm")) {
      response = "Feeling overwhelmed is common. Let's break things down - what's one small task you could focus on right now?";
    } else if (lowerCaseMessage.includes("tired") || lowerCaseMessage.includes("exhaust")) {
      response = "It sounds like you need some rest. Are you getting enough sleep? Sometimes our mental health is deeply connected to our physical wellbeing.";
    } else if (lowerCaseMessage.includes("help")) {
      response = "I'm here to support you. For serious concerns, please consider speaking with a mental health professional who can provide personalized care.";
    } else {
      // Random response if no keywords match
      response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Simulate delay for realistic conversation feel
    setTimeout(() => {
      const assistantMessage: VoiceMessageType = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Speak the response
      speakText(response);
    }, 1000);
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) {
      toast.error("Text-to-speech is not supported by your browser");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesisRef.current = utterance;
    
    // Set voice - try to use a female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('female') || 
      voice.name.includes('Samantha') || 
      voice.name.includes('Lisa')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    // Set properties
    utterance.volume = volume;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("Speech synthesis error", event);
      setIsSpeaking(false);
      toast.error("There was an error with the speech synthesis");
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.volume = newVolume;
    }
  };

  // Add a new message manually (e.g., for typed input)
  const addMessage = (message: VoiceMessageType) => {
    setMessages(prev => [...prev, message]);
    
    if (message.role === 'user') {
      generateAIResponse(message.content);
    }
  };

  // Reset conversation
  const resetConversation = () => {
    setMessages([{
      role: "assistant",
      content: "Hi, I'm your mental health voice assistant. How are you feeling today?",
    }]);
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  return {
    messages,
    isListening,
    isSpeaking,
    volume,
    toggleListening,
    addMessage,
    speakText,
    stopSpeaking,
    adjustVolume,
    resetConversation
  };
};
