"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidUser(data: any): data is User {
  if (!data || typeof data !== "object") return false;
  if (typeof data.name !== "string" || data.name.length > 100) return false;
  if (typeof data.email !== "string" || data.email.length > 255) return false;
  if (data.avatar !== undefined) {
    if (typeof data.avatar !== "string" || data.avatar.length > 2048) return false;
    try {
      new URL(data.avatar);
    } catch {
      return false;
    }
  }
  return true;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider for demo login functionality.
 * Persists user session to localStorage with SSR-safe hydration.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isValidUser(parsed)) {
          setUser(parsed);
        } else {
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = useCallback((email: string, _password: string) => {
    const name = email.split("@")[0];
    const newUser: User = {
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
