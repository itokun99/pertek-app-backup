import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { AuthProvider } from "../src/provider/AuthProvider";
import { Alert, CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import NProgress from "nprogress";

import MyTheme from "../src/theme";
import { NextPage } from "next";
import { PropsWithChildren, ReactElement, ReactNode, useContext, useEffect } from "react";
import "simplebar-react/dist/simplebar.min.css";
import { AlertContext, AlertProvider } from "../src/provider/AlertProvider";
import { FirebaseProvider } from "../src/provider/FirebaseProvider";
import { NetworkContext, NetworkProvier } from "../src/provider/NetworkProvider";
import { useRouter } from "next/router";
import "nprogress/nprogress.css";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  showSpinner: false,
  speed: 800,
});

export class MyError extends Error {
  statusCode?: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (res.ok) {
    return res.json();
  }

  const err = new MyError(`Failed to load data from ${url}`);
  err.statusCode = res.status;

  throw err;
};

const _errorRetryHandler = (err: MyError) => {
  if (err.statusCode === 401) {
    window.location.replace("/login");
    return;
  }
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, [router.events]);
  return (
    <NetworkProvier>
      <FirebaseProvider>
        <AlertProvider>
          <SWRConfig
            value={{
              onErrorRetry: _errorRetryHandler,
              fetcher,
            }}
          >
            <AuthProvider>
              <ThemeProvider theme={MyTheme}>
                <Head>
                  <title>Propertek - Best Indonesia Property Management System</title>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                  />
                  <meta
                    name="description"
                    content="The best property management system that suit Indonesia property management business"
                  />
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <CssBaseline />
                <MainContainer>{getLayout(<Component {...pageProps} />)}</MainContainer>
              </ThemeProvider>
            </AuthProvider>
          </SWRConfig>
        </AlertProvider>
      </FirebaseProvider>
    </NetworkProvier>
  );
}

const MainContainer = ({ children }: PropsWithChildren) => {
  const { alert, setAlert } = useContext(AlertContext);
  const { message } = useContext(NetworkContext);

  useEffect(() => {
    if (message) {
      setAlert({ message });
    }
  }, [message, setAlert]);

  return (
    <>
      {children}
      {alert?.message && (
        <Snackbar
          onClose={() => setAlert(null)}
          autoHideDuration={alert.message.severity === "error" ? null : 2000}
          anchorOrigin={alert.position ? alert.position : { horizontal: "center", vertical: "top" }}
          open={alert !== null}
        >
          <Alert severity={alert.message.severity} variant={alert.variant ?? "filled"}>
            {alert.message.content}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default MyApp;
