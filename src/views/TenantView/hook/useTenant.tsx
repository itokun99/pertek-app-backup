import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '@provider/AlertProvider';
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from '@lib/dataFetcher';
import { ITenant, ApiResponseType, ITenantDetail } from '@general-types';
import { createTenant, updateTenant, deleteTenant, ICreateTenantPayload, getTenantById } from '@service/tenant';
import { getTemplateTenant } from '@service/template';
import { createUrlParamFromObj } from '@utils/helper';
import { ApiProxyEndpoint } from '@config/apiProxyEndpoint';
import { swrConfig } from '@config/swrConfig';

interface IUseTenant {
  insert: (payload: ICreateTenantPayload) => Promise<void>;
  inquiry: (id: string) => Promise<ITenantDetail | null | undefined>;
  remove: (id: string) => Promise<void>;
  update: (id: string, payload: ICreateTenantPayload) => Promise<void>;
  downloadTemplate: () => void;
  reload: () => void;
  items: Array<ITenant>;
  isReady: boolean;
  isLoading: boolean;
  isError: any;
  isValidating: boolean;
  loadingForm: boolean;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
  dataMeta?: ApiResponseType<Array<ITenant>>;
}

export default function useTenant(): IUseTenant {
  const API_URL = ApiProxyEndpoint.Tenant;

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
    (url) => fetchData<ApiResponseType<ITenant[]>>(url, { method: 'GET' }),
    swrConfig
  );

  const [ready, setReady] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const items = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateTenantPayload): Promise<void> => {
    try {
      await createTenant(payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menambah Tenant Baru`,
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

  const remove = async (id: string): Promise<void> => {
    try {
      await deleteTenant(id);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menghapus Tenant`,
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

  const update = async (id: string, payload: ICreateTenantPayload) => {
    try {
      await updateTenant(id, payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil mengedit Tenant`,
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

  const inquiry = async (id: string): Promise<ITenantDetail | null | undefined> => {
    try {
      const data = await getTenantById(id);
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

  const reload = (): void => {
    mutate();
  };

  useEffect(() => {
    if (responseData && !ready) {
      setReady(true);
    }
  }, [responseData, ready]);

  return {
    insert,
    remove,
    update,
    inquiry,
    reload,
    setLoadingForm,
    downloadTemplate: getTemplateTenant,
    items,
    isValidating,
    isReady: ready,
    isLoading,
    isError,
    dataMeta,
    loadingForm,
  };
}
