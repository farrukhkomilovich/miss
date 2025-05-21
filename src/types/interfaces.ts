export interface IPaginationParams {
  page: number;
  per_page: number;
  status?: string;
  from?: string;
  to?: string;
  search?: string;
}

export interface IAdminDataTypes {
  id: number;
  phone: string;
  name: string,
  pnfl: string | null;
  passport_seria: string | null;
  passport_number: string | null;
  last_name: string | null;
  first_name: string | null;
  middle_name: string | null;
  region: string | null;
  address: string | null;
  is_active: number;
  is_admin: number;
  created_at: string;
  updated_at: string;
  role_id: number;
}

export interface ApplicationPaginationResponse<T> {
  applications: {
    data: T[];
    total?: number;
    per_page?: number;
    page?: number;
    current_page?: number;
  };
}

export interface ContractPaginationResponse<T> {
  contracts: {
    data: T[];
    total?: number;
    per_page?: number;
    page?: number;
    current_page?: number;
  };
}


