'use client'

import { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, AlertCircle, CheckCircle } from "lucide-react";

export default function PriceOracleScreen() {
  const tableData = [
    { id: 1, item: "Laptop Core i7 16GB", prop: "Rp 25.400.000", ekat: "Rp 16.800.000", diff: "+51%", status: "ANOMALI" },
    { id: 2, item: "Beton K-350 / m3", prop: "Rp 1.150.000", ekat: "Rp 1.100.000", diff: "+4.5%", status: "NORMAL" },
    { id: 3, item: "Aspal Hotmix AC-WC", prop: "Rp 2.100.000", ekat: "Rp 1.450.000", diff: "+44%", status: "ANOMALI" },
    { id: 4, item: "ATK Kantor Set", prop: "Rp 450.000", ekat: "Rp 420.000", diff: "+7%", status: "NORMAL" },
    { id: 5, item: "Sewa Bus Medium", prop: "Rp 3.500.000", ekat: "Rp 2.200.000", diff: "+59%", status: "ANOMALI" },
  ];

  const [selectedRow, setSelectedRow] = useState(1);

  return (
    <div className="space-y-6 max-w-full pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0D1B3E]">Price Oracle</h2>
          <p className="text-sm text-[#8899AA] mt-1">Deteksi Anomali Harga & Mencegah Mark-up (AI e-Katalog LKPP Radar)</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            <span>Filter Kategori</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#DFA000] text-[#DFA000] rounded-lg hover:bg-gold/5 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(13,27,62,0.04)] border border-slate-100 p-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari item pengadaan, spesifikasi, atau nama daerah..." 
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0069D9]/20 focus:border-[#0069D9] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table Section */}
          <div className="lg:col-span-2 border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Item / Spek</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Harga Diajukan</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-rata e-Katalog</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Selisih</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row) => {
                  const isAnomali = row.status === "ANOMALI";
                  const isSelected = selectedRow === row.id;
                  return (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedRow(row.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? (isAnomali ? 'bg-red-50/80 ring-1 ring-inset ring-red-200' : 'bg-green-50/80 ring-1 ring-inset ring-green-200') : 
                        isAnomali ? 'hover:bg-red-50/30' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-4 px-4 font-semibold text-[#0D1B3E] text-sm">{row.item}</td>
                      <td className="py-4 px-4 text-sm font-medium">{row.prop}</td>
                      <td className="py-4 px-4 text-sm text-slate-500">{row.ekat}</td>
                      <td className={`py-4 px-4 text-sm font-bold ${isAnomali ? 'text-[#C0392B]' : 'text-slate-600'}`}>
                        <div className="flex items-center">
                          {isAnomali && <ArrowUpRight className="w-3 h-3 mr-1" strokeWidth={3} />}
                          {row.diff}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          isAnomali ? 'bg-[#C0392B] text-white' : 'bg-[#27AE60] text-white'
                        }`}>
                          {isAnomali ? <AlertCircle className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Right Detail Chart Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col h-full">
            <h3 className="font-bold text-[#0D1B3E] mb-1">Analisis Perbandingan</h3>
            <p className="text-xs text-slate-500 mb-6 font-mono">ID: #ORD-LPT-2026-X11</p>
            
            {/* Visual Bar Chart comparing values */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="flex items-end justify-center space-x-6 w-full h-48 border-b-2 border-slate-100 pb-2 relative">
                {/* Proposed Value Bar */}
                <div className="flex flex-col items-center group w-1/3">
                  <div className="text-xs font-bold text-[#C0392B] mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4">Rp 25.4 M</div>
                  <div className="w-16 bg-[#C0392B] rounded-t-sm shadow-inner transition-all duration-700 ease-out" style={{height: '95%'}}></div>
                  <div className="text-xs font-semibold text-slate-600 mt-3 text-center">Harga <br/> Diajukan</div>
                </div>

                {/* Vertical Line indicator */}
                <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-slate-300 -z-10">
                  <span className="absolute -top-3 right-0 text-[10px] text-slate-400 bg-white px-1 font-mono">Median LKPP</span>
                </div>

                {/* Katalog Value Bar */}
                <div className="flex flex-col items-center group w-1/3">
                  <div className="text-xs font-bold text-[#DFA000] mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-[30%]">Rp 16.8 M</div>
                  <div className="w-16 bg-[#DFA000] rounded-t-sm shadow-inner transition-all duration-700 ease-out" style={{height: '60%'}}></div>
                  <div className="text-xs font-semibold text-slate-600 mt-3 text-center">Rata-rata <br/> e-Katalog</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-slate-50 p-4 rounded-lg border border-slate-100 relative">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Sistem AI mendeteksi mark-up sebesar <strong className="text-[#C0392B]">+51%</strong> untuk item <strong className="text-navy">Laptop Core i7 16GB</strong> dibandingkan dengan riwayat transaksi pengadaan e-Katalog se-Provinsi Jawa Barat dalam 12 bulan terakhir.
              </p>
            </div>
            
            <button className="mt-6 w-full py-2.5 bg-[#0069D9] hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
              Tandai Rekaman Siluman & Blokir
            </button>
            <p className="text-center text-[10px] mt-4 text-slate-400">Sumber: e-Katalog LKPP 2026 (Real-time DB)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
