
import React from 'react';
import { motion } from 'framer-motion';

const NatureInsights = () => {
  const insights = [
    {
      image: "https://images.unsplash.com/photo-1473396961693-142e6e269027",
      title: "Adaptation & Resilience",
      description: "Like the deer that navigates through changing seasons, we too can adapt and thrive through life's challenges."
    },
    {
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      title: "Community & Cooperation",
      description: "Bees teach us the power of working together, each contributing to the greater good of the community."
    },
    {
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      title: "Growth & Transformation",
      description: "Trees remind us that growth is a constant process, reaching towards the light while staying firmly rooted."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Wisdom From Nature's Design
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={insight.image}
                alt={insight.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{insight.title}</h3>
                <p className="text-gray-600">{insight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NatureInsights;
