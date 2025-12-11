import { UseAppDispatch, UseAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { initializeAuth } from "../../store/slices/authSlices";
// Importation de useNavigate pour remplacer useHistory
import { useNavigate } from "react-router-dom"; 

const HookRoutes = () => {
  const dispatch = UseAppDispatch(); 
  const navigate = useNavigate(); 
  const { isAuthenticated, token } = UseAppSelector((state) => state.auth);

  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // 1. Initialise l'état d'authentification au premier chargement (vérifie le token local)
  useEffect(() => {
    const init = async () => {
      if (token) {
        await dispatch(initializeAuth());
      }
      setIsAuthInitialized(true);
    };
    init();
  }, [dispatch, token]);

  // 2. Redirige si l'état d'authentification change
  useEffect(() => {
    if (isAuthInitialized) {
      if (isAuthenticated) {
        navigate("/dashboard"); 
      } else {
        const currentPath = window.location.pathname;
        if (
          currentPath !== "/login" &&
          currentPath !== "/register"
        ) {
          navigate("/login");
        }
      }
    }
  }, [isAuthenticated, isAuthInitialized, navigate]);

  return {
    isAuthInitialized,
    token,
  };
};

export default HookRoutes;