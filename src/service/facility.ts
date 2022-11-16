import { ApiResponseType, IFacility } from "@types";
import { createUrlParamFromObj } from "@utils/helper";
import { ApiProxyEndpoint } from "../config/apiProxyEndpoint";
import { fetchData } from "../lib/dataFetcher";

export interface ICreateFacilityPayload {
  name: string;
  description: string;
  category_id: number;
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
export async function updateFacility(id: number, payload: ICreateFacilityPayload) {
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
export async function deleteFacility(id: number) {
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
