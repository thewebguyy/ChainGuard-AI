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
}

export const useAppStore = create<AppState>((set) => ({
    // Navigation
    currentPage: "dashboard",
    setCurrentPage: (page) => set({ currentPage: page }),

    // Sidebar
    sidebarCollapsed: false,
    toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    // Suppliers
    suppliers: SUPPLIERS,
    selectedSupplier: null,
    setSelectedSupplier: (s) => set({ selectedSupplier: s }),
    supplierFilter: "all",
    setSupplierFilter: (f) => set({ supplierFilter: f }),
    supplierSearch: "",
    setSupplierSearch: (s) => set({ supplierSearch: s }),

    // Alerts
    alerts: ALERTS,
    acknowledgeAlert: (id) =>
        set((state) => ({
            alerts: state.alerts.map((a) =>
                a.id === id ? { ...a, acknowledged: true } : a
            ),
        })),
    resolveAlert: (id) =>
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
}));
