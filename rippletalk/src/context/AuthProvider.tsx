import { useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextType } from './AuthContext';
import type { User, LoginResponse } from '../types/index';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login: AuthContextType['login'] = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || 'https://rippletalk-8.onrender.com';
      
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user and token
      const loginData = data as LoginResponse;
      setUser(loginData.user);
      setToken(loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData.user));
      localStorage.setItem('token', loginData.token);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      logout, 
      isAuthenticated: !!user && !!token,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};