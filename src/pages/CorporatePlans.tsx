
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Shield, CheckCircle, Star } from 'lucide-react';

const CorporatePlans = () => {
  useEffect(() => {
    document.title = "Corporate Plans - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "₹299",
      period: "per employee/month",
      description: "Perfect for small teams getting started with mental health support",
      features: [
        "Basic mental health assessments",
        "24/7 chat support",
        "Monthly wellness webinars",
        "Basic analytics dashboard",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹599",
      period: "per employee/month",
      description: "Comprehensive mental health solution for growing organizations",
      features: [
        "Advanced mental health assessments",
        "1-on-1 counseling sessions",
        "Crisis intervention support",
        "Advanced analytics & reporting",
        "Custom wellness programs",
        "Priority phone support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact for pricing",
      description: "Tailored solutions for large organizations with specific needs",
      features: [
        "All Professional features",
        "Dedicated account manager",
        "Custom integrations",
        "On-site wellness programs",
        "Executive mental health coaching",
        "24/7 priority support"
      ],
      popular: false
    }
  ];

  return (
    <MainLayout title="Corporate Plans - MeantToHelp">
      <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Building className="h-6 w-6 text-meant-600" />
                <Badge className="bg-meant-100 text-meant-800">Enterprise Solutions</Badge>
              </div>
              <h1 className="text-4xl font-bold text-meant-800 mb-4">Corporate Mental Health Plans</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Comprehensive mental health solutions designed to support your workforce and boost productivity
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-meant-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Employee Wellbeing</h3>
                  <p className="text-muted-foreground">Support your team's mental health with professional counseling and resources</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-meant-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Confidential & Secure</h3>
                  <p className="text-muted-foreground">HIPAA-compliant platform ensuring complete privacy and data security</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-meant-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Measurable Results</h3>
                  <p className="text-muted-foreground">Track engagement and wellness metrics with detailed analytics</p>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Plans */}
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-meant-600 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-meant-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-meant-800">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-meant-600">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-meant-600 hover:bg-meant-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16 text-center">
              <Card className="bg-meant-50 border-meant-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-meant-800 mb-4">
                    Ready to Transform Your Workplace?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Contact our team to discuss your organization's specific needs and get a customized quote.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-meant-600 hover:bg-meant-700">
                      Schedule Demo
                    </Button>
                    <Button variant="outline" className="border-meant-600 text-meant-600 hover:bg-meant-50">
                      Contact Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CorporatePlans;
