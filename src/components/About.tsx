
import { CheckCircle, Users, Brain, TrendingUp } from "lucide-react";

const AboutCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="glass rounded-2xl p-6 hover-effect">
    <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center mb-4">
      <Icon className="text-meant-600" size={24} />
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
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
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
          Our Approach
        </span>
        <h2 className="font-bold mb-6 text-balance">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
            Connecting Challenges with Solutions
          </span>
        </h2>
        <p className="text-muted-foreground text-balance">
          At MeantToHelp, we believe that the most effective mental health solutions come from 
          understanding real challenges faced by real people. Our unique approach brings together 
          those experiencing mental health difficulties with passionate students ready to create change.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <AboutCard 
            key={index} 
            icon={feature.icon} 
            title={feature.title} 
            description={feature.description} 
          />
        ))}
      </div>
    </section>
  );
};

export default About;
