import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";

export interface ICreateContactEmailPayload {
  contact_id: number | string;
  address: string;
  verified: boolean;
}

export async function createContactEmail(payload: ICreateContactEmailPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.ContactEmail, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteContactEmail(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.ContactEmail}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateContactEmail(id: number, payload: ICreateContactEmailPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.ContactEmail}?id=${id}`,
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
