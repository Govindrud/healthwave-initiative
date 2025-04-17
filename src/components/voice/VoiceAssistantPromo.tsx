
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VoiceAssistantPromo: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Talk Through Your Feelings</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI voice assistant provides a judgment-free space to express yourself
            and process your emotions in real-time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-meant-100">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-meant-600 to-meant-800 p-8 text-white flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
                      <Mic className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI Voice Assistant</h3>
                  <p className="opacity-90">
                    Speak naturally and receive supportive responses tailored to your emotional state
                  </p>
                </div>
              </div>

              <CardContent className="md:w-1/2 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">How It Works</h3>
                    <p className="text-gray-600">
                      Our AI voice assistant uses advanced emotion detection to understand how you're feeling and provide relevant support.
                    </p>
                  </div>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 bg-meant-100 rounded-full p-1">
                        <Mic className="h-4 w-4 text-meant-600" />
                      </div>
                      <div>
                        <span className="font-medium">Speak naturally</span>
                        <p className="text-sm text-gray-500">Express your thoughts and feelings as they come to you</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 bg-meant-100 rounded-full p-1">
                        <Brain className="h-4 w-4 text-meant-600" />
                      </div>
                      <div>
                        <span className="font-medium">Emotion awareness</span>
                        <p className="text-sm text-gray-500">AI analyzes your emotional state to provide relevant guidance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 bg-meant-100 rounded-full p-1">
                        <svg className="h-4 w-4 text-meant-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Private & secure</span>
                        <p className="text-sm text-gray-500">Your conversations stay on your device and aren't stored</p>
                      </div>
                    </li>
                  </ul>

                  <div className="pt-4">
                    <Link to="/ai-voice-agent">
                      <Button className="w-full bg-meant-600 hover:bg-meant-700 text-white">
                        Try Voice Assistant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistantPromo;
