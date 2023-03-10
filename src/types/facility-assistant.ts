import { BaseType } from "./base";
import { IContact, IContactDetail } from "./contact";
import { IFacilityCategory } from "./facility";

export interface IFacilityAssistant extends BaseType {
  id: number;
  profile: IContact;
  facility_category: IFacilityCategory;
  shifts: IFacilityAssistantShift[];
  contact: IContactDetail;
  staff_code: string;
}

export interface IFacilityAssistantShift {
  id: number;
  name: string;
  description: string;
  property_id: number;
  facility_category_id: number;
  dedicated_date: Date;
  start_time: Date;
  end_time: Date;
  created_at?: Date;
}
