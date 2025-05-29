
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Brain, Heart, Users, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentResultsProps {
  results: {
    scores: Record<string, number>;
    recommendations: Array<{
      type: string;
      title: string;
      description: string;
    }>;
    completedAt: string;
  };
  onProceedToMatching: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ 
  results, 
  onProceedToMatching 
}) => {
  const { scores, recommendations } = results;

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score: number) => {
    if (score < 30) return 'Low';
    if (score < 60) return 'Moderate';
    return 'High';
  };

  const categoryIcons = {
    anxiety: Users,
    depression: Heart,
    stress: Zap,
    relationships: Users,
    general: Brain
  };

  const categoryLabels = {
    anxiety: 'Anxiety Level',
    depression: 'Depression Indicators',
    stress: 'Stress Level',
    relationships: 'Relationship Satisfaction',
    general: 'General Wellbeing'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-meant-800">Assessment Complete</h1>
        </div>
        <p className="text-muted-foreground">
          Here's your personalized mental health profile and recommendations
        </p>
      </motion.div>

      {/* Scores Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Mental Health Profile</CardTitle>
            <CardDescription>
              Based on your responses, here's how you're doing in different areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(scores).map(([category, score], index) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons] || Brain;
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-meant-600" />
                      <span className="font-medium">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </span>
                      <Badge variant="outline" className={getScoreColor(score)}>
                        {getScoreLevel(score)}
                      </Badge>
                    </div>
                    <Progress value={score} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Score: {score}/100
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recommended Services</CardTitle>
            <CardDescription>
              Based on your assessment, we recommend these services to support your mental health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border rounded-lg p-4 hover:bg-meant-50 transition-colors"
                >
                  <h4 className="font-semibold text-meant-800 mb-2">
                    {recommendation.title}
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    {recommendation.description}
                  </p>
                  <Badge>{recommendation.type}</Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-meant-50 to-meant-100 border-meant-200">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-meant-800 mb-4">
              Ready for the Next Step?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let us match you with qualified therapists who specialize in your specific needs
            </p>
            <Button
              onClick={onProceedToMatching}
              size="lg"
              className="bg-meant-600 hover:bg-meant-700"
            >
              Find My Therapist Match
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AssessmentResults;
