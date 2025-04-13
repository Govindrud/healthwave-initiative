
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CigaretteOff } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-meant-600 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Ready to Break Free?</h2>
              <p className="mb-6">
                Take the first step toward recovery today. Our team is here to support you through every stage of your journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/surender">
                  <Button size="lg" variant="default" className="bg-white text-meant-600 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-meant-700">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center">
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
