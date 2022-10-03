import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { fetchData } from '../lib/dataFetcher';
import { MessageModel } from './AlertProvider';

export enum NetworkState {
  Checking,
  Offline,
  Online,
}
export interface INetworkContext {
  // networkState: NetworkState;
  isOnline: boolean;
  isOffline: boolean;
  isBrowserSupported: boolean;
  message?: MessageModel;
  // shouldShowMessage: boolean;
}

export const NetworkContext = createContext<INetworkContext>({
  // networkState: NetworkState.Checking,
  isOnline: false,
  isOffline: true,
  isBrowserSupported: false,
  // shouldShowMessage: false,
});

export const NetworkProvier = ({ children }: PropsWithChildren) => {
  // const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Checking);
  const [isBrowserSupported, setBrowserSupported] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageModel | undefined>();
  const [isOnline, setIsOnline] = useState(false);
  const [isOffline, setIsOffline] = useState(true);
  // const [shouldShowMessage, setShouldShowMessage] = useState<boolean>(false);
  const { isReady } = useRouter();

  const value = useMemo(
    () => ({ isBrowserSupported, isOnline, isOffline, message }),
    [isOnline, isOffline, isBrowserSupported, message]
  );

  useEffect(() => {
    if (isReady) {
      if (window.navigator) {
        setBrowserSupported(true);
        (async () => {
          if (!window.navigator.onLine) {
            setMessage({ severity: 'warning', content: 'Jaringan tidak terhubung!' });
            setIsOffline(true);
            setIsOnline(false);
            return;
          }
          setMessage({ severity: 'info', content: 'Jaringan terhubung. Mencoba koneksi internet...' });
          // setNetworkState(NetworkState.Checking);
          const { error } = await fetchData('/api/healthcheck', 'GET');

          if (error) {
            setMessage({
              severity: 'error',
              content: 'Tidak dapat terhubung ke internet, periksa kembali koneksi internet Anda!',
            });
          }

          setIsOffline(error === undefined);
          setIsOnline(error !== undefined);
          // const state = error ? NetworkState.Offline : NetworkState.Online;
          // setNetworkState(state);
          // setIsOnline(!error || error === undefined);
        })();
        window.addEventListener('online', async () => {
          // setNetworkState(NetworkState.Checking);
          // setShouldShowMessage(true);
          const { error } = await fetchData('/api/healthcheck', 'GET');
          // const state = error ? NetworkState.Offline : NetworkState.Online;
          // setNetworkState(state);
          // setIsOnline(!error || error === undefined);
        });
        window.addEventListener('offline', () => {
          // setShouldShowMessage(true);
          // setNetworkState(NetworkState.Offline);
        });
      }
    }
  }, [isReady]);

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};
