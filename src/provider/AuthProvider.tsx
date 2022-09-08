import { useRouter } from 'next/router';
import { createContext, ReactNode, useMemo, useState } from 'react';

export interface UserModel {
  id: string;
  username: string;
  phoneNumber: string;
  avatar?: string;
}

type AuthContextInterface = {
  user?: UserModel;
  setUser: (user?: UserModel) => void;
};

export const AuthContext = createContext<AuthContextInterface>({
  setUser: () => {},
});

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserModel | undefined>();

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
