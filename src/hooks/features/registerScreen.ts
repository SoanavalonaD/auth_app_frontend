import { useState } from 'react'
import { UseAppDispatch, UseAppSelector } from '../../store/hooks';
import { register } from '../../store/slices/authSlices';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();
    // On utilise l'état global Redux pour 'isLoading' et 'auth.error' du dernier appel API
    const { isLoading, error: authError } = UseAppSelector(state => state.auth); 

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
      
      if (result) {
          setSuccess(true);
      }
    };

    return {
        dispatch,
        navigate,
        isLoading,
        authError,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        registerError,
        setRegisterError,
        success,
        setSuccess,
        handleSubmit
    }
}

export default Register;