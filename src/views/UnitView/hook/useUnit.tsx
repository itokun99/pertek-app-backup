import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '../../../provider/AlertProvider';
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from '../../../lib/dataFetcher';
import { IUnit, ApiResponseType } from '../../../types';
import { createUnit, updateUnit, deleteUnit, ICreateUnitPayload } from '../../../service/unit';
import { createUrlParamFromObj } from '../../../utils/helper';
import { ApiProxyEndpoint } from '../../../config/apiProxyEndpoint';
import { swrConfig } from '@config/swrConfig';

interface IUseUnit {
  insert: (payload: ICreateUnitPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateUnitPayload) => Promise<void>;
  reload: () => void;
  units: Array<IUnit>;
  dataReady: boolean;
  dataLoading: boolean;
  dataError: any;
  isValidating: boolean;
  dataMeta?: ApiResponseType<Array<IUnit>>;
}

export default function useUnit(): IUseUnit {
  const API_URL = ApiProxyEndpoint.Unit;

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
    (url) => fetchData<ApiResponseType<IUnit[]>>(url, { method: 'GET' }),
    swrConfig
  );

  const [ready, setReady] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const units = responseData?.data?.items || [];
  const dataLoading = !responseData;
  const dataError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateUnitPayload): Promise<void> => {
    try {
      await createUnit(payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menambah Unit Baru`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: 'error',
          content: error.message || 'Terjadi Kesalahan',
        },
      });
      throw err;
    }
  };

  const remove = async (id: number): Promise<void> => {
    try {
      await deleteUnit(id);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menghapus Unit`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: 'error',
          content: error?.message || 'Terjadi Kesalahan',
        },
      });
      throw err;
    }
  };

  const update = async (id: number, payload: ICreateUnitPayload): Promise<void> => {
    try {
      await updateUnit(id, payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil mengedit Unit`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: 'error',
          content: error?.message || 'Terjadi Kesalahan',
        },
      });
      throw err;
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
    reload,
    units,
    isValidating,
    dataReady: ready,
    dataLoading,
    dataError,
    dataMeta,
  };
}
