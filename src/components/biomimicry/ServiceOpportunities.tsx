
import React from 'react';
import { motion } from 'framer-motion';
import { HandCoins, Utensils, PawPrint, Church, HandHelping } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Church,  // Replace Temple with Church
    title: "Temple Donations",
    description: "Support local temples in preserving our spiritual heritage and helping maintain sacred spaces for devotees.",
    action: "Donate Now"
  },
  {
    icon: HandCoins,
    title: "Support Low Wage Workers",
    description: "Provide financial assistance to low-wage workers struggling to make ends meet. Your help can make a significant difference.",
    action: "Contribute"
  },
  {
    icon: Utensils,
    title: "Langar Service",
    description: "Support the tradition of serving free meals to all, regardless of religion or status. Help feed thousands of devotees daily.",
    action: "Support Langar"
  },
  {
    icon: PawPrint,
    title: "Animal Care Initiative",
    description: "Support gaushalas and animal shelters that care for cows and other animals. Provide food, shelter, and medical care.",
    action: "Help Animals"
  },
  {
    icon: HandHelping,
    title: "Zoo Animal Responsibility",
    description: "Join Pune Zoo's initiative to help care for zoo animals. Your sponsorship ensures proper care and nutrition for these creatures.",
    action: "Sponsor Animals"
  }
];

const ServiceOpportunities = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Serve & Uplift Humanity
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in making a difference through these meaningful service opportunities. Every act of kindness creates ripples of positive change in our world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6 flex justify-center">
                    <service.icon className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Button 
                    variant="gradient" 
                    className="w-full mt-auto"
                  >
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOpportunities;
