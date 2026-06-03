'use client'

import { useState } from "react";
import { MapPin, Camera, Upload, CheckCircle2, User, Gift, Target, Coins, Star, Shield, Clock, ChevronRight, TrendingUp, AlertTriangle, FileText, Lock, ShieldAlert, ImageIcon, Shuffle, ShieldCheck } from "lucide-react";

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
  existence: { label: "Existence Verify", icon: Camera, color: "text-blue-400", bg: "bg-blue-500/10" },
  quality: { label: "Quality Check", icon: FileText, color: "text-gold-400", bg: "bg-gold-500/10" },
  progress: { label: "Progress Report", icon: TrendingUp, color: "text-brand-400", bg: "bg-brand-500/10" },
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

// --- Consensus Indicator ---
function ConsensusIndicator({ done, total }: { done: number; total: number }) {
  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-black border ${
          i < done ? 'bg-brand-500 border-brand-500 text-[#022c22]' : 'bg-white/5 border-white/15 text-slate-600'
        }`}>
          {i < done ? '✓' : '○'}
        </div>
      ))}
      <span className="text-[10px] text-slate-400 font-bold ml-1 font-data">{done}/{total}</span>
    </div>
  );
}

// --- Level Badge ---
function LevelBadge() {
  return (
    <div className="flex items-center bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
      <Star className="w-3 h-3 text-gold-400 mr-1" fill="currentColor" />
      <span className="text-[10px] font-bold text-gold-400">Lv.2 Terlatih</span>
    </div>
  );
}

// --- Tab: Tugas ---
function TabTugas() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cameraCaptured, setCameraCaptured] = useState(false);

  const active = TASKS.find(t => t.id === selectedTask);

  const statusMeta: Record<TaskStatus, { label: string; color: string; bg: string }> = {
    available: { label: "TERSEDIA", color: "text-blue-400", bg: "bg-blue-500/10" },
    in_progress: { label: "DALAM PROSES", color: "text-gold-400", bg: "bg-gold-500/10" },
    pending_consensus: { label: "MENUNGGU KONSENSUS", color: "text-orange-400", bg: "bg-orange-500/10" },
    completed: { label: "SELESAI", color: "text-brand-400", bg: "bg-brand-500/10" },
  };

  const handleCapture = () => {
    if (offlineMode) {
      const hash = `SHA256-${Math.random().toString(16).substring(2, 10).toUpperCase()}`;
      setOfflineQueue([...offlineQueue, hash]);
      alert("⚠️ Sinyal lemah! Laporan disimpan lokal di SQLite (stempel waktu & GPS dikunci).");
    } else {
      setCameraCaptured(true);
      alert("Foto berhasil diambil! Metadata GPS & Timestamp tersemat otomatis.");
    }
  };

  // --- TASK DETAIL VIEW ---
  if (active && active.status !== 'completed') {
    const meta = TASK_TYPE_META[active.type];
    const Icon = meta.icon;
    return (
      <div className="px-5 py-4 space-y-3 animate-slide-in-right">
        <button onClick={() => { setSelectedTask(null); setCameraCaptured(false); }} className="text-xs text-brand-400 font-bold flex items-center"><ChevronRight className="w-3 h-3 rotate-180 mr-1" />Kembali</button>

        {/* Offline Mode Toggle */}
        <div className="flex justify-between items-center bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.06]">
          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${offlineMode ? 'bg-orange-400' : 'bg-brand-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${offlineMode ? 'bg-orange-500' : 'bg-brand-500'}`}></span>
            </span>
            <span className="text-[10px] font-bold text-slate-200">Simulasi Sinyal Lemah (Offline)</span>
          </div>
          <button
            onClick={() => setOfflineMode(!offlineMode)}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${offlineMode ? 'bg-orange-500' : 'bg-white/15'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${offlineMode ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Anti-Collusion Badges */}
        <div className="flex flex-wrap gap-1.5">
          <div className="flex items-center bg-purple-500/10 text-purple-300 text-[8px] font-bold px-2 py-1 rounded-full border border-purple-500/20">
            <Shuffle className="w-2.5 h-2.5 mr-1" />RANDOM ASSIGN
          </div>
          <div className="flex items-center bg-blue-500/10 text-blue-400 text-[8px] font-bold px-2 py-1 rounded-full border border-blue-500/20">
            <MapPin className="w-2.5 h-2.5 mr-1" />{active.verifierRegions.length} KECAMATAN
          </div>
          <div className="flex items-center bg-white/5 text-slate-300 text-[8px] font-bold px-2 py-1 rounded-full border border-white/10">
            <Lock className="w-2.5 h-2.5 mr-1" />ANONIM
          </div>
          <div className="flex items-center bg-gold-500/10 text-gold-400 text-[8px] font-bold px-2 py-1 rounded-full border border-gold-500/20">
            <ImageIcon className="w-2.5 h-2.5 mr-1" />MIN {active.photoMin} FOTO
          </div>
        </div>

        {/* Map area */}
        <div className="relative h-28 bg-base rounded-2xl overflow-hidden border border-white/[0.06]">
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-30" fill="currentColor">
            <path d="M0 80 Q100 50 200 100 T400 80 V200 H0 Z" fill="rgba(16,185,129,0.08)" />
            <path d="M80 0 L100 200 M0 80 L400 120 M250 0 L280 200" stroke="rgba(148,163,184,0.3)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-surface px-3 py-1 rounded-lg shadow-lg mb-1 text-[9px] font-bold text-slate-100 max-w-[180px] text-center truncate border border-white/10">{active.title}</div>
            <div className="relative flex items-center justify-center">
              <span className="absolute w-6 h-6 bg-gold-500 rounded-full animate-ping opacity-40"></span>
              <MapPin className="relative h-6 w-6 text-brand-400 drop-shadow-lg z-10" fill="#0B1120" />
            </div>
          </div>
          {active.anomalyLevel && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center">
              <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />{active.anomalyLevel}
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-surface/90 px-2 py-0.5 rounded text-[9px] font-medium text-slate-300 border border-white/10">{active.distance} dari Anda</div>
        </div>

        {/* Task Info Card */}
        <div className="bg-surface rounded-2xl p-3 border border-white/[0.06]">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-7 h-7 ${meta.bg} ${meta.color} rounded-lg flex items-center justify-center`}><Icon className="w-4 h-4" /></div>
              <div>
                <span className={`text-[8px] font-bold uppercase tracking-wider ${meta.color}`}>{meta.label}</span>
                <h3 className="font-bold text-slate-100 text-[11px] leading-tight">{active.title}</h3>
              </div>
            </div>
            <div className="bg-gold-500 text-[#0B1120] px-2 py-0.5 rounded-full text-[10px] font-bold font-data">Rp {active.reward.toLocaleString('id-ID')}</div>
          </div>

          <div className="space-y-1 text-[10px] mb-2">
            <div className="flex justify-between text-slate-500"><span>Nilai Proyek:</span><span className="font-bold text-slate-200 font-data">{active.projectValue}</span></div>
            <div className="flex justify-between text-slate-500"><span>Konsensus:</span><ConsensusIndicator done={active.consensus.done} total={active.consensus.total} /></div>
            <div className="flex justify-between text-slate-500"><span>Verifier dari:</span><span className="font-medium text-blue-400">{active.verifierRegions.length} kecamatan</span></div>
          </div>

          {/* Staking Notice */}
          <div className="bg-gold-500/10 rounded-lg p-2 border border-gold-500/20 mb-2 flex items-start space-x-2">
            <Coins className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[9px] font-bold text-slate-100">Deposit Stake: Rp {active.stakeAmount.toLocaleString('id-ID')}</p>
              <p className="text-[8px] text-slate-500">Dikembalikan + reward jika jujur. Hangus jika curang.</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white/[0.03] rounded-lg p-2.5 mb-2 border border-white/[0.06]">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">📋 Checklist Verifikasi:</p>
            <div className="space-y-1.5">
              {[
                { q: "Proyek TERLIHAT di lokasi?", type: "yesno" },
                { q: "Estimasi progress (%)", type: "percent" },
                { q: "Ada KERUSAKAN terlihat?", type: "yesno" },
                { q: "PAPAN PROYEK ada?", type: "yesno" },
                { q: "Ada PEKERJA di lokasi?", type: "yesno" },
                { q: "Rating kualitas (1-5)", type: "rating" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.03] rounded px-2 py-1.5 border border-white/[0.06]">
                  <span className="text-[9px] text-slate-300 font-medium flex-1">{item.q}</span>
                  {item.type === 'yesno' && (
                    <div className="flex space-x-1 shrink-0">
                      <button className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">YA</button>
                      <button className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">TIDAK</button>
                    </div>
                  )}
                  {item.type === 'percent' && (
                    <div className="flex items-center space-x-0.5 shrink-0">
                      <input type="number" placeholder="0" className="w-8 text-center text-[9px] font-bold bg-white/5 border border-white/10 rounded py-0.5 text-slate-200" readOnly />
                      <span className="text-[9px] text-slate-500 font-bold">%</span>
                    </div>
                  )}
                  {item.type === 'rating' && (
                    <div className="flex space-x-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-slate-600 cursor-pointer hover:text-gold-400" />)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Photo Requirements */}
          <div className="bg-blue-500/[0.07] rounded-lg p-2.5 mb-2 border border-blue-500/15">
            <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wider mb-1">📸 Foto Wajib (min {active.photoMin}):</p>
            <div className="space-y-1 text-[9px] text-slate-400">
              <div className="flex items-center"><CheckCircle2 className="w-2.5 h-2.5 text-brand-400 mr-1 shrink-0" />Dari kamera langsung (bukan galeri)</div>
              <div className="flex items-center"><CheckCircle2 className="w-2.5 h-2.5 text-brand-400 mr-1 shrink-0" />GPS & timestamp auto-embed EXIF</div>
              <div className="flex items-center"><CheckCircle2 className="w-2.5 h-2.5 text-brand-400 mr-1 shrink-0" />Sudut berbeda (AI angle check)</div>
              <div className="flex items-center"><ShieldAlert className="w-2.5 h-2.5 text-red-400 mr-1 shrink-0" />Foto duplikat = auto-suspend!</div>
            </div>
          </div>

          {active.status === 'pending_consensus' ? (
            <div className="bg-orange-500/[0.07] border border-orange-500/15 rounded-lg p-2.5 text-center">
              <Clock className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-orange-300">Menunggu Konsensus...</p>
              <p className="text-[8px] text-orange-400/80 mt-0.5">Butuh {active.consensus.total - active.consensus.done} warga lagi dari kecamatan berbeda</p>
              <div className="flex justify-center mt-1.5"><ConsensusIndicator done={active.consensus.done} total={active.consensus.total} /></div>
              {active.consensus.done >= 2 && (
                <div className="mt-1.5 bg-gold-500/10 border border-gold-500/20 rounded p-1.5">
                  <p className="text-[8px] font-bold text-gold-400">⚠️ AI Outlier Detection Active</p>
                  <p className="text-[7px] text-gold-400/70">Deviasi laporan antar warga sedang dianalisis</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              {offlineQueue.length > 0 && (
                <div className="bg-orange-500/[0.07] border border-orange-500/20 rounded-xl p-2.5 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-orange-300 font-data">SQLite Queue: {offlineQueue.length} Foto</span>
                    <button
                      onClick={() => {
                        setIsSyncing(true);
                        setTimeout(() => {
                          setIsSyncing(false);
                          setOfflineQueue([]);
                          setCameraCaptured(true);
                          alert("Berhasil sinkronisasi! Hash gambar diunggah ke Hyperledger Fabric.");
                        }, 1500);
                      }}
                      disabled={isSyncing}
                      className="text-[8px] font-black bg-brand-500 text-[#022c22] px-2 py-1 rounded hover:bg-brand-400 transition-colors"
                    >
                      {isSyncing ? 'Sinkron...' : 'Sync ke DLT'}
                    </button>
                  </div>
                  <p className="text-[7px] text-orange-400/80 leading-tight">Sinyal kembali. Ketuk sync untuk mengunggah stempel waktu & GPS dari SQLite lokal.</p>
                </div>
              )}

              {cameraCaptured && (
                <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-2 text-center text-[9px] font-bold text-brand-400">
                  ✓ Foto Terverifikasi AI & Siap Dikirim!
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCapture}
                  className="flex items-center justify-center space-x-1.5 py-2 border border-white/10 bg-white/5 rounded-xl font-semibold text-slate-200 text-xs active:scale-95 hover:bg-white/10 transition-colors"
                >
                  <Camera className="w-4 h-4" /><span>{offlineMode ? "Simpan Offline" : "Kamera"}</span>
                </button>
                <button
                  onClick={() => alert("Kirim laporan ke consensus pool warga...")}
                  disabled={!cameraCaptured && offlineQueue.length === 0}
                  className={`flex items-center justify-center space-x-1.5 py-2 rounded-xl font-semibold text-xs active:scale-95 transition-all ${
                    cameraCaptured ? 'bg-brand-500 text-[#022c22]' : 'bg-white/5 text-slate-500 border border-white/10 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <Upload className="w-4 h-4" /><span>Kirim</span>
                </button>
              </div>
              <p className="text-[7px] text-center text-slate-600">🔒 AI: pHash duplikat, EXIF forensics, GPS match, angle diversity</p>
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
        <div className="bg-blue-500/10 rounded-xl p-2.5 text-center border border-blue-500/15">
          <p className="text-lg font-black text-blue-400 font-data">{TASKS.filter(t => t.status === 'available').length}</p>
          <p className="text-[9px] text-slate-400 font-bold">Tersedia</p>
        </div>
        <div className="bg-gold-500/10 rounded-xl p-2.5 text-center border border-gold-500/15">
          <p className="text-lg font-black text-gold-400 font-data">{TASKS.filter(t => t.status === 'in_progress' || t.status === 'pending_consensus').length}</p>
          <p className="text-[9px] text-slate-400 font-bold">Proses</p>
        </div>
        <div className="bg-brand-500/10 rounded-xl p-2.5 text-center border border-brand-500/15">
          <p className="text-lg font-black text-brand-400 font-data">{TASKS.filter(t => t.status === 'completed').length}</p>
          <p className="text-[9px] text-slate-400 font-bold">Selesai</p>
        </div>
      </div>

      {/* Anti-Collusion notice */}
      <div className="bg-purple-500/[0.07] rounded-xl p-2.5 border border-purple-500/15 flex items-start space-x-2">
        <Shuffle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-bold text-purple-300">Penugasan Acak Anti-Kolusi</p>
          <p className="text-[8px] text-purple-400/80">Task di-assign random dari kecamatan berbeda. Identitas antar verifier dirahasiakan.</p>
        </div>
      </div>

      {/* Task List */}
      <h4 className="font-bold text-slate-100 text-sm flex items-center justify-between">
        <span>📋 Tugas Mining</span>
        <span className="text-[10px] text-slate-500 font-medium">{TASKS.length} tugas</span>
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
              className={`bg-surface p-3 rounded-2xl border transition-all active:scale-[0.98] ${
                task.status === 'completed' ? 'border-brand-500/15 opacity-60' :
                task.status === 'pending_consensus' ? 'border-orange-500/25 cursor-pointer' :
                'border-white/[0.06] cursor-pointer hover:-translate-y-0.5 hover:border-brand-500/30'
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
                  <h5 className="font-bold text-slate-100 text-xs leading-tight mb-1">{task.title}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-500 flex items-center"><MapPin className="w-2.5 h-2.5 mr-0.5" />{task.distance}</span>
                      {task.status !== 'completed' && <span className="text-[10px] text-slate-500 flex items-center"><Clock className="w-2.5 h-2.5 mr-0.5" />{task.deadline}</span>}
                    </div>
                    <span className="text-xs font-bold text-gold-400 font-data">Rp {task.reward.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <ConsensusIndicator done={task.consensus.done} total={task.consensus.total} />
                    <div className="flex items-center space-x-1">
                      <span className="text-[7px] text-purple-300 font-bold bg-purple-500/10 px-1 py-0.5 rounded">{task.verifierRegions.length} kec.</span>
                      {task.status !== 'completed' && <ChevronRight className="w-4 h-4 text-slate-600" />}
                      {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-brand-400" />}
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
      <div className="relative h-80 bg-base rounded-2xl overflow-hidden border border-white/[0.06]">
        <svg viewBox="0 0 400 350" className="w-full h-full opacity-40 text-slate-600" fill="currentColor">
          <path d="M0 100 Q100 50 200 150 T400 100 V350 H0 Z" fill="rgba(16,185,129,0.06)" />
          <path d="M0 180 Q80 200 150 140 T300 220 T400 170 V350 H0 Z" fill="rgba(59,130,246,0.05)" />
          <path d="M80 0 L100 350 M200 0 L220 350 M320 0 L340 350 M0 80 L400 100 M0 200 L400 240" stroke="rgba(148,163,184,0.2)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="absolute top-[30%] left-[25%]">
          <div className="relative flex flex-col items-center">
            <span className="absolute w-6 h-6 bg-red-500 rounded-full animate-ping opacity-40"></span>
            <MapPin className="relative h-7 w-7 text-red-400 drop-shadow-lg z-10" fill="#0B1120" />
            <span className="bg-surface text-[8px] font-bold text-slate-100 px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-white/10">Aspal +44%</span>
          </div>
        </div>
        <div className="absolute top-[50%] left-[55%]">
          <div className="relative flex flex-col items-center">
            <MapPin className="relative h-6 w-6 text-gold-400 drop-shadow z-10" fill="#0B1120" />
            <span className="bg-surface text-[8px] font-bold text-slate-100 px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-white/10">Jembatan</span>
          </div>
        </div>
        <div className="absolute top-[40%] left-[75%]">
          <div className="relative flex flex-col items-center">
            <MapPin className="relative h-6 w-6 text-brand-400 drop-shadow z-10" fill="#0B1120" />
            <span className="bg-surface text-[8px] font-bold text-slate-100 px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap border border-white/10">SDN 03</span>
          </div>
        </div>
        <div className="absolute top-[60%] left-[40%]">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-base shadow-lg"></div>
          <span className="text-[8px] text-blue-400 font-bold mt-0.5 block">Anda</span>
        </div>
        <div className="absolute bottom-3 left-3 glass-panel p-2 rounded-lg text-[9px] text-slate-300">
          <div className="flex items-center space-x-2 mb-1"><div className="w-2 h-2 rounded-full bg-red-500" /><span>Anomali</span></div>
          <div className="flex items-center space-x-2 mb-1"><div className="w-2 h-2 rounded-full bg-gold-500" /><span>Proses</span></div>
          <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-brand-500" /><span>Normal</span></div>
        </div>
        <button className="absolute bottom-3 right-3 w-9 h-9 glass-panel rounded-full flex items-center justify-center text-slate-300"><Target className="w-4 h-4" /></button>
      </div>
      <p className="text-center text-[10px] text-slate-500">📍 3 proyek ditemukan dalam radius 5 km dari Anda</p>
    </div>
  );
}

// --- Tab: Reward ---
function TabReward() {
  const [points, setPoints] = useState(45000);
  const [history, setHistory] = useState(REWARD_HISTORY);
  const [showPbbModal, setShowPbbModal] = useState(false);
  const [pbbPaid, setPbbPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalEarned = history.filter(r => r.status === 'success' && r.amount > 0).reduce((s, r) => s + r.amount, 0);

  const handlePayPbb = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPoints(0);
      setPbbPaid(true);
      setIsProcessing(false);
      setShowPbbModal(false);
      setHistory([
        { id: 99, title: "Potongan Pajak PBB BPD Jateng", date: "Hari Ini", amount: -45000, status: "success" },
        ...history
      ]);
    }, 1500);
  };

  return (
    <div className="px-5 py-4 space-y-4 relative">
      <div className="rounded-2xl p-5 text-white relative overflow-hidden border border-brand-500/20" style={{ background: 'linear-gradient(135deg, #059669 0%, #0B1120 70%)' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <p className="text-xs text-white/70 font-medium mb-1">Saldo Reward</p>
        <p className="text-3xl font-black tracking-tight mb-3 font-data">Rp {points.toLocaleString('id-ID')}</p>
        <div className="flex items-center space-x-4 text-[10px]">
          <div><span className="text-white/50">Total diterima:</span> <span className="font-bold text-gold-400 font-data">Rp {totalEarned.toLocaleString('id-ID')}</span></div>
          <div><span className="text-white/50">Bulan ini:</span> <span className="font-bold text-brand-400 font-data">+Rp 35.000</span></div>
        </div>
        <button onClick={() => alert("Tarik saldo ke LinkAja / DANA / QRIS...")} className="mt-4 w-full py-2.5 bg-gold-500 text-[#0B1120] rounded-xl text-xs font-bold active:scale-95 transition-transform">Tarik ke e-Wallet / Bank</button>
      </div>

      {/* BPD Tax integration */}
      <div className="bg-surface rounded-2xl p-4 border border-white/[0.06] space-y-3">
        <div className="flex items-center space-x-2 text-slate-100">
          <Shield className="w-5 h-5 text-blue-400" />
          <h4 className="font-bold text-xs">PBB / Pajak Daerah via BPD Jateng</h4>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">Gunakan Loyalty Points untuk langsung mengurangi kewajiban Pajak Bumi & Bangunan (PBB) via Bank Pembangunan Daerah.</p>

        {pbbPaid ? (
          <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-2.5 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-brand-400" />
            <div>
              <p className="text-[10px] font-bold text-brand-300">Pembayaran Sukses</p>
              <p className="text-[8px] text-slate-400">Potongan Rp45.000 diaplikasikan ke NOP Pajak Anda.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] space-y-2">
            <div className="flex justify-between text-[10px]"><span className="text-slate-500 font-medium">NOP Pajak Anda:</span><span className="font-bold text-slate-200 font-data">32.04.120.003...</span></div>
            <div className="flex justify-between text-[10px]"><span className="text-slate-500 font-medium">Tagihan PBB Aktif:</span><span className="font-bold text-slate-200 font-data">Rp 120.000</span></div>
            <div className="flex justify-between text-[10px]"><span className="text-slate-500 font-medium">Subsidi Loyalty Points:</span><span className="font-bold text-brand-400 font-data">-Rp {points.toLocaleString('id-ID')}</span></div>
            <hr className="border-white/10" />
            <div className="flex justify-between text-[10px]"><span className="text-slate-400 font-bold">Sisa Tagihan Bersih:</span><span className="font-black text-slate-100 font-data">Rp {(120000 - points).toLocaleString('id-ID')}</span></div>

            <button onClick={() => setShowPbbModal(true)} className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg text-[10px] font-bold hover:bg-blue-600 transition-colors">
              Potong Tagihan PBB Daerah
            </button>
          </div>
        )}
      </div>

      {/* Stake Balance */}
      <div className="bg-gold-500/[0.07] rounded-xl p-3 border border-gold-500/15 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-gold-400" />
          <div>
            <p className="text-[10px] font-bold text-slate-100">Deposit Stake Aktif</p>
            <p className="text-[8px] text-slate-500">2 task in-progress</p>
          </div>
        </div>
        <span className="text-sm font-black text-gold-400 font-data">Rp 20.000</span>
      </div>

      <h4 className="font-bold text-slate-100 text-sm">Riwayat Reward</h4>
      <div className="space-y-2">
        {history.map(r => (
          <div key={r.id} className="bg-surface p-3 rounded-xl border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.amount > 0 ? (r.status === 'success' ? 'bg-brand-500/10 text-brand-400' : 'bg-gold-500/10 text-gold-400') : 'bg-red-500/10 text-red-400'}`}>
                {r.amount > 0 ? (r.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />) : <AlertTriangle className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-100 leading-tight">{r.title}</p>
                <p className="text-[9px] text-slate-500">{r.date}</p>
              </div>
            </div>
            <span className={`text-xs font-bold font-data ${r.amount > 0 ? (r.status === 'success' ? 'text-brand-400' : 'text-gold-400') : 'text-red-400'}`}>
              {r.amount > 0 ? '+' : ''}Rp {r.amount.toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showPbbModal && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-elevated rounded-2xl p-4 w-full max-w-[280px] text-center space-y-4 border border-white/10 animate-fade-up">
            <h5 className="font-bold text-slate-100 text-sm">Konfirmasi Tukar Pajak</h5>
            <p className="text-[11px] text-slate-400 leading-normal">Tukarkan Rp45.000 Loyalty Points untuk memotong tagihan PBB NOP 32.04.120.003.002-0051.0?</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowPbbModal(false)} className="py-2 border border-white/10 bg-white/5 text-slate-300 rounded-lg text-xs font-bold">Batal</button>
              <button onClick={handlePayPbb} disabled={isProcessing} className="py-2 bg-gold-500 text-[#0B1120] rounded-lg text-xs font-bold">
                {isProcessing ? "Memproses..." : "Ya, Tukar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Tab: Profil ---
function TabProfil() {
  const reputationScore = 78;
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const startVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
      alert("✓ Verifikasi Wajah IKD Berhasil! Wajah cocok 99,4% dengan database Dukcapil.");
    }, 2000);
  };

  return (
    <div className="px-5 py-4 space-y-3">
      {/* Profile Card */}
      <div className="bg-surface rounded-2xl p-4 border border-white/[0.06] text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 text-[#022c22] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2 ring-4 ring-gold-500/20">A</div>
        <h3 className="font-bold text-slate-100 text-base">Andi Pratama</h3>
        <p className="text-[10px] text-slate-500 mb-1">Citizen Miner sejak Feb 2026</p>
        <div className="flex items-center justify-center space-x-1">
          <Star className="w-3 h-3 text-gold-400" fill="currentColor" />
          <Star className="w-3 h-3 text-gold-400" fill="currentColor" />
          <Star className="w-3 h-3 text-slate-700" fill="currentColor" />
          <span className="text-[10px] font-bold text-gold-400 ml-1">Level 2 — Terlatih</span>
        </div>
      </div>

      {/* Reputation Score */}
      <div className="bg-surface rounded-xl p-3 border border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">🛡️ Reputation Score</span>
          <span className={`text-lg font-black font-data ${reputationScore >= 60 ? 'text-brand-400' : reputationScore >= 30 ? 'text-gold-400' : 'text-red-400'}`}>{reputationScore}/100</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-1.5">
          <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full" style={{ width: `${reputationScore}%` }}></div>
        </div>
        <div className="flex justify-between text-[8px] text-slate-600">
          <span>0 — Suspend</span><span>30 — Probation</span><span>60 — Verified</span><span>80 — Trusted</span>
        </div>
        <div className="mt-2 bg-brand-500/10 rounded-lg p-2 border border-brand-500/15">
          <p className="text-[9px] font-bold text-brand-400">✅ Status: Verified Citizen</p>
          <p className="text-[8px] text-slate-500">Akses proyek menengah, reward standar</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {[["27", "Tasks Selesai", "text-slate-100"], ["92%", "Akurasi", "text-brand-400"], ["Rp 405K", "Total Earned", "text-gold-400"], ["0", "Pelanggaran", "text-purple-400"]].map(([v, l, c]) => (
          <div key={l} className="bg-surface rounded-xl p-2.5 border border-white/[0.06] text-center">
            <p className={`text-lg font-black font-data ${c}`}>{v}</p>
            <p className="text-[8px] text-slate-500 font-medium">{l}</p>
          </div>
        ))}
      </div>

      {/* Level Progress */}
      <div className="bg-surface rounded-xl p-3 border border-white/[0.06]">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold text-slate-200">Progress ke Level 3 (Ahli)</span>
          <span className="text-[9px] text-slate-500 font-data">27/50 tasks</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full" style={{ width: '54%' }}></div>
        </div>
        <p className="text-[8px] text-slate-600 mt-1">Selesaikan 23 tasks lagi untuk unlock &quot;Progress Report&quot; tasks</p>
      </div>

      {/* Face scan */}
      {isVerifying && (
        <div className="bg-base text-slate-100 rounded-xl p-4 text-center space-y-3 flex flex-col items-center justify-center min-h-[150px] border border-white/10">
          <div className="relative w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-blue-400 animate-bounce"></div>
            <User className="w-8 h-8 text-slate-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold">Memindai Wajah...</p>
            <p className="text-[8px] text-slate-500">InsightFace matching dengan IKD API (SHA-256)</p>
          </div>
        </div>
      )}

      {/* KTP status */}
      {verified ? (
        <div className="bg-brand-500/10 rounded-xl p-2.5 border border-brand-500/20 flex items-center space-x-3">
          <Shield className="w-5 h-5 text-brand-400 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-100">KTP & Wajah Terverifikasi IKD ✓</p>
            <p className="text-[8px] text-slate-500 font-data">NIK: 3204-****-****-3847 (SHA-256)</p>
          </div>
        </div>
      ) : (
        !isVerifying && (
          <div className="bg-surface rounded-xl p-3 border border-white/[0.06] text-center space-y-2">
            <ShieldAlert className="w-6 h-6 text-slate-500 mx-auto" />
            <p className="text-[10px] font-bold text-slate-100">Verifikasi Wajah IKD Diperlukan</p>
            <p className="text-[8px] text-slate-500 leading-tight">Untuk keamanan pelaporan & verifikasi sasaran bansos, cocokkan biometrik wajah dengan database IKD Dukcapil.</p>
            <button onClick={startVerification} className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-[9px] font-bold transition-all">
              Verifikasi Wajah via IKD
            </button>
          </div>
        )
      )}

      {/* Anti-Collusion */}
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.06]">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">⚖️ Kebijakan Anti-Kolusi:</p>
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

// --- Shared App Header ---
function AppHeader({ topPad }: { topPad: string }) {
  return (
    <div className={`${topPad} pb-3 px-5 bg-base flex justify-between items-center relative z-40 border-b border-white/[0.06] shrink-0`}>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400/20 to-gold-500/10 border border-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-brand-400" />
        </div>
        <div>
          <p className="font-bold leading-none tracking-tight">
            <span className="text-gradient-brand">KAWAL</span> <span className="text-gradient-gold">RUPIAH</span>
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-[10px] text-slate-500 font-medium">Citizen Mining</p>
            <LevelBadge />
          </div>
        </div>
      </div>
      <div className="bg-gold-500/10 text-gold-400 px-3 py-1.5 rounded-full font-bold text-sm flex items-center border border-gold-500/20 font-data">
        <span className="mr-1">Rp</span>45.000
      </div>
    </div>
  );
}

// --- Bottom Nav ---
function BottomNav({ activeTab, setActiveTab, absolute }: { activeTab: PwaTab; setActiveTab: (t: PwaTab) => void; absolute?: boolean }) {
  const tabs: { id: PwaTab; label: string; icon: typeof CheckCircle2 }[] = [
    { id: 'tugas', label: 'Tugas', icon: CheckCircle2 },
    { id: 'peta', label: 'Peta', icon: MapPin },
    { id: 'reward', label: 'Reward', icon: Gift },
    { id: 'profil', label: 'Profil', icon: User },
  ];
  return (
    <div className={`${absolute ? 'absolute pb-8' : 'fixed pb-[max(0.75rem,env(safe-area-inset-bottom))]'} bottom-0 left-0 w-full bg-base/95 backdrop-blur-md border-t border-white/[0.06] px-4 py-3 flex justify-around items-center z-40`}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center transition-colors ${isActive ? 'text-brand-400' : 'text-slate-500'}`}>
            <Icon className="w-6 h-6 mb-1" />
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
            {isActive && <div className="w-1 h-1 bg-brand-400 rounded-full mt-0.5" />}
          </button>
        );
      })}
    </div>
  );
}

// --- Standalone Mobile Citizen App (/mobile route) ---
export function CitizenMobileApp() {
  const [activeTab, setActiveTab] = useState<PwaTab>('tugas');

  return (
    <div className="w-full h-dvh bg-void flex flex-col relative overflow-hidden text-slate-100">
      <div className="h-[env(safe-area-inset-top,0px)] bg-base shrink-0" />
      <AppHeader topPad="pt-3" />
      <div className="flex-1 overflow-y-auto relative pb-20 custom-scrollbar">
        {activeTab === 'tugas' && <TabTugas />}
        {activeTab === 'peta' && <TabPeta />}
        {activeTab === 'reward' && <TabReward />}
        {activeTab === 'profil' && <TabProfil />}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

// --- Desktop dashboard phone mockup ---
export default function MobilePwaScreen() {
  const [activeTab, setActiveTab] = useState<PwaTab>('tugas');

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center pb-20 mt-4 gap-10">
      {/* Phone */}
      <div className="w-[390px] max-w-full h-[844px] bg-void border-[12px] border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col shrink-0 text-slate-100 glow-emerald">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50"></div>
        <AppHeader topPad="pt-12" />
        <div className="flex-1 overflow-y-auto relative pb-24 custom-scrollbar">
          {activeTab === 'tugas' && <TabTugas />}
          {activeTab === 'peta' && <TabPeta />}
          {activeTab === 'reward' && <TabReward />}
          {activeTab === 'profil' && <TabProfil />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} absolute />
      </div>

      {/* Decorative sidebar */}
      <div className="w-80 p-4 hidden xl:block">
        <h2 className="text-3xl font-extrabold text-slate-50 mb-4">Citizen Mining PWA</h2>
        <p className="text-slate-400 leading-relaxed mb-4 font-medium">Ubah pengawasan pemerintah menjadi <strong className="text-slate-200">micro-tasks</strong> masal dengan <strong className="text-slate-200">anti-kolusi berlapis</strong>.</p>

        <div className="bg-gold-500/[0.07] border border-gold-500/20 rounded-xl p-3.5 mb-6 text-xs leading-normal">
          <p className="font-bold text-gold-400 mb-1 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" /> Road Map: Android APK Native
          </p>
          <p className="text-slate-400 text-[10px] leading-relaxed">
            Build native Android (.apk) via Capacitor sedang disiapkan untuk offline-first SQLite kamera luring lanjutan. Akses saat ini berjalan penuh via PWA Vercel.
          </p>
        </div>

        <div className="space-y-2 mb-6">
          {[
            { icon: Shuffle, label: "Random Assignment", c: "text-purple-400 bg-purple-500/10" },
            { icon: MapPin, label: "Geographic Separation", c: "text-blue-400 bg-blue-500/10" },
            { icon: ImageIcon, label: "AI Photo Forensics", c: "text-gold-400 bg-gold-500/10" },
            { icon: Shield, label: "Reputation Score", c: "text-brand-400 bg-brand-500/10" },
          ].map(({ icon: Icon, label, c }) => (
            <div key={label} className="flex items-center text-xs font-bold text-slate-200 bg-surface px-3 py-2.5 rounded-xl border border-white/[0.06]">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2.5 ${c}`}><Icon className="w-3.5 h-3.5" /></div>
              {label}
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-xl p-4 border border-white/[0.06]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">🛡️ Anti-Kolusi Pipeline:</p>
          <div className="space-y-2 text-xs text-slate-400">
            {[
              ["1", "Random assign dari kecamatan berbeda", "text-purple-400 bg-purple-500/10"],
              ["2", "Warga isi checklist + foto wajib", "text-blue-400 bg-blue-500/10"],
              ["3", "AI: pHash, EXIF, GPS, outlier detect", "text-gold-400 bg-gold-500/10"],
              ["4", "Konsensus 3-11 warga → DLT", "text-brand-400 bg-brand-500/10"],
              ["5", "Curang? Stake hangus + suspend", "text-red-400 bg-red-500/10"],
            ].map(([n, t, c]) => (
              <div key={n} className="flex items-center"><div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-[10px] font-bold ${c}`}>{n}</div>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
