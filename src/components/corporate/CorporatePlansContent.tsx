
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Building, Calendar, Clock, CheckCircle, Phone, Mail, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CorporatePlansContent = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleContactSubmit = () => {
    if (!contactName || !contactEmail || !companyName) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Your inquiry has been submitted. Our team will contact you shortly.");
    setIsContactDialogOpen(false);
    
    // Reset form
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setCompanyName("");
    setEmployeeCount("");
    setMessage("");
  };

  const openContactDialog = (planName = "") => {
    setSelectedPlan(planName);
    setIsContactDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Mental Health Support for Your Organization</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Comprehensive mental health solutions designed to support your employees' wellbeing, 
          boost productivity, and create a healthier workplace culture.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            variant="meant"
            className="rounded-full px-8"
            onClick={() => openContactDialog()}
          >
            Request a Consultation
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="rounded-full px-8"
            onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Plans
          </Button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Corporate Mental Health Solutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-meant-50 p-3 rounded-full mb-4">
              <Shield className="h-8 w-8 text-meant-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reduced Healthcare Costs</h3>
            <p className="text-muted-foreground">
              Proactive mental health support can reduce absenteeism and healthcare utilization, 
              leading to significant cost savings.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-meant-50 p-3 rounded-full mb-4">
              <Users className="h-8 w-8 text-meant-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Improved Employee Performance</h3>
            <p className="text-muted-foreground">
              Employees with good mental health show higher productivity, creativity, and engagement 
              in the workplace.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-meant-50 p-3 rounded-full mb-4">
              <Building className="h-8 w-8 text-meant-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enhanced Company Culture</h3>
            <p className="text-muted-foreground">
              Supporting mental health demonstrates your commitment to employee wellbeing, 
              improving retention and attracting top talent.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-meant-50 border border-meant-100 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Did You Know?</h3>
            <p className="text-meant-700 mb-6">
              According to the World Health Organization, for every ₹1 invested in mental health support, 
              there is a return of ₹4 in improved employee health and productivity.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm flex-1">
                <div className="text-3xl font-bold text-meant-600 mb-1">40%</div>
                <p className="text-sm text-meant-700">Reduction in employee absenteeism</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm flex-1">
                <div className="text-3xl font-bold text-meant-600 mb-1">62%</div>
                <p className="text-sm text-meant-700">Increase in employee retention</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm flex-1">
                <div className="text-3xl font-bold text-meant-600 mb-1">3.5x</div>
                <p className="text-sm text-meant-700">Return on investment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div id="plans" className="mb-20 scroll-mt-24">
        <h2 className="text-3xl font-bold text-center mb-4">Corporate Plans</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          Choose from our range of customizable plans designed to meet the unique needs of your organization,
          regardless of size or industry.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Card className="border-2 hover:border-meant-200 transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Starter Plan</span>
                <Badge variant="outline" className="text-meant-600 border-meant-200 bg-meant-50">
                  Small Teams
                </Badge>
              </CardTitle>
              <CardDescription>Perfect for startups and small businesses</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹25,000</span>
                <span className="text-muted-foreground">/month</span>
                <p className="text-sm text-muted-foreground">For up to 25 employees</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Employee mental health assessment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>8 counseling sessions per employee annually</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Monthly wellness workshops</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Crisis support helpline</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Basic usage analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="meant" 
                className="w-full"
                onClick={() => openContactDialog("Starter Plan")}
              >
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
          
          {/* Growth Plan */}
          <Card className="border-2 border-meant-600 hover:shadow-lg transition-all relative">
            <div className="absolute top-0 right-0 left-0 bg-meant-600 text-white text-center text-sm font-medium py-1">
              Most Popular
            </div>
            <CardHeader className="pt-10">
              <CardTitle className="flex justify-between items-center">
                <span>Growth Plan</span>
                <Badge variant="meant" className="">
                  Mid-sized
                </Badge>
              </CardTitle>
              <CardDescription>Ideal for growing companies and teams</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹60,000</span>
                <span className="text-muted-foreground">/month</span>
                <p className="text-sm text-muted-foreground">For up to 100 employees</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>All Starter Plan features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>12 counseling sessions per employee annually</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Bi-weekly wellness workshops</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Manager mental health training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Quarterly wellbeing reports</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Team stress management sessions</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="meant" 
                className="w-full"
                onClick={() => openContactDialog("Growth Plan")}
              >
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2 hover:border-meant-200 transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Enterprise Plan</span>
                <Badge variant="outline" className="text-meant-600 border-meant-200 bg-meant-50">
                  Enterprise
                </Badge>
              </CardTitle>
              <CardDescription>Comprehensive solution for large organizations</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">Custom</span>
                <p className="text-sm text-muted-foreground">Tailored to your organization's needs</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>All Growth Plan features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Unlimited counseling sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>On-site wellness clinics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Custom wellness programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-2 shrink-0 mt-0.5" />
                  <span>Executive mental health coaching</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="meant" 
                className="w-full"
                onClick={() => openContactDialog("Enterprise Plan")}
              >
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Insurance Integration Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Insurance Integration</h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-4">Seamless Insurance Compatibility</h3>
              <p className="text-muted-foreground mb-6">
                Our corporate mental health plans are designed to work alongside your existing health insurance coverage, 
                maximizing benefits while minimizing costs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Insurance Claim Assistance</h4>
                    <p className="text-sm text-muted-foreground">We handle the paperwork so your employees can focus on their wellbeing</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Compatible with Major Insurers</h4>
                    <p className="text-sm text-muted-foreground">Our services work with most major health insurance providers</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-meant-600 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Benefit Maximization</h4>
                    <p className="text-sm text-muted-foreground">We'll help you optimize your insurance benefits for mental health coverage</p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => openContactDialog("Insurance Integration")}
              >
                Discuss Insurance Options
              </Button>
            </div>
            
            <div className="bg-meant-50 p-8 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-4">Supported Insurance Partners</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm flex items-center justify-center">
                  <span className="font-medium">Star Health</span>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm flex items-center justify-center">
                  <span className="font-medium">HDFC ERGO</span>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm flex items-center justify-center">
                  <span className="font-medium">Bajaj Allianz</span>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm flex items-center justify-center">
                  <span className="font-medium">ICICI Lombard</span>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm flex items-center justify-center">
                  <span className="font-medium">Religare</span>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm flex items-center justify-center">
                  <span className="font-medium">New India</span>
                </div>
              </div>
              
              <p className="text-sm text-meant-700 mt-4 text-center">
                And many more! Contact us to check compatibility with your provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by Leading Organizations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                TC
              </div>
              <div>
                <h4 className="font-medium">TechCraft Solutions</h4>
                <p className="text-sm text-muted-foreground">Software Development</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              "Implementing MeantToHelp's corporate wellness program has significantly reduced our employee turnover and increased productivity. The ROI has been impressive."
            </p>
            <p className="font-medium">Vikram Mehta, HR Director</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center text-green-600 font-bold mr-3">
                GH
              </div>
              <div>
                <h4 className="font-medium">Green Horizons</h4>
                <p className="text-sm text-muted-foreground">Sustainable Energy</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              "The customized mental health workshops have transformed our workplace culture. Our employees now have the tools to manage stress effectively."
            </p>
            <p className="font-medium">Priya Singh, CEO</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 h-10 w-10 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">
                NS
              </div>
              <div>
                <h4 className="font-medium">Northern Sparkle</h4>
                <p className="text-sm text-muted-foreground">Retail Chain</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              "The 24/7 crisis support has been invaluable for our distributed team. Our employees feel cared for regardless of where or when they work."
            </p>
            <p className="font-medium">Rajesh Kumar, Operations Manager</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-meant-600 text-white rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to support your team's mental wellbeing?</h2>
        <p className="text-meant-100 mb-8 max-w-3xl mx-auto">
          Join hundreds of forward-thinking organizations that prioritize employee mental health.
          Schedule a consultation with our corporate wellness experts today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            variant="default"
            className="bg-white text-meant-600 hover:bg-meant-50"
            onClick={() => openContactDialog()}
          >
            Schedule a Consultation
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-white border-white hover:bg-meant-700"
          >
            Download Brochure
          </Button>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Request Corporate Consultation</DialogTitle>
            <DialogDescription>
              {selectedPlan ? (
                <p>Complete the form below to inquire about our {selectedPlan}</p>
              ) : (
                <p>Complete the form below and our corporate wellness team will get in touch with you</p>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name *</label>
                <Input
                  placeholder="Enter your full name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name *</label>
                <Input
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Size</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
              >
                <option value="">Select company size</option>
                <option value="1-25">1-25 employees</option>
                <option value="26-100">26-100 employees</option>
                <option value="101-500">101-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Tell us about your organization's needs and goals"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
            
            {selectedPlan && (
              <div className="bg-muted p-3 rounded-md">
                <div className="font-medium flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Selected Plan: {selectedPlan}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleContactSubmit}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CorporatePlansContent;
