
import React from "react";
import { 
  Award, 
  Users, 
  Briefcase, 
  LineChart, 
  Heart, 
  ThumbsUp 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CorporateBenefits = () => {
  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Stand Out in the Market",
      description: "Differentiate your organization as an employer of choice with our prestigious certification."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Attract Top Talent",
      description: "Top performers seek out stress-free workplaces where they can thrive personally and professionally."
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Reduce Turnover",
      description: "Certified organizations experience 35% lower employee turnover rates on average."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Increase Productivity",
      description: "Stress-free environments boost productivity by up to 25% through improved focus and creativity."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Improve Employee Health",
      description: "Lower healthcare costs through reduced stress-related illnesses and absenteeism."
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: "Enhance Brand Reputation",
      description: "Build a positive brand image that resonates with customers, partners, and stakeholders."
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
          Organizational Advantages
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
          Benefits of Stress-Free Certification
        </h2>
        <p className="text-muted-foreground">
          Organizations that prioritize employee wellness and stress reduction enjoy numerous advantages
          in today's competitive business landscape.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="p-6 border rounded-lg bg-white hover:shadow-md transition-shadow duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
