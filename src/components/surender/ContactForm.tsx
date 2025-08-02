
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormData {
  name: string;
  phone: string;
  email: string;
  concerns: string;
}

interface ContactFormProps {
  stressLevel: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ stressLevel }) => {
  const getUrgencyMessage = (level: string) => {
    switch (level) {
      case 'Extreme':
        return {
          message: 'Based on your stress level, we recommend immediate professional support. Our team will prioritize your case.',
          buttonText: 'Get Immediate Help',
          bgColor: 'bg-red-50 border-red-200'
        };
      case 'High':
        return {
          message: 'Your stress levels indicate you would benefit from professional support soon. We\'re here to help.',
          buttonText: 'Schedule Support',
          bgColor: 'bg-orange-50 border-orange-200'
        };
      case 'Medium':
        return {
          message: 'Professional guidance can help you manage your stress more effectively.',
          buttonText: 'Get Support',
          bgColor: 'bg-yellow-50 border-yellow-200'
        };
      default:
        return {
          message: 'Proactive stress management can help prevent future issues.',
          buttonText: 'Learn More',
          bgColor: 'bg-green-50 border-green-200'
        };
    }
  };

  const urgencyInfo = getUrgencyMessage(stressLevel);
  return (
    <div className={`p-6 rounded-lg border ${urgencyInfo.bgColor} mt-6`}>
      <h3 className="text-lg font-semibold mb-3">Next Steps for Your Stress Level: {stressLevel}</h3>
      <p className="text-muted-foreground mb-4">{urgencyInfo.message}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="meant" 
          className="flex-1"
          onClick={() => window.location.href = '/contact'}
        >
          {urgencyInfo.buttonText}
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => window.location.href = '/crisis-helpline'}
        >
          Crisis Support
        </Button>
      </div>
      
      {stressLevel === 'Extreme' && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-sm text-red-800">
            <strong>Emergency:</strong> If you're having thoughts of self-harm, please call emergency services (911) or contact the National Suicide Prevention Lifeline at 988.
          </p>
        </div>
      )}
    </div>
  );
};
