import { Client, Service, Worker, NotificationLog, DashboardStats } from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Al-Manara Trading LLC',
    contactInfo: {
      phone: '+971-50-123-4567',
      email: 'info@almanara.ae',
      address: 'Dubai Marina, Dubai, UAE'
    },
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Emirates Construction Co.',
    contactInfo: {
      phone: '+971-55-987-6543',
      email: 'contact@emiratesconstruction.ae',
      address: 'Business Bay, Dubai, UAE'
    },
    createdAt: '2024-02-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Gulf Food Industries',
    contactInfo: {
      phone: '+971-52-456-7890',
      email: 'info@gulffood.ae',
      address: 'Al Quoz Industrial Area, Dubai, UAE'
    },
    createdAt: '2024-01-05',
    status: 'active'
  },
  {
    id: '4',
    name: 'Desert Tech Solutions',
    contactInfo: {
      phone: '+971-56-234-5678',
      email: 'hello@deserttech.ae',
      address: 'DIFC, Dubai, UAE'
    },
    createdAt: '2023-12-10',
    status: 'inactive'
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    clientId: '1',
    serviceType: 'commercial',
    issueDate: '2024-01-01',
    expiryDate: '2025-01-01',
    status: 'active',
    licenseNumber: 'COM-2024-001',
    issuingAuthority: 'Dubai Economic Department'
  },
  {
    id: '2',
    clientId: '1',
    serviceType: 'health',
    issueDate: '2024-02-15',
    expiryDate: '2024-12-15',
    status: 'expiring_soon',
    licenseNumber: 'HLTH-2024-001',
    issuingAuthority: 'Dubai Health Authority'
  },
  {
    id: '3',
    clientId: '2',
    serviceType: 'fire_safety',
    issueDate: '2023-06-01',
    expiryDate: '2024-06-01',
    status: 'expired',
    licenseNumber: 'FIRE-2023-002',
    issuingAuthority: 'Dubai Civil Defence'
  },
  {
    id: '4',
    clientId: '2',
    serviceType: 'building',
    issueDate: '2024-03-01',
    expiryDate: '2025-03-01',
    status: 'active',
    licenseNumber: 'BLD-2024-003',
    issuingAuthority: 'Dubai Municipality'
  },
  {
    id: '5',
    clientId: '3',
    serviceType: 'health',
    issueDate: '2024-01-20',
    expiryDate: '2024-11-30',
    status: 'expiring_soon',
    licenseNumber: 'HLTH-2024-005',
    issuingAuthority: 'Dubai Health Authority'
  }
];

export const mockWorkers: Worker[] = [
  {
    id: '1',
    clientId: '1',
    name: 'Ahmed Al-Rashid',
    residencyNumber: 'RES-784-2024-001',
    expiryDate: '2025-06-15',
    nationality: 'Egyptian',
    position: 'Project Manager',
    status: 'active',
    idNumber: 'EID-123456789',
    passportNumber: 'P12345678'
  },
  {
    id: '2',
    clientId: '1',
    name: 'Maria Santos',
    residencyNumber: 'RES-784-2024-002',
    expiryDate: '2024-12-20',
    nationality: 'Filipino',
    position: 'Administrative Assistant',
    status: 'expiring_soon',
    idNumber: 'EID-987654321',
    passportNumber: 'P87654321'
  },
  {
    id: '3',
    clientId: '2',
    name: 'Hassan Mahmoud',
    residencyNumber: 'RES-784-2023-003',
    expiryDate: '2024-03-10',
    nationality: 'Syrian',
    position: 'Site Engineer',
    status: 'expired',
    idNumber: 'EID-456789123',
    passportNumber: 'P45678912'
  },
  {
    id: '4',
    clientId: '3',
    name: 'Priya Sharma',
    residencyNumber: 'RES-784-2024-004',
    expiryDate: '2025-08-30',
    nationality: 'Indian',
    position: 'Quality Control Specialist',
    status: 'active',
    idNumber: 'EID-789123456',
    passportNumber: 'P78912345'
  }
];

export const mockNotifications: NotificationLog[] = [
  {
    id: '1',
    clientId: '1',
    serviceId: '2',
    type: 'email',
    message: 'Health permit for Al-Manara Trading LLC expires in 30 days',
    sentAt: '2024-11-15T10:30:00Z',
    status: 'sent'
  },
  {
    id: '2',
    clientId: '1',
    workerId: '2',
    type: 'whatsapp',
    message: 'Worker residency for Maria Santos expires in 25 days',
    sentAt: '2024-11-20T14:15:00Z',
    status: 'sent'
  },
  {
    id: '3',
    clientId: '2',
    serviceId: '3',
    type: 'sms',
    message: 'Fire safety certificate has expired - immediate action required',
    sentAt: '2024-11-10T09:00:00Z',
    status: 'sent'
  },
  {
    id: '4',
    clientId: '3',
    serviceId: '5',
    type: 'push',
    message: 'Health permit renewal reminder - expires in 15 days',
    sentAt: '2024-11-22T16:45:00Z',
    status: 'pending'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalClients: 4,
  totalLicenses: 5,
  totalWorkers: 4,
  expiringSoon: 3,
  expired: 2,
  activeLicenses: 2
};