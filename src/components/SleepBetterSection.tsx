
import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Activity, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import sleepWellnessRoom from '@/assets/sleep-wellness-room.jpg';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const SleepBetterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50" id="sleep-better">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-4 bg-white rounded-xl shadow-lg">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <ImageWithFallback 
                  src={sleepWellnessRoom}
                  fallbackSrc="https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Peaceful sleep environment with comfortable bedroom setup" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-indigo-900/70 flex flex-col justify-center items-center text-white text-center p-6">
                  <Moon size={48} className="mb-4 text-indigo-200" />
                  <h3 className="text-2xl font-bold mb-2">Sleep Better</h3>
                  <p className="text-indigo-200">Track and improve your sleep quality</p>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium mb-4">Your Sleep This Week</h4>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Hours Slept</span>
                      <span className="font-medium">6.5 hrs avg</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Sleep Quality</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Consistent Schedule</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Sleep Improvement Plan</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check size={16} className="mr-2 text-green-500" />
                      <span>Bedtime routine established</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check size={16} className="mr-2 text-green-500" />
                      <span>Screen-free hour before bed</span>
                    </li>
                    <li className="flex items-center text-sm opacity-50">
                      <Clock size={16} className="mr-2" />
                      <span>Consistent wake-up time</span>
                    </li>
                    <li className="flex items-center text-sm opacity-50">
                      <Clock size={16} className="mr-2" />
                      <span>Bedroom temperature optimization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
              Sleep & Wellbeing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Improve Your Sleep, Transform Your Mental Health
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Quality sleep is essential for mental wellbeing. Our sleep program uses research-backed techniques to help you 
              develop healthier sleep patterns and track your progress over time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <Moon className="text-indigo-700" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Sleep Tracking</h3>
                  <p className="text-gray-600">Monitor your sleep patterns and quality over time</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <Activity className="text-indigo-700" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Sleep Analytics</h3>
                  <p className="text-gray-600">Personalized insights based on your sleep data</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
              <h4 className="font-medium mb-3">Progress Overview</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mental Wellbeing</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2 my-2" />
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="text-xs px-2 py-1 bg-indigo-50 rounded">Daily Mindfulness</div>
                <div className="text-xs px-2 py-1 bg-indigo-50 rounded">Work-Life Balance</div>
                <div className="text-xs px-2 py-1 bg-indigo-50 rounded">Sleep Quality</div>
                <div className="text-xs px-2 py-1 bg-indigo-50 rounded">Social Connection</div>
                <div className="text-xs px-2 py-1 bg-indigo-50 rounded">Reduce Anxiety</div>
              </div>
            </div>
            
            <Button className="rounded-full bg-indigo-700 hover:bg-indigo-800 px-8 py-6">
              Start Sleep Program
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SleepBetterSection;
