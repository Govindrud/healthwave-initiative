
import React from 'react';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const HappyPeopleSlider = () => {
  // Use a mix of local and remote images to increase chance of success
  const slides = [
    {
      image: "/images/happy-people-1.jpg",
      caption: "Finding my balance again"
    },
    {
      image: "/images/happy-people-2.jpg",
      caption: "Meditation changed my perspective"
    },
    {
      image: "/images/happy-people-3.jpg",
      caption: "Support makes all the difference"
    },
    {
      // Using an Unsplash image as a reliable fallback
      image: "https://images.unsplash.com/photo-1551894116-54f2a9d9ade6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      caption: "Taking steps toward mental health"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-meant-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
            Success Stories
          </span>
          <h2 className="text-3xl font-bold mb-4">People Enjoying Mental Well-being</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the positive impact of our services on individuals who have embraced their journey to mental wellness
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto h-96 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ErrorBoundary>
            <ImageSlider slides={slides} />
          </ErrorBoundary>
        </motion.div>
      </div>
    </section>
  );
};

export default HappyPeopleSlider;
