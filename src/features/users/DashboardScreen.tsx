import React, { useEffect, useState } from 'react';
import { LogOut, User, Info, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlices';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

/**
 * Écran du Tableau de Bord (Dashboard) - Accès Protégé.
 * Affiche les informations utilisateur et permet la déconnexion.
 */
const DashboardScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, token, isLoading } = useAppSelector(state => state.auth);

    // Simuler le temps de chargement des données spécifiques au Dashboard (si React Query était utilisé)
    const [dashboardLoading, setDashboardLoading] = useState(true);
    
    useEffect(() => {
        // Simuler la fin du chargement des données du dashboard
        const timer = setTimeout(() => {
            setDashboardLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-2xl space-y-8">
            <h2 className="text-5xl font-extrabold text-indigo-600 flex items-center">
                <User className="mr-4" size={40} />
                Tableau de Bord
            </h2>

            {isLoading || dashboardLoading ? (
                <div className="flex flex-col items-center justify-center p-10 space-y-4">
                    <Loader2 className="animate-spin text-indigo-500" size={36} />
                    <p className="text-lg text-gray-600">Chargement des données...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <p className="text-2xl font-bold text-gray-800">
                        Bienvenue, <span className="text-indigo-600">{user?.firstName || user?.email || 'Cher Utilisateur'}</span>!
                    </p>
                    <p className="text-xl text-gray-700">
                        Vous êtes connecté. Votre adresse e-mail : 
                        <span className="font-semibold ml-2 text-indigo-800">{user?.email || 'N/A'}</span>
                    </p>
                    
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-sm break-all flex items-start">
                        <Info className="w-5 h-5 mr-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-indigo-800 mb-1">Jeton JWT actif (à inclure dans les Headers)</p>
                            <code className="text-gray-700 block overflow-x-auto p-1 whitespace-nowrap">{token || 'Jeton non présent'}</code>
                        </div>
                    </div>
                </div>
            )}
            
            <PrimaryButton 
                onClick={handleLogout}
                className="!bg-red-600 hover:!bg-red-700 focus:ring-red-500 mt-6"
            >
                <LogOut className="mr-3" size={20} />
                Déconnexion
            </PrimaryButton>
        </div>
    );
};

export default DashboardScreen;