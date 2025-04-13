
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MainLayout from "@/components/layouts/MainLayout";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (token) {
        const success = await resetPassword(token, password);
        if (success) {
          setIsSubmitted(true);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToLogin = () => {
    navigate("/admin-login");
  };

  return (
    <MainLayout title="Reset Password">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 -mt-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Logo size="lg" variant="full" />
            <CardTitle className="text-2xl mt-4">Reset Password</CardTitle>
            <CardDescription>
              Create a new password for your account
            </CardDescription>
          </CardHeader>
          
          {isSubmitted ? (
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Your password has been reset successfully. You can now log in with your new password.
                </AlertDescription>
              </Alert>
              <Button onClick={goToLogin} className="w-full bg-meant-600 hover:bg-meant-700">
                Go to Login
              </Button>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-meant-600 hover:bg-meant-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
