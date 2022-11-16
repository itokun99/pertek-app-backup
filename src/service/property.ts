import { ApiProxyEndpoint } from '../config/apiProxyEndpoint';
import { fetchData } from '../lib/dataFetcher';
import { ApiResponseType, IProperty } from '../types';
import { createUrlParamFromObj } from '../utils/helper';

export interface IGetPropertyPayload {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getProperty(payload: IGetPropertyPayload): Promise<ApiResponseType<IProperty[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<IProperty[]>>(`${ApiProxyEndpoint.Property}${params}`, {
    method: 'GET',
  });

  if (error) {
    throw error;
  }

  return data;
}
