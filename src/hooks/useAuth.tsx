
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: 'user' | 'admin' | 'provider'; // Added role field
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  isAdmin: () => boolean;
  isProvider: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage (for demo purposes)
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

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to your auth service
      // For demo, we'll simulate authentication
      
      // Simple validation
      if (!email || !password) {
        toast.error("Email and password are required");
        return false;
      }
      
      // Set timeout to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      // In a real app, this would verify credentials with a backend
      let role: 'user' | 'admin' | 'provider' = 'user';
      
      // For demo, set admin role for specific emails
      if (email === 'admin@example.com') {
        role = 'admin';
      } else if (email === 'provider@example.com') {
        role = 'provider';
      }
      
      const loggedInUser: User = {
        uid: `user-${Math.random().toString(36).substring(2, 11)}`,
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        role
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please check your credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to your auth service
      // For demo, we'll simulate registration
      
      // Simple validation
      if (!email || !password || !name) {
        toast.error("All fields are required");
        return false;
      }
      
      // Set timeout to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      const newUser: User = {
        uid: `user-${Math.random().toString(36).substring(2, 11)}`,
        email: email,
        displayName: name,
        photoURL: null,
        role: 'user'
      };
      
      // Store in localStorage for persistence
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
  
  const resetPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to your auth service
      // For demo, we'll simulate password reset
      
      // Simple validation
      if (!email) {
        toast.error("Email is required");
        return false;
      }
      
      // Set timeout to simulate network request
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
  
  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // In a real app, this would make an API call to update user profile
      // For demo, we'll update the local user object
      
      const updatedUser = { ...user, ...data };
      
      // Store in localStorage for persistence
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
      login,
      register,
      logout,
      resetPassword,
      updateProfile,
      isAdmin,
      isProvider
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
