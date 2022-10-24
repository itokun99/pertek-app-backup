import { NextApiRequest } from "next";
import { Endpoint } from "../../config/apiEndpoint";
import { apiRequest } from "../../lib/apiCall";
import { createRequestParams } from "../../lib/urllib";
import { ApiResponseType, ICluster } from "@general-types";

export async function getCluster(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<ICluster>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Klaster}?${params}`, method: "GET" });
  const responseBody: ApiResponseType<ICluster> = await response.json();
  return [response, responseBody];
}

export async function createCluster(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.Klaster,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateCluster(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Klaster}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteCluster(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Klaster}/{property_cluter_id}?property_cluster_id=${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
