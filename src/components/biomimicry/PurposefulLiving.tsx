
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Leaf } from 'lucide-react';

const PurposefulLiving = () => {
  const teachings = [
    {
      icon: Heart,
      title: "Karma Yoga",
      description: "Action with purpose and detachment, learning from nature's selfless service. Just as a river flows tirelessly, giving life without expecting anything in return."
    },
    {
      icon: Brain,
      title: "Dharma",
      description: "Understanding our role in the greater cosmic order, just as each species fulfills its unique purpose. Like the sun that rises each day, illuminating the world."
    },
    {
      icon: Leaf,
      title: "Unity in Diversity",
      description: "Celebrating the unique contributions of all beings, as taught in Vedic wisdom. Like a forest ecosystem where every species, from the smallest insect to the tallest tree, plays a vital role."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-green-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block p-4 bg-green-100 rounded-full mb-6"
          >
            <Brain className="w-16 h-16 text-green-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
          >
            Living with Sacred Purpose
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Ancient Hindu wisdom teaches us that every being has a divine purpose. By observing nature's intricate design, we learn valuable lessons about living in harmony and purpose.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teachings.map((teaching, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6">
                <teaching.icon className="w-12 h-12 text-green-600 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-green-800">{teaching.title}</h3>
              <p className="text-gray-600 leading-relaxed">{teaching.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurposefulLiving;
