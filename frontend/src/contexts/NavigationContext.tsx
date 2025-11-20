import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type Page = 'login' | 'users';

interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigate = () => {
  const context = React.useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigate must be used within a NavigationProvider');
  }
  return context.navigateTo;
};

export const useCurrentPage = () => {
  const context = React.useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useCurrentPage must be used within a NavigationProvider');
  }
  return context.currentPage;
};
