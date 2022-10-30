import { fetchData } from "../lib/dataFetcher";
import { ApiProxyEndpoint } from "../config/apiProxyEndpoint";
import { IUnit, ApiResponseType } from "../types";
import { createUrlParamFromObj } from "../utils/helper";

export interface IGetUnitPayload {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICreateUnitPayload {
  name: string;
  property_id: number;
  property_cluster_id: number;
  property_unit_type_id?: number;
  total_area: number;
  electrical_capacity: number;
  bast_docs?: string[];
  bast_date?: number;
  template_invoice_id?: number[];
}

export async function getUnit(
  payload: IGetUnitPayload
): Promise<ApiResponseType<IUnit[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<Array<IUnit>>>(
    `${ApiProxyEndpoint.Unit}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createUnit(payload: ICreateUnitPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Unit, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  // console.log("error ==>", error, data)

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteUnit(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Unit}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateUnit(id: number, payload: ICreateUnitPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Unit}?id=${id}`,
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
