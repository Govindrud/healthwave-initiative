
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <MainLayout>
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-meant-800">
              Surrender Your Stress
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We understand how overwhelming stress can become. The first step toward healing is acknowledging where you are. Select your current stress level below.
            </p>
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
        </div>
      </section>
    </MainLayout>
  );
};

export default Surender;
