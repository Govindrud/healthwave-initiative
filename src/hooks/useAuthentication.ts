
import { useState } from "react";
import { toast } from "sonner";
import { User } from "@/types/auth";
import { v4 as uuidv4 } from 'uuid';

// This is just for demo purposes - in a real app, this would be handled securely
export const ADMIN_EMAIL = "admin@meanttohelp.com";
const ADMIN_PASSWORD = "admin123"; // In a real app, never hardcode passwords

export const useAuthentication = (updateUser: (user: User | null) => void) => {
  const [loading, setLoading] = useState(false);

  const login = (email: string, password: string): boolean => {
    setLoading(true);
    
    try {
      // For demo purposes only - in a real app, authentication would be handled by a secure service
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser: User = {
          uid: uuidv4(),
          email: ADMIN_EMAIL,
          displayName: 'Admin User',
          photoURL: null,
          role: 'admin'
        };
        updateUser(adminUser);
        return true;
      } else {
        // For demo, allow any email/password combination for regular users
        if (email && password && password.length > 3) {
          const regularUser: User = {
            uid: uuidv4(),
            email,
            displayName: email.split('@')[0],
            photoURL: null,
            role: 'user'
          };
          updateUser(regularUser);
          return true;
        }
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
      // For demo purposes only - in a real app, registration would be handled by a secure service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email && password && name) {
        const newUser: User = {
          uid: uuidv4(),
          email,
          displayName: name,
          photoURL: null,
          role: 'user'
        };
        updateUser(newUser);
        toast.success("Registration successful!");
        return true;
      }
      
      toast.error("Invalid registration details");
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
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
