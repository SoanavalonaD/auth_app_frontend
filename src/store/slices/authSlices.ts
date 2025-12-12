import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import type { AppDispatch, RootState } from '../store';
import { setAuthTokenInterceptor } from '../../services/api';

// --- Types pour l'état ---

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// --- Types pour les Payloads (Requêtes) ---

export type UserRegisterPayload = {
  email: string;
  password: string;
}

export type UserLoginPayload = {
  email: string;
  password: string;
}

export type AuthTokenResponse = {
  access_token: string;
  token_type: string;
}


// --- État initial ---

const initialState: AuthState = {
  // Récupérer le token du localStorage au démarrage
  token: localStorage.getItem('authToken'),
  user: null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  isLoading: false,
  error: null,
};

// Initialiser l'intercepteur Axios si un token existe au démarrage
setAuthTokenInterceptor(initialState.token);


// --- Slice Redux ---

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Démarrer une opération
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Arrêter le chargement sans erreur
    stopLoading: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    // Stocker le token après connexion réussie
    setToken: (state, action: PayloadAction<AuthTokenResponse>) => {
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem('authToken', action.payload.access_token);
      setAuthTokenInterceptor(action.payload.access_token);
    },
    // Stocker les infos utilisateur
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // Déconnexion
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('authToken');
      setAuthTokenInterceptor(null);
    },
    // Gérer les erreurs
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// --- Actions asynchrones (Thunks) ---

/**
 * Thunk pour la connexion : appelle l'API, stocke le token et récupère l'utilisateur.
 */
export const login = (payload: UserLoginPayload) => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.startLoading());
  try {
    const tokenResponse = await authService.login(payload);
    dispatch(authSlice.actions.setToken(tokenResponse));

    // Après avoir stocké le token, récupérer les infos utilisateur
    const user = await authService.fetchCurrentUser();
    dispatch(authSlice.actions.setUser(user));

    // La navigation vers /dashboard sera gérée par AppRoutes.tsx
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue lors de la connexion.';
    dispatch(authSlice.actions.setError(errorMessage));
    dispatch(authSlice.actions.logout()); // Assurez-vous d'être déconnecté en cas d'échec
  }
};

/**
 * Thunk pour l'inscription : appelle l'API d'inscription.
 */
export const register = (payload: UserRegisterPayload) => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.startLoading());
  try {
    await authService.register(payload);
    // Arrêter le chargement après une inscription réussie
    dispatch(authSlice.actions.stopLoading());
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Échec de l\'inscription. Veuillez réessayer.';
    dispatch(authSlice.actions.setError(errorMessage));
    return false;
  }
};

/**
 * Thunk pour vérifier si un token stocké est toujours valide en récupérant les infos utilisateur.
 */
export const initializeAuth = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { token, user } = getState().auth;

  if (token && !user) {
    setAuthTokenInterceptor(token);
    try {
      const user = await authService.fetchCurrentUser();
      dispatch(authSlice.actions.setUser(user));
    } catch {
      // Si la récupération échoue (token expiré/invalide), déconnexion
      dispatch(authSlice.actions.logout());
    }
  }
};


export const { logout } = authSlice.actions;
export default authSlice.reducer;