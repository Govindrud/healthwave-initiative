
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Award, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ProcessSection = () => {
  const handleApplyNow = () => {
    toast.success("Application submitted successfully!", {
      description: "Our team will contact you shortly to begin the certification process.",
      duration: 5000,
    });
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
            How Our Certification Works
          </h2>
          <p className="text-muted-foreground">
            Our comprehensive evaluation process ensures that only truly stress-free workplaces 
            receive our certification. Here's how we do it:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-meant-500 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-meant-100 to-meant-200 flex items-center justify-center text-meant-600 mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <CardTitle>Application</CardTitle>
              <CardDescription>Organizations submit an application for certification</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Companies provide details about their policies, culture, and employee wellness initiatives.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" className="p-0 text-meant-600" onClick={handleApplyNow}>
                Start Application <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-t-4 border-t-meant-500 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-meant-100 to-meant-200 flex items-center justify-center text-meant-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Assessment</CardTitle>
              <CardDescription>We conduct surveys and interviews with employees</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team gathers honest feedback through anonymous surveys and employee interviews.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" className="p-0 text-meant-600" asChild>
                <Link to="/services">
                  Learn About Our Process <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-t-4 border-t-meant-500 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-meant-100 to-meant-200 flex items-center justify-center text-meant-600 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <CardTitle>Certification</CardTitle>
              <CardDescription>Companies that meet our standards receive certification</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Successful applicants receive our Stress-Free Certification, which they can proudly display.</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" className="p-0 text-meant-600" asChild>
                <a href="#certificate-sample">
                  View Certificate Sample <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
