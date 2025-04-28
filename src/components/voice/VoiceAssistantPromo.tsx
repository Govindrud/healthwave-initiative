
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, HeartPulse, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VoiceAssistantPromo = () => {
  return (
    <section className="section-container bg-gradient-to-b from-blue-50 to-white py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Talk Through Your Feelings</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI voice assistant provides a judgment-free space to express yourself and
            process your emotions in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-blue-600 rounded-2xl overflow-hidden p-8 flex items-center justify-center h-80">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">AI Voice Assistant</h3>
              <p className="text-blue-100">
                Speak naturally and receive supportive responses tailored to your emotional state
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
            <p className="text-muted-foreground mb-8">
              Our AI voice assistant uses advanced emotion detection to understand how
              you're feeling and provide relevant support.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                  <Mic className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Speak naturally</h4>
                  <p className="text-sm text-muted-foreground">
                    Express your thoughts and feelings as they come to you
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                  <HeartPulse className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Emotion awareness</h4>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes your emotional state to provide relevant guidance
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Private & secure</h4>
                  <p className="text-sm text-muted-foreground">
                    Your conversations stay on your device and aren't stored
                  </p>
                </div>
              </div>
            </div>

            <Link to="/voice-assistant">
              <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
                Try Voice Assistant
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VoiceAssistantPromo;
