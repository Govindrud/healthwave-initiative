import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Shield } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { StressLevelSelector } from "@/components/surender/StressLevelSelector";
import { HelpInfo } from "@/components/surender/HelpInfo";
import { ContactForm } from "@/components/surender/ContactForm";

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
    
    console.log("Form submitted", { ...formData, stressLevel: selectedLevel });
    
    toast({
      title: "Help is on the way",
      description: "We've received your information. A counselor will contact you shortly.",
      duration: 5000,
    });
    
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
    <MainLayout>
      <section className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
              Let Go of Your Stress
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Taking the first step toward healing shows tremendous courage. We're here to support you through your journey of finding peace and balance.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <StressLevelSelector 
              selectedLevel={selectedLevel}
              onSelectLevel={handleStressLevelSelect}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <HelpInfo onOpenForm={() => setIsFormOpen(true)} />
            
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                Why Choose Professional Help?
              </h3>
              <ul className="space-y-4">
                {[
                  "Expert guidance tailored to your needs",
                  "Confidential and judgment-free support",
                  "Learn effective stress management techniques",
                  "Access to proven therapeutic approaches"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <ContactForm
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default Surender;
