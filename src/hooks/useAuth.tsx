
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { AuthContextType } from "@/types/auth";
import { useUser } from "./useUser";
import { useAuthentication } from "./useAuthentication";
import { usePasswordReset } from "./usePasswordReset";
import { supabase } from "@/integrations/supabase/client";

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser, updateProfile, isAdmin, isProvider, roleCheckLoading } = useUser();
  const { loading: authLoading, login, register, logout } = useAuthentication(updateUser);
  const { loading: passwordLoading, requestPasswordReset, resetPassword } = usePasswordReset();

  const loading = authLoading || passwordLoading;

  // Check for existing session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const authUser = {
          uid: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
          photoURL: session.user.user_metadata?.avatar_url || null,
          role: session.user.user_metadata?.role || 'user'
        };
        updateUser(authUser);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const authUser = {
            uid: session.user.id,
            email: session.user.email,
            displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
            photoURL: session.user.user_metadata?.avatar_url || null,
            role: session.user.user_metadata?.role || 'user'
          };
          updateUser(authUser);
        } else {
          updateUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      roleCheckLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      resetPassword,
      requestPasswordReset,
      updateProfile,
      isAdmin,
      isProvider
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
