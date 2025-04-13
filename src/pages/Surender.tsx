
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { StressLevelSelector } from "@/components/surender/StressLevelSelector";
import { HelpInfo } from "@/components/surender/HelpInfo";
import { ContactForm } from "@/components/surender/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, HelpCircle, HeartHandshake } from "lucide-react";

const Surender = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    concerns: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStressLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setTimeout(() => {
      setIsFormOpen(true);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend
    console.log("Form submitted", { ...formData, stressLevel: selectedLevel });
    
    toast({
      title: "Help is on the way",
      description: "We've received your information. A counselor will contact you shortly.",
      duration: 5000,
    });
    
    // Navigate to thank you page or show confirmation
    setTimeout(() => {
      navigate("/rehabilitation-confirmation");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout title="Surrender Your Stress | MeantToHelp">
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50 dark:from-background dark:to-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-meant-100 dark:bg-meant-900/30 rounded-full mb-4">
              <HeartHandshake className="h-8 w-8 text-meant-600 dark:text-meant-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-meant-800 dark:text-white">
              Surrender Your Stress
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We understand how overwhelming stress can become. The first step toward healing is acknowledging where you are. Select your current stress level below.
            </p>
          </div>

          {/* Emergency help banner */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 dark:text-red-300">24/7 Suicide Prevention Helpline</h3>
                  <p className="text-red-700 dark:text-red-400">If you're feeling suicidal or in extreme distress, please call now</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="destructive" className="flex items-center gap-2" size="lg">
                  <Phone className="h-4 w-4" />
                  <a href="tel:1800-273-8255">1800-273-8255</a>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 border-red-300 text-red-700 dark:border-red-800 dark:text-red-400">
                  <MessageCircle className="h-4 w-4" />
                  <a href="sms:741741">Text 741741</a>
                </Button>
              </div>
            </div>
          </div>

          <StressLevelSelector 
            selectedLevel={selectedLevel}
            onSelectLevel={handleStressLevelSelect}
          />

          <HelpInfo onOpenForm={() => setIsFormOpen(true)} />
          
          <ContactForm
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          
          {/* Support resources section */}
          <div className="mt-16 bg-white dark:bg-meant-900/20 p-6 rounded-xl shadow-md border border-meant-100 dark:border-meant-800/50">
            <h2 className="text-2xl font-bold mb-4 text-meant-800 dark:text-white flex items-center">
              <HelpCircle className="mr-2 h-6 w-6 text-meant-600 dark:text-meant-400" />
              Additional Support Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-meant-50 dark:bg-meant-900/30 p-5 rounded-lg border border-meant-100 dark:border-meant-800/50">
                <h3 className="font-semibold text-meant-700 dark:text-meant-300 mb-2">Crisis Text Line</h3>
                <p className="text-sm text-muted-foreground mb-4">Text HOME to 741741 to connect with a Crisis Counselor.</p>
                <Button variant="outline" className="w-full border-meant-300 text-meant-700 dark:border-meant-700 dark:text-meant-400">
                  Learn More
                </Button>
              </div>
              <div className="bg-meant-50 dark:bg-meant-900/30 p-5 rounded-lg border border-meant-100 dark:border-meant-800/50">
                <h3 className="font-semibold text-meant-700 dark:text-meant-300 mb-2">Veteran's Crisis Line</h3>
                <p className="text-sm text-muted-foreground mb-4">Call 1-800-273-8255 and Press 1, or text 838255.</p>
                <Button variant="outline" className="w-full border-meant-300 text-meant-700 dark:border-meant-700 dark:text-meant-400">
                  Learn More
                </Button>
              </div>
              <div className="bg-meant-50 dark:bg-meant-900/30 p-5 rounded-lg border border-meant-100 dark:border-meant-800/50">
                <h3 className="font-semibold text-meant-700 dark:text-meant-300 mb-2">SAMHSA Helpline</h3>
                <p className="text-sm text-muted-foreground mb-4">Call 1-800-662-4357 for treatment referrals.</p>
                <Button variant="outline" className="w-full border-meant-300 text-meant-700 dark:border-meant-700 dark:text-meant-400">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Surender;
