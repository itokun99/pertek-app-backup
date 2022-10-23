import { NextApiRequest } from 'next';
import { Endpoint } from '@config/apiEndpoint';
import { apiRequest } from '@lib/apiCall';
import { createRequestParams } from '@lib/urllib';
import { ApiResponseType, IRole } from '@types';

export async function getRole(req: NextApiRequest): Promise<[Response, IRole[]]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Role}?${params}`, method: 'GET' });
  const responseBody: IRole[] = await response.json();
  return [response, responseBody];
}

export async function createRole(req: NextApiRequest) {
  const apiResponse = await apiRequest({ req, url: Endpoint.Role, method: 'POST', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateRole(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Role}/${id}`, method: 'PUT', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteRole(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Role}/${id}`, method: 'DELETE' });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}