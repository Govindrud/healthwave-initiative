
import React from "react";

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
    <section className="py-16 bg-meant-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Rehabilitation Approach</h2>
          <p className="text-muted-foreground">
            We believe in a holistic approach to recovery that addresses the physical, psychological, and social aspects of addiction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programPhases.map((phase, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md relative">
              <div className="h-12 w-12 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mb-4">
                <span className="text-lg font-bold">{index + 1}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{phase.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{phase.description}</p>
              <div className="text-xs font-medium text-meant-600 mt-2">
                Duration: {phase.duration}
              </div>
              
              {index < programPhases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 h-2 w-8 bg-meant-100"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RehabApproach;
