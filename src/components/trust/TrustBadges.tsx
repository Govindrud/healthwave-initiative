
import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your data is secure and private"
    },
    {
      icon: Award,
      title: "Licensed Professionals",
      description: "All therapists are verified and certified"
    },
    {
      icon: Users,
      title: "10,000+ Lives Impacted",
      description: "Trusted by thousands of users"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Help when you need it most"
    }
  ];

  return (
    <section className="py-12 bg-meant-50/30">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-meant-800 mb-2">
            Trusted Mental Health Support
          </h2>
          <p className="text-muted-foreground">
            Your safety and privacy are our top priorities
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-sm border border-meant-100 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <badge.icon className="h-6 w-6 text-meant-600" />
              </div>
              <h3 className="font-semibold text-meant-800 mb-2">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
