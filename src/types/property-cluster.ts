export interface IClusterProperty {
  id: number;
  name: string;
  address: string;
  type: string;
  code: string;
  total_unit: number;
  total_cluster: number;
}

export interface ICluster {
  id: number;
  name: string;
  property: IClusterProperty;
}
