'use client'

import { Lock, Server, Link as LinkIcon, Download, FileText, CheckCircle2, ArrowRight, Shield, AlertTriangle } from "lucide-react";

export default function AuditTrailScreen() {
  const transactions = [
    { id: "1026", time: "2026-03-14 10:45:12", type: "Revisi RKB", entity: "Pemkab Bandung", amount: "Rp 25,4 M", hash: "0x8g2u...kc84", prevHash: "0x7f3b...9a21", status: "TERVERIFIKASI", nodes: "3/3" },
    { id: "1025", time: "2026-03-14 09:21:05", type: "SOP: Stop Payment", entity: "Sistem KAWAL", amount: "-", hash: "0x7f3b...9a21", prevHash: "0x5e1a...2b8c", status: "EXECUTED", nodes: "3/3" },
    { id: "1024", time: "2026-03-13 16:11:43", type: "Pembayaran Vendor (Suspended)", entity: "CV Maju Jaya", amount: "Rp 12,5 M", hash: "0x5e1a...2b8c", prevHash: "0x9d4c...1e7f", status: "ANOMALI DETECTED", nodes: "2/3" },
    { id: "1023", time: "2026-03-13 14:02:18", type: "Bukti Foto Upload (Warga)", entity: "Citizen #827", amount: "Reward Rp 15K", hash: "0x9d4c...1e7f", prevHash: "0x2a9b...cf4e", status: "TERVERIFIKASI", nodes: "3/3" },
    { id: "1022", time: "2026-03-12 11:30:22", type: "Persetujuan Anggaran (KUA-PPAS)", entity: "DPRD Kab. Bandung", amount: "Rp 150 M", hash: "0x2a9b...cf4e", prevHash: "0x1c8f...a3d7", status: "TERVERIFIKASI", nodes: "3/3" },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes('ANOMALI')) return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
    if (status.includes('EXECUTED')) return { bg: 'bg-gold-500/10', text: 'text-gold-400', border: 'border-gold-500/20' };
    return { bg: 'bg-brand-500/10', text: 'text-brand-400', border: 'border-brand-500/20' };
  };

  return (
    <div className="space-y-6 max-w-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center text-slate-50">
            <Lock className="w-6 h-6 mr-3 text-brand-400" />
            Audit Trail — Immutable Ledger
          </h2>
          <p className="text-sm text-slate-400 mt-1 pl-9">Bukti tak terbantahkan dengan Hyperledger Fabric (Enterprise DLT)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 text-slate-300 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium w-fit">
          <Download className="w-4 h-4" /><span>Export BPK Report</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gs-card accent-bar accent-info p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Total Blok</p>
          <p className="text-2xl font-bold text-slate-100 font-data">1.026</p>
        </div>
        <div className="gs-card accent-bar accent-emerald p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Terverifikasi</p>
          <p className="text-2xl font-bold text-brand-400 font-data">1.019</p>
        </div>
        <div className="gs-card accent-bar accent-danger p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Anomali Tercatat</p>
          <p className="text-2xl font-bold text-red-400 font-data">7</p>
        </div>
        <div className="gs-card accent-bar accent-gold p-4 pl-5">
          <p className="text-xs text-slate-400 font-medium mb-1">Konsensus Node</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 pulse-live"></span>
            <span className="text-sm font-bold text-slate-100 font-data">3/3 Active</span>
          </div>
        </div>
      </div>

      {/* Block Chain Visualization */}
      <div className="gs-panel p-6">
        <h3 className="font-bold text-slate-100 mb-6 text-sm flex items-center">
          <Shield className="w-4 h-4 mr-2 text-blue-400" />
          Rantai Blok Terbaru (5 Blok Terakhir)
        </h3>

        <div className="relative mb-10">
          <div className="flex items-stretch gap-0 overflow-x-auto pb-4 custom-scrollbar">
            {[1022, 1023, 1024, 1025, 1026].map((blockNum, idx) => {
              const tx = transactions.find(t => t.id === blockNum.toString());
              const isWarning = tx?.status.includes('ANOMALI');
              const isLatest = idx === 4;
              const colors = getStatusColor(tx?.status || '');

              return (
                <div key={blockNum} className="flex items-center">
                  <div className={`w-[220px] flex-shrink-0 rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 relative bg-white/[0.02] border ${
                    isLatest ? 'border-gold-500/40 ring-2 ring-gold-500/10 glow-gold' :
                    isWarning ? 'border-red-500/40 ring-2 ring-red-500/5' : 'border-white/[0.08]'
                  }`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-data ${
                        isLatest ? 'bg-gold-500/15 text-gold-400' : 'text-slate-400 bg-white/5'
                      }`}>
                        #{blockNum}{isLatest && ' 🔥'}
                      </span>
                      <Server className={`w-3.5 h-3.5 ${isLatest ? 'text-gold-400' : 'text-slate-500'}`} />
                    </div>

                    <p className="text-xs font-semibold text-slate-100 leading-tight mb-1">{tx?.type}</p>
                    <p className="text-[10px] text-slate-500 mb-2">{tx?.entity}</p>
                    <p className={`text-base font-bold tracking-tight mb-3 font-data ${isWarning ? 'text-red-400' : 'text-blue-400'}`}>
                      {tx?.amount}
                    </p>

                    <div className="bg-white/[0.03] px-2 py-1.5 text-[10px] font-data text-slate-400 rounded border border-white/[0.06] flex items-center mb-2">
                      <LinkIcon className="w-3 h-3 mr-1.5 shrink-0" />
                      {tx?.hash}
                    </div>

                    <div className="text-[9px] font-data text-slate-600 mb-3 truncate">
                      prev: {tx?.prevHash}
                    </div>

                    <div className={`px-2 py-1.5 rounded-lg text-[10px] uppercase font-bold text-center w-full flex items-center justify-center ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {!isWarning && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {isWarning && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {tx?.status}
                    </div>

                    <div className="mt-2 text-center">
                      <span className="text-[9px] text-slate-500 font-data">Nodes: {tx?.nodes}</span>
                    </div>
                  </div>

                  {idx < 4 && (
                    <div className="flex items-center px-1 shrink-0">
                      <div className="w-6 h-0.5 bg-white/15"></div>
                      <ArrowRight className="w-4 h-4 text-slate-600 -ml-1 shrink-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Table Ledger */}
        <h3 className="font-bold text-slate-100 mb-4 text-sm border-b border-white/[0.06] pb-3 flex items-center">
          <FileText className="w-4 h-4 mr-2 text-slate-500" />
          Log Transaksi DLT (real-time)
        </h3>

        <div className="overflow-x-auto custom-scrollbar rounded-lg border border-white/[0.06]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/[0.04] text-slate-400">
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Block</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Waktu</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Jenis Transaksi</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Entitas</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Jumlah</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider">Hash (SHA-256)</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-center">Konsensus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {transactions.map((tx) => {
                const colors = getStatusColor(tx.status);
                return (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-bold text-slate-200 bg-white/5 px-2 py-1 rounded border border-white/[0.06] font-data">#{tx.id}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 font-data whitespace-nowrap">{tx.time}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center">
                        <FileText className="w-3.5 h-3.5 mr-2 text-slate-500 shrink-0" />
                        <span className="font-semibold text-slate-100 text-xs">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{tx.entity}</td>
                    <td className="py-3.5 px-4 text-sm font-medium text-slate-200 font-data whitespace-nowrap">{tx.amount}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center text-[10px] font-data text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/[0.06]">
                        {tx.hash} <Lock className="w-3 h-3 ml-2 text-slate-500" />
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
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500 border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-400" />
            <span className="font-medium">Powered by Hyperledger Fabric v2.5</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-brand-400 mr-2 pulse-live"></span>Node KPK: Connected</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-gold-400 mr-2 pulse-live"></span>Node BPK: Syncing</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-brand-400 mr-2 pulse-live"></span>Node BI: Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
