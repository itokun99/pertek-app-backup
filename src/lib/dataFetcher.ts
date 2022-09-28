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
      return { error: payload.message } as FetcherResponse;
    }
    return { data: payload } as FetcherResponse;
  } catch (e: any) {
    return { error: e.message } as FetcherResponse;
  }
};
