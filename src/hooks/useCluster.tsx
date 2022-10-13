import useSWR from 'swr';
import { fetchData, FetcherResponse } from "../lib/dataFetcher";

interface ICreatePayload {
  name: string;
  property_id: string;
  description: string;
}

export default function useCluster() {
  const API_URL = "/api/klaster";

  const { data, error } = useSWR(API_URL);
  const clusters = data?.items || [];
  const dataLoading = !data;
  const dataError = error;

  const insert = async (payload: ICreatePayload) => {
    const { error, data } = await fetchData(API_URL, {
      body: JSON.stringify(payload),
      method: "POST",
    });

    if (error) {
      console.error("Error useCluster / create", error);
    }

    return [data, error];
  };

  const remove = async (id: number) => {
    if (!id) {
      throw new Error("must passing an id");
    }
    const { error, data } = await fetchData(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (error) {
      console.error("Error useCluster / delete", error);
    }

    return [data, error];
  }

  const update = async (id: number, payload: ICreatePayload) => {
    if (!id) {
      throw new Error("must passing an id");
    }

    const { error, data } = await fetchData(`${API_URL}/${id}`, {
      body: JSON.stringify(payload),
      method: "PUT"
    });

    if (error) {
      console.error("Error useCluster / update", error);
    }
    return [data, error];
  };

  return {
    insert,
    remove,
    update,
    clusters,
    dataLoading,
    dataError
  }
}