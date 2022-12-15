import { IFacilityAssistant } from "@types";
import { ApiProxyEndpoint } from "../config/apiProxyEndpoint";
import { fetchData } from "../lib/dataFetcher";

export interface ICreateFacilityAssitantPayload {
  staff_id: string;
  facility_category_id: string;
}

export async function getFacilityAssistants() {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.FacilityAssistant, {
    method: "GET",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFacilityAssitantsById(
  id: string
): Promise<IFacilityAssistant | undefined> {
  const { data, error } = await fetchData<IFacilityAssistant>(
    `${ApiProxyEndpoint.FacilityAssistant}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createFacilityAssistant(payload: ICreateFacilityAssitantPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.FacilityAssistant, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateFacilityAssistant(id: string, payload: ICreateFacilityAssitantPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.FacilityAssistant}?id=${id}`,
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

export async function deleteFacilityAssistant(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.FacilityAssistant}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}
