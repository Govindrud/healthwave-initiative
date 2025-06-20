
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Lightbulb, 
  Heart,
  Brain,
  Globe,
  Award,
  Zap
} from 'lucide-react';

const InvestorPitch = () => {
  const metrics = [
    { icon: Users, label: "Target Market", value: "450M+", description: "Adults facing mental health challenges globally" },
    { icon: DollarSign, label: "Market Size", value: "$5.6B", description: "Global mental health software market by 2026" },
    { icon: TrendingUp, label: "Growth Rate", value: "23.6%", description: "Annual market growth rate" },
    { icon: Target, label: "Addressable Market", value: "$240B", description: "Total addressable mental health market" }
  ];

  const solutions = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Intelligent algorithm matches users with appropriate mental health resources based on their specific needs and preferences."
    },
    {
      icon: Users,
      title: "Student Therapist Network",
      description: "Supervised psychology students provide affordable, quality mental health support under professional guidance."
    },
    {
      icon: Globe,
      title: "Scalable Platform",
      description: "Technology-first approach enables rapid scaling across multiple markets and demographics."
    },
    {
      icon: Heart,
      title: "Holistic Wellness",
      description: "Comprehensive approach including therapy, products, activities, and community support."
    }
  ];

  const traction = [
    { metric: "50,000+", label: "Users Served" },
    { metric: "95%", label: "User Satisfaction" },
    { metric: "40%", label: "Monthly Growth" },
    { metric: "₹2.5Cr", label: "Revenue Run Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Mental Health Innovation"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-xl"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              MeantToHelp
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Democratizing Mental Health Support Through Technology and Community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                <DollarSign className="mr-2 h-5 w-5" />
                Investment Opportunity
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Metrics
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">The Mental Health Crisis</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Mental Health Crisis"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="text-left">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <TrendingUp className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Rising Mental Health Issues</h3>
                      <p className="text-gray-600">1 in 4 people globally experience mental health problems, with rates increasing post-pandemic.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">High Cost Barrier</h3>
                      <p className="text-gray-600">Traditional therapy costs ₹2,000-5,000 per session, making it inaccessible to many.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Limited Access</h3>
                      <p className="text-gray-600">Shortage of mental health professionals, especially in tier-2 and tier-3 cities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8">Market Opportunity</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit">
                        <IconComponent className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-purple-600">{metric.value}</CardTitle>
                      <p className="font-semibold">{metric.label}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{metric.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8">Our Solution</h2>
            <div className="mb-12">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Technology Solution"
                className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <Card key={index} className="text-left hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{solution.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{solution.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traction */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-12">Proven Traction</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {traction.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{item.metric}</div>
                  <div className="text-lg opacity-90">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Ask */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8">Investment Opportunity</h2>
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Investment Growth"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              />
            </div>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Series A Funding Round</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">₹15Cr</div>
                    <div className="text-sm text-gray-600">Funding Target</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">15%</div>
                    <div className="text-sm text-gray-600">Equity Offered</div>
                  </div>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-green-600" />
                    <span>Scale operations to 10+ cities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>Expand therapist network to 1,000+ students</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-green-600" />
                    <span>Advanced AI matching algorithm</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-green-600" />
                    <span>International market expansion</span>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Contact for Investment Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InvestorPitch;
