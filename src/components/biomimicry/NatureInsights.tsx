
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

const insights = [
  {
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    title: "Adaptation & Resilience",
    description: "Like the graceful deer navigating through changing seasons, we too can learn to adapt and thrive through life's evolving challenges. Nature teaches us that resilience comes from flexibility and awareness."
  },
  {
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    title: "Community & Cooperation",
    description: "The intricate dance of bees shows us how individual efforts, when aligned with community goals, create remarkable achievements. Together, we're capable of building something greater than ourselves."
  },
  {
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    title: "Growth & Transformation",
    description: "Trees remind us that growth is a constant journey, reaching towards the light while staying firmly rooted in our values. Each season brings new opportunities for transformation."
  }
];

const NatureInsights = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-800 leading-tight"
        >
          Sacred Wisdom From Nature's Design
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">{insight.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{insight.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NatureInsights;
