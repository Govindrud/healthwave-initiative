
import React from "react";
import { Brain, Heart, HelpingHand, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpInfoProps {
  onOpenForm: () => void;
}

export const HelpInfo: React.FC<HelpInfoProps> = ({ onOpenForm }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">How We Help You Surrender</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Brain className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Professional Psychological Support</p>
                <p className="text-muted-foreground text-sm">Our team of specialists will provide expert guidance tailored to your needs.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Heart className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Compassionate Care</p>
                <p className="text-muted-foreground text-sm">We create a safe, judgment-free space for your healing journey.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <HelpingHand className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Rehabilitation Programs</p>
                <p className="text-muted-foreground text-sm">Structured programs designed to help you regain control of your life.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone className="h-6 w-6 text-meant-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">24/7 Support</p>
                <p className="text-muted-foreground text-sm">We're always here when you need someone to talk to.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <Button variant="meant" size="lg" className="w-full" onClick={onOpenForm}>
            I'm Ready to Surrender
          </Button>
        </div>
      </div>
    </div>
  );
};
