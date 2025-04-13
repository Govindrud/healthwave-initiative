
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
            Recovery Path
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-meant-800">
            De-Addiction Programs
          </h1>
          <p className="text-lg text-muted-foreground">
            Reclaim your life with our comprehensive de-addiction programs. Our expert team provides compassionate care and evidence-based treatment to help you overcome addiction.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/surender">
              <Button variant="meant" size="lg">
                Start Your Journey
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-meant-600 text-meant-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
