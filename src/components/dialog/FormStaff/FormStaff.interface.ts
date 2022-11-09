import { IMultipleInputItem } from "@components/input/MultipleInput";

interface IContactForm {
  contactId: string;
  id: number;
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
  profileType: string;
  npwp: string;
  address: string;
  emails: IMultipleInputItem[];
  phones: IMultipleInputItem[];
}

interface IContactFormError {
  profile_picture: string;
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
  address: string;
  profileType: string;
  npwp: string;
}

export interface IForm extends IContactForm {
  staff_code: string;
  company_department_id: string;
  join_date: string;
  status: string;
  position: string;
  base_salary: number;
}

export type IFormError = IContactFormError;
