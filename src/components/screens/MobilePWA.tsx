'use client'

import { MapPin, Camera, Upload, CheckCircle2, User, Gift, Target, Coins } from "lucide-react";

export default function MobilePwaScreen() {
  const recentTasks = [
    { id: 1, title: "Pembangunan Jembatan", desc: "Verification Foto", reward: "Rp 15.000" },
    { id: 2, title: "Renovasi Sekolah SD Inpres", desc: "Laporan Kondisi", reward: "Rp 8.000" },
  ];

  return (
    <div className="flex flex-col items-center justify-center pb-20 mt-4">
      {/* Phone container */}
      <div className="w-[390px] h-[844px] bg-slate-50 border-[12px] border-[#0D1B3E] rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
        {/* Dynamic Island / Notch Mock */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0D1B3E] rounded-b-2xl z-50"></div>
        
        {/* App Header */}
        <div className="pt-12 pb-4 px-6 bg-white flex justify-between items-center shadow-sm relative z-40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold relative">
              <span className="text-[#DFA000] text-sm absolute -top-1 -right-1 bg-white rounded-full p-0.5"><Coins className="w-4 h-4" /></span>
              A
            </div>
            <div>
              <p className="text-[#0D1B3E] font-bold leading-none tracking-tight">KAWAL RUPIAH</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Citizen Mining</p>
            </div>
          </div>
          <div className="bg-[#DFA000]/10 text-[#DFA000] px-3 py-1.5 rounded-full font-bold text-sm flex items-center border border-[#DFA000]/20">
            <span className="mr-1">Rp</span>45.000
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative pb-24 custom-scrollbar">
          {/* Map Area Mockup */}
          <div className="relative h-64 bg-[#E8F1FA] border-b border-white w-full">
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60 text-slate-400" fill="currentColor">
              <path d="M0 100 Q 100 50 200 150 T 400 100 V 300 H 0 Z" fill="rgba(0,105,217,0.05)" />
              <path d="M0 150 Q 80 180 150 120 T 300 200 T 400 150 V 300 H 0 Z" fill="rgba(39,174,96,0.05)" />
              {/* Streets */}
              <path d="M100 0 L 150 300 M 0 100 L 400 150 M 200 0 L 250 300 M 0 200 L 400 250" stroke="rgba(255,255,255,0.8)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-white px-3 py-2 rounded-lg shadow-md mb-2 flex items-center text-xs font-bold text-navy whitespace-nowrap">
                Jalan Desa Cibadak - Proyek Aspal
              </div>
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 bg-[#DFA000] rounded-full animate-ping opacity-50"></span>
                <MapPin className="relative h-10 w-10 text-[#0069D9] drop-shadow-lg z-10" fill="#fff" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow border-slate-200 flex items-center justify-center text-slate-600">
              <Target className="w-5 h-5" />
            </div>
          </div>

          {/* Task Card Container overlapping map */}
          <div className="-mt-16 px-5 relative z-20">
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
              <div className="flex items-start space-x-4 mb-5">
                <div className="w-14 h-14 bg-blue-50 text-[#0069D9] rounded-2xl flex items-center justify-center shrink-0">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0D1B3E] text-base leading-snug mb-1">📍 Existence Verify - Foto fisik jalan</h3>
                  <div className="inline-flex items-center px-2.5 py-1 bg-[#DFA000] text-white rounded-full text-xs font-bold leading-none shadow-sm">
                    Rp 15.000
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors active:scale-95 text-sm">
                  <Camera className="w-4 h-4" />
                  <span>Kamera</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-[#0D1B3E] text-white rounded-xl font-semibold hover:bg-navy/90 transition-colors shadow-sm active:scale-95 text-sm">
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 mt-8">
            <h4 className="font-bold text-[#0D1B3E] mb-4 text-sm flex items-center justify-between">
              <span>Recent Completed Tasks</span>
              <span className="text-[#0069D9] text-xs font-medium cursor-pointer">Lihat Semua</span>
            </h4>
            
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-transform hover:-translate-y-0.5 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                      {/* Image placeholder */}
                      <div className="w-full h-full bg-[#E8F1FA] flex items-center justify-center">
                        <Camera className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-[#0D1B3E] text-sm leading-tight mb-1 truncate w-40">{task.title}</h5>
                      <div className="flex items-center text-xs">
                        <span className="text-slate-500 mr-2">{task.desc}</span>
                        <span className="text-[#DFA000] font-bold">{task.reward}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-50 text-[#27AE60] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center pb-8 shadow-[0_-4px_20px_rgba(13,27,62,0.05)] z-40">
          <div className="flex flex-col items-center text-[#0D1B3E]">
            <CheckCircle2 className="w-6 h-6 mb-1 text-[#0069D9]" />
            <span className="text-[10px] font-bold text-[#0069D9]">Tugas</span>
          </div>
          <div className="flex flex-col items-center text-slate-400 hover:text-navy transition-colors">
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Peta</span>
          </div>
          <div className="flex flex-col items-center text-slate-400 hover:text-navy transition-colors">
            <Gift className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Reward</span>
          </div>
          <div className="flex flex-col items-center text-slate-400 hover:text-navy transition-colors">
            <User className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Profil</span>
          </div>
        </div>
      </div>
      
      {/* Decorative text next to phone */}
      <div className="absolute top-1/2 right-12 lg:right-32 -translate-y-1/2 w-80 p-8 hidden xl:block">
        <h2 className="text-3xl font-extrabold text-[#0D1B3E] mb-4">Citizen Mining PWA</h2>
        <p className="text-slate-500 leading-relaxed mb-6 font-medium">Ubah pengawasan pemerintah menjadi micro-tasks masal. Warga memverifikasi proyek dan mendapatkan reward real-time (Rp).</p>
        <ul className="space-y-4">
          <li className="flex items-center text-sm font-bold text-navy bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mr-3"><CheckCircle2 className="w-4 h-4"/></div>
            Progressive Web App (PWA)
          </li>
          <li className="flex items-center text-sm font-bold text-navy bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3"><Camera className="w-4 h-4"/></div>
            Live Foto Verifikasi
          </li>
          <li className="flex items-center text-sm font-bold text-navy bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-3"><Coins className="w-4 h-4"/></div>
            Instant Rewards
          </li>
        </ul>
      </div>
    </div>
  );
}
