import { useState, useCallback, useEffect } from "react";
import { User } from "@/types/auth";
import { getStoredUser, setStoredUser } from "@/utils/auth-storage";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isAdminVerified, setIsAdminVerified] = useState<boolean>(false);
  const [isProviderVerified, setIsProviderVerified] = useState<boolean>(false);
  const [roleCheckLoading, setRoleCheckLoading] = useState<boolean>(true);

  // Server-side role verification using has_role RPC function
  const verifyUserRoles = useCallback(async (userId: string) => {
    setRoleCheckLoading(true);
    try {
      // Check admin role from database using has_role function
      const { data: isAdmin, error: adminError } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });

      if (adminError) {
        console.error("Admin role check error:", adminError);
        setIsAdminVerified(false);
      } else {
        setIsAdminVerified(!!isAdmin);
      }

      // Check provider role from database using has_role function
      const { data: isProvider, error: providerError } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'provider'
      });

      if (providerError) {
        console.error("Provider role check error:", providerError);
        setIsProviderVerified(false);
      } else {
        setIsProviderVerified(!!isProvider);
      }
    } catch (error) {
      console.error("Role verification error:", error);
      setIsAdminVerified(false);
      setIsProviderVerified(false);
    } finally {
      setRoleCheckLoading(false);
    }
  }, []);

  // Verify roles when user changes
  useEffect(() => {
    if (user?.uid) {
      verifyUserRoles(user.uid);
    } else {
      setIsAdminVerified(false);
      setIsProviderVerified(false);
      setRoleCheckLoading(false);
    }
  }, [user?.uid, verifyUserRoles]);

  const updateUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    setStoredUser(newUser);
  }, []);

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update user metadata in Supabase (excluding role - roles are managed in user_roles table)
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: data.displayName,
          avatar_url: data.photoURL
        }
      });

      if (error) {
        console.error("Profile update error:", error);
        toast.error("Failed to update profile.");
        return false;
      }

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
    // Server-side verified role checks - never trust client-side data
    isAdmin: () => isAdminVerified,
    isProvider: () => isProviderVerified,
    roleCheckLoading,
  };
};
