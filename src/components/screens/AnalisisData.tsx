'use client'

import { BarChart2, TrendingUp, PieChart, ArrowUpRight, Download, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPie, Pie, Cell, Legend, LineChart, Line } from "recharts";

const tooltipStyle = {
  borderRadius: '10px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: 'rgba(17,24,39,0.95)',
  fontSize: '12px',
  color: '#F1F5F9',
} as const;

const categoryData = [
  { name: "Infrastruktur", total: 320, anomali: 18 },
  { name: "IT / Elektronik", total: 185, anomali: 24 },
  { name: "Kesehatan", total: 142, anomali: 8 },
  { name: "Pendidikan", total: 98, anomali: 5 },
  { name: "Transportasi", total: 76, anomali: 12 },
  { name: "ATK / Kantor", total: 210, anomali: 3 },
];

const trendData = [
  { bulan: "Sep", anomali: 28, proyek: 380 },
  { bulan: "Okt", anomali: 35, proyek: 420 },
  { bulan: "Nov", anomali: 22, proyek: 395 },
  { bulan: "Des", anomali: 41, proyek: 510 },
  { bulan: "Jan", anomali: 38, proyek: 485 },
  { bulan: "Feb", anomali: 30, proyek: 460 },
  { bulan: "Mar", anomali: 42, proyek: 520 },
];

const regionData = [
  { name: "Jawa Barat", value: 35 },
  { name: "Jawa Timur", value: 22 },
  { name: "DKI Jakarta", value: 15 },
  { name: "Jawa Tengah", value: 12 },
  { name: "Lainnya", value: 16 },
];

const COLORS = ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#64748B'];

export default function AnalisisDataScreen() {
  return (
    <div className="space-y-6 max-w-full pb-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 flex items-center">
            <BarChart2 className="w-6 h-6 mr-3 text-blue-400" />
            Analisis Data
          </h2>
          <p className="text-sm text-slate-400 mt-1 pl-9">Statistik mendalam anomali pengadaan nasional</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 text-slate-300 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">
            <Calendar className="w-4 h-4" /><span>Q1 2026</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 text-slate-300 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" /><span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gs-card accent-bar accent-info p-5 pl-6">
          <p className="text-xs text-slate-400 font-semibold mb-1">Total Proyek Dianalisis</p>
          <p className="text-3xl font-bold text-slate-100 font-data">1.031</p>
          <p className="text-[10px] text-brand-400 font-bold mt-1 flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" />+12% dari bulan lalu</p>
        </div>
        <div className="gs-card accent-bar accent-danger p-5 pl-6">
          <p className="text-xs text-slate-400 font-semibold mb-1">Total Anomali</p>
          <p className="text-3xl font-bold text-red-400 font-data">70</p>
          <p className="text-[10px] text-red-400 font-bold mt-1">6,8% detection rate</p>
        </div>
        <div className="gs-card accent-bar accent-gold p-5 pl-6">
          <p className="text-xs text-slate-400 font-semibold mb-1">Potensi Kerugian</p>
          <p className="text-3xl font-bold text-gold-400 font-data">Rp 142M</p>
          <p className="text-[10px] text-slate-500 font-bold mt-1">Terdeteksi AI Oracle</p>
        </div>
        <div className="gs-card accent-bar accent-emerald p-5 pl-6">
          <p className="text-xs text-slate-400 font-semibold mb-1">Berhasil Dicegah</p>
          <p className="text-3xl font-bold text-brand-400 font-data">Rp 89M</p>
          <p className="text-[10px] text-brand-400 font-bold mt-1">62,7% prevention rate</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="gs-panel p-6">
          <h3 className="font-bold text-slate-100 text-sm mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
            Tren Anomali 7 Bulan Terakhir
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(148,163,184,0.2)' }} />
                <Line type="monotone" dataKey="anomali" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', r: 4 }} name="Anomali" />
                <Line type="monotone" dataKey="proyek" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 3 }} name="Total Proyek" strokeDasharray="5 5" />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="gs-panel p-6">
          <h3 className="font-bold text-slate-100 text-sm mb-4 flex items-center">
            <PieChart className="w-4 h-4 mr-2 text-red-400" />
            Sebaran Anomali per Provinsi
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RPie>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Pie data={regionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="#0B1120" strokeWidth={2} label={(props: any) => `${props.name || ''} ${((props.percent || 0) * 100).toFixed(0)}%`} labelLine={{ stroke: 'rgba(148,163,184,0.3)', strokeWidth: 1 }} style={{ fontSize: '11px', fill: '#94A3B8' }}>
                  {regionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </RPie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Bar Chart */}
      <div className="gs-panel p-6">
        <h3 className="font-bold text-slate-100 text-sm mb-4 flex items-center">
          <BarChart2 className="w-4 h-4 mr-2 text-gold-400" />
          Anomali per Kategori Pengadaan
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
              <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={28} name="Total Proyek" />
              <Bar dataKey="anomali" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={28} name="Anomali" />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
