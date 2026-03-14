'use client'

import { LayoutDashboard, FileSpreadsheet, Fingerprint, Smartphone, Settings, BarChart2, Bell } from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "price_oracle", label: "Price Oracle", icon: FileSpreadsheet },
    { id: "audit_trail", label: "Audit Trail", icon: Fingerprint },
    { id: "mobile_pwa", label: "Citizen PWA", icon: Smartphone },
    { id: "analisis", label: "Analisis Data", icon: BarChart2 },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="w-64 bg-navy h-screen text-white flex flex-col fixed left-0 top-0 border-r border-[#1a2f5e]">
      <div className="p-6 border-b border-[#1a2f5e] flex items-center mb-4">
        <div className="relative w-8 h-8 mr-3 flex items-center justify-center bg-gold/10 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gold/20 flex items-center justify-center rounded">
            <span className="text-gold font-bold text-xs" style={{transform: "scale(0.8)"}}>Rp</span>
            <svg viewBox="0 0 24 24" fill="none" className="absolute top-0 opacity-20 text-gold w-full h-full" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <Fingerprint className="w-5 h-5 text-gold z-10" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white leading-tight">KAWAL<br/>RUPIAH</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                "w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                  : "text-[#8899AA] hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-gold" : "opacity-70")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute left-0 w-1 rounded-r-full h-8 bg-gold" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#1a2f5e]">
        <div className="flex items-center space-x-3 text-sm">
          <div className="w-8 h-8 rounded-full bg-blue-accent/20 flex items-center justify-center text-blue-accent font-bold">
            A
          </div>
          <div>
            <p className="font-semibold text-white">Admin Pusat</p>
            <p className="text-xs text-[#8899AA]">KPK / BPK</p>
          </div>
        </div>
      </div>
    </div>
  );
}
