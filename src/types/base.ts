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

export interface BaseType {
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}
