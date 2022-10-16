import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import { AlertContext } from "../../../provider/AlertProvider";
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from "../../../lib/dataFetcher";
import { IUnitType, ApiResponseType } from '../../../types';
import { createUnitType, updateUnitType, deleteUnitType, ICreateUnitTypePayload } from '../../../service/tipe-unit';
import { createUrlParamFromObj } from '../../../utils/helper';
import { ApiProxyEndpoint } from '../../../config/apiProxyEndpoint';


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

  const router = useRouter()
  const params = router.query
  const paramString = createUrlParamFromObj({ ...params });

  // contexts
  const { setAlert } = useContext(AlertContext);

  // hooks / states
  const { data: responseData, error: responseError, isValidating, mutate } = useSWR(`${API_URL}${paramString}`, (url) => fetchData<ApiResponseType<IUnitType[]>>(url, { method: 'GET' }), {
    refreshWhenOffline: true,
    refreshWhenHidden: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  });

  const [ready, setReady] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const unitTypes = responseData?.data?.items || [];
  const dataLoading = !responseData;
  const dataError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateUnitTypePayload) => {
    createUnitType(payload).then(() => {
      console.log("error masuk sini")
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menambah tipe unit baru`,
        },
      });
      mutate();
    }).catch((err: FetcherResponseError) => {
      console.log("error")
      setAlert({
        message: {
          severity: "error",
          content: err.message || '',
        },
      });
    })
  };

  const remove = async (id: number) => {
    deleteUnitType(id).then(() => {
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menghapus tipe unit`,
        },
      });
      mutate();
    }).catch((err: FetcherResponseError) => {
      setAlert({
        message: {
          severity: "error",
          content: err?.message || '',
        },
      });
    })
  }

  const update = async (id: number, payload: ICreateUnitTypePayload) => {
    updateUnitType(id, payload).then(() => {
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil mengedit tipe unit`,
        },
      });
      mutate();
    }).catch((err: FetcherResponseError) => {
      setAlert({
        message: {
          severity: "error",
          content: err?.message || '',
        },
      });
    });
  };

  const reload = () => {
    mutate();
  }

  useEffect(() => {
    if (responseData && !ready) {
      setTimeout(() => {
        setReady(true);
      }, 3000)
    }
  }, [responseData, ready])

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
    dataMeta
  }
}