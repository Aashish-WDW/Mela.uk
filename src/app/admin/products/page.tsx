"use client";
import { useState } from "react";
import { PageHeader } from "@/components/mela/PortalShell";
import { Modal, Field } from "@/components/mela/Modal";
import { products as seedProducts, categories, vendors } from "@/lib/seed";
import { Plus, Search, Filter, Package, Trash2, Edit3 } from "lucide-react";

export default function Page() {
  const [products, setProducts] = useState(seedProducts);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState(categories[0].slug);
  const [vendor, setVendor] = useState(vendors[0].id);
  const [unit, setUnit] = useState("");
  const [moq, setMoq] = useState("1");
  const [stock, setStock] = useState("100");
  const [image, setImage] = useState("");

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: `p-${Date.now()}`,
      name,
      sku,
      category,
      vendor,
      unit,
      moq: parseInt(moq),
      stock: parseInt(stock),
      leadTime: "48h",
      hue: "#C97B4A",
      origin: "UK",
      tags: ["new"],
      image:
        image ||
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    };
    setProducts((prev) => [newProduct, ...prev]);
    setOpen(false);
    flash(`${name} successfully inducted into Hub Inventory.`);
    setName("");
    setSku("");
    setUnit("");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Inventory Logistics"
        title="Hub Inventory"
        sub="Manage the centralized trade catalog. Oversee SKU induction and stock levels across London distribution hubs."
        action={
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest"
          >
            <Plus className="w-5 h-5" />
            Induct SKU
          </button>
        }
      />

      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search catalog by name or SKU..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none border border-slate-300 px-4 py-2 rounded-md text-xs font-bold text-slate-600 hover:bg-gray-50 flex items-center justify-center gap-2 uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5" /> Category
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Item Details
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Category
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Hub Stock
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Unit / MOQ
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        {p.sku}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {p.category.replace("-", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900">{p.stock}</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                      Available
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs font-medium text-slate-600">{p.unit}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    MOQ: {p.moq}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="SKU Induction"
        description="Onboard a new trade asset into the MELA Hub inventory."
        size="lg"
      >
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
          <Field label="Commercial Name">
            <input
              required
              className="mela-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Organic Rye Flour"
            />
          </Field>
          <Field label="Product SKU">
            <input
              required
              className="mela-input"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="e.g. BPC-RYE-25"
            />
          </Field>
          <Field label="Logistics Category">
            <select
              className="mela-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Verified Vendor">
            <select
              className="mela-input"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            >
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Packaging Unit">
            <input
              required
              className="mela-input"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. 25kg Sack"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="MOQ">
              <input
                required
                type="number"
                className="mela-input"
                value={moq}
                onChange={(e) => setMoq(e.target.value)}
              />
            </Field>
            <Field label="Initial Stock">
              <input
                required
                type="number"
                className="mela-input"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Abort
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 transition-all uppercase tracking-widest"
            >
              Induct SKU
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
