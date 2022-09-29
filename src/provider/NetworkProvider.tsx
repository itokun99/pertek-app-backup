import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { fetchData } from '../lib/dataFetcher';

export interface NetworkState {
  isOnline: boolean;
  isBrowserSupported: boolean;
  shouldShowMessage: boolean;
}

export const NetworkContext = createContext<NetworkState>({
  isOnline: false,
  isBrowserSupported: false,
  shouldShowMessage: false,
});

export const NetworkProvier = ({ children }: PropsWithChildren) => {
  const [isOnline, setIsOnline] = useState(false);
  const [isBrowserSupported, setBrowserSupported] = useState(false);
  const [shouldShowMessage, setShouldShowMessage] = useState(false);
  const { isReady } = useRouter();

  const value = useMemo(
    () => ({ isOnline, isBrowserSupported, shouldShowMessage }),
    [isOnline, isBrowserSupported, shouldShowMessage]
  );

  useEffect(() => {
    if (isReady) {
      if (window.navigator) {
        setBrowserSupported(true);
        (async () => {
          const { error } = await fetchData('/api/healthcheck', 'GET');
          setIsOnline(!error || error === undefined);
        })();
        window.addEventListener('online', async () => {
          setShouldShowMessage(true);
          const { error } = await fetchData('/api/healthcheck', 'GET');
          setIsOnline(!error || error === undefined);
        });
        window.addEventListener('offline', () => {
          setShouldShowMessage(true);
          setIsOnline(false);
        });
      }
    }
  }, [isReady]);

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};
