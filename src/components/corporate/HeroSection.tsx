
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CertificationLogo } from "./CertificationLogo";
import { toast } from "sonner";

export const HeroSection = () => {
  const handleApplyNow = () => {
    toast.success("Application submitted successfully!", {
      description: "Our team will contact you shortly to begin the certification process.",
      duration: 5000,
    });
  };
  
  return (
    <section className="relative bg-gradient-to-b from-purple-50 to-white py-16 md:py-24 overflow-hidden">
      <div className="absolute opacity-5 -right-64 -top-64 w-[500px] h-[500px] rounded-full bg-purple-300"></div>
      <div className="absolute opacity-5 -left-32 top-32 w-[300px] h-[300px] rounded-full bg-purple-500"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 animate-fade-in">
              Corporate Wellness Program
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                Stress-Free Certification
              </span> for Organizations
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Recognize and reward companies that prioritize employee wellness, 
              reduce workplace stress, and promote a healthy work-life balance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md"
                onClick={handleApplyNow}
              >
                Apply for Certification
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center space-x-2">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 font-medium border-2 border-white shadow-sm"
                  >
                    {i === 1 && <CheckCircle className="h-4 w-4" />}
                    {i === 2 && <Star className="h-4 w-4" />}
                    {i === 3 && <Heart className="h-4 w-4" />}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Join 200+ certified stress-free organizations
              </span>
            </div>
          </div>
          
          <div className="lg:pl-10 flex justify-center">
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-purple-100 to-white rounded-full blur-3xl opacity-70 animate-pulse"></div>
              <CertificationLogo size="lg" animated />
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-white">
          <path fill="currentColor" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};
