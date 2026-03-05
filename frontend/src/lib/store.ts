"use client";

import { create } from "zustand";
import type { Supplier, Alert } from "./types";
import { SUPPLIERS, ALERTS } from "./mock-data";

interface AppState {
    // Navigation
    currentPage: string;
    setCurrentPage: (page: string) => void;

    // Sidebar
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;

    // Suppliers
    suppliers: Supplier[];
    selectedSupplier: Supplier | null;
    setSelectedSupplier: (s: Supplier | null) => void;
    supplierFilter: string;
    setSupplierFilter: (f: string) => void;
    supplierSearch: string;
    setSupplierSearch: (s: string) => void;

    // Alerts
    alerts: Alert[];
    acknowledgeAlert: (id: string) => void;
    resolveAlert: (id: string) => void;

    // User
    user: {
        name: string;
        email: string;
        company: string;
        role: string;
        tier: string;
        supplierCount: number;
        supplierLimit: number;
    };

    // API Actions
    fetchData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    // Navigation
    currentPage: "dashboard",
    setCurrentPage: (page: string) => set({ currentPage: page }),

    // Sidebar
    sidebarCollapsed: false,
    toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    // Suppliers
    suppliers: SUPPLIERS,
    selectedSupplier: null,
    setSelectedSupplier: (s: Supplier | null) => set({ selectedSupplier: s }),
    supplierFilter: "all",
    setSupplierFilter: (f: string) => set({ supplierFilter: f }),
    supplierSearch: "",
    setSupplierSearch: (s: string) => set({ supplierSearch: s }),

    // Alerts
    alerts: ALERTS,
    acknowledgeAlert: (id: string) =>
        set((state) => ({
            alerts: state.alerts.map((a) =>
                a.id === id ? { ...a, acknowledged: true } : a
            ),
        })),
    resolveAlert: (id: string) =>
        set((state) => ({
            alerts: state.alerts.map((a) =>
                a.id === id ? { ...a, resolved: true } : a
            ),
        })),

    // User
    user: {
        name: "Alex Rivera",
        email: "alex.rivera@acmeelectronics.com",
        company: "ACME Electronics Inc.",
        role: "Operations Manager",
        tier: "pro",
        supplierCount: 12,
        supplierLimit: 100,
    },

    // API Actions
    fetchData: async () => {
        try {
            const isProd = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
            const baseUrl = isProd ? "" : "http://localhost:8000";

            const [supRes, alertRes] = await Promise.all([
                fetch(`${baseUrl}/api/v1/suppliers/`),
                fetch(`${baseUrl}/api/v1/alerts/`),
            ]);

            if (supRes.ok && alertRes.ok) {
                const suppliers = await supRes.json();
                const alerts = await alertRes.json();
                if (suppliers && suppliers.length > 0) set({ suppliers });
                if (alerts && alerts.length > 0) set({ alerts });
            }
        } catch (error) {
            console.error("Failed to fetch live data:", error);
        }
    },
}));
