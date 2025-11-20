import { apiConfig } from '../config/api';
import { User } from '../types/User';

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(apiConfig.endpoints.users, {
      ...apiConfig.requestOptions,
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }

    return await response.json();
  }

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${apiConfig.endpoints.users}/${id}`, {
      ...apiConfig.requestOptions,
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Utilisateur non trouvé');
    }

    return await response.json();
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(apiConfig.endpoints.users, {
      ...apiConfig.requestOptions,
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la création de l\'utilisateur');
    }

    return await response.json();
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await fetch(`${apiConfig.endpoints.users}/${id}`, {
      ...apiConfig.requestOptions,
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
    }

    return await response.json();
  }

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${apiConfig.endpoints.users}/${id}`, {
      ...apiConfig.requestOptions,
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'utilisateur');
    }
  }
}

export const userService = new UserService();
