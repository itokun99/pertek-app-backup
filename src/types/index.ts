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