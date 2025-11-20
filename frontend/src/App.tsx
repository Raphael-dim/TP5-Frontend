import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import PageConnexion from './components/PageConnexion';
import PageUsers from './components/PageUsers';
import PageForbidden from './components/PageForbidden';
import PageAdmin from './components/PageAdmin';
import ProtectedRoleRoute from './components/ProtectedRoleRoute';

function AppContent() {
  const { theme } = useTheme();
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

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        {/* Route de connexion */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/users" replace /> : <PageConnexion />
          } 
        />

        {/* Route protégée - accessible à tous les rôles */}
        <Route
          path="/users"
          element={
            <ProtectedRoleRoute rolesRequis={['admin', 'user', 'guest']}>
              <PageUsers />
            </ProtectedRoleRoute>
          }
        />

        {/* Route protégée - accessible uniquement aux admins */}
        <Route
          path="/admin"
          element={
            <ProtectedRoleRoute rolesRequis={['admin']}>
              <PageAdmin />
            </ProtectedRoleRoute>
          }
        />

        {/* Route forbidden - 403 */}
        <Route path="/forbidden" element={<PageForbidden />} />

        {/* Route par défaut - redirige vers login ou users */}
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/users" : "/login"} replace />} 
        />

        {/* Route 404 - toutes les autres routes */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/users" : "/login"} replace />} 
        />
      </Routes>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
