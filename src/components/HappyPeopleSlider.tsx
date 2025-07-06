
import React from 'react';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import happyPeopleWellness from '@/assets/happy-people-wellness.jpg';
import therapySession from '@/assets/therapy-session.jpg';
import meditationWellness from '@/assets/meditation-wellness.jpg';
import supportGroup from '@/assets/support-group.jpg';

const HappyPeopleSlider = () => {
  const slides = [
    {
      image: happyPeopleWellness,
      caption: "Finding my balance through mindfulness and professional support",
      fallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      image: therapySession,
      caption: "Professional therapy transformed my perspective on mental wellness",
      fallback: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      image: supportGroup,
      caption: "Community support makes all the difference in my healing journey",
      fallback: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      image: meditationWellness,
      caption: "Taking mindful steps toward lasting mental wellness and peace",
      fallback: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption: "Healing through nature and mindfulness practices",
      fallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
