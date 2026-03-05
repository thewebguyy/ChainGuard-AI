"use client";

import { useAppStore } from "@/lib/store";
import {
    LayoutDashboard,
    ShieldAlert,
    Truck,
    BarChart3,
    Settings,
    Bell,
    Menu,
    X,
    Zap,
    ChevronRight,
    FileText,
    Users,
    HelpCircle,
} from "lucide-react";

interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: number;
}

const NAV_ITEMS: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "suppliers", label: "Suppliers", icon: Truck },
    { id: "alerts", label: "Risk Alerts", icon: ShieldAlert, badge: 8 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
];

const SECONDARY_ITEMS: NavItem[] = [
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Docs", icon: HelpCircle },
];

export default function Sidebar() {
    const { currentPage, setCurrentPage, sidebarCollapsed, toggleSidebar, user, alerts } =
        useAppStore();
    const activeAlerts = alerts.filter((a) => !a.resolved && !a.acknowledged).length;

    return (
        <>
            {/* Mobile overlay */}
            {!sidebarCollapsed && (
                <div
                    className="sidebar-overlay"
                    onClick={toggleSidebar}
                    style={{
                        display: "none",
                    }}
                />
            )}

            <aside
                style={{
                    width: sidebarCollapsed ? "64px" : "240px",
                    minHeight: "100vh",
                    background: "var(--bg-surface)",
                    borderRight: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "width 0.25s ease",
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "sticky",
                    top: 0,
                    zIndex: 40,
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        padding: "20px 16px",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        minHeight: "64px",
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                            boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)",
                        }}
                    >
                        <Zap size={16} color="white" />
                    </div>
                    {!sidebarCollapsed && (
                        <div style={{ animation: "fadeIn 0.2s ease" }}>
                            <div
                                style={{
                                    fontSize: "0.9375rem",
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    lineHeight: 1.2,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                ChainGuard
                            </div>
                            <div
                                style={{
                                    fontSize: "0.6875rem",
                                    color: "var(--primary-light)",
                                    fontWeight: 500,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                AI PLATFORM
                            </div>
                        </div>
                    )}
                    <button
                        onClick={toggleSidebar}
                        style={{
                            marginLeft: "auto",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--text-muted)",
                            padding: "4px",
                            borderRadius: "6px",
                            display: "flex",
                            transition: "all 0.15s ease",
                            flexShrink: 0,
                        }}
                        aria-label="Toggle sidebar"
                    >
                        {sidebarCollapsed ? <ChevronRight size={16} /> : <X size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav style={{ padding: "12px 8px", flex: 1 }}>
                    {/* Main nav */}
                    <div style={{ marginBottom: "4px" }}>
                        {!sidebarCollapsed && (
                            <div
                                style={{
                                    fontSize: "0.6875rem",
                                    color: "var(--text-muted)",
                                    fontWeight: 600,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    padding: "4px 8px 8px",
                                }}
                            >
                                Main
                            </div>
                        )}
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;
                            const badgeCount = item.id === "alerts" ? activeAlerts : item.badge;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`sidebar-link${isActive ? " active" : ""}`}
                                    style={{
                                        width: "100%",
                                        justifyContent: sidebarCollapsed ? "center" : "flex-start",
                                        padding: sidebarCollapsed ? "10px" : "10px 12px",
                                        marginBottom: "2px",
                                    }}
                                    title={sidebarCollapsed ? item.label : undefined}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <Icon size={18} />
                                    {!sidebarCollapsed && (
                                        <>
                                            <span style={{ flex: 1, textAlign: "left" }}>
                                                {item.label}
                                            </span>
                                            {badgeCount ? (
                                                <span
                                                    style={{
                                                        background:
                                                            item.id === "alerts"
                                                                ? "var(--danger)"
                                                                : "var(--primary)",
                                                        color: "white",
                                                        borderRadius: "20px",
                                                        fontSize: "0.6875rem",
                                                        fontWeight: 700,
                                                        padding: "2px 7px",
                                                        lineHeight: 1.4,
                                                        minWidth: "20px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {badgeCount}
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                    {sidebarCollapsed && badgeCount ? (
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: 6,
                                                right: 6,
                                                width: 8,
                                                height: 8,
                                                background: "var(--danger)",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    ) : null}
                                </button>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            height: 1,
                            background: "var(--border)",
                            margin: "12px 4px",
                        }}
                    />

                    {/* Secondary nav */}
                    <div>
                        {!sidebarCollapsed && (
                            <div
                                style={{
                                    fontSize: "0.6875rem",
                                    color: "var(--text-muted)",
                                    fontWeight: 600,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    padding: "4px 8px 8px",
                                }}
                            >
                                System
                            </div>
                        )}
                        {SECONDARY_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`sidebar-link${isActive ? " active" : ""}`}
                                    style={{
                                        width: "100%",
                                        justifyContent: sidebarCollapsed ? "center" : "flex-start",
                                        padding: sidebarCollapsed ? "10px" : "10px 12px",
                                        marginBottom: "2px",
                                    }}
                                    title={sidebarCollapsed ? item.label : undefined}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <Icon size={18} />
                                    {!sidebarCollapsed && (
                                        <span style={{ flex: 1, textAlign: "left" }}>
                                            {item.label}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Upgrade banner */}
                {!sidebarCollapsed && (
                    <div
                        style={{
                            margin: "12px",
                            padding: "14px",
                            background:
                                "linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%)",
                            border: "1px solid rgba(37, 99, 235, 0.2)",
                            borderRadius: "12px",
                            animation: "fadeIn 0.3s ease",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.8125rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                marginBottom: "4px",
                            }}
                        >
                            Pro Plan · {user.supplierCount}/{user.supplierLimit} suppliers
                        </div>
                        <div
                            style={{
                                height: "4px",
                                background: "var(--border)",
                                borderRadius: "4px",
                                marginBottom: "10px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    width: `${(user.supplierCount / user.supplierLimit) * 100}%`,
                                    background:
                                        "linear-gradient(90deg, var(--primary) 0%, var(--accent-violet) 100%)",
                                    borderRadius: "4px",
                                    transition: "width 0.8s ease",
                                }}
                            />
                        </div>
                        <button
                            onClick={() => { /* upgrade action */ }}
                            style={{
                                width: "100%",
                                padding: "7px",
                                background:
                                    "linear-gradient(135deg, var(--primary) 0%, var(--accent-violet) 100%)",
                                border: "none",
                                borderRadius: "8px",
                                color: "white",
                                fontSize: "0.8125rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "opacity 0.15s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = "0.85")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity = "1")
                            }
                        >
                            Upgrade to Enterprise
                        </button>
                    </div>
                )}

                {/* User avatar */}
                <div
                    style={{
                        padding: "12px 16px",
                        borderTop: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        minHeight: "60px",
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background:
                                "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "0.8125rem",
                            fontWeight: 700,
                            color: "white",
                            flexShrink: 0,
                        }}
                    >
                        AR
                    </div>
                    {!sidebarCollapsed && (
                        <div style={{ animation: "fadeIn 0.2s ease", minWidth: 0 }}>
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
                                {user.name}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.6875rem",
                                    color: "var(--text-muted)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {user.role}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
