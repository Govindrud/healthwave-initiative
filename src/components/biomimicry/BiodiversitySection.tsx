
import React from 'react';
import { motion } from 'framer-motion';
import { HandHeart, Leaf } from 'lucide-react';

const BiodiversitySection = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <HandHeart className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              The Web of Life
            </h2>
            <p className="text-xl text-gray-600">
              In Hindu philosophy, all life is interconnected - a reflection of the divine consciousness that permeates everything.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Biodiversity"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <Leaf className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sacred Interconnection</h3>
                  <p className="text-gray-600">
                    As described in the Upanishads, all beings are connected in an intricate web of life, each playing a vital role in maintaining the cosmic balance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Leaf className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dharmic Living</h3>
                  <p className="text-gray-600">
                    By understanding our role in nature's grand design, we align with our dharma - our purpose and duty towards all living beings.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiodiversitySection;
