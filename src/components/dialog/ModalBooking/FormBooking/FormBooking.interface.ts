import { IFacility, IFacilityBookingSlot } from "@types";

export interface IForm {
  facility: {
    label: string;
    value: IFacility;
  } | null;
  bookingSlot: {
    label: string;
    value: IFacilityBookingSlot;
  } | null;
  tenant_id: string;
  assistances: string[];
  description: string;
  price: string;
  penalty: number;
  status: string;
  slot_date: string;
  property_unit_id: string;
  slot: {
    start: string;
    end: string;
  };
}
