import { AlertModel } from "../provider/AlertProvider";

export type ListResponse = {
  items: Array<any>;
};

export interface FetcherResponseError {
  code: number;
  message: string;
}

export type FetcherResponse<T = any> = {
  error?: FetcherResponseError;
  data?: T;
};

export type FetchDataParams = {
  method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  headers?: {};
  body?: BodyInit | null | undefined;
};

export const fetchData = async <T = any>(url: string, params?: FetchDataParams) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const apiResponse = await fetch(url, {
      headers: params?.headers,
      signal,
      method: params?.method,
      body: params?.body,
    });

    if (apiResponse.status === 401) {
      window.location.replace("/login");
      return {};
    }

    const payload = await apiResponse.json();

    if (apiResponse.status !== 200) {
      return {
        error: { code: apiResponse.status, message: payload.message },
      } as FetcherResponse<T>;
    }

    return { data: payload } as FetcherResponse<T>;
  } catch (e: any) {
    let message = "Unknown error occurs during fething the data. Please try again!";

    if (e instanceof DOMException) {
      message = "Connection timed out!";
    }

    if (e.message) {
      message = e.message;
    }

    return { error: { code: 500, message: message } } as FetcherResponse<T>;
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

  const { error, data } = await fetchData(`/api/property`);

  if (error) {
    setIsError(true);

    setAlert({
      message: {
        severity: "error",
        content: error.message,
      },
    });
    return;
  }

  setIsError(false);
  setData(data);
}
