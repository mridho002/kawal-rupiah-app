'use client'

import { Lock, Server, Link as LinkIcon, Download, FileText, CheckCircle2 } from "lucide-react";

export default function AuditTrailScreen() {
  const transactions = [
    { id: "1026", time: "2026-03-14 10:45:12", type: "Revisi RKB", amount: "Rp 25.4 M", hash: "0x8g2u...kc84", status: "TERVERIFIKASI" },
    { id: "1025", time: "2026-03-14 09:21:05", type: "SOP Triggered: Stop Payment", amount: "-", hash: "0x7f3b...9a21", status: "EXECUTED" },
    { id: "1024", time: "2026-03-13 16:11:43", type: "Pembayaran Vendor (Suspended)", amount: "Rp 12.5 M", hash: "0x5e1a...2b8c", status: "ANOMALI DETECTED" },
    { id: "1023", time: "2026-03-13 14:02:18", type: "Bukti Foto Upload (Warga)", amount: "Reward Rp 15K", hash: "0x9d4c...1e7f", status: "TERVERIFIKASI" },
    { id: "1022", time: "2026-03-12 11:30:22", type: "Persetujuan Anggaran (KUA-PPAS)", amount: "Rp 150 M", hash: "0x2a9b...cf4e", status: "TERVERIFIKASI" },
  ];

  return (
    <div className="space-y-6 max-w-full pb-20">
      <div className="flex justify-between items-center mb-6">
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

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(13,27,62,0.04)] border border-slate-100 p-8 overflow-hidden">
        {/* Animated Blocks Visualization */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full border-t-2 border-slate-200 -z-10 translate-y-[-50%]"></div>
          
          <div className="flex justify-between items-center space-x-4 overflow-x-auto pb-4 custom-scrollbar">
            {[1022, 1023, 1024, 1025, 1026].map((blockNum, idx) => {
              const tx = transactions.find(t => t.id === blockNum.toString());
              const isWarning = tx?.status.includes('ANOMALI') || tx?.status.includes('Stop');
              
              return (
                <div key={blockNum} className={`min-w-[240px] flex-shrink-0 bg-white border-2 rounded-xl p-5 shadow-sm transition-transform hover:-translate-y-1 relative group bg-clip-border ${
                  idx === 4 ? 'border-[#DFA000] ring-4 ring-gold/10' : 
                  isWarning ? 'border-[#C0392B]' : 'border-slate-200'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Block #{blockNum}</span>
                    <Server className={`w-4 h-4 ${idx === 4 ? 'text-[#DFA000]' : 'text-slate-400'}`} />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-[#0D1B3E] truncate">{tx?.type || "Transaksi Sistem"}</p>
                    <p className={`text-lg font-bold tracking-tight mt-1 ${isWarning ? 'text-[#C0392B]' : 'text-[#0069D9]'}`}>
                      {tx?.amount || "-"}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 p-2 text-xs font-mono text-slate-500 rounded border border-slate-100 flex items-center mb-4">
                    <LinkIcon className="w-3 h-3 mr-2" />
                    {tx?.hash || "0x..."}
                  </div>

                  <div className={`px-2 py-1.5 rounded-full text-[10px] uppercase font-bold text-center w-full flex items-center justify-center ${
                    isWarning ? 'bg-red-50 text-[#C0392B]' : 
                    idx === 4 ? 'bg-blue-50 text-[#0069D9]' : 'bg-green-50 text-[#27AE60]'
                  }`}>
                    {!isWarning && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {tx?.status || "VALIDATED"}
                  </div>

                  {idx < 4 && (
                    <div className="absolute top-1/2 -right-6 text-slate-300 w-4 h-4">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabular Ledger view */}
        <h3 className="font-bold text-[#0D1B3E] mb-4 text-lg border-b border-slate-100 pb-2">Log Transaksi DLT (Real-time)</h3>
        
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Waktu</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Transaksi</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Jumlah</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hash (SHA-256)</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status Konsensus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => {
                const isWarning = tx.status.includes('ANOMALI') || tx.status.includes('EXECUTED');
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm text-slate-500 font-mono whitespace-nowrap">{tx.time}</td>
                    <td className="py-4 px-4 font-semibold text-[#0D1B3E] text-sm flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-slate-400" />
                      {tx.type}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium whitespace-nowrap">{tx.amount}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-xs font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded inline-block border border-slate-100">
                        {tx.hash} <Lock className="w-3 h-3 ml-2 text-slate-400 inline" />
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${
                        isWarning ? 'bg-red-50 text-[#C0392B] border border-red-100' : 'bg-[#DFA000]/10 text-[#DFA000] border border-[#DFA000]/20'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4">
          <p>Powered by Hyperledger Fabric</p>
          <div className="flex space-x-4">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Node KPK: Connected</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Node BPK: Syncing</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Node BI: Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
