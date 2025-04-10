
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Thermometer, Brain, Heart, Phone, HelpingHand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const stressLevels = [
  {
    level: "Low",
    color: "bg-green-500",
    description: "Manageable daily stress",
    icon: <Thermometer className="h-10 w-10 text-green-500" />,
  },
  {
    level: "Medium",
    color: "bg-yellow-500",
    description: "Persistent stress affecting your daily life",
    icon: <Thermometer className="h-10 w-10 text-yellow-500" />,
  },
  {
    level: "High",
    color: "bg-orange-500",
    description: "Overwhelming stress impacting your wellbeing",
    icon: <Thermometer className="h-10 w-10 text-orange-500" />,
  },
  {
    level: "Extreme",
    color: "bg-red-500",
    description: "Critical stress requiring immediate intervention",
    icon: <Thermometer className="h-10 w-10 text-red-500" />,
  },
];

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

          <div className="mb-16">
            <div className="relative w-full h-8 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full mb-10 shadow-inner">
              <div className="absolute top-0 w-full flex justify-between px-2 -mt-10 text-sm font-medium">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Extreme</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stressLevels.map((stress) => (
                <div
                  key={stress.level}
                  className={`p-6 rounded-lg border hover:border-${stress.color.replace('bg-', '')} hover:shadow-lg cursor-pointer transition-all ${
                    selectedLevel === stress.level ? `border-${stress.color.replace('bg-', '')} shadow-lg` : "border-gray-200"
                  }`}
                  onClick={() => handleStressLevelSelect(stress.level)}
                >
                  <div className="flex flex-col items-center text-center">
                    {stress.icon}
                    <h3 className="font-semibold text-lg mt-4">{stress.level}</h3>
                    <p className="text-muted-foreground text-sm mt-2">{stress.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">How We Help You Surrender</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Brain className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Professional Psychological Support</p>
                      <p className="text-muted-foreground text-sm">Our team of specialists will provide expert guidance tailored to your needs.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Heart className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Compassionate Care</p>
                      <p className="text-muted-foreground text-sm">We create a safe, judgment-free space for your healing journey.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <HelpingHand className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Rehabilitation Programs</p>
                      <p className="text-muted-foreground text-sm">Structured programs designed to help you regain control of your life.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">24/7 Support</p>
                      <p className="text-muted-foreground text-sm">We're always here when you need someone to talk to.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex-1">
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button variant="meant" size="lg" className="w-full">
                      I'm Ready to Surrender
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle>Request Professional Help</DialogTitle>
                        <DialogDescription>
                          Fill in your details and we'll reach out to you within 24 hours.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="concerns">Primary Concerns</Label>
                          <Input
                            id="concerns"
                            name="concerns"
                            value={formData.concerns}
                            onChange={handleChange}
                            placeholder="Tell us briefly about your situation"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" variant="meant">Submit</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Surender;
