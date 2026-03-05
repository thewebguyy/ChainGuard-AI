"use client";

import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
    PieChart,
    Pie,
} from "recharts";
import { SAVINGS_DATA, RISK_TRENDS, REGION_RISKS } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import { getRiskColor, formatCurrency } from "@/lib/utils";
import { TrendingUp, BarChart3, PieChart as PieIcon, Activity } from "lucide-react";
import Topbar from "@/components/Topbar";

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
                {label && (
                    <p
                        style={{
                            color: "var(--text-muted)",
                            marginBottom: "8px",
                            fontWeight: 500,
                        }}
                    >
                        {label}
                    </p>
                )}
                {payload.map((entry) => (
                    <div
                        key={entry.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "3px",
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
                            {typeof entry.value === "number" &&
                                String(entry.value).length > 4
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

// Supplier distribution by category
const CATEGORY_DATA = [
    { name: "Semiconductors", value: 2, color: "#818CF8" },
    { name: "Displays", value: 1, color: "#60A5FA" },
    { name: "Mechanical", value: 1, color: "#34D399" },
    { name: "PCB", value: 2, color: "#FB923C" },
    { name: "Logistics", value: 2, color: "#F59E0B" },
    { name: "Connectors", value: 1, color: "#F43F5E" },
    { name: "Sensors", value: 1, color: "#C084FC" },
    { name: "Energy", value: 1, color: "#22C55E" },
    { name: "Contract Mfg", value: 1, color: "#06B6D4" },
];

const RISK_RADAR_DATA = [
    { subject: "Geopolitical", A: 78, fullMark: 100 },
    { subject: "Weather", A: 55, fullMark: 100 },
    { subject: "Logistics", A: 62, fullMark: 100 },
    { subject: "Financial", A: 42, fullMark: 100 },
    { subject: "Labor", A: 71, fullMark: 100 },
    { subject: "Cyber", A: 33, fullMark: 100 },
];

const MONTHLY_SUPPLIERS_RISK = [
    { month: "Oct", avg: 48, critical: 1 },
    { month: "Nov", avg: 51, critical: 1 },
    { month: "Dec", avg: 46, critical: 0 },
    { month: "Jan", avg: 56, critical: 2 },
    { month: "Feb", avg: 61, critical: 2 },
    { month: "Mar", avg: 54, critical: 2 },
];

export default function AnalyticsPage() {
    const { suppliers } = useAppStore();

    const roiMultiple =
        (819000 / (99 * 12)).toFixed(1);

    return (
        <div>
            <Topbar
                title="Analytics"
                subtitle="Deep-dive into risk trends, ROI, and regional intelligence"
            />
            <div style={{ padding: "24px" }}>
                {/* ROI Headline */}
                <div
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.06) 100%)",
                        border: "1px solid rgba(37, 99, 235, 0.2)",
                        borderRadius: "16px",
                        padding: "24px 28px",
                        marginBottom: "24px",
                        display: "flex",
                        gap: "40px",
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        {
                            label: "Total Savings Generated",
                            value: "$819k",
                            sub: "Since October 2025",
                            color: "var(--success)",
                        },
                        {
                            label: "ROI Multiple",
                            value: `${roiMultiple}x`,
                            sub: "vs $99/mo subscription",
                            color: "var(--primary-light)",
                        },
                        {
                            label: "Disruptions Prevented",
                            value: "23",
                            sub: "Confirmed avoidances",
                            color: "var(--accent-cyan)",
                        },
                        {
                            label: "Avg Alert Lead Time",
                            value: "52h",
                            sub: "Before impact",
                            color: "var(--warning)",
                        },
                        {
                            label: "Risk Score Delta",
                            value: "-12pts",
                            sub: "vs pre-ChainGuard baseline",
                            color: "#C084FC",
                        },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    color: stat.color,
                                    letterSpacing: "-0.04em",
                                    lineHeight: 1,
                                    marginBottom: "4px",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                }}
                            >
                                {stat.label}
                            </div>
                            <div
                                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                            >
                                {stat.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 1fr",
                        gap: "20px",
                        marginBottom: "20px",
                    }}
                >
                    {/* Savings over time */}
                    <div className="card" style={{ padding: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <TrendingUp size={16} color="var(--success)" />
                            <span className="section-heading">
                                Savings: Avoided vs Actual Losses
                            </span>
                        </div>
                        <ResponsiveContainer width="100%" height={240}>
                            <AreaChart data={SAVINGS_DATA}>
                                <defs>
                                    <linearGradient id="gradAvoided" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.02} />
                                    </linearGradient>
                                    <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-muted)" }} />
                                <Area type="monotone" dataKey="avoided" name="Avoided Loss" stroke="#10B981" strokeWidth={2} fill="url(#gradAvoided)" />
                                <Area type="monotone" dataKey="actual" name="Actual Loss" stroke="#F43F5E" strokeWidth={2} fill="url(#gradActual)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Risk radar */}
                    <div className="card" style={{ padding: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <Activity size={16} color="var(--accent-violet)" />
                            <span className="section-heading">Risk Profile by Type</span>
                        </div>
                        <ResponsiveContainer width="100%" height={240}>
                            <RadarChart data={RISK_RADAR_DATA}>
                                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                                />
                                <Radar
                                    name="Risk Level"
                                    dataKey="A"
                                    stroke="#7C3AED"
                                    fill="#7C3AED"
                                    fillOpacity={0.2}
                                    strokeWidth={2}
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 0.8fr",
                        gap: "20px",
                        marginBottom: "20px",
                    }}
                >
                    {/* Average risk over time */}
                    <div className="card" style={{ padding: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <BarChart3 size={16} color="var(--warning)" />
                            <span className="section-heading">Portfolio Risk Trend</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={MONTHLY_SUPPLIERS_RISK}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-muted)" }} />
                                <Line type="monotone" dataKey="avg" name="Avg Risk" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 4 }} />
                                <Line type="monotone" dataKey="critical" name="Critical Count" stroke="#F43F5E" strokeWidth={2} strokeDasharray="5 3" dot={{ fill: "#F43F5E", r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Region risk */}
                    <div className="card" style={{ padding: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <BarChart3 size={16} color="var(--accent-cyan)" />
                            <span className="section-heading">Regional Avg Risk Score</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                                data={REGION_RISKS}
                                layout="vertical"
                                barSize={14}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                                <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                <YAxis type="category" dataKey="region" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="avgRisk" name="Avg Risk" radius={[0, 4, 4, 0]}>
                                    {REGION_RISKS.map((entry) => (
                                        <Cell
                                            key={entry.region}
                                            fill={getRiskColor(
                                                entry.avgRisk >= 70
                                                    ? "high"
                                                    : entry.avgRisk >= 50
                                                        ? "medium"
                                                        : "low"
                                            )}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Supplier by category donut */}
                    <div className="card" style={{ padding: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "16px",
                            }}
                        >
                            <PieIcon size={16} color="#C084FC" />
                            <span className="section-heading">By Category</span>
                        </div>
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie
                                    data={CATEGORY_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={70}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} opacity={0.85} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [value + " suppliers", name]}
                                    contentStyle={{
                                        background: "var(--bg-elevated)",
                                        border: "1px solid var(--border-strong)",
                                        borderRadius: "8px",
                                        fontSize: "0.75rem",
                                        color: "var(--text-primary)",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                                marginTop: "8px",
                            }}
                        >
                            {CATEGORY_DATA.slice(0, 5).map((item) => (
                                <div
                                    key={item.name}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        fontSize: "0.6875rem",
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 7,
                                            height: 7,
                                            borderRadius: "50%",
                                            background: item.color,
                                            display: "block",
                                            flexShrink: 0,
                                        }}
                                    />
                                    {item.name}
                                    <span style={{ marginLeft: "auto" }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Risk trend full-width */}
                <div className="card" style={{ padding: "20px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "20px",
                        }}
                    >
                        <Activity size={16} color="var(--primary-light)" />
                        <span className="section-heading">
                            6-Week Risk Alert Distribution
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={RISK_TRENDS} barGap={2} barSize={16}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="date" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-muted)" }} />
                            <Bar dataKey="critical" name="Critical" fill="#FF3B5C" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="high" name="High" fill="#FF8000" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="medium" name="Medium" fill="#FACC15" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="low" name="Low" fill="#22C55E" radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
