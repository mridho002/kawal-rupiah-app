'use client'

import { useState } from "react";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Smartphone, 
  Activity, 
  ArrowRight, 
  Monitor, 
  CheckCircle2, 
  Code, 
  Terminal,
  Cpu,
  Layers
} from "lucide-react";

export default function DemoPage() {
  const [hoveredCard, setHoveredCard] = useState<"desktop" | "mobile" | null>(null);

  const featuresDesktop = [
    "AI Price Oracle (Deteksi Markup Harga PBJ)",
    "Audit-Trail Cryptographic Hash (Keamanan Data)",
    "Peta Distribusi & Risiko Kerugian Daerah",
    "Papan Analisis Kelayakan Fiskal & Pengadaan"
  ];

  const featuresMobile = [
    "Unggah Laporan Deviasi Langsung di Lapangan",
    "Citizen Social Audit (Verifikasi Rapat Warga)",
    "OCR OCR Receipt Scanner (Deteksi Otomatis Struk)",
    "Poin Insentif & Reputasi Warga Pengawas"
  ];

  return (
    <div className="min-h-screen bg-void text-slate-100 flex flex-col justify-between selection:bg-brand-500/30 font-sans relative overflow-hidden">
      
      {/* Decorative Grid and Radials */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.06] backdrop-blur-sm bg-void/50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400/20 to-gold-500/10 border border-white/10 flex items-center justify-center glow-emerald">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
          </div>
          <div className="leading-tight text-left">
            <h1 className="text-sm font-extrabold tracking-tight">
              <span className="text-gradient-brand">KAWAL</span>{" "}
              <span className="text-gradient-gold">RUPIAH</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase">Garuda Shield System</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Tim P1081 (Profesional)
          </span>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400">
            Fase 2 Submisi
          </span>
        </div>
      </header>

      {/* Hero Intro */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 py-10 md:py-16 flex flex-col items-center justify-center">
        
        <div className="text-center max-w-3xl mb-12 md:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Gerbang Akses <span className="text-gradient-brand">Prototipe</span> & <span className="text-gradient-gold">Demo</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Selamat datang di gerbang peninjauan sistem terpadu Kawal Rupiah. 
            Silakan pilih platform demo di bawah ini untuk menguji fungsionalitas penanganan markup APBD.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-stretch">
          
          {/* Desktop/Admin Dashboard Card */}
          <div 
            onMouseEnter={() => setHoveredCard("desktop")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.open("/", "_blank")}
            className="gs-card card-hover cursor-pointer p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Visual Indicator Background */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-all duration-300" />
            
            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center gap-1">
                  <Monitor className="w-3 h-3" />
                  DESKTOP ONLY
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-brand-400 transition-colors duration-200">
                Portal Admin & Analyst
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Platform investigasi untuk instansi pengawas (KPK, BPK, Inspektorat) guna menganalisis markup pengadaan publik berbasis AI dan memvalidasi log audit blockchain.
              </p>

              {/* Mockup Preview (Desktop HTML Mockup) */}
              <div className="my-6 border border-white/[0.06] rounded-lg overflow-hidden bg-slate-950/70 p-2 shadow-inner">
                {/* Window header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.04] mb-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/75" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/75" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/75" />
                  </div>
                  <div className="text-[8px] font-mono text-slate-500">kawal-rupiah.id/dashboard</div>
                  <div className="w-3" />
                </div>
                {/* Mini Graph representation */}
                <div className="space-y-1">
                  <div className="h-2 w-1/3 rounded bg-white/[0.05]" />
                  <div className="h-10 w-full flex items-end gap-1 px-1 bg-white/[0.02] rounded border border-white/[0.02]">
                    <div className="h-4 w-full bg-brand-500/20 rounded-t-sm" />
                    <div className="h-6 w-full bg-brand-500/35 rounded-t-sm" />
                    <div className="h-8 w-full bg-brand-500/50 rounded-t-sm" />
                    <div className="h-5 w-full bg-brand-500/30 rounded-t-sm" />
                    <div className="h-7 w-full bg-brand-500/60 rounded-t-sm" />
                  </div>
                  <div className="flex justify-between items-center pt-1 text-[8px] font-mono">
                    <span className="text-brand-400">Status: 23 Mark-up Terdeteksi</span>
                    <span className="text-slate-500">Rp 12,4 M Diselamatkan</span>
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-2 mt-4 pt-4 border-t border-white/[0.06]">
                {featuresDesktop.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <div className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20 font-semibold text-xs transition-all duration-200">
                <span>MASUK PORTAL DESKTOP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-500 text-center mt-2">Terbaik jika diakses dengan Desktop / Tablet Layar Lebar</p>
            </div>
          </div>

          {/* Mobile/Citizen PWA App Card */}
          <div 
            onMouseEnter={() => setHoveredCard("mobile")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.open("/mobile", "_blank")}
            className="gs-card card-hover cursor-pointer p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Visual Indicator Background */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-300" />

            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  MOBILE PWA
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-gold-400 transition-colors duration-200">
                Citizen Mobile App (PWA)
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Aplikasi publik ramah mobile untuk melancarkan transparansi anggaran. Warga dapat mengunggah struk pembelian langsung di lapangan, memindai harga OCR, dan melakukan audit sosial.
              </p>

              {/* Mockup Preview (Mobile HTML Mockup) */}
              <div className="my-6 flex justify-center bg-slate-950/70 py-2 border border-white/[0.06] rounded-lg shadow-inner">
                {/* Phone Shell */}
                <div className="w-[110px] border border-white/10 rounded-lg bg-void/90 p-1.5 space-y-1">
                  <div className="w-12 h-1 bg-white/20 mx-auto rounded-full mb-1" />
                  <div className="bg-white/[0.03] p-1 rounded space-y-1 text-center">
                    <div className="w-4 h-4 bg-gold-500/20 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                    </div>
                    <div className="h-1.5 w-10 bg-white/[0.08] mx-auto rounded" />
                    <div className="h-1 w-12 bg-white/[0.04] mx-auto rounded" />
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] p-1 rounded space-y-0.5">
                    <div className="h-1 w-6 bg-gold-500/30 rounded" />
                    <div className="h-1 w-full bg-white/[0.06] rounded" />
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-2 mt-4 pt-4 border-t border-white/[0.06]">
                {featuresMobile.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <div className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 border border-gold-500/20 font-semibold text-xs transition-all duration-200">
                <span>MASUK CITIZEN MOBILE APP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-500 text-center mt-2">Kompatibel untuk Layar Smartphone / Mode Mobile Inspect</p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/[0.06] backdrop-blur-sm bg-void/50 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500">
        
        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-6 justify-center">
          <span className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Activity className="w-4 h-4 text-brand-400 animate-pulse" />
            Status Server: <span className="text-brand-400 font-bold uppercase">Online</span>
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Cpu className="w-4 h-4 text-gold-400" />
            Latensi API: <span className="text-slate-200 font-bold">~12ms</span>
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Layers className="w-4 h-4 text-slate-400" />
            Integrasi Blockchain: <span className="text-slate-200 font-bold">Terhubung</span>
          </span>
        </div>

        {/* Tech Stack Info */}
        <div className="flex items-center gap-3 text-[10px] font-mono bg-white/[0.02] border border-white/[0.06] px-3 py-1.5 rounded-lg text-slate-400">
          <Code className="w-3.5 h-3.5 text-brand-400" />
          <span>Next.js 16 • React 19 • Tailwind CSS • Recharts • Leaflet Map</span>
        </div>

      </footer>

    </div>
  );
}
