
import React from "react";
import { Button } from "@/components/ui/button";

const SpiritualityCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-lg mb-12">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2000&auto=format&fit=crop" 
          alt="Meditation space with candles" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-meant-800/90 to-meant-700/80"></div>
      </div>
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Begin Your Spiritual Journey Today</h2>
          <p className="mb-8 text-white/90">
            Our team of spiritual guides, teachers, and healers are here to support you on your path to inner peace and spiritual growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-meant-800 hover:bg-gray-100">Book a Consultation</Button>
            <Button variant="outline" className="text-white border-white hover:bg-meant-700/50">Explore Resources</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiritualityCTA;
