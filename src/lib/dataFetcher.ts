import { AlertModel } from '../provider/AlertProvider';

export type ListResponse = {
  items: Array<any>;
};

export type FetcherResponse = {
  error?: {
    code: number;
    message: string;
  };
  data?: any;
};

export type FetchDataParams = {
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: {};
  body?: BodyInit | null | undefined;
};

export const fetchData = async (url: string, params?: FetchDataParams) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const apiResponse = await fetch(url, {
      headers: params?.headers,
      signal,
      method: params?.method,
      body: params?.body,
    });

    if (apiResponse.status === 401) {
      window.location.replace('/login');
      return {};
    }

    const payload = await apiResponse.json();
	console.log(payload)

    if (apiResponse.status !== 200) {
      return { error: { code: apiResponse.status, message: payload.message } } as FetcherResponse;
    }

    return { data: payload } as FetcherResponse;
  } catch (e: any) {
    let message = 'Unknown error occurs during fething the data. Please try again!';

    if (e instanceof DOMException) {
      message = 'Connection timed out!';
    }

    if (e.message) {
      message = e.message;
    }

    return { error: { code: 500, message: message } } as FetcherResponse;
  } finally {
    clearTimeout(timeout);
  }
};

export async function doFetch(
  asPath: string,
  setData: Function,
  setAlert: (mode: AlertModel) => void,
  setIsError: Function,
  isReload?: boolean
) {
  setData(null);

  if (isReload) {
    setIsError(false);
  }

  const { error, data } = await fetchData(`/api${asPath}`);

  if (error) {
    setIsError(true);

    setAlert({
      message: {
        severity: 'error',
        content: error.message,
      },
    });
    return;
  }

  setIsError(false);
  setData(data);
}
