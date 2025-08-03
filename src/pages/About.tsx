
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { motion } from 'framer-motion';
import mentalHealthTeam from '@/assets/mental-health-team.jpg';

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About Us | MeantToHelp";
    window.scrollTo(0, 0);
    console.log("About page rendered");
  }, []);

  return (
    <MainLayout title="About Us | MeantToHelp" description="Learn about our mission to support mental well-being">
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-meant-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h1>
              <p className="text-lg text-muted-foreground">
                Behind every service we provide is a commitment to genuine mental well-being.
              </p>
            </motion.div>

            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-80 md:h-96 mb-8 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={mentalHealthTeam}
                  fallbackSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Our professional mental health team in a modern, welcoming environment"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="mb-6">
                At MeantToHelp, we believe that mental well-being should be accessible to everyone. Our mission is 
                to provide tools, resources, and professional support to help individuals navigate life's challenges
                and achieve balance in their mental health journey.
              </p>
              <p className="mb-6">
                Founded in 2020, our organization brings together experts from diverse backgrounds in psychology, 
                counseling, spirituality, and technology to create a holistic approach to mental wellness.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
                <p className="mb-4">
                  We combine evidence-based psychological practices with innovative technology to make mental health 
                  support more accessible and effective. Our services range from professional therapy to self-help 
                  resources, all designed with one goal: your well-being.
                </p>
                <p>
                  What makes us different is our emphasis on personalized care. We understand that each person's 
                  mental health journey is unique, and our solutions reflect that understanding.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden h-64">
                <ImageWithFallback
                  src="/images/approach.jpg"
                  fallbackSrc="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Our personalized approach to mental well-being"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Compassion</h3>
                  <p>We approach each individual with genuine care and understanding.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Accessibility</h3>
                  <p>We strive to make mental health support available to everyone who needs it.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Innovation</h3>
                  <p>We continuously explore new ways to improve mental health services.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Integrity</h3>
                  <p>We uphold the highest ethical standards in all our practices.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Inclusivity</h3>
                  <p>We create safe spaces that welcome people of all backgrounds.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Empowerment</h3>
                  <p>We equip individuals with tools and knowledge for self-management.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
              <p className="mb-6">
                Whether you're seeking support, looking to contribute your expertise, or interested in partnering 
                with us, we welcome you to become part of our community dedicated to mental well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-meant-600 hover:bg-meant-700 text-white px-6 py-3 rounded-md font-medium">
                  Contact Us
                </a>
                <a href="/services" className="border border-meant-600 text-meant-600 hover:bg-meant-50 px-6 py-3 rounded-md font-medium">
                  Explore Our Services
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
