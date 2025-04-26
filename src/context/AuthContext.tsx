
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  ADMIN_EMAIL: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default values - in a real app, these would be stored securely
const DEFAULT_ADMIN_PASSWORD = "admin123";
export const ADMIN_EMAIL = "admin@example.com";

// Mock storage for reset tokens - in a real app, this would be in a database
const resetTokens: {[key: string]: {email: string, timestamp: number}} = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>(
    localStorage.getItem("admin_password") || DEFAULT_ADMIN_PASSWORD
  );

  useEffect(() => {
    // Check if user was previously authenticated
    const authStatus = localStorage.getItem("admin_auth");
    const guestId = localStorage.getItem("guestId");
    const userEmail = localStorage.getItem("user_email");
    
    if (authStatus === "true" || guestId || userEmail) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    // For demo purposes, any password is accepted for admin login
    if (password && password.length > 0) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      return true;
    } else {
      toast.error("Please enter a password");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("guestId");
    localStorage.removeItem("guestIp");
    localStorage.removeItem("user_email");
    toast.info("Logged out successfully");
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    // In a real app, this would send an email with a reset link
    if (email !== ADMIN_EMAIL && !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    // Generate a token (in a real app, this would be more secure)
    const token = Math.random().toString(36).substring(2, 15);
    
    // Store the token with an expiration time (24 hours)
    resetTokens[token] = {
      email,
      timestamp: Date.now() + 24 * 60 * 60 * 1000,
    };
    
    // Mock sending an email - in a real app, you'd use a service like SendGrid, Mailgun, etc.
    console.log(`Password reset link: ${window.location.origin}/reset-password/${token}`);
    
    toast.success("Password reset link sent to your email");
    return true;
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    // Verify token exists and is not expired
    const resetData = resetTokens[token];
    if (!resetData || resetData.timestamp < Date.now()) {
      toast.error("Invalid or expired reset link");
      return false;
    }
    
    // Update the password
    setAdminPassword(newPassword);
    // Persist the password in localStorage (for demo purposes only)
    localStorage.setItem("admin_password", newPassword);
    
    // Clear the used token
    delete resetTokens[token];
    
    toast.success("Password reset successful");
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, requestPasswordReset, resetPassword, ADMIN_EMAIL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
