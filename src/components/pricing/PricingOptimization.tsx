
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingOptimization = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Support',
      description: 'Essential mental health tools and resources',
      icon: Heart,
      monthlyPrice: 29,
      yearlyPrice: 290,
      savings: '17%',
      features: [
        'Self-guided mental health assessments',
        'Basic meditation and mindfulness tools',
        'Educational content library',
        'Community forum access',
        'Email support'
      ],
      cta: 'Start Basic Plan',
      popular: false,
      color: 'blue'
    },
    {
      id: 'professional',
      name: 'Professional Care',
      description: 'Comprehensive support with professional guidance',
      icon: Star,
      monthlyPrice: 79,
      yearlyPrice: 790,
      savings: '17%',
      features: [
        'All Basic features',
        'Monthly 1-on-1 therapy sessions',
        'Personalized treatment plans',
        'Crisis support hotline',
        'Progress tracking and analytics',
        'Priority scheduling'
      ],
      cta: 'Get Professional Care',
      popular: true,
      color: 'green'
    },
    {
      id: 'premium',
      name: 'Premium Wellness',
      description: 'Complete mental wellness ecosystem',
      icon: Zap,
      monthlyPrice: 149,
      yearlyPrice: 1490,
      savings: '17%',
      features: [
        'All Professional features',
        'Weekly therapy sessions',
        'Family therapy options',
        'Specialized treatment programs',
        'Wellness coaching',
        'Mobile app premium features',
        '24/7 chat support'
      ],
      cta: 'Go Premium',
      popular: false,
      color: 'purple'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getDisplayPrice = (plan: typeof plans[0]) => {
    const price = getPrice(plan);
    if (billingCycle === 'yearly') {
      return `₹${price}/year`;
    }
    return `₹${price}/month`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-meant-50">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-meant-800 mb-4">
            Choose Your Mental Health Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Flexible plans designed to support you at every stage of your mental wellness journey.
            Cancel anytime, upgrade or downgrade as needed.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-meant-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-meant-800 shadow-sm'
                  : 'text-meant-600 hover:text-meant-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-meant-800 shadow-sm'
                  : 'text-meant-600 hover:text-meant-800'
              }`}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                Save 17%
              </Badge>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-meant-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${plan.popular ? 'border-meant-300 shadow-lg scale-105' : 'border-meant-100'}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 bg-${plan.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className={`h-6 w-6 text-${plan.color}-600`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-meant-800">
                      {getDisplayPrice(plan)}
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-muted-foreground">
                        ₹{Math.round(plan.yearlyPrice / 12)}/month billed annually
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-meant-600 hover:bg-meant-700' 
                        : 'bg-meant-100 text-meant-800 hover:bg-meant-200'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">
            Not sure which plan is right for you?
          </p>
          <Button variant="outline" className="mr-4">
            Take Our Assessment
          </Button>
          <Button variant="outline">
            Talk to a Specialist
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingOptimization;
