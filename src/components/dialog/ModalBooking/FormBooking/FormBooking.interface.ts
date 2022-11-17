import { IFacility, IFacilityBookingSlot, SelectOptionType } from "@types";

export interface IForm {
  facility: {
    label: string;
    value: IFacility;
  } | null;
  bookingSlot: {
    label: string;
    value: IFacilityBookingSlot;
  } | null;
  propertyUnit: SelectOptionType | null;
  tenant: SelectOptionType | null;
  assistances: string[];
  description: string;
  price: string;
  penalty: number;
  status: string;
  slot_date: string;
  slot: {
    start: string;
    end: string;
  };
}
