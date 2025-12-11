import { useHistory } from "react-router-dom";
import { UseAppDispatch, UseAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { initializeAuth } from "../../store/slices/authSlices";

const appRoutes = () => {
  const dispatch = UseAppDispatch();
  const history = useHistory();
  const { isAuthenticated, token } = UseAppSelector((state) => state.auth);

  // État local pour indiquer si l'initialisation (vérification du token) est terminée
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // 1. Initialise l'état d'authentification au premier chargement (vérifie le token local)
  useEffect(() => {
    const init = async () => {
      // Si un token est présent dans localStorage, on tente de fetcher l'utilisateur
      if (token) {
        await dispatch(initializeAuth());
      }
      setIsAuthInitialized(true);
    };
    init();
  }, [dispatch, token]);

  // 2. Redirige si l'état d'authentification change
  useEffect(() => {
    // Naviguer uniquement après que l'initialisation soit faite
    if (isAuthInitialized) {
      if (isAuthenticated) {
        history.push("/dashboard");
      } else {
        // S'assurer qu'on est sur une route publique si déconnecté
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          history.push("/login");
        }
      }
    }
  }, [isAuthenticated, isAuthInitialized, history]);

  return {
    isAuthInitialized,
    token,
  };
};

export default appRoutes;
