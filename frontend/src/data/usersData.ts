// Données mockées pour l'authentification
export interface AuthUser {
  username: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
}

export const usersData: AuthUser[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  },
  {
    username: 'user',
    password: 'user123',
    role: 'user',
  },
  {
    username: 'guest',
    password: 'guest123',
    role: 'guest',
  },
];
