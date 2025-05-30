
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Star, MapPin, Users, Award, Shield } from 'lucide-react';

interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
  verified?: boolean;
  rating?: number;
  specialization?: string;
  location?: string;
  clientsServed?: string;
  accreditation?: string;
}

const partnerLogos: PartnerLogo[] = [
  { 
    id: 'partner1', 
    name: 'PsychCare Institute', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.9,
    specialization: 'Trauma & PTSD Therapy',
    location: 'Nationwide',
    clientsServed: '15,000+',
    accreditation: 'APA Certified'
  },
  { 
    id: 'partner2', 
    name: 'Mindful Wellness Center', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.8,
    specialization: 'Anxiety & Depression',
    location: 'Multi-State',
    clientsServed: '12,000+',
    accreditation: 'NBCC Approved'
  },
  { 
    id: 'partner3', 
    name: 'Serenity Counseling Group', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.7,
    specialization: 'Family & Couples Therapy',
    location: 'Regional',
    clientsServed: '8,500+',
    accreditation: 'AAMFT Member'
  },
  { 
    id: 'partner4', 
    name: 'Breakthrough Recovery', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.8,
    specialization: 'Addiction & Recovery',
    location: 'Nationwide',
    clientsServed: '10,000+',
    accreditation: 'SAMHSA Certified'
  },
  { 
    id: 'partner5', 
    name: 'Corporate Wellness Solutions', 
    logo: '/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png',
    verified: true,
    rating: 4.6,
    specialization: 'Employee Mental Health',
    location: 'Global',
    clientsServed: '50,000+',
    accreditation: 'EAP Certified'
  }
];

const PartnerLogosSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-meant-50/30" id="partners">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-meant-600" />
            <Badge className="bg-meant-100 text-meant-800 hover:bg-meant-200">
              Trusted Network
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-meant-600">Verified Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            We've carefully selected and verified mental health professionals and organizations 
            who meet our rigorous standards for quality care, professional credentials, and patient outcomes.
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-meant-100">
            <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-meant-600" />
            </div>
            <p className="text-2xl font-bold text-meant-800 mb-1">150+</p>
            <p className="text-sm text-gray-600">Verified Partners</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-meant-100">
            <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-meant-600" />
            </div>
            <p className="text-2xl font-bold text-meant-800 mb-1">25+</p>
            <p className="text-sm text-gray-600">Specializations</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-meant-100">
            <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-meant-600" />
            </div>
            <p className="text-2xl font-bold text-meant-800 mb-1">4.8</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-meant-100">
            <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-meant-600" />
            </div>
            <p className="text-2xl font-bold text-meant-800 mb-1">100%</p>
            <p className="text-sm text-gray-600">HIPAA Compliant</p>
          </div>
        </motion.div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all group border border-meant-100/50"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-meant-50 rounded-xl flex items-center justify-center">
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`} 
                        className="max-h-10 object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg text-meant-800">{partner.name}</h3>
                        {partner.verified && (
                          <div className="bg-green-100 text-green-600 rounded-full p-1" title="Verified Partner">
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                      {partner.accreditation && (
                        <p className="text-xs text-meant-600 font-medium">{partner.accreditation}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                  <Badge variant="outline" className="bg-meant-50 text-meant-700 border-meant-200">
                    {partner.specialization}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  {partner.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2 flex-shrink-0" />
                      <span>{partner.location}</span>
                    </div>
                  )}
                  {partner.clientsServed && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={14} className="mr-2 flex-shrink-0" />
                      <span>{partner.clientsServed} clients served</span>
                    </div>
                  )}
                  {partner.rating && (
                    <div className="flex items-center">
                      <div className="flex text-yellow-500 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < Math.floor(partner.rating!) ? "currentColor" : "none"} 
                            stroke="currentColor" 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{partner.rating}/5.0</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Button 
                  className="w-full bg-meant-600 hover:bg-meant-700 group-hover:shadow-md transition-all" 
                  size="sm"
                >
                  View Partner Profile
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-white rounded-2xl p-12 border border-meant-100"
        >
          <h3 className="text-2xl font-bold text-meant-800 mb-4">
            Ready to Connect with Our Partners?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our assessment to get matched with the perfect mental health professional 
            from our verified partner network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button size="lg" className="bg-meant-600 hover:bg-meant-700">
                Start Assessment
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/partners">
              <Button size="lg" variant="outline" className="border-meant-200 text-meant-700 hover:bg-meant-50">
                Browse All Partners
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
