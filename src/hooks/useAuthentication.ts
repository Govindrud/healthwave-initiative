
import { useState } from "react";
import { User } from "@/types/auth";
import { toast } from "sonner";

export const ADMIN_EMAIL = "admin@meanttohelp.com";
const ADMIN_PASSWORD = "admin123";

export const useAuthentication = (updateUser: (user: User | null) => void) => {
  const [loading, setLoading] = useState(false);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        uid: 'admin-user',
        email: ADMIN_EMAIL,
        displayName: 'Admin User',
        photoURL: null,
        role: 'admin'
      };
      
      updateUser(adminUser);
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (!email || !password || !name) {
        toast.error("All fields are required");
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        uid: `user-${Math.random().toString(36).substring(2, 11)}`,
        email: email,
        displayName: name,
        photoURL: null,
        role: 'user'
      };
      
      updateUser(newUser);
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    updateUser(null);
    toast.success("Logged out successfully");
  };

  return {
    loading,
    login,
    register,
    logout
  };
};
