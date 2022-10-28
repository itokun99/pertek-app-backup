import { NextApiRequest } from "next";
import { Endpoint } from "@config/apiEndpoint";
import { apiRequest } from "@lib/apiCall";
import { createRequestParams } from "@lib/urllib";
import { ApiResponseType, IContact, IContactDetail } from "@general-types";

export async function getContact(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IContact>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Contact}?${params}`, method: "GET" });
  const responseBody: ApiResponseType<IContact> = await response.json();
  return [response, responseBody];
}

export async function getContactById(
  req: NextApiRequest
): Promise<[Response, IContactDetail & { message: string }]> {
  const { id } = req.query;
  const response = await apiRequest({ req, url: `${Endpoint.Contact}/${id}`, method: "GET" });
  const responseBody: IContactDetail & { message: string } = await response.json();
  return [response, responseBody];
}

export async function createContact(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.Contact,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateContact(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Contact}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteContact(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Contact}/${id}`, method: "DELETE" });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function createContactPhone(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.ContactPhone,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateContactPhone(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.ContactPhone}/${id}`,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteContactPhone(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.ContactPhone}/${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function createContactEmail(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.ContactEmail,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateContactEmail(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.ContactEmail}/${id}`,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteContactEmail(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.ContactEmail}/${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
