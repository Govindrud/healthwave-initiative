
import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const ContactCard = ({ icon: Icon, title, description, action }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  action?: { text: string, onClick: () => void }
}) => (
  <div className="bg-card border rounded-xl p-6 hover-effect flex flex-col items-start">
    <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center mb-4">
      <Icon className="text-meant-600" size={24} />
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    {action && (
      <Button variant="link" className="mt-auto p-0 h-auto text-meant-600" onClick={action.onClick}>
        {action.text}
      </Button>
    )}
  </div>
);

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const copyToClipboard = (text: string, successMessage: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: successMessage,
      });
    }).catch(error => {
      console.error('Failed to copy text: ', error);
      toast({
        title: "Error copying text",
        description: "Please try again or copy manually.",
        variant: "destructive"
      });
    });
  };

  return (
    <section id="contact" className="section-container">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
          Get In Touch
        </span>
        <h2 className="font-bold mb-6 text-balance">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
            We're Here To Support You
          </span>
        </h2>
        <p className="text-muted-foreground text-balance">
          Have questions about our services or need assistance with your mental health journey? 
          Our team is here to help. Reach out through any of the channels below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <ContactCard 
          icon={Mail} 
          title="Email Us" 
          description="support@meanttohelp.com"
          action={{ 
            text: "Copy Email Address", 
            onClick: () => copyToClipboard("support@meanttohelp.com", "Email address copied to clipboard!") 
          }}
        />
        <ContactCard 
          icon={Phone} 
          title="Call Us" 
          description="+91-8329116329"
          action={{ 
            text: "Copy Phone Number", 
            onClick: () => copyToClipboard("+91-8329116329", "Phone number copied to clipboard!") 
          }}
        />
        <ContactCard 
          icon={MessageSquare} 
          title="Live Chat" 
          description="Chat with our support team in real-time"
          action={{ 
            text: "Start Chat", 
            onClick: () => toast({
              title: "Chat Initiated",
              description: "A support agent will connect with you shortly.",
            }) 
          }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <ErrorBoundary>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -z-10 top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-br from-meant-100 to-meant-50 opacity-50 blur-xl"></div>
            <div className="glass rounded-2xl p-8 overflow-hidden">
              <h3 className="text-xl font-medium mb-6">Our Location</h3>
              <div className="aspect-video w-full rounded-lg mb-6 overflow-hidden bg-accent">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0926253167197!2d73.76252347498663!3d18.48428758274636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc85d0cd699%3A0x45d6f19dd7261bb9!2sBhugaon%2C%20Pune%2C%20Maharashtra%20411042!5e0!3m2!1sen!2sin!4v1698338226587!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MeantToHelp Office Location"
                ></iframe>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-meant-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">TechD Headquarters</h4>
                  <p className="text-muted-foreground">
                    TechD, Bhugaon<br />
                    Near Chandni Chowk<br />
                    Pune, Maharashtra<br />
                    India - 411042
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </ErrorBoundary>

        <ErrorBoundary>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-medium mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Please share your questions or feedback..." 
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-meant-600 hover:bg-meant-700">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default Contact;
