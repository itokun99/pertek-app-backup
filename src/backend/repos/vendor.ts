import { NextApiRequest } from "next";
import { Endpoint } from "@config/apiEndpoint";
import { apiRequest } from "@lib/apiCall";
import { createRequestParams } from "@lib/urllib";
import { ApiResponseType, IVendorEntities } from "@general-types";

export async function getVendor(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IVendorEntities>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Vendor}?${params}`, method: "GET" });
  const responseBody: ApiResponseType<IVendorEntities> = await response.json();
  return [response, responseBody];
}

export async function getVendorById(
  req: NextApiRequest
): Promise<[Response, IVendorEntities & { message: string }]> {
  const { id } = req.query;
  const response = await apiRequest({ req, url: `${Endpoint.Vendor}/${id}`, method: "GET" });
  const responseBody: IVendorEntities & { message: string } = await response.json();
  return [response, responseBody];
}

export async function createVendor(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.Vendor,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateVendor(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Vendor}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteVendor(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Vendor}/${id}`, method: "DELETE" });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
