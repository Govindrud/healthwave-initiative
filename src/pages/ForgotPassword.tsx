
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import MainLayout from "@/components/layouts/MainLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { requestPasswordReset, ADMIN_EMAIL } = useAuth();
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

  return (
    <MainLayout title="Forgot Password">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 -mt-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Logo size="lg" variant="full" />
            <CardTitle className="text-2xl mt-4">Reset Password</CardTitle>
            <CardDescription>
              {!isSubmitted 
                ? "Enter your email to receive a password reset link" 
                : "Check your email for further instructions"}
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`Admin email (hint: ${ADMIN_EMAIL})`}
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
                <div className="text-center w-full">
                  <Link 
                    to="/admin-login" 
                    className="text-sm text-primary hover:underline inline-flex items-center"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6 text-center">
              <div className="p-4">
                <p className="mb-4">
                  If an account exists with the email <strong>{email}</strong>, a password reset link has been sent.
                </p>
                <p className="text-sm text-muted-foreground">
                  Note: For this demo, check your console logs to see the reset link
                </p>
              </div>
              <Button 
                onClick={() => navigate("/admin-login")}
                className="bg-meant-600 hover:bg-meant-700"
              >
                Return to Login
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
