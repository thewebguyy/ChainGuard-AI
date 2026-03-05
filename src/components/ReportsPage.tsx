"use client";

import { useState } from "react";
import {
    FileText,
    Download,
    Calendar,
    CheckCircle,
    Clock,
    AlertTriangle,
    TrendingDown,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { DASHBOARD_STATS } from "@/lib/mock-data";
import Topbar from "@/components/Topbar";

interface ReportTemplate {
    id: string;
    title: string;
    description: string;
    frequency: string;
    lastGenerated: string;
    format: "PDF" | "CSV" | "Both";
    icon: React.ComponentType<{ size?: number; color?: string }>;
    iconColor: string;
    iconBg: string;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
    {
        id: "weekly_risk",
        title: "Weekly Risk Summary",
        description:
            "Full supplier risk scores, active alerts, region breakdown, and recommended actions for the past 7 days.",
        frequency: "Weekly · Every Monday",
        lastGenerated: "2026-03-02",
        format: "PDF",
        icon: AlertTriangle,
        iconColor: "#F43F5E",
        iconBg: "rgba(244, 63, 94, 0.12)",
    },
    {
        id: "monthly_roi",
        title: "Monthly ROI Report",
        description:
            "Savings achieved, disruptions avoided, cost trends, and ChainGuard AI subscription value analysis.",
        frequency: "Monthly · 1st of month",
        lastGenerated: "2026-03-01",
        format: "PDF",
        icon: TrendingDown,
        iconColor: "#10B981",
        iconBg: "rgba(16, 185, 129, 0.12)",
    },
    {
        id: "supplier_scorecard",
        title: "Supplier Scorecard Export",
        description:
            "CSV export of all supplier risk scores, statuses, contact info, alerts, and spend data.",
        frequency: "On demand",
        lastGenerated: "2026-03-04",
        format: "CSV",
        icon: FileText,
        iconColor: "#60A5FA",
        iconBg: "rgba(96, 165, 250, 0.12)",
    },
    {
        id: "executive_brief",
        title: "Executive Risk Brief",
        description:
            "One-page C-suite summary: top 5 risks, financial exposure, mitigation actions, and trend arrows.",
        frequency: "Monthly",
        lastGenerated: "2026-03-01",
        format: "PDF",
        icon: CheckCircle,
        iconColor: "#818CF8",
        iconBg: "rgba(129, 140, 248, 0.12)",
    },
    {
        id: "compliance_audit",
        title: "Compliance Audit Log",
        description:
            "Full audit trail of all user actions, alert acknowledgements, supplier changes, and data access logs for GDPR compliance.",
        frequency: "Quarterly",
        lastGenerated: "2026-01-01",
        format: "Both",
        icon: Clock,
        iconColor: "#F59E0B",
        iconBg: "rgba(245, 158, 11, 0.12)",
    },
    {
        id: "disruption_forecast",
        title: "30-Day Disruption Forecast",
        description:
            "ML-driven risk projections for next 30 days, broken down by supplier, region, and event type.",
        frequency: "Weekly · Fridays",
        lastGenerated: "2026-02-28",
        format: "PDF",
        icon: Calendar,
        iconColor: "#06B6D4",
        iconBg: "rgba(6, 182, 212, 0.12)",
    },
];

const RECENT_REPORTS = [
    {
        id: "r1",
        title: "Weekly Risk Summary – W9 2026",
        date: "2026-03-02",
        format: "PDF",
        size: "2.4 MB",
        status: "ready",
    },
    {
        id: "r2",
        title: "Monthly ROI Report – Feb 2026",
        date: "2026-03-01",
        format: "PDF",
        size: "3.1 MB",
        status: "ready",
    },
    {
        id: "r3",
        title: "Supplier Scorecard – Mar 4 2026",
        date: "2026-03-04",
        format: "CSV",
        size: "145 KB",
        status: "ready",
    },
    {
        id: "r4",
        title: "Executive Brief – Feb 2026",
        date: "2026-03-01",
        format: "PDF",
        size: "890 KB",
        status: "ready",
    },
    {
        id: "r5",
        title: "30-Day Forecast – Feb 28 2026",
        date: "2026-02-28",
        format: "PDF",
        size: "1.8 MB",
        status: "ready",
    },
];

export default function ReportsPage() {
    const [generating, setGenerating] = useState<string | null>(null);
    const [generated, setGenerated] = useState<Set<string>>(new Set());

    const handleGenerate = (id: string) => {
        setGenerating(id);
        setTimeout(() => {
            setGenerating(null);
            setGenerated((prev) => new Set(prev).add(id));
        }, 2000);
    };

    return (
        <div>
            <Topbar
                title="Reports"
                subtitle="Generate, schedule, and download supply chain intelligence reports"
            />
            <div style={{ padding: "24px" }}>
                {/* Summary row */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "12px",
                        marginBottom: "24px",
                    }}
                >
                    {[
                        {
                            label: "Reports Generated",
                            value: "47",
                            sub: "past 6 months",
                            color: "var(--primary-light)",
                        },
                        {
                            label: "Total Savings Documented",
                            value: formatCurrency(DASHBOARD_STATS.savingsTotal, true),
                            sub: "in reports",
                            color: "var(--success)",
                        },
                        {
                            label: "Reports Scheduled",
                            value: "4",
                            sub: "active schedules",
                            color: "var(--accent-cyan)",
                        },
                        {
                            label: "Last Export",
                            value: "Mar 4",
                            sub: "Supplier Scorecard CSV",
                            color: "var(--warning)",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                borderRadius: "10px",
                                padding: "16px 18px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "1.375rem",
                                    fontWeight: 700,
                                    color: stat.color,
                                    letterSpacing: "-0.02em",
                                    marginBottom: "2px",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}
                            >
                                {stat.label}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.6875rem",
                                    color: "var(--text-muted)",
                                    opacity: 0.7,
                                }}
                            >
                                {stat.sub}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.4fr 1fr",
                        gap: "24px",
                    }}
                >
                    {/* Report templates */}
                    <div>
                        <h2
                            style={{
                                fontSize: "0.9375rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                marginBottom: "14px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <FileText size={16} color="var(--primary-light)" />
                            Report Templates
                        </h2>
                        <div
                            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                        >
                            {REPORT_TEMPLATES.map((tpl) => {
                                const Icon = tpl.icon;
                                const isGenerating = generating === tpl.id;
                                const isDone = generated.has(tpl.id);
                                return (
                                    <div
                                        key={tpl.id}
                                        style={{
                                            background: "var(--bg-card)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "12px",
                                            padding: "16px 18px",
                                            display: "flex",
                                            gap: "14px",
                                            alignItems: "flex-start",
                                            transition: "border-color 0.15s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor =
                                                "var(--border-strong)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.borderColor =
                                                "var(--border)";
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 38,
                                                height: 38,
                                                borderRadius: "9px",
                                                background: tpl.iconBg,
                                                display: "grid",
                                                placeItems: "center",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Icon size={17} color={tpl.iconColor} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div
                                                style={{
                                                    fontSize: "0.9rem",
                                                    fontWeight: 600,
                                                    color: "var(--text-primary)",
                                                    marginBottom: "4px",
                                                }}
                                            >
                                                {tpl.title}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "0.78rem",
                                                    color: "var(--text-secondary)",
                                                    lineHeight: 1.5,
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                {tpl.description}
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "12px",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <span className="chip" style={{ fontSize: "0.6875rem" }}>
                                                    {tpl.frequency}
                                                </span>
                                                <span className="chip" style={{ fontSize: "0.6875rem" }}>
                                                    {tpl.format}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "0.6875rem",
                                                        color: "var(--text-muted)",
                                                    }}
                                                >
                                                    Last: {tpl.lastGenerated}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className={`btn btn-sm ${isDone ? "btn-secondary" : "btn-primary"}`}
                                            onClick={() => handleGenerate(tpl.id)}
                                            disabled={isGenerating}
                                            style={{ flexShrink: 0 }}
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <span className="animate-spin" style={{ display: "inline-block" }}>⟳</span>
                                                    Generating...
                                                </>
                                            ) : isDone ? (
                                                <>
                                                    <Download size={13} />
                                                    Download
                                                </>
                                            ) : (
                                                <>
                                                    <FileText size={13} />
                                                    Generate
                                                </>
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent reports */}
                    <div>
                        <h2
                            style={{
                                fontSize: "0.9375rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                marginBottom: "14px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Clock size={16} color="var(--text-muted)" />
                            Recent Reports
                        </h2>
                        <div
                            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                        >
                            {RECENT_REPORTS.map((report) => (
                                <div
                                    key={report.id}
                                    style={{
                                        background: "var(--bg-card)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "10px",
                                        padding: "14px 16px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor =
                                            "var(--border-strong)";
                                        (e.currentTarget as HTMLElement).style.background =
                                            "var(--bg-card-hover)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor =
                                            "var(--border)";
                                        (e.currentTarget as HTMLElement).style.background =
                                            "var(--bg-card)";
                                    }}
                                >
                                    <FileText size={18} color="var(--primary-light)" />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                fontSize: "0.8125rem",
                                                fontWeight: 600,
                                                color: "var(--text-primary)",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {report.title}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "var(--text-muted)",
                                                display: "flex",
                                                gap: "8px",
                                            }}
                                        >
                                            <span>{report.date}</span>
                                            <span>·</span>
                                            <span
                                                style={{
                                                    color:
                                                        report.format === "PDF"
                                                            ? "var(--danger)"
                                                            : "var(--success)",
                                                }}
                                            >
                                                {report.format}
                                            </span>
                                            <span>·</span>
                                            <span>{report.size}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        style={{ padding: "6px", color: "var(--primary-light)" }}
                                        aria-label={`Download ${report.title}`}
                                    >
                                        <Download size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Scheduled reports */}
                        <div
                            style={{
                                marginTop: "24px",
                                padding: "18px",
                                background:
                                    "linear-gradient(135deg, rgba(37, 99, 235, 0.07) 0%, rgba(124, 58, 237, 0.05) 100%)",
                                border: "1px solid rgba(37, 99, 235, 0.18)",
                                borderRadius: "12px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    marginBottom: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                            >
                                <Calendar size={14} color="var(--primary-light)" />
                                Upcoming Scheduled Reports
                            </div>
                            {[
                                {
                                    title: "Weekly Risk Summary",
                                    date: "Mon, Mar 9",
                                    format: "PDF",
                                },
                                {
                                    title: "30-Day Forecast",
                                    date: "Fri, Mar 7",
                                    format: "PDF",
                                },
                                {
                                    title: "Monthly ROI Report",
                                    date: "Apr 1",
                                    format: "PDF",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "8px 0",
                                        borderBottom: "1px solid var(--border)",
                                        fontSize: "0.8125rem",
                                    }}
                                >
                                    <span style={{ color: "var(--text-secondary)" }}>
                                        {item.title}
                                    </span>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                                            {item.date}
                                        </span>
                                        <span className="chip" style={{ fontSize: "0.6875rem", color: "var(--danger)" }}>
                                            {item.format}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
