"use client";

import { useState } from "react";
import { Users, UserPlus, Mail, Shield, MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import Topbar from "@/components/Topbar";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Analyst" | "Viewer";
    status: "Active" | "Pending";
    avatar?: string;
}

const TEAM: TeamMember[] = [
    { id: "1", name: "Alex Rivera", email: "alex.rivera@acmeelectronics.com", role: "Admin", status: "Active" },
    { id: "2", name: "Jordan Lee", email: "j.lee@acmeelectronics.com", role: "Analyst", status: "Active" },
    { id: "3", name: "Sasha Chen", email: "s.chen@acmeelectronics.com", role: "Analyst", status: "Pending" },
    { id: "4", name: "Maria Garcia", email: "m.garcia@acmeelectronics.com", role: "Viewer", status: "Active" },
];

export default function TeamPage() {
    return (
        <div>
            <Topbar title="Team Management" subtitle="Manage user access and roles for ACME Electronics" />
            <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Team Members</h2>
                    <button className="btn btn-primary btn-sm">
                        <UserPlus size={14} />
                        Invite Member
                    </button>
                </div>

                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Access</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {TEAM.map((member) => (
                                <tr key={member.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: "50%",
                                                background: member.status === 'Active' ? 'var(--primary-glow)' : 'var(--bg-elevated)',
                                                display: 'grid', placeItems: 'center', fontSize: '0.8rem', fontWeight: 700
                                            }}>
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{member.name}</div>
                                                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: "0.8125rem" }}>{member.role}</span>
                                    </td>
                                    <td>
                                        <span className="chip" style={{
                                            color: member.status === 'Active' ? 'var(--success)' : 'var(--warning)',
                                            background: member.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'
                                        }}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <span className="chip" style={{ fontSize: '0.625rem' }}>Dashboard</span>
                                            <span className="chip" style={{ fontSize: '0.625rem' }}>Suppliers</span>
                                            {member.role === 'Admin' && <span className="chip" style={{ fontSize: '0.625rem' }}>Billing</span>}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        <button className="btn btn-ghost btn-sm" style={{ padding: "4px" }}>
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: "32px" }}>
                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "16px" }}>Role Definitions</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
                        {[
                            { role: "Admin", desc: "Full access to all features, billing, and team management." },
                            { role: "Analyst", desc: "Can manage suppliers, alerts, and view all analytics." },
                            { role: "Viewer", desc: "Read-only access to dashboards and reports." },
                        ].map(r => (
                            <div key={r.role} className="card" style={{ padding: "16px" }}>
                                <div style={{ fontWeight: 700, marginBottom: "4px", color: "var(--primary-light)" }}>{r.role}</div>
                                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{r.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
