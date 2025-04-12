
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
      "bg-purple-300 border-purple-400 text-purple-900",
      "bg-rose-300 border-rose-400 text-rose-900",
      "bg-amber-300 border-amber-400 text-amber-900",
      "bg-cyan-300 border-cyan-400 text-cyan-900",
      "bg-blue-300 border-blue-400 text-blue-900",
      "bg-indigo-300 border-indigo-400 text-indigo-900",
      "bg-violet-300 border-violet-400 text-violet-900",
    ];
    
    const newThoughts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      text: thoughtTexts[i % thoughtTexts.length],
      size: Math.random() * 20 + 40, // Larger bubbles
      position: { 
        x: (Math.random() - 0.5) * 280,
        y: (Math.random() - 0.5) * 280
      },
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 10 + Math.random() * 15
    }));
    
    setThoughts(newThoughts);
  }, []);

  return (
    <div className="relative w-full h-full max-w-[500px] max-h-[500px] mx-auto flex items-center justify-center">
      {/* Circular path for thoughts */}
      <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-dashed border-purple-300 opacity-70" />
      
      {/* Central brain */}
      <motion.div 
        className="z-10"
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <Brain className="w-36 h-36 md:w-44 md:h-44 text-purple-700" strokeWidth={1.5} />
      </motion.div>
      
      {/* Circling thoughts */}
      {thoughts.map((thought) => (
        <motion.div
          key={thought.id}
          className="absolute flex items-center justify-center"
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
            className={`flex items-center justify-center ${thought.color} border-2 shadow-lg rounded-full px-3 py-1.5 text-sm font-medium`}
            style={{ width: `${thought.size}px`, height: `${thought.size * 0.6}px` }}
          >
            {thought.text}
          </div>
        </motion.div>
      ))}
      
      {/* Break free message */}
      <motion.div
        className="absolute bottom-0 bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-6 py-3 rounded-full text-base font-medium shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        MeantToHelp breaks the thought loop
      </motion.div>
    </div>
  );
};
