import { useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../../store/hooks';
import { login } from '../../store/slices/authSlices';


const useLoginScreen = () => {
      const dispatch = UseAppDispatch();
      const { isLoading, error, isAuthenticated } = UseAppSelector(state => state.auth);
      
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading || isAuthenticated) return;
        dispatch(login({ email, password }));
      };

      return {
        dispatch, 
        isLoading, 
        error,
        isAuthenticated,
        handleSubmit,
        email,
        setEmail,
        password,
        setPassword
      }
}

export default useLoginScreen;