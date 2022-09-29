export type ListResponse = {
  items: Array<any>;
};

export type FetcherResponse = {
  error?: string;
  data?: any;
};

export const fetchData = async (
  url: string,
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
  body?: BodyInit | null | undefined
) => {
  try {
    const apiResponse = await fetch(url, {
      method,
      body,
    });
    const payload = await apiResponse.json();

    if (apiResponse.status !== 200) {
      console.log('here', payload);
      return { error: payload.message } as FetcherResponse;
    }
    return { data: payload } as FetcherResponse;
  } catch (e: any) {
    return { error: e.message } as FetcherResponse;
  }
};

export async function doFetch(
  asPath: string,
  isOnline: boolean,
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
    if (isOnline) {
      setAlert({
        severity: 'error',
        message: error,
      });
    }
    return;
  }

  setIsError(false);
  setData(data);
}
