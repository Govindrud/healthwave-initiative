import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: 'user' | 'admin' | 'provider';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  isAdmin: () => boolean;
  isProvider: () => boolean;
  ADMIN_EMAIL: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "admin@meanttohelp.com";
const ADMIN_PASSWORD = "admin123";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const adminUser: User = {
        uid: 'admin-user',
        email: ADMIN_EMAIL,
        displayName: 'Admin User',
        photoURL: null,
        role: 'admin'
      };
      
      localStorage.setItem('auth_user', JSON.stringify(adminUser));
      setUser(adminUser);
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
      
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      setUser(newUser);
      
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
    localStorage.removeItem('auth_user');
    setUser(null);
    toast.success("Logged out successfully");
  };

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

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = { ...user, ...data };
      
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile.");
      return false;
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isProvider = () => {
    return user?.role === 'provider';
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      resetPassword,
      requestPasswordReset,
      updateProfile,
      isAdmin,
      isProvider,
      ADMIN_EMAIL
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
