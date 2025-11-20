import React from 'react';
import { TableBody as MuiTableBody, TableRow, TableCell } from '@mui/material';
import { User } from '../types/User';

interface TableBodyProps {
  users: User[];
}

const TableBody: React.FC<TableBodyProps> = ({ users }) => {
  return (
    <MuiTableBody>
      {users.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
            Aucun utilisateur trouvé
          </TableCell>
        </TableRow>
      ) : (
        users.map(user => (
          <TableRow key={user.id} hover>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.nom}</TableCell>
            <TableCell>{user.prenom}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))
      )}
    </MuiTableBody>
  );
};

export default TableBody;
