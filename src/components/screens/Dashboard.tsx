'use client'

import { AlertTriangle, Users, Search, Bell, MapPin, ChevronRight, Activity, ShieldCheck, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';

const IndonesiaMap = dynamic(() => import('../IndonesiaMap'), { ssr: false });

const tooltipStyle = {
  borderRadius: '10px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: 'rgba(17,24,39,0.95)',
  fontSize: '12px',
  fontWeight: 600,
  color: '#F1F5F9',
} as const;

const heroStats = [
  { label: "Penghematan APBD (YTD)", value: "Rp 14,7 M", delta: "+12,3% bln lalu", accent: "accent-emerald", color: "text-brand-400", icon: Wallet, deltaColor: "text-brand-400" },
  { label: "Proyek Diawasi", value: "847", delta: "23 provinsi pilot", accent: "accent-info", color: "text-blue-400", icon: ShieldCheck, deltaColor: "text-slate-400" },
  { label: "Warga Aktif", value: "6.234", delta: "+418 minggu ini", accent: "accent-gold", color: "text-gold-400", icon: Users, deltaColor: "text-gold-400" },
  { label: "Anomali Terdeteksi", value: "23", delta: "Akurasi AI 94,7%", accent: "accent-danger", color: "text-red-400", icon: Activity, deltaColor: "text-red-400" },
];

export default function DashboardScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const chartData = [
    { name: 'Diajukan', value: 25.4, fill: '#EF4444' },
    { name: 'Pasar', value: 16.8, fill: '#3B82F6' },
    { name: 'LKPP', value: 18.2, fill: '#64748B' },
  ];

  return (
    <div className="space-y-6 max-w-full pb-20">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 glass-panel p-4 rounded-2xl">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            Peta Pengawasan APBD Nasional
            <span className="flex items-center gap-1 text-[10px] font-bold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 pulse-live" /> LIVE
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">Deteksi anomali pengadaan barang & jasa daerah secara real-time (2026)</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Cari provinsi/kota..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition-all"
            />
          </div>
          <button className="relative p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors shrink-0">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-surface pulse-live"></span>
          </button>
        </div>
      </div>

      {/* Hero Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {heroStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`gs-card card-hover accent-bar ${s.accent} p-5 pl-6 animate-fade-up`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between">
                <p className="text-xs text-slate-400 font-medium leading-snug max-w-[70%]">{s.label}</p>
                <Icon className={`w-5 h-5 ${s.color} shrink-0`} />
              </div>
              <p className={`font-data text-3xl font-bold mt-2 ${s.color}`}>{s.value}</p>
              <p className={`text-[11px] font-semibold mt-1.5 ${s.deltaColor}`}>{s.delta}</p>
            </div>
          );
        })}
      </div>

      {/* Map + Alert Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 gs-panel overflow-hidden relative min-h-[500px] flex flex-col">
          <div className="py-4 px-6 border-b border-white/[0.06] flex justify-between items-center z-10">
            <div className="flex gap-2 items-center">
              <MapPin className="h-5 w-5 text-brand-400" />
              <h3 className="font-semibold text-slate-100">Live Map: Sebaran Proyek</h3>
            </div>
            <select className="text-sm bg-white/5 font-medium text-slate-300 px-3 py-1.5 rounded-lg cursor-pointer outline-none border border-white/10 hover:border-white/20">
              <option className="bg-surface">Semua Kategori</option>
              <option className="bg-surface">Infrastruktur</option>
              <option className="bg-surface">Pengadaan IT</option>
              <option className="bg-surface">Kesehatan</option>
            </select>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <IndonesiaMap />

            {/* Legend Overlay */}
            <div className="absolute bottom-4 left-4 glass-panel p-3 rounded-xl z-[1000]">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Legend</p>
              <div className="flex items-center gap-2 text-xs font-medium mb-1.5 text-slate-300">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <span>Proyek Bersih</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Anomali Terdeteksi</span>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute top-4 right-4 glass-panel p-3 rounded-xl z-[1000]">
              <div className="text-xs font-bold text-slate-200 mb-1.5">Ringkasan</div>
              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between gap-4"><span>Total Proyek:</span><span className="font-bold text-blue-400 font-data">8</span></div>
                <div className="flex justify-between gap-4"><span>Anomali:</span><span className="font-bold text-red-400 font-data">4</span></div>
                <div className="flex justify-between gap-4"><span>Bersih:</span><span className="font-bold text-brand-400 font-data">4</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Anomali Panel */}
        <div className="gs-panel flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, #111827 60%)' }}>
          <div className="h-1 w-full bg-red-500"></div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold uppercase tracking-wide text-sm">Anomali Terdeteksi</h3>
              <span className="ml-auto text-[10px] font-data text-slate-500">ID #4091</span>
            </div>

            <div className="mb-5">
              <h4 className="text-lg font-bold text-slate-50 leading-tight mb-3">Pengadaan Laptop Dinas Eksekutif</h4>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between"><span className="text-slate-500">Lokasi:</span> <span className="font-medium text-slate-200">Kab. Bandung, Jabar</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Nilai Proyek:</span> <span className="font-medium text-slate-200 font-data">Rp 12,5 M</span></p>
                <p className="flex justify-between items-center"><span className="text-slate-500">Status Vendor:</span> <span className="font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-xs border border-red-500/20">Berisiko Tinggi</span></p>
              </div>
            </div>

            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Perbandingan Harga Satuan (Juta)</h5>

            <div className="h-44 w-full mb-4 bg-white/[0.02] rounded-xl p-2 border border-white/[0.06]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}`} />
                  <Tooltip cursor={{ fill: 'rgba(148,163,184,0.06)' }} contentStyle={tooltipStyle} formatter={(value) => [`Rp ${value} Juta`, 'Harga']} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-red-500/[0.07] rounded-xl p-3 text-sm border border-red-500/15">
              <p className="font-semibold text-slate-200 mb-1 text-xs flex items-center gap-1.5"><span>🤖</span> AI Kesimpulan</p>
              <p className="text-slate-400 leading-snug text-xs">Harga Rp 25,4 Jt berada <strong className="text-red-400">+51%</strong> di atas harga wajar LKPP (Rp 18,2 Jt). Dengan qty <strong className="text-slate-200">492 unit</strong>, potensi kerugian negara <strong className="text-red-400">Rp 4,2 Miliar</strong>.</p>
            </div>

            <div className="mt-auto pt-5">
              <button
                onClick={() => setActiveTab('price_oracle')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-500 hover:bg-brand-600 text-[#022c22] rounded-xl font-bold transition-colors text-sm"
              >
                <span>Investigasi di Oracle</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Resolution Module */}
      <div className="gs-panel overflow-hidden">
        <div className="py-4 px-6 border-b border-white/[0.06] bg-white/[0.02] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2 text-slate-100">
            <AlertTriangle className="h-5 w-5 text-gold-400" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Modul Penyelesaian Sengketa (Dispute Resolution)</h3>
          </div>
          <span className="text-[10px] bg-red-500/15 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-bold w-fit">2 PENANGGUHAN DANA</span>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-500 mb-4 leading-relaxed max-w-4xl">
            Jika AI SOP Engine mendeteksi deviasi anomali fisik di lapangan dari Citizen Mining, pembayaran termin proyek dibekukan otomatis di Hyperledger Fabric Smart Contract. Kontraktor & Pemda dapat mengajukan bukti sanggahan untuk dimediasi secara transparan.
          </p>

          <div className="overflow-x-auto custom-scrollbar -mx-2">
            <table className="w-full text-left text-xs border-collapse min-w-[860px]">
              <thead>
                <tr className="text-slate-500 font-semibold border-b border-white/[0.06]">
                  <th className="py-3 px-4">Proyek & Wilayah</th>
                  <th className="py-3 px-4">Termin / Nilai Beku</th>
                  <th className="py-3 px-4">Pemicu Deviasi</th>
                  <th className="py-3 px-4">Tanggal Beku</th>
                  <th className="py-3 px-4">Sanggahan Vendor</th>
                  <th className="py-3 px-4">Status Resolusi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-4 px-4 font-semibold text-slate-100">
                    Jembatan Cisangkuy, Kab. Bandung
                    <span className="block text-[10px] font-normal text-slate-500">Vendor: PT Sinar Karya Mandiri</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-red-400 font-data">Termin III (Rp 1,4 M)</td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300 font-medium">Progress Fisik &lt; 40%</span>
                    <span className="block text-[10px] text-red-400">Rencana: 65% (Deviasi 25%)</span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-data">28 Mei 2026</td>
                  <td className="py-4 px-4">
                    <span className="bg-gold-500/10 text-gold-400 border border-gold-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Lampiran Bukti</span>
                    <span className="block text-[9px] text-slate-500 mt-0.5">Force Majeure (cuaca)</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded text-[10px] font-bold">DI MEDIASI</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="bg-brand-500 text-[#022c22] px-3 py-1.5 rounded-lg font-bold text-[10px] hover:bg-brand-400 transition-colors">Mediasi</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-4 px-4 font-semibold text-slate-100">
                    Aspal Jl. Desa Cibadak
                    <span className="block text-[10px] font-normal text-slate-500">Vendor: CV Paving Makmur</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-red-400 font-data">Termin II (Rp 350 Jt)</td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300 font-medium">Bahan Tidak Sesuai Specs</span>
                    <span className="block text-[10px] text-red-400">Ketebalan kurang 3cm (AI)</span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-data">01 Jun 2026</td>
                  <td className="py-4 px-4 text-slate-500">Belum ada tanggapan</td>
                  <td className="py-4 px-4">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-bold">DIBEKUKAN</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="bg-white/5 text-slate-300 border border-white/10 px-3 py-1.5 rounded-lg font-bold text-[10px] hover:bg-white/10 transition-colors">Peringatan</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
