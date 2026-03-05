"use client";

import { useState } from "react";
import {
    User,
    Bell,
    Shield,
    CreditCard,
    Webhook,
    Save,
    CheckCircle,
    Key,
    AlertTriangle,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import Topbar from "@/components/Topbar";

type SettingsTab = "profile" | "notifications" | "security" | "billing" | "integrations";

const TABS: { id: SettingsTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "integrations", label: "Integrations", icon: Webhook },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
        <button
            onClick={onChange}
            style={{
                width: 44,
                height: 24,
                borderRadius: "12px",
                background: checked ? "var(--primary)" : "var(--bg-elevated)",
                border: `1px solid ${checked ? "var(--primary)" : "var(--border-strong)"}`,
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s ease",
                flexShrink: 0,
            }}
            role="switch"
            aria-checked={checked}
        >
            <span
                style={{
                    position: "absolute",
                    top: 2,
                    left: checked ? 22 : 2,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "white",
                    transition: "left 0.2s ease",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
            />
        </button>
    );
}

function SettingsGroup({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "16px",
            }}
        >
            <div
                style={{
                    padding: "14px 20px",
                    borderBottom: "1px solid var(--border)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                }}
            >
                {title}
            </div>
            <div style={{ padding: "20px" }}>{children}</div>
        </div>
    );
}

function SettingsRow({
    label,
    description,
    children,
}: {
    label: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                    {label}
                </div>
                {description && (
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        {description}
                    </div>
                )}
            </div>
            <div style={{ flexShrink: 0 }}>{children}</div>
        </div>
    );
}

export default function SettingsPage() {
    const { user } = useAppStore();
    const [tab, setTab] = useState<SettingsTab>("profile");
    const [saved, setSaved] = useState(false);
    const [notifs, setNotifs] = useState({
        emailAlerts: true,
        smsAlerts: false,
        weeklyReport: true,
        criticalOnly: false,
        browserPush: true,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div>
            <Topbar title="Settings" subtitle="Manage your account, notifications, and integrations" />
            <div style={{ padding: "24px", maxWidth: "900px" }}>
                {/* Tabs */}
                <div
                    style={{
                        display: "flex",
                        gap: "4px",
                        marginBottom: "24px",
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        padding: "4px",
                    }}
                >
                    {TABS.map((t) => {
                        const Icon = t.icon;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "7px",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    fontSize: "0.8125rem",
                                    fontWeight: 500,
                                    background: tab === t.id ? "var(--bg-card)" : "transparent",
                                    color: tab === t.id ? "var(--text-primary)" : "var(--text-muted)",
                                    boxShadow: tab === t.id ? "var(--shadow-card)" : "none",
                                }}
                                aria-current={tab === t.id ? "page" : undefined}
                            >
                                <Icon size={14} />
                                {t.label}
                            </button>
                        );
                    })}
                </div>

                {/* Profile Tab */}
                {tab === "profile" && (
                    <div style={{ animation: "fadeIn 0.25s ease" }}>
                        <SettingsGroup title="Personal Information">
                            {[
                                { label: "Full Name", value: user.name },
                                { label: "Email Address", value: user.email },
                                { label: "Company", value: user.company },
                                { label: "Job Title", value: user.role },
                            ].map((field) => (
                                <SettingsRow key={field.label} label={field.label}>
                                    <input
                                        className="input"
                                        defaultValue={field.value}
                                        style={{ width: "280px", textAlign: "right" }}
                                        aria-label={field.label}
                                    />
                                </SettingsRow>
                            ))}
                        </SettingsGroup>

                        <SettingsGroup title="Supplier Preferences">
                            <SettingsRow
                                label="Default Risk Threshold"
                                description="Alert when supplier risk score exceeds this value"
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        defaultValue={60}
                                        style={{ width: "120px", accentColor: "var(--primary)" }}
                                        aria-label="Risk threshold"
                                    />
                                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--warning)", minWidth: "35px" }}>
                                        60
                                    </span>
                                </div>
                            </SettingsRow>
                            <SettingsRow
                                label="Alert Lead Time"
                                description="Minimum hours before predicted impact to send alert"
                            >
                                <select
                                    className="input"
                                    style={{ width: "140px" }}
                                    defaultValue="48"
                                    aria-label="Alert lead time"
                                >
                                    <option value="24">24 hours</option>
                                    <option value="48">48 hours</option>
                                    <option value="72">72 hours</option>
                                    <option value="168">1 week</option>
                                </select>
                            </SettingsRow>
                            <SettingsRow label="Timezone">
                                <select
                                    className="input"
                                    style={{ width: "200px" }}
                                    defaultValue="America/Chicago"
                                    aria-label="Timezone"
                                >
                                    <option value="America/Chicago">America/Chicago (CT)</option>
                                    <option value="America/New_York">America/New_York (ET)</option>
                                    <option value="America/Los_Angeles">America/Los_Angeles (PT)</option>
                                    <option value="Europe/London">Europe/London (GMT)</option>
                                    <option value="UTC">UTC</option>
                                </select>
                            </SettingsRow>
                        </SettingsGroup>
                    </div>
                )}

                {/* Notifications Tab */}
                {tab === "notifications" && (
                    <div style={{ animation: "fadeIn 0.25s ease" }}>
                        <SettingsGroup title="Alert Channels">
                            <SettingsRow label="Email Alerts" description="Receive risk alerts via email">
                                <Toggle
                                    checked={notifs.emailAlerts}
                                    onChange={() => setNotifs((n) => ({ ...n, emailAlerts: !n.emailAlerts }))}
                                />
                            </SettingsRow>
                            <SettingsRow label="SMS Alerts" description="Receive critical alerts via SMS (Twilio)">
                                <Toggle
                                    checked={notifs.smsAlerts}
                                    onChange={() => setNotifs((n) => ({ ...n, smsAlerts: !n.smsAlerts }))}
                                />
                            </SettingsRow>
                            <SettingsRow label="Browser Push Notifications" description="Get desktop notifications">
                                <Toggle
                                    checked={notifs.browserPush}
                                    onChange={() => setNotifs((n) => ({ ...n, browserPush: !n.browserPush }))}
                                />
                            </SettingsRow>
                        </SettingsGroup>

                        <SettingsGroup title="Notification Filters">
                            <SettingsRow
                                label="Weekly Report Email"
                                description="Receive weekly summary every Monday at 8am"
                            >
                                <Toggle
                                    checked={notifs.weeklyReport}
                                    onChange={() => setNotifs((n) => ({ ...n, weeklyReport: !n.weeklyReport }))}
                                />
                            </SettingsRow>
                            <SettingsRow
                                label="Critical Alerts Only"
                                description="Only notify for severity: Critical and High"
                            >
                                <Toggle
                                    checked={notifs.criticalOnly}
                                    onChange={() => setNotifs((n) => ({ ...n, criticalOnly: !n.criticalOnly }))}
                                />
                            </SettingsRow>
                        </SettingsGroup>

                        {notifs.smsAlerts && (
                            <SettingsGroup title="SMS Configuration">
                                <SettingsRow label="Phone Number">
                                    <input
                                        className="input"
                                        placeholder="+1 555 000 0000"
                                        type="tel"
                                        style={{ width: "200px" }}
                                        aria-label="SMS phone number"
                                    />
                                </SettingsRow>
                            </SettingsGroup>
                        )}
                    </div>
                )}

                {/* Security Tab */}
                {tab === "security" && (
                    <div style={{ animation: "fadeIn 0.25s ease" }}>
                        <SettingsGroup title="Authentication">
                            <SettingsRow label="Two-Factor Authentication (MFA)" description="Required for admin accounts">
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <span
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "var(--success)",
                                            background: "rgba(34, 197, 94, 0.1)",
                                            border: "1px solid rgba(34, 197, 94, 0.2)",
                                            padding: "3px 10px",
                                            borderRadius: "20px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        ✓ Enabled
                                    </span>
                                    <button className="btn btn-secondary btn-sm">Reconfigure</button>
                                </div>
                            </SettingsRow>
                            <SettingsRow label="Session Timeout" description="Auto-logout after inactivity">
                                <select className="input" style={{ width: "160px" }} defaultValue="30" aria-label="Session timeout">
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="240">4 hours</option>
                                </select>
                            </SettingsRow>
                            <SettingsRow label="Change Password">
                                <button className="btn btn-secondary btn-sm">
                                    <Key size={13} />
                                    Set New Password
                                </button>
                            </SettingsRow>
                        </SettingsGroup>

                        <SettingsGroup title="Audit & Compliance">
                            <SettingsRow
                                label="Audit Log Retention"
                                description="How long to retain user action logs"
                            >
                                <select className="input" style={{ width: "160px" }} defaultValue="12" aria-label="Audit log retention">
                                    <option value="6">6 months</option>
                                    <option value="12">12 months</option>
                                    <option value="36">3 years</option>
                                </select>
                            </SettingsRow>
                            <SettingsRow label="GDPR Data Export" description="Download all your personal data">
                                <button className="btn btn-secondary btn-sm">Request Export</button>
                            </SettingsRow>
                            <SettingsRow label="Delete Account" description="Permanently remove all data">
                                <button className="btn btn-danger btn-sm">
                                    <AlertTriangle size={13} />
                                    Delete Account
                                </button>
                            </SettingsRow>
                        </SettingsGroup>
                    </div>
                )}

                {/* Billing Tab */}
                {tab === "billing" && (
                    <div style={{ animation: "fadeIn 0.25s ease" }}>
                        <div
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.07) 100%)",
                                border: "1px solid rgba(37, 99, 235, 0.25)",
                                borderRadius: "12px",
                                padding: "20px 24px",
                                marginBottom: "16px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                                    Pro Plan
                                </div>
                                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                                    Up to 100 suppliers · $299/month · Renews Apr 1, 2026
                                </div>
                            </div>
                            <button className="btn btn-primary">Upgrade to Enterprise</button>
                        </div>

                        <SettingsGroup title="Payment Method">
                            <SettingsRow label="Current Card">
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                                        •••• •••• •••• 4242 (Visa)
                                    </span>
                                    <button className="btn btn-secondary btn-sm">Update</button>
                                </div>
                            </SettingsRow>
                            <SettingsRow label="Billing Email">
                                <input
                                    className="input"
                                    defaultValue="alex.rivera@acmeelectronics.com"
                                    style={{ width: "280px" }}
                                    aria-label="Billing email"
                                />
                            </SettingsRow>
                        </SettingsGroup>

                        <SettingsGroup title="Invoice History">
                            {[
                                { date: "Mar 1, 2026", amount: "$299.00", status: "Paid" },
                                { date: "Feb 1, 2026", amount: "$299.00", status: "Paid" },
                                { date: "Jan 1, 2026", amount: "$299.00", status: "Paid" },
                            ].map((inv) => (
                                <SettingsRow key={inv.date} label={inv.date}>
                                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                                            {inv.amount}
                                        </span>
                                        <span style={{ fontSize: "0.75rem", color: "var(--success)", background: "rgba(34, 197, 94, 0.1)", padding: "2px 8px", borderRadius: "20px" }}>
                                            {inv.status}
                                        </span>
                                        <button className="btn btn-ghost btn-sm">Download</button>
                                    </div>
                                </SettingsRow>
                            ))}
                        </SettingsGroup>
                    </div>
                )}

                {/* Integrations Tab */}
                {tab === "integrations" && (
                    <div style={{ animation: "fadeIn 0.25s ease" }}>
                        <SettingsGroup title="ERP & Data Sources">
                            {[
                                { name: "SAP S/4HANA", status: "connected", description: "Supplier master data sync · Last sync: 2h ago" },
                                { name: "AfterShip", status: "connected", description: "Real-time shipment tracking · 47 active shipments" },
                                { name: "Oracle ERP", status: "disconnected", description: "Connect Oracle for PO and inventory data" },
                                { name: "NewsAPI", status: "connected", description: "Global news feed for geopolitical events · Active" },
                            ].map((int) => (
                                <SettingsRow key={int.name} label={int.name} description={int.description}>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                        <span
                                            style={{
                                                fontSize: "0.75rem",
                                                fontWeight: 600,
                                                color: int.status === "connected" ? "var(--success)" : "var(--text-muted)",
                                                background: int.status === "connected"
                                                    ? "rgba(34, 197, 94, 0.1)"
                                                    : "var(--bg-elevated)",
                                                border: `1px solid ${int.status === "connected" ? "rgba(34, 197, 94, 0.2)" : "var(--border)"}`,
                                                padding: "3px 10px",
                                                borderRadius: "20px",
                                            }}
                                        >
                                            {int.status === "connected" ? "✓ Connected" : "Disconnected"}
                                        </span>
                                        <button className="btn btn-secondary btn-sm">
                                            {int.status === "connected" ? "Configure" : "Connect"}
                                        </button>
                                    </div>
                                </SettingsRow>
                            ))}
                        </SettingsGroup>

                        <SettingsGroup title="Webhooks">
                            <SettingsRow label="Webhook URL" description="Receive real-time events via HTTP POST">
                                <input
                                    className="input"
                                    placeholder="https://your-endpoint.com/chainguard"
                                    style={{ width: "300px" }}
                                    aria-label="Webhook URL"
                                />
                            </SettingsRow>
                            <SettingsRow label="Webhook Events" description="Select which events trigger the webhook">
                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                    {["alert.created", "alert.resolved", "supplier.risk_changed"].map((evt) => (
                                        <label
                                            key={evt}
                                            style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
                                        >
                                            <input type="checkbox" defaultChecked style={{ accentColor: "var(--primary)" }} />
                                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{evt}</span>
                                        </label>
                                    ))}
                                </div>
                            </SettingsRow>
                        </SettingsGroup>
                    </div>
                )}

                {/* Save button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                        {saved ? (
                            <>
                                <CheckCircle size={15} />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save size={15} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
