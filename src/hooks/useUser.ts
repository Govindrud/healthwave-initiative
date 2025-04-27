
import { useState, useCallback } from "react";
import { User } from "@/types/auth";
import { getStoredUser, setStoredUser } from "@/utils/auth-storage";
import { toast } from "sonner";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const updateUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    setStoredUser(newUser);
  }, []);

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = { ...user, ...data };
      updateUser(updatedUser);
      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile.");
      return false;
    }
  };

  return {
    user,
    updateUser,
    updateProfile,
    isAdmin: () => user?.role === 'admin',
    isProvider: () => user?.role === 'provider',
  };
};
