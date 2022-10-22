import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import { ApiProxyEndpoint } from '../../../config/apiProxyEndpoint';
import { fetchData, FetcherResponseError } from '../../../lib/dataFetcher';
import { AlertContext } from '../../../provider/AlertProvider';
import { createFacility, deleteFacility, ICreateFacilityPayload, updateFacility } from '../../../service/facility';
import { ApiResponseType, IFacility } from '../../../types';
import { createUrlParamFromObj } from '../../../utils/helper';

export interface IUseFacility {
  insert: (payload: ICreateFacilityPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateFacilityPayload) => Promise<void>;
  reload: () => void;
  meta?: ApiResponseType<IFacility[]>;
  facilities: IFacility[];
  isReady: boolean;
  isValidating: boolean;
  isLoading: boolean;
  isError: boolean;
}

export default function useFacility(): IUseFacility {
  const BASE_URL = ApiProxyEndpoint.Facility;

  const router = useRouter();
  const params = router.query;
  const paramString = createUrlParamFromObj({ ...params });

  const { setAlert } = useContext(AlertContext);

  const {
    data: responseData,
    error: responseError,
    mutate,
    isValidating,
  } = useSWR(`${BASE_URL}${paramString}`, (url) => fetchData<ApiResponseType<IFacility[]>>(url, { method: 'GET' }), {
    refreshWhenOffline: true,
    refreshWhenHidden: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const [isReady, setIsReady] = useState<boolean>(false);
  const facilities = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  const insert = async (payload: ICreateFacilityPayload) => {
    createFacility(payload)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menambahkan Fasilitas`,
          },
        });
        mutate();
      })
      .catch((err: FetcherResponseError) => {
        setAlert({
          message: {
            severity: 'error',
            content: err.message || '',
          },
        });
      });
  };

  // create remove function
  const remove = async (id: number) => {
    deleteFacility(id)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menghapus Fasilitas`,
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

  const update = async (id: number, payload: ICreateFacilityPayload) => {
    updateFacility(id, payload)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil mengedit Fasilitas`,
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

  return {
    meta,
    insert,
    remove,
    update,
    facilities,
    reload,
    isLoading,
    isReady,
    isValidating,
    isError,
  };
}
