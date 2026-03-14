'use client'

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardScreen from "@/components/screens/Dashboard";
import PriceOracleScreen from "@/components/screens/PriceOracle";
import AuditTrailScreen from "@/components/screens/AuditTrail";
import MobilePwaScreen from "@/components/screens/MobilePWA";

export default function AppContainer() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-64 overflow-auto relative">
        <main className="min-h-full max-w-7xl mx-auto p-8 animate-in fade-in duration-500">
          {activeTab === "dashboard" && <DashboardScreen setActiveTab={setActiveTab} />}
          {activeTab === "price_oracle" && <PriceOracleScreen />}
          {activeTab === "audit_trail" && <AuditTrailScreen />}
          {activeTab === "mobile_pwa" && <MobilePwaScreen />}
        </main>
      </div>
    </div>
  );
}
