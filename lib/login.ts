import { useContext } from 'react';
import useSWR from 'swr';
import { AuthContext } from '../src/context/AuthContext';

export const useLogin = async (username: string, password: string): Promise<boolean> => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return res.status === 200;
};
