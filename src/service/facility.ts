import { ApiResponseType, IFacility } from "@types";
import { createUrlParamFromObj } from "@utils/helper";
import { ApiProxyEndpoint } from "../config/apiProxyEndpoint";
import { fetchData } from "../lib/dataFetcher";

export interface ICreateFacilityPayload {
  name: string;
  code: string;
  description: string;
  category_id: string;
  facility_type: string;
  max_capacity: number;
  slot_duration: number;
  min_order_duration: number;
  max_order_duration: number;
  min_order_gap: number;
  max_order_gap: number;
  max_cancel_gap: number;
  price: number;
  status: string;
  pictures: string[];
  slot_start: string;
  slot_end: string;
  open_hour: string;
  close_hour: string;
}

export interface IGetFacilitiesPayload {
  page?: number;
  limit?: number;
  search?: string;
}

// create function to get list of facilities
export async function getFacilitiesWithParams(payload: IGetFacilitiesPayload) {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<Array<IFacility>>>(
    `${ApiProxyEndpoint.Facility}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

// create function to get list of facilities
export async function getFacilities() {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Facility, {
    method: "GET",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFacilityById(id: string): Promise<IFacility | undefined> {
  const { data, error } = await fetchData<IFacility>(`${ApiProxyEndpoint.Facility}?id=${id}`, {
    method: "GET",
  });

  if (error) {
    throw error;
  }

  return data;
}

// create facility function
export async function createFacility(payload: ICreateFacilityPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Facility, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

// create function to update facility
export async function updateFacility(id: string, payload: ICreateFacilityPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Facility}?id=${id}`,
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

// create function to delete facility
export async function deleteFacility(id: string) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Facility}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}
