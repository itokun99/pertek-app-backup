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
  insert: () => Promise<void>;
  remove: (id: string) => Promise<void>;
  update: () => Promise<void>;
  inquiry: (id: string) => Promise<IFacility | null | undefined>;
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
    formFacility: boolean;
    addCategory: boolean;
  };
  //form facility
  formFacility: IForm;
  // form category
  formCategory: {
    name: string;
    description: string;
  };
  handleOnInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "facility" | "category"
  ) => void;
  handleSelectChange: (name: string, value: any) => void;
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

  // form category
  const [formCategory, setFormCategory, resetFormCategory] = useForm({
    name: "",
    description: "",
  });
  // modal state
  const [modalControll, setModalControll, resetModalControll] = useForm({
    formFacility: false,
    addCategory: false,
  });

  const facilities = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  const handleCloseModalCategory = () => {
    resetModalControll();
    resetFormCategory();
    resetFormFacility();
  };

  const insert = async () => {
    const payload: ICreateFacilityPayload = {
      name: formFacility.name,
      code: formFacility.code,
      description: formFacility.description,
      category_id: String(formFacility.category?.value),
      facility_type: formFacility.facility_type,
      max_capacity: formFacility.max_capacity,
      slot_duration: formFacility.slot_duration,
      min_order_duration: formFacility.min_order_duration,
      max_order_duration: formFacility.max_order_duration,
      min_order_gap: formFacility.min_order_gap,
      max_order_gap: formFacility.max_order_gap,
      max_cancel_gap: formFacility.max_cancel_gap,
      price: Number(formatRemoveNonDigit(String(formFacility.price))),
      status: formFacility.status,
      pictures: formFacility.pictures,
      slot_start: formFacility.slot_start,
      slot_end: formFacility.slot_end,
      open_hour: formFacility.open_hour,
      close_hour: formFacility.close_hour,
    };
    setLoadingForm(true);
    createFacility(payload)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil menambahkan Fasilitas`,
          },
        });
        mutate();
        handleCloseModalCategory();
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
  const remove = async (id: string) => {
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

  const update = async () => {
    setLoadingForm(true);
    const payload: ICreateFacilityPayload = {
      name: formFacility.name,
      code: formFacility.code,
      description: formFacility.description,
      category_id: String(formFacility.category?.value),
      facility_type: formFacility.facility_type,
      max_capacity: formFacility.max_capacity,
      slot_duration: formFacility.slot_duration,
      min_order_duration: formFacility.min_order_duration,
      max_order_duration: formFacility.max_order_duration,
      min_order_gap: formFacility.min_order_gap,
      max_order_gap: formFacility.max_order_gap,
      max_cancel_gap: formFacility.max_cancel_gap,
      price: Number(formatRemoveNonDigit(String(formFacility.price))),
      status: formFacility.status,
      pictures: formFacility.pictures,
      slot_start: formFacility.slot_start,
      slot_end: formFacility.slot_end,
      open_hour: formFacility.open_hour,
      close_hour: formFacility.close_hour,
    };
    updateFacility(formFacility.id, payload)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil mengedit Fasilitas`,
          },
        });
        mutate();
        handleCloseModalCategory();
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

  // handler
  const handleOnInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "facility" | "category"
  ) => {
    const { name, value } = event.target;
    switch (type) {
      case "facility":
        setFormFacility(name, value);
        break;
      case "category":
        setFormCategory(name, value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormFacility(name, value);
  };

  return {
    meta,
    insert,
    remove,
    update,
    inquiry,
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
    handleOnInputChange,
    handleSelectChange,
    // form facility
    formFacility,
    // form category
    formCategory,
    handleAddCategory,
    handleCloseModalCategory,
  };
}
