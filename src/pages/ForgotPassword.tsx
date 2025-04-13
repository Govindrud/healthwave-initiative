
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MainLayout from "@/components/layouts/MainLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await requestPasswordReset(email);
      if (success) {
        setIsSubmitted(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    navigate("/admin-login");
  };

  return (
    <MainLayout title="Forgot Password">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 -mt-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Logo size="lg" variant="full" />
            <CardTitle className="text-2xl mt-4">Reset Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          
          {isSubmitted ? (
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  If your email is in our system, you will receive a password reset link shortly.
                  Please check your email (including spam folder).
                </AlertDescription>
              </Alert>
              <Button onClick={goBack} variant="secondary" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
              </Button>
            </CardContent>
          ) : (
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
                      placeholder="admin@example.com"
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
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="w-full"
                >
                  Back to Login
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
