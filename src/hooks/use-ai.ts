
import { useState, useCallback } from 'react';
import { 
  analyzeText, 
  detectEmotion, 
  getRecommendations,
  AITextAnalysisResult,
  AIEmotionResult,
  AIRecommendationResult
} from '@/utils/ai-integration';
import { toast } from 'sonner';

export function useAI() {
  const [isAnalyzingText, setIsAnalyzingText] = useState(false);
  const [textAnalysisResult, setTextAnalysisResult] = useState<AITextAnalysisResult | null>(null);
  
  const [isDetectingEmotion, setIsDetectingEmotion] = useState(false);
  const [emotionResult, setEmotionResult] = useState<AIEmotionResult | null>(null);
  
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendationsResult, setRecommendationsResult] = useState<AIRecommendationResult | null>(null);

  const analyzeUserText = useCallback(async (text: string) => {
    setIsAnalyzingText(true);
    try {
      const result = await analyzeText(text);
      setTextAnalysisResult(result);
      return result;
    } catch (error) {
      toast.error('Failed to analyze text. Please try again.');
      console.error('Text analysis error:', error);
      throw error;
    } finally {
      setIsAnalyzingText(false);
    }
  }, []);

  const detectUserEmotion = useCallback(async (audioData: Blob) => {
    setIsDetectingEmotion(true);
    try {
      const result = await detectEmotion(audioData);
      setEmotionResult(result);
      return result;
    } catch (error) {
      toast.error('Failed to detect emotion. Please try again.');
      console.error('Emotion detection error:', error);
      throw error;
    } finally {
      setIsDetectingEmotion(false);
    }
  }, []);

  const getUserRecommendations = useCallback(async (
    userId: string,
    context?: {
      recentSearches?: string[];
      recentInteractions?: Array<{type: string, itemId: string}>;
      preferences?: Record<string, any>;
    }
  ) => {
    setIsLoadingRecommendations(true);
    try {
      const result = await getRecommendations(userId, context);
      setRecommendationsResult(result);
      return result;
    } catch (error) {
      toast.error('Failed to get recommendations. Please try again.');
      console.error('Recommendations error:', error);
      throw error;
    } finally {
      setIsLoadingRecommendations(false);
    }
  }, []);

  return {
    // Text analysis
    analyzeUserText,
    isAnalyzingText,
    textAnalysisResult,
    
    // Emotion detection
    detectUserEmotion,
    isDetectingEmotion,
    emotionResult,
    
    // Recommendations
    getUserRecommendations,
    isLoadingRecommendations,
    recommendationsResult,
    
    // Reset functions
    resetTextAnalysis: () => setTextAnalysisResult(null),
    resetEmotionDetection: () => setEmotionResult(null),
    resetRecommendations: () => setRecommendationsResult(null),
  };
}

export default useAI;
