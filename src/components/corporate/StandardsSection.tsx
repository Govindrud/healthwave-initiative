
import React from "react";
import { Heart, Building, Star, Users, BarChart } from "lucide-react";
import { Brain } from "@/components/corporate/Brain";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export const StandardsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
            Evaluation Criteria
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
            Our Certification Standards
          </h2>
          <p className="text-muted-foreground">
            Companies are evaluated across several key metrics that measure workplace wellness and stress levels.
            Here's what we look for:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Work-Life Balance", value: 85, icon: <Heart className="h-5 w-5" /> },
            { name: "Mental Health Resources", value: 90, icon: <Brain className="h-5 w-5" /> },
            { name: "Employee Satisfaction", value: 92, icon: <Star className="h-5 w-5" /> },
            { name: "Workplace Environment", value: 88, icon: <Building className="h-5 w-5" /> },
            { name: "Stress Management Programs", value: 86, icon: <BarChart className="h-5 w-5" /> },
            { name: "Leadership Support", value: 94, icon: <Users className="h-5 w-5" /> }
          ].map((metric, index) => (
            <div key={index} className="bg-meant-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mr-3">
                  {metric.icon}
                </div>
                <h3 className="font-semibold text-lg">{metric.name}</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Minimum Required: 70%</span>
                  <span className="font-medium">{metric.value}%</span>
                </div>
                <Slider
                  defaultValue={[metric.value]}
                  max={100}
                  step={1}
                  disabled
                  className="pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
