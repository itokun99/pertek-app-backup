export interface IUnit {
  id: number;
  property_id: number;
  property_cluster_id: number;
  property_unit_type_id: number;
  name: string;
  total_area: string;
  electrical_capacity: string;
  bast_date: string;
  bast_docs: Array<string>;
  template_invoice_id: Array<number>;
  public_id: string;
}

export interface IUnitTypeProperty {
  id: number;
  name: string;
  address: string;
  type: string;
  code: string;
  total_unit: number;
  total_cluster: number;
}

export interface IUnitType {
  id: number;
  name: string;
  property: IUnitTypeProperty;
}
