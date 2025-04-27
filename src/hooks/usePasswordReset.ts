
import { useState } from "react";
import { toast } from "sonner";

export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (!email) {
        toast.error("Email is required");
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password reset link has been sent to your email");
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send password reset email.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (!token || !newPassword) {
        toast.error("Token and password are required");
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password has been reset successfully");
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to reset password.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    requestPasswordReset,
    resetPassword
  };
};
