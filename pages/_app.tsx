import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { AuthProvider } from '../src/context/AuthContext';
import { useRouter } from 'next/router';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { mytheme } from '../src/theme/base';

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
    router.replace('/');
  }

  if (err.statusCode === 404) {
    return;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        onErrorRetry: _errorRetryHandler,
        fetcher,
      }}
    >
      <ThemeProvider theme={mytheme}>
        <AuthProvider>
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
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
