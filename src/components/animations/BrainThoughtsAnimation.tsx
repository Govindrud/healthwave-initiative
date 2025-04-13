
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
    
    // Updated color palette to match project UI colors (meant colors)
    const colors = [
      "bg-meant-200/90 border-meant-400 text-meant-800",
      "bg-meant-300/90 border-meant-500 text-meant-900",
      "bg-meant-100/90 border-meant-300 text-meant-700",
      "bg-meant-200/80 border-meant-400 text-meant-800",
      "bg-meant-300/80 border-meant-500 text-meant-900",
      "bg-meant-100/80 border-meant-300 text-meant-700",
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
      {/* Circular path for thoughts - more visible */}
      <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-dashed border-meant-400 opacity-80" />
      
      {/* Central brain - enhanced glow effect */}
      <motion.div 
        className="z-10 relative"
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <div className="absolute inset-0 rounded-full bg-meant-300 blur-lg opacity-30 scale-125"></div>
        <Brain className="w-36 h-36 md:w-44 md:h-44 text-meant-700 drop-shadow-lg" strokeWidth={1.8} />
      </motion.div>
      
      {/* Circling thoughts - enhanced with shadow and better opacity */}
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
            opacity: [0, 0.95, 0.95, 0],
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
            className={`flex items-center justify-center ${thought.color} border-2 shadow-md rounded-full px-3 py-1.5 text-sm font-medium`}
            style={{ width: `${thought.size}px`, height: `${thought.size * 0.6}px` }}
          >
            {thought.text}
          </div>
        </motion.div>
      ))}
      
      {/* Break free message - improved contrast and visibility with meant colors */}
      <motion.div
        className="absolute -bottom-20 bg-gradient-to-r from-meant-600 to-meant-700 text-white px-6 py-3 rounded-full text-base font-medium shadow-lg border border-meant-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        MeantToHelp breaks the thought loop
      </motion.div>
    </div>
  );
};
