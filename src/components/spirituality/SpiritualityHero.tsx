
import React from "react";
import { motion } from "framer-motion";

const SpiritualityHero: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="relative rounded-lg overflow-hidden h-80 md:h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-meant-900/80 to-meant-700/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
          alt="Spiritual Journey" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Spiritual Wellness Journey
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white max-w-2xl"
          >
            Find harmony between mind, body, and spirit with our holistic spiritual guidance and resources
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SpiritualityHero;
