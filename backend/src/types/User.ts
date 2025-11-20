export interface IUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDTO {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export interface UpdateUserDTO {
  nom?: string;
  prenom?: string;
  email?: string;
  role?: string;
}
