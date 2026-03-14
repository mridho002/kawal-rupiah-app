'use client'

import { useState } from "react";
import { Settings, Bell, Shield, Moon, Eye, Globe, Database, Lock, ChevronRight, CheckCircle2, AlertTriangle, ToggleLeft, ToggleRight } from "lucide-react";

interface SettingToggle {
  id: string;
  label: string;
  desc: string;
  icon: typeof Bell;
  enabled: boolean;
  iconColor: string;
}

export default function PengaturanScreen() {
  const [settings, setSettings] = useState<SettingToggle[]>([
    { id: "notif", label: "Notifikasi Anomali Real-time", desc: "Push notification saat AI mendeteksi markup >15%", icon: Bell, enabled: true, iconColor: "text-[#C0392B]" },
    { id: "auto_block", label: "Auto-Block Pembayaran", desc: "Otomatis blokir pembayaran jika terdeteksi anomali", icon: Shield, enabled: true, iconColor: "text-[#DFA000]" },
    { id: "dark", label: "Dark Mode", desc: "Tampilan gelap untuk kenyamanan mata", icon: Moon, enabled: false, iconColor: "text-[#0069D9]" },
    { id: "public", label: "Transparansi Publik", desc: "Data anomali dapat diakses warga via Citizen PWA", icon: Eye, enabled: true, iconColor: "text-[#27AE60]" },
    { id: "dlt", label: "DLT Sync Auto", desc: "Sinkronisasi otomatis ke semua node Hyperledger", icon: Database, enabled: true, iconColor: "text-[#0069D9]" },
    { id: "2fa", label: "Two-Factor Authentication", desc: "Keamanan ganda untuk akses admin", icon: Lock, enabled: true, iconColor: "text-[#C0392B]" },
  ]);

  const toggle = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <div className="space-y-6 max-w-full pb-20">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#0D1B3E] flex items-center">
          <Settings className="w-6 h-6 mr-3 text-slate-500" />
          Pengaturan Sistem
        </h2>
        <p className="text-sm text-[#8899AA] mt-1 pl-9">Konfigurasi platform KAWAL RUPIAH</p>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#27AE60]"/></div>
            <h3 className="font-bold text-[#0D1B3E] text-sm">Sistem Status</h3>
          </div>
          <p className="text-xs text-slate-500">Semua layanan berjalan normal</p>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">API Gateway</span>
              <span className="flex items-center text-[#27AE60] font-bold"><span className="w-2 h-2 rounded-full bg-[#27AE60] mr-1.5 animate-pulse"/>Online</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">AI Oracle Engine</span>
              <span className="flex items-center text-[#27AE60] font-bold"><span className="w-2 h-2 rounded-full bg-[#27AE60] mr-1.5 animate-pulse"/>Online</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">DLT Network</span>
              <span className="flex items-center text-[#DFA000] font-bold"><span className="w-2 h-2 rounded-full bg-[#DFA000] mr-1.5 animate-pulse"/>Syncing</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-[#0069D9]"/></div>
            <h3 className="font-bold text-[#0D1B3E] text-sm">Node DLT</h3>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">KPK Node</span>
              <span className="text-[#27AE60] font-bold text-[10px] bg-green-50 px-2 py-0.5 rounded">CONNECTED</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">BPK Node</span>
              <span className="text-[#DFA000] font-bold text-[10px] bg-amber-50 px-2 py-0.5 rounded">SYNCING</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">BI Node</span>
              <span className="text-[#27AE60] font-bold text-[10px] bg-green-50 px-2 py-0.5 rounded">CONNECTED</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 mt-3">Hyperledger Fabric v2.5</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-[#DFA000]"/></div>
            <h3 className="font-bold text-[#0D1B3E] text-sm">Keamanan</h3>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Encryption</span>
              <span className="font-bold text-[#0D1B3E]">AES-256</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">SSL/TLS</span>
              <span className="font-bold text-[#27AE60]">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Last Audit</span>
              <span className="font-bold text-[#0D1B3E]">14 Mar 2026</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 mt-3">ISO 27001 Compliant</p>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#0D1B3E] text-sm">Konfigurasi</h3>
        </div>
        {settings.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.enabled ? 'bg-slate-50' : 'bg-slate-100'}`}>
                  <Icon className={`w-5 h-5 ${s.enabled ? s.iconColor : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0D1B3E]">{s.label}</p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              </div>
              <button onClick={() => toggle(s.id)} className="transition-colors">
                {s.enabled ? (
                  <ToggleRight className="w-10 h-10 text-[#27AE60]" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-300" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Threshold Config */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-[#0D1B3E] text-sm mb-4 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-[#DFA000]" />
          Konfigurasi AI Oracle
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-2">Threshold Anomali (%)</label>
            <input type="number" defaultValue={15} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0069D9]/20 focus:border-[#0069D9]" />
            <p className="text-[10px] text-slate-400 mt-1">Harga di atas threshold akan di-flag sebagai anomali</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-2">Minimum Konsensus Warga</label>
            <input type="number" defaultValue={3} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0069D9]/20 focus:border-[#0069D9]" />
            <p className="text-[10px] text-slate-400 mt-1">Jumlah warga yang harus verifikasi sebelum konsensus valid</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-2">Radius GPS Verifikasi (meter)</label>
            <input type="number" defaultValue={500} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0069D9]/20 focus:border-[#0069D9]" />
            <p className="text-[10px] text-slate-400 mt-1">Warga harus berada dalam radius ini dari lokasi proyek</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-2">Reward Maksimum / Task (Rp)</label>
            <input type="number" defaultValue={25000} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0069D9]/20 focus:border-[#0069D9]" />
            <p className="text-[10px] text-slate-400 mt-1">Batas reward per task untuk citizen miner</p>
          </div>
        </div>
        <button className="mt-6 px-6 py-2.5 bg-[#0D1B3E] text-white rounded-lg text-sm font-bold hover:bg-[#1a2f5e] transition-colors">Simpan Konfigurasi</button>
      </div>

      <p className="text-center text-xs text-slate-400">KAWAL RUPIAH v1.0.0 • Platform Pengawasan APBD Berbasis AI & DLT</p>
    </div>
  );
}
