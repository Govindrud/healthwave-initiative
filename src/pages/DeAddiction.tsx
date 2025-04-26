
import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Milestone, BadgeHelp, Heart, Shield, Users, Calendar, Clock, HandHeart, Smartphone, Wine, Pill, Coffee, Gamepad, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceBookingForm from "@/components/services/ServiceBookingForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const DeAddiction = () => {
  useEffect(() => {
    document.title = "MeantToHelp | De-addiction Services";
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    {
      title: "Mobile Phone De-addiction",
      icon: Smartphone,
      description: "Overcome smartphone addiction and digital dependency",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Alcohol De-addiction",
      icon: Wine,
      description: "Professional support for alcohol dependency recovery",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Drug De-addiction",
      icon: Pill,
      description: "Comprehensive programs for substance abuse recovery",
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Caffeine De-addiction",
      icon: Coffee,
      description: "Reduce dependency on caffeine products",
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Gaming De-addiction",
      icon: Gamepad,
      description: "Overcome gaming addiction and find balance",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Shopping De-addiction",
      icon: ShoppingBag,
      description: "Control compulsive buying and shopping habits",
      color: "bg-pink-50 text-pink-600"
    }
  ];

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-meant-50 to-white">
        <motion.div 
          className="container mx-auto px-4 py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="max-w-4xl mx-auto space-y-8"
            variants={fadeInUp}
          >
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 text-meant-800"
                variants={fadeInUp}
              >
                Your Journey to Recovery Starts Here
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                Our specialized de-addiction services provide comprehensive support with a focus on lasting recovery and holistic healing.
              </motion.p>
            </div>

            <motion.div 
              className="grid gap-6 md:grid-cols-2"
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recovery Programs</CardTitle>
                  <CardDescription>Tailored treatment plans for your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Shield className="h-5 w-5 text-meant-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Personalized Care</h3>
                        <p className="text-sm text-muted-foreground">Treatment plans customized to your specific needs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-meant-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Flexible Programs</h3>
                        <p className="text-sm text-muted-foreground">Choose from various program durations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Users className="h-5 w-5 text-meant-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Group Support</h3>
                        <p className="text-sm text-muted-foreground">Access to supportive community and group therapy</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expert Support</CardTitle>
                  <CardDescription>Professional guidance at every step</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="consult">
                    <TabsList className="mb-4">
                      <TabsTrigger value="consult">Consultation</TabsTrigger>
                      <TabsTrigger value="book">Book Session</TabsTrigger>
                    </TabsList>
                    <TabsContent value="consult">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Schedule a confidential consultation with our addiction specialists to discuss your needs and create a recovery plan.
                        </p>
                        <Button className="w-full" variant="meant">
                          Schedule Free Consultation
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="book">
                      <ServiceBookingForm
                        serviceTitle="De-addiction Program"
                        serviceType="de_addiction"
                        servicePrice={2500}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="mt-12"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-2xl font-semibold mb-6 text-center"
                variants={fadeInUp}
              >
                Our De-addiction Services
              </motion.h2>
              
              <motion.div 
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
              >
                {services.map((service, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mb-4`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                    <Button variant="link" className="mt-3 p-0 h-auto text-meant-600">
                      Learn more
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="mt-16 text-center"
              variants={fadeInUp}
            >
              <div className="inline-block p-4 rounded-lg bg-meant-50 mb-8">
                <HandHeart className="h-8 w-8 text-meant-600 mx-auto" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">24/7 Support Available</h2>
              <p className="text-muted-foreground mb-6">
                Our support line is always open. Reach out anytime for immediate assistance.
              </p>
              <motion.div 
                className="text-xl font-bold text-meant-600"
                whileHover={{ scale: 1.05 }}
              >
                +91 800-123-4567
              </motion.div>
            </motion.div>

            <motion.div 
              className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Recovery Process</h2>
              <div className="grid md:grid-cols-4 gap-4 relative">
                {["Assessment", "Personalized Plan", "Treatment", "Aftercare"].map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center mx-auto mb-4 z-10 relative">
                      <span className="text-meant-600 font-bold">{index + 1}</span>
                    </div>
                    <h3 className="font-medium text-center mb-2">{step}</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      {index === 0 && "Comprehensive evaluation of your specific situation"}
                      {index === 1 && "Custom recovery plan designed for your needs"}
                      {index === 2 && "Expert-guided therapy and treatment sessions"}
                      {index === 3 && "Ongoing support to maintain long-term recovery"}
                    </p>
                  </motion.div>
                ))}
                <div className="absolute top-6 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 hidden md:block"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default DeAddiction;
