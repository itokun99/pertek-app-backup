import { fetchData } from "@lib/dataFetcher";
import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";
import { ApiResponseType, IContactStaffEntities } from "@general-types";
import { createUrlParamFromObj } from "@utils/helper";

export interface IGetStaffParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICreateContactStaffPayload {
  first_name: string;
  last_name: string;
  profile_picture: string;
  identity_type: string;
  identity: string;
  profile_type: string;
  address: string;
  tax_number: number;
  staff_code: string;
  department_id: string;
  join_date: string;
  status: string;
  position: string;
  base_salary: number;
  emails: { address: string; verified: boolean; id?: number }[];
  phone_numbers: string[] | { number: string }[];
}

export async function getStaff(
  payload: IGetStaffParams
): Promise<ApiResponseType<IContactStaffEntities[]> | undefined> {
  const params = createUrlParamFromObj(payload);

  const { data, error } = await fetchData<ApiResponseType<IContactStaffEntities[]>>(
    `${ApiProxyEndpoint.Staff}${params}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function getStaffById(id: number): Promise<IContactStaffEntities | undefined> {
  const { data, error } = await fetchData<IContactStaffEntities>(
    `${ApiProxyEndpoint.Staff}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function createStaff(payload: ICreateContactStaffPayload) {
  const { data, error } = await fetchData<{ message: string }>(ApiProxyEndpoint.Staff, {
    body: JSON.stringify(payload),
    method: "POST",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteStaff(id: number) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Staff}?id=${id}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export async function updateStaff(id: string, payload: ICreateContactStaffPayload) {
  const { data, error } = await fetchData<{ message: string }>(
    `${ApiProxyEndpoint.Staff}?id=${id}`,
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
