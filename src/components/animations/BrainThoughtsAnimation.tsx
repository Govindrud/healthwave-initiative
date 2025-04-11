
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "@/components/corporate/Brain";

interface ThoughtBubble {
  id: number;
  text: string;
  size: number;
  position: { x: number; y: number };
  rotation: number;
}

export const BrainThoughtsAnimation: React.FC = () => {
  const [thoughts, setThoughts] = useState<ThoughtBubble[]>([]);
  
  // Generate random thoughts
  useEffect(() => {
    const thoughtTexts = [
      "Anxiety",
      "Stress",
      "Depression",
      "Worry",
      "Fear",
      "Overwhelmed",
      "Doubt",
      "Pressure",
      "Burnout",
      "Tired",
      "Overthinking",
    ];
    
    const newThoughts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      text: thoughtTexts[i % thoughtTexts.length],
      size: Math.random() * 20 + 30,
      position: { 
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300
      },
      rotation: Math.random() * 360
    }));
    
    setThoughts(newThoughts);
  }, []);

  return (
    <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
      {/* Central brain */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <Brain className="w-32 h-32 md:w-40 md:h-40 text-meant-600" strokeWidth={1.5} />
      </motion.div>
      
      {/* Circling thoughts */}
      {thoughts.map((thought) => (
        <motion.div
          key={thought.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          initial={{ 
            x: thought.position.x * 0.2,
            y: thought.position.y * 0.2,
            opacity: 0 
          }}
          animate={{ 
            x: thought.position.x,
            y: thought.position.y,
            opacity: 0.8,
            rotate: [thought.rotation, thought.rotation + 360]
          }}
          transition={{ 
            type: "tween",
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2
          }}
        >
          <div 
            className="flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-md rounded-full px-3 py-1.5 text-xs font-medium text-gray-700"
            style={{ width: `${thought.size}px`, height: `${thought.size * 0.6}px` }}
          >
            {thought.text}
          </div>
        </motion.div>
      ))}
      
      {/* Break free message */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -bottom-16 bg-meant-600 text-white px-4 py-2 rounded-full text-sm font-medium"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        MeantToHelp breaks the loop
      </motion.div>
    </div>
  );
};
