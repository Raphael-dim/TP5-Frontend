import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Box, CircularProgress, Alert, Button } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Tableau from './components/Tableau';
import { useUsers } from './hooks/useUsers';

function AppContent() {
  const { theme } = useTheme();
  const { users, loading, error, refetch } = useUsers();

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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Gestion des Utilisateurs
            </Typography>
            <ThemeToggle />
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {loading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Chargement des utilisateurs...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} action={
              <Button color="inherit" size="small" onClick={refetch}>
                Réessayer
              </Button>
            }>
              {error}
            </Alert>
          )}

          {!loading && !error && <Tableau data={users} />}
        </Container>
      </Box>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
