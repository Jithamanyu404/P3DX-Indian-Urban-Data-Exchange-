export type Status = "active" | "pending" | "connected" | "expired" | "revoked" | "degraded" | "offline";

export interface World {
  id: string;
  name: string;
  region: string;
  jurisdiction: string;
  institutions: number;
  agents: number;
  lockers: number;
  gateways: number;
  status: Status;
  uptime: number;
  color: string;
  lat: number;
  lng: number;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  institution: string;
  world: string;
  country: string;
  lockerCount: number;
  status: Status;
  lastActive: string;
}

export interface Locker {
  id: string;
  name: string;
  owner: string;
  world: string;
  storageUsedGb: number;
  storageTotalGb: number;
  security: "standard" | "elevated" | "maximum";
  endpoint: string;
  published: boolean;
  sharedFiles: number;
  consentStatus: Status;
  lastActivity: string;
}

export interface Gateway {
  id: string;
  name: string;
  world: string;
  region: string;
  status: Status;
  latencyMs: number;
  throughputMbps: number;
  uptime: number;
  requests24h: number;
}

export interface Transaction {
  id: string;
  type: "read" | "write" | "share" | "revoke" | "sync";
  agent: string;
  world: string;
  gateway: string;
  status: Status;
  amount?: number;
  timestamp: string;
}

export interface ConsentRecord {
  id: string;
  purpose: string;
  requester: string;
  grantor: string;
  duration: string;
  status: "requested" | "pending" | "approved" | "connected" | "expired" | "rejected" | "revoked";
  expiry: string;
  permissions: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: "success" | "warning" | "info" | "error";
  timestamp: string;
  read: boolean;
}

export interface StatCard {
  label: string;
  value: number;
  delta: number;
  prefix?: string;
  suffix?: string;
}
