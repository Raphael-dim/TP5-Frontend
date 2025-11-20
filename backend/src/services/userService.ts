import { UserRepository } from '../repositories/userRepository';
import { IUser, CreateUserDTO, UpdateUserDTO } from '../types/User';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async createUser(userData: CreateUserDTO): Promise<IUser> {
    this.validateUserData(userData);
    return await this.userRepository.create(userData);
  }

  async updateUser(id: string, userData: UpdateUserDTO): Promise<IUser | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return null;
    }
    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return false;
    }
    await this.userRepository.delete(id);
    return true;
  }

  private validateUserData(userData: CreateUserDTO): void {
    if (!userData.nom || !userData.prenom || !userData.email || !userData.role) {
      throw new Error('Tous les champs sont requis');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Email invalide');
    }
  }
}
