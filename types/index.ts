export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address?: string;
  location?: {
    latitude: number;
    longitude: number;
    area: string;
  };
  emailVerified: boolean;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  businessName: string;
  category: ServiceCategory;
  area: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  avatar?: string;
  phone: string;
  email: string;
  services: VendorService[];
  workingHours: {
    start: string;
    end: string;
  };
  minOrder?: number;
  deliveryFee?: number;
}

export interface VendorService {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image?: string;
  available: boolean;
}

export type ServiceCategory = 'milk' | 'water' | 'fruits-vegetables' | 'maid';

export interface CartItem {
  id: string;
  vendorId: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  price: number;
  unit: string;
  vendorName: string;
  category: ServiceCategory;
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  orderType: 'one-time' | 'subscription';
  deliveryAddress: string;
  deliveryDate: Date;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  confirmedAt?: Date;
  subscription?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    quantity: number;
    pausedDays?: string[];
  };
}

export interface Location {
  latitude: number;
  longitude: number;
  area: string;
  address: string;
}