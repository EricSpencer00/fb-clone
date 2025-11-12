import React, { createContext, useState, useCallback } from "react";
import { User } from "@/src/types";

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setCurrentUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Hardcoded test signin for local development
      // Accepts either email or username as `email` argument
      await new Promise((r) => setTimeout(r, 500));

      const demoEmails = ["test@gracenook.local", "test"];
      const demoPassword = "password123";

      if ((demoEmails.includes(email) || email === "demo") && password === demoPassword) {
        const mockUser: User = {
          id: "u_test_1",
          email: "test@gracenook.local",
          username: "testuser",
          name: "Test User",
          bio: "I am testing GraceNook",
          profilePicture: "https://i.pravatar.cc/150?img=3",
          bannerImage: "",
          location: "Earth",
          website: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          friendCount: 5,
          followerCount: 12,
        };
        setCurrentUser(mockUser);
        return;
      }

      // Fallback: not authorized
      throw new Error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(
    async (email: string, username: string, password: string, name: string) => {
      setIsLoading(true);
      try {
        // Simple local signup stub - create a mock user and set as current user
        await new Promise((r) => setTimeout(r, 500));
        const mockUser: User = {
          id: `u_${Math.random().toString(36).slice(2, 9)}`,
          email,
          username,
          name,
          bio: "",
          profilePicture: "https://i.pravatar.cc/150?img=5",
          bannerImage: "",
          location: "",
          website: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          friendCount: 0,
          followerCount: 0,
        };
        setCurrentUser(mockUser);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        signup,
        logout,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
