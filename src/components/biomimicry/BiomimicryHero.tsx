
import React from 'react';
import { motion } from 'framer-motion';
import { TreePalm, Bird, Fish } from 'lucide-react';

const BiomimicryHero = () => {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-b from-green-50 to-blue-50 flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            The Wisdom of Life's Design
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Discovering purpose through nature's intelligence and ancient wisdom
          </p>
          <div className="flex justify-center gap-8 text-green-600">
            <TreePalm size={40} />
            <Bird size={40} />
            <Fish size={40} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BiomimicryHero;
