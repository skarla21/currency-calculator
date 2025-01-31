import { createContext } from "react";

interface User {
  _id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null; // store user info in the shape of response
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: {
    email: string;
    username: string;
    password: string;
  }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
