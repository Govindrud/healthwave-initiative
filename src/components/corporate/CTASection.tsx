
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CTASection = () => {
  const handleApplyNow = () => {
    toast.success("Application submitted successfully!", {
      description: "Our team will contact you shortly to begin the certification process.",
      duration: 5000,
    });
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-meant-700 to-meant-800 text-white relative overflow-hidden">
      <div className="absolute opacity-10 -right-32 bottom-0 w-[400px] h-[400px] rounded-full bg-white"></div>
      <div className="absolute opacity-10 -left-32 top-0 w-[300px] h-[300px] rounded-full bg-white"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-meant-600/80 text-white hover:bg-meant-600 border border-white/20">
            Get Started Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Movement for Healthier Workplaces
          </h2>
          <p className="text-lg mb-8 text-meant-100">
            Apply for our Stress-Free Certification and show the world your commitment to employee wellness.
            Stand out in the job market and attract top talent with our recognized certification.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-meant-700 hover:bg-meant-50 shadow-md"
              onClick={handleApplyNow}
            >
              Apply for Certification
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-meant-600/50">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Contact information */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <Phone className="h-8 w-8 mb-3 text-meant-200" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-meant-100">Have questions? Speak with our certification specialists</p>
            <a href="tel:+919876543210" className="mt-2 text-white hover:underline">+91 9876 543 210</a>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <Mail className="h-8 w-8 mb-3 text-meant-200" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-meant-100">Send us your questions or application request</p>
            <a href="mailto:certification@meanttohelp.com" className="mt-2 text-white hover:underline">certification@meanttohelp.com</a>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <FileText className="h-8 w-8 mb-3 text-meant-200" />
            <h3 className="text-xl font-semibold mb-2">Resources</h3>
            <p className="text-meant-100">Download our certification guidelines and requirements</p>
            <Link to="/resources" className="mt-2 text-white hover:underline">View Resources</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
