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
  id: number;
  name: string;
  property: IUnitTypeProperty;
}

export interface IProperty {
  id: number;
  name: string;
  address: string;
  type: string;
  total_unit: number;
  total_cluster: number;
}