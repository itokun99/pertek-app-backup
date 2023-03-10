export interface IContactEmail {
  id: number;
  address: string;
  verified: boolean;
}

export interface IContactPhone {
  id: number;
  number: string;
}
export interface IContactRole {
  id: number;
  name: string;
}

export interface IContactDetail {
  id: number;
  first_name: string;
  last_name: string;
  registration_status: string;
  public_id: string;
  profile_picture: string;
  identity: string;
  identity_type: string;
  profile_type: string;
  address: string;
  npwp: string;
  last_login: number | null | Date;
  property: IContactProperty;
  role: IContactRole;
  role_group: IContactRole;
  emails: IContactEmail[];
  phone_numbers: IContactPhone[];
}

export interface IContactEmail {
  id: number;
  address: string;
  verified: boolean;
}

export interface IContactPhone {
  id: number;
  number: string;
}

export interface IContactProperty {
  id: number;
  name: string;
}

export interface IContactRole {
  id: number;
  name: string;
}

export interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  registration_status: string;
  public_id: string;
  role_id: number;
  role_group_id: number;
  property_id: number;
  profile_picture: string;
  identity: string;
  identity_type: string;
  profile_type: string;
  address: string;
  last_login: Date;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
}
