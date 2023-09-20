import { useState } from 'react';
import { UserAuthService } from '../services/UserAuthService';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (id, pw, name, phone, birth, height, weight) => {
    setLoading(true);
    try {
      const response = await UserAuthService.signUp(
        id,
        pw,
        name,
        phone,
        birth,
        height,
        weight
      );
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { signUp, loading, error };
};
