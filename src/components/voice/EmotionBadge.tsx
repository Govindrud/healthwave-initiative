
import React from "react";
import { Badge } from "@/components/ui/badge";

interface EmotionBadgeProps {
  emotion: { label: string; score: number };
}

const EmotionBadge: React.FC<EmotionBadgeProps> = ({ emotion }) => {
  const getColorForEmotion = (emotion: string) => {
    const emotionColors: Record<string, string> = {
      joy: "bg-green-100 text-green-800",
      sadness: "bg-blue-100 text-blue-800",
      anger: "bg-red-100 text-red-800",
      fear: "bg-purple-100 text-purple-800",
      surprise: "bg-yellow-100 text-yellow-800",
      disgust: "bg-orange-100 text-orange-800",
      neutral: "bg-gray-100 text-gray-800",
      approval: "bg-teal-100 text-teal-800",
      disapproval: "bg-rose-100 text-rose-800",
      admiration: "bg-indigo-100 text-indigo-800",
      optimism: "bg-emerald-100 text-emerald-800",
      disappointment: "bg-amber-100 text-amber-800",
      love: "bg-pink-100 text-pink-800",
      caring: "bg-cyan-100 text-cyan-800",
    };
    return emotionColors[emotion.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const percentage = Math.round(emotion.score * 100);
  const colorClass = getColorForEmotion(emotion.label);
  
  return (
    <Badge variant="outline" className={`${colorClass} font-medium`}>
      {emotion.label}: {percentage}%
    </Badge>
  );
};

export default EmotionBadge;
