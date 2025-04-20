
import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const PurposefulLiving = () => {
  const teachings = [
    {
      title: "Karma Yoga",
      description: "Action with purpose and detachment, learning from nature's selfless service."
    },
    {
      title: "Dharma",
      description: "Understanding our role in the greater cosmic order, just as each species fulfills its purpose."
    },
    {
      title: "Unity in Diversity",
      description: "Celebrating the unique contributions of all beings, as taught in Vedic wisdom."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Brain className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Living with Sacred Purpose
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ancient Hindu wisdom teaches us that every being has a divine purpose. By observing nature, we learn valuable lessons about living in harmony and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teachings.map((teaching, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-700">{teaching.title}</h3>
              <p className="text-gray-600">{teaching.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurposefulLiving;
