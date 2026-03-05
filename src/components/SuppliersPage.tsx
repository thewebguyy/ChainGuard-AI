"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MapPin,
    TrendingUp,
    TrendingDown,
    Minus,
    ExternalLink,
    AlertTriangle,
    CheckCircle,
    Package,
    ChevronDown,
    ChevronUp,
    Mail,
    DollarSign,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import {
    getRiskColor,
    getRiskBadgeClass,
    getRiskLabel,
    formatCurrency,
    getStatusColor,
    getStatusLabel,
    formatRelativeTime,
} from "@/lib/utils";
import { ALTERNATIVE_SUPPLIERS } from "@/lib/mock-data";
import type { Supplier } from "@/lib/types";
import Topbar from "@/components/Topbar";

const FILTER_OPTIONS = [
    { value: "all", label: "All Suppliers" },
    { value: "critical", label: "Critical Risk" },
    { value: "high", label: "High Risk" },
    { value: "medium", label: "Medium Risk" },
    { value: "low", label: "Low Risk" },
    { value: "disrupted", label: "Disrupted" },
    { value: "at_risk", label: "At Risk" },
];

function SupplierRow({
    supplier,
    expanded,
    onToggle,
}: {
    supplier: Supplier;
    expanded: boolean;
    onToggle: () => void;
}) {
    const riskColor = getRiskColor(supplier.riskLevel);
    const TrendIcon =
        supplier.trend === "up"
            ? TrendingUp
            : supplier.trend === "down"
                ? TrendingDown
                : Minus;

    return (
        <>
            <tr
                style={{ cursor: "pointer" }}
                onClick={onToggle}
                aria-expanded={expanded}
            >
                <td>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <div
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: "8px",
                                background: `${riskColor}20`,
                                border: `1px solid ${riskColor}40`,
                                display: "grid",
                                placeItems: "center",
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: riskColor,
                                flexShrink: 0,
                            }}
                        >
                            {supplier.countryCode}
                        </div>
                        <div>
                            <div
                                style={{
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    fontSize: "0.875rem",
                                }}
                            >
                                {supplier.name}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: "var(--text-muted)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                }}
                            >
                                <MapPin size={10} />
                                {supplier.country} · Tier {supplier.tier}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <span
                        style={{
                            fontSize: "0.8125rem",
                            color: "var(--text-secondary)",
                        }}
                    >
                        {supplier.category}
                    </span>
                </td>
                <td>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: riskColor,
                                minWidth: "28px",
                            }}
                        >
                            {supplier.riskScore}
                        </span>
                        <div
                            style={{
                                flex: 1,
                                minWidth: "60px",
                            }}
                        >
                            <div className="risk-bar" style={{ width: "80px" }}>
                                <div
                                    className="risk-bar-fill"
                                    style={{
                                        width: `${supplier.riskScore}%`,
                                        background: riskColor,
                                    }}
                                />
                            </div>
                        </div>
                        <span className={getRiskBadgeClass(supplier.riskLevel)}>
                            {getRiskLabel(supplier.riskLevel)}
                        </span>
                    </div>
                </td>
                <td>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <span
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: getStatusColor(supplier.status),
                                display: "block",
                            }}
                        />
                        <span
                            style={{
                                fontSize: "0.8125rem",
                                color: getStatusColor(supplier.status),
                                fontWeight: 500,
                            }}
                        >
                            {getStatusLabel(supplier.status)}
                        </span>
                    </div>
                </td>
                <td>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.75rem",
                            color:
                                supplier.trend === "up"
                                    ? "var(--danger)"
                                    : supplier.trend === "down"
                                        ? "var(--success)"
                                        : "var(--text-muted)",
                        }}
                    >
                        <TrendIcon size={12} />
                        {supplier.trend}
                    </div>
                </td>
                <td>
                    <span
                        style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}
                    >
                        {formatCurrency(supplier.annualSpend, true)}
                    </span>
                </td>
                <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {supplier.alerts > 0 && (
                            <span
                                style={{
                                    background: "rgba(244, 63, 94, 0.15)",
                                    border: "1px solid rgba(244, 63, 94, 0.3)",
                                    color: "var(--danger)",
                                    borderRadius: "20px",
                                    fontSize: "0.6875rem",
                                    fontWeight: 700,
                                    padding: "2px 8px",
                                }}
                            >
                                {supplier.alerts} alerts
                            </span>
                        )}
                        <span
                            style={{
                                fontSize: "0.6875rem",
                                color: "var(--text-muted)",
                            }}
                        >
                            {formatRelativeTime(supplier.lastUpdated)}
                        </span>
                    </div>
                </td>
                <td>
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--text-muted)",
                            padding: "4px",
                        }}
                    >
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </td>
            </tr>

            {/* Expanded row */}
            {expanded && (
                <tr>
                    <td
                        colSpan={8}
                        style={{
                            background: "var(--bg-surface)",
                            borderBottom: "1px solid var(--border)",
                            padding: "20px 24px",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                gap: "20px",
                            }}
                        >
                            {/* Supplier details */}
                            <div>
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Supplier Details
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                    }}
                                >
                                    {[
                                        { label: "Contact", value: supplier.contactName },
                                        {
                                            label: "Email",
                                            value: supplier.contactEmail,
                                            icon: <Mail size={11} />,
                                        },
                                        {
                                            label: "Region",
                                            value: supplier.region.charAt(0).toUpperCase() + supplier.region.slice(1),
                                        },
                                        {
                                            label: "Annual Spend",
                                            value: formatCurrency(supplier.annualSpend),
                                            icon: <DollarSign size={11} />,
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                                alignItems: "baseline",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "0.75rem",
                                                    color: "var(--text-muted)",
                                                    minWidth: "85px",
                                                }}
                                            >
                                                {item.label}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "0.8125rem",
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Components */}
                            <div>
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Package size={11} style={{ display: "inline" }} /> Components
                                    Supplied
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                    {supplier.components.map((comp) => (
                                        <span key={comp} className="chip">
                                            {comp}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Alt suppliers */}
                            <div>
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Alt. Suppliers Available
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                    }}
                                >
                                    {ALTERNATIVE_SUPPLIERS.filter((a) =>
                                        a.category
                                            .toLowerCase()
                                            .includes(supplier.category.toLowerCase().split(" ")[0])
                                    )
                                        .slice(0, 2)
                                        .map((alt) => (
                                            <div
                                                key={alt.id}
                                                style={{
                                                    padding: "8px 12px",
                                                    background: "var(--bg-elevated)",
                                                    border: "1px solid var(--border)",
                                                    borderRadius: "8px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        style={{
                                                            fontSize: "0.8125rem",
                                                            fontWeight: 600,
                                                            color: "var(--text-primary)",
                                                        }}
                                                    >
                                                        {alt.name}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: "0.6875rem",
                                                            color: "var(--text-muted)",
                                                        }}
                                                    >
                                                        {alt.country} · {alt.leadTimeDays}d lead
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: "0.75rem",
                                                            color: "var(--success)",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Score: {alt.ratingScore}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: "0.6875rem",
                                                            color:
                                                                alt.costDelta.startsWith("+")
                                                                    ? "var(--warning)"
                                                                    : "var(--success)",
                                                        }}
                                                    >
                                                        {alt.costDelta}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {ALTERNATIVE_SUPPLIERS.filter((a) =>
                                        a.category
                                            .toLowerCase()
                                            .includes(supplier.category.toLowerCase().split(" ")[0])
                                    ).length === 0 && (
                                            <div
                                                style={{
                                                    fontSize: "0.8125rem",
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                No alternatives in database for this category. Request
                                                sourcing analysis.
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default function SuppliersPage() {
    const { suppliers, supplierSearch, setSupplierSearch } = useAppStore();
    const [filter, setFilter] = useState("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"riskScore" | "name" | "annualSpend">(
        "riskScore"
    );
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const filtered = suppliers
        .filter((s) => {
            const matchSearch =
                supplierSearch === "" ||
                s.name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
                s.country.toLowerCase().includes(supplierSearch.toLowerCase()) ||
                s.category.toLowerCase().includes(supplierSearch.toLowerCase());
            const matchFilter =
                filter === "all" ||
                s.riskLevel === filter ||
                s.status === filter;
            return matchSearch && matchFilter;
        })
        .sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortDir === "desc" ? bVal - aVal : aVal - bVal;
            }
            if (typeof aVal === "string" && typeof bVal === "string") {
                return sortDir === "desc"
                    ? bVal.localeCompare(aVal)
                    : aVal.localeCompare(bVal);
            }
            return 0;
        });

    const handleSort = (col: typeof sortBy) => {
        if (sortBy === col) {
            setSortDir(sortDir === "desc" ? "asc" : "desc");
        } else {
            setSortBy(col);
            setSortDir("desc");
        }
    };

    const stats = {
        total: suppliers.length,
        critical: suppliers.filter((s) => s.riskLevel === "critical").length,
        disrupted: suppliers.filter((s) => s.status === "disrupted").length,
        avgRisk: Math.round(
            suppliers.reduce((sum, s) => sum + s.riskScore, 0) / suppliers.length
        ),
    };

    return (
        <div>
            <Topbar
                title="Supplier Management"
                subtitle={`${stats.total} suppliers monitored · ${stats.critical} critical · ${stats.disrupted} disrupted`}
            />
            <div style={{ padding: "24px" }}>
                {/* Quick stats */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "12px",
                        marginBottom: "20px",
                    }}
                >
                    {[
                        {
                            label: "Total Suppliers",
                            value: stats.total,
                            color: "var(--primary-light)",
                        },
                        {
                            label: "Critical Risk",
                            value: stats.critical,
                            color: "var(--risk-critical)",
                        },
                        {
                            label: "Disrupted",
                            value: stats.disrupted,
                            color: "var(--danger)",
                        },
                        {
                            label: "Avg Risk Score",
                            value: stats.avgRisk,
                            color: "var(--warning)",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                borderRadius: "10px",
                                padding: "14px 18px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span
                                style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}
                            >
                                {stat.label}
                            </span>
                            <span
                                style={{
                                    fontSize: "1.25rem",
                                    fontWeight: 700,
                                    color: stat.color,
                                }}
                            >
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ position: "relative", flex: "1 1 260px" }}>
                        <Search
                            size={14}
                            style={{
                                position: "absolute",
                                left: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--text-muted)",
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, country, category..."
                            className="input"
                            style={{ paddingLeft: "32px" }}
                            value={supplierSearch}
                            onChange={(e) => setSupplierSearch(e.target.value)}
                            aria-label="Search suppliers"
                        />
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {FILTER_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setFilter(opt.value)}
                                style={{
                                    padding: "8px 14px",
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
                </div>

                {/* Table */}
                <div className="table-wrapper">
                    <table className="table" role="table">
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Category</th>
                                <th>
                                    <button
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "var(--text-muted)",
                                            font: "inherit",
                                            fontSize: "0.8125rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.03em",
                                            textTransform: "uppercase",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                        }}
                                        onClick={() => handleSort("riskScore")}
                                    >
                                        Risk Score
                                        {sortBy === "riskScore" ? (
                                            sortDir === "desc" ? (
                                                <ChevronDown size={12} />
                                            ) : (
                                                <ChevronUp size={12} />
                                            )
                                        ) : null}
                                    </button>
                                </th>
                                <th>Status</th>
                                <th>Trend</th>
                                <th>
                                    <button
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "var(--text-muted)",
                                            font: "inherit",
                                            fontSize: "0.8125rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.03em",
                                            textTransform: "uppercase",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                        }}
                                        onClick={() => handleSort("annualSpend")}
                                    >
                                        Spend
                                        {sortBy === "annualSpend" ? (
                                            sortDir === "desc" ? (
                                                <ChevronDown size={12} />
                                            ) : (
                                                <ChevronUp size={12} />
                                            )
                                        ) : null}
                                    </button>
                                </th>
                                <th>Alerts</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: "center", padding: "40px" }}>
                                        <div
                                            style={{
                                                color: "var(--text-muted)",
                                                fontSize: "0.875rem",
                                            }}
                                        >
                                            No suppliers match your filters.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((sup) => (
                                    <SupplierRow
                                        key={sup.id}
                                        supplier={sup}
                                        expanded={expandedId === sup.id}
                                        onToggle={() =>
                                            setExpandedId(expandedId === sup.id ? null : sup.id)
                                        }
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div
                    style={{
                        marginTop: "12px",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                    }}
                >
                    Showing {filtered.length} of {suppliers.length} suppliers
                </div>
            </div>
        </div>
    );
}
