import React from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../contexts/NavigationContext';
import { useUsers } from '../hooks/useUsers';
import Tableau from '../components/Tableau';
import ThemeToggle from '../components/ThemeToggle';

const PageUsers: React.FC = () => {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();
  const { users, loading, error, refetch } = useUsers();

  const handleLogout = () => {
    logout();
    navigate('login');
  };

  const handleGoToAdmin = () => {
    navigate('admin');
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
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Gestion des Utilisateurs
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Rôle: <strong>{userRole}</strong>
          </Typography>
          <ThemeToggle />
          {userRole === 'admin' && (
            <Button color="inherit" onClick={handleGoToAdmin} sx={{ ml: 2 }}>
              Admin
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Chargement des utilisateurs...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Button color="inherit" size="small" onClick={refetch}>
                Réessayer
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {!loading && !error && <Tableau data={users} />}
      </Container>
    </Box>
  );
};

export default PageUsers;
