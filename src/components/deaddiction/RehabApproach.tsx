
import React from "react";
import { Heart } from "lucide-react";

const programPhases = [
  {
    title: "Assessment & Detoxification",
    description: "Complete evaluation and medically supervised detox process",
    duration: "1-2 weeks"
  },
  {
    title: "Intensive Treatment",
    description: "Therapy, counseling, and evidence-based interventions",
    duration: "4-8 weeks"
  },
  {
    title: "Rehabilitation & Skills Development",
    description: "Building coping mechanisms and life skills",
    duration: "8-12 weeks"
  },
  {
    title: "Aftercare & Support",
    description: "Ongoing support to prevent relapse and maintain recovery",
    duration: "6+ months"
  }
];

const RehabApproach = () => {
  return (
    <section className="py-16 bg-love-50/50 dark:bg-love-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-love-700 dark:text-love-300">Our Rehabilitation Approach</h2>
          <p className="text-muted-foreground">
            We believe in a holistic approach to recovery that addresses the physical, psychological, and social aspects of addiction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programPhases.map((phase, index) => (
            <div key={index} className="bg-white dark:bg-love-950/30 rounded-lg p-6 shadow-md relative border border-love-100 dark:border-love-800/30 hover:border-love-300 dark:hover:border-love-700/50 transition-all">
              <div className="h-12 w-12 rounded-full bg-love-100 dark:bg-love-900/50 flex items-center justify-center text-love-600 dark:text-love-300 mb-4">
                {index === 0 ? (
                  <Heart className="h-6 w-6" />
                ) : (
                  <span className="text-lg font-bold">{index + 1}</span>
                )}
              </div>
              <h3 className="font-bold text-lg mb-2 text-love-700 dark:text-love-300">{phase.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{phase.description}</p>
              <div className="text-xs font-medium text-love-600 dark:text-love-400 mt-2">
                Duration: {phase.duration}
              </div>
              
              {index < programPhases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 h-2 w-8 bg-love-100 dark:bg-love-800/40"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RehabApproach;
