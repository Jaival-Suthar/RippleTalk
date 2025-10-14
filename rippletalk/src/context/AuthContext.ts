import { createContext } from 'react';
import type { User } from '../../src/types/index';

// Define the Context Interface
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create and export the Context object
export const AuthContext = createContext<AuthContextType | undefined>(undefined);