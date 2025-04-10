
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { 
  Award, 
  Building, 
  CheckCircle, 
  Star, 
  Briefcase, 
  Heart, 
  Smile, 
  Users
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CertifiedCompaniesSlider } from "@/components/corporate/CertifiedCompaniesSlider";
import { CertificateSample } from "@/components/corporate/CertificateSample";
import { CorporateBenefits } from "@/components/corporate/CorporateBenefits";
import { ReviewsSection } from "@/components/corporate/ReviewsSection";
import { CertificationLogo } from "@/components/corporate/CertificationLogo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const CorporateCertification = () => {
  const [currentCategory, setCurrentCategory] = useState("all");
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-meant-50/80 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <Badge className="mb-4 bg-meant-100 text-meant-800 hover:bg-meant-200">
                Corporate Wellness Program
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-meant-800">
                Stress-Free Certification for Organizations
              </h1>
              <p className="text-lg mb-8 text-muted-foreground">
                Recognize and reward companies that prioritize employee wellness, 
                reduce workplace stress, and promote a healthy work-life balance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-meant-600 hover:bg-meant-700">
                  Apply for Certification
                </Button>
                <Button size="lg" variant="outline" className="border-meant-600 text-meant-600 hover:bg-meant-50">
                  Learn More
                </Button>
              </div>
              
              <div className="mt-8 flex items-center space-x-2">
                <div className="flex -space-x-3">
                  <div className="h-8 w-8 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 font-medium border-2 border-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 font-medium border-2 border-white">
                    <Star className="h-4 w-4" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 font-medium border-2 border-white">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  Join 200+ certified stress-free organizations
                </span>
              </div>
            </div>
            
            <div className="lg:pl-10 flex justify-center">
              <CertificationLogo size="lg" animated />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
              Our Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
              How Our Certification Works
            </h2>
            <p className="text-muted-foreground">
              Our comprehensive evaluation process ensures that only truly stress-free workplaces 
              receive our certification. Here's how we do it:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-meant-500">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <CardTitle>Application</CardTitle>
                <CardDescription>Organizations submit an application for certification</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Companies provide details about their policies, culture, and employee wellness initiatives.</p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-meant-500">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Assessment</CardTitle>
                <CardDescription>We conduct surveys and interviews with employees</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our team gathers honest feedback through anonymous surveys and employee interviews.</p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-meant-500">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle>Certification</CardTitle>
                <CardDescription>Companies that meet our standards receive certification</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Successful applicants receive our Stress-Free Certification, which they can proudly display.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Certified Companies */}
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
              Certified Stress-Free Organizations
            </h2>
            <p className="text-muted-foreground mb-6">
              These organizations have been recognized for their outstanding commitment to employee wellness.
            </p>
            
            <Tabs 
              defaultValue="all" 
              className="w-full" 
              onValueChange={value => setCurrentCategory(value)}
            >
              <div className="flex justify-center mb-6">
                <TabsList className="bg-meant-50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="tech">Tech</TabsTrigger>
                  <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                  <TabsTrigger value="finance">Finance</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <CertifiedCompaniesSlider category="all" />
              </TabsContent>
              <TabsContent value="tech" className="mt-0">
                <CertifiedCompaniesSlider category="tech" />
              </TabsContent>
              <TabsContent value="healthcare" className="mt-0">
                <CertifiedCompaniesSlider category="healthcare" />
              </TabsContent>
              <TabsContent value="finance" className="mt-0">
                <CertifiedCompaniesSlider category="finance" />
              </TabsContent>
              <TabsContent value="education" className="mt-0">
                <CertifiedCompaniesSlider category="education" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Certificate Sample */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
                Recognition
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
                Our Stress-Free Certification
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Organizations that meet our rigorous standards receive this prestigious certification.
                Showcase your commitment to employee wellness with our internationally recognized seal.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3" />
                  <span>Digital and physical certificate</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3" />
                  <span>Website badge for digital display</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3" />
                  <span>Promotional materials for recruitment</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3" />
                  <span>Annual recertification to maintain standards</span>
                </li>
              </ul>
              
              <Button size="lg" className="bg-meant-600 hover:bg-meant-700">
                Apply Now
              </Button>
            </div>
            
            <div className="lg:pl-10">
              <CertificateSample />
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 bg-gradient-to-b from-meant-50/50 to-white">
        <CorporateBenefits />
      </section>
      
      {/* Reviews */}
      <section className="py-16 bg-white">
        <ReviewsSection />
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-meant-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-meant-600/80 text-white hover:bg-meant-600">
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Movement for Healthier Workplaces
            </h2>
            <p className="text-lg mb-8 text-meant-100">
              Apply for our Stress-Free Certification and show the world your commitment to employee wellness.
              Stand out in the job market and attract top talent with our recognized certification.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-meant-700 hover:bg-meant-50">
                Apply for Certification
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-meant-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CorporateCertification;
