import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import {
  ITenant,
  ApiResponseType,
  ITenantDetail,
  ITenantParent,
  IVendorEntities,
} from "@general-types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IGetVendorParams {
  page?: number;
  limit?: number;
  search?: string;
  property_id?: number;
}

export interface ICreateVendorPayload {
  first_name: string;
  last_name: string;
  profile_picture?: string;
  identity?: string;
  identity_type?: string;
  profile_type?: string;
  address: string;
  tax_number: number;
  emails: { address: string; verified: boolean; id?: number }[];
  phone_numbers: string[] | { number: string }[];
}

export async function getTenant(
  payload: IGetVendorParams
): Promise<ApiResponseType<IVendorEntities[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<IVendorEntities[]>>(
    `${ApiProxyEndpoint.Tenant}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function getVendorById(id: number): Promise<IVendorEntities | undefined> {
  const { data, error } = await fetchData<IVendorEntities>(`${ApiProxyEndpoint.Vendor}?id=${id}`, {
    method: "GET",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function createVendor(payload: ICreateVendorPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Vendor, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteVendor(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Vendor}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateVendor(id: number, payload: ICreateVendorPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Vendor}?id=${id}`,
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
