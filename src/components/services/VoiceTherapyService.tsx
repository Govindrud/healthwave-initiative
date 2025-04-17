
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mic, ArrowRight } from "lucide-react";
import ServiceBookingForm from "./ServiceBookingForm";

const VoiceTherapyService = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const features = [
    "Advanced voice analysis technology",
    "Personalized therapy sessions",
    "Progress tracking dashboard",
    "Expert vocal therapist consultation"
  ];

  return (
    <Card className="border-meant-100 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-4">
          <Mic className="h-10 w-10 text-meant-600" />
        </div>
        <CardTitle>Voice Therapy Analysis</CardTitle>
        <CardDescription>
          Our AI-powered voice analysis technology helps identify emotional patterns in your speech.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showBookingForm ? (
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-meant-600 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ServiceBookingForm 
            serviceTitle="Voice Therapy Analysis"
            servicePrice={1999}
            serviceType="voice_therapy"
          />
        )}
      </CardContent>
      {!showBookingForm && (
        <CardFooter className="flex flex-col items-start">
          <div className="text-xl font-bold text-meant-800 mb-4">₹1,999</div>
          <Button 
            className="bg-meant-600 hover:bg-meant-700"
            onClick={() => setShowBookingForm(true)}
          >
            Book Session
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default VoiceTherapyService;
