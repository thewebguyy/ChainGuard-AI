"use client";

import { HelpCircle, Book, MessageSquare, Zap, Shield, Search } from "lucide-react";
import Topbar from "@/components/Topbar";

export default function HelpPage() {
    return (
        <div>
            <Topbar title="Help & Documentation" subtitle="Learn how to maximize your supply chain resilience" />
            <div style={{ padding: "24px", maxWidth: "1000px" }}>
                <div style={{
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-violet) 100%)",
                    borderRadius: "16px",
                    padding: "40px",
                    textAlign: "center",
                    marginBottom: "32px",
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.2)"
                }}>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "16px" }}>How can we help?</h2>
                    <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
                        <Search size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        <input
                            className="input"
                            placeholder="Search documentation, guides, and FAQs..."
                            style={{ paddingLeft: "48px", height: "48px", borderRadius: "24px", background: "white", color: "black", border: "none" }}
                        />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
                    {[
                        { icon: Book, title: "Getting Started", desc: "Learn the basics of supplier onboarding and risk configuration." },
                        { icon: Zap, title: "Risk Scoring Guide", desc: "Understanding the ML model and data sources behind risk scores." },
                        { icon: Shield, title: "Integration Docs", desc: "Connect SAP, Oracle, and other ERP systems via OAuth." },
                        { icon: MessageSquare, title: "Support Center", desc: "Contact our logistics experts for crisis management advice." },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="card" style={{ cursor: "pointer" }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: "12px", background: "var(--bg-elevated)",
                                    display: "grid", placeItems: "center", marginBottom: "16px", color: "var(--primary-light)"
                                }}>
                                    <Icon size={24} />
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>{item.title}</h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="card">
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "20px" }}>Frequently Asked Questions</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {[
                            { q: "How often are risk scores updated?", a: "Risk scores are updated in real-time as data arrives from news APIs, shipping trackers, and weather feeds. On average, refreshing every 15 minutes." },
                            { q: "Can I export data for SOC2 compliance?", a: "Yes, the Reports section includes a Compliance Audit Log template specifically designed for security audits and GDPR compliance." },
                            { q: "What happens if my ERP integration fails?", a: "ChainGuard AI uses a fallback mechanism where it retains the last synced state and continues monitoring based on your manual supplier list until connection is restored." },
                        ].map((faq, i) => (
                            <div key={i} style={{ paddingBottom: "16px", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                                <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>{faq.q}</div>
                                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{faq.a}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
