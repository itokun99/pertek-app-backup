import { NextApiRequest } from "next";
import { Endpoint } from "@config/apiEndpoint";
import { apiRequest } from "@lib/apiCall";
import { createRequestParams } from "@lib/urllib";
import { ApiResponseType, IFacilityCategory } from "@general-types";

export async function getFacilityCategory(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IFacilityCategory>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({
    req,
    url: `${Endpoint.FacilityCategory}?${params}`,
    method: "GET",
  });
  const responseBody: ApiResponseType<IFacilityCategory> = await response.json();
  return [response, responseBody];
}

export async function getFacilityCategoryById(
  req: NextApiRequest
): Promise<[Response, IFacilityCategory & { message: string }]> {
  const { id } = req.query;
  const response = await apiRequest({
    req,
    url: `${Endpoint.FacilityCategory}/${id}`,
    method: "GET",
  });
  const responseBody: IFacilityCategory & { message: string } = await response.json();
  return [response, responseBody];
}

export async function createFacilityCategory(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.FacilityCategory,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateFacilityCategory(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.FacilityCategory}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteFacilityCategory(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.FacilityCategory}/${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
