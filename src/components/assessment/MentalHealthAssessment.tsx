
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Brain, Heart, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'scale' | 'text';
  options?: string[];
  category: 'anxiety' | 'depression' | 'stress' | 'relationships' | 'general';
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: '1',
    question: 'How would you describe your current mental health?',
    type: 'multiple_choice',
    options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
    category: 'general'
  },
  {
    id: '2',
    question: 'Over the past two weeks, how often have you felt down, depressed, or hopeless?',
    type: 'scale',
    category: 'depression'
  },
  {
    id: '3',
    question: 'How often do you feel nervous, anxious, or on edge?',
    type: 'scale',
    category: 'anxiety'
  },
  {
    id: '4',
    question: 'What is your primary reason for seeking mental health support?',
    type: 'text',
    category: 'general'
  },
  {
    id: '5',
    question: 'How satisfied are you with your current relationships?',
    type: 'scale',
    category: 'relationships'
  },
  {
    id: '6',
    question: 'How would you rate your current stress level?',
    type: 'scale',
    category: 'stress'
  }
];

const scaleOptions = [
  'Not at all',
  'Several days',
  'More than half the days',
  'Nearly every day'
];

interface MentalHealthAssessmentProps {
  onComplete: (results: Record<string, any>) => void;
}

const MentalHealthAssessment: React.FC<MentalHealthAssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate assessment scores
    const results = {
      answers,
      scores: calculateScores(answers),
      completedAt: new Date().toISOString(),
      recommendations: generateRecommendations(answers)
    };

    setTimeout(() => {
      onComplete(results);
      setIsSubmitting(false);
    }, 1500);
  };

  const calculateScores = (answers: Record<string, string>) => {
    // Simple scoring algorithm - in real implementation this would be more sophisticated
    const categories = ['anxiety', 'depression', 'stress', 'relationships', 'general'];
    const scores: Record<string, number> = {};

    categories.forEach(category => {
      const categoryQuestions = assessmentQuestions.filter(q => q.category === category);
      let totalScore = 0;
      let questionCount = 0;

      categoryQuestions.forEach(q => {
        const answer = answers[q.id];
        if (answer) {
          if (q.type === 'scale') {
            const scaleIndex = scaleOptions.indexOf(answer);
            totalScore += scaleIndex >= 0 ? scaleIndex : 0;
          } else if (q.type === 'multiple_choice' && q.options) {
            const optionIndex = q.options.indexOf(answer);
            totalScore += optionIndex >= 0 ? (q.options.length - optionIndex - 1) : 0;
          }
          questionCount++;
        }
      });

      scores[category] = questionCount > 0 ? Math.round((totalScore / (questionCount * 3)) * 100) : 0;
    });

    return scores;
  };

  const generateRecommendations = (answers: Record<string, string>) => {
    // Generate personalized recommendations based on answers
    const recommendations = [];
    
    // Check for high anxiety indicators
    if (answers['3'] === 'Nearly every day' || answers['3'] === 'More than half the days') {
      recommendations.push({
        type: 'service',
        title: 'Anxiety Management Therapy',
        description: 'Specialized therapy sessions to help manage anxiety symptoms'
      });
    }

    // Check for depression indicators
    if (answers['2'] === 'Nearly every day' || answers['2'] === 'More than half the days') {
      recommendations.push({
        type: 'service',
        title: 'Depression Support Therapy',
        description: 'Professional support for managing depression symptoms'
      });
    }

    // Default recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'service',
        title: 'General Mental Health Assessment',
        description: 'Comprehensive evaluation with a mental health professional'
      });
    }

    return recommendations;
  };

  const currentAnswer = answers[question.id] || '';
  const canProceed = currentAnswer.trim() !== '';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-meant-200">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-meant-600" />
            <CardTitle>Mental Health Assessment</CardTitle>
          </div>
          <CardDescription>
            This assessment helps us understand your mental health needs and recommend the best support options.
          </CardDescription>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {assessmentQuestions.length}
          </p>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-meant-800">
                  {question.question}
                </h3>

                {question.type === 'multiple_choice' && question.options && (
                  <RadioGroup
                    value={currentAnswer}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                  >
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === 'scale' && (
                  <RadioGroup
                    value={currentAnswer}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                  >
                    {scaleOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`scale-${index}`} />
                        <Label htmlFor={`scale-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === 'text' && (
                  <Textarea
                    placeholder="Please share your thoughts..."
                    value={currentAnswer}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="min-h-24"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="bg-meant-600 hover:bg-meant-700"
            >
              {isSubmitting ? (
                'Processing...'
              ) : currentQuestion === assessmentQuestions.length - 1 ? (
                'Complete Assessment'
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthAssessment;
