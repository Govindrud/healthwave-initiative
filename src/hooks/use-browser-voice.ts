/**
 * Browser-based voice synthesis and recognition hook
 * Uses Web Speech API - works without any API keys
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export type BrowserVoiceOptions = {
  lang?: string;
  rate?: number;
  pitch?: number;
  voiceName?: string;
};

export const useBrowserVoice = (options?: BrowserVoiceOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const defaultOptions: BrowserVoiceOptions = {
    lang: 'en-US',
    rate: 1.0,
    pitch: 1.0,
    ...options
  };

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Try to find a natural-sounding voice
      const preferredVoice = voices.find(v => 
        v.name.includes('Google') || 
        v.name.includes('Natural') || 
        v.name.includes('Samantha') ||
        v.name.includes('Microsoft')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
      
      if (preferredVoice) {
        setSelectedVoice(preferredVoice);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = defaultOptions.lang || 'en-US';
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [defaultOptions.lang]);

  /**
   * Speak text using browser's speech synthesis
   */
  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!text) {
        resolve();
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      setIsLoading(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      utterance.lang = defaultOptions.lang || 'en-US';
      utterance.rate = defaultOptions.rate || 1.0;
      utterance.pitch = defaultOptions.pitch || 1.0;
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsLoading(false);
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utterance.onerror = (event) => {
        setIsLoading(false);
        setIsSpeaking(false);
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      speechSynthesis.speak(utterance);
    });
  }, [defaultOptions.lang, defaultOptions.rate, defaultOptions.pitch, selectedVoice]);

  /**
   * Stop speaking
   */
  const stopSpeaking = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  /**
   * Listen for speech input
   */
  const listen = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!recognitionRef.current) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      const recognition = recognitionRef.current;

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setIsListening(false);
        resolve(transcript);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        setIsListening(false);
        reject(error);
      }
    });
  }, []);

  /**
   * Stop listening
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setIsListening(false);
  }, []);

  /**
   * Toggle listening state
   */
  const toggleListening = useCallback(async (): Promise<string | null> => {
    if (isListening) {
      stopListening();
      return null;
    }
    
    try {
      const transcript = await listen();
      return transcript;
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error('Failed to recognize speech. Please try again.');
      return null;
    }
  }, [isListening, listen, stopListening]);

  /**
   * Check if browser supports speech synthesis
   */
  const isSpeechSynthesisSupported = typeof speechSynthesis !== 'undefined';
  
  /**
   * Check if browser supports speech recognition
   */
  const isSpeechRecognitionSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return {
    // Speech synthesis
    speak,
    stopSpeaking,
    isSpeaking,
    isLoading,
    availableVoices,
    selectedVoice,
    setSelectedVoice,
    isSpeechSynthesisSupported,
    
    // Speech recognition
    listen,
    stopListening,
    toggleListening,
    isListening,
    isSpeechRecognitionSupported,
  };
};

export default useBrowserVoice;
