export interface IRole {
  id: number;
  name: string;
  created_at: number | null;
  created_by: number | null;
  updated_by: number | null;
  deleted_by: number | null;
  updated_at: number | null;
  deleted_at: number | null;
}

export interface IRoleGroup {
  id: number;
  name: string;
  property_id: number;
  capabilities: number[];
  menus: number[];
  created_at: number;
  updated_at: number | null;
  deleted_at: number | null;
  created_by: number | null;
  updated_by: number | null;
  deleted_by: number | null;
}
