
import { User } from "@/types/auth";

export const AUTH_STORAGE_KEY = 'auth_user';

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
  return null;
};

export const setStoredUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};
