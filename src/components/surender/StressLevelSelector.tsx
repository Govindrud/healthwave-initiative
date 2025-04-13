
import React from "react";
import { Thermometer } from "lucide-react";

export interface StressLevel {
  level: string;
  color: string;
  description: string;
  icon: React.ReactNode;
}

export const stressLevels: StressLevel[] = [
  {
    level: "Low",
    color: "bg-green-500",
    description: "Manageable daily stress",
    icon: <Thermometer className="h-10 w-10 text-green-500" />,
  },
  {
    level: "Medium",
    color: "bg-yellow-500",
    description: "Persistent stress affecting your daily life",
    icon: <Thermometer className="h-10 w-10 text-yellow-500" />,
  },
  {
    level: "High",
    color: "bg-orange-500",
    description: "Overwhelming stress impacting your wellbeing",
    icon: <Thermometer className="h-10 w-10 text-orange-500" />,
  },
  {
    level: "Extreme",
    color: "bg-red-500",
    description: "Critical stress requiring immediate intervention",
    icon: <Thermometer className="h-10 w-10 text-red-500" />,
  },
];

interface StressLevelSelectorProps {
  selectedLevel: string | null;
  onSelectLevel: (level: string) => void;
}

export const StressLevelSelector: React.FC<StressLevelSelectorProps> = ({ 
  selectedLevel, 
  onSelectLevel 
}) => {
  return (
    <div className="mb-16">
      <div className="relative w-full h-8 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full mb-10 shadow-inner">
        <div className="absolute top-0 w-full flex justify-between px-2 -mt-10 text-sm font-medium text-gray-800">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
          <span>Extreme</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stressLevels.map((stress) => {
          const colorClass = stress.color.replace('bg-', '');
          return (
            <div
              key={stress.level}
              className={`p-6 rounded-lg border bg-white hover:shadow-lg cursor-pointer transition-all ${
                selectedLevel === stress.level 
                  ? `border-${colorClass} shadow-lg` 
                  : "border-gray-200"
              }`}
              onClick={() => onSelectLevel(stress.level)}
            >
              <div className="flex flex-col items-center text-center">
                {stress.icon}
                <h3 className="font-semibold text-lg mt-4">{stress.level}</h3>
                <p className="text-muted-foreground text-sm mt-2">{stress.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
