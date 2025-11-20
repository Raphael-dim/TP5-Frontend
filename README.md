# 📚 Gestion des Utilisateurs - Full Stack App

Application full-stack avec React, TypeScript, Node.js/Express et MongoDB suivant une architecture clean code.

## 🚀 Démarrage Rapide

```bash
./start.sh
```

**Ou manuellement :**
```bash
docker-compose up --build
```

Accédez à l'application : **http://localhost:3000**

---

## 📋 Prérequis

- **Docker** et **Docker Compose**
- Navigateur moderne (Chrome, Firefox)

## 🌐 URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:5001/api |
| **MongoDB** | localhost:27017 |

---

## 📁 Architecture

```
Frontend/
├── backend/                    # Backend Node.js/Express + MongoDB
│   ├── src/
│   │   ├── config/            # Configuration (Database)
│   │   ├── controllers/       # Controllers (UserController)
│   │   ├── models/            # Mongoose Models
│   │   ├── repositories/      # Data Access Layer
│   │   ├── routes/            # API Routes
│   │   ├── services/          # Business Logic
│   │   ├── types/             # TypeScript Types
│   │   └── server.ts          # Entry Point
│   └── Dockerfile
│
├── frontend/                   # React TypeScript App
│   ├── src/
│   │   ├── components/        # UI Components
│   │   ├── config/            # API Configuration
│   │   ├── contexts/          # React Context (Theme)
│   │   ├── hooks/             # Custom Hooks
│   │   ├── services/          # API Services
│   │   └── types/             # TypeScript Types
│   └── Dockerfile
│
├── static/                     # Vanilla JS/TS Demo
└── docker-compose.yml          # Docker Setup
```

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:5001/api`

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **GET** | `/users` | Liste tous les utilisateurs |
| **GET** | `/users/:id` | Récupère un utilisateur |
| **POST** | `/users` | Crée un utilisateur |
| **PUT** | `/users/:id` | Met à jour un utilisateur |
| **DELETE** | `/users/:id` | Supprime un utilisateur |

### Exemple

```bash
curl http://localhost:5001/api/users
```

---

## ✨ Fonctionnalités

- **Tableau interactif** avec tri, filtres et pagination
- **Thème Light/Dark** avec persistance
- **Persistance des filtres** (sessionStorage)
- **Architecture Clean Code** (Repositories, Services, Controllers)
- **API REST** complète
- **100 utilisateurs de test** générés automatiquement

---

## 🛠️ Stack Technique

**Frontend:** React 18, TypeScript, Material-UI  
**Backend:** Node.js, Express, TypeScript  
**Base de données:** MongoDB  
**Conteneurisation:** Docker & Docker Compose

---

## 🔧 Développement Local (sans Docker)

### Backend
```bash
cd backend
npm install
npm run dev    # Port 5001
```

### Frontend
```bash
cd frontend
npm install
npm start      # Port 3000
```

### MongoDB
Installez MongoDB localement ou utilisez MongoDB Atlas.

---

## 📄 Licence

MIT - Projet éducatif IMT Mines Alès
