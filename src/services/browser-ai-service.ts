/**
 * Browser-based AI Service using Hugging Face Transformers.js
 * This provides open-source AI capabilities that run entirely in the browser
 */

import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use browser cache
env.allowLocalModels = false;
env.useBrowserCache = true;

export type SentimentResult = {
  label: string;
  score: number;
};

export type TextGenerationResult = {
  generated_text: string;
};

class BrowserAIService {
  private sentimentPipeline: any = null;
  private textClassifierPipeline: any = null;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    // Initialize pipelines lazily
  }

  /**
   * Initialize the sentiment analysis pipeline
   */
  async initSentimentAnalysis(): Promise<void> {
    if (this.sentimentPipeline) return;
    
    if (this.isInitializing && this.initPromise) {
      await this.initPromise;
      return;
    }

    this.isInitializing = true;
    this.initPromise = (async () => {
      try {
        console.log('Loading sentiment analysis model...');
        this.sentimentPipeline = await pipeline(
          'sentiment-analysis',
          'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
        );
        console.log('Sentiment analysis model loaded successfully');
      } catch (error) {
        console.error('Failed to load sentiment model:', error);
        throw error;
      } finally {
        this.isInitializing = false;
      }
    })();

    await this.initPromise;
  }

  /**
   * Analyze sentiment of text using browser-based model
   */
  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    label: string;
  }> {
    await this.initSentimentAnalysis();
    
    if (!this.sentimentPipeline) {
      throw new Error('Sentiment pipeline not initialized');
    }

    const result = await this.sentimentPipeline(text);
    const prediction = result[0] as SentimentResult;
    
    // Map the model's output to our expected format
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (prediction.label === 'POSITIVE') {
      sentiment = 'positive';
    } else if (prediction.label === 'NEGATIVE') {
      sentiment = 'negative';
    }
    
    return {
      sentiment,
      confidence: prediction.score,
      label: prediction.label
    };
  }

  /**
   * Extract key phrases from text (simple implementation)
   */
  extractKeyPhrases(text: string): string[] {
    // Simple keyword extraction based on word frequency and length
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Sort by frequency and return top phrases
    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
    
    return sortedWords;
  }

  /**
   * Detect emotion from text (simple rule-based + sentiment)
   */
  async detectEmotion(text: string): Promise<{
    primaryEmotion: string;
    emotionScores: Record<string, number>;
    intensity: number;
  }> {
    const sentimentResult = await this.analyzeSentiment(text);
    const lowerText = text.toLowerCase();
    
    // Emotion keywords mapping
    const emotionKeywords: Record<string, string[]> = {
      joy: ['happy', 'great', 'wonderful', 'excited', 'love', 'amazing', 'fantastic', 'excellent'],
      sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'hopeless', 'grief'],
      anger: ['angry', 'furious', 'annoyed', 'frustrated', 'mad', 'irritated', 'rage'],
      fear: ['scared', 'afraid', 'anxious', 'worried', 'nervous', 'terrified', 'panic'],
      surprise: ['surprised', 'shocked', 'amazed', 'unexpected', 'astonished'],
      calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content']
    };
    
    const emotionScores: Record<string, number> = {
      joy: 0.1,
      sadness: 0.1,
      anger: 0.1,
      fear: 0.1,
      surprise: 0.1,
      calm: 0.1
    };
    
    // Calculate emotion scores based on keyword presence
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          emotionScores[emotion] += 0.3;
        }
      });
    });
    
    // Adjust based on sentiment
    if (sentimentResult.sentiment === 'positive') {
      emotionScores.joy += 0.2;
      emotionScores.calm += 0.1;
    } else if (sentimentResult.sentiment === 'negative') {
      emotionScores.sadness += 0.15;
      emotionScores.anger += 0.1;
      emotionScores.fear += 0.1;
    }
    
    // Normalize scores
    const total = Object.values(emotionScores).reduce((a, b) => a + b, 0);
    Object.keys(emotionScores).forEach(key => {
      emotionScores[key] = Math.min(emotionScores[key] / total, 1);
    });
    
    // Find primary emotion
    const primaryEmotion = Object.entries(emotionScores)
      .sort((a, b) => b[1] - a[1])[0][0];
    
    // Calculate intensity based on sentiment confidence
    const intensity = Math.min(sentimentResult.confidence * 1.2, 1);
    
    return {
      primaryEmotion,
      emotionScores,
      intensity
    };
  }

  /**
   * Generate simple text completions (using templates for mental health context)
   */
  generateMentalHealthResponse(userMessage: string, emotion?: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mental health-focused response templates
    const responses: Record<string, string[]> = {
      anxiety: [
        "I hear that you're experiencing anxiety. Remember that these feelings are temporary. Would you like to try a grounding exercise together?",
        "Anxiety can feel overwhelming, but you're not alone. Let's focus on what we can control right now.",
        "Taking slow, deep breaths can help calm your nervous system. Would you like me to guide you through a breathing exercise?"
      ],
      sadness: [
        "I'm sorry you're feeling this way. It's okay to feel sad, and it's important to acknowledge these emotions.",
        "Your feelings are valid. Sometimes talking about what's troubling us can help lighten the burden.",
        "Remember that sadness is a natural part of life, and seeking support is a sign of strength."
      ],
      stress: [
        "Stress can be challenging to manage. Let's break down what's overwhelming you into smaller, manageable parts.",
        "It sounds like you have a lot on your plate. What's one small thing we could address right now?",
        "Taking regular breaks and practicing self-care can help manage stress levels."
      ],
      general: [
        "Thank you for sharing that with me. I'm here to listen and support you.",
        "How long have you been feeling this way? Understanding the timeline can help us work through this together.",
        "Your wellbeing matters. Is there something specific you'd like to explore or discuss?"
      ]
    };
    
    // Determine response category
    let category = 'general';
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
      category = 'anxiety';
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depress') || lowerMessage.includes('unhappy')) {
      category = 'sadness';
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm') || lowerMessage.includes('tired')) {
      category = 'stress';
    }
    
    // Consider detected emotion
    if (emotion) {
      if (['fear', 'anxiety'].includes(emotion)) category = 'anxiety';
      if (['sadness', 'grief'].includes(emotion)) category = 'sadness';
    }
    
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  }

  /**
   * Check if models are loaded
   */
  isReady(): boolean {
    return this.sentimentPipeline !== null;
  }
}

// Singleton instance
export const browserAIService = new BrowserAIService();

export default browserAIService;
