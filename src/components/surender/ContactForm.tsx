
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
import { Phone, AlertCircle, HelpCircle } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  concerns: string;
}

interface ContactFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  isOpen,
  onOpenChange,
  formData,
  onChange,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span className="hidden">Trigger</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border-meant-300 shadow-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Request Professional Help</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll reach out to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                className="bg-white border-meant-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={onChange}
                required
                className="bg-white border-meant-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                required
                className="bg-white border-meant-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="concerns">Primary Concerns</Label>
              <Input
                id="concerns"
                name="concerns"
                value={formData.concerns}
                onChange={onChange}
                placeholder="Tell us briefly about your situation"
                className="bg-white border-meant-300"
              />
            </div>
          </div>
          
          {/* Emergency helpline section */}
          <div className="bg-red-50 p-3 rounded-md mb-4 border border-red-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Emergency Helpline</h4>
                <p className="text-sm text-red-700">If you're in immediate distress, please call our 24/7 crisis line:</p>
                <a href="tel:1800-273-8255" className="flex items-center mt-2 text-red-700 font-medium">
                  <Phone className="h-4 w-4 mr-2" />
                  1800-273-8255
                </a>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-3">
            <Button type="button" variant="outline" className="flex items-center gap-2" onClick={() => window.open('/help-resources', '_blank')}>
              <HelpCircle className="h-4 w-4" /> Support Resources
            </Button>
            <Button type="submit" variant="meant">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
