'use client'

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardScreen from "@/components/screens/Dashboard";
import PriceOracleScreen from "@/components/screens/PriceOracle";
import AuditTrailScreen from "@/components/screens/AuditTrail";
import MobilePwaScreen from "@/components/screens/MobilePWA";
import AnalisisDataScreen from "@/components/screens/AnalisisData";
import PengaturanScreen from "@/components/screens/Pengaturan";

export default function AppContainer() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 lg:ml-64 overflow-auto relative">
        <main className="min-h-full max-w-7xl mx-auto p-4 pt-16 lg:p-8 lg:pt-8 animate-in fade-in duration-500">
          {activeTab === "dashboard" && <DashboardScreen setActiveTab={setActiveTab} />}
          {activeTab === "price_oracle" && <PriceOracleScreen />}
          {activeTab === "audit_trail" && <AuditTrailScreen />}
          {activeTab === "mobile_pwa" && <MobilePwaScreen />}
          {activeTab === "analisis" && <AnalisisDataScreen />}
          {activeTab === "pengaturan" && <PengaturanScreen />}
        </main>
      </div>
    </div>
  );
}
