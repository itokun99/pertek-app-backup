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
  firstName: string;
  lastName: string;
  identity: string;
  identityType: string;
  address: string;
  profileType: string;
  npwp: string;
}

export type IForm = IContactForm;

export type IFormError = IContactFormError;
