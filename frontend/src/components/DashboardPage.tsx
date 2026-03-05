"use client";

import {
    TrendingUp,
    TrendingDown,
    Minus,
    AlertTriangle,
    Shield,
    DollarSign,
    Activity,
    Globe,
    Users,
    Zap,
} from "lucide-react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useAppStore } from "@/lib/store";
import {
    DASHBOARD_STATS,
    RISK_TRENDS,
    SAVINGS_DATA,
    REGION_RISKS,
} from "@/lib/mock-data";
import {
    formatCurrency,
    getRiskColor,
    formatRelativeTime,
    getAlertTypeIcon,
    getRiskBadgeClass,
} from "@/lib/utils";
import Topbar from "@/components/Topbar";

// ── Stat Card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    changePositive: boolean;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    iconColor: string;
    iconBg: string;
    subtitle?: string;
}

function StatCard({
    title,
    value,
    change,
    changePositive,
    icon: Icon,
    iconColor,
    iconBg,
    subtitle,
}: StatCardProps) {
    const TrendIcon = changePositive
        ? TrendingUp
        : change === "stable"
            ? Minus
            : TrendingDown;

    return (
        <div className="stat-card">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        background: iconBg,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <Icon size={18} color={iconColor} />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: changePositive ? "var(--success)" : "var(--danger)",
                    }}
                >
                    <TrendIcon size={12} />
                    {change}
                </div>
            </div>
            <div
                style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: "4px",
                }}
            >
                {value}
            </div>
            <div
                style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                }}
            >
                {title}
            </div>
            {subtitle && (
                <div
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        marginTop: "4px",
                    }}
                >
                    {subtitle}
                </div>
            )}
        </div>
    );
}

// ── Custom Recharts tooltip ────────────────────────────────────────────────────

