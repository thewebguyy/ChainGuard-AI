"use client";

import { useState } from "react";
import {
    CheckCircle,
    Clock,
    AlertTriangle,
    Globe,
    Cloud,
    Truck,
    TrendingDown,
    Users,
    Shield,
    DollarSign,
    Filter,
    Eye,
    Check,
    X,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
    getRiskBadgeClass,
    getRiskLabel,
    formatCurrency,
    formatRelativeTime,
    getAlertTypeIcon,
} from "@/lib/utils";
import type { Alert, AlertType } from "@/lib/types";
import Topbar from "@/components/Topbar";

const TYPE_ICONS: Record<AlertType, React.ComponentType<{ size?: number; color?: string }>> = {
    geopolitical: Globe,
    weather: Cloud,
    logistics: Truck,
    financial: TrendingDown,
    labor: Users,
    cyber: Shield,
};

const TYPE_COLORS: Record<AlertType, string> = {
    geopolitical: "#818CF8",
    weather: "#60A5FA",
    logistics: "#34D399",
    financial: "#F59E0B",
    labor: "#FB923C",
    cyber: "#F43F5E",
};

function AlertCard({ alert }: { alert: Alert }) {
    const { acknowledgeAlert, resolveAlert } = useAppStore();
    const [showDetail, setShowDetail] = useState(false);
    const Icon = TYPE_ICONS[alert.type];
    const iconColor = TYPE_COLORS[alert.type];

    const timeToImpactLabel =
        alert.timeToImpact < 24
            ? `${alert.timeToImpact}h`
            : `${Math.round(alert.timeToImpact / 24)}d`;

    return (
        <div
            style={{
                background: "var(--bg-card)",
                border: `1px solid ${alert.acknowledged ? "var(--border)" : "rgba(244, 63, 94, 0.25)"}`,
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.2s ease",
                opacity: alert.resolved ? 0.55 : 1,
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: "16px 20px",
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                }}
            >
                {/* Icon */}
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        background: `${iconColor}18`,
                        border: `1px solid ${iconColor}35`,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                    }}
                >
                    <Icon size={18} color={iconColor} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            alignItems: "center",
                            marginBottom: "6px",
                        }}
                    >
                        <span className={getRiskBadgeClass(alert.severity)}>
                            {getRiskLabel(alert.severity)}
                        </span>
                        <span
                            className="chip"
                            style={{ fontSize: "0.6875rem", textTransform: "capitalize" }}
                        >
                            {alert.type}
                        </span>
                        {alert.acknowledged && (
                            <span
                                className="chip"
                                style={{
                                    color: "var(--success)",
                                    borderColor: "rgba(34, 197, 94, 0.2)",
                                    background: "rgba(34, 197, 94, 0.08)",
                                }}
                            >
                                Acknowledged
                            </span>
                        )}
                        {alert.resolved && (
                            <span
                                className="chip"
                                style={{
                                    color: "var(--text-muted)",
                                    fontSize: "0.6875rem",
                                }}
                            >
                                Resolved
                            </span>
                        )}
                    </div>
                    <h3
                        style={{
                            fontSize: "0.9375rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: "4px",
                            lineHeight: 1.4,
                        }}
                    >
                        {alert.title}
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "12px",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}
                        >
                            {alert.supplierName}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {alert.region}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {formatRelativeTime(alert.timestamp)}
                        </span>
                    </div>
                </div>

                {/* Metrics */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        alignItems: "flex-end",
                        flexShrink: 0,
                    }}
                >
                    {/* Probability */}
                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: 700,
                                color:
                                    alert.probability >= 80
                                        ? "var(--danger)"
                                        : alert.probability >= 60
                                            ? "var(--warning)"
                                            : "var(--success)",
                                lineHeight: 1,
                            }}
                        >
                            {alert.probability}%
                        </div>
                        <div
                            style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}
                        >
                            probability
                        </div>
                    </div>

                    {/* Time to impact */}
                    <div style={{ textAlign: "right" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Clock size={11} color="var(--text-muted)" />
                            <span
                                style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    color:
                                        alert.timeToImpact <= 24
                                            ? "var(--danger)"
                                            : alert.timeToImpact <= 72
                                                ? "var(--warning)"
                                                : "var(--text-secondary)",
                                }}
                            >
                                {timeToImpactLabel}
                            </span>
                        </div>
                        <div
                            style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}
                        >
                            to impact
                        </div>
                    </div>

                    {/* Predicted loss */}
                    <div style={{ textAlign: "right" }}>
                        <div
                            style={{
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: "var(--danger)",
                            }}
                        >
                            {formatCurrency(alert.predictedImpact, true)}
                        </div>
                        <div
                            style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}
                        >
                            pred. impact
                        </div>
                    </div>
                </div>
            </div>

            {/* Description (expandable) */}
            {showDetail && (
                <div
                    style={{
                        padding: "0 20px 16px 74px",
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        animation: "fadeIn 0.2s ease",
                    }}
                >
                    {alert.description}
                </div>
            )}

            {/* Action bar */}
            {!alert.resolved && (
                <div
                    style={{
                        padding: "10px 20px",
                        borderTop: "1px solid var(--border)",
                        background: "var(--bg-surface)",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setShowDetail(!showDetail)}
                        style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                    >
                        <Eye size={13} />
                        {showDetail ? "Less" : "Details"}
                    </button>
                    <div style={{ flex: 1 }} />

                    {!alert.acknowledged && (
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                        >
                            <Check size={13} />
                            Acknowledge
                        </button>
                    )}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => resolveAlert(alert.id)}
                    >
                        <CheckCircle size={13} />
                        Mark Resolved
                    </button>
                </div>
            )}
        </div>
    );
}

