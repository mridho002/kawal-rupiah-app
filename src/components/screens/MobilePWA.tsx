'use client'

import { useState } from "react";
import { MapPin, Camera, Upload, CheckCircle2, User, Gift, Target, Coins, Star, Shield, Clock, ChevronRight, Award, TrendingUp, ArrowRight, AlertTriangle, FileText, Eye } from "lucide-react";

// --- Types ---
type TaskType = 'existence' | 'quality' | 'progress';
type TaskStatus = 'available' | 'in_progress' | 'pending_consensus' | 'completed';
type PwaTab = 'tugas' | 'peta' | 'reward' | 'profil';

interface MiningTask {
  id: number;
  title: string;
  location: string;
  type: TaskType;
  status: TaskStatus;
  reward: number;
  distance: string;
  deadline: string;
  consensus: { done: number; total: number };
  anomalyLevel?: string;
}

const TASK_TYPE_META: Record<TaskType, { label: string; icon: typeof Camera; color: string; bg: string }> = {
  existence: { label: "Existence Verify", icon: Camera, color: "text-[#0069D9]", bg: "bg-blue-50" },
  quality: { label: "Quality Check", icon: FileText, color: "text-[#DFA000]", bg: "bg-amber-50" },
  progress: { label: "Progress Report", icon: TrendingUp, color: "text-[#27AE60]", bg: "bg-green-50" },
};

const TASKS: MiningTask[] = [
  { id: 1, title: "Jl. Desa Cibadak — Proyek Aspal", location: "Kab. Bandung", type: "existence", status: "available", reward: 15000, distance: "1.2 km", deadline: "2 jam lagi", consensus: { done: 0, total: 3 }, anomalyLevel: "+44%" },
  { id: 2, title: "Pembangunan Jembatan Cisangkuy", location: "Kab. Bandung Selatan", type: "quality", status: "in_progress", reward: 12000, distance: "3.5 km", deadline: "5 jam lagi", consensus: { done: 1, total: 3 } },
  { id: 3, title: "Renovasi SDN 03 Inpres", location: "Kota Cimahi", type: "progress", status: "pending_consensus", reward: 20000, distance: "4.8 km", deadline: "Selesai", consensus: { done: 2, total: 3 } },
  { id: 4, title: "Pengadaan PC Lab Komputer", location: "Kab. Sumedang", type: "existence", status: "completed", reward: 8000, distance: "-", deadline: "Selesai", consensus: { done: 3, total: 3 } },
  { id: 5, title: "Drainase Jl. Merdeka Raya", location: "Kota Bandung", type: "quality", status: "completed", reward: 15000, distance: "-", deadline: "Selesai", consensus: { done: 3, total: 3 } },
];

const REWARD_HISTORY = [
  { id: 1, title: "Existence Verify — Proyek Aspal", date: "14 Mar 2026", amount: 15000, status: "success" },
  { id: 2, title: "Quality Check — Jembatan Cisangkuy", date: "13 Mar 2026", amount: 12000, status: "success" },
  { id: 3, title: "Progress Report — SDN 03", date: "12 Mar 2026", amount: 20000, status: "pending" },
  { id: 4, title: "Existence Verify — PC Lab", date: "11 Mar 2026", amount: 8000, status: "success" },
  { id: 5, title: "Bonus Akurasi (>90%)", date: "10 Mar 2026", amount: 10000, status: "success" },
];

