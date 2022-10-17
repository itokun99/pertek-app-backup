import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AlertContext } from '../../../provider/AlertProvider';
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from '../../../lib/dataFetcher';
import { IUnit, ApiResponseType } from '../../../types';
import { createUnit, updateUnit, deleteUnit, ICreateUnitPayload } from '../../../service/unit';
import { createUrlParamFromObj } from '../../../utils/helper';
import { ApiProxyEndpoint } from '../../../config/apiProxyEndpoint';

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
  } = useSWR(`${API_URL}${paramString}`, (url) => fetchData<ApiResponseType<IUnit[]>>(url, { method: 'GET' }), {
    refreshWhenOffline: true,
    refreshWhenHidden: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const [ready, setReady] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const units = responseData?.data?.items || [];
  const dataLoading = !responseData;
  const dataError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateUnitPayload) => {
    createUnit(payload)
      .then(() => {
        // console.log("error masuk sini")
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menambah Unit Baru`,
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
    deleteUnit(id)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menghapus Unit`,
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

  const update = async (id: number, payload: ICreateUnitPayload) => {
    updateUnit(id, payload)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil mengedit Unit`,
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
    units,
    isValidating,
    dataReady: ready,
    dataLoading,
    dataError,
    dataMeta,
  };
}
