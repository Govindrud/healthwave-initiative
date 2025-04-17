
import React from "react";
import { Brain } from "lucide-react";
import EmotionBadge from "./EmotionBadge";

interface EmotionDetectionAreaProps {
  emotions: { label: string; score: number }[];
  isLoading: boolean;
}

const EmotionDetectionArea: React.FC<EmotionDetectionAreaProps> = ({ emotions, isLoading }) => {
  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
      <div className="flex items-center mb-2">
        <Brain className="h-4 w-4 mr-2 text-meant-600" />
        <h3 className="text-sm font-medium">Detected Emotions</h3>
        {isLoading && (
          <div className="ml-2 text-xs text-gray-500">Analyzing...</div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {emotions.slice(0, 3).map((emotion, index) => (
          <EmotionBadge key={index} emotion={emotion} />
        ))}
        {emotions.length === 0 && !isLoading && (
          <span className="text-sm text-gray-500">No emotions detected yet</span>
        )}
      </div>
    </div>
  );
};

export default EmotionDetectionArea;