export default function AlertsPage() {
    const { alerts } = useAppStore();
    const [filter, setFilter] = useState<"all" | "active" | "acknowledged" | "resolved">(
        "all"
    );
    const [typeFilter, setTypeFilter] = useState<AlertType | "all">("all");

    const filtered = alerts
        .filter((a) => {
            if (filter === "active") return !a.resolved && !a.acknowledged;
            if (filter === "acknowledged") return a.acknowledged && !a.resolved;
            if (filter === "resolved") return a.resolved;
            return true;
        })
        .filter((a) => typeFilter === "all" || a.type === typeFilter);

    const stats = {
        total: alerts.length,
        active: alerts.filter((a) => !a.resolved && !a.acknowledged).length,
        acknowledged: alerts.filter((a) => a.acknowledged && !a.resolved).length,
        resolved: alerts.filter((a) => a.resolved).length,
        totalImpact: alerts
            .filter((a) => !a.resolved)
            .reduce((sum, a) => sum + a.predictedImpact, 0),
    };

    const alertTypes: Array<{ value: AlertType | "all"; label: string; emoji: string }> = [
        { value: "all", label: "All Types", emoji: "📊" },
        { value: "geopolitical", label: "Geopolitical", emoji: "🌐" },
        { value: "weather", label: "Weather", emoji: "🌪" },
        { value: "logistics", label: "Logistics", emoji: "🚢" },
        { value: "financial", label: "Financial", emoji: "💹" },
        { value: "labor", label: "Labor", emoji: "⚡" },
        { value: "cyber", label: "Cyber", emoji: "🛡" },
    ];

    return (
        <div>
            <Topbar
                title="Risk Alerts"
                subtitle={`${stats.active} active · ${stats.acknowledged} acknowledged · ${stats.resolved} resolved`}
            />
            <div style={{ padding: "24px" }}>
                {/* Impact banner */}
                <div
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(245, 158, 11, 0.06) 100%)",
                        border: "1px solid rgba(244, 63, 94, 0.2)",
                        borderRadius: "12px",
                        padding: "16px 20px",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <AlertTriangle size={24} color="var(--danger)" />
                    <div>
                        <div
                            style={{
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                            }}
                        >
                            Total Predicted Risk Exposure:{" "}
                            <span style={{ color: "var(--danger)" }}>
                                {formatCurrency(stats.totalImpact)}
                            </span>
                        </div>
                        <div
                            style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}
                        >
                            Across {stats.total - stats.resolved} active/acknowledged alerts.
                            Resolve critical alerts to reduce exposure.
                        </div>
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <div
                            style={{
                                fontSize: "0.8125rem",
                                color: "var(--text-muted)",
                                marginBottom: "4px",
                            }}
                        >
                            Avg Probability
                        </div>
                        <div
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: "var(--warning)",
                            }}
                        >
                            {Math.round(
                                alerts.reduce((s, a) => s + a.probability, 0) / alerts.length
                            )}
                            %
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "16px",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <div style={{ display: "flex", gap: "6px" }}>
                        {(
                            [
                                { value: "all", label: "All" },
                                { value: "active", label: `Active (${stats.active})` },
                                {
                                    value: "acknowledged",
                                    label: `Acknowledged (${stats.acknowledged})`,
                                },
                                { value: "resolved", label: `Resolved (${stats.resolved})` },
                            ] as const
                        ).map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setFilter(opt.value)}
                                style={{
                                    padding: "7px 14px",
                                    borderRadius: "8px",
                                    border: "1px solid",
                                    fontSize: "0.8125rem",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    borderColor:
                                        filter === opt.value
                                            ? "var(--primary)"
                                            : "var(--border-strong)",
                                    background:
                                        filter === opt.value
                                            ? "rgba(37, 99, 235, 0.12)"
                                            : "var(--bg-elevated)",
                                    color:
                                        filter === opt.value
                                            ? "var(--primary-light)"
                                            : "var(--text-secondary)",
                                }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ width: 1, height: 20, background: "var(--border)" }} />

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {alertTypes.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTypeFilter(t.value)}
                                style={{
                                    padding: "5px 12px",
                                    borderRadius: "20px",
                                    border: "1px solid",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    borderColor:
                                        typeFilter === t.value
                                            ? "var(--primary)"
                                            : "var(--border-strong)",
                                    background:
                                        typeFilter === t.value
                                            ? "rgba(37, 99, 235, 0.12)"
                                            : "transparent",
                                    color:
                                        typeFilter === t.value
                                            ? "var(--primary-light)"
                                            : "var(--text-muted)",
                                }}
                            >
                                {t.emoji} {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Alert list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {filtered.length === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "60px 20px",
                                color: "var(--text-muted)",
                            }}
                        >
                            <CheckCircle
                                size={40}
                                color="var(--success)"
                                style={{ marginBottom: "12px" }}
                            />
                            <div style={{ fontSize: "1rem", fontWeight: 600 }}>
                                All clear in this category
                            </div>
                            <div style={{ fontSize: "0.875rem", marginTop: "4px" }}>
                                No alerts match current filters
                            </div>
                        </div>
                    ) : (
                        filtered.map((alert) => (
                            <AlertCard key={alert.id} alert={alert} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
