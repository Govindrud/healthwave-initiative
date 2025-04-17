
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const VoiceTherapyService = () => {
  return (
    <Card className="border-meant-100 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-4">
          <Mic className="h-10 w-10 text-meant-600" />
        </div>
        <CardTitle>AI Voice Therapy Assistant</CardTitle>
        <CardDescription>
          Speak your mind freely with our AI voice assistant designed to help you express and 
          process your thoughts and feelings through natural conversation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {[
            "Voice-based natural conversations",
            "Express your feelings in a judgment-free space",
            "Receive supportive responses and coping suggestions",
            "Available 24/7 whenever you need to talk",
          ].map((feature, i) => (
            <li key={i} className="flex items-start">
              <svg
                className="h-5 w-5 text-meant-600 mr-2 flex-shrink-0"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="text-xl font-bold text-meant-800 mb-4">Free</div>
        <Link to="/ai-voice-agent">
          <Button className="bg-meant-600 hover:bg-meant-700">
            Try Voice Assistant
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VoiceTherapyService;
