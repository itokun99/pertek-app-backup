import { BaseType } from './base';
import { IContact } from './contact';

export interface IFacility extends BaseType {
  id: number;
  name: string;
  description: string;
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
