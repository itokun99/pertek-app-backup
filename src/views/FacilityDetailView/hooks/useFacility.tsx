import { IForm } from "@components/dialog/ModalFacility/FormFacility.interface";
import { swrConfig } from "@config/swrConfig";
import useForm from "@hooks/useForm";
import { createFacilityCategory } from "@service/facility-category";
import { formatRemoveNonDigit } from "@utils/formatCurrency";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { ApiProxyEndpoint } from "../../../config/apiProxyEndpoint";
import { fetchData, FetcherResponseError } from "../../../lib/dataFetcher";
import { AlertContext } from "../../../provider/AlertProvider";
import {
  createFacility,
  deleteFacility,
  ICreateFacilityPayload,
  updateFacility,
  getFacilityById,
} from "../../../service/facility";
import { ApiResponseType, IFacility } from "../../../types";
import { createUrlParamFromObj } from "../../../utils/helper";

export interface IUseFacility {
  inquiry: (id: string) => Promise<IFacility | null | undefined>;
  reload: () => void;
  setCurrentFacility: (facility: IFacility | null) => void;
  currentFacility: IFacility | null;
  facilities: IFacility | null;
  isReady: boolean;
  isValidating: boolean;
  isLoading: boolean;
  isError: boolean;
  //form facility
  formFacility: IForm;
  loadingForm: boolean;
}

export default function useFacility(): IUseFacility {
  const BASE_URL = ApiProxyEndpoint.Facility;

  const router = useRouter();
  const params = router.query;
  const paramString = createUrlParamFromObj({ ...params, id: params?.facility_id });

  const { setAlert } = useContext(AlertContext);

  const {
    data: responseData,
    error: responseError,
    mutate,
    isValidating,
  } = useSWR(
    `${BASE_URL}${paramString}`,
    (url) => fetchData<IFacility>(url, { method: "GET" }),
    swrConfig
  );

  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentFacility, setCurrentFacility] = useState<IFacility | null>(null);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const [formFacility, setFormFacility, resetFormFacility, setBulkFormFacility] = useForm<IForm>({
    id: "",
    name: "",
    code: "",
    description: "",
    category: {
      label: "",
      value: "",
    },
    facility_type: "Dedicated",
    max_capacity: 0,
    slot_duration: 0,
    min_order_duration: 0,
    max_order_duration: 0,
    min_order_gap: 0,
    max_order_gap: 0,
    max_cancel_gap: 0,
    price: 0,
    status: "Open",
    pictures: [],
    slot_start: "",
    slot_end: "",
    open_hour: "",
    close_hour: "",
  });

  // modal state
  const [modalControll, setModalControll, resetModalControll] = useForm({
    formFacility: false,
    addCategory: false,
  });

  const facilities = responseData?.data || null;
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  const inquiry = async (id: string): Promise<IFacility | null | undefined> => {
    try {
      setModalControll("formFacility", true);
      const data = await getFacilityById(id);
      if (data) {
        setBulkFormFacility({
          id: data.id,
          name: data.name,
          code: data.code,
          description: data.description,
          category: {
            label: data.category.name,
            value: String(data.category.id),
          },
          facility_type: "Dedicated",
          max_capacity: data.max_capacity,
          slot_duration: data.slot_duration,
          min_order_duration: data.min_order_duration,
          max_order_duration: data.max_order_duration,
          min_order_gap: data.min_order_gap,
          max_order_gap: data.max_order_gap,
          max_cancel_gap: data.max_cancel_gap,
          price: data.price,
          status: data.status,
          pictures: data.pictures,
          slot_start: data.slot_start,
          slot_end: data.slot_end,
          open_hour: data.open_hour,
          close_hour: data.close_hour,
        });
      }
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: "error",
          content: error?.message || "Terjadi kesalahan",
        },
      });
      setModalControll("formFacility", false);
      return null;
    }
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
    inquiry,
    setCurrentFacility,
    currentFacility,
    facilities,
    reload,
    isLoading,
    isReady,
    isValidating,
    isError,
    loadingForm,
    // form facility
    formFacility
  };
}
