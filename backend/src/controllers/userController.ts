import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs' });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'utilisateur' });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      
      if (error.code === 11000) {
        res.status(409).json({ error: 'Cet email est déjà utilisé' });
      } else if (error.message.includes('requis') || error.message.includes('invalide')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur' });
      }
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(id, userData);

      if (!updatedUser) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
        return;
      }

      res.json(updatedUser);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
        return;
      }

      res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'utilisateur' });
    }
  };
}
