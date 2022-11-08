import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";

export interface ICreateContactPhonePayload {
  contact_id: number | string;
  number: string;
}

export async function createContactPhone(payload: ICreateContactPhonePayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.ContactPhone, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteContactPhone(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.ContactPhone}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateContactPhone(id: number, payload: ICreateContactPhonePayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.ContactPhone}?id=${id}`,
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
