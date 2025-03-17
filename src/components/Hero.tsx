
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-accent to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-meant-100 animate-float opacity-30"></div>
        <div className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-meant-200 animate-float opacity-20" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 right-1/3 w-52 h-52 rounded-full bg-meant-50 animate-float opacity-20" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-5 animate-fade-in">
            Transforming Mental Health Support
          </span>
          <h1 className="text-balance font-bold mb-6 text-gradient animate-fade-in delay-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-500">
              Meant to Help. Meant to Heal.
            </span>
          </h1>
          <p className="text-foreground/80 max-w-3xl mx-auto mb-10 text-balance animate-fade-in delay-200">
            We're building a community that connects real mental health challenges with innovative solutions. 
            By bringing together those in need and college students eager to make a difference, 
            we're creating powerful, accessible mental health resources for everyone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
            <Button 
              size="lg" 
              className="bg-meant-600 hover:bg-meant-700 text-white rounded-full px-8 py-6 hover:shadow-md transition-all"
              onClick={() => document.getElementById('problem')?.scrollIntoView()}
            >
              Share Your Challenge
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 py-6 border-meant-200 hover:bg-meant-50 text-meant-800 hover:shadow-sm transition-all"
              onClick={() => document.getElementById('solutions')?.scrollIntoView()}
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView()}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all"
          aria-label="Scroll down"
        >
          <ArrowDown className="text-meant-600" size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
