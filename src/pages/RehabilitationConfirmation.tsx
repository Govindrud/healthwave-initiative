
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Phone, ArrowRight } from "lucide-react";

const RehabilitationConfirmation = () => {
  return (
    <MainLayout title="Confirmation | MeantToHelp">
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-md border border-meant-100 overflow-hidden">
            <div className="bg-meant-600 p-6 flex justify-center">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
            
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold text-meant-800 mb-4">Thank You for Reaching Out</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We've received your information and a counselor will contact you shortly.
                Your journey to recovery begins now.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-8">
                <div className="bg-meant-50 p-5 rounded-lg border border-meant-100 flex flex-col items-center">
                  <Phone className="h-8 w-8 text-meant-600 mb-3" />
                  <h3 className="font-semibold text-meant-700 mb-1">Expect a Call</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    One of our counselors will call you within 24 hours to discuss the next steps.
                  </p>
                </div>
                
                <div className="bg-meant-50 p-5 rounded-lg border border-meant-100 flex flex-col items-center">
                  <Calendar className="h-8 w-8 text-meant-600 mb-3" />
                  <h3 className="font-semibold text-meant-700 mb-1">Schedule a Session</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    We'll help you book your first counseling session at a time that works for you.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Return to Home
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="meant" className="w-full sm:w-auto group">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-meant-50 p-6 border-t border-meant-100">
              <div className="text-center text-sm text-muted-foreground">
                <p>If you need immediate assistance, please call our 24/7 helpline: <a href="tel:1800-273-8255" className="font-medium text-meant-700">1800-273-8255</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default RehabilitationConfirmation;
