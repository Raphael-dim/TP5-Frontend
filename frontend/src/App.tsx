import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider, useCurrentPage, useNavigate } from './contexts/NavigationContext';
import { useAuth } from './contexts/AuthContext';
import PageConnexion from './components/PageConnexion';
import PageUsers from './components/PageUsers';

function AppContent() {
  const { theme } = useTheme();
  const currentPage = useCurrentPage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: '#667eea',
          },
          secondary: {
            main: '#764ba2',
          },
        },
      }),
    [theme],
  );

  // Protection des routes
  React.useEffect(() => {
    if (!isAuthenticated && currentPage === 'users') {
      navigate('login');
    }
  }, [isAuthenticated, currentPage, navigate]);

  const handleLoginSuccess = () => {
    navigate('users');
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {currentPage === 'login' && !isAuthenticated && (
        <PageConnexion onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'users' && isAuthenticated && <PageUsers />}
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
