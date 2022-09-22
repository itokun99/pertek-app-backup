import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

export interface UserModel {
  id: string;
  username: string;
  phone_number: string;
  role: string;
  registration_stats: string;
  avatar?: string;
}

type AuthContextInterface = {
  user: UserModel | null;
  setUser: (user: UserModel) => void;
};

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  setUser: (user?: UserModel) => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({} as UserModel);

  const { data, error } = useSWR('/api/user');

  useEffect(() => {
    setUser(data);
  }, [data]);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
