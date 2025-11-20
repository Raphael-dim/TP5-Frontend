import mongoose from 'mongoose';

// Schéma Mongoose pour les utilisateurs
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const UserModel = mongoose.model('User', userSchema);

// Connexion à MongoDB
export const connectDatabase = async (): Promise<void> => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users_db';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    throw error;
  }
};

// Générer des utilisateurs de test
export const seedDatabase = async (): Promise<void> => {
  try {
    const count = await UserModel.countDocuments();
    
    if (count > 0) {
      console.log('La base de données contient déjà des utilisateurs.');
      return;
    }

    // Générer 100 utilisateurs
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
};

// Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  return await UserModel.find().sort({ _id: 1 });
};

// Récupérer un utilisateur par ID
export const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

// Créer un nouvel utilisateur
export const createUser = async (userData: { nom: string; prenom: string; email: string; role: string }) => {
  const user = new UserModel(userData);
  return await user.save();
};

// Mettre à jour un utilisateur
export const updateUser = async (id: string, userData: Partial<{ nom: string; prenom: string; email: string; role: string }>) => {
  return await UserModel.findByIdAndUpdate(id, userData, { new: true });
};

// Supprimer un utilisateur
export const deleteUser = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};
