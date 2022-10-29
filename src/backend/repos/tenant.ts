import { NextApiRequest } from "next";
import { Endpoint } from "@config/apiEndpoint";
import { apiRequest } from "@lib/apiCall";
import { createRequestParams } from "@lib/urllib";
import { ApiResponseType, ITenant, ITenantDetail } from "@general-types";

export async function getTenant(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<ITenant>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Tenant}?${params}`, method: "GET" });
  const responseBody: ApiResponseType<ITenant> = await response.json();
  return [response, responseBody];
}

export async function getTenantById(
  req: NextApiRequest
): Promise<[Response, ITenantDetail & { message: string }]> {
  const { id } = req.query;
  const response = await apiRequest({ req, url: `${Endpoint.Tenant}/${id}`, method: "GET" });
  const responseBody: ITenantDetail & { message: string } = await response.json();
  return [response, responseBody];
}

export async function createTenant(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.Tenant,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateTenant(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Tenant}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteTenant(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Tenant}/${id}`, method: "DELETE" });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}