// --- Consensus Indicator Component ---
function ConsensusIndicator({ done, total }: { done: number; total: number }) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black border-2 ${
          i < done
            ? 'bg-[#27AE60] border-[#27AE60] text-white'
            : 'bg-white border-slate-300 text-slate-400'
        }`}>
          {i < done ? '✓' : '○'}
        </div>
      ))}
      <span className="text-[10px] text-slate-500 font-bold ml-1">{done}/{total}</span>
    </div>
  );
}

// --- Level Badge ---
function LevelBadge() {
  return (
    <div className="flex items-center bg-gradient-to-r from-[#DFA000]/10 to-[#DFA000]/5 px-2.5 py-1 rounded-full border border-[#DFA000]/20">
      <Star className="w-3 h-3 text-[#DFA000] mr-1" fill="#DFA000" />
      <span className="text-[10px] font-bold text-[#DFA000]">Lv.2 Terlatih</span>
    </div>
  );
}

// --- Tab: Tugas ---
function TabTugas() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const active = TASKS.find(t => t.id === selectedTask);

  const statusMeta: Record<TaskStatus, { label: string; color: string; bg: string }> = {
    available: { label: "TERSEDIA", color: "text-[#0069D9]", bg: "bg-blue-50" },
    in_progress: { label: "DALAM PROSES", color: "text-[#DFA000]", bg: "bg-amber-50" },
    pending_consensus: { label: "MENUNGGU KONSENSUS", color: "text-orange-600", bg: "bg-orange-50" },
    completed: { label: "SELESAI", color: "text-[#27AE60]", bg: "bg-green-50" },
  };

  if (active && active.status !== 'completed') {
    const meta = TASK_TYPE_META[active.type];
    const Icon = meta.icon;
    return (
      <div className="px-5 py-4 space-y-4 animate-in slide-in-from-right-4 duration-300">
        <button onClick={() => setSelectedTask(null)} className="text-xs text-[#0069D9] font-bold flex items-center"><ChevronRight className="w-3 h-3 rotate-180 mr-1"/>Kembali</button>
        
        {/* Map area */}
        <div className="relative h-40 bg-[#E8F1FA] rounded-2xl overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-40 text-slate-400" fill="currentColor">
            <path d="M0 80 Q100 50 200 100 T400 80 V200 H0 Z" fill="rgba(0,105,217,0.05)" />
            <path d="M80 0 L100 200 M0 80 L400 120 M250 0 L280 200" stroke="rgba(255,255,255,0.8)" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-md mb-2 text-[10px] font-bold text-[#0D1B3E] max-w-[200px] text-center truncate">{active.title}</div>
            <div className="relative flex items-center justify-center">
              <span className="absolute w-8 h-8 bg-[#DFA000] rounded-full animate-ping opacity-50"></span>
              <MapPin className="relative h-8 w-8 text-[#0069D9] drop-shadow-lg z-10" fill="#fff" />
            </div>
          </div>
          {active.anomalyLevel && (
            <div className="absolute top-3 right-3 bg-[#C0392B] text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center">
              <AlertTriangle className="w-3 h-3 mr-0.5" />{active.anomalyLevel}
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-medium text-slate-600">{active.distance} dari Anda</div>
        </div>

        {/* Task Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`w-9 h-9 ${meta.bg} ${meta.color} rounded-xl flex items-center justify-center`}><Icon className="w-5 h-5" /></div>
              <div>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${meta.color}`}>{meta.label}</span>
                <h3 className="font-bold text-[#0D1B3E] text-sm leading-tight">{active.title}</h3>
              </div>
            </div>
            <div className="bg-[#DFA000] text-white px-2.5 py-1 rounded-full text-xs font-bold">Rp {active.reward.toLocaleString('id-ID')}</div>
          </div>

          <div className="space-y-2 text-xs mb-4">
            <div className="flex justify-between text-slate-500">
              <span>Lokasi:</span><span className="font-medium text-[#0D1B3E]">{active.location}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Deadline:</span><span className="font-medium text-[#C0392B]">{active.deadline}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Konsensus:</span>
              <ConsensusIndicator done={active.consensus.done} total={active.consensus.total} />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">📋 Instruksi:</p>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              {active.type === 'existence' && <>
                <li className="flex items-start"><span className="mr-1.5">1.</span>Pergi ke lokasi proyek</li>
                <li className="flex items-start"><span className="mr-1.5">2.</span>Foto fisik proyek dari 2 sudut berbeda</li>
                <li className="flex items-start"><span className="mr-1.5">3.</span>Foto papan proyek (jika ada)</li>
                <li className="flex items-start"><span className="mr-1.5">4.</span>Upload — GPS & timestamp otomatis</li>
              </>}
              {active.type === 'quality' && <>
                <li className="flex items-start"><span className="mr-1.5">1.</span>Foto spesifikasi di papan proyek</li>
                <li className="flex items-start"><span className="mr-1.5">2.</span>Bandingkan dengan data di layar</li>
                <li className="flex items-start"><span className="mr-1.5">3.</span>Laporkan jika ada ketidaksesuaian</li>
              </>}
              {active.type === 'progress' && <>
                <li className="flex items-start"><span className="mr-1.5">1.</span>Foto kondisi terkini proyek</li>
                <li className="flex items-start"><span className="mr-1.5">2.</span>Estimasi % penyelesaian secara visual</li>
                <li className="flex items-start"><span className="mr-1.5">3.</span>Tandai jika ada kerusakan/masalah</li>
              </>}
            </ul>
          </div>

          {active.status === 'pending_consensus' ? (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-orange-700">Menunggu Konsensus...</p>
              <p className="text-[10px] text-orange-500 mt-0.5">Butuh {active.consensus.total - active.consensus.done} warga lagi untuk verifikasi</p>
              <div className="flex justify-center mt-2">
                <ConsensusIndicator done={active.consensus.done} total={active.consensus.total} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors active:scale-95 text-sm">
                <Camera className="w-4 h-4" /><span>Kamera</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 bg-[#0D1B3E] text-white rounded-xl font-semibold hover:bg-[#1a2f5e] transition-colors shadow-sm active:scale-95 text-sm">
                <Upload className="w-4 h-4" /><span>Upload</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 space-y-4">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-100">
          <p className="text-lg font-black text-[#0069D9]">{TASKS.filter(t => t.status === 'available').length}</p>
          <p className="text-[9px] text-slate-500 font-bold">Tersedia</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-2.5 text-center border border-amber-100">
          <p className="text-lg font-black text-[#DFA000]">{TASKS.filter(t => t.status === 'in_progress' || t.status === 'pending_consensus').length}</p>
          <p className="text-[9px] text-slate-500 font-bold">Proses</p>
        </div>
        <div className="bg-green-50 rounded-xl p-2.5 text-center border border-green-100">
          <p className="text-lg font-black text-[#27AE60]">{TASKS.filter(t => t.status === 'completed').length}</p>
          <p className="text-[9px] text-slate-500 font-bold">Selesai</p>
        </div>
      </div>

      {/* Task List */}
      <h4 className="font-bold text-[#0D1B3E] text-sm flex items-center justify-between">
        <span>📋 Tugas Mining</span>
        <span className="text-[10px] text-slate-400 font-medium">5 tugas</span>
      </h4>

      <div className="space-y-2.5">
        {TASKS.map((task) => {
          const meta = TASK_TYPE_META[task.type];
          const stMeta = statusMeta[task.status];
          const Icon = meta.icon;
          return (
            <div
              key={task.id}
              onClick={() => task.status !== 'completed' ? setSelectedTask(task.id) : null}
              className={`bg-white p-3.5 rounded-2xl border shadow-sm transition-all active:scale-[0.98] ${
                task.status === 'completed' ? 'border-green-100 opacity-70' :
                task.status === 'pending_consensus' ? 'border-orange-200 cursor-pointer' :
                'border-slate-100 cursor-pointer hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${meta.bg} ${meta.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${meta.color}`}>{meta.label}</span>
                    <span className={`text-[9px] font-bold ${stMeta.color} ${stMeta.bg} px-1.5 py-0.5 rounded-full`}>{stMeta.label}</span>
                  </div>
                  <h5 className="font-bold text-[#0D1B3E] text-xs leading-tight mb-1">{task.title}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400 flex items-center"><MapPin className="w-2.5 h-2.5 mr-0.5"/>{task.distance}</span>
                      {task.status !== 'completed' && <span className="text-[10px] text-slate-400 flex items-center"><Clock className="w-2.5 h-2.5 mr-0.5"/>{task.deadline}</span>}
                    </div>
                    <span className="text-xs font-bold text-[#DFA000]">Rp {task.reward.toLocaleString('id-ID')}</span>
                  </div>
                  {/* Consensus indicator */}
                  <div className="mt-2 flex items-center justify-between">
                    <ConsensusIndicator done={task.consensus.done} total={task.consensus.total} />
                    {task.status !== 'completed' && <ChevronRight className="w-4 h-4 text-slate-300" />}
                    {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#27AE60]" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Tab: Peta ---
function TabPeta() {
  return (
    <div className="px-5 py-4 space-y-4">
      <div className="relative h-80 bg-[#E8F1FA] rounded-2xl overflow-hidden border border-slate-200">
        <svg viewBox="0 0 400 350" className="w-full h-full opacity-60 text-slate-400" fill="currentColor">
          <path d="M0 100 Q100 50 200 150 T400 100 V350 H0 Z" fill="rgba(0,105,217,0.05)" />
          <path d="M0 180 Q80 200 150 140 T300 220 T400 170 V350 H0 Z" fill="rgba(39,174,96,0.05)" />
          <path d="M80 0 L100 350 M200 0 L220 350 M320 0 L340 350 M0 80 L400 100 M0 200 L400 240" stroke="rgba(255,255,255,0.8)" strokeWidth="5" strokeLinecap="round" />
        </svg>
        {/* Project pins */}
        <div className="absolute top-[30%] left-[25%]">
          <div className="relative flex flex-col items-center">
            <span className="absolute w-6 h-6 bg-[#C0392B] rounded-full animate-ping opacity-40"></span>
            <MapPin className="relative h-7 w-7 text-[#C0392B] drop-shadow-lg z-10" fill="#fff" />
            <span className="bg-white text-[8px] font-bold text-[#0D1B3E] px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">Aspal +44%</span>
          </div>
        </div>
        <div className="absolute top-[50%] left-[55%]">
          <div className="relative flex flex-col items-center">
            <MapPin className="relative h-6 w-6 text-[#DFA000] drop-shadow z-10" fill="#fff" />
            <span className="bg-white text-[8px] font-bold text-[#0D1B3E] px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">Jembatan</span>
          </div>
        </div>
        <div className="absolute top-[40%] left-[75%]">
          <div className="relative flex flex-col items-center">
            <MapPin className="relative h-6 w-6 text-[#27AE60] drop-shadow z-10" fill="#fff" />
            <span className="bg-white text-[8px] font-bold text-[#0D1B3E] px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">SDN 03</span>
          </div>
        </div>
        {/* My location */}
        <div className="absolute top-[60%] left-[40%]">
          <div className="w-4 h-4 bg-[#0069D9] rounded-full border-3 border-white shadow-lg"></div>
          <span className="text-[8px] text-[#0069D9] font-bold mt-0.5 block">Anda</span>
        </div>
        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-slate-200 text-[9px]">
          <div className="flex items-center space-x-2 mb-1"><div className="w-2 h-2 rounded-full bg-[#C0392B]" /><span>Anomali</span></div>
          <div className="flex items-center space-x-2 mb-1"><div className="w-2 h-2 rounded-full bg-[#DFA000]" /><span>Proses</span></div>
          <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-[#27AE60]" /><span>Normal</span></div>
        </div>
        <button className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full shadow border border-slate-200 flex items-center justify-center text-slate-600"><Target className="w-4 h-4" /></button>
      </div>
      <p className="text-center text-[10px] text-slate-400">📍 3 proyek ditemukan dalam radius 5 km dari Anda</p>
    </div>
  );
}

// --- Tab: Reward ---
function TabReward() {
  const totalEarned = REWARD_HISTORY.filter(r => r.status === 'success').reduce((s, r) => s + r.amount, 0);
  return (
    <div className="px-5 py-4 space-y-4">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1a2f5e] rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <p className="text-xs text-white/60 font-medium mb-1">Saldo Reward</p>
        <p className="text-3xl font-black tracking-tight mb-3">Rp 45.000</p>
        <div className="flex items-center space-x-4 text-[10px]">
          <div><span className="text-white/50">Total diterima:</span> <span className="font-bold text-[#DFA000]">Rp {totalEarned.toLocaleString('id-ID')}</span></div>
          <div><span className="text-white/50">Bulan ini:</span> <span className="font-bold text-[#27AE60]">+Rp 35.000</span></div>
        </div>
        <button className="mt-4 w-full py-2.5 bg-[#DFA000] text-[#0D1B3E] rounded-xl text-xs font-bold hover:bg-[#DFA000]/90 transition-colors">Tarik ke e-Wallet / Bank</button>
      </div>

      {/* History */}
      <h4 className="font-bold text-[#0D1B3E] text-sm">Riwayat Reward</h4>
      <div className="space-y-2">
        {REWARD_HISTORY.map(r => (
          <div key={r.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.status === 'success' ? 'bg-green-50 text-[#27AE60]' : 'bg-amber-50 text-[#DFA000]'}`}>
                {r.status === 'success' ? <CheckCircle2 className="w-4 h-4"/> : <Clock className="w-4 h-4"/>}
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#0D1B3E] leading-tight">{r.title}</p>
                <p className="text-[9px] text-slate-400">{r.date}</p>
              </div>
            </div>
            <span className={`text-xs font-bold ${r.status === 'success' ? 'text-[#27AE60]' : 'text-[#DFA000]'}`}>
              +Rp {r.amount.toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Tab: Profil ---
function TabProfil() {
  return (
    <div className="px-5 py-4 space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-[#0D1B3E] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 ring-4 ring-[#DFA000]/20">A</div>
        <h3 className="font-bold text-[#0D1B3E] text-base">Andi Pratama</h3>
        <p className="text-xs text-slate-500 mb-2">Citizen Miner sejak Feb 2026</p>
        <div className="flex items-center justify-center space-x-1">
          <Star className="w-3 h-3 text-[#DFA000]" fill="#DFA000" />
          <Star className="w-3 h-3 text-[#DFA000]" fill="#DFA000" />
          <Star className="w-3 h-3 text-slate-300" fill="#E2E8F0" />
          <span className="text-[10px] font-bold text-[#DFA000] ml-1">Level 2 — Terlatih</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
          <p className="text-xl font-black text-[#0D1B3E]">27</p>
          <p className="text-[9px] text-slate-500 font-medium">Tasks Selesai</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
          <p className="text-xl font-black text-[#27AE60]">92%</p>
          <p className="text-[9px] text-slate-500 font-medium">Akurasi</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
          <p className="text-xl font-black text-[#DFA000]">Rp 405K</p>
          <p className="text-[9px] text-slate-500 font-medium">Total Earned</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-100 text-center">
          <p className="text-xl font-black text-[#0069D9]">#142</p>
          <p className="text-[9px] text-slate-500 font-medium">Ranking Kota</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-xl p-4 border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-[#0D1B3E]">Progress ke Level 3 (Ahli)</span>
          <span className="text-[10px] text-slate-500">27/50 tasks</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#DFA000] to-[#DFA000]/70 rounded-full transition-all" style={{ width: '54%' }}></div>
        </div>
        <p className="text-[9px] text-slate-400 mt-1.5">Selesaikan 23 tasks lagi untuk unlock "Progress Report" tasks (reward lebih tinggi)</p>
      </div>

      {/* KTP Status */}
      <div className="bg-green-50 rounded-xl p-3 border border-green-100 flex items-center space-x-3">
        <Shield className="w-5 h-5 text-[#27AE60] shrink-0" />
        <div>
          <p className="text-xs font-bold text-[#0D1B3E]">KTP Terverifikasi ✓</p>
          <p className="text-[9px] text-slate-500">NIK: ****-****-3847</p>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export default function MobilePwaScreen() {
  const [activeTab, setActiveTab] = useState<PwaTab>('tugas');

  const tabs: { id: PwaTab; label: string; icon: typeof CheckCircle2 }[] = [
    { id: 'tugas', label: 'Tugas', icon: CheckCircle2 },
    { id: 'peta', label: 'Peta', icon: MapPin },
    { id: 'reward', label: 'Reward', icon: Gift },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center pb-20 mt-4 gap-10">
      {/* Phone container */}
      <div className="w-[390px] h-[844px] bg-slate-50 border-[12px] border-[#0D1B3E] rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col shrink-0">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0D1B3E] rounded-b-2xl z-50"></div>

        {/* App Header */}
        <div className="pt-12 pb-3 px-5 bg-white flex justify-between items-center shadow-sm relative z-40 border-b border-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#0D1B3E] text-white rounded-full flex items-center justify-center font-bold relative">
              <span className="text-[#DFA000] text-sm absolute -top-1 -right-1 bg-white rounded-full p-0.5"><Coins className="w-4 h-4" /></span>
              A
            </div>
            <div>
              <p className="text-[#0D1B3E] font-bold leading-none tracking-tight">KAWAL RUPIAH</p>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-[10px] text-slate-500 font-medium">Citizen Mining</p>
                <LevelBadge />
              </div>
            </div>
          </div>
          <div className="bg-[#DFA000]/10 text-[#DFA000] px-3 py-1.5 rounded-full font-bold text-sm flex items-center border border-[#DFA000]/20">
            <span className="mr-1">Rp</span>45.000
          </div>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative pb-24 custom-scrollbar">
          {activeTab === 'tugas' && <TabTugas />}
          {activeTab === 'peta' && <TabPeta />}
          {activeTab === 'reward' && <TabReward />}
          {activeTab === 'profil' && <TabProfil />}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 px-4 py-3 flex justify-around items-center pb-8 shadow-[0_-4px_20px_rgba(13,27,62,0.05)] z-40">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center transition-colors ${isActive ? 'text-[#0069D9]' : 'text-slate-400'}`}>
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-[#0069D9]' : ''}`} />
                <span className={`text-[10px] ${isActive ? 'font-bold text-[#0069D9]' : 'font-medium'}`}>{tab.label}</span>
                {isActive && <div className="w-1 h-1 bg-[#0069D9] rounded-full mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Decorative text next to phone */}
      <div className="w-80 p-4 hidden xl:block">
        <h2 className="text-3xl font-extrabold text-[#0D1B3E] mb-4">Citizen Mining PWA</h2>
        <p className="text-slate-500 leading-relaxed mb-6 font-medium">Ubah pengawasan pemerintah menjadi <strong>micro-tasks</strong> masal. Warga memverifikasi proyek dan mendapatkan reward real-time.</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm font-bold text-[#0D1B3E] bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0069D9] flex items-center justify-center mr-3"><Eye className="w-4 h-4"/></div>
            Existence Verify
          </div>
          <div className="flex items-center text-sm font-bold text-[#0D1B3E] bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-[#DFA000] flex items-center justify-center mr-3"><FileText className="w-4 h-4"/></div>
            Quality Check
          </div>
          <div className="flex items-center text-sm font-bold text-[#0D1B3E] bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-green-50 text-[#27AE60] flex items-center justify-center mr-3"><TrendingUp className="w-4 h-4"/></div>
            Progress Report
          </div>
        </div>

        {/* Mining flow  */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Flow Konsensus:</p>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center"><div className="w-6 h-6 bg-blue-50 text-[#0069D9] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">1</div>Warga foto di lokasi</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-amber-50 text-[#DFA000] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">2</div>3 warga berbeda verifikasi</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-green-50 text-[#27AE60] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">3</div>Konsensus ✓✓✓ → Blockchain</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-[#DFA000]/10 text-[#DFA000] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">4</div>Reward instan ke e-wallet</div>
          </div>
        </div>
      </div>
    </div>
  );
}
