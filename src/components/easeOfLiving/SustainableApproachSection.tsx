
import React from 'react';

const SustainableApproachSection = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Our Approach to Sustainable Living</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
          <h3 className="font-semibold text-lg mb-2">Observe Nature's Patterns</h3>
          <p className="text-muted-foreground">
            We study natural ecosystems to inform our approach to sustainable living, applying biomimicry principles.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
          <h3 className="font-semibold text-lg mb-2">Implement Holistic Solutions</h3>
          <p className="text-muted-foreground">
            Our services integrate physical, mental, and environmental wellbeing for truly sustainable outcomes.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
          <h3 className="font-semibold text-lg mb-2">Measure Regenerative Impact</h3>
          <p className="text-muted-foreground">
            We track not just efficiency but how our services contribute to regenerating natural systems and communities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SustainableApproachSection;
