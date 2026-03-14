'use client'

import { useState } from "react";
import { MapPin, Camera, Upload, CheckCircle2, User, Gift, Target, Coins, Star, Shield, Clock, ChevronRight, TrendingUp, AlertTriangle, FileText, Eye, Lock, ShieldAlert, ImageIcon, Shuffle } from "lucide-react";

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
  projectValue: string;
  verifierRegions: string[];
  photoMin: number;
  stakeAmount: number;
}

const TASK_TYPE_META: Record<TaskType, { label: string; icon: typeof Camera; color: string; bg: string }> = {
  existence: { label: "Existence Verify", icon: Camera, color: "text-[#0069D9]", bg: "bg-blue-50" },
  quality: { label: "Quality Check", icon: FileText, color: "text-[#DFA000]", bg: "bg-amber-50" },
  progress: { label: "Progress Report", icon: TrendingUp, color: "text-[#27AE60]", bg: "bg-green-50" },
};

const TASKS: MiningTask[] = [
  { id: 1, title: "Jl. Desa Cibadak — Proyek Aspal", location: "Kab. Bandung", type: "existence", status: "available", reward: 15000, distance: "1.2 km", deadline: "2 jam lagi", consensus: { done: 0, total: 5 }, anomalyLevel: "+44%", projectValue: "Rp 2.1M", verifierRegions: ["Kec. Cibadak", "Kec. Bojongsoang", "Kec. Margahayu", "Kec. Dayeuhkolot", "Kec. Baleendah"], photoMin: 3, stakeAmount: 10000 },
  { id: 2, title: "Pembangunan Jembatan Cisangkuy", location: "Kab. Bandung Selatan", type: "quality", status: "in_progress", reward: 12000, distance: "3.5 km", deadline: "5 jam lagi", consensus: { done: 1, total: 5 }, projectValue: "Rp 4.8M", verifierRegions: ["Kec. Cisangkuy", "Kec. Pangalengan", "Kec. Pasirjambu", "Kec. Ciwidey", "Kec. Rancabali"], photoMin: 3, stakeAmount: 10000 },
  { id: 3, title: "Renovasi SDN 03 Inpres", location: "Kota Cimahi", type: "progress", status: "pending_consensus", reward: 20000, distance: "4.8 km", deadline: "Selesai", consensus: { done: 4, total: 7 }, projectValue: "Rp 8.5M", verifierRegions: ["Kec. Cimahi Utara", "Kec. Cimahi Selatan", "Kec. Cimahi Tengah", "Kec. Padalarang", "Kec. Ngamprah", "Kec. Cipongkor", "Kec. Batujajar"], photoMin: 4, stakeAmount: 15000 },
  { id: 4, title: "Pengadaan PC Lab Komputer", location: "Kab. Sumedang", type: "existence", status: "completed", reward: 8000, distance: "-", deadline: "Selesai", consensus: { done: 3, total: 3 }, projectValue: "Rp 350Jt", verifierRegions: ["Kec. Sumedang Utara", "Kec. Sumedang Selatan", "Kec. Jatinangor"], photoMin: 3, stakeAmount: 5000 },
  { id: 5, title: "Drainase Jl. Merdeka Raya", location: "Kota Bandung", type: "quality", status: "completed", reward: 15000, distance: "-", deadline: "Selesai", consensus: { done: 5, total: 5 }, projectValue: "Rp 1.2M", verifierRegions: ["Kec. Sumur Bandung", "Kec. Bandung Wetan", "Kec. Cibeunying Kaler", "Kec. Coblong", "Kec. Cidadap"], photoMin: 3, stakeAmount: 10000 },
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
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-black border-2 ${
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

  // --- TASK DETAIL VIEW (with Anti-Collusion) ---
  if (active && active.status !== 'completed') {
    const meta = TASK_TYPE_META[active.type];
    const Icon = meta.icon;
    return (
      <div className="px-5 py-4 space-y-3 animate-in slide-in-from-right-4 duration-300">
        <button onClick={() => setSelectedTask(null)} className="text-xs text-[#0069D9] font-bold flex items-center"><ChevronRight className="w-3 h-3 rotate-180 mr-1"/>Kembali</button>
        
        {/* Anti-Collusion Badges */}
        <div className="flex flex-wrap gap-1.5">
          <div className="flex items-center bg-purple-50 text-purple-700 text-[8px] font-bold px-2 py-1 rounded-full border border-purple-200">
            <Shuffle className="w-2.5 h-2.5 mr-1"/>RANDOM ASSIGN
          </div>
          <div className="flex items-center bg-blue-50 text-[#0069D9] text-[8px] font-bold px-2 py-1 rounded-full border border-blue-200">
            <MapPin className="w-2.5 h-2.5 mr-1"/>{active.verifierRegions.length} KECAMATAN
          </div>
          <div className="flex items-center bg-slate-100 text-slate-600 text-[8px] font-bold px-2 py-1 rounded-full border border-slate-200">
            <Lock className="w-2.5 h-2.5 mr-1"/>ANONIM
          </div>
          <div className="flex items-center bg-amber-50 text-[#DFA000] text-[8px] font-bold px-2 py-1 rounded-full border border-amber-200">
            <ImageIcon className="w-2.5 h-2.5 mr-1"/>MIN {active.photoMin} FOTO
          </div>
        </div>

        {/* Map area */}
        <div className="relative h-28 bg-[#E8F1FA] rounded-2xl overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-40" fill="currentColor">
            <path d="M0 80 Q100 50 200 100 T400 80 V200 H0 Z" fill="rgba(0,105,217,0.05)" />
            <path d="M80 0 L100 200 M0 80 L400 120 M250 0 L280 200" stroke="rgba(255,255,255,0.8)" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-white px-3 py-1 rounded-lg shadow-md mb-1 text-[9px] font-bold text-[#0D1B3E] max-w-[180px] text-center truncate">{active.title}</div>
            <div className="relative flex items-center justify-center">
              <span className="absolute w-6 h-6 bg-[#DFA000] rounded-full animate-ping opacity-50"></span>
              <MapPin className="relative h-6 w-6 text-[#0069D9] drop-shadow-lg z-10" fill="#fff" />
            </div>
          </div>
          {active.anomalyLevel && (
            <div className="absolute top-2 right-2 bg-[#C0392B] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center">
              <AlertTriangle className="w-2.5 h-2.5 mr-0.5"/>{active.anomalyLevel}
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded text-[9px] font-medium text-slate-600">{active.distance} dari Anda</div>
        </div>

        {/* Task Info Card */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-7 h-7 ${meta.bg} ${meta.color} rounded-lg flex items-center justify-center`}><Icon className="w-4 h-4" /></div>
              <div>
                <span className={`text-[8px] font-bold uppercase tracking-wider ${meta.color}`}>{meta.label}</span>
                <h3 className="font-bold text-[#0D1B3E] text-[11px] leading-tight">{active.title}</h3>
              </div>
            </div>
            <div className="bg-[#DFA000] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">Rp {active.reward.toLocaleString('id-ID')}</div>
          </div>

          <div className="space-y-1 text-[10px] mb-2">
            <div className="flex justify-between text-slate-500"><span>Nilai Proyek:</span><span className="font-bold text-[#0D1B3E]">{active.projectValue}</span></div>
            <div className="flex justify-between text-slate-500"><span>Konsensus:</span><ConsensusIndicator done={active.consensus.done} total={active.consensus.total} /></div>
            <div className="flex justify-between text-slate-500"><span>Verifier dari:</span><span className="font-medium text-[#0069D9]">{active.verifierRegions.length} kecamatan berbeda</span></div>
          </div>

          {/* Staking Notice */}
          <div className="bg-amber-50 rounded-lg p-2 border border-amber-100 mb-2 flex items-start space-x-2">
            <Coins className="w-3.5 h-3.5 text-[#DFA000] shrink-0 mt-0.5" />
            <div>
              <p className="text-[9px] font-bold text-[#0D1B3E]">Deposit Stake: Rp {active.stakeAmount.toLocaleString('id-ID')}</p>
              <p className="text-[8px] text-slate-500">Dikembalikan + reward jika jujur. Hangus jika curang.</p>
            </div>
          </div>

          {/* Structured Checklist */}
          <div className="bg-slate-50 rounded-lg p-2.5 mb-2 border border-slate-100">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">📋 CHECKLIST VERIFIKASI:</p>
            <div className="space-y-1.5">
              {[
                { q: "Proyek TERLIHAT di lokasi?", type: "yesno" },
                { q: "Estimasi progress (%)", type: "percent" },
                { q: "Ada KERUSAKAN terlihat?", type: "yesno" },
                { q: "PAPAN PROYEK ada?", type: "yesno" },
                { q: "Ada PEKERJA di lokasi?", type: "yesno" },
                { q: "Rating kualitas (1-5)", type: "rating" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded px-2 py-1.5 border border-slate-100">
                  <span className="text-[9px] text-slate-700 font-medium flex-1">{item.q}</span>
                  {item.type === 'yesno' && (
                    <div className="flex space-x-1 shrink-0">
                      <button className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-[#27AE60] border border-green-200">YA</button>
                      <button className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-[#C0392B] border border-red-200">TIDAK</button>
                    </div>
                  )}
                  {item.type === 'percent' && (
                    <div className="flex items-center space-x-0.5 shrink-0">
                      <input type="number" placeholder="0" className="w-8 text-center text-[9px] font-bold border border-slate-200 rounded py-0.5" readOnly />
                      <span className="text-[9px] text-slate-500 font-bold">%</span>
                    </div>
                  )}
                  {item.type === 'rating' && (
                    <div className="flex space-x-0.5 shrink-0">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-slate-300 cursor-pointer hover:text-[#DFA000]" />)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Photo Requirements */}
          <div className="bg-blue-50 rounded-lg p-2.5 mb-2 border border-blue-100">
            <p className="text-[9px] font-bold text-[#0069D9] uppercase tracking-wider mb-1">📸 FOTO WAJIB (min {active.photoMin}):</p>
            <div className="space-y-1 text-[9px] text-slate-600">
              <div className="flex items-center"><CheckCircle2 className="w-2.5 h-2.5 text-[#27AE60] mr-1 shrink-0"/>Dari kamera langsung (bukan galeri)</div>
              <div className="flex items-center"><CheckCircle2 className="w-2.5 h-2.5 text-[#27AE60] mr-1 shrink-0"/>GPS & timestamp auto-embed EXIF</div>
              <div className="flex items-center"><CheckCircle2 className="w-2.5 h-2.5 text-[#27AE60] mr-1 shrink-0"/>Sudut berbeda (AI angle check)</div>
              <div className="flex items-center"><ShieldAlert className="w-2.5 h-2.5 text-[#C0392B] mr-1 shrink-0"/>Foto duplikat = auto-suspend!</div>
            </div>
          </div>

          {active.status === 'pending_consensus' ? (
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-2.5 text-center">
              <Clock className="w-4 h-4 text-orange-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-orange-700">Menunggu Konsensus...</p>
              <p className="text-[8px] text-orange-500 mt-0.5">Butuh {active.consensus.total - active.consensus.done} warga lagi dari kecamatan berbeda</p>
              <div className="flex justify-center mt-1.5"><ConsensusIndicator done={active.consensus.done} total={active.consensus.total} /></div>
              {active.consensus.done >= 2 && (
                <div className="mt-1.5 bg-amber-50 border border-amber-200 rounded p-1.5">
                  <p className="text-[8px] font-bold text-amber-700">⚠️ AI Outlier Detection Active</p>
                  <p className="text-[7px] text-amber-600">Deviasi laporan antar warga sedang dianalisis</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center space-x-1.5 py-2 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 text-xs active:scale-95">
                  <Camera className="w-4 h-4" /><span>Kamera</span>
                </button>
                <button className="flex items-center justify-center space-x-1.5 py-2 bg-[#0D1B3E] text-white rounded-xl font-semibold shadow-sm text-xs active:scale-95">
                  <Upload className="w-4 h-4" /><span>Upload</span>
                </button>
              </div>
              <p className="text-[7px] text-center text-slate-400">🔒 AI verifikasi: pHash duplikat, EXIF forensics, GPS match, angle diversity</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- TASK LIST VIEW ---
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

      {/* Anti-Collusion notice */}
      <div className="bg-purple-50 rounded-xl p-2.5 border border-purple-100 flex items-start space-x-2">
        <Shuffle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-bold text-purple-800">Penugasan Acak Anti-Kolusi</p>
          <p className="text-[8px] text-purple-600">Task di-assign random dari kecamatan berbeda. Identitas antar verifier dirahasiakan.</p>
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
              className={`bg-white p-3 rounded-2xl border shadow-sm transition-all active:scale-[0.98] ${
                task.status === 'completed' ? 'border-green-100 opacity-70' :
                task.status === 'pending_consensus' ? 'border-orange-200 cursor-pointer' :
                'border-slate-100 cursor-pointer hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-9 h-9 ${meta.bg} ${meta.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${meta.color}`}>{meta.label}</span>
                    <span className={`text-[8px] font-bold ${stMeta.color} ${stMeta.bg} px-1.5 py-0.5 rounded-full`}>{stMeta.label}</span>
                  </div>
                  <h5 className="font-bold text-[#0D1B3E] text-xs leading-tight mb-1">{task.title}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400 flex items-center"><MapPin className="w-2.5 h-2.5 mr-0.5"/>{task.distance}</span>
                      {task.status !== 'completed' && <span className="text-[10px] text-slate-400 flex items-center"><Clock className="w-2.5 h-2.5 mr-0.5"/>{task.deadline}</span>}
                    </div>
                    <span className="text-xs font-bold text-[#DFA000]">Rp {task.reward.toLocaleString('id-ID')}</span>
                  </div>
                  {/* Consensus + Anti-collusion info */}
                  <div className="mt-1.5 flex items-center justify-between">
                    <ConsensusIndicator done={task.consensus.done} total={task.consensus.total} />
                    <div className="flex items-center space-x-1">
                      <span className="text-[7px] text-purple-500 font-bold bg-purple-50 px-1 py-0.5 rounded">{task.verifierRegions.length} kec.</span>
                      {task.status !== 'completed' && <ChevronRight className="w-4 h-4 text-slate-300" />}
                      {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#27AE60]" />}
                    </div>
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
        <div className="absolute top-[60%] left-[40%]">
          <div className="w-4 h-4 bg-[#0069D9] rounded-full border-3 border-white shadow-lg"></div>
          <span className="text-[8px] text-[#0069D9] font-bold mt-0.5 block">Anda</span>
        </div>
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
      <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1a2f5e] rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <p className="text-xs text-white/60 font-medium mb-1">Saldo Reward</p>
        <p className="text-3xl font-black tracking-tight mb-3">Rp 45.000</p>
        <div className="flex items-center space-x-4 text-[10px]">
          <div><span className="text-white/50">Total diterima:</span> <span className="font-bold text-[#DFA000]">Rp {totalEarned.toLocaleString('id-ID')}</span></div>
          <div><span className="text-white/50">Bulan ini:</span> <span className="font-bold text-[#27AE60]">+Rp 35.000</span></div>
        </div>
        <button className="mt-4 w-full py-2.5 bg-[#DFA000] text-[#0D1B3E] rounded-xl text-xs font-bold">Tarik ke e-Wallet / Bank</button>
      </div>

      {/* Stake Balance */}
      <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-[#DFA000]" />
          <div>
            <p className="text-[10px] font-bold text-[#0D1B3E]">Deposit Stake Aktif</p>
            <p className="text-[8px] text-slate-500">2 task in-progress</p>
          </div>
        </div>
        <span className="text-sm font-black text-[#DFA000]">Rp 20.000</span>
      </div>

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
  const reputationScore = 78;
  return (
    <div className="px-5 py-4 space-y-3">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
        <div className="w-14 h-14 bg-[#0D1B3E] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2 ring-4 ring-[#DFA000]/20">A</div>
        <h3 className="font-bold text-[#0D1B3E] text-base">Andi Pratama</h3>
        <p className="text-[10px] text-slate-500 mb-1">Citizen Miner sejak Feb 2026</p>
        <div className="flex items-center justify-center space-x-1">
          <Star className="w-3 h-3 text-[#DFA000]" fill="#DFA000" />
          <Star className="w-3 h-3 text-[#DFA000]" fill="#DFA000" />
          <Star className="w-3 h-3 text-slate-300" fill="#E2E8F0" />
          <span className="text-[10px] font-bold text-[#DFA000] ml-1">Level 2 — Terlatih</span>
        </div>
      </div>

      {/* Reputation Score */}
      <div className="bg-white rounded-xl p-3 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#0D1B3E] uppercase tracking-wider">🛡️ Reputation Score</span>
          <span className={`text-lg font-black ${reputationScore >= 60 ? 'text-[#27AE60]' : reputationScore >= 30 ? 'text-[#DFA000]' : 'text-[#C0392B]'}`}>{reputationScore}/100</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
          <div className="h-full bg-gradient-to-r from-[#27AE60] to-[#27AE60]/70 rounded-full" style={{ width: `${reputationScore}%` }}></div>
        </div>
        <div className="flex justify-between text-[8px] text-slate-400">
          <span>0 — Suspended</span>
          <span>30 — Probation</span>
          <span>60 — Verified ✓</span>
          <span>80 — Trusted ★</span>
        </div>
        <div className="mt-2 bg-green-50 rounded-lg p-2 border border-green-100">
          <p className="text-[9px] font-bold text-[#27AE60]">✅ Status: Verified Citizen</p>
          <p className="text-[8px] text-slate-500">Akses proyek menengah, reward standar</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-center">
          <p className="text-lg font-black text-[#0D1B3E]">27</p>
          <p className="text-[8px] text-slate-500 font-medium">Tasks Selesai</p>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-center">
          <p className="text-lg font-black text-[#27AE60]">92%</p>
          <p className="text-[8px] text-slate-500 font-medium">Akurasi</p>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-center">
          <p className="text-lg font-black text-[#DFA000]">Rp 405K</p>
          <p className="text-[8px] text-slate-500 font-medium">Total Earned</p>
        </div>
        <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-center">
          <p className="text-lg font-black text-purple-600">0</p>
          <p className="text-[8px] text-slate-500 font-medium">Pelanggaran</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-xl p-3 border border-slate-100">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold text-[#0D1B3E]">Progress ke Level 3 (Ahli)</span>
          <span className="text-[9px] text-slate-500">27/50 tasks</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#DFA000] to-[#DFA000]/70 rounded-full" style={{ width: '54%' }}></div>
        </div>
        <p className="text-[8px] text-slate-400 mt-1">Selesaikan 23 tasks lagi untuk unlock &quot;Progress Report&quot; tasks</p>
      </div>

      {/* KTP + Anti-Fraud Status */}
      <div className="bg-green-50 rounded-xl p-2.5 border border-green-100 flex items-center space-x-3">
        <Shield className="w-5 h-5 text-[#27AE60] shrink-0" />
        <div>
          <p className="text-[10px] font-bold text-[#0D1B3E]">KTP Terverifikasi ✓</p>
          <p className="text-[8px] text-slate-500">NIK: ****-****-3847</p>
        </div>
      </div>

      {/* Anti-Collusion Warnings */}
      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">⚖️ Kebijakan Anti-Kolusi:</p>
        <div className="space-y-1 text-[8px] text-slate-500">
          <div className="flex items-start"><span className="mr-1">•</span>Foto duplikat antar warga = suspend 30 hari</div>
          <div className="flex items-start"><span className="mr-1">•</span>GPS mismatch berulang = reputation -15</div>
          <div className="flex items-start"><span className="mr-1">•</span>Foto dari internet = permanent ban</div>
          <div className="flex items-start"><span className="mr-1">•</span>5% tasks adalah honeypot (jebakan AI)</div>
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

      {/* Decorative sidebar text */}
      <div className="w-80 p-4 hidden xl:block">
        <h2 className="text-3xl font-extrabold text-[#0D1B3E] mb-4">Citizen Mining PWA</h2>
        <p className="text-slate-500 leading-relaxed mb-6 font-medium">Ubah pengawasan pemerintah menjadi <strong>micro-tasks</strong> masal dengan <strong>anti-kolusi berlapis</strong>.</p>
        
        {/* Anti-Collusion Layers */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-xs font-bold text-[#0D1B3E] bg-white px-3 py-2.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mr-2.5"><Shuffle className="w-3.5 h-3.5"/></div>
            Random Assignment
          </div>
          <div className="flex items-center text-xs font-bold text-[#0D1B3E] bg-white px-3 py-2.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0069D9] flex items-center justify-center mr-2.5"><MapPin className="w-3.5 h-3.5"/></div>
            Geographic Separation
          </div>
          <div className="flex items-center text-xs font-bold text-[#0D1B3E] bg-white px-3 py-2.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-[#DFA000] flex items-center justify-center mr-2.5"><ImageIcon className="w-3.5 h-3.5"/></div>
            AI Photo Forensics
          </div>
          <div className="flex items-center text-xs font-bold text-[#0D1B3E] bg-white px-3 py-2.5 rounded-xl shadow-sm border border-slate-100">
            <div className="w-7 h-7 rounded-full bg-green-50 text-[#27AE60] flex items-center justify-center mr-2.5"><Shield className="w-3.5 h-3.5"/></div>
            Reputation Score
          </div>
        </div>

        {/* Anti-Collusion flow */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">🛡️ Anti-Kolusi Pipeline:</p>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center"><div className="w-6 h-6 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">1</div>Random assign dari kecamatan berbeda</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-blue-50 text-[#0069D9] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">2</div>Warga isi checklist + foto wajib</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-amber-50 text-[#DFA000] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">3</div>AI: pHash, EXIF, GPS, outlier detect</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-green-50 text-[#27AE60] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">4</div>Konsensus 3-11 warga → DLT</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-[#C0392B]/10 text-[#C0392B] rounded-full flex items-center justify-center mr-2 text-[10px] font-bold">5</div>Curang? Stake hangus + suspend</div>
          </div>
        </div>
      </div>
    </div>
  );
}
