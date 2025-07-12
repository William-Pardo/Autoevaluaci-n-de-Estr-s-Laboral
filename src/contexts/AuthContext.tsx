import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ADMIN_PASSWORD } from '../constants';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
    }
  }, [isAuthenticated]);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
