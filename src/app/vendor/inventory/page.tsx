"use client";
import { useState } from "react";
import { PageHeader } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { products } from "@/lib/seed";
import {
  Package,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Search,
  Filter,
  History,
  TrendingDown,
  ClipboardList,
  Tag,
  Calendar,
} from "lucide-react";

export default function Page() {
  const [inventory, setInventory] = useState(
    products
      .filter((p) => p.vendor === "v-borough" || p.vendor === "v-shoreditch")
      .map((p) => ({
        ...p,
        threshold: 100,
        batch: `BT-${Math.floor(Math.random() * 10000)}`,
        expiry: "2026-12-31",
      })),
  );

  const [editing, setEditing] = useState<any>(null);
  const [delta, setDelta] = useState(0);
  const [reason, setReason] = useState("Restock");
  const [toast, setToast] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setInventory((prev) =>
      prev.map((p) => {
        if (p.id === editing.id) return { ...p, stock: p.stock + delta };
        return p;
      }),
    );
    flash(`${editing.sku} updated: ${delta > 0 ? "+" : ""}${delta} units recorded.`);
    setEditing(null);
  };

  const lowStockItems = inventory.filter((p) => p.stock < p.threshold);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Hub Operations"
        title="Stock Management System"
        sub="Full-lifecycle inventory control. Manage batches, track stock levels, and authorize manual hub adjustments."
        action={
          <button
            onClick={() => setShowHistory(true)}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-black shadow-sm transition-all flex items-center gap-2 uppercase tracking-widest"
          >
            <ClipboardList className="w-4 h-4" />
            Activity Log
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Total SKUs
          </div>
          <div className="text-3xl font-black text-slate-900">{inventory.length}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Low Stock
          </div>
          <div className="text-3xl font-black text-slate-900">{lowStockItems.length}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">
            Active Batches
          </div>
          <div className="text-3xl font-black text-slate-900">{inventory.length * 2}</div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">
            Hub Space Used
          </div>
          <div className="text-3xl font-black text-slate-900">64%</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Filter by SKU, Batch, or Product Name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-slate-300 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5" /> Warehouse Zone
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Inventory Item
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Batch / Expiry
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                On Hand
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map((p) => {
              const isLow = p.stock < p.threshold;
              return (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        <Package className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          {p.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Tag className="w-3 h-3 text-blue-500" /> {p.batch}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                        <Calendar className="w-3 h-3" /> {p.expiry}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-lg font-black text-slate-900">{p.stock}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      Units in Hub
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {isLow ? (
                      <span className="bg-red-50 text-red-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-red-100 uppercase tracking-widest flex items-center gap-1 w-fit">
                        <TrendingDown className="w-3 h-3" /> Low Stock
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-widest flex items-center gap-1 w-fit">
                        Optimal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setDelta(0);
                      }}
                      className="mela-button-primary py-1.5 px-4 text-[10px] uppercase tracking-widest flex items-center gap-2 ml-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Adjust
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Inventory Adjustment"
        description={`Log a physical stock change for ${editing?.sku}`}
        size="md"
      >
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">{editing?.name}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Available: {editing?.stock} Units
              </div>
            </div>
          </div>

          <Field label="Quantity Adjustment (± Units)">
            <input
              required
              type="number"
              className="mela-input"
              value={delta}
              onChange={(e) => setDelta(Number(e.target.value))}
              placeholder="e.g. +50 or -12"
            />
          </Field>

          <Field label="Operational Reason">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mela-input"
            >
              <option>Restock (Inbound Shipment)</option>
              <option>Damage / Wastage</option>
              <option>Cycle Count Correction</option>
              <option>Trade Return</option>
              <option>Sample Pull</option>
            </select>
          </Field>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              This adjustment will be recorded in the hub ledger. Physical verification of Batch{" "}
              <span className="font-bold">{editing?.batch}</span> is required.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-6 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button type="submit" className="mela-button-primary px-8 flex items-center gap-2">
              Commence Update <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        title="Operational Activity Log"
        description="Recent inventory movements and manual adjustments."
        size="lg"
      >
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-4 p-4 hover:bg-slate-50 transition-colors rounded-xl border border-transparent hover:border-slate-100"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <History className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="text-sm font-bold text-slate-900">Manual Stock Adjustment</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase">2h ago</div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Updated <span className="font-bold text-slate-700">BP-FLOUR-01</span> by{" "}
                  <span className="text-emerald-600 font-bold">+50 units</span> (Restock).
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Op: PRIYA.S
                  </span>
                </div>
              </div>
            </div>
          ))}
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
