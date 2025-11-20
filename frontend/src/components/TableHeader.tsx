import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { User } from '../types/User';

interface TableHeaderProps {
  onSort: (column: keyof User) => void;
  sortColumn: keyof User | null;
  sortDirection: 'asc' | 'desc';
}

const TableHeader: React.FC<TableHeaderProps> = ({ onSort, sortColumn, sortDirection }) => {
  const columns: { key: keyof User; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
  ];

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell key={column.key}>
            <TableSortLabel
              active={sortColumn === column.key}
              direction={sortColumn === column.key ? sortDirection : 'asc'}
              onClick={() => onSort(column.key)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
