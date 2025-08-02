
import React from "react";
import { motion } from "framer-motion";
import { Brain, Heart, HelpingHand, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpInfoProps {
  stressLevel: string;
}

export const HelpInfo: React.FC<HelpInfoProps> = ({ stressLevel }) => {
  
  const getStressLevelInfo = (level: string) => {
    switch (level) {
      case 'Low':
        return {
          title: 'Managing Daily Stress',
          description: 'You\'re experiencing normal daily stress. Here are some resources to help you maintain your well-being.',
          urgency: 'low'
        };
      case 'Medium':
        return {
          title: 'Persistent Stress Support',
          description: 'Your stress levels are concerning and may be affecting your daily life. Let\'s work together to find solutions.',
          urgency: 'medium'
        };
      case 'High':
        return {
          title: 'Overwhelming Stress Relief',
          description: 'You\'re dealing with high stress that\'s impacting your well-being. Immediate professional support is recommended.',
          urgency: 'high'
        };
      case 'Extreme':
        return {
          title: 'Critical Stress Intervention',
          description: 'Your stress levels require immediate professional attention. We\'re here to provide urgent support.',
          urgency: 'critical'
        };
      default:
        return {
          title: 'Stress Assessment',
          description: 'Please select your stress level for personalized support.',
          urgency: 'unknown'
        };
    }
  };

  const stressInfo = getStressLevelInfo(stressLevel);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <motion.h2 
            className="text-2xl font-bold mb-6 text-meant-700"
            variants={item}
          >
            {stressInfo.title}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-6"
            variants={item}
          >
            {stressInfo.description}
          </motion.p>
          <motion.ul className="space-y-5" variants={container}>
            <motion.li className="flex gap-3" variants={item}>
              <div className="h-12 w-12 rounded-full bg-meant-50 flex items-center justify-center flex-shrink-0">
                <Brain className="h-6 w-6 text-meant-600" />
              </div>
              <div>
                <p className="font-medium text-meant-800">Professional Psychological Support</p>
                <p className="text-muted-foreground text-sm">Our team of specialists will provide expert guidance tailored to your needs.</p>
              </div>
            </motion.li>
            <motion.li className="flex gap-3" variants={item}>
              <div className="h-12 w-12 rounded-full bg-meant-50 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-meant-600" />
              </div>
              <div>
                <p className="font-medium text-meant-800">Compassionate Care</p>
                <p className="text-muted-foreground text-sm">We create a safe, judgment-free space for your healing journey.</p>
              </div>
            </motion.li>
            <motion.li className="flex gap-3" variants={item}>
              <div className="h-12 w-12 rounded-full bg-meant-50 flex items-center justify-center flex-shrink-0">
                <HelpingHand className="h-6 w-6 text-meant-600" />
              </div>
              <div>
                <p className="font-medium text-meant-800">Rehabilitation Programs</p>
                <p className="text-muted-foreground text-sm">Structured programs designed to help you regain control of your life.</p>
              </div>
            </motion.li>
            <motion.li className="flex gap-3" variants={item}>
              <div className="h-12 w-12 rounded-full bg-meant-50 flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-meant-600" />
              </div>
              <div>
                <p className="font-medium text-meant-800">24/7 Support</p>
                <p className="text-muted-foreground text-sm">We're always here when you need someone to talk to.</p>
              </div>
            </motion.li>
          </motion.ul>
        </div>

        <motion.div 
          className="flex-1"
          variants={item}
        >
          <div className="bg-gradient-to-br from-meant-50 to-white p-6 rounded-lg shadow-sm border border-meant-100">
            <h3 className="text-xl font-semibold mb-4 text-meant-700">Ready to Take the First Step?</h3>
            <p className="text-muted-foreground mb-6">Our team of compassionate professionals is ready to help you on your journey to recovery.</p>
            <Button 
              variant="meant" 
              size="lg" 
              className="w-full group transition-all"
              onClick={() => window.location.href = '/contact'}
            >
              <span>Get Professional Help</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="ml-2 transform group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
