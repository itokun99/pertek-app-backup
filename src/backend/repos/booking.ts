import { NextApiRequest } from 'next';
import { Endpoint } from '../../config/apiEndpoint';
import { apiRequest } from '../../lib/apiCall';
import { createRequestParams } from '../../lib/urllib';
import { ApiResponseType, IBooking } from '../../types';

export async function getBooking(req: NextApiRequest): Promise<[Response, ApiResponseType<IBooking>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Booking}?${params}`, method: 'GET' });
  const responseBody: ApiResponseType<IBooking> = await response.json();
  return [response, responseBody];
}

export async function createBooking(req: NextApiRequest): Promise<[Response, ApiResponseType<IBooking>]> {
  const apiResponse = await apiRequest({ req, url: Endpoint.Booking, method: 'POST', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateBooking(req: NextApiRequest): Promise<[Response, ApiResponseType<IBooking>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Booking}/${id}`, method: 'PUT', body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteBooking(req: NextApiRequest): Promise<[Response, ApiResponseType<IBooking>]> {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Booking}/${id}`, method: 'DELETE' });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
