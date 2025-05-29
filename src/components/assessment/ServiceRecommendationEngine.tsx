
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Users, Zap, ArrowRight, CheckCircle, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'therapy' | 'assessment' | 'workshop' | 'support_group' | 'self_help';
  priority: 'high' | 'medium' | 'low';
  price: number;
  duration: string;
  format: 'individual' | 'group' | 'online' | 'hybrid';
  benefits: string[];
  matchScore: number;
  icon: React.ComponentType<any>;
}

const serviceRecommendations: ServiceRecommendation[] = [
  {
    id: '1',
    title: 'Cognitive Behavioral Therapy (CBT)',
    description: 'Evidence-based therapy to help change negative thought patterns and behaviors.',
    type: 'therapy',
    priority: 'high',
    price: 2500,
    duration: '50 minutes per session',
    format: 'individual',
    benefits: ['Reduce anxiety and depression', 'Develop coping strategies', 'Improve problem-solving skills'],
    matchScore: 95,
    icon: Brain
  },
  {
    id: '2',
    title: 'Mindfulness-Based Stress Reduction',
    description: 'Learn mindfulness techniques to manage stress and improve overall well-being.',
    type: 'workshop',
    priority: 'high',
    price: 1500,
    duration: '8-week program',
    format: 'group',
    benefits: ['Reduce stress levels', 'Improve focus and concentration', 'Better emotional regulation'],
    matchScore: 88,
    icon: Heart
  },
  {
    id: '3',
    title: 'Anxiety Support Group',
    description: 'Connect with others who understand your experience and share coping strategies.',
    type: 'support_group',
    priority: 'medium',
    price: 800,
    duration: '90 minutes weekly',
    format: 'group',
    benefits: ['Peer support', 'Shared experiences', 'Social connection'],
    matchScore: 82,
    icon: Users
  },
  {
    id: '4',
    title: 'Stress Management Workshop',
    description: 'Practical techniques and tools for managing daily stress and pressure.',
    type: 'workshop',
    priority: 'medium',
    price: 1200,
    duration: '4-hour workshop',
    format: 'hybrid',
    benefits: ['Stress reduction techniques', 'Time management skills', 'Work-life balance'],
    matchScore: 75,
    icon: Zap
  }
];

interface ServiceRecommendationEngineProps {
  assessmentResults: {
    scores: Record<string, number>;
    recommendations: any[];
  };
  onSelectService: (service: ServiceRecommendation) => void;
}

const ServiceRecommendationEngine: React.FC<ServiceRecommendationEngineProps> = ({
  assessmentResults,
  onSelectService
}) => {
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [assessmentResults]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI recommendation processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate match scores based on assessment results
    const scoredRecommendations = serviceRecommendations.map(service => ({
      ...service,
      matchScore: calculateServiceMatchScore(service, assessmentResults)
    })).sort((a, b) => b.matchScore - a.matchScore);
    
    setRecommendations(scoredRecommendations);
    setIsLoading(false);
  };

  const calculateServiceMatchScore = (service: ServiceRecommendation, results: any) => {
    let baseScore = service.matchScore;
    const { scores } = results;
    
    // Adjust scores based on assessment results
    if (service.type === 'therapy') {
      if (scores.anxiety > 60 || scores.depression > 60) {
        baseScore += 15;
      }
    }
    
    if (service.title.toLowerCase().includes('anxiety') && scores.anxiety > 60) {
      baseScore += 20;
    }
    
    if (service.title.toLowerCase().includes('stress') && scores.stress > 60) {
      baseScore += 15;
    }
    
    if (service.type === 'support_group' && scores.relationships < 40) {
      baseScore += 10;
    }
    
    return Math.min(100, baseScore);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectService = (service: ServiceRecommendation) => {
    setSelectedServices(prev => 
      prev.includes(service.id) 
        ? prev.filter(id => id !== service.id)
        : [...prev, service.id]
    );
    onSelectService(service);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meant-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Personalizing Your Recommendations</h3>
              <p className="text-muted-foreground">
                Analyzing your assessment results to recommend the best services...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-meant-800 mb-4">Recommended Services</h1>
        <p className="text-muted-foreground">
          Based on your assessment, here are the services that will best support your mental health journey
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-meant-50 to-meant-100 border-meant-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-meant-800">{recommendations.length}</h3>
                <p className="text-muted-foreground">Personalized Recommendations</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-meant-800">
                  {recommendations.filter(r => r.priority === 'high').length}
                </h3>
                <p className="text-muted-foreground">High Priority Services</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-meant-800">
                  {Math.round(recommendations.reduce((acc, r) => acc + r.matchScore, 0) / recommendations.length)}%
                </h3>
                <p className="text-muted-foreground">Average Match Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Recommendations */}
      <div className="space-y-4">
        {recommendations.map((service, index) => {
          const Icon = service.icon;
          const isSelected = selectedServices.includes(service.id);
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className={`border-2 transition-all hover:shadow-md ${
                isSelected ? 'border-meant-600 bg-meant-50' : 'border-meant-100'
              }`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Service Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-meant-100 rounded-lg">
                            <Icon className="h-6 w-6 text-meant-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-meant-800">
                              {service.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getPriorityColor(service.priority)}>
                                {service.priority} priority
                              </Badge>
                              <Badge variant="outline">
                                {service.type.replace('_', ' ')}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{service.matchScore}% match</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-meant-800">₹{service.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{service.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{service.duration}</span>
                          <span className="text-sm text-muted-foreground">• {service.format}</span>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Key Benefits:</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {service.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Match Score</span>
                            <span className="text-sm">{service.matchScore}%</span>
                          </div>
                          <Progress value={service.matchScore} className="w-full" />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col justify-center space-y-3 lg:w-48">
                      <Button
                        onClick={() => handleSelectService(service)}
                        className={`w-full ${
                          isSelected 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-meant-600 hover:bg-meant-700'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          <>
                            Select Service
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                      <Button variant="ghost" className="w-full">
                        Schedule Consultation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      {selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-6"
        >
          <Card className="bg-meant-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected
                  </h3>
                  <p className="text-meant-200">
                    Ready to start your personalized mental health journey
                  </p>
                </div>
                <Button size="lg" className="bg-white text-meant-800 hover:bg-meant-100">
                  Continue to Booking
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceRecommendationEngine;
