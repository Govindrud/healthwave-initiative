
import React, { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Users, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DeAddiction = () => {
  useEffect(() => {
    document.title = "De-addiction Services | MeantToHelp";
  }, []);

  const programs = [
    {
      icon: Shield,
      title: "Outpatient Programs",
      description: "Flexible treatment options that allow you to maintain your daily responsibilities while receiving the support you need."
    },
    {
      icon: Heart,
      title: "Intensive Counseling",
      description: "One-on-one sessions with addiction specialists who provide personalized guidance through your recovery journey."
    },
    {
      icon: Users,
      title: "Group Therapy",
      description: "Connect with others facing similar challenges in a supportive environment facilitated by experienced counselors."
    }
  ];

  const addictionTypes = [
    "Substance abuse and chemical dependencies",
    "Alcohol addiction",
    "Gaming and internet addiction",
    "Gambling addiction",
    "Other behavioral addictions"
  ];

  return (
    <MainLayout title="De-addiction Services">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">De-addiction Support Services</h1>
            <p className="text-lg text-muted-foreground">
              Compassionate support for those looking to break free from addiction and reclaim their lives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              className="bg-card border border-border p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-4">Our Approach to Recovery</h2>
              <p className="mb-4 text-muted-foreground">
                Our holistic de-addiction program addresses the physical, emotional, and psychological aspects of addiction recovery. We believe in treating the whole person, not just the addiction.
              </p>
              <p className="text-muted-foreground">
                With evidence-based treatment methods and personalized care plans, we provide the support needed at every stage of the recovery journey.
              </p>
            </motion.div>
            <motion.div 
              className="bg-card border border-border p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-4">Types of Addiction We Support</h2>
              <ul className="space-y-3">
                {addictionTypes.map((type, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="bg-accent rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Recovery Programs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {programs.map((program, i) => (
                <motion.div 
                  key={i}
                  className="bg-card border border-border p-5 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <program.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-medium text-lg mb-2">{program.title}</h3>
                  <p className="text-muted-foreground text-sm">{program.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Ready to Take the First Step?</h2>
            <p className="mb-6 text-muted-foreground">
              Recovery begins with reaching out. Our compassionate team is here to guide you through the process with dignity and respect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DeAddiction;
