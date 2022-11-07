import { IMultipleInputItem } from "@components/input/MultipleInput";
import { SelectOptionType } from "@types";

interface IContactForm {
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
  npwp: string;
  address: string;
  profileType: string;
  role: SelectOptionType;
  roleGroup: SelectOptionType;
  emails: IMultipleInputItem[];
  phones: IMultipleInputItem[];
}

interface IContactFormError {
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
  address: string;
  profileType: string;
  npwp: string;
}

export interface IForm extends IContactForm {
  id: number;
  propertyUnit: SelectOptionType;
  parentTenancy: string;
  tenancy_role: string;
  residentStatus: string;
  familyStatus: string;
  checkIn: Date | null;
  checkOut: Date | null;
}

export interface IFormError extends IContactFormError {
  propertyUnit: string;
  residentStatus: string;
  familyStatus: string;
  checkIn: string;
  checkOut: string;
  parentTenancy: string;
  tenancy_role: string;
}
