import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { IContact, ApiResponseType, IContactDetail } from "@general-types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IGetContactPayload {
  page?: number;
  limit?: number;
  search?: string;
  property_id?: number;
}

export interface ICreateContactPayload {
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
  emails: { address: string; verified: boolean }[];
  phone_numbers: string[];
}

export async function getContact(
  payload: IGetContactPayload
): Promise<ApiResponseType<IContact[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<Array<IContact>>>(
    `${ApiProxyEndpoint.Contact}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function getContactById(id: number): Promise<IContactDetail | undefined> {
  const { data, error } = await fetchData<IContactDetail>(
    `${ApiProxyEndpoint.Contact}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createContact(payload: ICreateContactPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Contact, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteContact(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Contact}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateContact(id: number, payload: ICreateContactPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Contact}?id=${id}`,
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
