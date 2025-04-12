
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "@/components/corporate/Brain";

interface ThoughtBubble {
  id: number;
  text: string;
  size: number;
  position: { x: number; y: number };
  rotation: number;
  color: string;
  duration: number;
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
      "Stuck",
      "Trapped",
      "Looping",
      "Insomnia"
    ];
    
    const colors = [
      "bg-red-200 border-red-300 text-red-800",
      "bg-orange-200 border-orange-300 text-orange-800",
      "bg-amber-200 border-amber-300 text-amber-800",
      "bg-yellow-200 border-yellow-300 text-yellow-800",
      "bg-blue-200 border-blue-300 text-blue-800",
      "bg-indigo-200 border-indigo-300 text-indigo-800",
      "bg-purple-200 border-purple-300 text-purple-800",
    ];
    
    const newThoughts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      text: thoughtTexts[i % thoughtTexts.length],
      size: Math.random() * 20 + 30,
      position: { 
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300
      },
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 10 + Math.random() * 15
    }));
    
    setThoughts(newThoughts);
  }, []);

  return (
    <div className="relative w-full h-full max-w-[500px] max-h-[500px] mx-auto">
      {/* Circular path for thoughts */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-2 border-dashed border-meant-200 opacity-40" />
      
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
        <Brain className="w-32 h-32 md:w-40 md:h-40 text-meant-700" strokeWidth={1.5} />
      </motion.div>
      
      {/* Circling thoughts */}
      {thoughts.map((thought) => (
        <motion.div
          key={thought.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          initial={{ 
            x: 0,
            y: 0,
            opacity: 0 
          }}
          animate={{ 
            opacity: [0, 0.9, 0.9, 0],
            rotate: [0, 360],
            x: [0, thought.position.x, 0],
            y: [0, thought.position.y, 0]
          }}
          transition={{ 
            duration: thought.duration,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 5
          }}
        >
          <div 
            className={`flex items-center justify-center ${thought.color} border shadow-md rounded-full px-3 py-1.5 text-xs font-medium`}
            style={{ width: `${thought.size}px`, height: `${thought.size * 0.6}px` }}
          >
            {thought.text}
          </div>
        </motion.div>
      ))}
      
      {/* Break free message */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-meant-700 text-white px-6 py-2 rounded-full text-base font-medium shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        MeantToHelp breaks the thought loop
      </motion.div>
    </div>
  );
};
