export interface ITenant {
  id: string;
  first_name: string;
  last_name: string;
  registration_status: string;
  identity: string;
  identity_type: string;
  profile_type: string;
  address: string;
  last_login: number | null;
  unit_id: number;
  check_in: Date | null;
  check_out: Date | null;
  resident_status: string;
  tenancy_role: string;
  family_status: string;
  unit: ITenantUnit;
  phones: { id: number; number: string }[];
  contact_id: string;
}

export interface ITenantUnit {
  id: number;
  property_id: number;
  name: string;
  total_area: number;
  electrical_capacity: number;
  public_id: string;
  property: { id: number; name: string };
}

export interface ITenantDetail {
  id: number;
  property_unit_id: number;
  contact_id: number;
  parent_tenancy_id: number;
  resident_status: string;
  family_status: string;
  check_in: Date;
  check_out: Date;
  tenancy_role: string;
  search_meta: string;
  created_at: string;
  updated_at: number;
  deleted_at: number;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  families: ITenantFamily[];
  contact: ITenantContact;
  property: ITenantProperty;
  property_unit: ITenantPropertyUnit;
}

export interface ITenantProperty {
  id: number;
  name: string;
  address: string;
  type: string;
  code: string;
  unit: {
    id: number;
    name: string;
    total_area: number;
    electrical_capacity: number;
    bast_date: string;
    bast_docs: string[];
    public_id: string;
  };
  cluster: {
    id: number;
    name: string;
    description: string;
  };
}

export interface ITenantPropertyUnit {
  id: number;
  name: string;
  total_area: number;
  electrical_capacity: number;
  bast_date: number;
  bast_docs: string[];
  unit_type: {
    id: number;
    type_name: string;
    description: string;
  };
}

export interface ITenantContact {
  id: number;
  first_name: string;
  last_name: string;
  registration_status: string;
  public_id: string;
  profile_picture: string;
  identity: string;
  address: string;
  identity_type?: string;
  profile_type?: string;
}

export interface ITenantFamily {
  id: number;
  contact_id: number;
  resident_status: string;
  family_status: string;
  contact: ITenantContact;
}

export interface ITenantParent {
  id: number;
  resident_status: string;
  family_status: string;
  check_in: Date | null;
  check_out: Date | null;
  first_name: string;
  last_name: string;
  registration_status: string;
  profile_picture: string;
  identity: string;
  identity_type: string;
  profile_type: string;
}
