
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Phone, MessageSquare, Clock, Users } from 'lucide-react';

const SurenderPage = () => {
  useEffect(() => {
    document.title = "Surender - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-meant-50 to-meant-100 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.span 
                  className="inline-block py-1 px-3 rounded-full bg-meant-200 text-meant-800 text-sm font-medium mb-5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  Emergency Mental Health Support
                </motion.span>
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Surender - Find Peace in Your Moment of Need
                </motion.h1>
                <motion.p 
                  className="text-lg text-gray-700 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  When you're overwhelmed and need immediate support, our Surender program provides compassionate assistance to help you find calm and clarity. Connect with professionals trained to guide you through difficult moments.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button size="lg" className="bg-meant-600 hover:bg-meant-700">
                    <Phone className="mr-2 h-4 w-4" /> Call Support Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-meant-600 text-meant-600">
                    <MessageSquare className="mr-2 h-4 w-4" /> Chat With a Counselor
                  </Button>
                </motion.div>
              </div>
              <div className="flex justify-center">
                <motion.img 
                  src="https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                  alt="Person meditating peacefully"
                  className="rounded-lg shadow-lg max-w-md w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="bg-red-50 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <h2 className="text-2xl font-bold text-red-600 mb-4">24/7 Emergency Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Phone className="h-10 w-10 text-red-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Crisis Helpline</p>
                    <p className="font-bold text-lg">1-800-273-TALK (8255)</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-10 w-10 text-red-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Text Crisis Line</p>
                    <p className="font-bold text-lg">Text HOME to 741741</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-10 w-10 text-red-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="font-bold text-lg">24 hours, 7 days a week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Surender Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How We Can Help You Find Peace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Immediate Crisis Support",
                  description: "Professional guidance for moments of acute distress or crisis, available anytime you need it.",
                  icon: Heart,
                  image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Guided Meditation Sessions",
                  description: "Live guided meditation to help you center yourself and find calm during difficult moments.",
                  icon: Users,
                  image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Follow-up Care Planning",
                  description: "Creating a personalized wellness plan to support you beyond the immediate crisis.",
                  icon: Clock,
                  image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
              ].map((service, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-meant-100 mr-3">
                        <service.icon className="h-6 w-6 text-meant-600" />
                      </div>
                      <h3 className="font-semibold text-xl">{service.title}</h3>
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button className="bg-meant-600 hover:bg-meant-700">
                Book a Session
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SurenderPage;
