import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { ITenant, ApiResponseType, ITenantDetail, ITenantParent } from "@general-types";
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
  profile_picture?: string;
  identity?: string;
  identity_type?: string;
  profile_type?: string;
  address: string;
  last_login?: number;
  tax_number?: number;
  emails: { address: string; verified: boolean; id?: number }[];
  phone_numbers: string[] | { number: string }[];
  // default tenant
  property_unit_id: string;
  parent_tenant_id: string;
  resident_status: string;
  tenancy_role?: string;
  family_status: string;
  check_in: Date | null;
  check_out: Date | null;
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

export async function getTenantById(id: string): Promise<ITenantDetail | undefined> {
  const { data, error } = await fetchData<ITenantDetail>(`${ApiProxyEndpoint.Tenant}?id=${id}`, {
    method: "GET",
  });

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

export async function deleteTenant(id: string) {
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

export async function updateTenant(id: string, payload: ICreateTenantPayload) {
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

export async function getTenantParentByUnit(id: string): Promise<ITenantParent[] | undefined> {
  const { data, error } = await fetchData<ITenantParent[]>(
    `${ApiProxyEndpoint.TenantParent}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}
