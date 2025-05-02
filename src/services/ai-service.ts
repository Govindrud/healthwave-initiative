
import { toast } from 'sonner';
import AppConfig from '@/config/app-config';

export type AIProvider = 'openai' | 'anthropic' | 'elevenlabs';

export interface AITextRequest {
  text: string;
  personaId?: string;
  provider?: AIProvider;
  temperature?: number;
  maxTokens?: number;
}

export interface AIVoiceRequest {
  text: string;
  voiceId?: string;
  model?: string;
  provider?: AIProvider;
}

export interface AITextAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  topics: string[];
  keyPhrases: string[];
  language: string;
  confidenceScore: number;
}

export interface AIEmotionResult {
  primaryEmotion: string;
  emotionScores: Record<string, number>;
  intensity: number;
}

class AIService {
  private apiKey: Record<AIProvider, string | null> = {
    openai: null,
    anthropic: null,
    elevenlabs: null
  };
  
  private defaultProvider: AIProvider = 'openai';
  
  constructor() {
    // Try to load saved API keys from localStorage
    this.loadApiKeys();
  }
  
  private loadApiKeys() {
    try {
      // Only load keys in client environment
      if (typeof window !== 'undefined' && window.localStorage) {
        this.apiKey.openai = localStorage.getItem('openai-api-key');
        this.apiKey.anthropic = localStorage.getItem('anthropic-api-key');
        this.apiKey.elevenlabs = localStorage.getItem('elevenlabs-api-key');
      }
    } catch (error) {
      console.error('Error loading API keys:', error);
    }
  }
  
  public setApiKey(provider: AIProvider, key: string) {
    this.apiKey[provider] = key;
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem(`${provider}-api-key`, key);
    } catch (error) {
      console.error(`Error saving ${provider} API key:`, error);
    }
    
    return true;
  }
  
  public hasApiKey(provider: AIProvider): boolean {
    return Boolean(this.apiKey[provider]);
  }
  
  public async analyzeText(request: AITextRequest): Promise<AITextAnalysisResult> {
    const provider = request.provider || this.defaultProvider;
    
    if (!this.hasApiKey(provider)) {
      // Fall back to mock implementation if no API key
      return this.mockAnalyzeText(request.text);
    }
    
    try {
      // In a real implementation, this would make API calls
      switch (provider) {
        case 'openai':
          // Implementation would go here
          break;
        case 'anthropic':
          // Implementation would go here
          break;
        default:
          // Default implementation
      }
      
      // For now, return mock implementation
      return this.mockAnalyzeText(request.text);
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw error;
    }
  }
  
  public async synthesizeSpeech(request: AIVoiceRequest): Promise<string> {
    const provider = request.provider || 'elevenlabs';
    const voiceId = request.voiceId || AppConfig.ai.defaultVoice;
    
    if (!this.hasApiKey(provider)) {
      toast.error(`${provider} API key not set. Voice synthesis not available.`);
      throw new Error(`${provider} API key not set`);
    }
    
    try {
      // Would implement actual API call here
      // For now, we'll return a dummy audio URL
      return 'dummy-audio-url';
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      throw error;
    }
  }
  
  // Mock implementation for development without API keys
  private mockAnalyzeText(text: string): AITextAnalysisResult {
    console.log('Using mock AI text analysis');
    
    // Simple sentiment analysis simulation
    const lowerText = text.toLowerCase();
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'positive'];
    const negativeWords = ['bad', 'terrible', 'sad', 'negative', 'awful'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveScore++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeScore++;
    });
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    
    if (positiveScore > negativeScore) {
      sentiment = 'positive';
    } else if (negativeScore > positiveScore) {
      sentiment = 'negative';
    }
    
    return {
      sentiment,
      topics: ['mental health', 'wellness'],
      keyPhrases: text.split('.').map(s => s.trim()).filter(s => s.length > 0),
      language: 'en',
      confidenceScore: 0.85
    };
  }
}

// Singleton instance
export const aiService = new AIService();

export default aiService;
