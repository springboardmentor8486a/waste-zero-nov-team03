export type UserRole = "VOLUNTEER" | "NGO";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  skills?: string[];
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Opportunity {
  _id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  duration: string;
  location: string;
  status: 'Open' | 'Closed' | 'In-progress';
  NGOID: {
      _id: string;
      name: string;
      email: string;
  } | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Application {
  id: string;
  opportunityTitle: string;
  ngoName: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Pickup {
  id: string;
  location: string;
  date: string;
  time: string;
  status: string;
  itemsCount?: number;
  volunteerId?: string;
  volunteerName?: string;
}

export interface Metrics {
  totalPickups: number;
  pickupsTrend: number;
  itemsRecycled: number;
  itemsTrend: number;
  volunteerHours: number;
  hoursTrend: number;
  co2Saved: number;
  co2Trend: number;
}

export interface RecyclingCategory {
  name: string;
  count: number;
  percentage: number;
  color: string;
}





