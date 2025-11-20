#!/bin/bash

echo "🚀 Démarrage de l'application..."
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker Desktop."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé."
    exit 1
fi

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose down

# Construire et démarrer les conteneurs
echo "🔨 Construction et démarrage des conteneurs..."
docker-compose up --build -d

echo ""
echo "✅ Application démarrée avec succès !"
echo ""
echo "📍 URLs disponibles :"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5001/api"
echo "   MongoDB:  localhost:27017"
echo ""
echo "📊 Voir les logs : docker-compose logs -f"
echo "🛑 Arrêter      : docker-compose down"
