import { fetchData } from '../lib/dataFetcher';
import { ApiProxyEndpoint } from '../config/apiProxyEndpoint';
import { IRoleGroup, ApiResponseType } from '../types';
import { createUrlParamFromObj } from '../utils/helper';

export interface IGetUnitPayload {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICreateRoleGroupPayload{
  name:         string;
  property_id:  number;
  capabilities: number[];
  menus:        number[];
}


export async function getRoleGroup(payload: IGetUnitPayload): Promise<ApiResponseType<IRoleGroup[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<Array<IRoleGroup>>>(`${ApiProxyEndpoint.RoleGroup}${params}`, {
    method: 'GET',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function createRoleGroup(payload: ICreateRoleGroupPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.RoleGroup, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteRoleGroup(id: number) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.RoleGroup}?id=${id}`, {
    method: 'DELETE',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateRoleGroup(id: number, payload: ICreateRoleGroupPayload) {
  const { data, error } = await fetchData<{ message: string }>(`${ApiProxyEndpoint.RoleGroup}?id=${id}`, {
    body: JSON.stringify(payload),
    method: 'PUT',
  });

  if (error) {
    throw error;
  }

  return data;
}
