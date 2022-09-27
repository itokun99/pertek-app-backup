import { createContext, PropsWithChildren, useMemo, useState } from 'react';

export type AlertModel = {
  severity: 'success' | 'warning' | 'error' | 'info';
  variant?: 'standard' | 'filled' | 'outlined';
  message?: string;
  position?: {
    vertical: 'top' | 'bottom';
    horizontal: 'center' | 'left' | 'right';
  };
};

export type AlertContextInterface = {
  alert: AlertModel | null;
  setAlert: (alert: AlertModel | null) => void;
};

export const AlertContext = createContext<AlertContextInterface>({
  alert: null,
  setAlert: (_: AlertModel | null) => {},
});

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alert, setAlert] = useState<AlertModel | null>(null);
  const value = useMemo(() => {
    return {
      alert,
      setAlert,
    };
  }, [alert, setAlert]);
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};