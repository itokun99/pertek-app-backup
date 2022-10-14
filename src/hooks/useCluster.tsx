import { useState, useEffect, useContext } from 'react';
import { AlertContext } from "../provider/AlertProvider";
import useSWR, { MutatorCallback } from 'swr';
import { fetchData, FetcherResponseError, FetcherResponse } from "../lib/dataFetcher";
import { ICluster, ApiResponseType } from '../types';

interface IUseClusterInserPayload {
  name: string;
  property_id: number;
  description: string;
}


interface IUseCluster {
  insert: (payload: IUseClusterInserPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: IUseClusterInserPayload) => Promise<void>;
  clusters: Array<ICluster>;
  dataReady: boolean;
  dataLoading: boolean;
  dataError: any;
  isValidating: boolean;
  dataMeta?: ApiResponseType<Array<ICluster>>;
}



export default function useCluster(): IUseCluster {

  // constant variables (mostly uppercase)
  const API_URL = "/api/klaster";


  // contexts
  const { setAlert } = useContext(AlertContext);

  // hooks / states
  const { data: responseData, error: responseError, isValidating, mutate } = useSWR(API_URL, (url) => fetchData<ApiResponseType<Array<ICluster>>>(url, { method: 'GET' }), {
    refreshWhenOffline: true,
    refreshWhenHidden: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  });

  // console.log("Use Cluster / Get List Data { responseData, responseError }", responseData, responseError)

  const [ready, setReady] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const clusters = responseData?.data?.items || [];
  const dataLoading = !responseData;
  const dataError = responseError || responseData?.error;



  // methods

  const insert = async (payload: IUseClusterInserPayload) => {
    const { error } = await fetchData(API_URL, {
      body: JSON.stringify(payload),
      method: "POST",
    });

    if (error) {
      console.error("Error useCluster / create", error);
      setAlert({
        message: {
          severity: "error",
          content: error?.message || '',
        },
      });
      throw error;
    }

    setAlert({
      message: {
        severity: "success",
        content: `Berhasil menambah Klaster Baru`,
      },
    });
    mutate();
  };

  const remove = async (id: number) => {
    const { error } = await fetchData(`${API_URL}?id=${id}`, {
      method: "DELETE"
    });

    if (error) {
      console.error("Error useCluster / delete", error);
      setAlert({
        message: {
          severity: "error",
          content: error?.message || '',
        },
      });
      throw error;
    }

    setAlert({
      message: {
        severity: "success",
        content: `Berhasil menghapus Klaster`,
      },
    });
    mutate();
  }

  const update = async (id: number, payload: IUseClusterInserPayload) => {
    const { error } = await fetchData(`${API_URL}?id=${id}`, {
      body: JSON.stringify(payload),
      method: "PUT"
    });

    if (error) {
      console.error("Error useCluster / update", error);

      setAlert({
        message: {
          severity: "error",
          content: error?.message || '',
        },
      });

      throw error;
    }


    setAlert({
      message: {
        severity: "success",
        content: `Berhasil mengedit Klaster`,
      },
    });

    mutate();
  };

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
    clusters,
    isValidating,
    dataReady: ready,
    dataLoading,
    dataError,
    dataMeta
  }
}