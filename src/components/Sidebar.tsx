'use client'

import { LayoutDashboard, FileSpreadsheet, Fingerprint, Smartphone, Settings, BarChart2, Menu, X, ShieldCheck } from "lucide-react";
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
        className="lg:hidden fixed top-4 left-4 z-[60] w-10 h-10 glass-panel text-slate-100 rounded-xl flex items-center justify-center"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        "w-64 bg-void h-screen flex flex-col fixed left-0 top-0 border-r border-white/[0.06] z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/[0.06] flex items-center gap-3">
          <div className="relative w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-brand-400/20 to-gold-500/10 border border-white/10 flex items-center justify-center glow-emerald">
            <ShieldCheck className="w-6 h-6 text-brand-400" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-extrabold tracking-tight">
              <span className="text-gradient-brand">KAWAL</span>{" "}
              <span className="text-gradient-gold">RUPIAH</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Garuda Shield</p>
          </div>
        </div>

        {/* Live status */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Sistem</span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-brand-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 pulse-live" />
            LIVE
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "mobile_pwa") {
                    window.open("/mobile", "_blank");
                    return;
                  }
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={clsx(
                  "w-full relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-brand-500/10 text-slate-50 ring-1 ring-brand-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                )}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-brand-500" />}
                <Icon className={clsx("w-5 h-5 shrink-0", isActive ? "text-brand-400" : "opacity-70")} />
                <span>{item.label}</span>
                {item.id === "mobile_pwa" && (
                  <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded bg-gold-500/15 text-gold-400 border border-gold-500/20">PWA</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-[#022c22] font-bold text-sm shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-100 text-sm truncate">Admin Pusat</p>
              <p className="text-[11px] text-slate-500">KPK · BPK · Inspektorat</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
