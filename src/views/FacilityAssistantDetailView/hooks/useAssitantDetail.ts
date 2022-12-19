import { IForm } from "@components/dialog/ModalFacilityAsisten/FormFacilityAsisten";
import { swrConfig } from "@config/swrConfig";
import useForm from "@hooks/useForm";
import {
  createFacilityAssistant,
  deleteFacilityAssistant,
  ICreateFacilityAssitantPayload,
  updateFacilityAssistant,
  getFacilityAssitantsById,
} from "@service/facility-assistant";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { fetchData, FetcherResponseError } from "@lib/dataFetcher";
import { AlertContext } from "@provider/AlertProvider";
import { ApiResponseType, IFacilityAssistant } from "@types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IUseAssistantDetail {
  reload: () => void;
  assistant: IFacilityAssistant | null;
  isReady: boolean;
  isValidating: boolean;
  isLoading: boolean;
  isError: boolean;
}

export default function useAssistantDetail(): IUseAssistantDetail {
  const BASE_URL = ApiProxyEndpoint.FacilityAssistant;

  const router = useRouter();
  const params = router.query;
  const paramString = createUrlParamFromObj({ ...params, id: params?.assistant_id });

  const { setAlert } = useContext(AlertContext);

  const {
    data: responseData,
    error: responseError,
    mutate,
    isValidating,
  } = useSWR(
    params?.assistant_id ? `${BASE_URL}${paramString}` : "",
    (url: string) => (url ? fetchData<IFacilityAssistant>(url, { method: "GET" }) : undefined),
    swrConfig
  );

  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [currentFacilityAssistant, setCurrentFacilityAssistant] =
    useState<IFacilityAssistant | null>(null);

  const assistant = responseData?.data || null;
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  const reload = (): void => {
    mutate();
  };

  useEffect(() => {
    if (responseData && !isReady) {
      setIsReady(true);
    }
  }, [responseData, isReady]);

  return {
    assistant,
    reload,
    isLoading,
    isReady,
    isValidating,
    isError,
  };
}
