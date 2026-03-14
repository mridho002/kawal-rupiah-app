'use client'

import { BarChart2, TrendingUp, PieChart, ArrowUpRight, Download, Filter, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPie, Pie, Cell, Legend, LineChart, Line } from "recharts";

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

const COLORS = ['#C0392B', '#0069D9', '#DFA000', '#27AE60', '#8899AA'];

export default function AnalisisDataScreen() {
  return (
    <div className="space-y-6 max-w-full pb-20">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-[#0D1B3E] flex items-center">
            <BarChart2 className="w-6 h-6 mr-3 text-[#0069D9]" />
            Analisis Data
          </h2>
          <p className="text-sm text-[#8899AA] mt-1 pl-9">Statistik mendalam anomali pengadaan nasional</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>Q1 2026</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold mb-1">Total Proyek Dianalisis</p>
          <p className="text-3xl font-black text-[#0D1B3E]">1,031</p>
          <p className="text-[10px] text-[#27AE60] font-bold mt-1 flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5"/>+12% dari bulan lalu</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-red-100 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold mb-1">Total Anomali</p>
          <p className="text-3xl font-black text-[#C0392B]">70</p>
          <p className="text-[10px] text-[#C0392B] font-bold mt-1">6.8% detection rate</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold mb-1">Potensi Kerugian</p>
          <p className="text-3xl font-black text-[#DFA000]">Rp 142M</p>
          <p className="text-[10px] text-slate-500 font-bold mt-1">Terdeteksi AI Oracle</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold mb-1">Berhasil Dicegah</p>
          <p className="text-3xl font-black text-[#27AE60]">Rp 89M</p>
          <p className="text-[10px] text-[#27AE60] font-bold mt-1">62.7% prevention rate</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-[#0D1B3E] text-sm mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-[#0069D9]" />
            Tren Anomali 7 Bulan Terakhir
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Line type="monotone" dataKey="anomali" stroke="#C0392B" strokeWidth={3} dot={{ fill: '#C0392B', r: 4 }} name="Anomali" />
                <Line type="monotone" dataKey="proyek" stroke="#0069D9" strokeWidth={2} dot={{ fill: '#0069D9', r: 3 }} name="Total Proyek" strokeDasharray="5 5" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart — Region */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-[#0D1B3E] text-sm mb-4 flex items-center">
            <PieChart className="w-4 h-4 mr-2 text-[#C0392B]" />
            Sebaran Anomali per Provinsi
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RPie>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Pie data={regionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" label={(props: any) => `${props.name || ''} ${((props.percent || 0) * 100).toFixed(0)}%`} labelLine={{ stroke: '#94A3B8', strokeWidth: 1 }}>
                  {regionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              </RPie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Bar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-[#0D1B3E] text-sm mb-4 flex items-center">
          <BarChart2 className="w-4 h-4 mr-2 text-[#DFA000]" />
          Anomali per Kategori Pengadaan
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              <Bar dataKey="total" fill="#0069D9" radius={[4, 4, 0, 0]} barSize={28} name="Total Proyek" />
              <Bar dataKey="anomali" fill="#C0392B" radius={[4, 4, 0, 0]} barSize={28} name="Anomali" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
