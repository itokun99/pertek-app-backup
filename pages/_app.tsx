import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { AuthProvider } from '../src/provider/AuthProvider';
import { useRouter } from 'next/router';
import { CssBaseline, ThemeProvider } from '@mui/material';

import MyTheme from '../src/theme';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import 'simplebar-react/dist/simplebar.min.css';

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

const _errorRetryHandler = (err: any, key: string, config: any, revalidate: any) => {
  const router = useRouter();

  if (err.statusCode === 401) {
    router.replace('/login');
  }

  if (err.statusCode === 404) {
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

  return (
    <AuthProvider>
      <SWRConfig
        value={{
          onErrorRetry: _errorRetryHandler,
          fetcher,
        }}
      >
        <ThemeProvider theme={MyTheme}>
          <Head>
            <title>Propertek - Best Indonesia Property Management System</title>
            <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
            <meta
              name='description'
              content='The best property management system that suit Indonesia property management business'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </SWRConfig>
    </AuthProvider>
  );
}

export default MyApp;
