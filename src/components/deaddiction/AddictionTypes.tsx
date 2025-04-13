
import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wine, Cigarette, Pill, MonitorSmartphone, Brain, LucideCoffee } from "lucide-react";

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
        icon: <Pill className="h-10 w-10 text-meant-600" />,
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

const AddictionTypes = () => {
  return (
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
  );
};

export default AddictionTypes;
