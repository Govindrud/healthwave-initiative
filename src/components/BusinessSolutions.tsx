
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Importing framer-motion for animations
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

interface Solution {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const BusinessSolutions = () => {
  const solutions: Solution[] = [
    {
      id: 1,
      title: "MindfulMe App",
      description: "A mobile application providing personalized meditation and mindfulness exercises to reduce anxiety and improve focus.",
      icon: "💆‍♂️",
      color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    },
    {
      id: 2,
      title: "TherapyConnect",
      description: "A platform connecting users with affordable, qualified therapists for virtual consultations on-demand.",
      icon: "🤝",
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
    },
    {
      id: 3,
      title: "StudyWell",
      description: "Tools and resources specifically designed to help students manage academic stress and maintain mental wellbeing.",
      icon: "📚",
      color: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
    },
    {
      id: 4,
      title: "WorkplaceBalance",
      description: "Corporate wellness programs addressing burnout and promoting healthy work-life balance for employees.",
      icon: "⚖️",
      color: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    },
    {
      id: 5,
      title: "PeerSupport",
      description: "A moderated community platform where people can share experiences and provide mutual support for mental health issues.",
      icon: "👥",
      color: "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200",
    },
    {
      id: 6,
      title: "SleepBetter",
      description: "Science-backed solutions to improve sleep quality, addressing a common factor in many mental health conditions.",
      icon: "😴",
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
    }
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="solutions" className="section-container bg-gradient-to-b from-white to-meant-50">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
          Our Solutions
        </span>
        <h2 className="font-bold mb-6 text-balance">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
            Innovative Mental Health Solutions
          </span>
        </h2>
        <p className="text-muted-foreground text-balance">
          Discover our growing ecosystem of mental health services, each one designed 
          to address specific challenges identified by our community and developed with 
          the help of talented college students.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {solutions.map((solution) => (
          <motion.div
            key={solution.id}
            className={`rounded-2xl p-8 border ${solution.color} transition-all hover-effect`}
            onMouseEnter={() => setHoveredId(solution.id)}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: solution.id * 0.1 }}
          >
            <div className="text-4xl mb-4">{solution.icon}</div>
            <h3 className="text-xl font-medium mb-2">{solution.title}</h3>
            <p className="text-muted-foreground mb-4">{solution.description}</p>
            <Button 
              variant="ghost" 
              className="p-0 h-auto text-meant-700 hover:text-meant-800 hover:bg-transparent group"
            >
              Learn more
              <ArrowRight 
                size={16} 
                className="ml-1 transition-transform group-hover:translate-x-1" 
              />
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button 
          className="rounded-full bg-meant-600 hover:bg-meant-700 text-white px-8"
        >
          View All Solutions
        </Button>
      </div>
    </section>
  );
};

export default BusinessSolutions;
