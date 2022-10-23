import { NextApiRequest } from 'next';
import { Endpoint } from '@config/apiEndpoint';
import { apiRequest } from '@lib/apiCall';
import { createRequestParams } from '@lib/urllib';
import { ApiResponseType, IRoleGroup } from '@types';

export async function getRoleGroup(req: NextApiRequest): Promise<[Response, ApiResponseType<IRoleGroup>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.RoleGroup}?${params}`, method: 'GET' });
  const responseBody: ApiResponseType<IRoleGroup> = await response.json();
  return [response, responseBody];
}

export async function createRoleGroup(req: NextApiRequest) {
  const apiResponse = await apiRequest({ req, url: Endpoint.RoleGroup, method: 'POST', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateRoleGroup(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.RoleGroup}/${id}`, method: 'PUT', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteRoleGroup(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.RoleGroup}/${id}`, method: 'DELETE' });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}