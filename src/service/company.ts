import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { ApiResponseType, ICompanyDepartmentEntities } from "@general-types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IGetStaffParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICreateCompanyDepartmentPayload {
  name: string;
  description: string;
}

export async function getCompanyDepartment(
  payload: IGetStaffParams
): Promise<ApiResponseType<ICompanyDepartmentEntities[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<ICompanyDepartmentEntities[]>>(
    `${ApiProxyEndpoint.CompanyDepartment}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function getCompanyDepartmentById(
  id: number
): Promise<ICompanyDepartmentEntities | undefined> {
  const { data, error } = await fetchData<ICompanyDepartmentEntities>(
    `${ApiProxyEndpoint.CompanyDepartment}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createCompanyDepartment(payload: ICreateCompanyDepartmentPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.CompanyDepartment, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCompanyDepartment(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.CompanyDepartment}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCompanyDepartment(
  id: number,
  payload: ICreateCompanyDepartmentPayload
) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.CompanyDepartment}?id=${id}`,
    {
      body: JSON.stringify(payload),
      method: "PUT",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}
