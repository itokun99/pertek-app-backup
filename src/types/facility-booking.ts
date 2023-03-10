import { BaseType } from './base';
import { IContact } from './contact';
import { IFacility } from './facility';

export interface IBooking extends BaseType {
  id: number;
  code: string;
  unit: string;
  facility_id: number;
  facility: IFacility;
  contact: IContact;
  facility_category_id: number;
  tenant_profile_id: number;
  property_id: number;
  property_unit_id: number;
  duration: number;
  facility_assistances: any[];
  description: string;
  start: number;
  end: number;
  status: string;
  price: number;
  penalty: number;
  slot_date: string;
}
