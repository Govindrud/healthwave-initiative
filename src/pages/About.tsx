
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Globe, Users, Star, Shield } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = "About Us - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-meant-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                About <span className="text-meant-600">MeantToHelp</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-700 mb-8"
              >
                Transforming mental healthcare through accessibility, innovation, and community support
              </motion.p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-gray-700 mb-6">
                    At MeantToHelp, we're committed to breaking down barriers to mental healthcare. We believe that quality support should be accessible to all, regardless of location, financial constraints, or social stigmas.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Our platform bridges the gap between traditional therapy and modern digital solutions, offering a comprehensive range of services from professional consultations to peer support groups and self-help tools.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="flex items-start">
                      <div className="bg-meant-100 p-2 rounded-full mr-3">
                        <Heart size={20} className="text-meant-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Compassionate Care</h3>
                        <p className="text-gray-600">Empathy and understanding in every interaction</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-meant-100 p-2 rounded-full mr-3">
                        <Globe size={20} className="text-meant-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Global Access</h3>
                        <p className="text-gray-600">Breaking geographical barriers to support</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src="/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png" 
                  alt="Mental health professionals in a collaborative session" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-4"
              >
                Our Core Values
              </motion.h2>
              <p className="text-gray-700">
                These principles guide our approach to mental healthcare and shape every aspect of our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="bg-meant-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Shield className="text-meant-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Trust & Privacy</h3>
                    <p className="text-gray-600">
                      We maintain the highest standards of confidentiality and data protection, ensuring your information remains secure.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="bg-meant-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Award className="text-meant-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Quality & Expertise</h3>
                    <p className="text-gray-600">
                      We collaborate only with qualified professionals and provide evidence-based resources that meet rigorous standards.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="bg-meant-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Users className="text-meant-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Community & Support</h3>
                    <p className="text-gray-600">
                      We believe in the power of connection and provide spaces for shared experiences and mutual support.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-700">
                  The journey that led to creating MeantToHelp
                </p>
              </motion.div>

              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="md:w-1/3">
                    <div className="bg-meant-50 p-6 rounded-lg text-center h-full flex flex-col justify-center">
                      <h3 className="font-semibold mb-2">The Beginning</h3>
                      <p className="text-3xl font-bold text-meant-600">2021</p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-700">
                      MeantToHelp started as a simple idea during the global pandemic when access to mental healthcare became increasingly difficult. Our founders recognized that many people were struggling but couldn't find or afford the help they needed. What began as a small online community of volunteers quickly evolved into a vision for a comprehensive mental health platform.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="md:w-1/3 md:order-2">
                    <div className="bg-meant-50 p-6 rounded-lg text-center h-full flex flex-col justify-center">
                      <h3 className="font-semibold mb-2">Launch & Growth</h3>
                      <p className="text-3xl font-bold text-meant-600">2023</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:order-1">
                    <p className="text-gray-700">
                      After extensive research and development, we launched our platform with a core set of services focused on digital consultations and self-help resources. The response was overwhelming, confirming the significant need for accessible mental health support. This early success fueled our expansion into additional services, including spiritual guidance, peer support groups, and corporate wellness programs.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="md:w-1/3">
                    <div className="bg-meant-50 p-6 rounded-lg text-center h-full flex flex-col justify-center">
                      <h3 className="font-semibold mb-2">Today & Tomorrow</h3>
                      <p className="text-3xl font-bold text-meant-600">2025</p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-700">
                      Today, MeantToHelp serves thousands of users globally, connecting them with qualified professionals and supportive communities. We continue to innovate with AI-assisted tools, voice therapy assistants, and personalized wellness journeys. Our vision for the future includes expanding our network of partners, advancing our technological capabilities, and advocating for mental health awareness and destigmatization on a global scale.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-meant-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">What People Say</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Stories from those who have found support through our platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "The student psychologist sessions have been life-changing for me. As a college student with limited resources, I never thought I'd find quality mental health support I could afford."
                    </p>
                    <div className="flex items-center">
                      <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold text-gray-600">S</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Sarah M.</h4>
                        <p className="text-sm text-gray-600">University Student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "Implementing MeantToHelp's corporate wellness program has significantly improved our workplace culture. Employee satisfaction is up, and stress-related absences are down by 30%."
                    </p>
                    <div className="flex items-center">
                      <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold text-gray-600">R</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Robert J.</h4>
                        <p className="text-sm text-gray-600">HR Director</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "The spiritual guidance section connected me with a counselor who understood my cultural background. It's rare to find mental health services that respect and incorporate spiritual values."
                    </p>
                    <div className="flex items-center">
                      <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold text-gray-600">A</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Anita P.</h4>
                        <p className="text-sm text-gray-600">Teacher</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 bg-gradient-to-b from-white to-meant-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-lg text-gray-700 mb-8">
                Whether you're seeking support, looking to provide services, or want to partner with us, there's a place for you in our community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/services" className="bg-meant-600 hover:bg-meant-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
                  Explore Our Services
                </a>
                <a href="/partners" className="bg-white border border-meant-600 text-meant-600 hover:bg-meant-50 px-6 py-3 rounded-full font-medium transition-colors">
                  Become a Partner
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
