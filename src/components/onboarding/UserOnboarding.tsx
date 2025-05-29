
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Heart, Brain, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  questions: {
    id: string;
    question: string;
    type: 'radio' | 'checkbox' | 'text';
    options?: string[];
  }[];
}

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Tell us about your goals",
      description: "Help us understand what you're looking to achieve",
      icon: Target,
      questions: [
        {
          id: "primary_goal",
          question: "What's your primary mental health goal?",
          type: "radio",
          options: [
            "Reduce anxiety and stress",
            "Improve mood and depression",
            "Better sleep quality",
            "Build self-confidence",
            "Manage anger or emotions",
            "General wellness and prevention"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Your current situation",
      description: "This helps us recommend the right support level",
      icon: Brain,
      questions: [
        {
          id: "support_level",
          question: "How would you describe your current mental health?",
          type: "radio",
          options: [
            "I'm doing well, just want to maintain good habits",
            "I have some challenges but manage okay",
            "I'm struggling and need regular support",
            "I'm in crisis and need immediate help"
          ]
        },
        {
          id: "previous_therapy",
          question: "Have you tried therapy or counseling before?",
          type: "radio",
          options: [
            "No, this is my first time",
            "Yes, and it was helpful",
            "Yes, but it didn't work for me",
            "I'm currently in therapy"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Personalize your experience",
      description: "Let's tailor our recommendations to your preferences",
      icon: Heart,
      questions: [
        {
          id: "preferred_methods",
          question: "Which support methods interest you most?",
          type: "checkbox",
          options: [
            "One-on-one therapy sessions",
            "Group support sessions",
            "Self-guided tools and exercises",
            "Meditation and mindfulness",
            "Educational content and resources",
            "Peer support community"
          ]
        }
      ]
    }
  ];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log('Onboarding completed:', responses);
      // Here you would typically save to user profile
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-meant-800">Welcome to MeantToHelp</h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-meant-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <currentStepData.icon className="h-8 w-8 text-meant-600" />
              </div>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentStepData.questions.map((question) => (
                  <div key={question.id}>
                    <h3 className="font-medium mb-3">{question.question}</h3>
                    
                    {question.type === 'radio' && (
                      <div className="space-y-2">
                        {question.options?.map((option) => (
                          <label key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-meant-50 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              checked={responses[question.id] === option}
                              onChange={(e) => handleResponse(question.id, e.target.value)}
                              className="text-meant-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'checkbox' && (
                      <div className="space-y-2">
                        {question.options?.map((option) => (
                          <label key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-meant-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={responses[question.id]?.includes(option) || false}
                              onChange={(e) => {
                                const current = responses[question.id] || [];
                                const updated = e.target.checked
                                  ? [...current, option]
                                  : current.filter((item: string) => item !== option);
                                handleResponse(question.id, updated);
                              }}
                              className="text-meant-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={nextStep}
          className="bg-meant-600 hover:bg-meant-700 flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserOnboarding;
