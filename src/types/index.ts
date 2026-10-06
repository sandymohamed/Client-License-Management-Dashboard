export interface Client {
  id: string;
  name: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Service {
  id: string;
  clientId: string;
  serviceType: 'commercial' | 'health' | 'fire_safety' | 'advertisement' | 'building';
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending' | 'expiring_soon';
  licenseNumber: string;
  issuingAuthority: string;
}

export interface Worker {
  id: string;
  clientId: string;
  name: string;
  residencyNumber: string;
  expiryDate: string;
  nationality: string;
  position: string;
  status: 'active' | 'expired' | 'expiring_soon';
  idNumber: string;
  passportNumber: string;
}

export interface NotificationLog {
  id: string;
  clientId?: string;
  serviceId?: string;
  workerId?: string;
  type: 'email' | 'sms' | 'push' | 'whatsapp';
  message: string;
  sentAt: string;
  status: 'sent' | 'failed' | 'pending';
}

export interface DashboardStats {
  totalClients: number;
  totalLicenses: number;
  totalWorkers: number;
  expiringSoon: number;
  expired: number;
  activeLicenses: number;
}