import { BaseType } from './base';
import { IContact } from './contact';

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

// create interface named facility assistance
export interface IFacilityAssistance extends BaseType {
  id: number;
  profile: IContact;
  facility: IFacility;
  facility_category: IFacilityCategory;
}

// create interface named facility assistance shift
export interface IFacilityAssistanceShift {
  id: number;
  name: string;
  description: string;
  property_id: number;
  facility_category_id: number;
  dedicated_date: Date;
  start_time: Date;
  end_time: Date;
  created_at?: Date;
  facility_assistances: Array<IFacilityAssistance>;
}
