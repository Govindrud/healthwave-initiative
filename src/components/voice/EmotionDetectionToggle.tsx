
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface EmotionDetectionToggleProps {
  emotionEnabled: boolean;
  toggleEmotionDetection: () => void;
  isEmotionLoading: boolean;
  apiKeyConfigured: boolean;
  browserSupportsEmotionDetection: boolean;
}

const EmotionDetectionToggle: React.FC<EmotionDetectionToggleProps> = ({
  emotionEnabled,
  toggleEmotionDetection,
  isEmotionLoading,
  apiKeyConfigured,
  browserSupportsEmotionDetection,
}) => {
  return (
    <div className="flex-1">
      <Button
        onClick={toggleEmotionDetection}
        variant={emotionEnabled ? "default" : "outline"}
        className="w-full"
        disabled={isEmotionLoading || !apiKeyConfigured || !browserSupportsEmotionDetection}
      >
        <Brain className="mr-2 h-4 w-4" />
        {emotionEnabled ? "Disable" : "Enable"} Emotion Detection
        {!browserSupportsEmotionDetection && " (Not Supported)"}
      </Button>
      {!browserSupportsEmotionDetection && (
        <p className="text-xs text-amber-600 mt-1">
          Your browser doesn't support emotion detection. Please try a modern browser that supports WebGPU or WebAssembly.
        </p>
      )}
    </div>
  );
};

export default EmotionDetectionToggle;
