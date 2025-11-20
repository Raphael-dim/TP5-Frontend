import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRoleRouteProps {
  rolesRequis: Array<'admin' | 'user' | 'guest'>;
  children: React.ReactNode;
}

/**
 * Composant de route protégée qui vérifie l'authentification et les rôles
 * 
 * @param rolesRequis - Tableau des rôles autorisés (ex: ['admin', 'user'])
 * @param children - Composant enfant à afficher si l'accès est autorisé
 * 
 * Comportement :
 * - Si non authentifié → redirection vers /login
 * - Si authentifié MAIS rôle non autorisé → redirection vers /forbidden
 * - Si authentifié ET rôle autorisé → affiche le composant enfant
 */
const ProtectedRoleRoute: React.FC<ProtectedRoleRouteProps> = ({ rolesRequis, children }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Vérifier si l'utilisateur est connecté
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier si l'utilisateur a un des rôles requis
  if (userRole && !rolesRequis.includes(userRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  // Si l'utilisateur est connecté ET a le bon rôle, afficher le composant enfant
  return <>{children}</>;
};

export default ProtectedRoleRoute;
