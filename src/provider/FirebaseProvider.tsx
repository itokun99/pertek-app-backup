import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo, PropsWithChildren } from 'react';
import { app } from '../config/firebase';
import { EventNameString, getAnalytics, logEvent, EventParams } from 'firebase/analytics';

export enum LogType {
  page,
  action,
}
export interface IFirebaseContext {
  log: (event: EventNameString, params?: EventParams) => void;
}

export const FirebaseContext = createContext<IFirebaseContext>({
  log: (event: EventNameString, params?: EventParams) => {},
});

export const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const { isReady, events } = useRouter();

  const value = useMemo(
    () => ({
      log: (event: EventNameString, params?: EventParams) => {
        const analytics = getAnalytics(app);
        logEvent(analytics, event as never, params);
      },
    }),
    []
  );

  useEffect(() => {
    if (isReady) {
      events.on('routeChangeComplete', (url) => value.log('screen_view', { screen_name: url }));
      events.on('hashChangeComplete', (url) => value.log('screen_view', { screen_name: url }));
    }

    return () => {
      events.off('routeChangeComplete', (url) => value.log('screen_view', { screen_name: url }));
      events.off('hashChangeComplete', (url) => value.log('screen_view', { screen_name: url }));
    };
  }, [events, isReady, value]);

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};
