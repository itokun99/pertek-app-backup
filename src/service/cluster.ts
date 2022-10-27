import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { ICluster, ApiResponseType } from "@general-types";
import { createUrlParamFromObj } from "@utils/helper";
export interface IGetClusterPayload {
  page?: number;
  limit?: number;
  property_id?: number;
  search?: string;
}

export interface ICreateClusterPayload {
  name: string;
  property_id: number;
  description: string;
}

export async function getCluster(
  payload: IGetClusterPayload
): Promise<ApiResponseType<ICluster[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<Array<ICluster>>>(
    `${ApiProxyEndpoint.Cluster}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createCluster(payload: ICreateClusterPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Cluster, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCluster(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Cluster}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCluster(id: number, payload: ICreateClusterPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Cluster}?id=${id}`,
    {
      body: JSON.stringify(payload),
      method: "PUT",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}
