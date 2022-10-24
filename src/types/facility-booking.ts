import { BaseType } from './base';

export interface IBooking extends BaseType {
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
}
