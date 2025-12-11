import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { InputField } from '../../components/ui/InputField';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ErrorAlert } from '../../components/ui/ErrorAlert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../store/slices/authSlices';
import { Link } from 'react-router-dom';


const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isAuthenticated) return;
    dispatch(login({ email, password }));
  };

  return (
    <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">Connexion</h2>
      
      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField 
            id="email" 
            label="Adresse e-mail" 
            type="email"
            placeholder="utilisateur@domaine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <InputField 
            id="password" 
            label="Mot de passe" 
            type="password"
            placeholder="Mot de passe sécurisé"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        
        <PrimaryButton isLoading={isLoading} type="submit">
            <LogIn className="mr-3" size={20} />
            Se connecter
        </PrimaryButton>
      </form>
      
      <div className="text-sm text-center pt-2">
        Pas encore de compte ?{' '}
        <Link
          to="/register"
          className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-150"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;