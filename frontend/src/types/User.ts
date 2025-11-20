export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export interface TableState {
  sortColumn: keyof User | null;
  sortDirection: 'asc' | 'desc';
  filters: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
  };
  currentPage: number;
  itemsPerPage: number;
}
