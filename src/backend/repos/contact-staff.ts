import { NextApiRequest } from "next";
import { Endpoint } from "@config/apiEndpoint";
import { apiRequest } from "@lib/apiCall";
import { createRequestParams } from "@lib/urllib";
import { ApiResponseType, IContactStaffEntities } from "@general-types";

export async function getStaff(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IContactStaffEntities>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({
    req,
    url: `${Endpoint.ContactStaff}?${params}`,
    method: "GET",
  });
  const responseBody: ApiResponseType<IContactStaffEntities> = await response.json();
  return [response, responseBody];
}

export async function getStaffById(
  req: NextApiRequest
): Promise<[Response, IContactStaffEntities & { message: string }]> {
  const { id } = req.query;
  const response = await apiRequest({ req, url: `${Endpoint.ContactStaff}/${id}`, method: "GET" });
  const responseBody: IContactStaffEntities & { message: string } = await response.json();
  return [response, responseBody];
}

export async function createStaff(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.ContactStaff,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateStaff(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.ContactStaff}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteStaff(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.ContactStaff}/${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
