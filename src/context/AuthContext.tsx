import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth";
import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY =
  import.meta.env.VITE_AUTH_STORAGE_KEY || "auth_user_default";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem(AUTH_STORAGE_KEY)
      : null;
  const initialUser: User | null = stored ? JSON.parse(stored) : null;

  const [user, setUser] = useState<User | null>(initialUser);

  const login = (email: string, password: string): boolean => {
    if (email === "indico@example.com" && password === "123456") {
      const u: User = { email };
      setUser(u);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    toast.info("Logged out successfully.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
