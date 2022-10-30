import { swrConfig } from '@config/swrConfig';
import {
  createFacilityAssistant,
  deleteFacilityAssistant,
  ICreateFacilityAssitantPayload,
  updateFacilityAssistant,
} from '@service/facility-assistant';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { ApiProxyEndpoint } from '../../../config/apiProxyEndpoint';
import { fetchData, FetcherResponseError } from '../../../lib/dataFetcher';
import { AlertContext } from '../../../provider/AlertProvider';
import { ApiResponseType, IFacilityAssistant } from '../../../types';
import { createUrlParamFromObj } from '../../../utils/helper';

export interface IUseFacilityAssistant {
  insert: (payload: ICreateFacilityAssitantPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateFacilityAssitantPayload) => Promise<void>;
  reload: () => void;
  setCurrentFacilityAssistant: (assistant: IFacilityAssistant | null) => void;
  currentFacilityAssistant: IFacilityAssistant | null;
  meta?: ApiResponseType<IFacilityAssistant[]>;
  assistants: IFacilityAssistant[];
  isReady: boolean;
  isValidating: boolean;
  isLoading: boolean;
  isError: boolean;
}

export default function useFacilityAssistant(): IUseFacilityAssistant {
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
  } = useSWR(
    `${BASE_URL}${paramString}`,
    (url) => fetchData<ApiResponseType<IFacilityAssistant[]>>(url, { method: 'GET' }),
    swrConfig
  );

  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentFacilityAssistant, setCurrentFacilityAssistant] = useState<IFacilityAssistant | null>(null);

  const assistants = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  const insert = async (payload: ICreateFacilityAssitantPayload) => {
    createFacilityAssistant(payload)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menambahkan Asisten Fasilitas`,
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
    deleteFacilityAssistant(id)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil menghapus Asisten Fasilitas`,
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

  const update = async (id: number, payload: ICreateFacilityAssitantPayload) => {
    updateFacilityAssistant(id, payload)
      .then(() => {
        setAlert({
          message: {
            severity: 'success',
            content: `Berhasil mengedit asisten Fasilitas`,
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
    if (responseData && !isReady) {
      setIsReady(true);
    }
  }, [responseData, isReady]);

  return {
    meta,
    insert,
    remove,
    update,
    setCurrentFacilityAssistant,
    currentFacilityAssistant,
    assistants,
    reload,
    isLoading,
    isReady,
    isValidating,
    isError,
  };
}
