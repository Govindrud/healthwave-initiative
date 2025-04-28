
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Target, Calendar, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoalSetting = () => {
  return (
    <section className="py-16 bg-white" id="goals">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
            Find Your Purpose
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Set Goals, <span className="text-meant-600">Track Progress</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Setting meaningful goals is essential for mental wellbeing. Our tools help you establish objectives aligned with your values and track your progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-meant-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Define Meaningful Goals</h3>
                  <p className="text-muted-foreground">
                    Our guided process helps you identify goals that align with your core values and contribute to your overall wellbeing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-meant-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create Actionable Plans</h3>
                  <p className="text-muted-foreground">
                    Break down your goals into manageable steps with realistic timelines to maintain motivation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-meant-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
                  <p className="text-muted-foreground">
                    Visualize your journey with progress tracking tools that help you stay accountable and celebrate achievements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-meant-100 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-meant-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Celebrate Milestones</h3>
                  <p className="text-muted-foreground">
                    Recognize and reward yourself for progress, building confidence and reinforcing positive behaviors.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-meant-600 hover:bg-meant-700 rounded-full">
                  <span>Start Setting Goals</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-meant-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-medium text-meant-700 mb-2">Daily Mindfulness</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-meant-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-medium text-blue-700 mb-2">Reduce Anxiety</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-none shadow-sm col-span-2">
                <CardContent className="p-6">
                  <h4 className="font-medium text-green-700 mb-2">Work-Life Balance</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold">62%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-medium text-amber-700 mb-2">Sleep Quality</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold">55%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-medium text-purple-700 mb-2">Social Connection</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GoalSetting;
