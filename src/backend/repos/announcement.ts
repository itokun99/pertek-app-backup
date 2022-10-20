import { NextApiRequest } from 'next';
import { Endpoint } from '../../config/apiEndpoint';
import { apiRequest } from '../../lib/apiCall';
import { createRequestParams } from '../../lib/urllib';
import { ApiResponseType, IAnnouncement } from '../../types';

export async function getAnnouncement(req: NextApiRequest): Promise<[Response, ApiResponseType<IAnnouncement>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Announcement}?${params}`, method: 'GET' });
  const responseBody = await response.json();
  return [response, responseBody];
}

export async function createAnnouncement(req: NextApiRequest): Promise<[Response, ApiResponseType<IAnnouncement>]> {
  const apiResponse = await apiRequest({ req, url: Endpoint.Announcement, method: 'POST', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateAnnouncement(req: NextApiRequest): Promise<[Response, ApiResponseType<IAnnouncement>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Announcement}/${id}`, method: 'PUT', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteAnnouncement(req: NextApiRequest): Promise<[Response, ApiResponseType<IAnnouncement>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Announcement}/${id}`, method: 'DELETE' });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
