import { useState, useEffect, useMemo } from 'react';
import { User, TableState } from '../types/User';

const STORAGE_KEY = 'tableState';

const getInitialState = (): TableState => {
  const savedState = sessionStorage.getItem(STORAGE_KEY);
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    sortColumn: null,
    sortDirection: 'asc',
    filters: {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      role: '',
    },
    currentPage: 1,
    itemsPerPage: 20,
  };
};

export const useTableState = (data: User[]) => {
  const [tableState, setTableState] = useState<TableState>(getInitialState);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tableState));
  }, [tableState]);

  const handleSort = (column: keyof User) => {
    setTableState((prev) => ({
      ...prev,
      sortColumn: column,
      sortDirection:
        prev.sortColumn === column && prev.sortDirection === 'asc' ? 'desc' : 'asc',
      currentPage: 1,
    }));
  };

  const handleFilterChange = (column: keyof User, value: string) => {
    setTableState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [column]: value,
      },
      currentPage: 1,
    }));
  };

  const resetFilters = () => {
    setTableState((prev) => ({
      ...prev,
      filters: {
        id: '',
        nom: '',
        prenom: '',
        email: '',
        role: '',
      },
      currentPage: 1,
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Application des filtres
    result = result.filter((user) => {
      return (
        user.id.toString().toLowerCase().includes(tableState.filters.id.toLowerCase()) &&
        user.nom.toLowerCase().includes(tableState.filters.nom.toLowerCase()) &&
        user.prenom.toLowerCase().includes(tableState.filters.prenom.toLowerCase()) &&
        user.email.toLowerCase().includes(tableState.filters.email.toLowerCase()) &&
        user.role.toLowerCase().includes(tableState.filters.role.toLowerCase())
      );
    });

    // Application du tri
    if (tableState.sortColumn) {
      result.sort((a, b) => {
        const aVal = a[tableState.sortColumn!];
        const bVal = b[tableState.sortColumn!];

        if (aVal < bVal) return tableState.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return tableState.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, tableState.filters, tableState.sortColumn, tableState.sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedData.length / tableState.itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const startIndex = (tableState.currentPage - 1) * tableState.itemsPerPage;
    const endIndex = startIndex + tableState.itemsPerPage;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, tableState.currentPage, tableState.itemsPerPage]);

  const handlePageChange = (page: number) => {
    setTableState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleItemsPerPageChange = (items: number) => {
    setTableState((prev) => ({
      ...prev,
      itemsPerPage: items,
      currentPage: 1,
    }));
  };

  return {
    tableState,
    filteredAndSortedData,
    paginatedData,
    totalPages,
    handleSort,
    handleFilterChange,
    resetFilters,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
