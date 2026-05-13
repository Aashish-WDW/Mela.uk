"use client";
import { useMemo, useState } from "react";
import { PageHeader, Pill } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { products, type Product } from "@/lib/seed";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";

type Status = "all" | "active" | "low" | "out";
const tabs: { key: Status; label: string; icon: any }[] = [
  { key: "all", label: "Inventory Fleet", icon: Package },
  { key: "active", label: "Standard Flow", icon: CheckCircle },
  { key: "low", label: "Depletion Risk", icon: AlertTriangle },
  { key: "out", label: "Stock Breach", icon: XCircle },
];

function statusOf(p: Product): Exclude<Status, "all"> {
  if (p.stock === 0) return "out";
  if (p.stock <= 200) return "low";
  return "active";
}

export default function Page() {
  const mine = useMemo(
    () => products.filter((p) => p.vendor === "v-borough" || p.vendor === "v-shoreditch"),
    [],
  );
  const [tab, setTab] = useState<Status>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [toast, setToast] = useState("");

  const list = mine.filter((p) => {
    const ok = tab === "all" || statusOf(p) === tab;
    const m =
      q === "" ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.sku.toLowerCase().includes(q.toLowerCase());
    return ok && m;
  });

  const counts: Record<Status, number> = {
    all: mine.length,
    active: mine.filter((p) => statusOf(p) === "active").length,
    low: mine.filter((p) => statusOf(p) === "low").length,
    out: mine.filter((p) => statusOf(p) === "out").length,
  };

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Merchant Inventory"
        title="Wholesale Catalogue"
        sub="Maintain your SKU listings, update stock levels for the Park Royal Hub, and manage your trade visibility."
        action={
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="mela-button-primary px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest"
          >
            <Plus className="w-5 h-5" />
            Provision New SKU
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  tab === t.key
                    ? "bg-slate-950 text-white shadow-xl shadow-slate-900/10"
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-md ${tab === t.key ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  {counts[t.key]}
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter by SKU or Product Name..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1000px]">
            <thead>
              <tr className="text-left bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Merchant SKU
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Commercial Name
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Unit Type
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">
                  MOQ
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">
                  Hub Stock
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Lead Time
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((p) => {
                const s = statusOf(p);
                return (
                  <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-5 font-black text-[11px] text-slate-900 uppercase tracking-widest">
                      {p.sku}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border border-slate-100 p-1 bg-white flex items-center justify-center shrink-0 overflow-hidden group-hover:shadow-lg transition-all shadow-sm">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <span className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-bold text-xs italic">{p.unit}</td>
                    <td className="px-6 py-5 text-center font-black text-slate-900">{p.moq}</td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`font-black text-lg ${s === "out" ? "text-red-600" : s === "low" ? "text-amber-600" : "text-emerald-700"}`}
                      >
                        {p.stock.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-500 font-bold text-xs uppercase tracking-tighter">
                      {p.leadTime}
                    </td>
                    <td className="px-6 py-5">
                      <Pill tone={s === "active" ? "good" : s === "low" ? "warn" : "bad"}>
                        {s === "active" ? "Trade Active" : s === "low" ? "Crit. Low" : "Depleted"}
                      </Pill>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditing(p);
                            setOpen(true);
                          }}
                          className="p-2 rounded-md hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => flash(`Deleted ${p.sku}`)}
                          className="p-2 rounded-md hover:bg-white hover:text-red-600 hover:shadow-sm transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <Info className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      No results found in fleet
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Package className="w-3.5 h-3.5" />
            Showing {list.length} of {mine.length} inventory items
          </div>
        </div>
      </div>

      <ProductForm
        key={editing?.id ?? "new"}
        open={open}
        onClose={() => setOpen(false)}
        product={editing}
        onSaved={(name) => {
          setOpen(false);
          flash(`${name} successfully Provisioned`);
        }}
      />

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300 border border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          {toast}
        </div>
      )}
    </div>
  );
}

function ProductForm({
  open,
  onClose,
  product,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSaved: (name: string) => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [sku, setSku] = useState(product?.sku ?? "");
  const [unit, setUnit] = useState(product?.unit ?? "");
  const [moq, setMoq] = useState(product?.moq ?? 1);
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [lead, setLead] = useState(product?.leadTime ?? "48h");
  const [origin, setOrigin] = useState(product?.origin ?? "");
  const [image, setImage] = useState(product?.image ?? "");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product ? "Update Inventory Item" : "Provision New Merchant SKU"}
      description={
        product
          ? `Operational Update for ${product.sku}`
          : "Add a new B2B trade listing to the MELA platform."
      }
      size="lg"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSaved(name || sku || "Product");
        }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <Field label="Commercial Product Name">
            <input
              required
              className="mela-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Organic Heritage Flour"
            />
          </Field>
        </div>
        <Field label="Merchant SKU Code">
          <input
            required
            className="mela-input"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="e.g. BP-FLOUR-01"
          />
        </Field>
        <Field label="Production Origin">
          <input
            className="mela-input"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. United Kingdom"
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Trade Unit Configuration">
            <input
              required
              className="mela-input"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. Pallet of 40 × 25kg bags"
            />
          </Field>
        </div>
        <Field label="Minimum Order Quantity (MOQ)">
          <input
            required
            type="number"
            min={1}
            className="mela-input"
            value={moq}
            onChange={(e) => setMoq(Number(e.target.value))}
          />
        </Field>
        <Field label="Warehouse Stock Allocation">
          <input
            required
            type="number"
            min={0}
            className="mela-input"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Operational Lead Time">
            <input
              required
              className="mela-input"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
              placeholder="e.g. 48h to London Hub"
            />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Product Image URL">
            <input
              className="mela-input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </Field>
        </div>
        <div className="md:col-span-2 flex justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Abort
          </button>
          <button type="submit" className="mela-button-primary px-8">
            {product ? "Commit Updates" : "Establish Listing"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
