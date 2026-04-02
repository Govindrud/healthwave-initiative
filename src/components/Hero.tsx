
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BrainThoughtsAnimation } from "./animations/BrainThoughtsAnimation";
import PretextCanvas from "./canvas/PretextCanvas";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-accent/50 to-background pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-200 opacity-30"
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-purple-300 opacity-30"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            duration: 8,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 w-52 h-52 rounded-full bg-purple-100 opacity-30"
          animate={{ 
            y: [0, 25, 0],
            scale: [1, 1.04, 1]
          }}
          transition={{ 
            duration: 7,
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block py-1 px-3 rounded-full bg-purple-200 text-purple-800 text-sm font-medium mb-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Transforming Mental Health Support
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-600">
                Break Free From Mental Loops
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-foreground/80 max-w-3xl mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              We're building a community that connects real mental health challenges with innovative solutions. 
              By bringing together those in need and college students eager to make a difference, 
              we're creating powerful, accessible mental health resources for everyone.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center sm:justify-start gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-purple-700 hover:bg-purple-800 text-white rounded-full px-8 py-6 hover:shadow-lg transition-all w-full sm:w-auto"
                onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Share Your Challenge
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 border-purple-300 hover:bg-purple-50 text-purple-800 hover:shadow-md transition-all w-full sm:w-auto"
                onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Solutions
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="flex justify-center items-center mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="w-full max-w-md flex items-center justify-center">
              <BrainThoughtsAnimation />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all group pulse-animation"
          aria-label="Scroll down"
        >
          <ArrowDown className="text-purple-700 group-hover:text-purple-800 transition-colors" size={24} />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
