
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export type VoiceOptions = {
  voiceId?: string;
  model?: 'eleven_multilingual_v2' | 'eleven_turbo_v2_5' | 'eleven_turbo_v2';
  agentId?: string;
};

export const useElevenLabsVoice = (apiKey: string, options?: VoiceOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentUrl, setAgentUrl] = useState<string | null>(null);

  const DEFAULT_VOICE_OPTIONS = {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah's voice as default
    model: 'eleven_multilingual_v2' as const,
    agentId: options?.agentId || null
  };

  const mergedOptions = { ...DEFAULT_VOICE_OPTIONS, ...options };

  const synthesizeSpeech = useCallback(async (text: string) => {
    if (!text) return null;
    if (!apiKey) {
      toast.error('API key is required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + mergedOptions.voiceId + '/stream', {
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
          model_id: mergedOptions.model,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('ElevenLabs API Error:', response.status, errorData);
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your ElevenLabs API key.');
        } else if (response.status === 400) {
          throw new Error('Bad request. Please check your voice ID and parameters.');
        } else {
          throw new Error(`ElevenLabs API Error: ${response.status}`);
        }
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

  // Get a signed URL for conversation with an agent
  const getSignedAgentUrl = useCallback(async () => {
    if (!apiKey) {
      toast.error('API key is required');
      return null;
    }

    if (!mergedOptions.agentId) {
      toast.error('Agent ID is required for conversation');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${mergedOptions.agentId}`, {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('ElevenLabs Agent API Error:', response.status, errorData);
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your ElevenLabs API key.');
        } else if (response.status === 404) {
          throw new Error('Agent not found. Please check your agent ID.');
        } else {
          throw new Error(`ElevenLabs Agent API Error: ${response.status}`);
        }
      }

      const data = await response.json();
      setAgentUrl(data.signed_url);
      return data.signed_url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Agent Connection Error: ${errorMessage}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, mergedOptions.agentId]);

  // Method to interact with the agent directly
  const interactWithAgent = useCallback(async (userMessage: string) => {
    if (!apiKey || !mergedOptions.agentId) {
      return null;
    }

    // If we don't have an agent URL yet, get one
    if (!agentUrl) {
      const url = await getSignedAgentUrl();
      if (!url) return null;
    }
    
    // Use the signed URL to interact with the agent
    // This is a simplified implementation - in a real application,
    // you would need to handle WebSocket connections
    setIsLoading(true);
    
    try {
      // Instead of actual WebSocket implementation, we'll simulate a response
      // In a production app, you would implement WebSocket communication here
      
      // Simulated delay for response time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a simulated response that would normally come from the agent
      const simulatedResponse = {
        text: `I'm your AI voice assistant. I understand you said: "${userMessage}". How can I help with that?`,
        audioUrl: await synthesizeSpeech(`I'm your AI voice assistant. I understand you said: "${userMessage}". How can I help with that?`)
      };
      
      return simulatedResponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Agent Communication Error: ${errorMessage}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, mergedOptions.agentId, agentUrl, getSignedAgentUrl, synthesizeSpeech]);

  return {
    synthesizeSpeech,
    getSignedAgentUrl,
    interactWithAgent,
    agentUrl,
    isLoading,
    error,
  };
};
