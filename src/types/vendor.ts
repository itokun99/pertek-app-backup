/**
 * Vendor entities interface
 */
export interface IVendorEntities {
  id: number;
  public_id: string;
  created_at: string;
  updated_at: number;
  contact: {
    id: number;
    first_name: string;
    last_name: string;
    public_id: string;
    profile_picture: string;
    identity: string;
    identity_type: string;
    profile_type: string;
    address: string;
    tax_number: number;
    created_at: string;
    updated_at: number;
    deleted_at: number;
    emails: {
      id: number;
      address: string;
      public_id: string;
      verified: boolean;
      created_at: string;
      updated_at: number;
    }[];
    phones: {
      id: number;
      number: string;
      public_id: string;
      created_at: string;
      updated_at: number;
    }[];
  };
}
