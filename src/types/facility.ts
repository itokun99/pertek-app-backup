import { BaseType } from "./base";

export interface IFacility extends BaseType {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  slot_duration: number;
  min_order_duration: number;
  max_capacity: number;
  max_order_duration: number;
  min_order_gap: number;
  max_order_gap: number;
  max_cancel_gap: number;
  slot_start: string;
  slot_end: string;
  open_hour: string;
  close_hour: string;
  price: number;
  status: string;
  pictures: any[];
  deleted_at?: any;
  property: {
    id: string;
    name: string;
  };
  category: IFacilityCategory;
  booking_slots: IFacilityBookingSlot[];
}

export interface IFacilityBookingSlot {
  end: string;
  start: string;
}

// facility category interface
export interface IFacilityCategory extends BaseType {
  id: number;
  name: string;
  description: string;
}
