
import React from "react";
import { motion } from "framer-motion";
import { Brain, Heart, HelpingHand, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpInfoProps {
  onOpenForm: () => void;
}

export const HelpInfo: React.FC<HelpInfoProps> = ({ onOpenForm }) => {
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
            How We Help You Surrender
          </motion.h2>
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
              onClick={onOpenForm}
            >
              <span>I'm Ready to Surrender</span>
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
