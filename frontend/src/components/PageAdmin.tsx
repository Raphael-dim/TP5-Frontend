import React from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../contexts/NavigationContext';
import ThemeToggle from './ThemeToggle';

/**
 * Page Admin - Accessible uniquement aux utilisateurs avec le rôle 'admin'
 * Cette page sert d'exemple d'utilisation de ProtectedRoleRoute
 */
const PageAdmin: React.FC = () => {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('login');
  };

  const handleGoToUsers = () => {
    navigate('users');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar position="static" elevation={2} sx={{ bgcolor: 'error.main' }}>
        <Toolbar>
          <AdminPanelSettings sx={{ mr: 2 }} />
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Panneau d'Administration
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Rôle: <strong>{userRole}</strong>
          </Typography>
          <ThemeToggle />
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          🎉 Bienvenue dans l'espace administrateur ! Cette page est accessible uniquement
          aux utilisateurs avec le rôle <strong>admin</strong>.
        </Alert>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Fonctionnalités Admin
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Cette page démontre l'utilisation du composant <code>ProtectedRoleRoute</code>
            avec restriction de rôle.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Test de Protection :
            </Typography>
            <ul>
              <li>✅ Seuls les utilisateurs avec le rôle <strong>admin</strong> peuvent accéder</li>
              <li>❌ Les utilisateurs <strong>user</strong> ou <strong>guest</strong> sont redirigés vers /forbidden</li>
              <li>❌ Les utilisateurs non authentifiés sont redirigés vers /login</li>
            </ul>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoToUsers}
            >
              Retour à la liste des utilisateurs
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PageAdmin;
