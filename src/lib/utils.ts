import type { RiskLevel } from "./types";

export function getRiskColor(level: RiskLevel): string {
    const map: Record<RiskLevel, string> = {
        critical: "#FF3B5C",
        high: "#FF8000",
        medium: "#FACC15",
        low: "#22C55E",
        none: "#94A3B8",
    };
    return map[level];
}

export function getRiskBadgeClass(level: RiskLevel): string {
    const map: Record<RiskLevel, string> = {
        critical: "badge-critical",
        high: "badge-high",
        medium: "badge-medium",
        low: "badge-low",
        none: "badge-none",
    };
    return `badge ${map[level]}`;
}

export function getRiskLabel(level: RiskLevel): string {
    return level.charAt(0).toUpperCase() + level.slice(1);
}

export function scoreToRiskLevel(score: number): RiskLevel {
    if (score >= 80) return "critical";
    if (score >= 60) return "high";
    if (score >= 40) return "medium";
    if (score >= 20) return "low";
    return "none";
}

export function formatCurrency(value: number, compact = false): string {
    if (compact && value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (compact && value >= 1_000) {
        return `$${(value / 1_000).toFixed(0)}k`;
    }
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatRelativeTime(timestamp: string): string {
    const now = new Date("2026-03-05T19:38:44+01:00");
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}

export function getStatusLabel(
    status: "active" | "at_risk" | "disrupted" | "recovering"
): string {
    const map = {
        active: "Active",
        at_risk: "At Risk",
        disrupted: "Disrupted",
        recovering: "Recovering",
    };
    return map[status];
}

export function getStatusColor(
    status: "active" | "at_risk" | "disrupted" | "recovering"
): string {
    const map = {
        active: "#22C55E",
        at_risk: "#F59E0B",
        disrupted: "#FF3B5C",
        recovering: "#60A5FA",
    };
    return map[status];
}

export function getAlertTypeIcon(
    type: "geopolitical" | "weather" | "logistics" | "financial" | "labor" | "cyber"
): string {
    const map = {
        geopolitical: "🌐",
        weather: "🌪",
        logistics: "🚢",
        financial: "💹",
        labor: "⚡",
        cyber: "🛡",
    };
    return map[type];
}

export function clsxJoin(...classes: (string | undefined | false | null)[]): string {
    return classes.filter(Boolean).join(" ");
}
