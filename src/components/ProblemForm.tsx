import { useState } from "react";
import { useForm } from "react-hook-form";
import { Twitter, Linkedin, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  email: string;
  category: string;
  problem: string;
}

const ProblemForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    toast({
      title: "Thank you for sharing!",
      description: "We've received your submission and will carefully review it.",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section id="problem" className="section-container relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-meant-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-meant-200 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-4">
              Share Your Experience
            </span>
            <h2 className="font-bold mb-6 text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-meant-800 to-meant-600">
                Help Us Understand Your Mental Health Challenges
              </span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Your experience matters. By sharing the mental health challenges you face, 
              you're helping us create more effective, targeted solutions. 
              Your input directly influences our work and could help countless others 
              facing similar difficulties.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Twitter className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Share on Twitter</h3>
                  <p className="text-sm text-muted-foreground">Join the conversation with #MeantToHelp</p>
                </div>
                <Button variant="ghost" className="ml-auto">
                  <ArrowRight size={16} />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="text-blue-700" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Connect on LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">Follow our page for updates and discussions</p>
                </div>
                <Button variant="ghost" className="ml-auto">
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl font-medium mb-6">Submit Your Challenge</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? "border-red-300" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address"
                    }
                  })}
                  className={errors.email ? "border-red-300" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Challenge Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="stress">Stress Management</SelectItem>
                    <SelectItem value="sleep">Sleep Issues</SelectItem>
                    <SelectItem value="focus">Focus & Attention</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="problem">Describe Your Challenge</Label>
                <Textarea 
                  id="problem"
                  placeholder="Please share details about the mental health challenge you're facing..."
                  rows={5}
                  {...register("problem", { 
                    required: "Please describe your challenge",
                    minLength: {
                      value: 20,
                      message: "Please provide more details (at least 20 characters)"
                    }
                  })}
                  className={errors.problem ? "border-red-300" : ""}
                />
                {errors.problem && (
                  <p className="text-sm text-red-500">{errors.problem.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-meant-600 hover:bg-meant-700 text-white rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={16} className="mr-2" />
                    Submit Your Challenge
                  </span>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our Privacy Policy and Terms of Service.
                We'll never share your personal information without your consent.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemForm;
