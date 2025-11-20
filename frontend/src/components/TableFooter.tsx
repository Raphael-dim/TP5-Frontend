import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

interface TableFooterProps {
  totalUsers: number;
  displayedUsers: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
  totalUsers,
  displayedUsers,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, flexWrap: 'wrap', gap: 2 }}>
      <Typography variant="body2">
        Affichage de {displayedUsers} utilisateur(s) sur {totalUsers} au total
      </Typography>
      
      {totalPages > 1 && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            startIcon={<NavigateBefore />}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          
          <Typography variant="body2">
            Page {currentPage} sur {totalPages}
          </Typography>
          
          <Button
            variant="outlined"
            size="small"
            endIcon={<NavigateNext />}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default TableFooter;
