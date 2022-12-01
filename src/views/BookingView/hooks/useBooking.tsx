import { swrConfig } from "@config/swrConfig";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { fetchData, FetcherResponseError } from "@lib/dataFetcher";
import { AlertContext } from "@provider/AlertProvider";
import {
  createBooking,
  deleteBooking,
  ICreateBookingPayload,
  updateBooking,
  updateBookingState,
} from "@service/booking";
import { ApiResponseType, IBooking } from "@types";
import { createUrlParamFromObj } from "@utils/helper";
import useForm from "@hooks/useForm";
import { IForm } from "@components/dialog/ModalBooking/FormBooking/FormBooking.interface";

// create booking hooks interface
export interface IUseBooking {
  insert: (payload: ICreateBookingPayload) => Promise<void>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateBookingPayload) => Promise<void>;
  updateStatus: (id: number, status: string) => Promise<void>;
  reload: () => void;
  meta?: ApiResponseType<IBooking[]>;
  bookings: IBooking[];
  isLoading: boolean;
  isValidating: boolean;
  isError: boolean;
  isReady: boolean;
  //modal
  setModalControll: <T>(field: string, value: T) => void;
  resetModalControll: () => void;
  modalControll: {
    statusBooking: boolean;
    addBooking: boolean;
  };
  // form
  form: IForm;
  setForm: <T>(field: string, value: T) => void;
  resetForm: () => void;
  loadingForm: boolean;
}

export default function useBooking(): IUseBooking {
  const API_URL = ApiProxyEndpoint.Booking;
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
    `${API_URL}${paramString}`,
    (url) => fetchData<ApiResponseType<IBooking[]>>(url, { method: "GET" }),
    swrConfig
  );

  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [modalControll, setModalControll, resetModalControll] = useForm({
    statusBooking: false,
    addBooking: false,
  });
  const [form, setForm, resetForm] = useForm<IForm>({
    facility: null,
    bookingSlot: null,
    tenant: null,
    propertyUnit: null,
    assistances: [],
    description: "",
    penalty: 0,
    status: "Requested",
    slot_date: "",
    slot: {
      start: "",
      end: "",
    },
  });

  const bookings = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;
  const meta = responseData?.data;

  // create insert function
  const insert = async (payload: ICreateBookingPayload) => {
    setLoadingForm(true);
    createBooking(payload)
      .then((res) => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil membuat Booking`,
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

  //   create update function
  const update = async (id: number, payload: ICreateBookingPayload) => {
    updateBooking(id, payload)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil mengubah Booking`,
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

  const updateStatus = async (booking_id: number, status: string) => {
    updateBookingState(booking_id, { status, booking_id })
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil mengubah status Booking`,
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

  //  create remove function
  const remove = async (id: number) => {
    deleteBooking(id)
      .then(() => {
        setAlert({
          message: {
            severity: "success",
            content: `Berhasil menghapus Booking`,
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

  //   create reload function
  const reload = () => {
    mutate();
  };

  //   create effect hook to flag if isReady is true
  useEffect(() => {
    if (responseData && !isReady) {
      setIsReady(true);
    }
  }, [responseData, isReady]);

  return {
    meta,
    insert,
    update,
    remove,
    reload,
    updateStatus,
    isError,
    isLoading,
    isValidating,
    isReady,
    bookings,
    // state modal
    setModalControll,
    modalControll,
    resetModalControll,
    // state form
    form,
    setForm,
    resetForm,
    loadingForm,
  };
}
