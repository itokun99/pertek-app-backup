import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { ITenant, ApiResponseType, ITenantDetail } from "@general-types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IGetTenantPayload {
  page?: number;
  limit?: number;
  search?: string;
  property_id?: number;
}

export interface ICreateTenantPayload {
  first_name: string;
  last_name: string;
  registration_status?: string;
  public_id?: string;
  role_id?: number;
  role_group_id?: number;
  property_id?: number;
  profile_picture?: string;
  identity?: string;
  identity_type?: string;
  profile_type?: string;
  address: string;
  last_login?: number;
  emails: { address: string; verified: boolean, id?: number }[];
  phone_numbers: string[];
}

export async function getTemplateTenant(): Promise<string> {
  const url = `${ApiProxyEndpoint.Template}?model=tenant`;
  const res = await fetch(url);

  if(!res.ok) {
    const p = await res.json();
    throw Promise.reject({ message: p?.message || 'Terjadi Kesalahan' })
  }

  return url;
}

export async function getTenantById(id: number): Promise<ITenantDetail | undefined> {
  const { data, error } = await fetchData<ITenantDetail>(
    `${ApiProxyEndpoint.Tenant}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createTenant(payload: ICreateTenantPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Tenant, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteTenant(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Tenant}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateTenant(id: number, payload: ICreateTenantPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Tenant}?id=${id}`,
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
