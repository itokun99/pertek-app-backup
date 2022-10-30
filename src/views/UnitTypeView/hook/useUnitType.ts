import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '../../../provider/AlertProvider';
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from '../../../lib/dataFetcher';
import { IUnitType, ApiResponseType } from '../../../types';
import { createUnitType, updateUnitType, deleteUnitType, ICreateUnitTypePayload } from '../../../service/unit-type';
import { createUrlParamFromObj } from '../../../utils/helper';
import { ApiProxyEndpoint } from '../../../config/apiProxyEndpoint';
import { swrConfig } from '@config/swrConfig';

interface IUseUnitType {
  insert: (payload: ICreateUnitTypePayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateUnitTypePayload) => Promise<void>;
  reload: () => void;
  unitTypes: Array<IUnitType>;
  dataReady: boolean;
  dataLoading: boolean;
  dataError: any;
  isValidating: boolean;
  dataMeta?: ApiResponseType<Array<IUnitType>>;
}

export default function useUnitType(): IUseUnitType {
  const API_URL = ApiProxyEndpoint.UnitType;

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
    (url) => fetchData<ApiResponseType<IUnitType[]>>(url, { method: 'GET' }),
    swrConfig
  );

  const [ready, setReady] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const unitTypes = responseData?.data?.items || [];
  const dataLoading = !responseData;
  const dataError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateUnitTypePayload): Promise<void> => {
    try {
      await createUnitType(payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menambah tipe unit baru`,
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
      await deleteUnitType(id);

      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil menghapus tipe unit`,
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

  const update = async (id: number, payload: ICreateUnitTypePayload): Promise<void> => {
    try {
      await updateUnitType(id, payload);
      setAlert({
        message: {
          severity: 'success',
          content: `Berhasil mengedit tipe unit`,
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

  const reload = () => {
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
    unitTypes,
    isValidating,
    dataReady: ready,
    dataLoading,
    dataError,
    dataMeta,
  };
}
