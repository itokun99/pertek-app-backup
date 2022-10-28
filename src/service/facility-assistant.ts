import { ApiProxyEndpoint } from '../config/apiProxyEndpoint';
import { fetchData } from '../lib/dataFetcher';

export interface ICreateFacilityAssitantPayload {
  name: string;
  description: string;
  category_id: number;
}

export async function getFacilityAssistants() {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.FacilityAssistant, {
    method: 'GET',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function createFacilityAssistant(payload: ICreateFacilityAssitantPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.FacilityAssistant, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateFacilityAssistant(id: number, payload: ICreateFacilityAssitantPayload) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.FacilityAssistant}?id=${id}`, {
    body: JSON.stringify(payload),
    method: 'PUT',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteFacilityAssistant(id: number) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.FacilityAssistant}?id=${id}`, {
    method: 'DELETE',
  });

  if (error) {
    throw error;
  }

  return data;
}
