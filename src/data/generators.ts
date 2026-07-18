import type { Agent, Locker, Gateway, Transaction, ConsentRecord, NotificationItem, Status } from "@/types";
import { worlds } from "@/data/worlds";

// deterministic pseudo-random so mock data is stable across renders
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const int = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const firstNames = ["Ava", "Leo", "Mia", "Noah", "Zara", "Kian", "Elin", "Theo", "Nadia", "Omar", "Ines", "Rafael", "Yuki", "Priya", "Marco", "Sofia", "Lucas", "Amara", "Dev", "Freya"];
const lastNames = ["Larsen", "Kimura", "Novak", "Silva", "Haddad", "Bergman", "Petrov", "Wallace", "Osei", "Chen", "Fischer", "Moreau", "Ibrahim", "Duarte", "Voss"];
const roles = ["Data Steward", "Compliance Officer", "Integration Engineer", "Security Analyst", "Institution Admin", "Gateway Operator", "Privacy Counsel"];
const departments = ["Identity Platform", "Trust & Safety", "Core Banking", "Health Records", "Payments", "Regulatory Affairs", "Infrastructure"];
const institutions = ["Meridian Bank", "Helix Health", "Northwind Insurance", "Aster Telecom", "Vantage Capital", "Solace Retail", "Origin Logistics"];
const statuses: Status[] = ["active", "pending", "connected", "expired", "degraded"];

export const agents: Agent[] = Array.from({ length: 48 }).map((_, i) => {
  const world = pick(worlds);
  const first = pick(firstNames);
  const last = pick(lastNames);
  return {
    id: `agt-${1000 + i}`,
    name: `${first} ${last}`,
    avatar: `${first[0]}${last[0]}`,
    role: pick(roles),
    department: pick(departments),
    institution: pick(institutions),
    world: world.name,
    country: world.jurisdiction,
    lockerCount: int(1, 24),
    status: pick(statuses),
    lastActive: new Date(Date.now() - int(1, 60 * 24 * 6) * 60000).toISOString(),
  };
});

export const lockers: Locker[] = Array.from({ length: 36 }).map((_, i) => {
  const world = pick(worlds);
  const total = pick([50, 100, 250, 500, 1000]);
  return {
    id: `lck-${2000 + i}`,
    name: `${pick(departments)} Vault ${i + 1}`,
    owner: `${pick(firstNames)} ${pick(lastNames)}`,
    world: world.name,
    storageUsedGb: Math.round(total * rand() * 0.9 * 10) / 10,
    storageTotalGb: total,
    security: pick(["standard", "elevated", "maximum"] as const),
    endpoint: `gw-${world.id}.meridian.io/lockers/${2000 + i}`,
    published: rand() > 0.4,
    sharedFiles: int(0, 340),
    consentStatus: pick(["active", "pending", "expired", "revoked"] as Status[]),
    lastActivity: new Date(Date.now() - int(1, 60 * 24 * 10) * 60000).toISOString(),
  };
});

export const gateways: Gateway[] = worlds.flatMap((world, wi) =>
  Array.from({ length: world.gateways }).map((_, i) => ({
    id: `gw-${wi}-${i}`,
    name: `${world.name} Gateway ${i + 1}`,
    world: world.name,
    region: world.region,
    status: world.status === "offline" ? "offline" : pick(["active", "active", "active", "degraded"] as Status[]),
    latencyMs: int(8, 240),
    throughputMbps: int(80, 4200),
    uptime: Math.round((world.uptime - rand() * 1.5) * 100) / 100,
    requests24h: int(4000, 380000),
  }))
);

const txTypes: Transaction["type"][] = ["read", "write", "share", "revoke", "sync"];
export const transactions: Transaction[] = Array.from({ length: 120 }).map((_, i) => {
  const world = pick(worlds);
  const agent = pick(agents);
  return {
    id: `tx-${9000 + i}`,
    type: pick(txTypes),
    agent: agent.name,
    world: world.name,
    gateway: `${world.name} Gateway ${int(1, Math.max(world.gateways, 1))}`,
    status: pick(["connected", "pending", "expired", "revoked", "active"] as Status[]),
    amount: rand() > 0.5 ? int(1, 9800) : undefined,
    timestamp: new Date(Date.now() - int(1, 60 * 24 * 14) * 60000).toISOString(),
  };
});

const purposes = ["Credit risk scoring", "Cross-border KYC refresh", "Claims verification", "Fraud model training", "Care coordination sync", "Marketing attribution", "Regulatory audit export"];
export const consentRecords: ConsentRecord[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `cn-${3000 + i}`,
  purpose: pick(purposes),
  requester: pick(institutions),
  grantor: `${pick(firstNames)} ${pick(lastNames)}`,
  duration: pick(["7 days", "30 days", "90 days", "1 year", "Indefinite"]),
  status: pick(["requested", "pending", "approved", "connected", "expired", "rejected", "revoked"] as ConsentRecord["status"][]),
  expiry: new Date(Date.now() + int(-10, 200) * 24 * 60 * 60000).toISOString(),
  permissions: [pick(["Read profile", "Read transactions"]), pick(["Write annotations", "Share with third party"]), pick(["Export data", "Revoke anytime"])],
}));

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Gateway latency spike", description: "Singapore Gateway 1 exceeded 200ms for 4 minutes.", type: "warning", timestamp: new Date(Date.now() - 6 * 60000).toISOString(), read: false },
  { id: "n2", title: "Consent approved", description: "Helix Health approved claims verification for 90 days.", type: "success", timestamp: new Date(Date.now() - 22 * 60000).toISOString(), read: false },
  { id: "n3", title: "New locker published", description: "Regulatory Affairs Vault 12 is now publicly endpointed.", type: "info", timestamp: new Date(Date.now() - 55 * 60000).toISOString(), read: false },
  { id: "n4", title: "UAE world offline", description: "Connection to UAE jurisdiction gateway lost.", type: "error", timestamp: new Date(Date.now() - 130 * 60000).toISOString(), read: true },
  { id: "n5", title: "Weekly compliance digest ready", description: "42 institutions reviewed, 3 flags raised.", type: "info", timestamp: new Date(Date.now() - 400 * 60000).toISOString(), read: true },
];
