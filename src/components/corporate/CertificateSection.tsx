
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CertificateSample } from "./CertificateSample";
import { toast } from "sonner";

export const CertificateSection = () => {
  const handleApplyNow = () => {
    toast.success("Application submitted successfully!", {
      description: "Our team will contact you shortly to begin the certification process.",
      duration: 5000,
    });
  };
  
  return (
    <section id="certificate-sample" className="py-16 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="mb-3 bg-purple-100 text-purple-800 hover:bg-purple-200">
              Recognition
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">
              Our Stress-Free Certification
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Organizations that meet our rigorous standards receive this prestigious certification.
              Showcase your commitment to employee wellness with our internationally recognized seal.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                <span>Digital and physical certificate</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                <span>Website badge for digital display</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                <span>Promotional materials for recruitment</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                <span>Annual recertification to maintain standards</span>
              </li>
            </ul>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md"
              onClick={handleApplyNow}
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="lg:pl-10">
            <CertificateSample />
          </div>
        </div>
      </div>
    </section>
  );
};
