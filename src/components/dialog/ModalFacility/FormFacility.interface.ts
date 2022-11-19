export type IForm = {
  id: string;
  name: string;
  code: string;
  description: string;
  category_id: string;
  facility_type: string;
  max_capacity: number;
  slot_duration: number;
  min_order_duration: number;
  max_order_duration: number;
  min_order_gap: number;
  max_order_gap: number;
  max_cancel_gap: number;
  price: number;
  status: string;
  pictures: string[];
  slot_start: string;
  slot_end: string;
  open_hour: string;
  close_hour: string;
};

// export type IFormError = ;
