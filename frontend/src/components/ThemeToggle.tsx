import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}>
      <IconButton 
        onClick={toggleTheme}
        color="inherit"
        sx={{ ml: 2 }}
      >
        {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
