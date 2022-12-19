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
import { AlertContext } from "../../../provider/AlertProvider";
import { ApiResponseType, IFacilityAssistant } from "@types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IUseFacilityAssistant {
  remove: (id: number) => Promise<void>;
  inquiry: (id: string) => Promise<IFacilityAssistant | null | undefined>;
  reload: () => void;
  setCurrentFacilityAssistant: (assistant: IFacilityAssistant | null) => void;
  currentFacilityAssistant: IFacilityAssistant | null;
  meta?: ApiResponseType<IFacilityAssistant[]>;
  assistants: IFacilityAssistant[];
  isReady: boolean;
  isValidating: boolean;
  isLoading: boolean;
  isError: boolean;
  onSubmit: () => void;
  //form facility assistant
  form: IForm;
  setForm: <T>(field: string, value: T) => void;
  resetForm: () => void;

  // modal
  setModalControll: <T>(field: string, value: T) => void;
  resetModalControll: () => void;
  modalControll: {
    formFacilityAsisten: boolean;
  };
}

export default function useFacilityAssistant(): IUseFacilityAssistant {
  const BASE_URL = ApiProxyEndpoint.FacilityAssistant;

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
    (url) => fetchData<ApiResponseType<IFacilityAssistant[]>>(url, { method: "GET" }),
    swrConfig
  );

  const [isReady, setIsReady] = useState<boolean>(false);
  const [modalControll, setModalControll, resetModalControll] = useForm({
    formFacilityAsisten: false,
  });
  const [form, setForm, resetForm, setBulkForm] = useForm<IForm>({
    id: "",
    category: null,
    staff: null,
  });
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const [currentFacilityAssistant, setCurrentFacilityAssistant] =
    useState<IFacilityAssistant | null>(null);

  const assistants = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  const insert = async (payload: ICreateFacilityAssitantPayload) => {
    createFacilityAssistant(payload)
      .then((res) => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil menambahkan Asisten Fasilitas`,
          },
        });
        mutate();
        resetModalControll();
        resetForm();
        setLoadingForm(false);
        return res;
      })
      .catch((err: FetcherResponseError) => {
        setAlert({
          message: {
            severity: "error",
            content: err.message || "",
          },
        });
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  // create remove function
  const remove = async (id: number) => {
    deleteFacilityAssistant(id)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil menghapus Asisten Fasilitas`,
          },
        });
        mutate();
      })
      .catch((err: FetcherResponseError) => {
        setAlert({
          message: {
            severity: "error",
            content: err?.message || "",
          },
        });
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  const update = async (payload: ICreateFacilityAssitantPayload) => {
    updateFacilityAssistant(form.id, payload)
      .then((res) => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil mengedit asisten Fasilitas`,
          },
        });
        mutate();
        resetModalControll();
        resetForm();
        setLoadingForm(false);
        return res;
      })
      .catch((err: FetcherResponseError) => {
        setAlert({
          message: {
            severity: "error",
            content: err?.message || "",
          },
        });
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  const inquiry = async (id: string): Promise<IFacilityAssistant | null | undefined> => {
    try {
      setModalControll("formFacilityAsisten", true);
      const data = await getFacilityAssitantsById(id);
      if (data) {
        setBulkForm({
          id: String(data.id),
          category: {
            value: String(data.facility_category.id),
            label: data.facility_category.name,
          },
          staff: {
            value: String(data.contact.id),
            label: data.contact.first_name + " " + data.contact.last_name,
          },
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
      setModalControll("formFacilityAsisten", false);
      return null;
    }
  };

  const reload = (): void => {
    mutate();
  };

  const onSubmit = () => {
    const payload = {
      staff_id: String(form.staff?.value),
      facility_category_id: String(form.category?.value),
    };

    form.id ? update(payload) : insert(payload);
  };

  useEffect(() => {
    if (responseData && !isReady) {
      setIsReady(true);
    }
  }, [responseData, isReady]);

  return {
    meta,
    remove,
    setCurrentFacilityAssistant,
    currentFacilityAssistant,
    assistants,
    reload,
    inquiry,
    isLoading,
    isReady,
    isValidating,
    isError,
    onSubmit,
    // form facility assistant
    form,
    setForm,
    resetForm,
    // modal
    modalControll,
    setModalControll,
    resetModalControll,
  };
}
