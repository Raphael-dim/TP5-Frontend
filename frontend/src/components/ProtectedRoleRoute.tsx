import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../contexts/NavigationContext';

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
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      navigate('login');
      return;
    }

    // Vérifier si l'utilisateur a un des rôles requis
    if (userRole && !rolesRequis.includes(userRole)) {
      navigate('forbidden');
      return;
    }
  }, [isAuthenticated, userRole, rolesRequis, navigate]);

  // Si l'utilisateur est connecté ET a le bon rôle, afficher le composant enfant
  if (isAuthenticated && userRole && rolesRequis.includes(userRole)) {
    return <>{children}</>;
  }

  // Pendant la vérification ou redirection, ne rien afficher
  return null;
};

export default ProtectedRoleRoute;
