
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic, Speech } from "lucide-react";

const VoiceAssistantPromo: React.FC = () => {
  return (
    <section id="voice-assistant" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-4">
              New Feature
            </span>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-meant-600">
                AI Voice Therapy Assistant
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Our innovative voice assistant lets you speak freely about what's on your mind, providing
              a judgment-free space to express your thoughts and feelings. It's like having a supportive
              listener available 24/7.
            </p>
            <ul className="space-y-2 mb-6 text-left max-w-md mx-auto md:mx-0">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-meant-600 mr-2 flex-shrink-0 mt-1"
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
                <span>Speak naturally and receive supportive responses</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-meant-600 mr-2 flex-shrink-0 mt-1"
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
                <span>Express your thoughts to help clear your mind</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-meant-600 mr-2 flex-shrink-0 mt-1"
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
                <span>Receive personalized coping strategies and support</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-meant-600 mr-2 flex-shrink-0 mt-1"
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
                <span>Available 24/7, completely private and secure</span>
              </li>
            </ul>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/ai-voice-agent">
                <Button className="bg-meant-600 hover:bg-meant-700">
                  <Mic className="mr-2 h-4 w-4" />
                  Try Voice Assistant
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
            <div className="relative bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-center h-64 w-full rounded-lg bg-blue-50">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Speech className="h-20 w-20 text-meant-600" />
                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 animate-ping"></span>
                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500"></span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Voice Assistant</h3>
                  <p className="text-gray-600 mb-4">
                    "I'm here to listen and help you process your thoughts. What's on your mind today?"
                  </p>
                  <div className="flex justify-center gap-3">
                    <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce"></span>
                    <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="inline-block h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2 items-center justify-center">
                <button className="flex items-center justify-center h-12 w-12 rounded-full bg-meant-600 text-white">
                  <Mic className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistantPromo;
