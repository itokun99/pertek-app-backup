import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import { AlertContext } from "../../../provider/AlertProvider";
import useSWR from 'swr';
import { fetchData, FetcherResponseError } from "../../../lib/dataFetcher";
import { ICluster, ApiResponseType } from '../../../types';
import { createCluster, updateCluster, deleteCluster, ICreateClusterPayload } from '../../../service/klaster';
import { createUrlParamFromObj } from '../../../utils/helper';
import { ApiProxyEndpoint } from '../../../config/apiProxyEndpoint';


interface IUseCluster {
  insert: (payload: ICreateClusterPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateClusterPayload) => Promise<void>;
  reload: () => void;
  clusters: Array<ICluster>;
  dataReady: boolean;
  dataLoading: boolean;
  dataError: any;
  isValidating: boolean;
  dataMeta?: ApiResponseType<Array<ICluster>>;
}



export default function useCluster(): IUseCluster {

  const API_URL = ApiProxyEndpoint.Cluster;

  const router = useRouter()
  const params = router.query
  const paramString = createUrlParamFromObj({ ...params });

  // contexts
  const { setAlert } = useContext(AlertContext);

  // hooks / states
  const { data: responseData, error: responseError, isValidating, mutate } = useSWR(`${API_URL}${paramString}`, (url) => fetchData<ApiResponseType<ICluster[]>>(url, { method: 'GET' }), {
    refreshWhenOffline: true,
    refreshWhenHidden: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  });

  const [ready, setReady] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const clusters = responseData?.data?.items || [];
  const dataLoading = !responseData;
  const dataError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateClusterPayload) => {
    createCluster(payload).then(() => {
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menambah Klaster Baru`,
        },
      });
      mutate();
    }).catch((err: FetcherResponseError) => {
      setAlert({
        message: {
          severity: "error",
          content: err.message || '',
        },
      });
    })
  };

  const remove = async (id: number) => {
    deleteCluster(id).then(() => {
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menghapus Klaster`,
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

  const update = async (id: number, payload: ICreateClusterPayload) => {
    updateCluster(id, payload).then(() => {
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil mengedit Klaster`,
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


  const reload = (): void => {
    mutate()
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
    clusters,
    isValidating,
    dataReady: ready,
    dataLoading,
    dataError,
    dataMeta
  }
}