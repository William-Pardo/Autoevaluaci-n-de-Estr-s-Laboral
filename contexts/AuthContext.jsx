import React, { createContext, useState, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../constants.js';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // sessionStorage is not defined in some environments (e.g. server-side rendering)
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

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};