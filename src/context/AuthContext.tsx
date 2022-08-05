import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContext = {
  isLoggedIn: boolean;
  changeState: (state: boolean) => void;
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeState = (state: boolean) => {
    setIsLoggedIn(state);
  };

  return <AuthContext.Provider value={{ isLoggedIn, changeState }}>{children}</AuthContext.Provider>;
}
