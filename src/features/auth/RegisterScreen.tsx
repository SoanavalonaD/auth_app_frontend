import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { InputField } from '../../components/ui/InputField';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ErrorAlert } from '../../components/ui/ErrorAlert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register } from '../../store/slices/authSlices';
import { Link, useNavigate } from 'react-router-dom';


const RegisterScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // On utilise l'état global Redux pour 'isLoading' et 'auth.error' du dernier appel API
  const { isLoading, error: authError } = useAppSelector(state => state.auth); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Erreur locale (ex: mot de passe non-correspondant)
  const [registerError, setRegisterError] = useState<string | null>(null); 
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    if (password !== confirmPassword) {
        setRegisterError("Les mots de passe ne correspondent pas.");
        return;
    }

    const result = await dispatch(register({ email, password }));
    
    // Le thunk register retourne 'true' si l'API répond 200/201
    if (result) {
        setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 text-center">
        <h2 className="text-4xl font-extrabold text-green-600">Inscription Réussie !</h2>
        <p className="text-gray-700 text-lg">
            Votre compte a été créé. Vous pouvez maintenant vous connecter.
        </p>
        <PrimaryButton onClick={() => navigate('/login')}>
          Aller à la Connexion
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">Créer un Compte</h2>
      
      {(authError || registerError) && <ErrorAlert message={authError || registerError || ''} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField 
            id="email_reg" 
            label="Adresse e-mail" 
            type="email"
            placeholder="utilisateur@domaine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <InputField 
            id="password_reg" 
            label="Mot de passe (Min. 8 caractères)" 
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <InputField 
            id="confirm_password" 
            label="Confirmer le mot de passe" 
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <PrimaryButton isLoading={isLoading} type="submit">
            <UserPlus className="mr-3" size={20} />
            S'inscrire
        </PrimaryButton>
      </form>
      
      <div className="text-sm text-center pt-2">
        Déjà un compte ?{' '}
        <Link
          to="/login"
          className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-150"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;