import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';

const PageForbidden: React.FC = () => {
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  const handleGoBack = () => {
    navigate('users');
  };

  const handleLogout = () => {
    logout();
    navigate('login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <LockOutlined
              sx={{
                fontSize: 80,
                color: 'error.main',
              }}
            />
          </Box>

          <Typography variant="h3" component="h1" gutterBottom color="error">
            403
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            Accès Refusé
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Rôle actuel : <strong>{userRole}</strong>
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoBack}
            >
              Retour
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PageForbidden;
