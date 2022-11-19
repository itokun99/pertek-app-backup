import { swrConfig } from "@config/swrConfig";
import useForm from "@hooks/useForm";
import { createFacilityCategory } from "@service/facility-category";
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
} from "../../../service/facility";
import { ApiResponseType, IFacility } from "../../../types";
import { createUrlParamFromObj } from "../../../utils/helper";

export interface IUseFacility {
  insert: (payload: ICreateFacilityPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateFacilityPayload) => Promise<void>;
  reload: () => void;
  setCurrentFacility: (facility: IFacility | null) => void;
  currentFacility: IFacility | null;
  meta?: ApiResponseType<IFacility[]>;
  facilities: IFacility[];
  isReady: boolean;
  isValidating: boolean;
  isLoading: boolean;
  isError: boolean;
  // modal
  setModalControll: <T>(field: string, value: T) => void;
  resetModalControll: () => void;
  modalControll: {
    addCategory: boolean;
  };
  // form category
  formCategory: {
    name: string;
    description: string;
  };
  handleFormCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCategory: () => void;
  handleCloseModalCategory: () => void;
  loadingForm: boolean;
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
  } = useSWR(
    `${BASE_URL}${paramString}`,
    (url) => fetchData<ApiResponseType<IFacility[]>>(url, { method: "GET" }),
    swrConfig
  );

  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentFacility, setCurrentFacility] = useState<IFacility | null>(null);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  // form category
  const [formCategory, setFormCategory, resetFormCategory] = useForm({
    name: "",
    description: "",
  });
  // modal state
  const [modalControll, setModalControll, resetModalControll] = useForm({
    addCategory: false,
  });

  const facilities = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  const insert = async (payload: ICreateFacilityPayload) => {
    createFacility(payload)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil menambahkan Fasilitas`,
          },
        });
        mutate();
      })
      .catch((err: FetcherResponseError) => {
        setAlert({
          message: {
            severity: "error",
            content: err.message || "",
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
            severity: "success",
            content: `Berhasil menghapus Fasilitas`,
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
      });
  };

  const update = async (id: number, payload: ICreateFacilityPayload) => {
    updateFacility(id, payload)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil mengedit Fasilitas`,
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

  // hook category blok
  const handleAddCategory = () => {
    const payload = {
      name: formCategory.name,
      description: formCategory.description,
    };
    setLoadingForm(true);
    createFacilityCategory(payload)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil menambahkan Fasilitas`,
          },
        });
        setLoadingForm(false);
        resetFormCategory();
        resetModalControll();
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

  const handleCloseModalCategory = () => {
    resetModalControll();
    resetFormCategory();
  };
  // handler
  const handleFormCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormCategory(name, value);
  };

  return {
    meta,
    insert,
    remove,
    update,
    setCurrentFacility,
    currentFacility,
    facilities,
    reload,
    isLoading,
    isReady,
    isValidating,
    isError,
    // modal
    modalControll,
    setModalControll,
    resetModalControll,

    loadingForm,
    // form category
    formCategory,
    handleFormCategoryChange,
    handleAddCategory,
    handleCloseModalCategory,
  };
}
