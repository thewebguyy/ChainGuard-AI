// ─── Supplier types ──────────────────────────────────────────────────────────

export type RiskLevel = "critical" | "high" | "medium" | "low" | "none";

export interface Supplier {
    id: string;
    name: string;
    country: string;
    countryCode: string;
    region: "asia" | "europe" | "americas" | "africa";
    category: string;
    components: string[];
    riskScore: number; // 0-100
    riskLevel: RiskLevel;
    status: "active" | "at_risk" | "disrupted" | "recovering";
    lastUpdated: string;
    contactName: string;
    contactEmail: string;
    tier: 1 | 2 | 3;
    annualSpend: number; // USD
    lat: number;
    lng: number;
    trend: "up" | "down" | "stable";
    alerts: number;
}

// ─── Alert types ─────────────────────────────────────────────────────────────

export type AlertType =
    | "geopolitical"
    | "weather"
    | "logistics"
    | "financial"
    | "labor"
    | "cyber";

export interface Alert {
    id: string;
    supplierId: string;
    supplierName: string;
    type: AlertType;
    severity: RiskLevel;
    title: string;
    description: string;
    timestamp: string;
    predictedImpact: number; // USD
    probability: number; // 0-100
    timeToImpact: number; // hours
    resolved: boolean;
    region: string;
    acknowledged: boolean;
}

// ─── Analytics types ──────────────────────────────────────────────────────────

export interface RiskTrend {
    date: string;
    critical: number;
    high: number;
    medium: number;
    low: number;
}

export interface RegionRisk {
    region: string;
    suppliers: number;
    avgRisk: number;
    disruptions: number;
}

export interface SavingsMetric {
    month: string;
    avoided: number;
    actual: number;
}

// ─── User / Auth types ────────────────────────────────────────────────────────

export type UserRole = "admin" | "analyst";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    company: string;
    tier: "starter" | "pro" | "enterprise";
    supplierCount: number;
    supplierLimit: number;
    avatar?: string;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
    totalSuppliers: number;
    activeAlerts: number;
    criticalAlerts: number;
    avgRiskScore: number;
    disruptionsAvoided: number;
    savingsThisMonth: number;
    savingsTotal: number;
    uptimePercent: number;
}
