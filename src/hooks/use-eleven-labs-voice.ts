
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export type VoiceOptions = {
  voiceId?: string;
  model?: 'eleven_multilingual_v2' | 'eleven_turbo_v2_5' | 'eleven_turbo_v2';
};

export const useElevenLabsVoice = (apiKey: string, options?: VoiceOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_VOICE_OPTIONS = {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah's voice as default
    model: 'eleven_multilingual_v2'
  };

  const mergedOptions = { ...DEFAULT_VOICE_OPTIONS, ...options };

  const synthesizeSpeech = useCallback(async (text: string) => {
    if (!text) return null;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/stream', {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
          voice_id: mergedOptions.voiceId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ElevenLabs API Error: ${errorText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return audioUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Speech Synthesis Error: ${errorMessage}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, mergedOptions]);

  return {
    synthesizeSpeech,
    isLoading,
    error,
  };
};
