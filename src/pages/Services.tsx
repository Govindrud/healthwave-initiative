
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Users, HeartPulse, Sparkles, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  useEffect(() => {
    document.title = "Services | MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Personalized Mental Health Assessment",
      description: "A comprehensive evaluation to understand your unique mental health profile and needs.",
      features: [
        "In-depth analysis of your mental wellbeing",
        "Personalized recommendations based on your profile",
        "Follow-up consultations with mental health professionals",
        "Regular progress tracking"
      ],
      icon: <Brain className="h-10 w-10 text-meant-600" />,
      price: "$149",
      cta: "Schedule Assessment"
    },
    {
      title: "Corporate Wellness Programs",
      description: "Tailored mental health services designed specifically for workplace implementation.",
      features: [
        "Employee mental wellness workshops",
        "Stress management training for teams",
        "Anonymous support systems",
        "Wellness metric tracking dashboard"
      ],
      icon: <Users className="h-10 w-10 text-meant-600" />,
      price: "Custom pricing",
      cta: "Request Consultation"
    },
    {
      title: "Therapy Matching Service",
      description: "We'll connect you with therapists specially matched to your needs and preferences.",
      features: [
        "AI-powered therapist matching algorithm",
        "Pre-screened qualified professionals",
        "Virtual and in-person options",
        "Ongoing support and check-ins"
      ],
      icon: <HeartPulse className="h-10 w-10 text-meant-600" />,
      price: "$99/month",
      cta: "Find Your Therapist"
    },
    {
      title: "AI Mental Health Assistant",
      description: "24/7 access to our AI-powered mental health support system for daily guidance.",
      features: [
        "Real-time emotional support",
        "Personalized coping strategies",
        "Progress tracking and insights",
        "Seamless integration with other services"
      ],
      icon: <Sparkles className="h-10 w-10 text-meant-600" />,
      price: "$39/month",
      cta: "Try Free Demo"
    }
  ];

  const testimonials = [
    {
      quote: "MeantToHelp's corporate wellness program transformed our workplace culture. Our team is more resilient and productivity has increased significantly.",
      author: "Sarah J., HR Director",
      company: "Tech Innovations Inc."
    },
    {
      quote: "The therapist matching service found me the perfect match after years of trying different therapists. It's like they understood exactly what I needed.",
      author: "Michael L.",
      company: "Verified Client"
    },
    {
      quote: "As someone with a busy schedule, the AI Mental Health Assistant has been a game-changer for managing my daily stress and anxiety.",
      author: "Emma R.",
      company: "Freelance Designer"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-meant-50 to-white py-16">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
                Professional Mental Health Services
              </span>
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8 text-balance">
              Our range of services is designed to provide comprehensive mental health support 
              through a combination of professional expertise and innovative technology.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-meant-600 hover:bg-meant-700 rounded-full">
                Browse Services
              </Button>
              <Button variant="outline" className="rounded-full">
                Book a Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Services cards */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
                Our Services
              </span>
              <h2 className="text-3xl font-bold mb-4">Comprehensive Support for Your Journey</h2>
              <p className="text-muted-foreground">
                Choose from our range of services designed to meet you wherever you are in your mental health journey.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {services.map((service, index) => (
                <Card key={index} className="border-meant-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{service.icon}</div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-meant-600 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <div className="text-xl font-bold text-meant-800 mb-4">{service.price}</div>
                    <Button className="bg-meant-600 hover:bg-meant-700">
                      {service.cta}
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Don't see what you're looking for? We offer custom solutions for individuals and organizations.
              </p>
              <Button variant="outline" className="rounded-full">
                Contact Us for Custom Services
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-meant-50">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
                Success Stories
              </span>
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border-meant-100">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="italic mb-6">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-meant-700 to-meant-800 text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Take the first step toward better mental health today. Our team is ready to support you
              with personalized care and innovative solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-meant-800 hover:bg-gray-100 rounded-full">
                Schedule a Consultation
              </Button>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-meant-600 rounded-full">
                  Explore Our Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
