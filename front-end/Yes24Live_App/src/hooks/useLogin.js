import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useState } from 'react';
import { UserAuthService } from '../services/UserAuthService';

export const useLogin = () => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (id, pw) => {
    setLoading(true);
    try {
      const response = await UserAuthService.login(id, pw);

      if (response.code === 'success') {
        setUser(response.id, response.jwt);
      }
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { login, loading, error };
};
