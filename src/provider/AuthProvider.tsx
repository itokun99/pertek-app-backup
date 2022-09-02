import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

export interface UserModel {
  username: string;
  phoneNumber: string;
  avatar?: string;
}

type AuthContext = {
  user?: UserModel;
  setUser: (use: UserModel) => void;
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserModel>({
    username: 'Syamsul',
    phoneNumber: '081803663156',
  });

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
