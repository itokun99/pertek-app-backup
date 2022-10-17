import { fetchData } from "../lib/dataFetcher";
import { ApiProxyEndpoint } from '../config/apiProxyEndpoint';
import { IUnit, ApiResponseType } from '../types';
import { createUrlParamFromObj } from '../utils/helper';



export interface IGetUnitTypePayload {
  page?: number;
  limit?: number;
}

export interface ICreateUnitTypePayload {
  type_name: string,
  description: string,
  property_id: number
}




export async function getUnitType(payload: IGetUnitTypePayload): Promise<ApiResponseType<IUnit[]> | undefined> {

  const params = createUrlParamFromObj(payload)

  const { data, error } =  await fetchData<ApiResponseType<Array<IUnit>>>(`${ApiProxyEndpoint.UnitType}${params}`, {
    method: "GET",
  });

  if(error) {
    throw error
  }

  return data
}

export async function createUnitType(payload: ICreateUnitTypePayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.UnitType, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteUnitType(id: number) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.UnitType}?id=${id}`, {
    method: "DELETE"
  });

  if (error) {
    throw error;
  }

  return data
}

export async function updateUnitType(id: number, payload: ICreateUnitTypePayload) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.UnitType}?id=${id}`, {
    body: JSON.stringify(payload),
    method: "PUT"
  });

  if (error) {
    throw error;
  }

  return data
}