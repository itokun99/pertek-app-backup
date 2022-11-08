import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { AlertContext } from "@provider/AlertProvider";
import useSWR from "swr";
import { fetchData, FetcherResponseError } from "@lib/dataFetcher";
import { ApiResponseType, IVendorEntities } from "@general-types";
import {
  createVendor,
  updateVendor,
  deleteVendor,
  ICreateVendorPayload,
  getVendorById,
} from "@service/vendor";
import { createUrlParamFromObj } from "@utils/helper";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { swrConfig } from "@config/swrConfig";

interface IUseVendor {
  insert: (payload: ICreateVendorPayload) => Promise<void>;
  inquiry: (id: number) => Promise<IVendorEntities | null | undefined>;
  remove: (id: number) => Promise<void>;
  update: (id: number, payload: ICreateVendorPayload) => Promise<void>;
  reload: () => void;
  items: Array<IVendorEntities>;
  isReady: boolean;
  isLoading: boolean;
  isError: any;
  isValidating: boolean;
  loadingForm: boolean;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
  dataMeta?: ApiResponseType<Array<IVendorEntities>>;
}

export default function useVendor(): IUseVendor {
  const API_URL = ApiProxyEndpoint.Vendor;

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
    (url) => fetchData<ApiResponseType<IVendorEntities[]>>(url, { method: "GET" }),
    swrConfig
  );

  const [ready, setReady] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const dataMeta = responseData?.data;
  const items = responseData?.data?.items || [];
  const isLoading = !responseData;
  const isError = responseError || responseData?.error;

  // methods
  const insert = async (payload: ICreateVendorPayload): Promise<void> => {
    try {
      await createVendor(payload);
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menambah Vendor Baru`,
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
      await deleteVendor(id);
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil menghapus Vendor`,
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

  const update = async (id: number, payload: ICreateVendorPayload) => {
    try {
      await updateVendor(id, payload);
      setAlert({
        message: {
          severity: "success",
          content: `Berhasil mengedit Vendor`,
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

  const inquiry = async (id: number): Promise<IVendorEntities | null | undefined> => {
    try {
      const data = await getVendorById(id);
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
