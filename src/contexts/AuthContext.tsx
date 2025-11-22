import React, { createContext, useState, useCallback, useEffect } from "react";
import { User } from "@/src/types";
import { loginUser, registerUser, setAuthToken, getAuthToken } from "@/src/services/api";

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

  // Restore token and user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    if (savedToken && savedUser) {
      setAuthToken(savedToken);
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await loginUser(identifier, password);
      const user: User = {
        id: result.user.id.toString(),
        email: result.user.email || identifier,
        username: result.user.username,
        name: result.user.name,
        bio: "",
        profilePicture: "",
        bannerImage: "",
        location: "",
        website: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        friendCount: 0,
        followerCount: 0,
      };
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userId', result.user.id.toString());
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
    } catch (e) {
      console.error('Login failed:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, username: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const result = await registerUser(email, username, name, password);
      const user: User = {
        id: result.user.id.toString(),
        email: result.user.email,
        username: result.user.username,
        name: result.user.name,
        bio: "",
        profilePicture: "",
        bannerImage: "",
        location: "",
        website: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        friendCount: 0,
        followerCount: 0,
      };
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userId', result.user.id.toString());
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
    } catch (e) {
      console.error('Signup failed:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('currentUser');
      setAuthToken(null);
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
