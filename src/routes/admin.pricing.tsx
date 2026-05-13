import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { products } from "@/lib/seed";
import { Package, BarChart3, Plus, History, Download, FileSpreadsheet } from "lucide-react";

export const Route = createFileRoute("/admin/pricing")({
  component: Pricing,
});

function Pricing() {
  // Mock price history data
  const [priceHistory, setPriceHistory] = useState(
    products.map(p => ({
      ...p,
      history: [
        { date: "2026-04-01", price: 24.50, trend: "up" as const },
        { date: "2026-04-15", price: 23.90, trend: "down" as const },
        { date: "2026-05-01", price: 25.20, trend: "up" as const },
      ]
    }))
  );

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newPrice, setNewPrice] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [toast, setToast] = useState("");

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const handleAddPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !newPrice) return;

    const price = parseFloat(newPrice);
    const lastPrice = selectedProduct.history[selectedProduct.history.length - 1].price;
    const trend = price >= lastPrice ? "up" : "down";

    setPriceHistory(prev => prev.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          history: [...p.history, { date: newDate, price, trend }]
        };
      }
      return p;
    }));

    setToast(`Price log updated for ${selectedProduct.sku}`);
    setSelectedProduct(null);
    setNewPrice("");
    flash(`Valuation synchronized for ${selectedProduct.sku}`);
  };

  const handleDownloadReport = () => {
    flash("Market analysis report compiled and downloaded.");
    // Mock CSV download
    const rows = [
      ["SKU", "Product", "Unit", "Current Price", "Last Date"],
      ...priceHistory.map(p => [p.sku, p.name, p.unit, p.history[p.history.length-1].price.toString(), p.history[p.history.length-1].date])
    ];
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `mela_pricing_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Market Analytics"
        title="Institutional Price History"
        sub="Monitor trade valuations across the London Hub network. Track SKU performance against logistics overheads."
        action={
          <button 
            onClick={handleDownloadReport}
            className="border border-slate-300 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-50 transition-all flex items-center gap-2 uppercase tracking-widest text-slate-700 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        }
      />

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Product SKU</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Weight / Size</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Current Valuation</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Price Log</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {priceHistory.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                       <Package className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{p.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-slate-600 italic">
                  {p.unit}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase">£</span>
                    <span className="text-lg font-black text-slate-900">{(p.history[p.history.length - 1].price).toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-4">
                    {p.history.slice(-4).map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 group/item relative">
                        <div className={`w-2 h-2 rounded-full ${h.trend === 'up' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">£{h.price.toFixed(2)}</div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20">
                           {h.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                   <button 
                    onClick={() => setSelectedProduct(p)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Add Price Record"
                   >
                      <Plus className="w-5 h-5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-950 p-8 rounded-2xl text-white shadow-xl">
           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" /> Inflationary Forecast
           </div>
           <div className="text-4xl font-black tracking-tighter italic">+1.4%</div>
           <p className="text-xs text-slate-400 mt-4 font-medium leading-relaxed">Anticipated variance across F&B sectors due to logistics escalation in London NW10.</p>
        </div>
      </div>

      <Modal 
        open={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        title="Log New Valuation" 
        description={`Add a historical price record for ${selectedProduct?.sku}`}
        size="md"
      >
        <form onSubmit={handleAddPrice} className="space-y-6">
           <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <Package className="w-8 h-8 text-slate-400" />
              <div>
                 <div className="text-sm font-bold text-slate-900">{selectedProduct?.name}</div>
                 <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{selectedProduct?.unit}</div>
              </div>
           </div>

           <Field label="Trade Price (GBP)">
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">£</span>
                 <input 
                  required 
                  type="number" 
                  step="0.01"
                  className="mela-input pl-8" 
                  value={newPrice} 
                  onChange={(e) => setNewPrice(e.target.value)} 
                  placeholder="0.00" 
                 />
              </div>
           </Field>

           <Field label="Effective Date">
              <input 
                required 
                type="date" 
                className="mela-input" 
                value={newDate} 
                onChange={(e) => setNewDate(e.target.value)} 
              />
           </Field>

           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => setSelectedProduct(null)} className="px-6 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="submit" className="mela-button-primary px-8 flex items-center gap-2">
                 <History className="w-4 h-4" />
                 Log Valuation
              </button>
           </div>
        </form>
      </Modal>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest px-8 py-3 rounded-md shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300 border-b-4 border-blue-500">
          {toast}
        </div>
      )}
    </div>
  );
}
