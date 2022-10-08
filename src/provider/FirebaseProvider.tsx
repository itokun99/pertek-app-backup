import { useRouter } from "next/router";
import { createContext, useEffect, useMemo, PropsWithChildren } from "react";
import { app } from "../config/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

export enum LogType {
  page,
  action,
}
export interface IFirebaseContext {
  log: (key: string, type: LogType) => void;
}

export const FirebaseContext = createContext<IFirebaseContext>({
  log: (key: string, _: LogType) => {},
});

export const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const { isReady, events } = useRouter();

  const value = useMemo(
    () => ({
      log: (key: string, type: LogType = LogType.page) => {
        const analytics = getAnalytics(app);

        if (type === LogType.page) {
          logEvent(analytics, "screen_view" as never, {
            screen_name: key,
          });
        }
      },
    }),
    []
  );

  useEffect(() => {
    if (isReady) {
      events.on("routeChangeComplete", (url) => value.log(url));
      events.on("hashChangeComplete", (url) => value.log(url));
    }

    return () => {
      events.off("routeChangeComplete", (url) => value.log(url));
      events.off("hashChangeComplete", (url) => value.log(url));
    };
  }, [isReady]);

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
