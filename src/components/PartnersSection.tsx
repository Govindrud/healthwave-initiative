
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PartnersSection = () => {
  // Sample partner logos
  const partners = [
    { id: 1, name: "MindWell Therapy", logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" },
    { id: 2, name: "Serenity Counseling", logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" },
    { id: 3, name: "Breathe Meditation", logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" },
    { id: 4, name: "Recovery Path", logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" },
    { id: 5, name: "Thrive Corporate Wellness", logo: "/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png" }
  ];

  return (
    <section className="py-16 bg-meant-50" id="partners">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
            Service Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Mental Health <span className="text-meant-600">Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've partnered with trusted mental health service providers to ensure you have access to a wide range of specialized care options.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: partner.id * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="h-12 object-contain"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/partners">
            <Button className="rounded-full bg-meant-600 hover:bg-meant-700">
              <span>View All Partners</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
