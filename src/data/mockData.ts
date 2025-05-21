
import { Client, Consultant, Department, Dress, DashboardStats } from './types';

export const clients: Client[] = [
  {
    id: '1',
    name: 'Nilufar Karimova',
    phone: '+998 90 123 4567',
    service: 'Kelin ko\'ylak',
    consultant: 'Zarina Ikromova',
    payment: 1200000,
    paymentType: 'cash',
    isReserved: false,
    visitDate: '2025-04-01',
    departmentId: '1'
  },
  {
    id: '2',
    name: 'Aziza Tursunova',
    phone: '+998 90 234 5678',
    service: 'Fotosessiya',
    consultant: 'Dilnoza Qodirova',
    payment: 800000,
    paymentType: 'card',
    isReserved: true,
    visitDate: '2025-04-05',
    departmentId: '3'
  },
  {
    id: '3',
    name: 'Shaxnoza Aliyeva',
    phone: '+998 90 345 6789',
    service: 'Kosmetologiya',
    consultant: 'Kamola Yusupova',
    payment: 500000,
    paymentType: 'cash',
    isReserved: false,
    visitDate: '2025-04-02',
    departmentId: '4'
  },
  {
    id: '4',
    name: 'Feruza Rahimova',
    phone: '+998 90 456 7890',
    service: 'Salon xizmati',
    consultant: 'Zarina Ikromova',
    payment: 350000,
    paymentType: 'card',
    isReserved: false,
    visitDate: '2025-04-03',
    departmentId: '2'
  },
  {
    id: '5',
    name: 'Munisa Sodiqova',
    phone: '+998 90 567 8901',
    service: 'Kelin ko\'ylak',
    consultant: 'Dilnoza Qodirova',
    payment: 1500000,
    paymentType: 'cash',
    isReserved: true,
    visitDate: '2025-04-08',
    departmentId: '1'
  }
];

export const dresses: Dress[] = [
  {
    id: '1',
    code: 'KK-001',
    price: 5000000,
    dateAcquired: '2023-01-15',
    rentCount: 10,
    totalEarned: 6000000,
    status: 'available',
    isProfit: true
  },
  {
    id: '2',
    code: 'KK-002',
    price: 6000000,
    dateAcquired: '2023-02-20',
    rentCount: 5,
    totalEarned: 3000000,
    status: 'reserved',
    isProfit: false
  },
  {
    id: '3',
    code: 'KK-003',
    price: 4500000,
    dateAcquired: '2023-03-10',
    rentCount: 12,
    totalEarned: 7200000,
    status: 'rented',
    isProfit: true
  },
  {
    id: '4',
    code: 'KK-004',
    price: 8000000,
    dateAcquired: '2023-04-05',
    rentCount: 7,
    totalEarned: 9800000,
    status: 'available',
    isProfit: true
  },
  {
    id: '5',
    code: 'KK-005',
    price: 7500000,
    dateAcquired: '2023-05-18',
    rentCount: 3,
    totalEarned: 2400000,
    status: 'rented',
    isProfit: false
  }
];

export const consultants: Consultant[] = [
  {
    id: '1',
    name: 'Zarina Ikromova',
    phone: '+998 91 123 4567',
    clientCount: 32,
    totalRevenue: 12800000,
    performance: 'high'
  },
  {
    id: '2',
    name: 'Dilnoza Qodirova',
    phone: '+998 91 234 5678',
    clientCount: 28,
    totalRevenue: 11200000,
    performance: 'high'
  },
  {
    id: '3',
    name: 'Kamola Yusupova',
    phone: '+998 91 345 6789',
    clientCount: 15,
    totalRevenue: 6000000,
    performance: 'medium'
  },
  {
    id: '4',
    name: 'Malika Ergasheva',
    phone: '+998 91 456 7890',
    clientCount: 8,
    totalRevenue: 3200000,
    performance: 'low'
  }
];

export const departments: Department[] = [
  {
    id: '1',
    name: 'Kelin ko\'ylak',
    description: 'Kelin ko\'ylaklarini ijaraga berish xizmati',
    clientCount: 45,
    revenue: 18000000
  },
  {
    id: '2',
    name: 'Salon',
    description: 'Soch va makiyaj xizmatlari',
    clientCount: 38,
    revenue: 9500000
  },
  {
    id: '3',
    name: 'Fotozona',
    description: 'Fotosessiyalar uchun studiya',
    clientCount: 25,
    revenue: 12500000
  },
  {
    id: '4',
    name: 'Kosmetologiya',
    description: 'Kosmetologiya xizmatlari',
    clientCount: 20,
    revenue: 8000000
  }
];

export const dashboardStats: DashboardStats = {
  totalClients: 128,
  totalDresses: 20,
  totalConsultants: 4,
  totalRevenue: 48000000,
  availableDresses: 12,
  reservedDresses: 3,
  rentedDresses: 5
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('uz-UZ', { 
    style: 'currency', 
    currency: 'UZS',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getStatusLabel = (status: string): string => {
  switch(status) {
    case 'available':
      return 'Bo\'sh';
    case 'reserved':
      return 'Bron qilingan';
    case 'rented':
      return 'Ijarada';
    default:
      return status;
  }
};

export const getStatusClass = (status: string): string => {
  switch(status) {
    case 'available':
      return 'notion-status-green';
    case 'reserved':
      return 'notion-status-yellow';
    case 'rented':
      return 'notion-status-red';
    default:
      return '';
  }
};
