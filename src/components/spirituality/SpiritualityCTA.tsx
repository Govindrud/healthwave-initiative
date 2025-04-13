
import React from "react";
import { Button } from "@/components/ui/button";

const SpiritualityCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-meant-600 to-meant-800 rounded-lg text-white p-8 md:p-12 mb-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Begin Your Spiritual Journey Today</h2>
        <p className="mb-8">
          Our team of spiritual guides, teachers, and healers are here to support you on your path to inner peace and spiritual growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-meant-800 hover:bg-gray-100">Book a Consultation</Button>
          <Button variant="outline" className="text-white border-white hover:bg-meant-700">Explore Resources</Button>
        </div>
      </div>
    </section>
  );
};

export default SpiritualityCTA;
