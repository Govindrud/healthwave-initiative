
import { useState } from "react";
import { toast } from "sonner";
import { User } from "@/types/auth";
import { supabase } from "@/lib/supabase";

export const useAuthentication = (updateUser: (user: User | null) => void) => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error("Invalid email or password. Please try again.");
        return false;
      }

      if (data.user) {
        const user: User = {
          uid: data.user.id,
          email: data.user.email,
          displayName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || '',
          photoURL: data.user.user_metadata?.avatar_url || null,
          role: data.user.user_metadata?.role || 'user'
        };
        updateUser(user);
        toast.success("Login successful!");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'user'
          }
        }
      });

      if (error) {
        console.error("Registration error:", error);
        toast.error(error.message || "Failed to register. Please try again.");
        return false;
      }

      if (data.user) {
        toast.success("Registration successful! Please check your email to verify your account.");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      updateUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return {
    loading,
    login,
    register,
    logout
  };
};
