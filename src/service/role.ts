import { fetchData } from '@lib/dataFetcher';
import { ApiProxyEndpoint } from '@config/apiProxyEndpoint';
import { IRole } from '@types';
import { createUrlParamFromObj } from '@utils/helper';

export interface IGetRolePayload {
  search?: string;
}

export interface ICreateRolePayload {
  name: string;
}

export async function getRole(payload: IGetRolePayload): Promise<IRole[] | undefined> {
  const params = createUrlParamFromObj(payload);
  const { data, error } = await fetchData<IRole[]>(`${ApiProxyEndpoint.Role}${params}`, {
    method: 'GET',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function createRole(payload: ICreateRolePayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Role, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteRole(id: number) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.Role}?id=${id}`, {
    method: 'DELETE',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateRole(id: number, payload: ICreateRolePayload) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.Role}?id=${id}`, {
    body: JSON.stringify(payload),
    method: 'PUT',
  });

  if (error) {
    throw error;
  }

  return data;
}
