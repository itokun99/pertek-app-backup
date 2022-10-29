export interface IFacilityAssistant {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  shifts: IFacilityAssistantShift[];
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
