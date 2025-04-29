
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Phone, Calendar, ArrowRight, Users, ShieldCheck, Pill, Smartphone, Wine, Coffee, GamepadIcon } from 'lucide-react';

const DeAddiction = () => {
  useEffect(() => {
    document.title = "De-Addiction Services - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const addictionTypes = [
    { 
      id: "alcohol", 
      title: "Alcohol Addiction", 
      icon: Wine,
      description: "Recovery support for alcohol dependency with specialized programs and therapies.",
      image: "https://images.unsplash.com/photo-1594434533760-02e0f3faace9?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    },
    { 
      id: "drugs", 
      title: "Substance Abuse", 
      icon: Pill,
      description: "Comprehensive treatment for drug dependency with medical supervision and counseling.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    },
    { 
      id: "mobile", 
      title: "Mobile Phone Addiction", 
      icon: Smartphone,
      description: "Programs to help reduce screen time dependency and establish healthier habits.",
      image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    },
    { 
      id: "caffeine", 
      title: "Caffeine Addiction", 
      icon: Coffee,
      description: "Support for reducing caffeine dependency and managing withdrawal symptoms.",
      image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    },
    { 
      id: "gaming", 
      title: "Gaming Addiction", 
      icon: GamepadIcon,
      description: "Specialized therapy for gaming addiction and related behavioral issues.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    },
  ];

  const recoverySteps = [
    {
      number: "01",
      title: "Assessment",
      description: "Comprehensive evaluation of addiction patterns, triggers, and health status.",
      color: "from-blue-50 to-blue-100"
    },
    {
      number: "02",
      title: "Personalized Plan",
      description: "Creating a customized recovery strategy tailored to your specific needs and goals.",
      color: "from-purple-50 to-purple-100"
    },
    {
      number: "03",
      title: "Treatment",
      description: "Implementing therapies, counseling, and medical support as needed for recovery.",
      color: "from-meant-50 to-meant-100"
    },
    {
      number: "04",
      title: "Ongoing Support",
      description: "Continued guidance and resources to maintain recovery and prevent relapse.",
      color: "from-green-50 to-green-100"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-meant-50 to-meant-100 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-meant-600 text-white mb-4">EVIDENCE-BASED PROGRAMS</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Break Free From Addiction
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Our comprehensive de-addiction programs offer personalized support, 
                  medical assistance, and compassionate guidance to help you reclaim 
                  control of your life from various types of addictions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-meant-600 hover:bg-meant-700">
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Assessment
                  </Button>
                  <Button size="lg" variant="outline" className="border-meant-600 text-meant-600">
                    <Phone className="mr-2 h-4 w-4" /> Call Helpline
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1607748851687-ba9a10d15f34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Recovery and healing" 
                  className="rounded-lg shadow-lg max-w-md w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Addiction Types Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Specialized De-addiction Programs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer specialized treatment for various types of addictions, each with a dedicated approach and expert team.
              </p>
            </div>

            <Tabs defaultValue="alcohol" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                {addictionTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="px-4 py-2 relative">
                    <div className="flex flex-col items-center">
                      <type.icon className="h-5 w-5 mb-1" />
                      <span className="text-sm">{type.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {addictionTypes.map((type) => (
                <TabsContent key={type.id} value={type.id} className="rounded-lg overflow-hidden">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-full bg-meant-100 mr-3">
                            <type.icon className="h-6 w-6 text-meant-600" />
                          </div>
                          <h3 className="text-2xl font-bold">{type.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{type.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <h4 className="font-semibold mb-2">Our Approach Includes:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-meant-600 mr-2">•</span>
                              <span>Personalized assessment and treatment planning</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-meant-600 mr-2">•</span>
                              <span>Individual and group therapy sessions</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-meant-600 mr-2">•</span>
                              <span>Medical support and monitoring when needed</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-meant-600 mr-2">•</span>
                              <span>Family involvement and education</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-meant-600 mr-2">•</span>
                              <span>Aftercare planning and ongoing support</span>
                            </li>
                          </ul>
                        </div>
                        
                        <Button className="bg-meant-600 hover:bg-meant-700">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="rounded-lg overflow-hidden h-80">
                        <img 
                          src={type.image} 
                          alt={type.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Recovery Steps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Recovery Journey</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We guide you through each step of the recovery process with compassion and expertise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recoverySteps.map((step, index) => (
                <Card key={index} className={`bg-gradient-to-br ${step.color} border-none`}>
                  <CardContent className="pt-6">
                    <div className="text-5xl font-bold text-meant-600 opacity-30 mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Support Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-meant-700 rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-white mb-4">24/7 Support Available</h2>
                  <p className="text-meant-100 mb-8">
                    Our dedicated team is available around the clock to provide support, 
                    answer questions, and help you or your loved ones start the journey to recovery.
                  </p>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <Phone className="h-10 w-10 text-white mr-4" />
                      <div>
                        <p className="text-white font-bold text-lg">Support Helpline</p>
                        <p className="text-meant-100">1-800-RECOVERY (732-6837)</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                    Contact Us for Help
                  </Button>
                </div>
                
                <div className="hidden lg:block">
                  <img 
                    src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Support team" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recovery Success Stories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Read about how others have overcome addiction and found a new path forward.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "The personalized approach made all the difference. For the first time, I felt truly understood and supported in my recovery journey.",
                  author: "Ananya R.",
                  addiction: "Alcohol Recovery"
                },
                {
                  quote: "I was skeptical at first, but the caring team helped me understand my phone addiction and develop healthier relationships with technology.",
                  author: "Rajiv K.",
                  addiction: "Digital Detox Program"
                },
                {
                  quote: "The community support was incredible. Being surrounded by others who understood my struggles gave me strength I didn't know I had.",
                  author: "Priya M.",
                  addiction: "Substance Recovery"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-4xl text-meant-300">"</div>
                    <p className="italic text-gray-700 mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-meant-100 flex items-center justify-center text-meant-600 font-bold mr-3">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.addiction}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DeAddiction;
