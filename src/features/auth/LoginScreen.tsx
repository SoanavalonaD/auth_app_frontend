import { InputField } from '../../components/ui/InputField';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ErrorAlert } from '../../components/ui/ErrorAlert';
import { Link } from 'react-router-dom';
import loginScreen from '../../hooks/features/loginScreen';
import { Login } from '@mui/icons-material';


const LoginScreen: React.FC = () => {
  const { isLoading, error, handleSubmit, email, setEmail, password, setPassword } = loginScreen();

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
            {/* <Login className="mr-3" size={20}/> */}
            <Login/>
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