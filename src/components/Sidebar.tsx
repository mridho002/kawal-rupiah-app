'use client'

import { LayoutDashboard, FileSpreadsheet, Fingerprint, Smartphone, Settings, BarChart2, Menu, X } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "price_oracle", label: "Price Oracle", icon: FileSpreadsheet },
    { id: "audit_trail", label: "Audit Trail", icon: Fingerprint },
    { id: "mobile_pwa", label: "Citizen PWA", icon: Smartphone },
    { id: "analisis", label: "Analisis Data", icon: BarChart2 },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-[60] w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        "w-64 bg-navy h-screen text-white flex flex-col fixed left-0 top-0 border-r border-[#1a2f5e] z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-[#1a2f5e] flex items-center mb-4">
          <div className="relative w-10 h-10 mr-3 shrink-0">
            <Image src="/logo.png" alt="KAWAL RUPIAH" width={40} height={40} className="rounded" />
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
                onClick={() => {
                  setActiveTab(item.id);
                  // Close sidebar on mobile after selecting
                  if (window.innerWidth < 1024) onToggle();
                }}
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
    </>
  );
}
