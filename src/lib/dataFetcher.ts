import { NetworkState } from '../provider/NetworkProvider';

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

const controller = new AbortController();
const signal = controller.signal;

export const fetchData = async (
  url: string,
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
  body?: BodyInit | null | undefined
) => {
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const apiResponse = await fetch(url, {
      signal,
      method,
      body,
    });
    const payload = await apiResponse.json();
    clearTimeout(timeout);

    if (apiResponse.status === 401) {
      window.location.replace('/login');
      return {};
    }

    if (apiResponse.status !== 200) {
      return { error: { code: apiResponse.status, message: payload.message } } as FetcherResponse;
    }

    return { data: payload } as FetcherResponse;
  } catch (e: any) {
    clearTimeout(timeout);
    let message = 'Unknown error occurs during fething the data. Please try again!';
    if (e instanceof DOMException) {
      message = 'Connection timed out!';
    }
    if (e.message) {
      message = e.message;
    }
    return { error: { code: 500, message: message } } as FetcherResponse;
  }
};

export async function doFetch(
  asPath: string,
  // networkState: NetworkState,
  setData: Function,
  setAlert: Function,
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
    // if (networkState === NetworkState.Offline) {
    setAlert({
      severity: 'error',
      message: error.message,
    });
    // }
    return;
  }

  setIsError(false);
  setData(data);
}