const CustomTooltip = ({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
}) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    fontSize: "0.8125rem",
                }}
            >
                <p
                    style={{
                        color: "var(--text-muted)",
                        marginBottom: "8px",
                        fontWeight: 500,
                    }}
                >
                    {label}
                </p>
                {payload.map((entry) => (
                    <div
                        key={entry.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "4px",
                        }}
                    >
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: entry.color,
                                display: "block",
                            }}
                        />
                        <span style={{ color: "var(--text-secondary)" }}>
                            {entry.name}:
                        </span>
                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                            {typeof entry.value === "number" && entry.name.includes("$")
                                ? formatCurrency(entry.value, true)
                                : entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// ── World map SVG component ───────────────────────────────────────────────────

function SupplyChainMap() {
    const { suppliers } = useAppStore();

    // Simplified world map coordinates scaled to 800x400 viewBox
    const toMapCoords = (lat: number, lng: number) => ({
        x: ((lng + 180) / 360) * 800,
        y: ((90 - lat) / 180) * 400,
    });

    return (
        <div
            style={{
                background: "var(--bg-surface)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <div
                style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Globe size={16} color="var(--primary-light)" />
                    <span className="section-heading" style={{ fontSize: "0.9375rem" }}>
                        Global Supplier Network
                    </span>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    {["critical", "high", "medium", "low"].map((level) => (
                        <div
                            key={level}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "0.75rem",
                                color: "var(--text-muted)",
                            }}
                        >
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: getRiskColor(level as "critical" | "high" | "medium" | "low"),
                                    display: "block",
                                }}
                            />
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ padding: "20px", position: "relative" }}>
                <svg
                    viewBox="0 0 800 400"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "300px",
                    }}
                >
                    {/* Simplified world map background */}
                    <rect width="800" height="400" fill="rgba(13, 21, 37, 0.5)" rx="4" />
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={`h${i}`}
                            x1="0"
                            y1={i * 100}
                            x2="800"
                            y2={i * 100}
                            stroke="rgba(255,255,255,0.04)"
                            strokeWidth="1"
                        />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <line
                            key={`v${i}`}
                            x1={i * 100}
                            y1="0"
                            x2={i * 100}
                            y2="400"
                            stroke="rgba(255,255,255,0.04)"
                            strokeWidth="1"
                        />
                    ))}
                    {/* Continents approximation */}
                    {/* Europe */}
                    <ellipse cx="420" cy="130" rx="50" ry="35" fill="rgba(255,255,255,0.04)" />
                    {/* Asia & East Asia */}
                    <ellipse cx="590" cy="140" rx="100" ry="50" fill="rgba(255,255,255,0.04)" />
                    {/* North America */}
                    <ellipse cx="170" cy="150" rx="75" ry="55" fill="rgba(255,255,255,0.04)" />
                    {/* South America */}
                    <ellipse cx="220" cy="280" rx="50" ry="65" fill="rgba(255,255,255,0.04)" />
                    {/* Africa */}
                    <ellipse cx="420" cy="240" rx="55" ry="75" fill="rgba(255,255,255,0.04)" />
                    {/* Australia */}
                    <ellipse cx="660" cy="300" rx="40" ry="30" fill="rgba(255,255,255,0.04)" />

                    {/* Connection lines between suppliers */}
                    {suppliers.slice(0, 8).map((sup, i) => {
                        const { x, y } = toMapCoords(sup.lat, sup.lng);
                        const hubX = 160; // Texas HQ
                        const hubY = 195;
                        return (
                            <line
                                key={sup.id}
                                x1={hubX}
                                y1={hubY}
                                x2={x}
                                y2={y}
                                stroke={getRiskColor(sup.riskLevel)}
                                strokeWidth="0.75"
                                strokeDasharray="4,4"
                                opacity="0.35"
                            />
                        );
                    })}

                    {/* HQ node */}
                    <circle cx="160" cy="195" r="8" fill="#2563EB" opacity="0.9" />
                    <circle
                        cx="160"
                        cy="195"
                        r="14"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="1"
                        opacity="0.4"
                    />
                    <text
                        x="160"
                        y="216"
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.6)"
                        fontSize="8"
                    >
                        HQ
                    </text>

                    {/* Supplier nodes */}
                    {suppliers.map((sup) => {
                        const { x, y } = toMapCoords(sup.lat, sup.lng);
                        const color = getRiskColor(sup.riskLevel);
                        return (
                            <g key={sup.id}>
                                <circle cx={x} cy={y} r="5" fill={color} opacity="0.9" />
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="9"
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="1"
                                    opacity="0.35"
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const { alerts, suppliers, setCurrentPage } = useAppStore();
    const activeAlerts = alerts
        .filter((a) => !a.resolved)
        .sort(
            (a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, 5);

    const topRiskSuppliers = [...suppliers]
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 5);

    return (
        <div>
            <Topbar
                title="Dashboard"
                subtitle="Real-time supply chain risk overview · March 5, 2026"
            />
            <div style={{ padding: "24px", maxWidth: "1400px" }}>
                {/* Stats Grid */}
                <div className="grid-metrics" style={{ marginBottom: "24px" }}>
                    <StatCard
                        title="Active Suppliers"
                        value={String(DASHBOARD_STATS.totalSuppliers)}
                        change="+2 this month"
                        changePositive
                        icon={Users}
                        iconColor="#60A5FA"
                        iconBg="rgba(37, 99, 235, 0.12)"
                    />
                    <StatCard
                        title="Active Alerts"
                        value={String(DASHBOARD_STATS.activeAlerts)}
                        change="2 critical"
                        changePositive={false}
                        icon={AlertTriangle}
                        iconColor="#F43F5E"
                        iconBg="rgba(244, 63, 94, 0.12)"
                    />
                    <StatCard
                        title="Avg Risk Score"
                        value={`${DASHBOARD_STATS.avgRiskScore.toFixed(0)}/100`}
                        change="+4.2 vs last week"
                        changePositive={false}
                        icon={Activity}
                        iconColor="#F59E0B"
                        iconBg="rgba(245, 158, 11, 0.12)"
                    />
                    <StatCard
                        title="Savings This Month"
                        value={formatCurrency(DASHBOARD_STATS.savingsThisMonth, true)}
                        change="via 23 alerts"
                        changePositive
                        icon={DollarSign}
                        iconColor="#10B981"
                        iconBg="rgba(16, 185, 129, 0.12)"
                        subtitle="$819k total savings"
                    />
                    <StatCard
                        title="Total Savings (6mo)"
                        value={formatCurrency(DASHBOARD_STATS.savingsTotal, true)}
                        change="+18% vs last Q"
                        changePositive
                        icon={Shield}
                        iconColor="#818CF8"
                        iconBg="rgba(129, 140, 248, 0.12)"
                    />
                </div>

                {/* Charts Row */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        marginBottom: "20px",
                    }}
                >
                    {/* Risk Trends */}
                    <div className="card" style={{ padding: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <span className="section-heading">
                                <TrendingUp size={16} color="var(--primary-light)" />
                                Risk Trends (6 Weeks)
                            </span>
                            <span
                                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                            >
                                By severity level
                            </span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={RISK_TRENDS}>
                                <defs>
                                    <linearGradient id="gradCritical" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF3B5C" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#FF3B5C" stopOpacity={0.02} />
                                    </linearGradient>
                                    <linearGradient id="gradHigh" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF8000" stopOpacity={0.25} />
                                        <stop offset="100%" stopColor="#FF8000" stopOpacity={0.02} />
                                    </linearGradient>
                                    <linearGradient id="gradMedium" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FACC15" stopOpacity={0.2} />
                                        <stop offset="100%" stopColor="#FACC15" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.05)"
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="critical"
                                    name="Critical"
                                    stroke="#FF3B5C"
                                    strokeWidth={2}
                                    fill="url(#gradCritical)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="high"
                                    name="High"
                                    stroke="#FF8000"
                                    strokeWidth={2}
                                    fill="url(#gradHigh)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="medium"
                                    name="Medium"
                                    stroke="#FACC15"
                                    strokeWidth={2}
                                    fill="url(#gradMedium)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Savings Chart */}
                    <div className="card" style={{ padding: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <span className="section-heading">
                                <DollarSign size={16} color="#10B981" />
                                ROI – Avoided vs Actual Losses
                            </span>
                            <span
                                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                            >
                                6 months
                            </span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={SAVINGS_DATA} barGap={4}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.05)"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => `$${v / 1000}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                                />
                                <Bar
                                    dataKey="avoided"
                                    name="$ Avoided"
                                    radius={[4, 4, 0, 0]}
                                    fill="#10B981"
                                    opacity={0.85}
                                />
                                <Bar
                                    dataKey="actual"
                                    name="$ Actual Loss"
                                    radius={[4, 4, 0, 0]}
                                    fill="#F43F5E"
                                    opacity={0.75}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Map */}
                <div style={{ marginBottom: "20px" }}>
                    <SupplyChainMap />
                </div>

                {/* Bottom Row: Alerts + Top Risk Suppliers + Regions */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.4fr 1fr 0.8fr",
                        gap: "20px",
                    }}
                >
                    {/* Recent Alerts */}
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div
                            style={{
                                padding: "16px 20px",
                                borderBottom: "1px solid var(--border)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span className="section-heading">
                                <AlertTriangle size={16} color="var(--danger)" />
                                Recent Alerts
                            </span>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => setCurrentPage("alerts")}
                                style={{ fontSize: "0.75rem", color: "var(--primary-light)" }}
                            >
                                View all →
                            </button>
                        </div>
                        <div>
                            {activeAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className="alert-card"
                                    style={{
                                        borderRadius: 0,
                                        borderLeft: "none",
                                        borderRight: "none",
                                        borderTop: "none",
                                        borderBottom: "1px solid var(--border)",
                                    }}
                                >
                                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
                                        {getAlertTypeIcon(alert.type)}
                                    </span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                                alignItems: "center",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "0.8125rem",
                                                    fontWeight: 600,
                                                    color: "var(--text-primary)",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {alert.title}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <span className={getRiskBadgeClass(alert.severity)}>
                                                {alert.severity}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "0.75rem",
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                {alert.supplierName}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "0.75rem",
                                                    color: "var(--text-muted)",
                                                    marginLeft: "auto",
                                                }}
                                            >
                                                {formatRelativeTime(alert.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Risk Suppliers */}
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div
                            style={{
                                padding: "16px 20px",
                                borderBottom: "1px solid var(--border)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span className="section-heading">
                                <Zap size={16} color="var(--warning)" />
                                Highest Risk
                            </span>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => setCurrentPage("suppliers")}
                                style={{ fontSize: "0.75rem", color: "var(--primary-light)" }}
                            >
                                View all →
                            </button>
                        </div>
                        <div style={{ padding: "8px 0" }}>
                            {topRiskSuppliers.map((sup) => (
                                <div
                                    key={sup.id}
                                    style={{
                                        padding: "10px 20px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        cursor: "pointer",
                                        transition: "background 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background =
                                            "var(--bg-elevated)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background =
                                            "transparent";
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "0.8125rem",
                                            color: "var(--text-secondary)",
                                            width: 14,
                                            textAlign: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {topRiskSuppliers.indexOf(sup) + 1}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                fontSize: "0.8125rem",
                                                fontWeight: 600,
                                                color: "var(--text-primary)",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            {sup.name}
                                        </div>
                                        <div className="risk-bar">
                                            <div
                                                className="risk-bar-fill"
                                                style={{
                                                    width: `${sup.riskScore}%`,
                                                    background: getRiskColor(sup.riskLevel),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: 700,
                                            color: getRiskColor(sup.riskLevel),
                                            width: 28,
                                            textAlign: "right",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {sup.riskScore}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Region Breakdown */}
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div
                            style={{
                                padding: "16px 20px",
                                borderBottom: "1px solid var(--border)",
                            }}
                        >
                            <span className="section-heading">
                                <Globe size={16} color="var(--accent-cyan)" />
                                By Region
                            </span>
                        </div>
                        <div style={{ padding: "12px 16px" }}>
                            {REGION_RISKS.map((region) => (
                                <div
                                    key={region.region}
                                    style={{
                                        padding: "10px 0",
                                        borderBottom: "1px solid var(--border)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "6px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "0.8125rem",
                                                fontWeight: 500,
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            {region.region}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "0.75rem",
                                                fontWeight: 700,
                                                color: getRiskColor(
                                                    region.avgRisk >= 70
                                                        ? "high"
                                                        : region.avgRisk >= 50
                                                            ? "medium"
                                                            : "low"
                                                ),
                                            }}
                                        >
                                            {region.avgRisk}
                                        </span>
                                    </div>
                                    <div className="risk-bar">
                                        <div
                                            className="risk-bar-fill"
                                            style={{
                                                width: `${region.avgRisk}%`,
                                                background: getRiskColor(
                                                    region.avgRisk >= 70
                                                        ? "high"
                                                        : region.avgRisk >= 50
                                                            ? "medium"
                                                            : "low"
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.6875rem",
                                            color: "var(--text-muted)",
                                            marginTop: "4px",
                                        }}
                                    >
                                        {region.suppliers} suppliers · {region.disruptions}{" "}
                                        disruptions
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
