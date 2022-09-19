import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, ReactNode, useEffect, useMemo, useState } from 'react';

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
  // token: string | null;
  setUser: (user: UserModel) => void;
};

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  // token: null,
  setUser: (user?: UserModel) => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({} as UserModel);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
