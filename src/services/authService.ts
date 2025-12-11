import { api } from './api';
import type { UserLoginPayload, UserRegisterPayload, AuthTokenResponse } from '../store/slices/authSlices';
import { AxiosError } from 'axios';


type UserData = {
    id: number;
    email: string;
    firstName: string; 
};



export const authService = {
    register: async (payload: UserRegisterPayload): Promise<void> => {
        try {
            await api.post('/api/v1/auth/register', payload);
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.data) {
                throw new Error((axiosError.response.data as { detail: string })?.detail || "Échec de l'inscription.");
            }
            throw new Error("Erreur de réseau ou serveur non disponible.");
        }
    },

    /**
     * Appelle l'API pour connecter l'utilisateur et obtenir un jeton JWT.
     */
    login: async (payload: UserLoginPayload): Promise<AuthTokenResponse> => {
        try {
            // Encodage en 'application/x-www-form-urlencoded' pour le token endpoint de FastAPI
            const formData = new URLSearchParams();
            formData.append('username', payload.email);
            formData.append('password', payload.password);
    
            const response = await api.post<AuthTokenResponse>(
                '/api/v1/auth/login', 
                formData.toString(), 
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.data) {
                // Pour l'erreur 401 ou 403, le message est souvent dans `detail`
                const detail = (axiosError.response.data as { detail: string })?.detail;
                if (detail === "Unauthorized") {
                    throw new Error("Identifiants incorrects.");
                }
                throw new Error(detail || "Erreur de connexion inattendue.");
            }
            throw new Error("Erreur de réseau ou serveur non disponible.");
        }
    },
    
    /**
     * Récupère les informations de l'utilisateur connecté (via son JWT).
     */
    fetchCurrentUser: async (): Promise<UserData> => {
        try {
            
            const response = await api.get<UserData>('/api/v1/auth/users/me'); 
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
             if (axiosError.response?.status === 401) {
                throw new Error("Session expirée. Veuillez vous reconnecter.");
            }
            throw new Error("Impossible de récupérer les informations utilisateur.");
        }
    }
};