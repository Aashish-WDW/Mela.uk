import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { buyers, products } from "@/lib/seed";
import { Users as UsersIcon, Search, Filter, ShoppingBag, Clock, FileText, ChevronRight, Calendar, Download } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  // Mock sales data for each user
  const salesHistory = [
    { id: "s-101", productId: "p-001", price: 24.50, timestamp: "2026-05-10 14:32", date: "2026-05-10" },
    { id: "s-102", productId: "p-003", price: 18.20, timestamp: "2026-05-09 10:15", date: "2026-05-09" },
    { id: "s-103", productId: "p-005", price: 85.00, timestamp: "2026-05-08 16:45", date: "2026-05-08" },
    { id: "s-104", productId: "p-002", price: 32.00, timestamp: "2026-05-10 11:20", date: "2026-05-10" },
    { id: "s-105", productId: "p-004", price: 12.50, timestamp: "2026-05-09 09:45", date: "2026-05-09" },
  ];

  const uniqueDates = Array.from(new Set(salesHistory.map(s => s.date))).sort().reverse();

  const handleOpenUser = (user: any) => {
    setSelectedUser(user);
    if (uniqueDates.length > 0) {
      setSelectedDate(uniqueDates[0]);
    }
  };

  const filteredSales = selectedDate 
    ? salesHistory.filter(s => s.date === selectedDate)
    : [];

  const handleDownloadAudit = () => {
    if (!selectedUser) return;
    flash(`Transactional audit for ${selectedUser.name} exported.`);
    
    const rows = [
      ["Date", "Time", "Product", "Price"],
      ...salesHistory.map(s => {
        const p = products.find(prod => prod.id === s.productId);
        return [s.date, s.timestamp.split(' ')[1], p?.name || 'Unknown', s.price.toString()];
      })
    ];
    
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `mela_audit_${selectedUser.id}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Network Oversight"
        title="Hub Users"
        sub="Comprehensive list of verified network participants and their transactional lifecycle."
      />

      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Filter hub users..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-slate-300 px-4 py-2 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 uppercase tracking-widest">
               <Filter className="w-3.5 h-3.5" /> Segment
            </button>
         </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buyers.map((u) => (
          <div key={u.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all group cursor-pointer overflow-hidden" onClick={() => handleOpenUser(u)}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl border border-slate-100 p-0.5 bg-white overflow-hidden shadow-sm">
                  <img src={u.image} alt={u.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{u.name}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{u.segment}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-t border-slate-50 pt-4">
                 <div className="flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />
                    {u.orders} Orders
                 </div>
                 <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        open={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
        title={selectedUser?.name} 
        description={`Account history for ${selectedUser?.contact} · Registered ${selectedUser?.since}`}
        size="lg"
      >
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Historical Ledger
             </h4>
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Audit Date</span>
                <select 
                  className="mela-input text-xs font-bold py-1.5 min-w-[160px]" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {uniqueDates.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
             </div>
          </div>

          <div>
             <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-50 overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-100/50 border-b border-slate-200">
                      <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-slate-500">Product Acquisitions</th>
                      <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-slate-500">Settlement Price</th>
                      <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-slate-500">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredSales.length > 0 ? filteredSales.map((s) => {
                      const p = products.find(prod => prod.id === s.productId);
                      return (
                        <tr key={s.id}>
                          <td className="px-4 py-4">
                            <div className="text-xs font-bold text-slate-900">{p?.name}</div>
                            <div className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{p?.sku} · {p?.unit}</div>
                          </td>
                          <td className="px-4 py-4 text-xs font-black text-slate-900">£{s.price.toFixed(2)}</td>
                          <td className="px-4 py-4">
                             <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                <Clock className="w-3 h-3 text-slate-400" /> {s.timestamp.split(' ')[1]}
                             </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-xs font-bold text-slate-400 italic">No transactional data for this date.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
             </div>
             <div className="mt-4 flex justify-between items-center px-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Date Total</div>
                <div className="text-sm font-black text-blue-600">
                   £{filteredSales.reduce((acc, s) => acc + s.price, 0).toFixed(2)}
                </div>
             </div>
          </div>

          <div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Administrative Notes
             </h4>
             <textarea
               className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
               rows={4}
               placeholder="Enter institutional notes regarding this buyer entity..."
               value={selectedUser ? (notes[selectedUser.id] || "") : ""}
               onChange={(e) => {
                 if (selectedUser) {
                   setNotes(prev => ({ ...prev, [selectedUser.id]: e.target.value }));
                 }
               }}
             />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-100">
             <button 
                onClick={handleDownloadAudit}
                className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors"
             >
                <Download className="w-4 h-4" /> Export Complete Ledger
             </button>
             <button onClick={() => setSelectedUser(null)} className="mela-button-primary px-10">Finalize Audit</button>
          </div>
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest px-8 py-3 rounded-md shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300 border-b-4 border-blue-500">
          {toast}
        </div>
      )}
    </div>
  );
}
