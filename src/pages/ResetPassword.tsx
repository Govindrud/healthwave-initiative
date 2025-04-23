
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, ArrowLeft, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";
import MainLayout from "@/components/layouts/MainLayout";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const validateToken = () => {
    if (!token) {
      setError("Invalid or missing reset token");
      return false;
    }
    return true;
  };

  useEffect(() => {
    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (!validateToken() || !token) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await resetPassword(token, newPassword);
      if (success) {
        setIsSuccess(true);
      } else {
        setError("Failed to reset password. Token may be invalid or expired.");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout title="Reset Password">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 -mt-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Logo size="lg" variant="full" />
            <CardTitle className="text-2xl mt-4">Reset Password</CardTitle>
            <CardDescription>
              {!isSuccess ? "Create a new password for your account" : "Your password has been reset successfully"}
            </CardDescription>
          </CardHeader>
          
          {error && (
            <CardContent className="pt-0">
              <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            </CardContent>
          )}
          
          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
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
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-meant-600 hover:bg-meant-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
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
            <CardContent className="space-y-6 text-center p-6">
              <p className="mb-4">Your password has been successfully reset.</p>
              <Button 
                onClick={() => navigate("/admin-login")}
                className="bg-meant-600 hover:bg-meant-700"
              >
                Login with New Password
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
