'use client'

import { AlertTriangle, TrendingUp, Users, Search, Bell, MapPin, ChevronRight, Activity, Database, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DashboardScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const chartData = [
    { name: 'Pengajuan LKPP', value: 25.4, fill: '#C0392B' }, // Red
    { name: 'Rata-rata Pasar', value: 16.8, fill: '#0069D9' }, // Blue
    { name: 'Standar LKPP', value: 18.2, fill: '#8899AA' }, // Gray
  ];

  return (
    <div className="space-y-6 max-w-full pb-20">
      {/* Top Header Row */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-[#0D1B3E]">Peta Pengawasan APBD Nasional</h2>
          <p className="text-sm text-[#8899AA] mt-1">Real-time deteksi anomali pengadaan barang & jasa daerah (2026)</p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari provinsi/kota..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#0069D9]/20 focus:border-[#0069D9]"
            />
          </div>
          <button className="relative p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#C0392B] rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Main Content Split: Left Map (mock) + Right Alert Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Map UI Mock */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_8px_rgba(13,27,62,0.06)] border border-slate-100 overflow-hidden relative min-h-[500px] flex flex-col">
          <div className="py-4 px-6 border-b border-slate-100 flex justify-between items-center z-10 bg-white">
            <div className="flex space-x-2 items-center">
              <MapPin className="h-5 w-5 text-[#0069D9]" />
              <h3 className="font-semibold text-[#0D1B3E]">Live Map: Sebaran Proyek</h3>
            </div>
            <select className="text-sm border-none bg-slate-50 font-medium text-slate-600 px-3 py-1.5 rounded-md cursor-pointer outline-none ring-1 ring-slate-200 hover:ring-slate-300">
              <option>Semua Kategori</option>
              <option>Infrastruktur</option>
              <option>Pengadaan IT</option>
              <option>Kesehatan</option>
            </select>
          </div>
          
          <div className="flex-1 bg-[#E8F1FA] relative overflow-hidden flex items-center justify-center p-8">
            {/* Simplified Indonesia archipelago silhouette */}
            <svg viewBox="0 0 1000 400" className="w-full h-auto" fill="none">
              {/* Ocean grid pattern */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,105,217,0.06)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="1000" height="400" fill="url(#grid)" />
              
              {/* Sumatra */}
              <path d="M80 100 L120 80 L150 110 L170 130 L180 190 L200 230 L190 270 L160 290 L130 270 L110 230 L90 190 L70 150 Z" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1.5" />
              <text x="130" y="195" fill="rgba(0,105,217,0.35)" fontSize="11" fontWeight="bold" textAnchor="middle">Sumatra</text>
              
              {/* Kalimantan */}
              <path d="M330 60 L380 50 L430 70 L450 100 L460 140 L450 180 L420 200 L400 210 L370 200 L340 170 L320 130 L310 100 Z" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1.5" />
              <text x="385" y="140" fill="rgba(0,105,217,0.35)" fontSize="11" fontWeight="bold" textAnchor="middle">Kalimantan</text>
              
              {/* Java */}
              <path d="M220 290 L280 275 L340 278 L390 282 L420 290 L440 300 L430 310 L390 315 L340 310 L280 305 L240 310 L220 300 Z" fill="rgba(0,105,217,0.15)" stroke="rgba(0,105,217,0.35)" strokeWidth="1.5" />
              <text x="330" y="300" fill="rgba(0,105,217,0.4)" fontSize="10" fontWeight="bold" textAnchor="middle">Jawa</text>
              
              {/* Sulawesi */}
              <path d="M530 70 L560 60 L570 80 L580 120 L600 110 L620 130 L610 150 L580 135 L570 160 L560 200 L540 220 L530 200 L520 170 L530 140 L520 110 Z" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1.5" />
              <text x="558" y="165" fill="rgba(0,105,217,0.35)" fontSize="9" fontWeight="bold" textAnchor="middle">Sulawesi</text>
              
              {/* Bali + NTB + NTT */}
              <ellipse cx="460" cy="310" rx="12" ry="8" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1" />
              <ellipse cx="490" cy="315" rx="15" ry="7" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1" />
              <ellipse cx="530" cy="318" rx="18" ry="7" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1" />
              <ellipse cx="575" cy="318" rx="16" ry="6" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1" />
              <text x="520" y="340" fill="rgba(0,105,217,0.3)" fontSize="8" textAnchor="middle">Nusa Tenggara</text>
              
              {/* Maluku */}
              <ellipse cx="660" cy="160" rx="15" ry="20" fill="rgba(0,105,217,0.10)" stroke="rgba(0,105,217,0.25)" strokeWidth="1" />
              <ellipse cx="680" cy="210" rx="12" ry="18" fill="rgba(0,105,217,0.10)" stroke="rgba(0,105,217,0.25)" strokeWidth="1" />
              <text x="670" y="245" fill="rgba(0,105,217,0.3)" fontSize="8" textAnchor="middle">Maluku</text>
              
              {/* Papua */}
              <path d="M750 100 L790 80 L840 90 L880 70 L910 90 L920 120 L910 160 L880 200 L840 220 L800 210 L770 190 L750 160 L740 130 Z" fill="rgba(0,105,217,0.12)" stroke="rgba(0,105,217,0.3)" strokeWidth="1.5" />
              <text x="830" y="155" fill="rgba(0,105,217,0.35)" fontSize="11" fontWeight="bold" textAnchor="middle">Papua</text>
            </svg>

            {/* Simulated Map Pins */}
            <div className="absolute top-[40%] left-[25%] group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-6 h-6 bg-[#27AE60] rounded-full animate-ping opacity-75"></span>
                <MapPin className="relative h-8 w-8 text-[#27AE60] drop-shadow-md" fill="#fff" />
              </div>
            </div>
            
            <div className="absolute top-[30%] left-[45%] group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 bg-[#C0392B] rounded-full animate-ping opacity-75"></span>
                <MapPin className="relative h-10 w-10 text-[#C0392B] drop-shadow-md z-10" fill="#fff" />
              </div>
              {/* Tooltip visible on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none overflow-hidden border border-red-100">
                <div className="bg-[#C0392B] text-white text-xs font-bold px-2 py-1 uppercase text-center tracking-wider">Anomali Harga</div>
                <div className="p-3">
                  <p className="text-xs font-bold text-navy truncate">Pengadaan Laptop - Kab. Bandung</p>
                  <p className="text-xs text-slate-500 mt-1">Markup: +51%</p>
                </div>
              </div>
            </div>

            <div className="absolute top-[60%] left-[65%] group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <MapPin className="relative h-6 w-6 text-[#27AE60] drop-shadow-sm" fill="#fff" />
              </div>
            </div>
            
            <div className="absolute top-[45%] left-[80%] group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-5 h-5 bg-[#C0392B] rounded-full animate-ping opacity-50"></span>
                <MapPin className="relative h-7 w-7 text-[#C0392B] drop-shadow-sm" fill="#fff" />
              </div>
            </div>

            <div className="absolute top-[65%] left-[35%] group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <MapPin className="relative h-7 w-7 text-[#27AE60] drop-shadow-sm" fill="#fff" />
              </div>
            </div>

            {/* Legend Overlay */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center space-x-3 text-xs font-medium mb-2 text-slate-700">
                <div className="w-3 h-3 rounded-full bg-[#27AE60]" />
                <span>Proyek Bersih</span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-medium text-slate-700">
                <div className="w-3 h-3 rounded-full bg-[#C0392B]" />
                <span>Anomali Terdeteksi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Alert Anomali Panel */}
        <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(13,27,62,0.06)] border border-red-100 flex flex-col relative overflow-hidden h-full">
          {/* Top highlight bar */}
          <div className="h-1.5 w-full bg-[#C0392B]"></div>
          
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center space-x-2 mb-4 text-[#C0392B]">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold uppercase tracking-wide text-sm">Anomali Terdeteksi (ID: #4091)</h3>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-[#0D1B3E] leading-tight mb-2">Pengadaan Laptop Dinas Eksekutif</h4>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p className="flex justify-between"><span className="text-slate-500">Lokasi:</span> <span className="font-medium text-navy">Pemerintah Kab. Bandung, Jabar</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Nilai Proyek:</span> <span className="font-medium text-navy">Rp 12.5 Miliar</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Status Vendor:</span> <span className="font-medium text-[#C0392B] bg-red-50 px-2 py-0.5 rounded text-xs border border-red-100">Beresiko Tinggi</span></p>
              </div>
            </div>

            <h5 className="text-sm font-semibold text-[#0D1B3E] mb-3">Perbandingan Harga Item (Satuan)</h5>
            
            <div className="h-48 w-full mb-4 bg-slate-50 rounded-lg p-2 border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748B'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 10, fill: '#64748B'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}Jt`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 'bold', color: '#0D1B3E'}}
                    formatter={(value) => [`Rp ${value} Juta`, 'Harga']} 
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-red-50 rounded-lg p-3 text-sm -mx-1 border border-red-100/50">
              <p className="font-semibold text-[#0D1B3E] mb-1 text-xs">🤖 AI Kesimpulan:</p>
              <p className="text-slate-700 leading-snug text-xs">Harga Rp 25.4Jt berada <strong className="text-[#C0392B]">+51%</strong> di atas harga wajar LKPP (Rp 18.2Jt). Dengan qty <strong>492 unit</strong>, potensi kerugian negara <strong className="text-[#C0392B]">Rp 4.2 Miliar</strong>. Indikasi kuat mark-up.</p>
            </div>

            <div className="mt-auto pt-5">
              <button 
                onClick={() => setActiveTab('price_oracle')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-[#0D1B3E] hover:bg-[#1a2f5e] text-white rounded-lg font-medium transition-colors text-sm shadow-sm"
              >
                <span>Investigasi di Oracle</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,62,0.04)] border border-slate-100 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0069D9] flex items-center justify-center mr-4 shrink-0 ring-1 ring-blue-100">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-black text-[#0D1B3E] tracking-tight">857T</h3>
              <span className="text-xs font-bold uppercase text-slate-400">IDR</span>
            </div>
            <p className="text-sm font-medium text-slate-500">APBD Diawasi Nasional</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,62,0.04)] border border-slate-100 flex items-center relative overflow-hidden group">
          <div className="absolute inset-y-0 left-0 w-1 bg-[#C0392B]"></div>
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#C0392B] flex items-center justify-center mr-4 shrink-0 ring-1 ring-red-100 group-hover:scale-110 transition-transform">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-black text-[#C0392B] tracking-tight">42</h3>
              <span className="text-xs font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded flex items-center">↑ 12%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Anomali Terflag Hari Ini</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,62,0.04)] border border-slate-100 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-50 text-[#27AE60] flex items-center justify-center mr-4 shrink-0 ring-1 ring-green-100">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-black text-[#0D1B3E] tracking-tight">1,284</h3>
              <span className="text-xs font-bold uppercase text-green-600 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-0.5" /> Aktif
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">Citizen Miners (Warga)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
