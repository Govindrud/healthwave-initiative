
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Heart } from "lucide-react";

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

const PlanningTab: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Spiritual Journey Planning</h2>
        <p className="text-muted-foreground">Create a personalized roadmap for your spiritual development with expert guidance.</p>
      </div>
      
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div variants={itemVariants} className="bg-meant-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-meant-100 p-2 rounded-full mr-3">
                <Calendar size={24} className="text-meant-600" />
              </div>
              <h3 className="font-semibold text-lg">Assessment & Discovery</h3>
            </div>
            <p className="text-muted-foreground mb-4">Begin with a comprehensive assessment to understand your spiritual background, goals, and areas for growth.</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Personal values assessment</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Spiritual background review</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Goal-setting session</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-meant-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-meant-100 p-2 rounded-full mr-3">
                <BookOpen size={24} className="text-meant-600" />
              </div>
              <h3 className="font-semibold text-lg">Custom Plan Creation</h3>
            </div>
            <p className="text-muted-foreground mb-4">Receive a personalized spiritual development plan designed specifically for your needs and objectives.</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Tailored practice recommendations</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Resource suggestions</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Milestone development</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-meant-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-meant-100 p-2 rounded-full mr-3">
                <Heart size={24} className="text-meant-600" />
              </div>
              <h3 className="font-semibold text-lg">Ongoing Support</h3>
            </div>
            <p className="text-muted-foreground mb-4">Receive continuous guidance and adjustments to your plan as you progress on your spiritual journey.</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Regular check-in sessions</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Progress evaluations</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-2 text-meant-600">•</div>
                <span>Plan refinements</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="bg-gradient-to-r from-meant-100 to-meant-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Ready to start your spiritual planning journey?</h3>
              <p className="text-muted-foreground">Schedule a free 30-minute consultation with one of our spiritual advisors.</p>
            </div>
            <Button size="lg" className="whitespace-nowrap">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PlanningTab;
