
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useElevenLabsVoice } from './use-eleven-labs-voice';
import { browserAIService } from '@/services/browser-ai-service';

export type VoiceMessageType = {
  role: "user" | "assistant";
  content: string;
  emotion?: string;
};

export type VoiceAssistantOptions = {
  initialMessages?: VoiceMessageType[];
  initialVolume?: number;
  elevenLabsApiKey?: string;
  agentId?: string;
  useBrowserVoice?: boolean;
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
  const [agentMode, setAgentMode] = useState(!!options?.agentId);
  const [useBrowserVoice, setUseBrowserVoice] = useState(options?.useBrowserVoice ?? !options?.elevenLabsApiKey);
  
  // ElevenLabs Voice Synthesis (optional)
  const { synthesizeSpeech, getSignedAgentUrl, isLoading: isSynthesizing } = useElevenLabsVoice(
    options?.elevenLabsApiKey || '', 
    { 
      voiceId: 'EXAVITQu4vr4xnSDxMaL',
      agentId: options?.agentId
    }
  );

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voicesLoadedRef = useRef<boolean>(false);

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

  // Initialize agent mode if agent ID is provided
  useEffect(() => {
    if (options?.agentId && options?.elevenLabsApiKey) {
      setAgentMode(true);
      toast.info("Agent mode activated. Using ElevenLabs conversation agent.");
    } else {
      setAgentMode(false);
    }
  }, [options?.agentId, options?.elevenLabsApiKey]);

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
            
            recognitionRef.current.start();
            setIsListening(true);
            toast.success("Listening... Speak now");
          }
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

  const generateAIResponse = (userMessage: string, detectedEmotion?: string) => {
    if (agentMode && options?.elevenLabsApiKey) {
      // If in agent mode and we have an API key, use the agent for conversation
      generateAgentResponse(userMessage);
    } else {
      // Use the simple response generation otherwise
      generateSimpleResponse(userMessage, detectedEmotion);
    }
  };
  
  const generateAgentResponse = async (userMessage: string) => {
    // This is a placeholder for agent conversation - would need to be 
    // replaced with actual agent conversation implementation
    toast.info("Connecting to ElevenLabs Agent...");
    
    try {
      // Get a signed URL for the conversation
      const signedUrl = await getSignedAgentUrl();
      
      if (!signedUrl) {
        throw new Error("Failed to get signed URL for agent conversation");
      }
      
      toast.success("Connected to ElevenLabs Agent");
      
      // Simulate agent response
      setTimeout(() => {
        const response = "I'm the ElevenLabs agent assistant. I'm here to help with your mental health concerns. To fully utilize the agent functionality, you'll need to implement the full ElevenLabs Conversation API.";
        const assistantMessage: VoiceMessageType = { role: "assistant", content: response };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Speak the response
        speakText(response);
      }, 1000);
      
    } catch (error) {
      console.error("Agent conversation error:", error);
      toast.error("Failed to connect to agent. Falling back to simple response generation.");
      
      // Fall back to simple response generation
      generateSimpleResponse(userMessage);
    }
  };

  const generateSimpleResponse = (userMessage: string, detectedEmotion?: string) => {
    // Extend responses based on emotions (if emotion detection is enabled)
    const emotionResponses: Record<string, string[]> = {
      joy: [
        "It's wonderful to hear that you're feeling happy! What's contributing to your positive mood today?",
        "That joy in your voice is clear! Would you like to share more about what's making you feel good?",
      ],
      sadness: [
        "I can hear that you're feeling down. Remember that it's okay to feel this way, and these feelings will eventually pass.",
        "I'm sorry you're feeling sad. Would it help to talk more about what's troubling you?",
      ],
      anger: [
        "I notice you might be feeling frustrated or angry. Taking deep breaths can sometimes help manage those intense emotions.",
        "It sounds like something has upset you. Would you like to talk about what triggered these feelings?"
      ],
      fear: [
        "I can hear some anxiety in your voice. Remember that acknowledging your fears is the first step to addressing them.",
        "When we feel afraid, our thoughts can spiral. Let's try to identify what specific concerns you have right now."
      ],
      neutral: [
        "Thank you for sharing that. Would you like to explore any particular aspect of what you mentioned?",
        "I appreciate you opening up. Is there anything specific you'd like guidance on?"
      ],
      surprise: [
        "That seems unexpected for you! How are you processing this surprising situation?",
        "Unexpected events can sometimes throw us off balance. How are you adjusting to this surprise?"
      ],
    };

    // Simulate AI response generation
    let response = "";
    
    // Consider emotion if available
    if (detectedEmotion && emotionResponses[detectedEmotion]) {
      const emotionalResponses = emotionResponses[detectedEmotion];
      response = emotionalResponses[Math.floor(Math.random() * emotionalResponses.length)];
    } else {
      // Default responses if no emotion detected or not in our map
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
    }
    
    // Simulate delay for realistic conversation feel
    setTimeout(() => {
      const assistantMessage: VoiceMessageType = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Speak the response
      speakText(response);
    }, 1000);
  };

  const speakText = async (text: string) => {
    if (isSynthesizing) return;

    setIsSpeaking(true);
    
    // Use browser speech synthesis if no API key or explicitly enabled
    if (useBrowserVoice || !options?.elevenLabsApiKey) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = volume;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        // Try to find a natural voice
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
          v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')
        ) || voices.find(v => v.lang.startsWith('en'));
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Browser speech synthesis error:', error);
        setIsSpeaking(false);
      }
      return;
    }
    
    // Use ElevenLabs if API key is provided
    try {
      const audioUrl = await synthesizeSpeech(text);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.volume = volume;
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      }
    } catch (error) {
      // Fallback to browser voice
      console.warn('ElevenLabs failed, using browser voice');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
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

  // Add a new message manually (e.g., for typed input)
  const addMessage = (message: VoiceMessageType) => {
    setMessages(prev => [...prev, message]);
    
    if (message.role === 'user') {
      generateAIResponse(message.content, message.emotion);
    }
  };

  // Reset conversation
  const resetConversation = () => {
    setMessages([{
      role: "assistant",
      content: "Hi, I'm your mental health voice assistant. How are you feeling today?",
    }]);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
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
    agentMode,
    toggleListening,
    addMessage,
    speakText,
    stopSpeaking,
    adjustVolume,
    resetConversation
  };
};
