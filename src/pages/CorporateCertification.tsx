import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { 
  Award, 
  Building, 
  CheckCircle, 
  Star, 
  Briefcase, 
  Heart, 
  Users,
  ArrowRight,
  FileText,
  Phone,
  Mail,
  ChevronRight,
  BarChart,
  Brain
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
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const CorporateCertification = () => {
  const [currentCategory, setCurrentCategory] = useState("all");
  
  const handleApplyNow = () => {
    toast.success("Application submitted successfully!", {
      description: "Our team will contact you shortly to begin the certification process.",
      duration: 5000,
    });
  };
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-meant-50 to-white py-16 md:py-24 overflow-hidden">
        <div className="absolute opacity-5 -right-64 -top-64 w-[500px] h-[500px] rounded-full bg-meant-300"></div>
        <div className="absolute opacity-5 -left-32 top-32 w-[300px] h-[300px] rounded-full bg-meant-500"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <Badge className="mb-4 bg-meant-100 text-meant-800 hover:bg-meant-200 animate-fade-in">
                Corporate Wellness Program
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-meant-800">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-600 to-meant-800">
                  Stress-Free Certification
                </span> for Organizations
              </h1>
              <p className="text-lg mb-8 text-muted-foreground">
                Recognize and reward companies that prioritize employee wellness, 
                reduce workplace stress, and promote a healthy work-life balance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-meant-600 to-meant-700 hover:from-meant-700 hover:to-meant-800 shadow-md"
                  onClick={handleApplyNow}
                >
                  Apply for Certification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-meant-600 text-meant-600 hover:bg-meant-50">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center space-x-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-meant-100 to-meant-200 flex items-center justify-center text-meant-600 font-medium border-2 border-white shadow-sm"
                    >
                      {i === 1 && <CheckCircle className="h-4 w-4" />}
                      {i === 2 && <Star className="h-4 w-4" />}
                      {i === 3 && <Heart className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Join 200+ certified stress-free organizations
                </span>
              </div>
            </div>
            
            <div className="lg:pl-10 flex justify-center">
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-meant-100 to-white rounded-full blur-3xl opacity-70 animate-pulse"></div>
                <CertificationLogo size="lg" animated />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-white">
            <path fill="currentColor" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
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
              <div className="flex justify-center mb-6 overflow-x-auto">
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
      <section id="certificate-sample" className="py-16 bg-white scroll-mt-24">
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
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3 flex-shrink-0" />
                  <span>Digital and physical certificate</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3 flex-shrink-0" />
                  <span>Website badge for digital display</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3 flex-shrink-0" />
                  <span>Promotional materials for recruitment</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3 flex-shrink-0" />
                  <span>Annual recertification to maintain standards</span>
                </li>
              </ul>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-meant-600 to-meant-700 hover:from-meant-700 hover:to-meant-800 shadow-md"
                onClick={handleApplyNow}
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
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
      
      {/* Standards Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-3 bg-meant-100 text-meant-800 hover:bg-meant-200">
              Evaluation Criteria
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
              Our Certification Standards
            </h2>
            <p className="text-muted-foreground">
              Companies are evaluated across several key metrics that measure workplace wellness and stress levels.
              Here's what we look for:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Work-Life Balance", value: 85, icon: <Heart className="h-5 w-5" /> },
              { name: "Mental Health Resources", value: 90, icon: <Brain className="h-5 w-5" /> },
              { name: "Employee Satisfaction", value: 92, icon: <Star className="h-5 w-5" /> },
              { name: "Workplace Environment", value: 88, icon: <Building className="h-5 w-5" /> },
              { name: "Stress Management Programs", value: 86, icon: <BarChart className="h-5 w-5" /> },
              { name: "Leadership Support", value: 94, icon: <Users className="h-5 w-5" /> }
            ].map((metric, index) => (
              <div key={index} className="bg-meant-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 mr-3">
                    {metric.icon || <CheckCircle className="h-5 w-5" />}
                  </div>
                  <h3 className="font-semibold text-lg">{metric.name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Minimum Required: 70%</span>
                    <span className="font-medium">{metric.value}%</span>
                  </div>
                  <Slider
                    defaultValue={[metric.value]}
                    max={100}
                    step={1}
                    disabled
                    className="pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Reviews */}
      <section className="py-16 bg-gradient-to-b from-white to-meant-50/50">
        <ReviewsSection />
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-meant-700 to-meant-800 text-white relative overflow-hidden">
        <div className="absolute opacity-10 -right-32 bottom-0 w-[400px] h-[400px] rounded-full bg-white"></div>
        <div className="absolute opacity-10 -left-32 top-0 w-[300px] h-[300px] rounded-full bg-white"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-meant-600/80 text-white hover:bg-meant-600 border border-white/20">
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
              <Button 
                size="lg" 
                className="bg-white text-meant-700 hover:bg-meant-50 shadow-md"
                onClick={handleApplyNow}
              >
                Apply for Certification
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-meant-600/50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
              <Phone className="h-8 w-8 mb-3 text-meant-200" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-meant-100">Have questions? Speak with our certification specialists</p>
              <a href="tel:+919876543210" className="mt-2 text-white hover:underline">+91 9876 543 210</a>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
              <Mail className="h-8 w-8 mb-3 text-meant-200" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-meant-100">Send us your questions or application request</p>
              <a href="mailto:certification@meanttohelp.com" className="mt-2 text-white hover:underline">certification@meanttohelp.com</a>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
              <FileText className="h-8 w-8 mb-3 text-meant-200" />
              <h3 className="text-xl font-semibold mb-2">Resources</h3>
              <p className="text-meant-100">Download our certification guidelines and requirements</p>
              <Link to="/resources" className="mt-2 text-white hover:underline">View Resources</Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CorporateCertification;
