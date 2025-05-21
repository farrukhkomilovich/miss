import { Status } from "@/enums/status.enum";

// APPLICATIONS *****************************************
type Application = {
  id: number;
  client_id: number;
  file: string;
  status: Status;
  rejection_reason: string | null;
  is_active: 0 | 1;
  created_at: string;
  // updated_at: string;
  name: string;
  last_name: string;
  phone: string;
  pinfl: string;
  pass_data: string;
};

export type AllApplicationsType = Application[];

// CONTRACTS *****************************************
type Contract = {
  id: number;
  application_id: number;
  limit: string;
  duration: number;
  percent: string;
  free_period: number;
  terms: string;
  created_at: string;
  updated_at: string;
  is_active: 0 | 1;
};

export type AllContractsType = Contract[];
