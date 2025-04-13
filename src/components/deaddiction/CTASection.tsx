
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CigaretteOff, Heart, HeartHandshake } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-love-600 to-love-700 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <HeartHandshake className="h-7 w-7 text-love-200" />
                Ready to Break Free?
              </h2>
              <p className="mb-6">
                Take the first step toward recovery today. Our team is here to support you through every stage of your journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/surender">
                  <Button size="lg" variant="default" className="bg-white text-love-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-love-700">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <CigaretteOff className="h-16 w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
