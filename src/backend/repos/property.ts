import { NextApiRequest } from "next";
import { Endpoint } from "../../config/apiEndpoint";
import { apiRequest } from "../../lib/apiCall";
import { createRequestParams } from "../../lib/urllib";
import { ApiResponseType, IProperty } from "@general-types";

export async function getProperty(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IProperty>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Property}?${params}`, method: "GET" });
  const responseBody: ApiResponseType<IProperty> = await response.json();
  return [response, responseBody];
}

export async function createProperty(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.Property,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateProperty(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Property}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteProperty(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Property}/${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
