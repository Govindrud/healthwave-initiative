
import React from 'react';
import { motion } from 'framer-motion';
import { TreePalm, Bird, Fish, Leaf } from 'lucide-react';

const BiomimicryHero = () => {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-green-50 via-blue-50 to-green-50 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6 leading-tight">
            The Art of Living in Harmony
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Discover the ancient wisdom of nature's design and how it guides us toward a more purposeful existence
          </p>
          <div className="flex justify-center gap-12 text-green-600">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <TreePalm size={48} className="text-green-700" />
              <span className="text-sm font-medium">Nature's Wisdom</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <Bird size={48} className="text-blue-600" />
              <span className="text-sm font-medium">Life's Freedom</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2"
            >
              <Leaf size={48} className="text-emerald-600" />
              <span className="text-sm font-medium">Earth's Balance</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BiomimicryHero;
