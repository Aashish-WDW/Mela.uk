"use client";
import { PageHeader, StatCard, Pill } from "@/components/mela/PortalShell";
import { products, enquiries, trend } from "@/lib/seed";
import { BarChart3, Clock, Package, MessageSquare, ArrowRight, ExternalLink } from "lucide-react";

export default function Page() {
  const myProducts = products.filter((p) => p.vendor === "v-borough");
  const myEnq = enquiries.filter((e) => e.vendor === "v-borough");

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Merchant Terminal"
        title="Borough Provisions Co."
        sub="Monitor your wholesale performance, manage inbound procurement requests, and oversee Park Royal warehouse stock levels."
        action={
          <button className="mela-button-primary px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest">
            <Package className="w-5 h-5" />
            Manage Inventory
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Live SKUs" value={myProducts.length} hint="2 Low Stock" />
        <StatCard label="Pending Enquiries" value={myEnq.length} hint="Action Required" />
        <StatCard label="Fulfillment Velocity" value="98.6%" hint="Target: 99.5%" />
        <StatCard label="Avg Response" value="38m" hint="Top Tier" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                Demand Analytics
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              14 Day Traffic Index
            </span>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-end gap-1.5 h-64">
              {trend.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg transition-all hover:bg-blue-500 cursor-help group relative"
                  style={{
                    height: `${v * 0.9}%`,
                    background: i === trend.length - 1 ? "#2563eb" : "#f1f5f9",
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    {v} requests
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <span>Fortnight Start</span>
              <span>Inbound Volume Tracking</span>
              <span>Real-time</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
              Recent Trade Enquiries
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            <div className="divide-y divide-slate-100">
              {myEnq.map((e) => (
                <div
                  key={e.id}
                  className="p-5 hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded tracking-tighter">
                      {e.ref}
                    </span>
                    <Pill tone={e.status === "Won" ? "good" : "warn"}>{e.status}</Pill>
                  </div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                    {e.buyerCompany}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium uppercase tracking-tight">
                    <span>Quantity: {e.qty} Units</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 2h ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 text-[10px] font-black text-blue-600 hover:bg-slate-50 transition-colors uppercase tracking-widest border-t border-slate-100 flex items-center justify-center gap-2">
            View All Requests
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-black mb-4 tracking-tighter italic uppercase">
            Optimise Your Logistics
          </h3>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed opacity-90 font-medium">
            Your current inventory level in Park Royal Hub is at 64%. Vendors with {">"}80% stock
            consistency are 3x more likely to win high-volume hospitality contracts.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="mela-button-primary px-8 py-3 rounded-xl">View Stock Report</button>
            <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 flex items-center gap-2">
              Warehouse Guidelines
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
