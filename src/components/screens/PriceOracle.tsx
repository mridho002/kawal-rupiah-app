'use client'

import { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, AlertCircle, CheckCircle, MapPin, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const tableData = [
  { id: 1, item: "Laptop Core i7 16GB", satuan: "Unit", qty: 492, propUnit: 25.4, ekatUnit: 16.8, propTotal: "Rp 12.496.800.000", ekatTotal: "Rp 8.265.600.000", diff: "+51%", daerah: "Kab. Bandung, Jabar", tahun: "2026", status: "ANOMALI" },
  { id: 2, item: "Beton K-350", satuan: "m³", qty: 2500, propUnit: 1.15, ekatUnit: 1.1, propTotal: "Rp 2.875.000.000", ekatTotal: "Rp 2.750.000.000", diff: "+4.5%", daerah: "Kota Semarang, Jateng", tahun: "2026", status: "NORMAL" },
  { id: 3, item: "Aspal Hotmix AC-WC", satuan: "Ton", qty: 850, propUnit: 2.1, ekatUnit: 1.45, propTotal: "Rp 1.785.000.000", ekatTotal: "Rp 1.232.500.000", diff: "+44%", daerah: "Kab. Bogor, Jabar", tahun: "2026", status: "ANOMALI" },
  { id: 4, item: "ATK Kantor Set", satuan: "Set", qty: 120, propUnit: 0.45, ekatUnit: 0.42, propTotal: "Rp 54.000.000", ekatTotal: "Rp 50.400.000", diff: "+7%", daerah: "Kota Surabaya, Jatim", tahun: "2025", status: "NORMAL" },
  { id: 5, item: "Sewa Bus Medium", satuan: "Unit/Hari", qty: 30, propUnit: 3.5, ekatUnit: 2.2, propTotal: "Rp 105.000.000", ekatTotal: "Rp 66.000.000", diff: "+59%", daerah: "Prov. DKI Jakarta", tahun: "2026", status: "ANOMALI" },
  { id: 6, item: "Printer Multifungsi A3", satuan: "Unit", qty: 75, propUnit: 8.9, ekatUnit: 6.2, propTotal: "Rp 667.500.000", ekatTotal: "Rp 465.000.000", diff: "+43%", daerah: "Kab. Tangerang, Banten", tahun: "2026", status: "ANOMALI" },
  { id: 7, item: "Meja Kerja 1/2 Biro", satuan: "Unit", qty: 200, propUnit: 1.8, ekatUnit: 1.65, propTotal: "Rp 360.000.000", ekatTotal: "Rp 330.000.000", diff: "+9%", daerah: "Kota Medan, Sumut", tahun: "2025", status: "NORMAL" },
];

export default function PriceOracleScreen() {
  const [selectedRow, setSelectedRow] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const selected = tableData.find(r => r.id === selectedRow) ?? tableData[0];
  const isAnomaliSelected = selected.status === "ANOMALI";

  const chartData = [
    { name: "Harga Diajukan", value: selected.propUnit },
    { name: "Harga e-Katalog", value: selected.ekatUnit },
  ];

  const filteredData = tableData.filter(r =>
    r.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.daerah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-full pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-[#0D1B3E]">Price Oracle</h2>
          <p className="text-sm text-[#8899AA] mt-1">AI Deteksi Anomali Harga Pengadaan — Sumber: e-Katalog LKPP (Real-time)</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            <span>Filter Kategori</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#DFA000] text-[#DFA000] rounded-lg hover:bg-amber-50 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Item Dianalisis</p>
          <p className="text-2xl font-black text-[#0D1B3E]">{tableData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Terdeteksi Anomali</p>
          <p className="text-2xl font-black text-[#C0392B]">{tableData.filter(r => r.status === "ANOMALI").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Status Normal</p>
          <p className="text-2xl font-black text-[#27AE60]">{tableData.filter(r => r.status === "NORMAL").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Threshold Anomali</p>
          <p className="text-2xl font-black text-[#DFA000]">&gt;15%</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(13,27,62,0.04)] border border-slate-100 p-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari item pengadaan, spesifikasi, atau nama daerah..."
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0069D9]/20 focus:border-[#0069D9] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Table — wider */}
          <div className="xl:col-span-3 border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#0D1B3E] text-white">
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Item / Spek</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Satuan</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-center">Qty</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Harga Satuan /<br/>Diajukan</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Harga Satuan /<br/>e-Katalog</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-center">Selisih</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Daerah</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((row) => {
                    const isAnomali = row.status === "ANOMALI";
                    const isSelected = selectedRow === row.id;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedRow(row.id)}
                        className={`cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? isAnomali ? 'bg-red-50/80 ring-1 ring-inset ring-red-200' : 'bg-green-50/80 ring-1 ring-inset ring-green-200'
                            : isAnomali ? 'hover:bg-red-50/30' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3.5 px-3 font-semibold text-[#0D1B3E] text-sm">{row.item}</td>
                        <td className="py-3.5 px-3 text-xs text-slate-500 font-medium">{row.satuan}</td>
                        <td className="py-3.5 px-3 text-sm font-bold text-center text-[#0D1B3E]">{row.qty.toLocaleString('id-ID')}</td>
                        <td className="py-3.5 px-3 text-sm font-medium text-[#0D1B3E]">Rp {row.propUnit} Jt</td>
                        <td className="py-3.5 px-3 text-sm text-slate-500">Rp {row.ekatUnit} Jt</td>
                        <td className={`py-3.5 px-3 text-sm font-bold text-center ${isAnomali ? 'text-[#C0392B]' : 'text-slate-600'}`}>
                          <div className="flex items-center justify-center">
                            {isAnomali && <ArrowUpRight className="w-3 h-3 mr-0.5" strokeWidth={3} />}
                            {row.diff}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center text-xs text-slate-600">
                            <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[120px]">{row.daerah}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isAnomali ? 'bg-[#C0392B] text-white' : 'bg-[#27AE60] text-white'
                          }`}>
                            {isAnomali ? <AlertCircle className="w-3 h-3 mr-0.5" /> : <CheckCircle className="w-3 h-3 mr-0.5" />}
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className={`rounded-xl border-2 p-5 shadow-sm flex flex-col ${
            isAnomaliSelected ? 'border-red-200 bg-red-50/20' : 'border-green-200 bg-green-50/20'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#0D1B3E] text-sm">Analisis Detail</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                isAnomaliSelected ? 'bg-[#C0392B] text-white' : 'bg-[#27AE60] text-white'
              }`}>{selected.status}</span>
            </div>

            <div className="bg-white rounded-lg border border-slate-100 p-3 mb-4">
              <p className="font-bold text-[#0D1B3E] text-sm mb-2 truncate">{selected.item}</p>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Daerah:</span>
                  <span className="font-medium text-[#0D1B3E]">{selected.daerah}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qty:</span>
                  <span className="font-bold text-[#0D1B3E]">{selected.qty.toLocaleString('id-ID')} {selected.satuan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Diajukan:</span>
                  <span className="font-bold text-[#C0392B]">{selected.propTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total e-Katalog:</span>
                  <span className="font-medium text-[#0069D9]">{selected.ekatTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TA:</span>
                  <span className="font-medium">{selected.tahun}</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Perbandingan Harga Satuan</p>
            <div className="h-44 w-full bg-white rounded-lg border border-slate-100 p-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}Jt`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                    formatter={(value) => [`Rp ${value} Juta`, 'Harga']}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
                    <Cell key="c0" fill={isAnomaliSelected ? '#C0392B' : '#27AE60'} />
                    <Cell key="c1" fill="#0069D9" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={`mt-4 p-3 rounded-lg border text-xs leading-relaxed font-medium ${
              isAnomaliSelected ? 'bg-red-50 border-red-100 text-slate-700' : 'bg-green-50 border-green-100 text-slate-700'
            }`}>
              <p className="font-bold text-[#0D1B3E] mb-1 text-[10px] uppercase tracking-wider">🤖 AI Kesimpulan:</p>
              {isAnomaliSelected
                ? <p>Harga satuan <strong className="text-[#C0392B]">Rp {selected.propUnit} Jt</strong> berada <strong className="text-[#C0392B]">{selected.diff}</strong> di atas harga wajar e-Katalog <strong className="text-[#0069D9]">Rp {selected.ekatUnit} Jt</strong>. Dengan qty <strong>{selected.qty.toLocaleString('id-ID')} {selected.satuan}</strong>, potensi kerugian negara mencapai <strong className="text-[#C0392B]">Rp {((selected.propUnit - selected.ekatUnit) * selected.qty).toFixed(0)} Jt</strong>.</p>
                : <p>Harga item <strong className="text-[#0D1B3E]">{selected.item}</strong> berada dalam rentang wajar. Selisih <strong className="text-[#27AE60]">{selected.diff}</strong> masih di bawah threshold anomali (&lt;15%).</p>
              }
            </div>

            <button className={`mt-4 w-full py-2.5 text-white rounded-lg text-xs font-bold transition-colors shadow-sm ${
              isAnomaliSelected ? 'bg-[#C0392B] hover:bg-red-700' : 'bg-[#0069D9] hover:bg-blue-700'
            }`}>
              {isAnomaliSelected ? '🚨 Tandai & Blokir Pembayaran' : '✅ Tandai sebagai Wajar'}
            </button>
            <p className="text-center text-[9px] mt-2 text-slate-400">Sumber: e-Katalog LKPP 2026 (Real-time)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
