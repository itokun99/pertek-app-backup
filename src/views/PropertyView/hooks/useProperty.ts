import { ApiProxyEndpoint } from '@config/apiProxyEndpoint';
import { swrConfig } from '@config/swrConfig';
import { fetchData } from '@lib/dataFetcher';
import { AlertContext } from '@provider/AlertProvider';
import { ApiResponseType, IProperty } from '@types';
import { createUrlParamFromObj } from '@utils/helper';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

export const useProperty = () => {
  const BASE_URL = ApiProxyEndpoint.Property;

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
    `${BASE_URL}/${paramString}`,
    (url) => fetchData<ApiResponseType<IProperty[]>>(url, { method: 'GET' }),
    swrConfig
  );

  const [isReady, setIsReady] = useState(false);
  const properties = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;

  useEffect(() => {
    if (responseData && !isReady) {
      setIsReady(true);
    }
  }, [responseData, isReady]);

  return {
    properties,
    isReady,
    isError,
    isLoading,
    isValidating,
  };
};
