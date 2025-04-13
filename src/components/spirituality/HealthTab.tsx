
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookUser, Heart, BookOpen, User } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const healthServices = [
  {
    title: "Ayurvedic Consultation",
    description: "Personalized wellness plans based on your unique constitution and energy balance according to ancient Ayurvedic principles.",
    icon: <BookUser size={24} />
  },
  {
    title: "Spiritual Nutrition",
    description: "Learn about sattvic foods that promote clarity and spiritual growth while nourishing your body.",
    icon: <Heart size={24} />
  },
  {
    title: "Pranayama Breathing",
    description: "Discover breathing techniques that enhance vital energy and support both physical health and meditation practices.",
    icon: <BookOpen size={24} />
  },
  {
    title: "Mind-Body Connection",
    description: "Explore practices that strengthen the connection between mental well-being and physical health.",
    icon: <User size={24} />
  }
];

const pricingData = [
  {
    service: "Ayurvedic Consultation",
    duration: "90 minutes",
    price: "$120"
  },
  {
    service: "Spiritual Nutrition Planning",
    duration: "60 minutes",
    price: "$95"
  },
  {
    service: "Pranayama Session",
    duration: "45 minutes",
    price: "$75"
  },
  {
    service: "Mind-Body Assessment",
    duration: "75 minutes",
    price: "$105"
  },
  {
    service: "Holistic Wellness Package",
    duration: "4 sessions",
    price: "$350"
  }
];

const HealthTab: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
            Holistic Health & Spiritual Wellness
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
            Our approach integrates spiritual practices with physical and mental health guidance for complete wellness.
            We believe that true healing comes from addressing all aspects of the self: body, mind, and spirit.
          </motion.p>
          
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {healthServices.map((item, index) => (
              <motion.div variants={itemVariants} key={index} className="bg-white rounded-lg shadow p-5 border border-meant-100">
                <div className="bg-meant-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-meant-600">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="lg:w-1/3">
          <div className="bg-meant-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Health & Wellness Services</h3>
            
            <div className="space-y-4">
              {pricingData.map((service, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-meant-200 last:border-b-0">
                  <div>
                    <p className="font-medium">{service.service}</p>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                  <div className="text-meant-700 font-semibold">{service.price}</div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-6">Book Health Consultation</Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HealthTab;
