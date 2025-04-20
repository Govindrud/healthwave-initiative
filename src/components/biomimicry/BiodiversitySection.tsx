
import React from 'react';
import { motion } from 'framer-motion';
import { HandHeart, Leaf, TreePalm } from 'lucide-react';

const BiodiversitySection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block p-4 bg-green-100 rounded-full mb-6"
            >
              <HandHeart className="w-16 h-16 text-green-600" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
            >
              The Sacred Web of Life
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              In Hindu philosophy, all life forms are interconnected manifestations of the divine consciousness, each playing a vital role in maintaining cosmic harmony.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Biodiversity"
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-6 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <TreePalm className="w-8 h-8 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-green-800">Sacred Interconnection</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The Upanishads teach us that all beings are connected in an intricate tapestry of life, each thread essential to the whole. This understanding leads to profound respect for all forms of life.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <Leaf className="w-8 h-8 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-green-800">Living with Purpose</h3>
                  <p className="text-gray-600 leading-relaxed">
                    By understanding our role in nature's grand design, we align with our dharma - our sacred duty towards all living beings. This alignment brings harmony to our existence and deeper meaning to our actions.
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
