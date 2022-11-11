import { NextApiRequest } from "next";
import { Endpoint } from "@config/apiEndpoint";
import { apiRequest } from "@lib/apiCall";
import { createRequestParams } from "@lib/urllib";
import { ApiResponseType, ICompanyDepartmentEntities } from "@general-types";

export async function getCompanyDepartment(
  req: NextApiRequest
): Promise<[Response, ApiResponseType<ICompanyDepartmentEntities>]> {
  const params = createRequestParams(req.query);
  const response = await apiRequest({
    req,
    url: `${Endpoint.CompanyDepartment}?${params}`,
    method: "GET",
  });
  const responseBody: ApiResponseType<ICompanyDepartmentEntities> = await response.json();
  return [response, responseBody];
}

export async function getCompanyDepartmentById(
  req: NextApiRequest
): Promise<[Response, ICompanyDepartmentEntities & { message: string }]> {
  const { id } = req.query;
  const response = await apiRequest({
    req,
    url: `${Endpoint.CompanyDepartment}/${id}`,
    method: "GET",
  });
  const responseBody: ICompanyDepartmentEntities & { message: string } = await response.json();
  return [response, responseBody];
}

export async function createCompanyDepartment(req: NextApiRequest) {
  const apiResponse = await apiRequest({
    req,
    url: Endpoint.CompanyDepartment,
    method: "POST",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function updateCompanyDepartment(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.CompanyDepartment}/${id}`,
    method: "PUT",
    body: req.body,
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}

export async function deleteCompanyDepartment(req: NextApiRequest) {
  const { id } = req.query;
  const apiResponse = await apiRequest({
    req,
    url: `${Endpoint.CompanyDepartment}/${id}`,
    method: "DELETE",
  });
  const responseBody = await apiResponse.json();
  return [apiResponse, responseBody];
}
