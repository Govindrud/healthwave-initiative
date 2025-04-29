
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
}

const partnerLogos: PartnerLogo[] = [
  { 
    id: 'partner1', 
    name: 'MindWell Therapy', 
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    verified: true,
    rating: 4.8
  },
  { 
    id: 'partner2', 
    name: 'Serenity Counseling', 
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    verified: true,
    rating: 4.6
  },
  { 
    id: 'partner3', 
    name: 'Breathe Meditation Center', 
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    verified: true,
    rating: 4.9
  },
  { 
    id: 'partner4', 
    name: 'Recovery Path', 
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    verified: true,
    rating: 4.7
  },
  { 
    id: 'partner5', 
    name: 'Thrive Corporate Wellness', 
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    rating: 4.5
  }
];

const PartnerLogosSection: React.FC = () => {
  return (
    <section className="py-12 bg-meant-50/50">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center h-full">
                <div className="mb-3 relative w-full aspect-video flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-12 object-contain"
                  />
                  {partner.verified && (
                    <div className="absolute -top-1 -right-1 bg-green-100 rounded-full p-0.5" title="Verified Partner">
                      <Check size={14} className="text-green-600" />
                    </div>
                  )}
                </div>
                <div className="mt-auto text-center">
                  <p className="text-sm font-medium">{partner.name}</p>
                  {partner.rating && (
                    <div className="flex items-center justify-center mt-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs ml-1 text-gray-600">{partner.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
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
