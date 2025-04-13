
import { CheckCircle, Users, Brain, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const AboutCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  delay: number
}) => (
  <motion.div 
    className="glass rounded-2xl p-6 hover-effect card-hover dark:bg-purple-900/10 dark:backdrop-blur-lg dark:border-purple-800/30"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-50 to-purple-200 dark:from-purple-900 dark:to-purple-800 flex items-center justify-center mb-5 shadow-sm">
      <Icon className="text-purple-600 dark:text-purple-300" size={26} />
    </div>
    <h3 className="text-xl font-semibold mb-3 dark:text-white">{title}</h3>
    <p className="text-muted-foreground dark:text-purple-200/70">{description}</p>
  </motion.div>
);

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Mental Health Focus",
      description: "We address real mental health challenges with practical, accessible solutions designed for everyone."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform connects those facing challenges with students eager to create innovative solutions."
    },
    {
      icon: CheckCircle,
      title: "Validated Solutions",
      description: "Every solution is thoroughly tested and validated to ensure it truly helps those in need."
    },
    {
      icon: TrendingUp,
      title: "Future Focused",
      description: "We're constantly evolving to address emerging mental health needs in our changing world."
    }
  ];

  return (
    <section id="about" className="section-container">
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-sm font-medium mb-3">
          Our Approach
        </span>
        <h2 className="font-bold mb-6 text-balance">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-600 dark:from-purple-400 dark:to-purple-200">
            Connecting Challenges with Solutions
          </span>
        </h2>
        <p className="text-muted-foreground dark:text-purple-100/80 text-balance">
          At MeantToHelp, we believe that the most effective mental health solutions come from 
          understanding real challenges faced by real people. Our unique approach brings together 
          those experiencing mental health difficulties with passionate students ready to create change.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <AboutCard 
            key={index} 
            icon={feature.icon} 
            title={feature.title} 
            description={feature.description}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
