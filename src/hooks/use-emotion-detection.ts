
import { useState, useCallback } from 'react';
import { pipeline, env } from '@huggingface/transformers';
import { toast } from 'sonner';

// Configure transformers.js to use WebGPU or WebGL for hardware acceleration if available
env.backends.onnx.wasm.numThreads = navigator.hardwareConcurrency || 4;

export type EmotionResult = {
  label: string;
  score: number;
};

export const useEmotionDetection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [emotions, setEmotions] = useState<EmotionResult[]>([]);
  const [dominantEmotion, setDominantEmotion] = useState<string | null>(null);
  
  // Initialize the model
  const initializeModel = useCallback(async () => {
    if (modelLoaded) return true;
    
    try {
      setIsLoading(true);
      toast.info("Loading emotion detection model...");
      
      // Try to use WebGPU if available for better performance
      const device = 'webgpu' in navigator ? 'webgpu' : 'cpu';
      
      // Use a smaller, browser-friendly model for emotion analysis
      await pipeline(
        'text-classification',
        'SamLowe/roberta-base-go_emotions',
        { device }
      );
      
      setModelLoaded(true);
      toast.success("Emotion detection model loaded successfully!");
      return true;
    } catch (error) {
      console.error("Failed to load emotion detection model:", error);
      toast.error("Could not load emotion detection model. Some features may be limited.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [modelLoaded]);

  // Analyze text for emotions
  const detectEmotion = useCallback(async (text: string) => {
    if (!text.trim()) return null;
    
    // Initialize model if not already loaded
    const ready = await initializeModel();
    if (!ready) return null;
    
    try {
      setIsLoading(true);
      
      // Use the device that was determined during initialization
      const device = 'webgpu' in navigator ? 'webgpu' : 'cpu';
      
      const classifier = await pipeline(
        'text-classification',
        'SamLowe/roberta-base-go_emotions',
        { device }
      );
      
      const results = await classifier(text, { top_k: 5 });
      
      // Format the results
      const formattedResults = Array.isArray(results) ? results : [results];
      const emotionsDetected = formattedResults.flatMap(result => {
        if (!Array.isArray(result)) return [];
        return result.map((emotion: { label: string; score: number }) => ({
          label: emotion.label,
          score: emotion.score,
        }));
      });
      
      // Sort by score and get the dominant emotion
      const sortedEmotions = [...emotionsDetected].sort((a, b) => b.score - a.score);
      const dominant = sortedEmotions.length > 0 ? sortedEmotions[0].label : null;
      
      setEmotions(sortedEmotions);
      setDominantEmotion(dominant);
      
      return { emotions: sortedEmotions, dominant };
    } catch (error) {
      console.error("Error detecting emotions:", error);
      toast.error("Could not analyze emotions in text");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [initializeModel]);

  return {
    detectEmotion,
    initializeModel,
    isLoading,
    modelLoaded,
    emotions,
    dominantEmotion,
  };
};
