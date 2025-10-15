import { useState, type ReactNode } from 'react';
// Import the context and type from the new file
import { AuthContext, type AuthContextType } from './AuthContext'; 
import type { User } from '../../src/types/index';

// 3. Create the Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Prefix 'password' with '_' to mark it as intentionally unused
  const login: AuthContextType['login'] = (email, _password) => {
  const inferredName = email
    .split('@')[0]
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  const mockUser = { id: '1', name: inferredName, email };
  setUser(mockUser);
  localStorage.setItem('user', JSON.stringify(mockUser));
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};