
export type Status = 'available' | 'reserved' | 'rented';

export interface Client {
  id: string;
  name: string;
  phone: string;
  service: string;
  consultant: string;
  payment: number;
  paymentType: 'cash' | 'card';
  isReserved: boolean;
  visitDate: string;
  departmentId: string;
}

export interface Dress {
  id: string;
  code: string;
  price: number;
  dateAcquired: string;
  rentCount: number;
  totalEarned: number;
  status: Status;
  isProfit?: boolean; // Calculated based on totalEarned vs price
}

export interface Consultant {
  id: string;
  name: string;
  phone: string;
  clientCount: number;
  totalRevenue: number;
  performance: 'high' | 'medium' | 'low';
}

export interface Department {
  id: string;
  name: string;
  description: string;
  clientCount: number;
  revenue: number;
}

export interface DashboardStats {
  totalClients: number;
  totalDresses: number;
  totalConsultants: number;
  totalRevenue: number;
  availableDresses: number;
  reservedDresses: number;
  rentedDresses: number;
}
