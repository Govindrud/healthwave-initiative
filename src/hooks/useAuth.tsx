
import React, { createContext, useContext, ReactNode } from "react";
import { AuthContextType } from "@/types/auth";
import { useUser } from "./useUser";
import { useAuthentication, ADMIN_EMAIL } from "./useAuthentication";
import { usePasswordReset } from "./usePasswordReset";

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser, updateProfile, isAdmin, isProvider } = useUser();
  const { loading: authLoading, login, register, logout } = useAuthentication(updateUser);
  const { loading: passwordLoading, requestPasswordReset, resetPassword } = usePasswordReset();

  const loading = authLoading || passwordLoading;

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

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
