import mongoose from 'mongoose';
import { UserModel } from '../models/User';

export class DatabaseConfig {
  private static instance: DatabaseConfig;

  private constructor() {}

  static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }

  async connect(): Promise<void> {
    try {
      const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users_db';
      await mongoose.connect(MONGODB_URI);
      console.log('✅ Connecté à MongoDB');
    } catch (error) {
      console.error('❌ Erreur de connexion à MongoDB:', error);
      throw error;
    }
  }

  async seedDatabase(): Promise<void> {
    try {
      const count = await UserModel.countDocuments();
      
      if (count > 0) {
        console.log('La base de données contient déjà des utilisateurs.');
        return;
      }

      const roles = ['Admin', 'Utilisateur', 'Modérateur', 'Développeur', 'Manager'];
      const noms = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy'];
      const prenoms = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Luc', 'Anne', 'Paul', 'Claire', 'Marc', 'Julie'];

      const users = [];
      for (let i = 1; i <= 100; i++) {
        const nom = noms[Math.floor(Math.random() * noms.length)];
        const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
        const role = roles[Math.floor(Math.random() * roles.length)];
        
        users.push({
          nom,
          prenom,
          email: `${prenom.toLowerCase()}.${nom.toLowerCase()}${i}@example.com`,
          role
        });
      }

      await UserModel.insertMany(users);
      console.log('✅ 100 utilisateurs ont été créés dans la base de données.');
    } catch (error) {
      console.error('Erreur lors du seed:', error);
      throw error;
    }
  }
}
