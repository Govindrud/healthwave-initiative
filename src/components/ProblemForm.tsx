
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check,
  Heart,
  Send,
  Shield,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ProblemForm = () => {
  const [problem, setProblem] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problem.trim()) {
      toast.error('Please describe your challenge before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Thank you for sharing your challenge. Our team will review it and respond shortly.');
      
      // Reset form after a delay
      setTimeout(() => {
        setProblem('');
        setUrgency('medium');
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-meant-50" id="share-challenge">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
              Personalized Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Share Your <span className="text-meant-600">Challenge</span> With Us
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              No matter what mental health challenge you're facing, we're here to help. 
              Tell us what you're going through, and our team will connect you with the right resources and support.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-meant-100 p-2 rounded-full mr-4">
                  <Shield className="text-meant-700" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Completely Confidential</h3>
                  <p className="text-gray-600">Your information is securely protected and only shared with the professionals who will assist you.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-meant-100 p-2 rounded-full mr-4">
                  <Users className="text-meant-700" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Expert Guidance</h3>
                  <p className="text-gray-600">Our team of qualified mental health professionals will review your submission and provide personalized recommendations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-meant-100 p-2 rounded-full mr-4">
                  <Heart className="text-meant-700" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Compassionate Approach</h3>
                  <p className="text-gray-600">We understand how difficult it can be to ask for help. Our approach is always non-judgmental and supportive.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Tell Us What's On Your Mind</h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="text-green-600 w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Challenge Submitted!</h4>
                  <p className="text-center text-gray-600 mb-4">
                    Thank you for sharing your challenge with us. Our team will review it and reach out to you with personalized guidance within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-2">
                      Describe what you're going through
                    </label>
                    <Textarea
                      id="problem"
                      placeholder="I've been feeling anxious about..."
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <span className="block text-sm font-medium text-gray-700 mb-3">
                      How urgent do you feel this is?
                    </span>
                    <RadioGroup 
                      value={urgency} 
                      onValueChange={setUrgency}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Not urgent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Somewhat urgent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">Very urgent</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-meant-600 hover:bg-meant-700 rounded-full py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2" size={18} />
                        Share Your Challenge
                      </span>
                    )}
                  </Button>
                  
                  <p className="mt-4 text-xs text-center text-gray-500">
                    By submitting, you agree to our <a href="/privacy" className="underline">privacy policy</a> and consent to being contacted by a mental health professional.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemForm;
