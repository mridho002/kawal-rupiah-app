'use client'

import { Lock, Server, Link as LinkIcon, Download, FileText, CheckCircle2, ArrowRight, Shield, AlertTriangle } from "lucide-react";

export default function AuditTrailScreen() {
  const transactions = [
    { id: "1026", time: "2026-03-14 10:45:12", type: "Revisi RKB", entity: "Pemkab Bandung", amount: "Rp 25.4 M", hash: "0x8g2u...kc84", prevHash: "0x7f3b...9a21", status: "TERVERIFIKASI", nodes: "3/3" },
    { id: "1025", time: "2026-03-14 09:21:05", type: "SOP: Stop Payment", entity: "Sistem KAWAL", amount: "-", hash: "0x7f3b...9a21", prevHash: "0x5e1a...2b8c", status: "EXECUTED", nodes: "3/3" },
    { id: "1024", time: "2026-03-13 16:11:43", type: "Pembayaran Vendor (Suspended)", entity: "CV Maju Jaya", amount: "Rp 12.5 M", hash: "0x5e1a...2b8c", prevHash: "0x9d4c...1e7f", status: "ANOMALI DETECTED", nodes: "2/3" },
    { id: "1023", time: "2026-03-13 14:02:18", type: "Bukti Foto Upload (Warga)", entity: "Citizen #827", amount: "Reward Rp 15K", hash: "0x9d4c...1e7f", prevHash: "0x2a9b...cf4e", status: "TERVERIFIKASI", nodes: "3/3" },
    { id: "1022", time: "2026-03-12 11:30:22", type: "Persetujuan Anggaran (KUA-PPAS)", entity: "DPRD Kab. Bandung", amount: "Rp 150 M", hash: "0x2a9b...cf4e", prevHash: "0x1c8f...a3d7", status: "TERVERIFIKASI", nodes: "3/3" },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes('ANOMALI')) return { bg: 'bg-red-50', text: 'text-[#C0392B]', border: 'border-red-100', dot: 'bg-[#C0392B]' };
    if (status.includes('EXECUTED')) return { bg: 'bg-amber-50', text: 'text-[#DFA000]', border: 'border-amber-100', dot: 'bg-[#DFA000]' };
    return { bg: 'bg-green-50', text: 'text-[#27AE60]', border: 'border-green-100', dot: 'bg-[#27AE60]' };
  };

  return (
    <div className="space-y-6 max-w-full pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center text-[#0D1B3E]">
            <Lock className="w-6 h-6 mr-3 text-[#27AE60]" />
            Audit Trail — Catatan Tidak Dapat Dihapus
          </h2>
          <p className="text-sm text-[#8899AA] mt-1 pl-9">Bukti tak terbantahkan dengan Hyperledger Fabric (Enterprise DLT)</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
          <Download className="w-4 h-4" />
          <span>Export BPK Report</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Blok</p>
          <p className="text-2xl font-black text-[#0D1B3E]">1,026</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Terverifikasi</p>
          <p className="text-2xl font-black text-[#27AE60]">1,019</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Anomali Tercatat</p>
          <p className="text-2xl font-black text-[#C0392B]">7</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">Konsensus Node</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27AE60]"></span>
            <span className="text-sm font-bold text-[#0D1B3E]">3/3 Active</span>
          </div>
        </div>
      </div>

      {/* Block Chain Visualization */}
      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(13,27,62,0.04)] border border-slate-100 p-6">
        <h3 className="font-bold text-[#0D1B3E] mb-6 text-sm flex items-center">
          <Shield className="w-4 h-4 mr-2 text-[#0069D9]" />
          Rantai Blok Terbaru (5 Blok Terakhir)
        </h3>

        {/* Chain line background connecting all blocks */}
        <div className="relative mb-10">
          <div className="flex items-stretch gap-0 overflow-x-auto pb-4 custom-scrollbar">
            {[1022, 1023, 1024, 1025, 1026].map((blockNum, idx) => {
              const tx = transactions.find(t => t.id === blockNum.toString());
              const isWarning = tx?.status.includes('ANOMALI');
              const isLatest = idx === 4;
              const colors = getStatusColor(tx?.status || '');

              return (
                <div key={blockNum} className="flex items-center">
                  {/* Block Card */}
                  <div className={`w-[220px] flex-shrink-0 bg-white border-2 rounded-xl p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md relative ${
                    isLatest ? 'border-[#DFA000] ring-4 ring-[#DFA000]/10' :
                    isWarning ? 'border-[#C0392B] ring-2 ring-red-50' : 'border-slate-200'
                  }`}>
                    {/* Block header */}
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isLatest ? 'bg-[#DFA000]/10 text-[#DFA000]' : 'text-slate-500 bg-slate-50'
                      }`}>
                        Block #{blockNum}
                        {isLatest && ' 🔥'}
                      </span>
                      <Server className={`w-3.5 h-3.5 ${isLatest ? 'text-[#DFA000]' : 'text-slate-400'}`} />
                    </div>

                    {/* Transaction info */}
                    <p className="text-xs font-semibold text-[#0D1B3E] leading-tight mb-1">{tx?.type}</p>
                    <p className="text-[10px] text-slate-400 mb-2">{tx?.entity}</p>
                    <p className={`text-base font-bold tracking-tight mb-3 ${isWarning ? 'text-[#C0392B]' : 'text-[#0069D9]'}`}>
                      {tx?.amount}
                    </p>

                    {/* Hash */}
                    <div className="bg-slate-50 px-2 py-1.5 text-[10px] font-mono text-slate-500 rounded border border-slate-100 flex items-center mb-2">
                      <LinkIcon className="w-3 h-3 mr-1.5 shrink-0" />
                      {tx?.hash}
                    </div>

                    {/* Prev hash */}
                    <div className="text-[9px] font-mono text-slate-400 mb-3 truncate">
                      prev: {tx?.prevHash}
                    </div>

                    {/* Status badge */}
                    <div className={`px-2 py-1.5 rounded-lg text-[10px] uppercase font-bold text-center w-full flex items-center justify-center ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {!isWarning && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {isWarning && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {tx?.status}
                    </div>

                    {/* Node consensus */}
                    <div className="mt-2 text-center">
                      <span className="text-[9px] text-slate-400">Nodes: {tx?.nodes}</span>
                    </div>
                  </div>

                  {/* Chain Arrow Connector */}
                  {idx < 4 && (
                    <div className="flex items-center px-1 shrink-0">
                      <div className="w-6 h-0.5 bg-slate-300"></div>
                      <ArrowRight className="w-4 h-4 text-slate-400 -ml-1 shrink-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Table Ledger */}
        <h3 className="font-bold text-[#0D1B3E] mb-4 text-sm border-b border-slate-100 pb-3 flex items-center">
          <FileText className="w-4 h-4 mr-2 text-slate-400" />
          Log Transaksi DLT (Real-time)
        </h3>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#0D1B3E] text-white">
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Block</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Waktu</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Jenis Transaksi</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Entitas</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Jumlah</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Hash (SHA-256)</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-center">Konsensus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => {
                const colors = getStatusColor(tx.status);
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-bold text-[#0D1B3E] bg-slate-50 px-2 py-1 rounded border border-slate-100">#{tx.id}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 font-mono whitespace-nowrap">{tx.time}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center">
                        <FileText className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                        <span className="font-semibold text-[#0D1B3E] text-xs">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{tx.entity}</td>
                    <td className="py-3.5 px-4 text-sm font-medium whitespace-nowrap">{tx.amount}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        {tx.hash} <Lock className="w-3 h-3 ml-2 text-slate-400" />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer — Node Status */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#27AE60]" />
            <span className="font-medium">Powered by Hyperledger Fabric v2.5</span>
          </div>
          <div className="flex space-x-5">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#27AE60] mr-2 animate-pulse"></span>Node KPK: Connected</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#DFA000] mr-2 animate-pulse"></span>Node BPK: Syncing</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#27AE60] mr-2 animate-pulse"></span>Node BI: Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
