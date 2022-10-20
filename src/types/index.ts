/**
 * @name SelectOptionType
 * Select Propertie Types
 */
export type SelectOptionType = {
  label: string;
  value: string;
};
[];

/**
 * @name ApiResponseType
 * @note not fixed yet, but it will be fixed soon
 */
export interface ApiResponseType<T> {
  message?: string;
  status?: number;
  ok?: boolean;
  items: T;
  curPage?: number;
  nextPage?: number;
  prevPage?: number;
  totalPage?: number;
  itemsTotal?: number;
  itemsReceived?: number;
}

export interface IClusterProperty {
  id: number;
  name: string;
  address: string;
  type: string;
  code: string;
  total_unit: number;
  total_cluster: number;
}

export interface ICluster {
  id: number;
  name: string;
  property: IClusterProperty;
}

export interface IResponseDataCreation {
  id?: number;
  property_id?: number;
  name?: string;
  description?: string;
  created_at?: number;
  updated_at?: number;
  deleted_at?: number;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}
export interface IUnit {
  id: number;
  property_id: number;
  property_cluster_id: number;
  property_unit_type_id: number;
  name: string;
  total_area: string;
  electrical_capacity: string;
  bast_date: string;
  bast_docs: Array<string>;
  template_invoice_id: Array<number>;
  public_id: string;
}

export interface IUnitTypeProperty {
  id: number;
  name: string;
  address: string;
  type: string;
  code: string;
  total_unit: number;
  total_cluster: number;
}

export interface IUnitType {
  id: number,
  type_name: string,
  description: string,
  property_id: number,
  created_at: number | null,
  updated_at: number | null,
  deleted_at: number | null,
  created_by: number | null,
  updated_by: number | null,
  deleted_by: number | null
}

export interface IProperty {
  id: number;
  name: string;
  address: string;
  type: string;
  total_unit: number;
  total_cluster: number;
}

export interface IAnnouncement {
  id: number;
  subject: string;
  content: string;
  attachments: Array<string>;
  status: string;
  published_at: Date;
  target_segment: string;
  target: Array<number>;
  property: IProperty;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface IHelpdesk {
  id: number;
  subject: string;
  content: string;
  attachments: Array<string>;
  status: string;
  assignee: any;
  property: IProperty;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

// ---- facility booking

export interface IFacility {
  id: number;
  name: string;
  description: string;
}
export interface IBooking {
  id: number;
  code: string;
  facility_id: number;
  facility_category_id: number;
  tenant_profile_id: number;
  property_id: number;
  property_unit_id: number;
  duration: number;
  facility_assistances: any[];
  description: string;
  slot_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  created_by: number;
  updated_by: number;
  deleted_by: number;
}
