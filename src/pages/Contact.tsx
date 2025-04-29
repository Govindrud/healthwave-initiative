
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
                Get in <span className="text-meant-600">Touch</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
              >
                Have questions or need support? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-700 mb-8">
                  Our team is available to answer your questions and provide support through various channels.
                </p>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <div className="bg-meant-100 p-3 rounded-full mr-4">
                        <Phone size={20} className="text-meant-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Phone Support</h3>
                        <p className="text-gray-600">+1 (800) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri: 9AM - 6PM EST</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <div className="bg-meant-100 p-3 rounded-full mr-4">
                        <Mail size={20} className="text-meant-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-gray-600">support@meanttohelp.com</p>
                        <p className="text-sm text-gray-500">We respond within 24 hours</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <div className="bg-meant-100 p-3 rounded-full mr-4">
                        <MessageSquare size={20} className="text-meant-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Live Chat</h3>
                        <p className="text-gray-600">Available on our website</p>
                        <p className="text-sm text-gray-500">24/7 Support</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <div className="bg-meant-100 p-3 rounded-full mr-4">
                        <MapPin size={20} className="text-meant-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Main Office</h3>
                        <p className="text-gray-600">123 Wellness Avenue, Suite 200</p>
                        <p className="text-gray-600">San Francisco, CA 94107</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <div className="bg-meant-100 p-3 rounded-full mr-4">
                        <Clock size={20} className="text-meant-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Hours of Operation</h3>
                        <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                        <p className="text-gray-600">Saturday: 10AM - 4PM EST</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <p className="text-gray-700 mb-8">
                  Please fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Select value={formData.subject} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="services">Services Information</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-meant-600 hover:bg-meant-700" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl font-bold mb-4">Visit Our Office</h2>
                <p className="text-gray-700">
                  We're located in the heart of San Francisco
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <iframe 
                  title="MeantToHelp Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1659304050474!5m2!1sen!2s"
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-700">
                  Quick answers to common questions about our services
                </p>
              </motion.div>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2">What types of mental health services do you offer?</h3>
                  <p className="text-gray-700">
                    We offer a wide range of services including professional consultations with licensed therapists and psychiatrists, student psychologist sessions, spiritual guidance, peer support groups, corporate wellness programs, and self-help resources.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold mb-2">How do I book an appointment with a therapist?</h3>
                  <p className="text-gray-700">
                    You can book appointments through our website by visiting the Doctors page, selecting a provider, and choosing an available time slot. You'll receive a confirmation email with details about your appointment and how to join the session.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-2">Is my information confidential?</h3>
                  <p className="text-gray-700">
                    Yes, we take privacy and confidentiality very seriously. All communication with our therapists is secure and confidential, and we comply with HIPAA standards. Your personal information is encrypted and protected in accordance with our privacy policy.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold mb-2">How much do your services cost?</h3>
                  <p className="text-gray-700">
                    Our service costs vary depending on the type of support you're seeking. We offer a range of options from free resources to premium consultations. Student psychologist sessions are available at reduced rates, and we work with many insurance providers for professional consultations.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold mb-2">How can businesses partner with MeantToHelp?</h3>
                  <p className="text-gray-700">
                    We offer corporate wellness programs and partnership opportunities for businesses. Please contact our partnerships team at partnerships@meanttohelp.com or visit our Corporate Plans page for more information.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
