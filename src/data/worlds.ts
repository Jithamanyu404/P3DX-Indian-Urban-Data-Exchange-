import type { World } from "@/types";

export const worlds: World[] = [
  { id: "w-us", name: "North America", region: "AMER", jurisdiction: "United States", institutions: 42, agents: 1284, lockers: 5310, gateways: 6, status: "active", uptime: 99.98, color: "#2f7bff", lat: 39.8, lng: -98.5 },
  { id: "w-eu", name: "European Union", region: "EMEA", jurisdiction: "Belgium (GDPR)", institutions: 61, agents: 2091, lockers: 8420, gateways: 9, status: "active", uptime: 99.95, color: "#8b5cf6", lat: 50.8, lng: 4.3 },
  { id: "w-uk", name: "United Kingdom", region: "EMEA", jurisdiction: "United Kingdom", institutions: 18, agents: 640, lockers: 2210, gateways: 3, status: "active", uptime: 99.91, color: "#10b981", lat: 51.5, lng: -0.1 },
  { id: "w-sg", name: "Singapore", region: "APAC", jurisdiction: "Singapore (PDPA)", institutions: 14, agents: 402, lockers: 1180, gateways: 2, status: "degraded", uptime: 98.4, color: "#f59e0b", lat: 1.35, lng: 103.8 },
  { id: "w-jp", name: "Japan", region: "APAC", jurisdiction: "Japan (APPI)", institutions: 22, agents: 733, lockers: 2670, gateways: 4, status: "active", uptime: 99.88, color: "#fb7185", lat: 36.2, lng: 138.2 },
  { id: "w-br", name: "Brazil", region: "AMER", jurisdiction: "Brazil (LGPD)", institutions: 11, agents: 318, lockers: 940, gateways: 2, status: "pending", uptime: 99.2, color: "#4f9dff", lat: -14.2, lng: -51.9 },
  { id: "w-au", name: "Australia", region: "APAC", jurisdiction: "Australia (Privacy Act)", institutions: 9, agents: 261, lockers: 780, gateways: 2, status: "active", uptime: 99.93, color: "#34d399", lat: -25.2, lng: 133.7 },
  { id: "w-ae", name: "UAE", region: "EMEA", jurisdiction: "UAE (PDPL)", institutions: 7, agents: 190, lockers: 512, gateways: 1, status: "offline", uptime: 91.1, color: "#a78bfa", lat: 23.4, lng: 53.8 },
];
