
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Heart, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";

const RehabilitationConfirmation = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">
            Your Request Has Been Received
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for reaching out. A mental health professional will contact you within 24 hours.
          </p>
          
          <div className="p-6 mb-8 bg-green-50 rounded-lg border border-green-100 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-green-700">What Happens Next?</h2>
            <ol className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium">Initial Assessment Call</p>
                  <p className="text-sm text-muted-foreground">A counselor will call you to understand your situation better</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium">Personalized Plan</p>
                  <p className="text-sm text-muted-foreground">We'll create a customized support program based on your needs</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-1 mt-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium">Begin Your Journey</p>
                  <p className="text-sm text-muted-foreground">Start your path to recovery with our professional guidance</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="space-x-4">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="meant" className="gap-2">
                <Heart className="w-4 h-4" /> Explore More Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RehabilitationConfirmation;
