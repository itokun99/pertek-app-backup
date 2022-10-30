import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '@provider/AlertProvider';
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from '@lib/dataFetcher';
import { IContact, ApiResponseType, IContactDetail } from '@general-types';
import { createContact, updateContact, deleteContact, ICreateContactPayload, getContactById } from '@service/contact';
import { createUrlParamFromObj } from '@utils/helper';
import { ApiProxyEndpoint } from '@config/apiProxyEndpoint';
import { IMultipleInputItem } from '@components/input/MultipleInput';
import { swrConfig } from '@config/swrConfig';

interface IUseContact {
  insert: (payload: ICreateContactPayload) => Promise<void>;
  inquiry: (id: number) => Promise<IContactDetail | null | undefined>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateContactPayload) => Promise<void>;
  reload: () => void;
  items: Array<IContact>;
  isReady: boolean;
  isLoading: boolean;
  isError: any;
  isValidating: boolean;
  loadingForm: boolean;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
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
  } = useSWR(
    `${API_URL}${paramString}`,
    (url) => fetchData<ApiResponseType<IContact[]>>(url, { method: 'GET' }),
    swrConfig
  );

  const [ready, setReady] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const items = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateContactPayload): Promise<void> => {
    try {
      await createContact(payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menambah Contact Baru`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: 'error',
          content: error.message || 'Terjadi kesalahan',
        },
      });
      throw err;
    }
  };

  const remove = async (id: number): Promise<void> => {
    try {
      await deleteContact(id);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menghapus Contact`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: 'error',
          content: error.message || 'Terjadi kesalahan',
        },
      });
      throw err;
    }
  };

  const update = async (id: number, payload: ICreateContactPayload) => {
    try {
      await updateContact(id, payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil mengedit Contact`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: 'error',
          content: error.message || 'Terjadi kesalahan',
        },
      });
      throw err;
    }
  };

  const inquiry = async (id: number): Promise<IContactDetail | null | undefined> => {
    try {
      const data = await getContactById(id);
      return data;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: 'error',
          content: error?.message || 'Terjadi kesalahan',
        },
      });
      return null;
    }
  };

  const handleMultipleInputSave = (name: string, data: IMultipleInputItem) => {
    alert('Save');
  };

  const reload = (): void => {
    mutate();
  };

  useEffect(() => {
    if (responseData && !ready) {
      // setImmediate(
      // () =>
      // setTimeout(() => {
      setReady(true);
      // }, 3000);
      // );
    }
  }, [responseData, ready]);

  return {
    insert,
    remove,
    update,
    inquiry,
    reload,
    setLoadingForm,
    items,
    isValidating,
    isReady: ready,
    isLoading,
    isError,
    dataMeta,
    loadingForm,
  };
}
