
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, DEFAULT_ADMIN, DEFAULT_STUDENT } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would check for an existing session
  useEffect(() => {
    // Simulate loading user from localStorage
    const storedUser = localStorage.getItem('questScholarUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a mock authentication - in a real app, you'd use a backend service
      // Artificial delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple credential check (for demo purposes only)
      if (email === DEFAULT_ADMIN.email && password === 'admin123') {
        setUser(DEFAULT_ADMIN);
        localStorage.setItem('questScholarUser', JSON.stringify(DEFAULT_ADMIN));
        setIsLoading(false);
        return true;
      } else if (email === DEFAULT_STUDENT.email && password === 'student123') {
        setUser(DEFAULT_STUDENT);
        localStorage.setItem('questScholarUser', JSON.stringify(DEFAULT_STUDENT));
        setIsLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('questScholarUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
