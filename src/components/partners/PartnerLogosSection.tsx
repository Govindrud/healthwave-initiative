
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star } from 'lucide-react';

interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
  verified?: boolean;
  rating?: number;
  specialization?: string;
}

const partnerLogos: PartnerLogo[] = [
  { 
    id: 'partner1', 
    name: 'MindWell Therapy', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.8,
    specialization: 'Depression & Anxiety'
  },
  { 
    id: 'partner2', 
    name: 'Serenity Counseling', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.6,
    specialization: 'Family Therapy'
  },
  { 
    id: 'partner3', 
    name: 'Breathe Meditation Center', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.9,
    specialization: 'Mindfulness & Meditation'
  },
  { 
    id: 'partner4', 
    name: 'Recovery Path', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.7,
    specialization: 'Addiction Recovery'
  },
  { 
    id: 'partner5', 
    name: 'Thrive Corporate Wellness', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    rating: 4.5,
    specialization: 'Workplace Wellness'
  }
];

const PartnerLogosSection: React.FC = () => {
  return (
    <section className="py-16 bg-meant-50/50" id="partners">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
            Trusted Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We've Partnered with <span className="text-meant-600">Mental Health Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our network of verified mental health service providers ensures you receive quality care from trusted professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all group"
            >
              <Link to="/partners" className="block p-6">
                <div className="flex flex-col items-center h-full">
                  <div className="mb-4 relative w-full aspect-video flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="max-h-14 object-contain transition-transform group-hover:scale-105"
                    />
                    {partner.verified && (
                      <div className="absolute -top-1 -right-1 bg-green-100 rounded-full p-0.5" title="Verified Partner">
                        <Check size={14} className="text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="mt-auto text-center">
                    <p className="text-sm font-medium text-gray-800 mb-1">{partner.name}</p>
                    {partner.specialization && (
                      <p className="text-xs text-gray-500 mb-2">{partner.specialization}</p>
                    )}
                    {partner.rating && (
                      <div className="flex items-center justify-center mt-1">
                        <div className="flex text-yellow-500">
                          <Star className="h-3.5 w-3.5 fill-yellow-500" />
                          <Star className="h-3.5 w-3.5 fill-yellow-500" />
                          <Star className="h-3.5 w-3.5 fill-yellow-500" />
                          <Star className="h-3.5 w-3.5 fill-yellow-500" />
                          <Star className={`h-3.5 w-3.5 ${partner.rating >= 4.8 ? "fill-yellow-500" : "fill-gray-200"}`} />
                        </div>
                        <span className="text-xs ml-1 text-gray-600">{partner.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-lg p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-bold text-meant-600 mb-2">150+</p>
            <p className="text-sm text-gray-600">Verified Partners</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-lg p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-bold text-meant-600 mb-2">25+</p>
            <p className="text-sm text-gray-600">Specializations</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-lg p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-bold text-meant-600 mb-2">50k+</p>
            <p className="text-sm text-gray-600">Clients Served</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white rounded-lg p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-bold text-meant-600 mb-2">4.8</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center"
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

export default PartnerLogosSection;
