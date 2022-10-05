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
  isOnline: boolean;
  isOffline: boolean;
  isNetworkConnected: boolean;
  isNetworkNotConnected: boolean;
  isBrowserSupported: boolean;
  message?: MessageModel;
}

export const NetworkContext = createContext<INetworkContext>({
  isNetworkConnected: false,
  isNetworkNotConnected: true,
  isOnline: false,
  isOffline: true,
  isBrowserSupported: false,
});

const connectionTestingMessage = {
  severity: 'info',
  content: 'Jaringan terhubung!. Testing koneksi internet...',
} as MessageModel;

const noInternetConnectionMessage = {
  severity: 'error',
  content: 'Tidak dapat terhubung ke internet, periksa kembali koneksi internet Anda!',
} as MessageModel;

const noNetworkConnectionMessage = {
  severity: 'warning',
  content: 'Jaringan terputus!',
} as MessageModel;

const connectionNormalMessage = {
  severity: 'success',
  content: 'Koneksi internet ok',
} as MessageModel;

const networkConnectionChecher = async (
  setMessage: Function,
  setIsNetworkConnected: Function,
  setIsNetworkNotConnected: Function,
  setIsOffline: Function,
  setIsOnline: Function,
  state: 'offline' | 'online' = 'offline',
  isInit?: boolean
) => {
  let isOffline = false;
  let isOnline = true;
  let isNetworkConnected = true;
  let isNetworkNotConnected = false;

  if (state === 'offline') {
    setMessage(noNetworkConnectionMessage);
    isOffline = true;
    isOnline = false;
    isNetworkConnected = false;
    isNetworkNotConnected = true;
  }

  if (state === 'online') {
    if (!isInit) {
      setMessage(connectionTestingMessage);
    }
    isOffline = false;
    isOnline = true;
    isNetworkConnected = true;
    isNetworkNotConnected = false;

	const {error} = await fetchData('/api/healthcheck');

    if (error) {
      setMessage(noInternetConnectionMessage);
    } else {
      if (!isInit) {
        setMessage(connectionNormalMessage);
      }
    }
  }

  setIsNetworkConnected(isNetworkConnected);
  setIsNetworkNotConnected(isNetworkNotConnected);
  setIsOffline(isOffline);
  setIsOnline(isOnline);
};

export const NetworkProvier = ({ children }: PropsWithChildren) => {
  const [isBrowserSupported, setBrowserSupported] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageModel | undefined>();
  const [isOnline, setIsOnline] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [isNetworkConnected, setIsNetworkConnected] = useState(true);
  const [isNetworkNotConnected, setIsNetworkNotConnected] = useState(false);
  const { isReady } = useRouter();

  const value = useMemo(
    () => ({ isNetworkConnected, isNetworkNotConnected, isBrowserSupported, isOnline, isOffline, message }),
    [isNetworkConnected, isNetworkNotConnected, isOnline, isOffline, isBrowserSupported, message]
  );

  useEffect(() => {
    if (isReady) {
      if (window.navigator) {
        setBrowserSupported(true);

        if (window.navigator.onLine) {
          (async () =>
            networkConnectionChecher(
              setMessage,
              setIsNetworkConnected,
              setIsNetworkNotConnected,
              setIsOffline,
              setIsOnline,
              'online',
              true
            ))();
        } else {
          (async () =>
            networkConnectionChecher(
              setMessage,
              setIsNetworkConnected,
              setIsNetworkNotConnected,
              setIsOffline,
              setIsOnline,
              'offline',
              true
            ))();
        }

        window.addEventListener('online', () =>
          networkConnectionChecher(
            setMessage,
            setIsNetworkConnected,
            setIsNetworkNotConnected,
            setIsOffline,
            setIsOnline,
            'online'
          )
        );

        window.addEventListener('offline', () =>
          networkConnectionChecher(
            setMessage,
            setIsNetworkConnected,
            setIsNetworkNotConnected,
            setIsOffline,
            setIsOnline,
            'offline'
          )
        );
      }
    }
  }, [isReady]);

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};
