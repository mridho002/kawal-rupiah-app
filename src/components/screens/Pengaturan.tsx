'use client'

import { useState } from "react";
import { Settings, Bell, Shield, Moon, Eye, Globe, Database, Lock, CheckCircle2, AlertTriangle, ToggleLeft, ToggleRight } from "lucide-react";

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
    { id: "notif", label: "Notifikasi Anomali Real-time", desc: "Push notification saat AI mendeteksi markup >15%", icon: Bell, enabled: true, iconColor: "text-red-400" },
    { id: "auto_block", label: "Auto-Block Pembayaran", desc: "Otomatis blokir pembayaran jika terdeteksi anomali", icon: Shield, enabled: true, iconColor: "text-gold-400" },
    { id: "dark", label: "Dark Mode", desc: "Tampilan gelap Garuda Shield untuk kenyamanan mata", icon: Moon, enabled: true, iconColor: "text-blue-400" },
    { id: "public", label: "Transparansi Publik", desc: "Data anomali dapat diakses warga via Citizen PWA", icon: Eye, enabled: true, iconColor: "text-brand-400" },
    { id: "dlt", label: "DLT Sync Auto", desc: "Sinkronisasi otomatis ke semua node Hyperledger", icon: Database, enabled: true, iconColor: "text-blue-400" },
    { id: "2fa", label: "Two-Factor Authentication", desc: "Keamanan ganda untuk akses admin", icon: Lock, enabled: true, iconColor: "text-red-400" },
  ]);

  const toggle = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-100 font-data focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition-all";

  return (
    <div className="space-y-6 max-w-full pb-20">
      <div>
        <h2 className="text-2xl font-bold text-slate-50 flex items-center">
          <Settings className="w-6 h-6 mr-3 text-slate-400" />
          Pengaturan Sistem
        </h2>
        <p className="text-sm text-slate-400 mt-1 pl-9">Konfigurasi platform Kawal Rupiah</p>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="gs-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-brand-400" /></div>
            <h3 className="font-bold text-slate-100 text-sm">Sistem Status</h3>
          </div>
          <p className="text-xs text-slate-500">Semua layanan berjalan normal</p>
          <div className="mt-3 space-y-1.5">
            {[["API Gateway", "Online", "brand"], ["AI Oracle Engine", "Online", "brand"], ["DLT Network", "Syncing", "gold"]].map(([k, v, c]) => (
              <div key={k} className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{k}</span>
                <span className={`flex items-center font-bold ${c === 'brand' ? 'text-brand-400' : 'text-gold-400'}`}>
                  <span className={`w-2 h-2 rounded-full mr-1.5 pulse-live ${c === 'brand' ? 'bg-brand-400' : 'bg-gold-400'}`} />{v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="gs-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-blue-400" /></div>
            <h3 className="font-bold text-slate-100 text-sm">Node DLT</h3>
          </div>
          <div className="mt-2 space-y-2">
            {[["KPK Node", "CONNECTED", "brand"], ["BPK Node", "SYNCING", "gold"], ["BI Node", "CONNECTED", "brand"]].map(([k, v, c]) => (
              <div key={k} className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{k}</span>
                <span className={`font-bold text-[10px] px-2 py-0.5 rounded border ${c === 'brand' ? 'text-brand-400 bg-brand-500/10 border-brand-500/20' : 'text-gold-400 bg-gold-500/10 border-gold-500/20'}`}>{v}</span>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-slate-600 mt-3 font-data">Hyperledger Fabric v2.5</p>
        </div>

        <div className="gs-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-gold-400" /></div>
            <h3 className="font-bold text-slate-100 text-sm">Keamanan</h3>
          </div>
          <div className="mt-2 space-y-2 text-xs">
            <div className="flex items-center justify-between"><span className="text-slate-400 font-medium">Encryption</span><span className="font-bold text-slate-200 font-data">AES-256</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400 font-medium">SSL/TLS</span><span className="font-bold text-brand-400">Active</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400 font-medium">Last Audit</span><span className="font-bold text-slate-200 font-data">14 Mar 2026</span></div>
          </div>
          <p className="text-[9px] text-slate-600 mt-3">ISO 27001 Compliant</p>
        </div>
      </div>

      {/* Agentic Security */}
      <div className="gs-panel p-6">
        <h3 className="font-bold text-slate-100 text-sm mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-400" />
          Arsitektur Keamanan Agentic
        </h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed max-w-4xl">
          Sistem keamanan kognitif untuk melindungi integritas LLM Orchestrator dan mencegah eksploitasi prompt injection, bypass otorisasi (RBAC), serta halusinasi data perencanaan daerah.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: "1. Sanitasi RAG (Input Sanitization)", d: "Memproses PDF APBD melalui parser khusus untuk menyaring instruksi imperatif (indirect prompt injection) sebelum masuk ke Vector Database (Qdrant)." },
            { t: "2. JWT-Forwarding Tool Gateway", d: "Semua execute/write tools diisolasi di balik API Gateway. Token JWT user diteruskan untuk membatasi aksi LLM agar tidak bisa mem-bypass RBAC." },
            { t: "3. Proctoring Halusinasi Real-time", d: "Verifikasi jawaban AI real-time dengan model Cross-Encoder ringan (latensi <100ms di produksi), mengunci evaluasi RAGAS pada offline CI/CD." },
            { t: "4. Hierarchical Tool Routing", d: "Membagi puluhan tool menjadi sub-kategori (LKPP, LPSE, retail APIs) dan merutekannya bertingkat untuk menghindari semantic collision & context bloat." },
          ].map((item) => (
            <div key={item.t} className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.02] space-y-2">
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-bold text-slate-100">{item.t}</span>
                <span className="text-[9px] bg-brand-500/15 text-brand-400 border border-brand-500/20 font-bold px-2 py-0.5 rounded shrink-0">AKTIF</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="gs-panel divide-y divide-white/[0.06]">
        <div className="px-6 py-4">
          <h3 className="font-bold text-slate-100 text-sm">Konfigurasi</h3>
        </div>
        {settings.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.enabled ? 'bg-white/5' : 'bg-white/[0.02]'}`}>
                  <Icon className={`w-5 h-5 ${s.enabled ? s.iconColor : 'text-slate-600'}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{s.label}</p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              </div>
              <button onClick={() => toggle(s.id)} className="transition-colors shrink-0" aria-label={`Toggle ${s.label}`}>
                {s.enabled ? <ToggleRight className="w-10 h-10 text-brand-400" /> : <ToggleLeft className="w-10 h-10 text-slate-600" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Threshold Config */}
      <div className="gs-panel p-6">
        <h3 className="font-bold text-slate-100 text-sm mb-4 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-gold-400" />
          Konfigurasi AI Oracle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">Threshold Anomali (%)</label>
            <input type="number" defaultValue={15} className={inputCls} />
            <p className="text-[10px] text-slate-500 mt-1">Harga di atas threshold akan di-flag sebagai anomali</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">Minimum Konsensus Warga</label>
            <input type="number" defaultValue={3} className={inputCls} />
            <p className="text-[10px] text-slate-500 mt-1">Jumlah warga yang harus verifikasi sebelum konsensus valid</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">Radius GPS Verifikasi (meter)</label>
            <input type="number" defaultValue={500} className={inputCls} />
            <p className="text-[10px] text-slate-500 mt-1">Warga harus berada dalam radius ini dari lokasi proyek</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">Reward Maksimum / Task (Rp)</label>
            <input type="number" defaultValue={25000} className={inputCls} />
            <p className="text-[10px] text-slate-500 mt-1">Batas reward per task untuk citizen miner</p>
          </div>
        </div>
        <button className="mt-6 px-6 py-2.5 bg-brand-500 text-[#022c22] rounded-xl text-sm font-bold hover:bg-brand-600 transition-colors">Simpan Konfigurasi</button>
      </div>

      <p className="text-center text-xs text-slate-600">Kawal Rupiah v1.0.0 • Platform Pengawasan APBD Berbasis AI & DLT</p>
    </div>
  );
}
