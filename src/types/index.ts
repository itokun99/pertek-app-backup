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
  totalPage?: number;
  itemsTotal?: number;
}

export interface IClusterPropertyDataRaw {
  id: number;
  name: string;
  address: string;
  type: string;
  code: string;
  total_unit: number;
  total_cluster: number;
}

export interface IClusterDataRaw {
  id: number;
  name: string;
  property: IClusterPropertyDataRaw;
}