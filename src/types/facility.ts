import { BaseType } from './base';

export interface IFacility extends BaseType {
  id: number;
  name: string;
  price: number;
  code: string;
  status: string;
  default_open_hour: number;
  default_close_hour: number;
  min_order_duration: number;
  max_order_duration: number;
  min_order_gap: number;
  max_order_gap: number;
  description: string;
  pictures: string[];
  category: IFacilityCategory;
}

// facility category interface
export interface IFacilityCategory extends BaseType {
  id: number;
  name: string;
  description: string;
}
