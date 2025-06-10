
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Play, TrendingUp, Users, DollarSign, Brain, Target, Zap, Shield, Award, Globe, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const InvestorPitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title/Executive Summary
    {
      id: 'title',
      title: 'MeantToHelp',
      subtitle: 'Revolutionizing Mental Health Through AI-Powered Community Solutions',
      content: (
        <div className="text-center space-y-8">
          <div className="mb-8">
            <div className="text-6xl font-bold bg-gradient-to-r from-meant-600 to-meant-800 bg-clip-text text-transparent mb-4">
              MeantToHelp
            </div>
            <p className="text-xl text-muted-foreground">
              The Future of Accessible Mental Health Support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-meant-200">
              <CardContent className="pt-6 text-center">
                <Brain className="h-12 w-12 text-meant-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI-Powered Platform</h3>
                <p className="text-sm text-muted-foreground">Advanced AI for personalized mental health solutions</p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200">
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 text-meant-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Community-Driven</h3>
                <p className="text-sm text-muted-foreground">Connecting those in need with student innovators</p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200">
              <CardContent className="pt-6 text-center">
                <Target className="h-12 w-12 text-meant-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Market Ready</h3>
                <p className="text-sm text-muted-foreground">Addressing $240B global mental health market</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-meant-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Investment Opportunity</h3>
            <p className="text-muted-foreground">
              Seeking $2M Series A to scale our AI-powered mental health platform and expand market reach
            </p>
          </div>
        </div>
      )
    },

    // Slide 2: Problem Statement
    {
      id: 'problem',
      title: 'The Mental Health Crisis',
      subtitle: 'A Global Challenge Requiring Innovative Solutions',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-meant-800">Market Statistics</h3>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-600">1 in 4</div>
                  <div className="text-sm text-red-700">People affected by mental health disorders globally</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-orange-600">$240B</div>
                  <div className="text-sm text-orange-700">Global mental health market size</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-600">60%</div>
                  <div className="text-sm text-yellow-700">Don't receive adequate treatment</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-meant-800">Key Challenges</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-meant-600 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold">Accessibility</div>
                    <div className="text-sm text-muted-foreground">Limited access to mental health professionals</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-meant-600 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold">Affordability</div>
                    <div className="text-sm text-muted-foreground">High costs prevent many from seeking help</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-meant-600 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold">Stigma</div>
                    <div className="text-sm text-muted-foreground">Social barriers to seeking mental health support</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-meant-600 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold">Personalization</div>
                    <div className="text-sm text-muted-foreground">One-size-fits-all approaches are ineffective</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-meant-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-meant-800">The Opportunity</h3>
            <p className="text-muted-foreground">
              The intersection of growing mental health awareness, technological advancement, and the need for 
              accessible solutions creates a massive market opportunity for innovative platforms like MeantToHelp.
            </p>
          </div>
        </div>
      )
    },

    // Slide 3: Solution Overview
    {
      id: 'solution',
      title: 'Our Solution',
      subtitle: 'AI-Powered Mental Health Ecosystem',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground">
              MeantToHelp combines cutting-edge AI technology with human-centered design to create 
              personalized, accessible, and effective mental health solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-meant-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-8 w-8 text-meant-600" />
                <CardTitle className="text-lg">AI-Powered Personalization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms analyze user behavior, preferences, and progress to deliver 
                  personalized mental health interventions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-meant-600" />
                <CardTitle className="text-lg">Community Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connecting individuals with peer support and trained college students creating 
                  a collaborative healing environment.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 text-meant-600" />
                <CardTitle className="text-lg">Professional Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access to licensed therapists and mental health professionals for 
                  comprehensive care when needed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-8 w-8 text-meant-600" />
                <CardTitle className="text-lg">Corporate Wellness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Workplace mental health programs with certification and analytics 
                  for organizational wellness.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-8 w-8 text-meant-600" />
                <CardTitle className="text-lg">Smart Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI-driven assessments that provide insights and recommendations 
                  based on comprehensive mental health evaluations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-8 w-8 text-meant-600" />
                <CardTitle className="text-lg">24/7 Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock support through our AI assistant and crisis 
                  intervention systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },

    // Slide 4: Business Model
    {
      id: 'business-model',
      title: 'Revenue Streams',
      subtitle: 'Diversified Monetization Strategy',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-meant-800">Primary Revenue Streams</h3>
              <div className="space-y-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Subscription Services</h4>
                      <Badge className="bg-green-100 text-green-800">40%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Monthly/annual subscriptions for premium features</p>
                    <div className="text-lg font-bold text-green-700 mt-2">₹3,900 - ₹14,900/month</div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Corporate Programs</h4>
                      <Badge className="bg-blue-100 text-blue-800">35%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Enterprise wellness solutions and certifications</p>
                    <div className="text-lg font-bold text-blue-700 mt-2">₹50,000 - ₹500,000/year</div>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Professional Services</h4>
                      <Badge className="bg-purple-100 text-purple-800">25%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Therapy sessions and professional consultations</p>
                    <div className="text-lg font-bold text-purple-700 mt-2">₹2,000 - ₹5,000/session</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-meant-800">Financial Projections</h3>
              <div className="space-y-4">
                <div className="bg-meant-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-meant-800">Year 1</div>
                    <div className="text-3xl font-bold text-meant-600">₹50L</div>
                    <div className="text-sm text-muted-foreground">500 active users</div>
                  </div>
                </div>
                
                <div className="bg-meant-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-meant-800">Year 2</div>
                    <div className="text-3xl font-bold text-meant-600">₹2.5Cr</div>
                    <div className="text-sm text-muted-foreground">2,500 active users</div>
                  </div>
                </div>
                
                <div className="bg-meant-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-meant-800">Year 3</div>
                    <div className="text-3xl font-bold text-meant-600">₹10Cr</div>
                    <div className="text-sm text-muted-foreground">10,000 active users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Market Opportunity
    {
      id: 'market',
      title: 'Market Opportunity',
      subtitle: 'Massive Total Addressable Market',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-meant-200 bg-gradient-to-br from-meant-50 to-meant-100">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-meant-800">$240B</CardTitle>
                <p className="text-sm text-muted-foreground">Total Addressable Market (TAM)</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm">Global mental health software market</p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200 bg-gradient-to-br from-meant-50 to-meant-100">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-meant-800">$25B</CardTitle>
                <p className="text-sm text-muted-foreground">Serviceable Addressable Market (SAM)</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm">Digital mental health platforms</p>
              </CardContent>
            </Card>
            
            <Card className="border-meant-200 bg-gradient-to-br from-meant-50 to-meant-100">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-meant-800">₹500Cr</CardTitle>
                <p className="text-sm text-muted-foreground">Serviceable Obtainable Market (SOM)</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm">5-year revenue target in India</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-meant-800">Market Growth Drivers</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm">25% CAGR in digital mental health</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Increased mental health awareness</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">Remote work adoption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-meant-600" />
                  <span className="text-sm">AI technology advancement</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-meant-800">Competitive Advantages</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">AI-powered personalization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Community-driven innovation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">Corporate certification program</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Integrated crisis support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Technology & Innovation
    {
      id: 'technology',
      title: 'Technology Stack',
      subtitle: 'Built for Scale and Innovation',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-meant-800">AI & Machine Learning</h3>
              <div className="space-y-3">
                <Card className="border-meant-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">Natural Language Processing</h4>
                    <p className="text-sm text-muted-foreground">Advanced text analysis for sentiment and emotion detection</p>
                  </CardContent>
                </Card>
                <Card className="border-meant-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">Recommendation Engine</h4>
                    <p className="text-sm text-muted-foreground">Personalized service and content recommendations</p>
                  </CardContent>
                </Card>
                <Card className="border-meant-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">Voice Analysis</h4>
                    <p className="text-sm text-muted-foreground">Emotion detection through voice patterns</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-meant-800">Platform Architecture</h3>
              <div className="space-y-3">
                <Card className="border-meant-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">React & TypeScript Frontend</h4>
                    <p className="text-sm text-muted-foreground">Modern, responsive user interface</p>
                  </CardContent>
                </Card>
                <Card className="border-meant-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">Supabase Backend</h4>
                    <p className="text-sm text-muted-foreground">Scalable database and authentication</p>
                  </CardContent>
                </Card>
                <Card className="border-meant-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">AI Integration Layer</h4>
                    <p className="text-sm text-muted-foreground">Modular AI services architecture</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="bg-meant-50 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-meant-800">Innovation Pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Badge className="mb-2 bg-green-100 text-green-800">Q1 2025</Badge>
                <h4 className="font-semibold">Advanced Voice AI</h4>
                <p className="text-sm text-muted-foreground">Real-time emotion detection and response</p>
              </div>
              <div className="text-center">
                <Badge className="mb-2 bg-blue-100 text-blue-800">Q2 2025</Badge>
                <h4 className="font-semibold">AR/VR Integration</h4>
                <p className="text-sm text-muted-foreground">Immersive therapy experiences</p>
              </div>
              <div className="text-center">
                <Badge className="mb-2 bg-purple-100 text-purple-800">Q3 2025</Badge>
                <h4 className="font-semibold">Predictive Analytics</h4>
                <p className="text-sm text-muted-foreground">Early intervention systems</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Investment Ask
    {
      id: 'investment',
      title: 'Investment Opportunity',
      subtitle: 'Join Us in Revolutionizing Mental Health',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-meant-800 mb-2">₹2 Crore</div>
            <p className="text-lg text-muted-foreground">Series A Funding Round</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-meant-800">Fund Utilization</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Product Development</span>
                  <span className="font-bold text-blue-600">40%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Marketing & User Acquisition</span>
                  <span className="font-bold text-green-600">30%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Team Expansion</span>
                  <span className="font-bold text-purple-600">20%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Operations & Infrastructure</span>
                  <span className="font-bold text-orange-600">10%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-meant-800">Key Milestones</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-meant-600 pl-4">
                  <h4 className="font-semibold">6 Months</h4>
                  <p className="text-sm text-muted-foreground">10,000 active users, AI features launch</p>
                </div>
                <div className="border-l-4 border-meant-600 pl-4">
                  <h4 className="font-semibold">12 Months</h4>
                  <p className="text-sm text-muted-foreground">50,000 users, enterprise partnerships</p>
                </div>
                <div className="border-l-4 border-meant-600 pl-4">
                  <h4 className="font-semibold">18 Months</h4>
                  <p className="text-sm text-muted-foreground">Break-even, international expansion</p>
                </div>
                <div className="border-l-4 border-meant-600 pl-4">
                  <h4 className="font-semibold">24 Months</h4>
                  <p className="text-sm text-muted-foreground">₹10Cr ARR, Series B preparation</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-meant-600 to-meant-700 text-white rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Why Invest in MeantToHelp?</h3>
            <p className="mb-4">Join us in building the future of mental health technology</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <Rocket className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Massive Market</div>
                <div>$240B+ global opportunity</div>
              </div>
              <div>
                <Brain className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Proven Technology</div>
                <div>AI-powered platform ready to scale</div>
              </div>
              <div>
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Strong Traction</div>
                <div>Growing user base and revenue</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-meant-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-meant-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-meant-800">MeantToHelp - Investor Presentation</h1>
            <p className="text-sm text-muted-foreground">
              Slide {currentSlide + 1} of {slides.length}: {slides[currentSlide].title}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Present
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="flex justify-center py-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-meant-600' : 'bg-meant-200 hover:bg-meant-300'
            }`}
          />
        ))}
      </div>

      {/* Main Slide Content */}
      <div className="container mx-auto px-6 pb-8">
        <div className="bg-white rounded-xl shadow-lg border border-meant-200 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-8 h-full"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-meant-800 mb-2">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
              
              <div className="max-w-6xl mx-auto">
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 bg-white rounded-full shadow-lg border border-meant-200 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-sm font-medium text-meant-800">
            {currentSlide + 1} / {slides.length}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestorPitch;
