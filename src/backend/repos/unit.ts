import { NextApiRequest } from "next";
import { Endpoint } from "../../config/apiEndpoint";
import { apiRequest } from "../../lib/apiCall";
import { createRequestParams } from "../../lib/urllib";
import { ApiResponseType, IUnit, IUnitType } from "@general-types";

export async function getUnitByContactID(
  req: NextApiRequest
): Promise<[Response, IUnit & { message: string }]> {
  const { id } = req.query;
  const response = await apiRequest({
    req,
    url: `${Endpoint.PropertyUnitByContact}/${id}`,
    method: "GET",
  });
  const responseBody: IUnit & { message: string } = await response.json();
  return [response, responseBody];
}

export async function getUnit(req: NextApiRequest): Promise<[Response, ApiResponseType<IUnit>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.Unit}?${params}`, method: "GET" });
  const responseBody: ApiResponseType<IUnit> = await response.json();
  return [response, responseBody];
}

export async function createUnit(req: NextApiRequest) {
  const apiResponse = await apiRequest({ req, url: Endpoint.Unit, method: "POST", body: req.body });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateUnit(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.Unit}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteUnit(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({ req, url: `${Endpoint.Unit}/${id}`, method: "DELETE" });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function getUnitType(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<IUnitType>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({ req, url: `${Endpoint.UnitType}?${params}`, method: "GET" });
  const responseBody: ApiResponseType<IUnitType> = await response.json();
  return [response, responseBody];
}

export async function createUnitType(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.UnitType,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateUnitType(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.UnitType}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteUnitType(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.UnitType}/${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
