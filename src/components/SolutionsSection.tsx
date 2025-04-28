
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
  feature: string;
  link: string;
  bgColor: string;
  delay: number;
}

const SolutionCard = ({ icon, title, description, feature, link, bgColor, delay }: SolutionCardProps) => {
  return (
    <motion.div 
      className={`rounded-2xl p-6 ${bgColor} h-full flex flex-col`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-foreground/80 mb-4">{description}</p>
      <div className="text-xs text-foreground/70 mb-6 flex items-center">
        <span className="inline-block w-4 h-4 mr-2 text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </span>
        {feature}
      </div>
      <div className="mt-auto">
        <Link to={link} className="text-sm text-primary font-medium flex items-center hover:underline">
          Learn more <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
};

const SolutionsSection = () => {
  const solutions = [
    {
      icon: '👨‍💼',
      title: 'MindfulMe App',
      description: 'A mobile application providing personalized meditation and mindfulness exercises to reduce anxiety and improve focus.',
      feature: 'AI-powered personalization that adapts exercises based on your emotional state, sleep patterns, and stress levels.',
      link: '/products/mindfulme',
      bgColor: 'bg-blue-50',
      delay: 0.1,
    },
    {
      icon: '🤝',
      title: 'TherapyConnect',
      description: 'A platform connecting users with affordable, qualified therapists for virtual consultations on-demand.',
      feature: 'Smart matching algorithm that pairs you with the most compatible therapist based on your needs, communication style, and treatment preferences.',
      link: '/services/therapy-connect',
      bgColor: 'bg-green-50',
      delay: 0.2,
    },
    {
      icon: '📚',
      title: 'StudyWell',
      description: 'Tools and resources specifically designed to help students manage academic stress and maintain mental wellbeing.',
      feature: 'AI study assistant that identifies optimal study times based on your cognitive rhythms and suggests personalized breaks to prevent burnout.',
      link: '/services/study-well',
      bgColor: 'bg-yellow-50',
      delay: 0.3,
    },
    {
      icon: '⚖️',
      title: 'WorkplaceBalance',
      description: 'Corporate wellness programs addressing burnout and promoting healthy work-life balance for employees.',
      feature: 'Predictive analytics that identify burnout risks before they manifest and recommend preventative interventions tailored to your work habits.',
      link: '/corporate-plans',
      bgColor: 'bg-purple-50',
      delay: 0.4,
    },
    {
      icon: '👥',
      title: 'PeerSupport',
      description: 'A community platform where people can share experiences and provide mutual support for mental health issues.',
      feature: 'Smart content moderation and crisis detection algorithms that ensure a safe environment and provide immediate resources when concerning patterns are detected.',
      link: '/services/peer-support',
      bgColor: 'bg-indigo-50',
      delay: 0.5,
    },
    {
      icon: '😴',
      title: 'SleepBetter',
      description: 'Science-backed solutions to improve sleep quality, addressing a common factor in many mental health conditions.',
      feature: 'Adaptive sound therapy that synchronizes with your sleep cycles and adjusts in real-time based on environmental inputs and biofeedback.',
      link: '/products/sleep-better',
      bgColor: 'bg-blue-50',
      delay: 0.6,
    },
  ];

  return (
    <section id="solutions" className="section-container">
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-meant-800">Our Solutions</h2>
        <p className="text-muted-foreground">
          AI-Powered Mental Health Solutions
        </p>
        <p className="text-muted-foreground mt-4">
          Discover our growing ecosystem of mental health services enhanced with artificial intelligence, 
          each one designed to address specific challenges identified by our community and 
          developed with the help of talented college students.
        </p>
        <div className="flex items-center justify-center mt-4">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9 12h6"></path>
              <path d="M12 9v6"></path>
            </svg>
            <span className="text-xs font-medium">All our solutions use ethical AI designed with privacy and user wellbeing as top priorities</span>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {solutions.map((solution, index) => (
          <SolutionCard 
            key={index} 
            icon={solution.icon} 
            title={solution.title}
            description={solution.description}
            feature={solution.feature}
            link={solution.link}
            bgColor={solution.bgColor}
            delay={solution.delay}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button className="bg-meant-600 hover:bg-meant-700 text-white">
          View All Solutions
        </Button>
      </div>
    </section>
  );
};

export default SolutionsSection;
