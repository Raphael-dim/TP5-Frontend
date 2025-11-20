import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { DatabaseConfig } from './config/database';
import userRoutes from './routes/users';

const app: Application = express();
const PORT = process.env.PORT || 5001;

// Middleware CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);

// Route de test
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'API REST - Gestion des Utilisateurs',
    database: 'MongoDB',
    endpoints: {
      users: {
        getAll: 'GET /api/users',
        getById: 'GET /api/users/:id',
        create: 'POST /api/users',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id'
      }
    }
  });
});

// Gestion des erreurs 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Initialisation de la base de données et démarrage du serveur
const startServer = async () => {
  try {
    const dbConfig = DatabaseConfig.getInstance();
    
    console.log('🔄 Connexion à MongoDB...');
    await dbConfig.connect();

    console.log('🔄 Seed de la base de données...');
    await dbConfig.seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
      console.log(`💾 Base de données: MongoDB`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();
