"use client";

import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import DashboardPage from "@/components/DashboardPage";
import SuppliersPage from "@/components/SuppliersPage";
import AlertsPage from "@/components/AlertsPage";
import AnalyticsPage from "@/components/AnalyticsPage";
import ReportsPage from "@/components/ReportsPage";
import SettingsPage from "@/components/SettingsPage";
import TeamPage from "@/components/TeamPage";
import HelpPage from "@/components/HelpPage";

export default function Home() {
  const { currentPage, sidebarCollapsed } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "suppliers":
        return <SuppliersPage />;
      case "alerts":
        return <AlertsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      case "team":
        return <TeamPage />;
      case "help":
        return <HelpPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-base)",
      }}
    >
      <Sidebar />
      <main
        style={{
          flex: 1,
          minWidth: 0,
          background: "var(--bg-base)",
          transition: "padding 0.2s ease",
        }}
      >
        {renderPage()}
      </main>
    </div>
  );
}
