
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Password reset request error:", error);
        toast.error("Failed to send password reset email. Please try again.");
        return false;
      }

      toast.success("Password reset email sent! Please check your inbox.");
      return true;
    } catch (error) {
      console.error("Password reset request error:", error);
      toast.error("Failed to send password reset email. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error("Password reset error:", error);
        toast.error("Failed to reset password. Please try again.");
        return false;
      }

      toast.success("Password updated successfully!");
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Please try again.");
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
