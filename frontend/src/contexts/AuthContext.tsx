import React, { createContext, useContext, useState } from 'react';
import { usersData } from '../data/usersData';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'admin' | 'user' | 'guest' | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest' | null>(null);

  const login = (username: string, password: string): boolean => {
    // Vérifier les identifiants dans usersData
    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
