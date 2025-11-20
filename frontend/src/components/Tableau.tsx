import React from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Table,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { User } from '../types/User';
import { useTableState } from '../hooks/useTableState';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

interface TableauProps {
  data: User[];
}

const Tableau: React.FC<TableauProps> = ({ data }) => {
  const {
    tableState,
    filteredAndSortedData,
    paginatedData,
    totalPages,
    handleSort,
    handleFilterChange,
    resetFilters,
    handlePageChange,
    handleItemsPerPageChange,
  } = useTableState(data);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Filtres */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <TextField
            label="ID"
            size="small"
            value={tableState.filters.id}
            onChange={(e) => handleFilterChange('id', e.target.value)}
            sx={{ flex: '1 1 150px', minWidth: '120px' }}
          />
          <TextField
            label="Nom"
            size="small"
            value={tableState.filters.nom}
            onChange={(e) => handleFilterChange('nom', e.target.value)}
            sx={{ flex: '1 1 180px', minWidth: '120px' }}
          />
          <TextField
            label="Prénom"
            size="small"
            value={tableState.filters.prenom}
            onChange={(e) => handleFilterChange('prenom', e.target.value)}
            sx={{ flex: '1 1 180px', minWidth: '120px' }}
          />
          <TextField
            label="Email"
            size="small"
            value={tableState.filters.email}
            onChange={(e) => handleFilterChange('email', e.target.value)}
            sx={{ flex: '1 1 220px', minWidth: '150px' }}
          />
          <TextField
            label="Rôle"
            size="small"
            value={tableState.filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            sx={{ flex: '1 1 180px', minWidth: '120px' }}
          />
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={resetFilters}
            size="small"
            sx={{ flex: '0 0 auto' }}
          >
            Réinitialiser
          </Button>
        </Box>
        
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Éléments par page</InputLabel>
          <Select
            value={tableState.itemsPerPage}
            label="Éléments par page"
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Tableau avec scroll uniquement sur le contenu */}
      <TableContainer component={Paper} elevation={3} sx={{ flex: 1, overflow: 'auto', maxHeight: 'calc(100vh - 350px)' }}>
        <Table stickyHeader>
          <TableHeader 
            onSort={handleSort}
            sortColumn={tableState.sortColumn}
            sortDirection={tableState.sortDirection}
          />
          <TableBody users={paginatedData} />
        </Table>
      </TableContainer>

      {/* Footer avec pagination */}
      <Paper elevation={2} sx={{ mt: 2 }}>
        <TableFooter
          totalUsers={filteredAndSortedData.length}
          displayedUsers={paginatedData.length}
          currentPage={tableState.currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Paper>
    </Box>
  );
};

export default Tableau;
