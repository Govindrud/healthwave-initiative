
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Logo from "@/components/Logo";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/hooks/useAuth"; // Update import
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { requestPasswordReset, ADMIN_EMAIL } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout title="Forgot Password">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 -mt-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Logo size="lg" variant="full" />
            <CardTitle className="text-2xl mt-4">Forgot Password</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "Please check your email for reset instructions" 
                : "Enter your email to reset your password"}
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={ADMIN_EMAIL}
                      className="pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-meant-600 hover:bg-meant-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Reset Password"}
                </Button>
                <div className="text-center w-full">
                  <Link 
                    to="/admin-login" 
                    className="text-sm text-primary hover:underline"
                  >
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4 text-center">
              <div className="p-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <p className="mb-4">
                  If {email} is associated with an account, we've sent instructions to reset your password.
                </p>
                <Link to="/admin-login">
                  <Button variant="outline" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
