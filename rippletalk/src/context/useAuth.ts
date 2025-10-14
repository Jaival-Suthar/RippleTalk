import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Adjust path as necessary

// Custom hook to use the authentication context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};