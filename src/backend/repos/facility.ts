import { NextApiRequest } from 'next';
import { Endpoint } from '../../config/apiEndpoint';
import { apiRequest } from '../../lib/apiCall';
import { createRequestParams } from '../../lib/urllib';
import { ApiResponseType, IFacility } from '../../types';
import { createController } from '../controllers/base';

export async function getFacility(req: NextApiRequest): Promise<[Response, ApiResponseType<IFacility>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Facility}?${params}`, method: 'GET' });
  const responseBody: ApiResponseType<IFacility> = await response.json();

  return [response, responseBody];
}

export async function createFacility(req: NextApiRequest): Promise<[Response, ApiResponseType<IFacility>]> {
  const apiResponse = await apiRequest({ req, url: Endpoint.Facility, method: 'POST', body: req.body });
  const responseBody = await apiResponse.json();

  return [apiResponse, responseBody];
}

export async function updateFacility(req: NextApiRequest): Promise<[Response, ApiResponseType<IFacility>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Facility}/${id}`, method: 'PUT', body: req.body });
  const responseBody = await apiResponse.json();

  return [apiResponse, responseBody];
}

export async function deleteFacility(req: NextApiRequest): Promise<[Response, ApiResponseType<IFacility>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Facility}/${id}`, method: 'DELETE' });
  const responseBody = await apiResponse.json();

  return [apiResponse, responseBody];
}
