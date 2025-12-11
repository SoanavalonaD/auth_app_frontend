import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "../features/auth/LoginScreen";
import RegisterScreen from "../features/auth/RegisterScreen";
import DashboardScreen from "../features/users/DashboardScreen";
import PrivateRoute from "./PrivateRoute";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/routes/appRoutes";

/**
 * Composant central pour la gestion de toutes les routes de l'application.
 */
const AppRoutes: React.FC = () => {
  const { isAuthInitialized, token } = useAuth();
  // Afficher un écran de chargement pendant l'initialisation (si un token est présent)

  if (!isAuthInitialized && token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white rounded-xl shadow-lg">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <p className="text-xl font-medium text-gray-700">
            Vérification de la session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Routes>
        {/* Routes Publiques */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        {/* Route racine qui redirige vers le login par défaut */}
        <Route path="/" element={<LoginScreen />} />

        {/* Routes Protégées par le PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Route>

        {/* Route 404 simple */}
        <Route
          path="*"
          element={
            <h1 className="text-4xl text-red-500">404 - Page Non Trouvée</h1>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
