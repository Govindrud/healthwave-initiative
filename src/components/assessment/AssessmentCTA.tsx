
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AssessmentCTA = () => {
  const benefits = [
    'Get personalized mental health insights',
    'Match with qualified therapists',
    'Receive customized service recommendations',
    'Start your journey to better mental health'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-meant-700 to-meant-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Brain className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold">
                      Start Your Mental Health Journey
                    </h2>
                  </div>
                  
                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    Take our comprehensive mental health assessment to get personalized 
                    recommendations and connect with the right support for your needs.
                  </p>

                  <div className="space-y-3 mb-8">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-white/90">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/assessment">
                      <Button 
                        size="lg" 
                        className="bg-white text-meant-800 hover:bg-white/90 w-full sm:w-auto"
                      >
                        Take Free Assessment
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h3 className="text-xl font-semibold mb-4">Assessment Features</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">Scientifically validated questions</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm">10-15 minutes to complete</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm">Immediate results and recommendations</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-sm">Privacy and confidentiality assured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AssessmentCTA;
