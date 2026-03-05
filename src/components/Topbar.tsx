"use client";

import { Bell, Search, RefreshCw, Menu } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface TopbarProps {
    title: string;
    subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
    const { alerts, toggleSidebar, sidebarCollapsed } = useAppStore();
    const unacknowledgedAlerts = alerts.filter(
        (a) => !a.resolved && !a.acknowledged
    ).length;

    return (
        <header
            style={{
                height: 64,
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-surface)",
                display: "flex",
                alignItems: "center",
                paddingInline: "24px",
                gap: "16px",
                position: "sticky",
                top: 0,
                zIndex: 30,
            }}
        >
            {/* Mobile menu */}
            <button
                onClick={toggleSidebar}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    padding: "6px",
                    borderRadius: "6px",
                    display: "none",
                }}
                aria-label="Open menu"
            >
                <Menu size={20} />
            </button>

            {/* Title */}
            <div>
                <h1
                    style={{
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p
                        style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            marginTop: "1px",
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>

            <div style={{ flex: 1 }} />

            {/* Search */}
            <div
                style={{
                    position: "relative",
                    width: "260px",
                }}
            >
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
                    placeholder="Search suppliers, alerts..."
                    className="input"
                    style={{
                        paddingLeft: "32px",
                        height: "36px",
                        fontSize: "0.8125rem",
                    }}
                    aria-label="Search"
                />
            </div>

            {/* Refresh */}
            <button
                className="btn btn-ghost btn-sm"
                style={{ padding: "8px" }}
                title="Refresh data"
                aria-label="Refresh data"
            >
                <RefreshCw size={16} />
            </button>

            {/* Notifications */}
            <button
                style={{
                    position: "relative",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "8px",
                    width: 36,
                    height: 36,
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                    transition: "all 0.15s ease",
                }}
                aria-label={`${unacknowledgedAlerts} unread alerts`}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-card)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--bg-elevated)";
                    e.currentTarget.style.borderColor = "var(--border-strong)";
                }}
            >
                <Bell size={16} />
                {unacknowledgedAlerts > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            width: 18,
                            height: 18,
                            background: "var(--danger)",
                            borderRadius: "50%",
                            fontSize: "0.625rem",
                            fontWeight: 700,
                            color: "white",
                            display: "grid",
                            placeItems: "center",
                            border: "2px solid var(--bg-surface)",
                        }}
                    >
                        {unacknowledgedAlerts}
                    </span>
                )}
            </button>

            {/* Status indicator */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    borderRadius: "20px",
                }}
            >
                <span
                    className="animate-pulse-glow"
                    style={{
                        width: 6,
                        height: 6,
                        background: "#22C55E",
                        borderRadius: "50%",
                        display: "block",
                    }}
                />
                <span
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "#22C55E",
                    }}
                >
                    Live
                </span>
            </div>
        </header>
    );
}
