import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { ApiResponseType, IFacilityCategory } from "@general-types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IGetFacilityCategory {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICreateFacilityCategoryPayload {
  name: string;
  description: string;
}

export async function getFacilityCategory(
  payload: IGetFacilityCategory
): Promise<ApiResponseType<IFacilityCategory[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<Array<IFacilityCategory>>>(
    `${ApiProxyEndpoint.FacilityCategory}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function getFacilityCategoryById(id: number): Promise<IFacilityCategory | undefined> {
  const { data, error } = await fetchData<IFacilityCategory>(
    `${ApiProxyEndpoint.FacilityCategory}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createFacilityCategory(payload: ICreateFacilityCategoryPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.FacilityCategory, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteFacilityCategory(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.FacilityCategory}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateFacilityCategory(id: number, payload: ICreateFacilityCategoryPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.FacilityCategory}?id=${id}`,
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
