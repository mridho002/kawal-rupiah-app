'use client'

import { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, AlertCircle, CheckCircle, MapPin, Upload } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const tooltipStyle = {
  borderRadius: '10px',
  border: '1px solid rgba(148,163,184,0.2)',
  background: 'rgba(17,24,39,0.95)',
  fontSize: '11px',
  color: '#F1F5F9',
} as const;

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
  const [data, setData] = useState(tableData);
  const [selectedRow, setSelectedRow] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const selected = data.find(r => r.id === selectedRow) ?? data[0];
  const isAnomaliSelected = selected.status === "ANOMALI";

  const chartData = [
    { name: "Diajukan", value: selected.propUnit },
    { name: "e-Katalog", value: selected.ekatUnit },
  ];

  const filteredData = data.filter(r =>
    r.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.daerah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStep("Mengurai RKA APBD dengan LayoutLM OCR...");

    const steps = [
      { p: 25, s: "Sanitasi RAG (deteksi & hapus indirect prompt injection)..." },
      { p: 50, s: "Pemetaan semantik RKA ke e-Katalog (IndoBERT)..." },
      { p: 75, s: "Membangun Pricing Frontier via LKPP, LPSE & retail APIs..." },
      { p: 100, s: "Selesai! Anomali tercatat ke Hyperledger Fabric." }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setUploadProgress(steps[i].p);
        setUploadStep(steps[i].s);
        i++;
      } else {
        clearInterval(interval);
        setIsUploading(false);
        const newItem = {
          id: 99, item: "Tablet Edukasi 10\" (E-Learning)", satuan: "Unit", qty: 1500,
          propUnit: 4.8, ekatUnit: 3.1, propTotal: "Rp 7.200.000.000", ekatTotal: "Rp 4.650.000.000",
          diff: "+54.8%", daerah: "Kota Surakarta, Jateng", tahun: "2026", status: "ANOMALI" as const
        };
        setData([newItem, ...data]);
        setSelectedRow(newItem.id);
        alert("🎉 RKA APBD Berhasil Diimpor! Terdeteksi 1 anomali kritis (+54,8% mark-up). Bukti dicatat di Hyperledger Fabric.");
      }
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-50">Price Oracle</h2>
          <p className="text-sm text-slate-400 mt-1">AI deteksi anomali harga pengadaan — Sumber: e-Katalog LKPP (real-time)</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSimulatedUpload}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-[#022c22] rounded-xl transition-all text-sm font-bold active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? "Memproses RKA..." : "Simulasi Unggah RKA"}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 text-slate-300 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /><span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-xl hover:bg-gold-500/20 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" /><span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gs-card accent-bar accent-info p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Total Item Dianalisis</p>
          <p className="text-2xl font-bold text-slate-100 font-data">{data.length}</p>
        </div>
        <div className="gs-card accent-bar accent-danger p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Terdeteksi Anomali</p>
          <p className="text-2xl font-bold text-red-400 font-data">{data.filter(r => r.status === "ANOMALI").length}</p>
        </div>
        <div className="gs-card accent-bar accent-emerald p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Status Normal</p>
          <p className="text-2xl font-bold text-brand-400 font-data">{data.filter(r => r.status === "NORMAL").length}</p>
        </div>
        <div className="gs-card accent-bar accent-gold p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Threshold Anomali</p>
          <p className="text-2xl font-bold text-gold-400 font-data">&gt;15%</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="gs-panel p-6">
        {/* Upload Progress Banner */}
        {isUploading && (
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 mb-6 space-y-2.5">
            <div className="flex justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-400 mr-2 animate-ping" />
                Pipeline Kognitif: {uploadStep}
              </span>
              <span className="font-data">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-gold-500 rounded-full transition-all duration-500" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari item pengadaan, spesifikasi, atau daerah..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Table */}
          <div className="xl:col-span-3 border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-white/[0.04] text-slate-400">
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Item / Spek</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Satuan</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-center">Qty</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Diajukan</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">e-Katalog</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-center">Selisih</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider">Daerah</th>
                    <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredData.map((row) => {
                    const isAnomali = row.status === "ANOMALI";
                    const isSelected = selectedRow === row.id;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedRow(row.id)}
                        className={`cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? isAnomali ? 'bg-red-500/10 ring-1 ring-inset ring-red-500/30' : 'bg-brand-500/10 ring-1 ring-inset ring-brand-500/30'
                            : 'hover:bg-white/[0.03]'
                        }`}
                      >
                        <td className="py-3.5 px-3 font-semibold text-slate-100 text-sm">{row.item}</td>
                        <td className="py-3.5 px-3 text-xs text-slate-500 font-medium">{row.satuan}</td>
                        <td className="py-3.5 px-3 text-sm font-bold text-center text-slate-200 font-data">{row.qty.toLocaleString('id-ID')}</td>
                        <td className="py-3.5 px-3 text-sm font-medium text-slate-200 font-data">Rp {row.propUnit} Jt</td>
                        <td className="py-3.5 px-3 text-sm text-slate-500 font-data">Rp {row.ekatUnit} Jt</td>
                        <td className={`py-3.5 px-3 text-sm font-bold text-center font-data ${isAnomali ? 'text-red-400' : 'text-slate-400'}`}>
                          <div className="flex items-center justify-center">
                            {isAnomali && <ArrowUpRight className="w-3 h-3 mr-0.5" strokeWidth={3} />}
                            {row.diff}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center text-xs text-slate-400">
                            <MapPin className="w-3 h-3 mr-1 text-slate-500 shrink-0" />
                            <span className="truncate max-w-[120px]">{row.daerah}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isAnomali ? 'bg-red-500/15 text-red-400 border border-red-500/20' : 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
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

          {/* Detail Panel */}
          <div className={`rounded-xl border p-5 flex flex-col ${
            isAnomaliSelected ? 'border-red-500/20 bg-red-500/[0.04]' : 'border-brand-500/20 bg-brand-500/[0.04]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-100 text-sm">Analisis Detail</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                isAnomaliSelected ? 'bg-red-500/15 text-red-400 border border-red-500/20' : 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
              }`}>{selected.status}</span>
            </div>

            <div className="bg-white/[0.03] rounded-lg border border-white/[0.06] p-3 mb-4">
              <p className="font-bold text-slate-100 text-sm mb-2 truncate">{selected.item}</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Daerah:</span><span className="font-medium text-slate-200">{selected.daerah}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Qty:</span><span className="font-bold text-slate-200 font-data">{selected.qty.toLocaleString('id-ID')} {selected.satuan}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Total Diajukan:</span><span className="font-bold text-red-400 font-data">{selected.propTotal}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Total e-Katalog:</span><span className="font-medium text-blue-400 font-data">{selected.ekatTotal}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">TA:</span><span className="font-medium text-slate-300 font-data">{selected.tahun}</span></div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Perbandingan Harga Satuan</p>
            <div className="h-44 w-full bg-white/[0.02] rounded-lg border border-white/[0.06] p-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}Jt`} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(148,163,184,0.06)' }} formatter={(value) => [`Rp ${value} Juta`, 'Harga']} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
                    <Cell key="c0" fill={isAnomaliSelected ? '#EF4444' : '#10B981'} />
                    <Cell key="c1" fill="#3B82F6" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={`mt-4 p-3 rounded-lg border text-xs leading-relaxed font-medium ${
              isAnomaliSelected ? 'bg-red-500/[0.06] border-red-500/15 text-slate-300' : 'bg-brand-500/[0.06] border-brand-500/15 text-slate-300'
            }`}>
              <p className="font-bold text-slate-200 mb-1 text-[10px] uppercase tracking-wider flex items-center gap-1">🤖 AI Kesimpulan</p>
              {isAnomaliSelected
                ? <p>Harga satuan <strong className="text-red-400 font-data">Rp {selected.propUnit} Jt</strong> berada <strong className="text-red-400">{selected.diff}</strong> di atas harga wajar e-Katalog <strong className="text-blue-400 font-data">Rp {selected.ekatUnit} Jt</strong>. Dengan qty <strong className="text-slate-200 font-data">{selected.qty.toLocaleString('id-ID')}</strong>, potensi kerugian negara <strong className="text-red-400 font-data">Rp {((selected.propUnit - selected.ekatUnit) * selected.qty).toFixed(0)} Jt</strong>.</p>
                : <p>Harga <strong className="text-slate-100">{selected.item}</strong> dalam rentang wajar. Selisih <strong className="text-brand-400">{selected.diff}</strong> masih di bawah threshold (&lt;15%).</p>
              }
            </div>

            <button className={`mt-4 w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
              isAnomaliSelected ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-brand-500 hover:bg-brand-600 text-[#022c22]'
            }`}>
              {isAnomaliSelected ? '🚨 Tandai & Blokir Pembayaran' : '✅ Tandai sebagai Wajar'}
            </button>
            <p className="text-center text-[9px] mt-2 text-slate-500">Sumber: e-Katalog LKPP 2026 (real-time)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
