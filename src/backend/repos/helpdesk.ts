import { NextApiRequest } from 'next';
import { Endpoint } from '../../config/apiEndpoint';
import { apiRequest } from '../../lib/apiCall';
import { createRequestParams } from '../../lib/urllib';
import { ApiResponseType, IHelpdesk } from '../../types';

// create function to get list of helpdesk
export async function getHelpdesk(req: NextApiRequest): Promise<[Response, ApiResponseType<IHelpdesk>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Helpdesk}?${params}`, method: 'GET' });
  const responseBody = await response.json();
  return [response, responseBody];
}

// create function to create helpdesk
export async function createHelpdesk(req: NextApiRequest): Promise<[Response, ApiResponseType<IHelpdesk>]> {
  const apiResponse = await apiRequest({ req, url: Endpoint.Helpdesk, method: 'POST', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

// create function to update helpdesk
export async function updateHelpdesk(req: NextApiRequest): Promise<[Response, ApiResponseType<IHelpdesk>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Helpdesk}/${id}`, method: 'PUT', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

// create function to delete helpdesk
export async function deleteHelpdesk(req: NextApiRequest): Promise<[Response, ApiResponseType<IHelpdesk>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Helpdesk}/${id}`, method: 'DELETE' });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
