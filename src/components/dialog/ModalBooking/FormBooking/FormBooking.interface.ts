export interface IForm {
  facility_id: string;
  tenant_id: string;
  assistances: string[];
  description: string;
  price: number;
  penalty: number;
  status: string;
  slot_date: string;
  property_unit_id: string;
  slot: {
    start: string;
    end: string;
  };
}
