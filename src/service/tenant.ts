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
  property_unit_id:  number;
  contact_id:        number;
  parent_tenancy_id: number;
  resident_status:   string;
  family_status:     string;
  check_in:          Date|null;
  check_out:         Date|null;
}

export async function getTenant(
  payload: IGetTenantPayload
): Promise<ApiResponseType<ITenant[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<Array<ITenant>>>(
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
