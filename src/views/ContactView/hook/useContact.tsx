import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '@provider/AlertProvider';
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from '@lib/dataFetcher';
import { IContact, ApiResponseType } from '@types';
import { createContact, updateContact, deleteContact, ICreateContactPayload } from '@service/contact';
import { createUrlParamFromObj } from '@utils/helper';
import { ApiProxyEndpoint } from '@config/apiProxyEndpoint';

interface IUseContact {
  insert: (payload: ICreateContactPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateContactPayload) => Promise<void>;
  reload: () => void;
  items: Array<IContact>;
  dataReady: boolean;
  dataLoading: boolean;
  dataError: any;
  isValidating: boolean;
  dataMeta?: ApiResponseType<Array<IContact>>;
}

export default function useContact(): IUseContact {
  const API_URL = ApiProxyEndpoint.Contact;

  const router = useRouter();
  const params = router.query;
  const paramString = createUrlParamFromObj({ ...params });

  // contexts
  const { setAlert } = useContext(AlertContext);

  // hooks / states
  const {
    data: responseData,
    error: responseError,
    isValidating,
    mutate,
  } = useSWR(`${API_URL}${paramString}`, (url) => fetchData<ApiResponseType<IContact[]>>(url, { method: 'GET' }), {
    refreshWhenOffline: true,
    refreshWhenHidden: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const [ready, setReady] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const items = responseData?.data?.items || [];
  const dataLoading = !responseData;
  const dataError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateContactPayload) => {
    createContact(payload)
      .then(() => {
        // console.log("error masuk sini")
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menambah Contact Baru`,
          },
        });
        mutate();
      })
      .catch((err: FetcherResponseError) => {
        // console.log("error")
        setAlert({
          message: {
            severity: 'error',
            content: err.message || '',
          },
        });
      });
  };

  const remove = async (id: number) => {
    deleteContact(id)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menghapus Contact`,
          },
        });
        mutate();
      })
      .catch((err: FetcherResponseError) => {
        setAlert({
          message: {
            severity: 'error',
            content: err?.message || '',
          },
        });
      });
  };

  const update = async (id: number, payload: ICreateContactPayload) => {
    updateContact(id, payload)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil mengedit Contact`,
          },
        });
        mutate();
      })
      .catch((err: FetcherResponseError) => {
        setAlert({
          message: {
            severity: 'error',
            content: err?.message || '',
          },
        });
      });
  };

  const reload = (): void => {
    mutate();
  };

  useEffect(() => {
    if (responseData && !ready) {
      setTimeout(() => {
        setReady(true);
      }, 3000);
    }
  }, [responseData, ready]);

  return {
    insert,
    remove,
    update,
    reload,
    items,
    isValidating,
    dataReady: ready,
    dataLoading,
    dataError,
    dataMeta,
  };
}
