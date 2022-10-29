import { NextApiRequest } from 'next';
import { Endpoint } from '../../config/apiEndpoint';
import { apiRequest } from '../../lib/apiCall';
import { createRequestParams } from '../../lib/urllib';
import { ApiResponseType, IFacilityAssistant } from '@general-types';

export async function getFacilityAssistant(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IFacilityAssistant>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.FacilityAssistant}?${params}`, method: 'GET' });
  const responseBody: ApiResponseType<IFacilityAssistant> = await response.json();

  return [response, responseBody];
}

export async function createFacilityAssistant(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IFacilityAssistant>]> {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.FacilityAssistant,
    method: 'POST',
    body: req.body,
  });
  const responseBody = await apiResponse.json();

  return [apiResponse, responseBody];
}

export async function updateFacilityAssistant(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IFacilityAssistant>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.FacilityAssistant}/${id}`,
    method: 'PUT',
    body: req.body,
  });
  const responseBody = await apiResponse.json();

  return [apiResponse, responseBody];
}

export async function deleteFacilityAssistant(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IFacilityAssistant>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.FacilityAssistant}/${id}`,
    method: 'DELETE',
  });
  const responseBody = await apiResponse.json();

  return [apiResponse, responseBody];
}
