
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50/50 dark:from-background dark:to-background/95">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-3 bg-purple-100 text-purple-800 hover:bg-purple-200">
            Recovery Path
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-800 dark:text-purple-300">
            De-Addiction Programs
          </h1>
          <p className="text-lg text-muted-foreground">
            Reclaim your life with our comprehensive de-addiction programs. Our expert team provides compassionate care and evidence-based treatment to help you overcome addiction.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/surender">
              <Button variant="purple" size="lg" className="flex items-center gap-2">
                <Heart size={18} className="text-purple-100" />
                Start Your Journey
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
