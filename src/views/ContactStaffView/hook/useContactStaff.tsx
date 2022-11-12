import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { AlertContext } from "@provider/AlertProvider";
import useSWR from "swr";
import { fetchData, FetcherResponseError } from "@lib/dataFetcher";
import { ApiResponseType, IContactStaffEntities } from "@general-types";
import {
  createStaff,
  updateStaff,
  deleteStaff,
  ICreateContactStaffPayload,
  getStaffById,
} from "@service/contact-staff";
import { createUrlParamFromObj } from "@utils/helper";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { swrConfig } from "@config/swrConfig";

interface IUserContactStaff {
  insert: (payload: ICreateContactStaffPayload) => Promise<void>;
  inquiry: (id: number) => Promise<IContactStaffEntities | null | undefined>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateContactStaffPayload) => Promise<void>;
  reload: () => void;
  items: Array<IContactStaffEntities>;
  isReady: boolean;
  isLoading: boolean;
  isError: any;
  isValidating: boolean;
  loadingForm: boolean;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
  dataMeta?: ApiResponseType<Array<IContactStaffEntities>>;
}

export default function useContactStaff(): IUserContactStaff {
  const API_URL = ApiProxyEndpoint.Staff;

  const router = useRouter();
  const params = router.query;

  const paramString = createUrlParamFromObj({ ...params });

  // contexts
  const { setAlert } = useContext(AlertContext);

  // hooks / states
  const {
    data: responseData,
    error: responseError,
    isValidating,
    mutate,
  } = useSWR(
    `${API_URL}${paramString}`,
    (url) => fetchData<ApiResponseType<IContactStaffEntities[]>>(url, { method: "GET" }),
    swrConfig
  );

  const [ready, setReady] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const items = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateContactStaffPayload): Promise<void> => {
    try {
      await createStaff(payload);
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menambah karyawan Baru`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: "error",
          content: error.message || "Terjadi kesalahan",
        },
      });
      throw err;
    }
  };

  const remove = async (id: number): Promise<void> => {
    try {
      await deleteStaff(id);
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menghapus karyawan`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: "error",
          content: error.message || "Terjadi kesalahan",
        },
      });
      throw err;
    }
  };

  const update = async (id: number, payload: ICreateContactStaffPayload) => {
    try {
      await updateStaff(id, payload);
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil mengedit karyawan`,
        },
      });
      mutate();
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: "error",
          content: error.message || "Terjadi kesalahan",
        },
      });
      throw err;
    }
  };

  const inquiry = async (id: number): Promise<IContactStaffEntities | null | undefined> => {
    try {
      const data = await getStaffById(id);
      return data;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: "error",
          content: error?.message || "Terjadi kesalahan",
        },
      });
      return null;
    }
  };

  const reload = (): void => {
    mutate();
  };

  useEffect(() => {
    if (responseData && !ready) {
      setReady(true);
    }
  }, [responseData, ready]);

  return {
    insert,
    remove,
    update,
    inquiry,
    reload,
    setLoadingForm,
    items,
    isValidating,
    isReady: ready,
    isLoading,
    isError,
    dataMeta,
    loadingForm,
  };
}
