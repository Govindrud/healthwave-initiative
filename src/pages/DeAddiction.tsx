
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cigarette, Wine, CigaretteOff, MonitorSmartphone, Pills, LucideCoffee, Brain } from "lucide-react";

const addictionTypes = [
  {
    id: "substance",
    name: "Substance Addictions",
    icon: <Wine className="h-5 w-5" />,
    items: [
      {
        title: "Alcohol Addiction",
        description: "Recovery from alcohol dependency with personalized treatment plans",
        icon: <Wine className="h-10 w-10 text-meant-600" />,
      },
      {
        title: "Tobacco Addiction",
        description: "Programs to help you quit smoking and other tobacco products",
        icon: <Cigarette className="h-10 w-10 text-meant-600" />,
      },
      {
        title: "Drug Addiction",
        description: "Support for recovery from prescription or illicit drug dependency",
        icon: <Pills className="h-10 w-10 text-meant-600" />,
      },
    ]
  },
  {
    id: "behavioral",
    name: "Behavioral Addictions",
    icon: <MonitorSmartphone className="h-5 w-5" />,
    items: [
      {
        title: "Screen Addiction",
        description: "Break free from excessive digital device usage",
        icon: <MonitorSmartphone className="h-10 w-10 text-meant-600" />,
      },
      {
        title: "Gambling Addiction",
        description: "Overcome compulsive gambling behaviors",
        icon: <Brain className="h-10 w-10 text-meant-600" />,
      },
      {
        title: "Caffeine Dependency",
        description: "Reduce reliance on caffeine and energy drinks",
        icon: <LucideCoffee className="h-10 w-10 text-meant-600" />,
      },
    ]
  }
];

const programPhases = [
  {
    title: "Assessment & Detoxification",
    description: "Complete evaluation and medically supervised detox process",
    duration: "1-2 weeks"
  },
  {
    title: "Intensive Treatment",
    description: "Therapy, counseling, and evidence-based interventions",
    duration: "4-8 weeks"
  },
  {
    title: "Rehabilitation & Skills Development",
    description: "Building coping mechanisms and life skills",
    duration: "8-12 weeks"
  },
  {
    title: "Aftercare & Support",
    description: "Ongoing support to prevent relapse and maintain recovery",
    duration: "6+ months"
  }
];

const DeAddiction = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
              Recovery Path
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-meant-800">
              De-Addiction Programs
            </h1>
            <p className="text-lg text-muted-foreground">
              Reclaim your life with our comprehensive de-addiction programs. Our expert team provides compassionate care and evidence-based treatment to help you overcome addiction.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/surender">
                <Button variant="meant" size="lg">
                  Start Your Journey
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-meant-600 text-meant-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our De-Addiction Programs</h2>
            <p className="text-muted-foreground">
              We offer specialized programs for various types of addictions, each tailored to address specific challenges and recovery needs.
            </p>
          </div>

          <Tabs defaultValue="substance" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="substance">Substance</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            </TabsList>
            
            {addictionTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {type.items.map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-center">
                          {item.icon}
                        </div>
                        <CardTitle className="text-center mt-4">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center">{item.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <Link to="/surender">
                          <Button variant="outline" className="border-meant-600 text-meant-600">
                            Learn More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 bg-meant-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Rehabilitation Approach</h2>
            <p className="text-muted-foreground">
              We believe in a holistic approach to recovery that addresses the physical, psychological, and social aspects of addiction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programPhases.map((phase, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md relative">
                <div className="h-12 w-12 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mb-4">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{phase.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{phase.description}</p>
                <div className="text-xs font-medium text-meant-600 mt-2">
                  Duration: {phase.duration}
                </div>
                
                {index < programPhases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 h-2 w-8 bg-meant-100"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-meant-600 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Ready to Break Free?</h2>
                <p className="mb-6">
                  Take the first step toward recovery today. Our team is here to support you through every stage of your journey.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/surender">
                    <Button size="lg" variant="default" className="bg-white text-meant-600 hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-meant-700">
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center">
                  <CigaretteOff className="h-16 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DeAddiction;
