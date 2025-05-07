
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Bell, Shield } from "lucide-react";

const WhatsAppServices: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">WhatsApp Services</h1>
          <p className="text-lg mb-8 text-muted-foreground">
            Connect with our mental health professionals through WhatsApp for convenient and accessible support.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-meant-600 p-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Daily Check-ins</h2>
                <p className="mb-4 text-muted-foreground">Regular mental health check-ins delivered straight to your WhatsApp. Our experts will send you thoughtful prompts and exercises to support your wellbeing.</p>
                <Button className="w-full">Subscribe</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="bg-red-600 p-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Crisis Support</h2>
                <p className="mb-4 text-muted-foreground">Immediate support during difficult moments, available 24/7. Trained professionals ready to assist you when you need it most.</p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden md:col-span-2">
              <div className="bg-blue-600 p-4">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Appointment Reminders</h2>
                <p className="mb-4 text-muted-foreground">Never miss a session with automated reminders and easy rescheduling options through WhatsApp. Simply reply to manage your bookings.</p>
                <Button variant="secondary" className="w-full">Enable Reminders</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-3">How to Connect</h3>
            <ol className="list-decimal ml-5 space-y-2">
              <li>Save our number: <span className="font-medium">+1 (555) 123-4567</span></li>
              <li>Send "Hello" to start the conversation</li>
              <li>Follow the prompts to select your preferred services</li>
              <li>Complete verification to ensure secure communication</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatsAppServices;
