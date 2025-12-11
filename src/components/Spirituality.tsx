
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Images } from "lucide-react";
import meditationImg from "@/assets/meditation-session.jpg";
import spiritualCounselingImg from "@/assets/therapy-session.jpg";
import wellnessImg from "@/assets/wellness-center-hero.jpg";

// Custom Meditation icon since it's not available in Lucide
const MeditationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2c1.100 0 2 .9 2 2v10a2 2 0 1 1-4 0V4c0-1.1.9-2 2-2Z" />
    <path d="M12 18c1.150 0 2 1 2 2s-.85 2-2 2-2-1-2-2 .85-2 2-2Z" />
    <path d="M19.8 17.8a7 7 0 0 0-15.6 0" />
  </svg>
);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  imageSrc?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, index, imageSrc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-xl p-6 hover-effect flex flex-col"
    >
      <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center mb-4">
        <div className="text-meant-600">{icon}</div>
      </div>
      {imageSrc && (
        <div className="h-40 rounded-lg overflow-hidden mb-4">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link to="/spirituality" className="mt-auto">
        <Button variant="outline" className="w-full">Learn More</Button>
      </Link>
    </motion.div>
  );
};

const Spirituality: React.FC = () => {
  const spiritualServices = [
    {
      title: "Meditation Sessions",
      description: "Guided meditation sessions to help you find inner peace and mindfulness in your daily life.",
      icon: <MeditationIcon />,
      imageSrc: meditationImg
    },
    {
      title: "Spiritual Counseling",
      description: "One-on-one sessions with spiritual guides to help you navigate life's challenges with wisdom.",
      icon: <Heart />,
      imageSrc: spiritualCounselingImg
    },
    {
      title: "Mindfulness Workshops",
      description: "Group workshops focused on developing mindfulness techniques for mental health improvement.",
      icon: <Sparkles />,
      imageSrc: wellnessImg
    }
  ];

  return (
    <section id="spirituality" className="section-container bg-gradient-to-b from-meant-50 to-white">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
          Spiritual Wellness
        </span>
        <h2 className="font-bold mb-6 text-balance">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
            Nurture Your Spirit, Heal Your Mind
          </span>
        </h2>
        <p className="text-muted-foreground text-balance">
          Explore our spiritual offerings designed to complement traditional mental health approaches.
          Our holistic programs help you connect with your inner self and find meaning beyond daily challenges.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {spiritualServices.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            index={index}
            imageSrc={service.imageSrc}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/spirituality">
          <Button 
            className="rounded-full bg-meant-600 hover:bg-meant-700 text-white px-8"
          >
            Explore All Spiritual Services
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Spirituality;
